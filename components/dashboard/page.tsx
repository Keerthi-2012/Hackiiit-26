import QueryCard from "./QueryCard";

const queries = [
  {
    id: "1",
    title: "How to start research in distributed systems?",
    description: "Looking for guidance and papers.",
    tags: ["Systems"],
    answers: 3,
    createdAt: "2 hours ago",
  },
];

export default function Dashboard() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">All Queries</h1>

      <div className="space-y-4">
        {queries.map((q) => (
          <QueryCard key={q.id} query={q} />
        ))}
      </div>
    </div>
  );
}
