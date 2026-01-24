export default function BlogsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Research Blogs</h1>

      <div className="space-y-4">
        <div className="border rounded p-4">
          <h2 className="font-medium">Notes on Distributed Systems</h2>
          <p className="text-sm text-gray-400">
            A summary of Lamport clocks and consistency models.
          </p>
        </div>

        <div className="border rounded p-4">
          <h2 className="font-medium">Understanding Attention</h2>
          <p className="text-sm text-gray-400">
            Intuition and math behind self-attention.
          </p>
        </div>
      </div>
    </div>
  );
}
