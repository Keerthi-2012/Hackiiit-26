"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Typography,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Grid,
  Divider,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArticleIcon from "@mui/icons-material/Article";
import AddIcon from "@mui/icons-material/Add";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";

import { useRouter } from "next/navigation";

import EditProfileModal from "./EditProfileModal";
import AddBlogModal from "@/components/profile/AddBlogModal";

/* =========================
   Types
========================= */
type User = {
  name: string;
  email: string;
  lab?: string;
  researchArea?: string;
};

interface ProfileStats {
  queries: number;
  answers: number;
  blogs: number;
}

interface ProfileResponse {
  user: User;
  stats: ProfileStats;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showAddBlog, setShowAddBlog] = useState(false);

  useEffect(() => {
    fetch("/api/profile", { credentials: "include" })
      .then((res) => res.json())
      .then((data: ProfileResponse) => {
        setUser(data.user);
        setStats(data.stats);
      })
      .catch(() => setError("Could not load profile"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="loader">
        <CircularProgress sx={{ color: "#00f2fe" }} />
      </div>
    );
  }

  if (error || !user || !stats) {
    return (
      <Container>
        <Alert severity="error" sx={{ bgcolor: "rgba(239, 68, 68, 0.1)", color: "#fca5a5" }}>
          {error || "Failed to load profile"}
        </Alert>
      </Container>
    );
  }

  const researchAreas = user.researchArea
    ? user.researchArea.split(",").map((t) => t.trim())
    : [];

  return (
    <>
      {/* ================= DARK THEME CSS ================= */}
      <style>{`
        :root {
          --bg: #0f172a;
          --card: #1e293b;
          --border: rgba(79, 172, 254, 0.15);
          --text: #e0e7ff;
          --muted: #94a3b8;
          --accent: #4facfe;
          --accent-2: #00f2fe;
        }

        body {
          background: var(--bg);
          color: var(--text);
        }

        .loader {
          min-height: 60vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .profile-header {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          border: 1px solid rgba(79, 172, 254, 0.2);
          border-radius: 1rem;
          padding: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          animation: floatUp 0.6s ease-out;
        }

        @keyframes floatUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .name {
          font-size: 2rem;
          font-weight: 800;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .sub {
          font-size: 0.9rem;
          opacity: 0.9;
          margin-top: 0.5rem;
          color: #cbd5e1;
        }

        .edit-btn {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          color: #0f172a;
          font-weight: 700;
          text-transform: none;
          box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
          transition: all 0.3s ease;
        }

        .edit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(79, 172, 254, 0.4);
        }

        .card {
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid rgba(79, 172, 254, 0.2);
          border-radius: 1rem;
          padding: 1.5rem;
          text-align: center;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          animation: floatUp 0.6s ease-out;
        }

        .card:hover {
          background: rgba(30, 41, 59, 0.8);
          border-color: rgba(79, 172, 254, 0.4);
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(79, 172, 254, 0.15);
        }

        .info-card {
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid rgba(79, 172, 254, 0.2);
          border-radius: 1rem;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          animation: floatUp 0.6s ease-out 0.1s backwards;
        }

        .muted {
          color: var(--muted);
        }

        .chip {
          background: rgba(79, 172, 254, 0.15);
          color: #00f2fe;
          font-weight: 600;
          border: 1px solid rgba(79, 172, 254, 0.3);
        }

        .action-btn {
          font-weight: 600;
          text-transform: none;
          padding: 0.75rem;
          background: none;
          border: 1px solid rgba(79, 172, 254, 0.3);
          color: #cbd5e1;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
        }

        .action-btn:hover {
          background: rgba(79, 172, 254, 0.1);
          border-color: rgba(79, 172, 254, 0.6);
          color: #00f2fe;
        }

        .stat-value {
          font-size: 1.75rem;
          font-weight: 800;
          color: #00f2fe;
        }

        .stat-label {
          color: #cbd5e1;
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }
      `}</style>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Stack spacing={4}>
          {/* ================= HEADER ================= */}
          <div className="profile-header">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              flexWrap="wrap"
              gap={2}
              sx={{ width: "100%" }}
            >
              <div>
                <div className="name">{user.name}</div>
                <div className="sub">{user.lab || "No lab specified"}</div>
                <div className="sub">
                  {researchAreas.length
                    ? researchAreas.join(", ")
                    : "No research areas specified"}
                </div>
              </div>

              <Button
                startIcon={<EditIcon />}
                className="edit-btn"
                onClick={() => setShowEdit(true)}
                variant="contained"
              >
                Edit Profile
              </Button>
            </Stack>
          </div>

          {/* ================= STATS ================= */}
          <Grid container spacing={2}>
            <StatCard
              label="Queries Asked"
              value={stats.queries}
              icon={<HelpOutlineIcon sx={{ fontSize: "2rem", color: "#00f2fe" }} />}
            />
            <StatCard
              label="Answers Provided"
              value={stats.answers}
              icon={<CheckCircleOutlineIcon sx={{ fontSize: "2rem", color: "#22c55e" }} />}
            />
            <StatCard
              label="Blogs Written"
              value={stats.blogs}
              icon={<ArticleIcon sx={{ fontSize: "2rem", color: "#f97316" }} />}
            />
          </Grid>

          {/* ================= INFO ================= */}
          <div className="info-card">
            <Typography variant="h6" fontWeight={700} mb={2} sx={{ color: "#e0e7ff" }}>
              Profile Information
            </Typography>

            <Stack spacing={2}>
              <InfoRow icon={<EmailIcon sx={{ color: "#00f2fe" }} />} label="Email" value={user.email} />
            </Stack>
          </div>

          {/* ================= ACTIONS ================= */}
          <Grid container spacing={2}>
            <Action
              label="My Queries"
              icon={<HelpOutlineIcon />}
              onClick={() => router.push("/profile/my-queries")}
            />
            <Action
              label="Answered"
              icon={<CheckCircleOutlineIcon />}
              onClick={() => router.push("/profile/answered")}
            />
            <Action label="My Blogs" icon={<ArticleIcon />} onClick={() => router.push("/profile/blogs")} />
            <Action label="Add Blog" icon={<AddIcon />} onClick={() => setShowAddBlog(true)} />
          </Grid>

          {showEdit && <EditProfileModal user={user} onClose={() => setShowEdit(false)} />}
          {showAddBlog && <AddBlogModal onClose={() => setShowAddBlog(false)} />}
        </Stack>
      </Container>
    </>
  );
}

/* =========================
   Helper Components
========================= */
function StatCard({ label, value, icon }: any) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <div className="card">
        <div>{icon}</div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </Grid>
  );
}

function InfoRow({ icon, label, value }: any) {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      {icon}
      <div>
        <Typography variant="caption" fontWeight={600} sx={{ color: "#00f2fe" }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
          {value}
        </Typography>
      </div>
    </Stack>
  );
}

function Action({ icon, label, onClick }: any) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Button
        fullWidth
        startIcon={icon}
        className="action-btn"
        onClick={onClick}
        sx={{
          textTransform: "none",
          fontWeight: 600,
        }}
      >
        {label}
      </Button>
    </Grid>
  );
}