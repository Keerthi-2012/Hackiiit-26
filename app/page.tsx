import QueryCard from "@/components/dashboard/QueryCard";

const queries = [
  {
    id: "1",
    title: "How to start research in distributed systems?",
    description: "Looking for guidance, papers, and lab suggestions.",
    tags: ["Systems"],
    answers: 3,
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    title: "Understanding attention in transformers",
    description: "Need an intuitive explanation with math references.",
    tags: ["ML", "Theory"],
    answers: 5,
    createdAt: "1 day ago",
  },
];

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      
      {/* Top Bar */}
      <div className="flex gap-3 items-center mb-6">
        <input
          type="text"
          placeholder="Search by tag or keyword"
          className="flex-1 border px-3 py-2 rounded"
        />

        <select className="border px-3 py-2 rounded">
          <option>All</option>
          <option>ML</option>
          <option>Systems</option>
          <option>VLSI</option>
          <option>Theory</option>
        </select>

        <div className="flex gap-2">
  <a
    href="/blogs"
    className="border border-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800"
  >
    Blogs
  </a>

  <a
    href="/query/new"
    className="bg-black text-white px-4 py-2 rounded"
  >
    + Add Query
  </a>
</div>

      </div>

      {/* Query List */}
      <div className="space-y-4">
        {queries.map((query) => (
          <QueryCard key={query.id} query={query} />
        ))}
      </div>
    </div>
  );
}
