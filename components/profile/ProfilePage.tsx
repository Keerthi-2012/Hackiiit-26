"use client";

import { useEffect, useState } from "react";
import EditProfileModal from "./EditProfileModal";
import styles from "./ProfilePage.module.css";

type User = {
  name: string;
  email: string;
  lab?: string;
  researchArea?: string;
};

export default function ProfilePage() {
  const [showEdit, setShowEdit] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile", {
          credentials: "include", // ✅ send cookies
        });

        if (!res.ok) {
          throw new Error("Failed to load profile");
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        setError("Could not load profile");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return <div className={styles.container}>Loading profile...</div>;
  }

  if (error || !user) {
    return <div className={styles.container}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Profile</h1>

      <div className={styles.card}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Lab:</strong> {user.lab || "Not specified"}</p>

        <div>
          <strong>Research Area:</strong>
          <div className={styles.tags}>
            {(user.researchArea ? user.researchArea.split(",") : []).map(
              (tag) => (
                <span key={tag} className={styles.tag}>
                  {tag.trim()}
                </span>
              )
            )}
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
        <EditProfileModal
          user={user}
          onClose={() => setShowEdit(false)}
        />
      )}
    </div>
  );
}
