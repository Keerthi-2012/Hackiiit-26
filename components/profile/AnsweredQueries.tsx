"use client";

import { useEffect, useState } from "react";
import QueryCard from "@/components/dashboard/QueryCard";

type Query = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  replyCount: number; // number of replies
  createdAt: string;
};

export default function AnsweredQueries() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnsweredQueries() {
      try {
        const res = await fetch("/api/profile/myanswers", {
          credentials: "include", // send cookies if needed
          cache: "no-store",      // always fetch fresh data
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

  if (loading) return <p>Loading answered queries...</p>;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h2>Answered Queries</h2>

      {queries.length === 0 && <p>No answered queries found.</p>}

      {queries.map((q) => (
        <QueryCard
          key={q.id}
          query={{
            ...q,
            answers: q.replyCount, // map API field to QueryCard prop
          }}
        />
      ))}
    </div>
  );
}
