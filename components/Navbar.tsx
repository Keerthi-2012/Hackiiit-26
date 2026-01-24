import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Research Discuss
        </Link>

        <div className={styles.links}>
          <Link href="/">Dashboard</Link>
          <Link href="/blogs">Blogs</Link>
          <Link href="/query/new">New Query</Link>
          <Link href="/profile">Profile</Link>
        </div>
      </div>
    </nav>
  );
}
