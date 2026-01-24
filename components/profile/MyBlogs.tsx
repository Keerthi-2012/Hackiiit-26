const blogs = [
  {
    id: "b1",
    title: "Notes on Distributed Systems",
    summary: "Lamport clocks, consensus, consistency models.",
    createdAt: "3 days ago",
  },
];

export default function MyBlogs() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h2>My Blogs</h2>

      {blogs.map((b) => (
        <div
          key={b.id}
          style={{ border: "1px solid #ddd", padding: 16, marginBottom: 12 }}
        >
          <h3>{b.title}</h3>
          <p>{b.summary}</p>
          <small>{b.createdAt}</small>
        </div>
      ))}
    </div>
  );
}
