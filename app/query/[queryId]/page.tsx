import connectToDatabase from "@/lib/mongodb";
import Query from "@/models/Query";

import QueryHeader from "@/components/query/QueryHeader";
import QueryBody from "@/components/query/QueryBody";
import AttachmentViewer from "@/components/query/AttachmentViewer";
import Discussion from "@/components/query/Discussion";

export default async function QueryPage({
  params,
}: {
  params: Promise<{ queryId: string }>;
}) {
  const { queryId } = await params;

  await connectToDatabase();

  const query = await Query.findById(queryId)
    .populate("user", "name")
    .lean();

  if (!query) {
    return <div className="p-6">Query not found</div>;
  }

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
        author={query.isAnonymous ? "Anonymous" : query.user?.name}
        tags={query.tags}
        queryId={query._id.toString()}
      />

      <QueryBody description={query.description} />

      <AttachmentViewer attachments={attachments} />

      <Discussion queryId={query._id.toString()} />
    </div>
  );
}
