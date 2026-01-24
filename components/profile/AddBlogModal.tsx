"use client";

import { useState } from "react";

export default function AddBlogModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function submit() {
    console.log({ title, content });
    onClose();
  }

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3>Add Blog</h3>

        <input
          placeholder="Blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your blog..."
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={submit}>Post</button>
        </div>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modal = {
  background: "white",
  padding: 20,
  width: 500,
};
