import QueryCard from "@/components/dashboard/QueryCard";

const answeredQueries = [
  {
    id: "2",
    title: "Understanding attention in transformers",
    description: "Need intuitive explanation with math references.",
    tags: ["ML", "Theory"],
    answers: 5,
    createdAt: "1 day ago",
  },
];

export default function AnsweredQueries() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h2>Answered Queries</h2>
      {answeredQueries.map((q) => (
        <QueryCard key={q.id} query={q} />
      ))}
    </div>
  );
}
