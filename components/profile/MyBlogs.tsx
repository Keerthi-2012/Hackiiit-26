// const blogs = [
//   {
//     id: "b1",
//     title: "Notes on Distributed Systems",
//     summary: "Lamport clocks, consensus, consistency models.",
//     createdAt: "3 days ago",
//   },
// ];

// export default function MyBlogs() {
//   return (
//     <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
//       <h2>My Blogs</h2>

//       {blogs.map((b) => (
//         <div
//           key={b.id}
//           style={{ border: "1px solid #ddd", padding: 16, marginBottom: 12 }}
//         >
//           <h3>{b.title}</h3>
//           <p>{b.summary}</p>
//           <small>{b.createdAt}</small>
//         </div>
//       ))}
//     </div>
//   );
// }
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
        console.log("Fetch response:", res);
        if (!res.ok) throw new Error("Failed to fetch blogs");

        const data: Blog[] = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading blogs...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

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
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ marginBottom: 8 }}>{b.title}</h3>
          <p style={{ marginBottom: 8 }}>{b.summary}</p>
          <small style={{ color: "#666" }}>{b.createdAt}</small>
        </div>
      ))}
    </div>
  );
}
