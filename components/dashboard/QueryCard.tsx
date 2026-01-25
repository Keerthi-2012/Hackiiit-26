
import Link from "next/link";
import styles from "./QueryCard.module.css";

const cardStyles = `
  .card {
    display: block;
    padding: 1.5rem;
    border-radius: 1rem;
    background: rgba(30, 41, 59, 0.6);
    border: 1px solid rgba(79, 172, 254, 0.15);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    text-decoration: none;
    color: inherit;
    animation: floatUp 0.6s ease-out;
  }

  .card:hover {
    background: rgba(30, 41, 59, 0.8);
    border-color: rgba(79, 172, 254, 0.3);
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(79, 172, 254, 0.2);
  }

  .card h2 {
    font-size: 1.3rem;
    font-weight: 700;
    color: #e0e7ff;
    margin-bottom: 0.75rem;
    line-height: 1.4;
  }

  .card p {
    color: #cbd5e1;
    margin-bottom: 1rem;
    line-height: 1.5;
    font-size: 0.95rem;
  }

  .tags {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-bottom: 1.25rem;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    padding: 0.4rem 0.85rem;
    background: rgba(79, 172, 254, 0.15);
    color: #00f2fe;
    border: 1px solid rgba(79, 172, 254, 0.3);
    border-radius: 2rem;
    font-size: 0.8rem;
    font-weight: 600;
    transition: all 0.2s ease;
  }

  .tag:hover {
    background: rgba(79, 172, 254, 0.25);
    border-color: rgba(79, 172, 254, 0.5);
  }

  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    border-top: 1px solid rgba(79, 172, 254, 0.1);
    font-size: 0.85rem;
    color: #94a3b8;
  }

  .meta span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .meta span:first-child::before {
    content: "📝";
    margin-right: 0.25rem;
  }

  .meta span:last-child::before {
    content: "⏰";
    margin-right: 0.25rem;
  }

  @keyframes floatUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default function QueryCard({ query }: any) {
  return (
    <>
      <style>{cardStyles}</style>
      <Link href={`/query/${query._id}`} className={styles.card}>
        <h2>{query.title}</h2>
        <p>{query.description}</p>
        
        {/* Tags */}
        <div className={styles.tags}>
          {query.tags?.map((tag: string) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        
        {/* Meta Information */}
        <div className={styles.meta}>
          <span>{query.replyCount || 0} answers</span>
          <span>{new Date(query.createdAt).toLocaleString()}</span>
        </div>
      </Link>
    </>
  );
}