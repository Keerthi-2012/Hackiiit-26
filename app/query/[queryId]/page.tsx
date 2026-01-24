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
  // ✅ FIX: await cookies()
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/");

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    redirect("/");
  }

  const { queryId } = params;

  // mock lookup / DB fetch later
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <QueryHeader
        title={`Query ${queryId}`}
        author="Anonymous"
        tags={["Systems"]}
        queryId={queryId}
      />

      <QueryBody description="Query body goes here" />
      <AttachmentViewer attachments={[]} />
      <Discussion comments={[]} />
    </div>
  );
}
