import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Left: Logo / Title */}
        <Link href="/" className="text-lg font-semibold">
          Research Discuss
        </Link>

        {/* Center: Navigation */}
        <div className="flex gap-6 text-sm text-gray-700">
          <Link href="/">Dashboard</Link>
          <Link href="/blogs">Blogs</Link>
          <Link href="/query/new">New Query</Link>
        </div>

        {/* Right: Profile / CAS */}
        <div className="flex gap-4 text-sm">
          {/* Later this can be conditional based on CAS auth */}
          <Link href="/profile" className="font-medium">
            Profile
          </Link>
          {/* CAS login hook (backend will handle) */}
          {/* <a href="/api/auth/cas/login">Login</a> */}
        </div>
      </div>
    </nav>
  );
}
