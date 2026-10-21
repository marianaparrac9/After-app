"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Guard } from "@/components/Guard";
import { IconBack } from "@/components/Icons";
import { useData } from "@/contexts/DataProvider";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { loadProductById, selectedProduct, loading, error } = useData();

  useEffect(() => {
    if (params.id) void loadProductById(params.id);
  }, [params.id]);

  return (
    <Guard>
      <section className="screen detail">
        {loading ? <p className="status-box">Loading product...</p> : null}
        {error ? <p className="form-error">{error}</p> : null}
        {!loading && !selectedProduct ? (
          <div className="empty">
            <p>This product id does not exist.</p>
            <button className="btn" onClick={() => router.push("/home")}>
              Back to Home
            </button>
          </div>
        ) : null}
        {selectedProduct ? (
          <>
            <div className="hero-photo">
              <img src={selectedProduct.imageUrl} alt={selectedProduct.name} />
              <div className="float-actions">
                <button className="round" onClick={() => router.back()} aria-label="Back">
                  <IconBack />
                </button>
              </div>
            </div>
            <div className="capacity-row">
              <h1>{selectedProduct.name}</h1>
            </div>
            <p className="muted">{selectedProduct.place}</p>
            <p>{selectedProduct.description}</p>
            <p>
              <strong>
                {selectedProduct.price} {selectedProduct.currency}
              </strong>
            </p>
          </>
        ) : null}
      </section>
    </Guard>
  );
}
