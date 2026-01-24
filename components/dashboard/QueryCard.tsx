import Link from "next/link";

interface Query {
  id: string;
  title: string;
  description: string;
  tags: string[];
  answers: number;
  createdAt: string;
}

export default function QueryCard({ query }: { query: Query }) {
  return (
    <Link href={`/query/${query.id}`}>
      <div className="border rounded p-4 hover:bg-gray-900 cursor-pointer transition">
        <h2 className="text-lg font-semibold mb-1">
          {query.title}
        </h2>

        <p className="text-sm text-gray-400 mb-2">
          {query.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          {query.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-gray-700 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between text-xs text-gray-400">
          <span>{query.answers} answers</span>
          <span>{query.createdAt}</span>
        </div>
      </div>
    </Link>
  );
}
