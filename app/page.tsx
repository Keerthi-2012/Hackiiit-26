import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      redirect("/dashboard");
    } catch {}
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Research Discuss</h1>

      <a
        href="/api/auth/login"
        className="mt-4 px-4 py-2 bg-black text-white rounded"
      >
        Login with CAS
      </a>
    </div>
  );
}
