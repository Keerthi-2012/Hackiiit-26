import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

import QueryHeader from "@/components/query/QueryHeader";
import QueryBody from "@/components/query/QueryBody";
import AttachmentViewer from "@/components/query/AttachmentViewer";
import Discussion from "@/components/query/Discussion";
import CommentForm from "@/components/query/CommentForm";


// ...imports stay the same

export default async function QueryPage({
  params,
}: {
  params: Promise<{ queryId: string }>;
}) {
  // auth logic unchanged ...

  const { queryId } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/query/details?queryId=${queryId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <div className="p-6">Query not found</div>;
  }

  const query = await res.json();

  // ✅ FIX IS HERE
  const attachments = Array.isArray(query.files)
    ? query.files.map((f: any) => ({
        name: f.name || f.filename || "attachment",
        url: f.url || f.path,
      }))
    : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <QueryHeader
        title={query.title}
        author={query.userName}
        tags={query.tags}
        queryId={query._id}
      />

      <QueryBody description={query.description} />

      {/* ✅ FIXED */}
      <AttachmentViewer attachments={attachments} />

      <Discussion queryId={query._id} />
    </div>
  );
}


