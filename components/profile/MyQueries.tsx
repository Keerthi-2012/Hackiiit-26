"use client";

import { useEffect, useState } from "react";
import QueryCard from "@/components/dashboard/QueryCard";

export default function MyQueriesPage() {
  const [queries, setQueries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQueries() {
      try {
        const res = await fetch("/api/profile/myqueries", {
          credentials: "include",
          cache: "no-store",
        });

        const data = await res.json();
        setQueries(data.map((q: any) => ({ ...q, _id: q._id || q.id })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchQueries();
  }, []);

  if (loading) {
    return (
      <div className="loader">
        Loading...
      </div>
    );
  }

  return (
    <>
      {/* ================= DARK THEME CSS ================= */}
      <style>{`
        :root {
          --bg: #0f172a;
          --card: #111827;
          --border: #1f2937;
          --text: #e5e7eb;
          --muted: #9ca3af;
          --accent: #667eea;
        }

        body {
          background: var(--bg);
          color: var(--text);
        }

        .page {
          max-width: 900px;
          margin: 0 auto;
          padding: 32px 20px;
        }

        .title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 24px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .empty {
          color: var(--muted);
          text-align: center;
          margin-top: 40px;
          font-size: 1rem;
        }

        .loader {
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          color: var(--muted);
        }

        /* Optional: make QueryCard spacing consistent */
        .query-wrapper > * + * {
          margin-top: 16px;
        }
      `}</style>

      <div className="page">
        <h2 className="title">My Queries</h2>

        {queries.length === 0 && (
          <div className="empty">No queries found</div>
        )}

        <div className="query-wrapper">
          {queries.map((q) => (
            <QueryCard
              key={q._id}
              query={q}
              showDelete
              onDelete={async () => {
                try {
                  const res = await fetch("/api/profile/myqueries", {
                    method: "DELETE",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: q._id }),
                  });

                  if (!res.ok) throw new Error("Delete failed");

                  setQueries((prev) =>
                    prev.filter((item) => item._id !== q._id)
                  );
                } catch (err) {
                  console.error(err);
                  alert("Failed to delete query");
                }
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
