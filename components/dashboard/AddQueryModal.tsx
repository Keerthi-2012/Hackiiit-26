"use client";

import { useState } from "react";
import styles from "./AddQueryModal.module.css";

const TAG_OPTIONS = [
  "Machine Learning",
  "Systems",
  "VLSI",
  "Theory",
  "Computer Vision",
  "NLP",
  "Databases",
  "Networks",
  "Security",
  "Distributed Systems",
  "Algorithms",
  "Optimization",
  "Robotics",
  "HCI",
  "Bioinformatics",
];

export default function AddQueryModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [text, setText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [anonymous, setAnonymous] = useState(false);

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  }

  function handleSubmit() {
    const payload = {
      text,
      tags: selectedTags,
      anonymous,
    };

    console.log("New Query:", payload);
    onClose(); // close modal
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Create New Query</h3>

        {/* Query text */}
        <textarea
          placeholder="Describe your research query..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
        />

        {/* Tags */}
        <div>
          <p className={styles.label}>Select tags</p>
          <div className={styles.tags}>
            {TAG_OPTIONS.map((tag) => (
              <button
                key={tag}
                type="button"
                className={
                  selectedTags.includes(tag)
                    ? styles.tagSelected
                    : styles.tag
                }
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Anonymous */}
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
          />
          Post anonymously
        </label>

        {/* Actions */}
        <div className={styles.actions}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Post</button>
        </div>
      </div>
    </div>
  );
}
