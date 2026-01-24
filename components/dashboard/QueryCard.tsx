import Link from "next/link";
import styles from "./QueryCard.module.css";

export default function QueryCard({ query }: any) {
  return (
    <Link href={`/query/${query.id}`} className={styles.card}>
      <h2>{query.title}</h2>
      <p>{query.description}</p>

      <div className={styles.meta}>
        <span>{query.answers} answers</span>
        <span>{query.createdAt}</span>
      </div>
    </Link>
  );
}
