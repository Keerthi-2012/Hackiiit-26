"use client";

import { useEffect, useState } from "react";
import QueryCard from "@/components/dashboard/QueryCard";

type Query = {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  replyCount: number;
  createdAt: string;
};

export default function AnsweredQueries() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnsweredQueries() {
      try {
        const res = await fetch("/api/profile/myanswers", {
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch answered queries");

        const data = await res.json();
        setQueries(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAnsweredQueries();
  }, []);

  if (loading) {
    return <div className="loader">Loading answered queries...</div>;
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

        .query-wrapper > * + * {
          margin-top: 16px;
        }
      `}</style>

      <div className="page">
        <h2 className="title">Answered Queries</h2>

        {queries.length === 0 && (
          <div className="empty">No answered queries found.</div>
        )}

        <div className="query-wrapper">
          {queries.map((q) => (
            <QueryCard
              key={q._id}
              query={{
                ...q,
                answers: q.replyCount, // QueryCard compatibility
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
