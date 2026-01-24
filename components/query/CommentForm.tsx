"use client";

export default function CommentForm() {
  return (
    <form className="space-y-2">
      <textarea
        placeholder="Write your answer..."
        className="w-full border rounded p-2 bg-black"
        rows={4}
      />

      <input type="file" />

      <button className="bg-white text-black px-4 py-1 rounded">
        Post Answer
      </button>
    </form>
  );
}
