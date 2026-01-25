"use client";

import { useState } from "react";
import styles from "./FAQ.module.css";

type FAQ = {
  question: string;
  answer: string;
  tags?: string[];
};

export default function FAQItem({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.item}>
      <button
        className={styles.question}
        onClick={() => setOpen(!open)}
      >
        {faq.question}
      </button>

      {open && (
        <div className={styles.answer}>
          <p>{faq.answer}</p>

          {faq.tags && (
            <div className={styles.tags}>
              {faq.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}