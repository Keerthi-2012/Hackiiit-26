import CommentList from "@/components/query/CommentList";
import CommentForm from "@/components/query/CommentForm";

export default function Discussion({
  comments,
}: {
  comments: { text: string; time: string }[];
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Discussion</h3>
      <CommentList comments={comments} />
      <CommentForm />
    </div>
  );
}
