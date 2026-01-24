export default function QueryHeader({
  title,
  author,
  tags,
  queryId,
}: {
  title: string;
  author: string;
  tags: string[];
  queryId: string;
}) {
  return (
    <div className="border-b pb-4">
      <h1 className="text-2xl font-semibold mb-2">{title}</h1>

      <div className="flex gap-2 text-sm text-gray-400">
        <span>{author}</span>
        <span>•</span>
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
        <span>•</span>
        <span>ID: {queryId}</span>
      </div>
    </div>
  );
}
