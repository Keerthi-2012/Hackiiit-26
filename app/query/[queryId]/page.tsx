import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

import QueryHeader from "@/components/query/QueryHeader";
import QueryBody from "@/components/query/QueryBody";
import AttachmentViewer from "@/components/query/AttachmentViewer";
import Discussion from "@/components/query/Discussion";

export default async function QueryPage({
  params,
}: {
  params: { queryId: string };
}) {
  /* 🔐 Auth check */
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/");

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    redirect("/");
  }

  const { queryId } = params;

  /* 📡 Fetch query details from backend */
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/query/details?queryId=${queryId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <div className="p-6">Query not found</div>;
  }

  const query = await res.json();

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <QueryHeader
        title={query.title}
        author={query.author}
        tags={query.tags}
        queryId={query._id}
      />

      <QueryBody description={query.description} />

      <AttachmentViewer attachments={query.files || []} />

      <Discussion comments={query.replies || []} />
    </div>
  );
}
