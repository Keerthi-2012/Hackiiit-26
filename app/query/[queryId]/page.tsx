import QueryHeader from "@/components/query/QueryHeader";
import QueryBody from "@/components/query/QueryBody";
import AttachmentViewer from "@/components/query/AttachmentViewer";
import Discussion from "@/components/query/Discussion";

const MOCK_QUERIES = [
  {
    id: "1",
    title: "How to start research in distributed systems?",
    description:
      "Looking for guidance, papers, and lab suggestions. Any recommended textbooks or survey papers?",
    author: "Anonymous",
    tags: ["Systems"],
    attachments: [
      { name: "Distributed Systems Survey.pdf", url: "#" },
      { name: "GitHub Repository", url: "#" },
    ],
    comments: [
      {
        text: "Start with Tanenbaum book and read the Google Spanner paper.",
        time: "2 hours ago",
      },
    ],
  },
  {
    id: "2",
    title: "Understanding attention in transformers",
    description:
      "Need an intuitive explanation with math references.",
    author: "Anonymous",
    tags: ["ML", "Theory"],
    attachments: [],
    comments: [],
  },
];

export default function QueryPage({
  params,
}: {
  params: { queryId: string };
}) {
  const query = MOCK_QUERIES.find(
    (q) => q.id === params.queryId
  );

  if (!query) {
    return <div className="p-6">Query not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <QueryHeader
        title={query.title}
        author={query.author}
        tags={query.tags}
        queryId={query.id}
      />

      <QueryBody description={query.description} />

      <AttachmentViewer attachments={query.attachments} />

      <Discussion comments={query.comments} />
    </div>
  );
}
