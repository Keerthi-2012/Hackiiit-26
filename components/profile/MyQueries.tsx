"use client";

import { useEffect, useState } from "react";
import QueryCard from "@/components/dashboard/QueryCard";

type Query = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  replyCount: number;
  createdAt: string;
};

export default function MyQueriesPage() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQueries() {
      const res = await fetch("/api/profile/myqueries", {
        credentials: "include",
        cache: "no-store",
      });

      const data = await res.json();
      setQueries(data);
      setLoading(false);
    }

    fetchQueries();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h2>My Queries</h2>

      {queries.length === 0 && <p>No queries found</p>}

      {queries.map(q => (
        <QueryCard
          key={q.id}
          query={{ ...q, answers: q.replyCount }}
        />
      ))}
    </div>
  );
}
