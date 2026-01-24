import Link from "next/link";
import styles from "./QueryCard.module.css";

export default function QueryCard({ query }: any) {
  return (
    <Link href={`/query/${query.id}`} className={styles.card}>
      <h2>{query.title}</h2>

      <p>{query.description}</p>

      {/* ✅ Tags */}
      <div className={styles.tags}>
        {query.tags.map((tag: string) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className={styles.meta}>
        <span>{query.answers} answers</span>
        <span>{query.createdAt}</span>
      </div>
    </Link>
  );
}
