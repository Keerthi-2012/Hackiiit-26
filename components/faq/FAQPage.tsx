"use client";

import { useEffect, useState } from "react";
import FAQItem from "./FAQItem";
import styles from "./FAQ.module.css";

type FAQ = {
  _id: string;
  question: string;
  answer: string;
  tags?: string[];
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
      } catch (err) {
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
    <div className={styles.container}>
      <h1>Frequently Asked Questions</h1>

      <input
        className={styles.search}
        placeholder="Search FAQs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Loading FAQs...</p>}

      {!loading && filteredFaqs.length === 0 && (
        <p>No FAQs found.</p>
      )}

      {filteredFaqs.map((faq) => (
        <FAQItem key={faq._id} faq={faq} />
      ))}
    </div>
  );
}
