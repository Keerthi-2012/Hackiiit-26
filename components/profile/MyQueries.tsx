// "use client";

// import { useEffect, useState } from "react";
// import QueryCard from "@/components/dashboard/QueryCard";

// type Query = {
//   _id: string;
//   title: string;
//   description: string;
//   tags: string[];
//   replyCount: number;
//   createdAt: string;
// };

// export default function MyQueriesPage() {
//   const [queries, setQueries] = useState<Query[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchQueries() {
//       const res = await fetch("/api/profile/myqueries", {
//         credentials: "include",
//         cache: "no-store",
//       });

//       const data = await res.json();
//       setQueries(data);
//       setLoading(false);
//     }

//     fetchQueries();
//   }, []);

//   async function handleDelete(queryId: string) {
//     const confirmed = confirm("Are you sure you want to delete this query?");
//     if (!confirmed) return;

//     const res = await fetch(`/api/query/${queryId}`, {
//       method: "DELETE",
//       credentials: "include",
//     });

//     if (!res.ok) {
//       alert("Failed to delete query");
//       return;
//     }

//     // Remove from UI
//     setQueries((prev) => prev.filter((q) => q._id !== queryId));
//   }

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
//       <h2>My Queries</h2>

//       {queries.length === 0 && <p>No queries found</p>}

//       {queries.map((q) => (
//   <QueryCard
//     key={q.id}
//     query={{ ...q, _id: q.id }}
//     showDelete
//     onDelete={async () => {
//       await fetch(`/api/query/${q.id}`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//       setQueries((prev) => prev.filter((x) => x.id !== q.id));
//     }}
//   />
// ))}

//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import QueryCard from "@/components/dashboard/QueryCard";

export default function MyQueriesPage() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQueries() {
      const res = await fetch("/api/profile/myqueries", {
        credentials: "include",
        cache: "no-store",
      });

      const data = await res.json();

      // Ensure every query has _id for consistency
      setQueries(data.map(q => ({ ...q, _id: q._id || q.id })));
      setLoading(false);
    }

    fetchQueries();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h2>My Queries</h2>

      {queries.length === 0 && <p>No queries found</p>}

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

              if (!res.ok) throw new Error("Failed to delete query");

              // Remove from UI
              setQueries(prev => prev.filter(x => x._id !== q._id));
            } catch (err) {
              console.error(err);
              alert("Failed to delete query");
            }
          }}
        />
      ))}
    </div>
  );
}
