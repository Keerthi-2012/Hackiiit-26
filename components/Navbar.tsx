import Link from "next/link";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function Navbar() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let isLoggedIn = false;

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      isLoggedIn = true;
    } catch {}
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <Link href="/" className="font-bold text-lg">
        Research Discuss
      </Link>

      <div className="space-x-4">
        {isLoggedIn ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/query">Queries</Link>
            <a href="/api/auth/logout">Logout</a>
          </>
        ) : (
          <a
            href="/api/auth/login"
            className="px-4 py-2 bg-black text-white rounded"
          >
            Login with CAS
          </a>
        )}
      </div>
    </nav>
  );
}
