"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { useAxios } from "./AxiosProvider";
import { useAuth } from "./AuthProvider";
import { EventFilters, EventItem, Payment, Product } from "@/types/models";
import { eventsCatalog } from "@/lib/events";
import { getSavedIds, setSavedIds } from "@/lib/storage";

const defaultFilters: EventFilters = {
  search: "",
  category: "all",
  status: "all",
  time: "all",
  maxDistance: 5,
};

interface DataContextType {
  products: Product[];
  payments: Payment[];
  selectedProduct: Product | null;
  allEvents: EventItem[];
  events: EventItem[];
  selectedEvent: EventItem | null;
  filters: EventFilters;
  savedIds: string[];
  savedEvents: EventItem[];
  loading: boolean;
  error: string;
  loadProducts: () => Promise<void>;
  loadProductById: (id: string) => Promise<Product | null>;
  loadPayments: () => Promise<void>;
  loadEvents: (next?: Partial<EventFilters>) => void;
  loadEventById: (id: string) => EventItem | null;
  setFilters: (next: Partial<EventFilters>) => void;
  toggleSaved: (eventId: string) => void;
}

const DataContext = createContext<DataContextType | null>(null);

const matches = (item: EventItem, filters: EventFilters) => {
  const q = filters.search.trim().toLowerCase();
  const searchOk =
    !q ||
    item.title.toLowerCase().includes(q) ||
    item.venueName.toLowerCase().includes(q) ||
    item.categories.some((category) => category.toLowerCase().includes(q));
  const categoryOk = filters.category === "all" || item.categories.includes(filters.category);
  const statusOk = filters.status === "all" || item.status === filters.status;
  const distanceOk = item.distanceKm <= filters.maxDistance || filters.maxDistance >= 10;
  return searchOk && categoryOk && statusOk && distanceOk;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const axios = useAxios();
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filters, setFiltersState] = useState<EventFilters>(defaultFilters);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [savedIds, setSaved] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) setSaved(getSavedIds(user.id));
    else setSaved([]);
  }, [user]);

  const events = useMemo(() => eventsCatalog.filter((item) => matches(item, filters)), [filters]);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get<Product[]>("/api/products");
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load products");
    } finally {
      setLoading(false);
    }
  }, [axios]);

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
        setError(err instanceof Error ? err.message : "Product not found");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [axios]
  );

  const loadPayments = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get<Payment[]>("/api/payments");
      setPayments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load payments");
    } finally {
      setLoading(false);
    }
  }, [axios]);

  useEffect(() => {
    if (!user) return;
    void loadProducts();
    void loadPayments();
  }, [user, loadProducts, loadPayments]);

  const loadEvents = (next?: Partial<EventFilters>) => {
    if (next) setFiltersState((prev) => ({ ...prev, ...next }));
  };

  const loadEventById = (id: string) => {
    const found = eventsCatalog.find((item) => item.id === id) || null;
    setSelectedEvent(found);
    return found;
  };

  const setFilters = (next: Partial<EventFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...next }));
  };

  const toggleSaved = (eventId: string) => {
    if (!user) return;
    setSaved((prev) => {
      const exists = prev.includes(eventId);
      const next = exists ? prev.filter((id) => id !== eventId) : [...prev, eventId];
      setSavedIds(user.id, next);
      return next;
    });
  };

  const savedEvents = eventsCatalog.filter((item) => savedIds.includes(item.id));

  return (
    <DataContext.Provider
      value={{
        products,
        payments,
        selectedProduct,
        allEvents: eventsCatalog,
        events,
        selectedEvent,
        filters,
        savedIds,
        savedEvents,
        loading,
        error,
        loadProducts,
        loadProductById,
        loadPayments,
        loadEvents,
        loadEventById,
        setFilters,
        toggleSaved,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};
