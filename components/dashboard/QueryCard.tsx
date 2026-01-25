import Link from "next/link";
import { useState } from "react";
import styles from "./QueryCard.module.css";

export default function QueryCard({
  query,
  showDelete = false,
  onDelete,
}: {
  query: any;
  showDelete?: boolean;
  onDelete?: () => void;
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <Link href={`/query/${query._id}`} className={styles.card}>
        {/* Delete text – top right */}
        {showDelete && (
          <span
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setConfirmOpen(true);
            }}
            style={{
              position: "absolute",
              top: 14,
              right: 18,
              color: "white",
              fontSize: "0.85rem",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Delete
          </span>
        )}

        <h2>{query.title}</h2>
        <p>{query.description}</p>

        {/* Tags */}
        <div className={styles.tags}>
          {query.tags?.map((tag: string) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className={styles.meta}>
          <span>{query.replyCount || 0} answers</span>
          <span>{new Date(query.createdAt).toLocaleString()}</span>
        </div>
      </Link>

      {/* Confirmation Popup */}
      {confirmOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 8,
              width: 320,
            }}
          >
            <p style={{ marginBottom: 16 }}>
              Are you sure you want to delete this query?
            </p>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <button
                onClick={() => setConfirmOpen(false)}
                style={{
                  background: "transparent",
                  border: "1px solid #ccc",
                  padding: "6px 12px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setConfirmOpen(false);
                  onDelete?.();
                }}
                style={{
                  background: "#111",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
