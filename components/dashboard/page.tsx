"use client";

import { useState } from "react";
import QueryCard from "./QueryCard";
import AddQueryModal from "@/components/dashboard/AddQueryModal";

const queries = [
  {
    id: "1",
    title: "How to start research in distributed systems?",
    description: "Looking for guidance and papers.",
    tags: ["Systems"],
    answers: 3,
    createdAt: "2 hours ago",
  },
];

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("All");

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2>All Queries</h2>
        <button onClick={() => setShowModal(true)}>
          + Add Query
        </button>
      </div>

      {/* 🔍 Search + Filter */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <input
          type="text"
          placeholder="Search by keyword"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />

        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          style={{ padding: 8 }}
        >
          <option>All</option>
          <option>Systems</option>
          <option>ML</option>
          <option>Theory</option>
          <option>VLSI</option>
          <option>Networks</option>
        </select>
      </div>

      {/* Modal */}
      {showModal && (
        <AddQueryModal onClose={() => setShowModal(false)} />
      )}

      {/* Query list */}
      <div>
        {queries.map((q) => (
          <QueryCard key={q.id} query={q} />
        ))}
      </div>
    </div>
  );
}
