"use client";

import { useState } from "react";
import styles from "./EditProfileModal.module.css";

const INTERESTS = [
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

export default function EditProfileModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [lab, setLab] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  function toggleInterest(tag: string) {
    setSelected((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  }

  function saveChanges() {
    console.log({
      name,
      lab,
      interests: selected,
    });
    onClose();
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Edit Profile</h3>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Lab"
          value={lab}
          onChange={(e) => setLab(e.target.value)}
        />

        <p>Research Interests</p>
        <div className={styles.tags}>
          {INTERESTS.map((tag) => (
            <button
              key={tag}
              type="button"
              className={
                selected.includes(tag)
                  ? styles.tagSelected
                  : styles.tag
              }
              onClick={() => toggleInterest(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className={styles.actions}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={saveChanges}>Save</button>
        </div>
      </div>
    </div>
  );
}
