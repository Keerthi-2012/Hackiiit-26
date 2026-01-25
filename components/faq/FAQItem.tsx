"use client";

import { useRouter } from "next/navigation";
import styles from "./FAQ.module.css";

type FAQ = {
  question: string;
  tags?: string[];
  exampleQueryIds: string[];
};

export default function FAQItem({ faq }: { faq: FAQ }) {
  const router = useRouter();

  function handleClick() {
    if (!faq.exampleQueryIds || faq.exampleQueryIds.length === 0) return;
    router.push(`/query/${faq.exampleQueryIds[0]}`);
  }

  return (
    <div className={styles.item} onClick={handleClick}>
      <div className={styles.question}>{faq.question}</div>

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
  );
}
