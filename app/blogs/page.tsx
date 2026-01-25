"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Chip,
  Button,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

/* =========================
   Types
========================= */
interface Blog {
  id: string | number;
  title: string;
  description: string; // short preview
  content: string; // FULL blog
  author?: string;
  category?: string;
  readTime?: number;
  date?: string;
  likes?: number;
}

/* =========================
   Mock Blogs (for now)
========================= */
const defaultBlogs: Blog[] = [
  {
    id: 1,
    title: "Notes on Distributed Systems",
    description: "Lamport clocks, consistency models, and CAP theorem.",
    content: `Lamport clocks are a logical clock mechanism used in distributed systems.

They help establish partial ordering of events without relying on physical clocks.

Topics covered:
• Logical clocks  
• Happens-before relation  
• Mutual exclusion  
• Consistency models  
• CAP theorem  
• Google Spanner overview  

Recommended reading:
- Lamport (1978)
- Spanner OSDI paper`,
    author: "John Doe",
    category: "Systems",
    readTime: 8,
    date: "2 days ago",
    likes: 24,
  },
];

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
  return (
    <Dialog open onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>
        {blog.title}
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            {blog.author} • {blog.date} • {blog.readTime} min read
          </Typography>

          <Typography
            variant="body1"
            sx={{ whiteSpace: "pre-line", lineHeight: 1.7 }}
          >
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
   Main Page
========================= */
export default function BlogsPage() {
  const [likedBlogs, setLikedBlogs] = useState<Set<string | number>>(new Set());
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const handleLike = (id: string | number) => {
    setLikedBlogs((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Header */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(135deg,#667eea,#764ba2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Research Blogs
        </Typography>
        <Typography color="text.secondary">
          Explore research notes and insights written by students.
        </Typography>
      </Stack>

      {/* Blog Cards */}
      <Grid container spacing={3}>
        {defaultBlogs.map((blog) => {
          const isLiked = likedBlogs.has(blog.id);

          return (
            <Grid item xs={12} sm={6} md={4} key={blog.id}>
              <Card
                sx={{
                  borderRadius: 2,
                  border: "1px solid #e0e0e0",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: "0 8px 24px rgba(102,126,234,.15)",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardContent>
                  {blog.category && (
                    <Chip
                      label={blog.category}
                      size="small"
                      sx={{
                        mb: 1,
                        background: "#f0f4ff",
                        color: "#667eea",
                        fontWeight: 600,
                      }}
                    />
                  )}

                  {/* Title (clickable) */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      cursor: "pointer",
                      "&:hover": { color: "#667eea" },
                    }}
                    onClick={() => setSelectedBlog(blog)}
                  >
                    {blog.title}
                  </Typography>

                  {/* Preview (2 lines only) */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                      mt: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {blog.description}
                  </Typography>

                  {/* Meta */}
                  <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
                    <Avatar sx={{ width: 28, height: 28 }}>
                      {blog.author?.[0]}
                    </Avatar>
                    <Typography variant="caption">{blog.author}</Typography>
                    <AccessTimeIcon sx={{ fontSize: 16 }} />
                    <Typography variant="caption">
                      {blog.readTime} min
                    </Typography>
                  </Stack>
                </CardContent>

                {/* Actions */}
                <CardActions sx={{ borderTop: "1px solid #eee" }}>
                  <Button
                    size="small"
                    startIcon={<ArrowForwardIcon />}
                    onClick={() => setSelectedBlog(blog)}
                  >
                    Read More
                  </Button>

                  <Box sx={{ ml: "auto" }}>
                    <Button
                      size="small"
                      onClick={() => handleLike(blog.id)}
                      startIcon={<FavoriteBorderIcon />}
                    >
                      {(blog.likes || 0) + (isLiked ? 1 : 0)}
                    </Button>
                    <Button size="small">
                      <BookmarkBorderIcon />
                    </Button>
                    <Button size="small">
                      <ShareIcon />
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Read Blog Modal */}
      {selectedBlog && (
        <BlogReadModal
          blog={selectedBlog}
          onClose={() => setSelectedBlog(null)}
        />
      )}
    </Container>
  );
}
