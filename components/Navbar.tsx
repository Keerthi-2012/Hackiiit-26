import Link from "next/link";

export default function Navbar() {
  const isLoggedIn = true; // TEMP: assume CAS logged in

  return (
    <nav className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="font-semibold text-lg">
          Research Discuss
        </Link>

        <div className="flex gap-4 text-sm">
          <Link href="/">Dashboard</Link>
          <Link href="/query/new">New Query</Link>

          {isLoggedIn ? (
            <Link href="/profile">Profile</Link>
          ) : (
            <a href="/api/auth/cas/login">Login (CAS)</a>
          )}
        </div>
      </div>
    </nav>
  );
}
