"use client";

import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { useAxios } from "./AxiosProvider";
import { useAuth } from "./AuthProvider";
import { useToast } from "./ToastProvider";
import { Payment, Product } from "@/shared/models";
import { getErrorMessage } from "@/lib/errors";

interface TicketsContextType {
  payments: Payment[];
  selectedProduct: Product | null;
  loading: boolean;
  buying: boolean;
  error: string;
  loadProductById: (id: string) => Promise<Product | null>;
  buyTicket: (productId: string) => Promise<boolean>;
}

const TicketsContext = createContext<TicketsContextType | null>(null);

export const TicketsProvider = ({ children }: { children: ReactNode }) => {
  const axios = useAxios();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [buying, setBuying] = useState(false);
  const [error, setError] = useState("");

  const loadPayments = useCallback(async () => {
    try {
      const { data } = await axios.get<Payment[]>("/api/payments");
      setPayments(data);
    } catch (err) {
      setError(getErrorMessage(err, "Could not load your tickets"));
    }
  }, [axios]);

  useEffect(() => {
    if (!user || user.role !== "user") {
      setPayments([]);
      return;
    }
    void loadPayments();
  }, [user, loadPayments]);

  const loadProductById = useCallback(
    async (id: string) => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get<Product>(`/api/products/${id}`);
        setSelectedProduct(data);
        return data;
      } catch (err) {
        setSelectedProduct(null);
        setError(getErrorMessage(err, "Product not found"));
        return null;
      } finally {
        setLoading(false);
      }
    },
    [axios]
  );

  const buyTicket = async (productId: string) => {
    setBuying(true);
    try {
      const { data } = await axios.post<Payment>("/api/payments", { productId });
      setPayments((prev) => [data, ...prev]);
      showToast(`Ticket for ${data.product.name} paid`, "success");
      return true;
    } catch (err) {
      showToast(getErrorMessage(err, "The payment failed"), "error");
      return false;
    } finally {
      setBuying(false);
    }
  };

  return (
    <TicketsContext.Provider
      value={{ payments, selectedProduct, loading, buying, error, loadProductById, buyTicket }}
    >
      {children}
    </TicketsContext.Provider>
  );
};

export const useTickets = () => {
  const ctx = useContext(TicketsContext);
  if (!ctx) throw new Error("useTickets must be used within TicketsProvider");
  return ctx;
};
