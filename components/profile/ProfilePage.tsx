"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
  Button,
  Avatar,
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
import LabelIcon from "@mui/icons-material/Label";

import { useRouter } from "next/navigation";

import EditProfileModal from "./EditProfileModal";
import AddBlogModal from "@/components/profile/AddBlogModal";

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

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showEdit, setShowEdit] = useState(false);
  const [showAddBlog, setShowAddBlog] = useState(false);

  // 🔹 Mock stats for now (replace later with backend)
  const [stats] = useState<ProfileStats>({
    queries: 12,
    answers: 28,
    blogs: 5,
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to load profile");
        const data = await res.json();
        setUser(data.user);
      } catch {
        setError("Could not load profile");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !user) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error || "Failed to load profile"}</Alert>
      </Container>
    );
  }

  const researchAreas = user.researchArea
    ? user.researchArea.split(",").map((t) => t.trim())
    : [];

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={4}>
        {/* =========================
            Profile Header
        ========================= */}
        <Paper
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
          }}
        >
          <Box sx={{ p: 4, color: "white" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              gap={2}
            >
              <Stack direction="row" spacing={3} alignItems="center">
                <Avatar
                  sx={{
                    width: 90,
                    height: 90,
                    fontSize: "2rem",
                    fontWeight: 700,
                    background: "rgba(255,255,255,0.25)",
                  }}
                >
                  {getInitials(user.name)}
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight={700}>
                    {user.name}
                  </Typography>
                  <Typography variant="body2">
                    Research Profile
                  </Typography>
                </Box>
              </Stack>

              <Button
                startIcon={<EditIcon />}
                onClick={() => setShowEdit(true)}
                sx={{
                  color: "white",
                  background: "rgba(255,255,255,0.2)",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    background: "rgba(255,255,255,0.3)",
                  },
                }}
              >
                Edit Profile
              </Button>
            </Stack>
          </Box>
        </Paper>

        {/* =========================
            Stats
        ========================= */}
        <Grid container spacing={2}>
          {[
            {
              label: "Queries Asked",
              value: stats.queries,
              icon: <HelpOutlineIcon sx={{ fontSize: 32, color: "#667eea" }} />,
            },
            {
              label: "Answers Provided",
              value: stats.answers,
              icon: (
                <CheckCircleOutlineIcon
                  sx={{ fontSize: 32, color: "#388e3c" }}
                />
              ),
            },
            {
              label: "Blogs Written",
              value: stats.blogs,
              icon: <ArticleIcon sx={{ fontSize: 32, color: "#f57c00" }} />,
            },
          ].map((stat) => (
            <Grid item xs={12} sm={4} key={stat.label}>
              <Paper sx={{ p: 2.5, textAlign: "center" }}>
                {stat.icon}
                <Typography variant="h5" fontWeight={700}>
                  {stat.value}
                </Typography>
                <Typography variant="body2">{stat.label}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* =========================
            Profile Info
        ========================= */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={700} mb={2}>
            Profile Information
          </Typography>

          <Stack spacing={2}>
            <InfoRow icon={<EmailIcon />} label="Email" value={user.email} />
            <Divider />
            <InfoRow
              icon={<WorkIcon />}
              label="Lab"
              value={user.lab || "Not specified"}
            />
            <Divider />
            <Box>
              <Typography variant="caption" fontWeight={600}>
                Research Areas
              </Typography>
              {researchAreas.length ? (
                <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                  {researchAreas.map((area) => (
                    <Chip key={area} label={area} size="small" />
                  ))}
                </Stack>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Not specified
                </Typography>
              )}
            </Box>
          </Stack>
        </Paper>

        {/* =========================
            Actions
        ========================= */}
        <Grid container spacing={2}>
          <ActionButton
            icon={<HelpOutlineIcon />}
            label="My Queries"
            onClick={() => router.push("/profile/my-queries")}
          />
          <ActionButton
            icon={<CheckCircleOutlineIcon />}
            label="Answered"
            onClick={() => router.push("/profile/answered")}
          />
          <ActionButton
            icon={<ArticleIcon />}
            label="My Blogs"
            onClick={() => router.push("/profile/blogs")}
          />
          <ActionButton
            icon={<AddIcon />}
            label="Add Blog"
            variant="contained"
            onClick={() => setShowAddBlog(true)}
          />
        </Grid>

        {/* =========================
            Modals
        ========================= */}
        {showEdit && (
          <EditProfileModal
            user={user}
            onClose={() => setShowEdit(false)}
          />
        )}

        {showAddBlog && (
          <AddBlogModal onClose={() => setShowAddBlog(false)} />
        )}
      </Stack>
    </Container>
  );
}

/* =========================
   Helper Components
========================= */

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      {icon}
      <Box>
        <Typography variant="caption" fontWeight={600}>
          {label}
        </Typography>
        <Typography variant="body2">{value}</Typography>
      </Box>
    </Stack>
  );
}

function ActionButton({
  icon,
  label,
  onClick,
  variant = "outlined",
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: "outlined" | "contained";
}) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Button
        fullWidth
        startIcon={icon}
        variant={variant}
        onClick={onClick}
        sx={{ py: 1.5, textTransform: "none", fontWeight: 600 }}
      >
        {label}
      </Button>
    </Grid>
  );
}
