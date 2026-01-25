"use client";

import { useEffect, useState } from "react";

type Blog = {
  id: string;
  title: string;
  summary: string;
  createdAt: string;
};

export default function MyBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blog", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        setBlogs(data);
      } catch {
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h2>My Blogs</h2>

      {blogs.length === 0 && <p>No blogs found</p>}

      {blogs.map((b) => (
        <div
          key={b.id}
          style={{
            border: "1px solid #ddd",
            padding: 16,
            marginBottom: 12,
            borderRadius: 6,
          }}
        >
          <h3>{b.title}</h3>
          <p>{b.summary}</p>
          <small>{b.createdAt}</small>
        </div>
      ))}
    </div>
  );
}
