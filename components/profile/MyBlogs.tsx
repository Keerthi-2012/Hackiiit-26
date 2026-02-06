"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Typography,
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
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Grid, Box } from "@mui/material";


/* =========================
   Types
========================= */
type Blog = {
  _id: string;
  title: string;
  summary: string;
  content: string;
  createdAt: string;
  author?: string;
  category?: string;
  readTime?: number;
};

/* =========================
   Blog Read Modal
========================= */
function BlogReadModal({
  blog,
  onClose,
}: {
  blog: Blog;
  onClose: () => void;
}) {
  const date = blog.createdAt ? new Date(blog.createdAt) : null;

  return (
    <Dialog open onClose={onClose} maxWidth="md" fullWidth className="modal">
      <DialogTitle className="modal-title">
        {blog.title}
      </DialogTitle>

      <DialogContent dividers className="modal-content">
        <Stack spacing={2}>
          <Typography className="text-muted">
            {blog.author || "Anonymous"} •{" "}
            {date ? date.toDateString() : "Unknown date"} •{" "}
            {blog.readTime || 3} min read
          </Typography>

          <Typography className="modal-summary">
            {blog.summary}
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

/* =========================
   Blogs Page
========================= */
export default function MyBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="loader">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      {/* ================= PURE CSS DARK THEME ================= */}
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
          font-weight: 700;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 14px;
          transition: 0.3s;
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(102,126,234,0.25);
        }

        .chip {
          background: rgba(102,126,234,0.15);
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
        }

        .preview {
          color: var(--muted);
          margin-top: 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
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

        .modal-summary {
          font-weight: 600;
        }

        .modal-text {
          line-height: 1.7;
          white-space: pre-line;
        }

        .loader {
          min-height: 60vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Stack spacing={2} mb={4}>
          <Typography variant="h4" className="header-title">
            My Blogs
          </Typography>
          <Typography className="text-muted">
            Blogs written by you
          </Typography>
        </Stack>

        <Grid container spacing={3} columns={12}>
          {blogs.map((blog, index) => (
            <Box key={blog._id || index} style={{ gridColumn: 'span 4' }}>
              <Card className="card">
                <CardContent>
                  {blog.category && (
                    <Chip
                      label={blog.category}
                      size="small"
                      className="chip"
                      sx={{ mb: 1 }}
                    />
                  )}

                  <Typography
                    variant="h6"
                    className="title"
                    color="white"
                    onClick={() => setSelectedBlog(blog)}
                  >
                    {blog.title}
                  </Typography>

                  <Typography className="preview">
                    {blog.summary}
                  </Typography>

                  <Stack direction="row" spacing={1.5} mt={2}>
                    <Avatar sx={{ width: 26, height: 26 }}>
                      {blog.author?.[0] || "A"}
                    </Avatar>
                    <Typography variant="caption" color="white">
                      {blog.author || "Anonymous"}
                    </Typography>
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
            </Box>
          ))}
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
