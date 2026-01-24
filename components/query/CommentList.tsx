export default function CommentList({
  comments,
}: {
  comments: { text: string; time: string }[];
}) {
  return (
    <div className="space-y-3">
      {comments.map((c, i) => (
        <div key={i} className="border rounded p-3">
          <p className="text-sm text-gray-300">{c.text}</p>
          <span className="text-xs text-gray-500">{c.time}</span>
        </div>
      ))}
    </div>
  );
}
