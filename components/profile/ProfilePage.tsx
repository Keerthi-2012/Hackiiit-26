"use client";

import { useState } from "react";
import Link from "next/link";
import EditProfileModal from "@/components/profile/EditProfileModal";
import AddBlogModal from "@/components/profile/AddBlogModal";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const [showEdit, setShowEdit] = useState(false);
  const [showAddBlog, setShowAddBlog] = useState(false);

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
        <Link href="/profile/my-queries"><button>My Queries</button></Link>
        <Link href="/profile/answered"><button>Answered Queries</button></Link>
        <Link href="/profile/blogs"><button>My Blogs</button></Link>
        <button onClick={() => setShowAddBlog(true)}>Add Blog</button>
      </div>

      {showEdit && <EditProfileModal onClose={() => setShowEdit(false)} />}
      {showAddBlog && <AddBlogModal onClose={() => setShowAddBlog(false)} />}
    </div>
  );
}
