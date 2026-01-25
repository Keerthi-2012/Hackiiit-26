// "use client";

// import { useEffect, useState } from "react";
// import FAQItem from "./FAQItem";
// import styles from "./FAQ.module.css";

// type FAQ = {
//   _id: string;
//   question: string;
//   tags?: string[];
//   exampleQueryIds: string[];
// };

// export default function FAQPage() {
//   const [faqs, setFaqs] = useState<FAQ[]>([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchFaqs() {
//       try {
//         const res = await fetch("/api/faq", { cache: "no-store" });
//         const data = await res.json();
//         setFaqs(data);
//       } catch {
//         console.error("Failed to load FAQs");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchFaqs();
//   }, []);

//   const filteredFaqs = faqs.filter((faq) =>
//     faq.question.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className={styles.container}>
//       <h1>Frequently Asked Questions</h1>

//       <input
//         className={styles.search}
//         placeholder="Search FAQs..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {loading && <p>Loading FAQs...</p>}
//       {!loading && filteredFaqs.length === 0 && <p>No FAQs found.</p>}

//       {filteredFaqs.map((faq) => (
//         <FAQItem key={faq._id} faq={faq} />
//       ))}
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";

/* =========================
   Types
========================= */
type FAQ = {
  _id: string;
  question: string;
  tags?: string[];
  exampleQueryIds: string[];
};

/* =========================
   FAQ Item (Inline)
========================= */
function FAQItem({ faq }: { faq: FAQ }) {
  return (
    <div className="faq-item">
      <h3>{faq.question}</h3>

      {faq.tags && faq.tags.length > 0 && (
        <div className="tags">
          {faq.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================
   FAQ Page
========================= */
export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const res = await fetch("/api/faq", { cache: "no-store" });
        const data = await res.json();
        setFaqs(data);
      } catch {
        console.error("Failed to load FAQs");
      } finally {
        setLoading(false);
      }
    }

    fetchFaqs();
  }, []);

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* ================= CSS ================= */}
      <style>{`
        :root {
          --bg: #0b1026;
          --panel: #121a3a;
          --card:rgba(255, 255, 255, 0.05);
          --accent: #2dd4ff;
          --border: rgba(255,255,255,0.1);
        }

        body {
          background: radial-gradient(circle at top, #111a3a, var(--bg));
          margin: 0;
          font-family: Inter, system-ui, sans-serif;
        }

        .container {
          max-width: 900px;
          margin: 0 auto;
          padding: 60px 20px;
        }

        h1 {
          color: var(--accent);
          font-size: 2.4rem;
          font-weight: 800;
          margin-bottom: 24px;
        }

        .search {
          width: 100%;
          padding: 14px 16px;
          border-radius: 12px;
          background: linear-gradient(135deg, #18224a, #101734);
          border: 1px solid var(--border);
          color: white;
          font-size: 1rem;
          outline: none;
          margin-bottom: 32px;
        }

        .search::placeholder {
          color: #9aa4d6;
        }

        .faq-item {
          background: var(--card);
          border-radius: 14px;
          padding: 20px;
          margin-bottom: 18px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.25);
        }

        /* 🔥 FIX: BLACK TEXT */
        .faq-item * {
          color: #fff !important;
        }

        .faq-item h3 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tag {
          background: #e5e7eb;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .status {
          color: #9aa4d6;
          margin-top: 12px;
        }
      `}</style>

      {/* ================= UI ================= */}
      <div className="container">
        <h1>Frequently Asked Questions</h1>

        <input
          className="search"
          placeholder="Search FAQs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading && <p className="status">Loading FAQs...</p>}
        {!loading && filteredFaqs.length === 0 && (
          <p className="status">No FAQs found.</p>
        )}

        {filteredFaqs.map((faq) => (
          <FAQItem key={faq._id} faq={faq} />
        ))}
      </div>
    </>
  );
}
