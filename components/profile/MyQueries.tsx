import QueryCard from "@/components/dashboard/QueryCard";

const myQueries = [
  {
    id: "1",
    title: "How to start research in distributed systems?",
    description: "Looking for guidance and papers.",
    tags: ["Systems"],
    answers: 3,
    createdAt: "2 hours ago",
  },
];

export default function MyQueries() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h2>My Queries</h2>
      {myQueries.map((q) => (
        <QueryCard key={q.id} query={q} />
      ))}
    </div>
  );
}
