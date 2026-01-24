import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import Dashboard from "@/components/dashboard/page";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/");

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    redirect("/");
  }

  return <Dashboard />;
}
