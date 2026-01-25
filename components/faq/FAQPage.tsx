"use client";

import { useEffect, useState } from "react";
import FAQItem from "./FAQItem";
import styles from "./FAQ.module.css";

type FAQ = {
  _id: string;
  question: string;
  tags?: string[];
  exampleQueryIds: string[];
};

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
      {/* ========= UI THEME (NO LOGIC CHANGE) ========= */}
      <style>{`
        body {
          background: radial-gradient(circle at top, #1a2a6c, #0b122b);
        }

        .${styles.container} {
          max-width: 900px;
          margin: 0 auto;
          padding: 60px 20px;
        }

        .${styles.container} h1 {
          text-align: center;
          font-size: 2.6rem;
          font-weight: 800;
          margin-bottom: 32px;
          color: white;
        }

        .${styles.search} {
          width: 100%;
          padding: 14px 16px;
          margin: 16px 0 24px;

          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.08),
            rgba(255,255,255,0.04)
          );
          backdrop-filter: blur(12px);

          border-radius: 14px;
          border: 1px solid rgba(120,160,255,0.35);

          color: white;
          font-size: 14px;
          outline: none;

          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
        }

        .${styles.search}::placeholder {
          color: #666;
        }

        .${styles.search}:focus {
          border-color: #38bdf8;
          box-shadow: 0 0 0 2px rgba(56,189,248,0.25);
        }

        .${styles.container} p {
          text-align: center;
          color: white;
          margin-top: 20px;
        }

        /* FAQItem wrapper polish WITHOUT touching its logic */
        .${styles.container} > div {
          margin-bottom: 14px;
        }
      `}</style>

      {/* ========= PAGE CONTENT ========= */}
      <div className={styles.container}>
        <h1>Frequently Asked Questions</h1>

        <input
          className={styles.search}
          placeholder="Search FAQs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading && <p>Loading FAQs...</p>}
        {!loading && filteredFaqs.length === 0 && <p>No FAQs found.</p>}

        {filteredFaqs.map((faq) => (
          <FAQItem key={faq._id} faq={faq} />
        ))}
      </div>
    </>
  );
}