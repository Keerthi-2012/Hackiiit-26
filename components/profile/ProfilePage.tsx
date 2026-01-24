"use client";

import { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const [showEdit, setShowEdit] = useState(false);

  // 🔹 Mock CAS data (later backend will replace this)
  const user = {
    name: "Sahithi Anumula",
    email: "sahithi@iiit.ac.in",
    lab: "Systems Lab",
    interests: ["Systems", "Distributed Systems", "Databases"],
  };

  return (
    <div className={styles.container}>
      <h1>Profile</h1>

      <div className={styles.card}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Lab:</strong> {user.lab}</p>

        <div>
          <strong>Research Interests:</strong>
          <div className={styles.tags}>
            {user.interests.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>

        <button onClick={() => setShowEdit(true)}>
          Update Profile
        </button>
      </div>

      {/* Action buttons */}
      <div className={styles.actions}>
        <button>My Queries</button>
        <button>Answered Queries</button>
        <button>My Blogs</button>
        <button>Add Blog</button>
      </div>

      {showEdit && (
        <EditProfileModal onClose={() => setShowEdit(false)} />
      )}
    </div>
  );
}
