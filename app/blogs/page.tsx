"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface Blog {
  _id: string;
  title: string;
  description: string;
  content: string;
  author: {
    _id: string;
    name: string;
  };
  category?: string;
  readTime?: number;
  createdAt?: string;
  likes?: number;
}


function BlogReadModal({
  blog,
  onClose,
}: {
  blog: Blog;
  onClose: () => void;
}) {
  const date = new Date(blog.createdAt);

  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Dialog open onClose={onClose} maxWidth="md" fullWidth className="modal">
      <DialogTitle className="modal-title">{blog.title}</DialogTitle>

      <DialogContent dividers className="modal-content">
        <Stack spacing={1}>
          <Typography className="text-muted">
            Created by {blog.author?.name}
          </Typography>

          <Typography className="text-muted">
            Created on {formattedDate} at {formattedTime}
          </Typography>

          <Typography className="modal-text">
            {blog.content}
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [likedBlogs, setLikedBlogs] = useState<Set<string>>(new Set());
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  useEffect(() => {
    fetch("/api/blog/allblogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data.blogs || []))
      .catch(() => setError("Failed to load blogs"))
      .finally(() => setLoading(false));
  }, []);

  const handleLike = (id: string) => {
    setLikedBlogs((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  if (loading) {
    return (
      <div className="loader">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <>
      {/* ===== PURE CSS DARK THEME ===== */}
      <style>{`
        :root {
          --bg: #0f172a;
          --card: #111827;
          --border: #1f2933;
          --text: #e5e7eb;
          --muted: #9ca3af;
          --accent: #667eea;
        }

        body {
          background: var(--bg);
          color: var(--text);
        }

        .header-title {
          padding-top: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          transition: 0.3s;
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.2);
        }

        .chip {
          background: rgba(102, 126, 234, 0.15);
          color: var(--accent);
          font-weight: 600;
        }

        .title {
          font-weight: 700;
          cursor: pointer;
        }

        .title:hover {
          color: var(--accent);
        }

        .text-muted {
          color: var(--muted);
          font-weight: 700;
        }

        .actions {
          border-top: 1px solid var(--border);
        }

        .modal .MuiPaper-root {
          background: var(--card);
          color: var(--text);
        }

        .modal-title {
          font-weight: 700;
        }

        .modal-text {
          line-height: 1.7;
          white-space: pre-line;
        }

        .loader {
          display: flex;
          justify-content: center;
          min-height: 60vh;
        }
      `}</style>

      <Container maxWidth="md">
        <Stack spacing={2} mb={4}>
          <Typography variant="h4" className="header-title">
            Research Blogs
          </Typography>
          <Typography className="text-muted">
            Explore research notes.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {blogs.map((blog) => {
            const isLiked = likedBlogs.has(blog._id);
            return (
              <Grid item xs={12} sm={6} md={4} key={blog._id}>
                <Card className="card">
                  <CardContent>
                    {blog.category && (
                      <Chip label={blog.category} size="small" className="chip" />
                    )}

                    <Typography
                      variant="h6"
                      className="title"
                      onClick={() => setSelectedBlog(blog)}
                      color="white"
                    >
                      {blog.title}
                    </Typography>

                    <Typography className="text-muted" mt={1}>
                      {blog.content}
                    </Typography>

                    <Stack direction="row" spacing={1.5} mt={2}>
                      {/* <Avatar>{blog.author?.name?.[0]}</Avatar> */}
                      <Avatar
                        sx={{ width: 25, height: 25 }}
                      >
                        {blog.author?.name?.[0]}
                      </Avatar>
                      <Typography variant="caption" color="white">{blog.author?.name}</Typography>
                    </Stack>
                  </CardContent>

                  <CardActions className="actions">
                    <Button
                      size="small"
                      startIcon={<ArrowForwardIcon />}
                      onClick={() => setSelectedBlog(blog)}
                    >
                      Read More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {selectedBlog && (
          <BlogReadModal
            blog={selectedBlog}
            onClose={() => setSelectedBlog(null)}
          />
        )}
      </Container>
    </>
  );
}