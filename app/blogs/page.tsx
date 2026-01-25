// "use client";

// import React, { useState } from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   Paper,
//   Stack,
//   Chip,
//   Button,
//   Card,
//   CardContent,
//   CardActions,
//   Avatar,
//   Grid,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
// import ShareIcon from "@mui/icons-material/Share";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// /* =========================
//    Types
// ========================= */
// interface Blog {
//   id: string | number;
//   title: string;
//   description: string; // short preview
//   content: string; // FULL blog
//   author?: string;
//   category?: string;
//   readTime?: number;
//   date?: string;
//   likes?: number;
// }

// /* =========================
//    Mock Blogs (for now)
// ========================= */
// const defaultBlogs: Blog[] = [
//   {
//     id: 1,
//     title: "Notes on Distributed Systems",
//     description: "Lamport clocks, consistency models, and CAP theorem.",
//     content: `Lamport clocks are a logical clock mechanism used in distributed systems.

// They help establish partial ordering of events without relying on physical clocks.

// Topics covered:
// • Logical clocks  
// • Happens-before relation  
// • Mutual exclusion  
// • Consistency models  
// • CAP theorem  
// • Google Spanner overview  

// Recommended reading:
// - Lamport (1978)
// - Spanner OSDI paper`,
//     author: "John Doe",
//     category: "Systems",
//     readTime: 8,
//     date: "2 days ago",
//     likes: 24,
//   },
// ];

// /* =========================
//    Blog Read Modal
// ========================= */
// function BlogReadModal({
//   blog,
//   onClose,
// }: {
//   blog: Blog;
//   onClose: () => void;
// }) {
//   return (
//     <Dialog open onClose={onClose} maxWidth="md" fullWidth>
//       <DialogTitle sx={{ fontWeight: 700 }}>
//         {blog.title}
//       </DialogTitle>

//       <DialogContent dividers>
//         <Stack spacing={2}>
//           <Typography variant="body2" color="text.secondary">
//             {blog.author} • {blog.date} • {blog.readTime} min read
//           </Typography>

//           <Typography
//             variant="body1"
//             sx={{ whiteSpace: "pre-line", lineHeight: 1.7 }}
//           >
//             {blog.content}
//           </Typography>
//         </Stack>
//       </DialogContent>

//       <DialogActions>
//         <Button onClick={onClose}>Close</Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// /* =========================
//    Main Page
// ========================= */
// export default function BlogsPage() {
//   const [likedBlogs, setLikedBlogs] = useState<Set<string | number>>(new Set());
//   const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

//   const handleLike = (id: string | number) => {
//     setLikedBlogs((prev) => {
//       const next = new Set(prev);
//       next.has(id) ? next.delete(id) : next.add(id);
//       return next;
//     });
//   };

//   return (
//     <Container maxWidth="md" sx={{ py: 6 }}>
//       {/* Header */}
//       <Stack spacing={2} sx={{ mb: 4 }}>
//         <Typography
//           variant="h4"
//           sx={{
//             fontWeight: 700,
//             background: "linear-gradient(135deg,#667eea,#764ba2)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//           }}
//         >
//           Research Blogs
//         </Typography>
//         <Typography color="text.secondary">
//           Explore research notes and insights written by students.
//         </Typography>
//       </Stack>

//       {/* Blog Cards */}
//       <Grid container spacing={3}>
//         {defaultBlogs.map((blog) => {
//           const isLiked = likedBlogs.has(blog.id);

//           return (
//             <Grid item xs={12} sm={6} md={4} key={blog.id}>
//               <Card
//                 sx={{
//                   borderRadius: 2,
//                   border: "1px solid #e0e0e0",
//                   transition: "0.3s",
//                   "&:hover": {
//                     boxShadow: "0 8px 24px rgba(102,126,234,.15)",
//                     transform: "translateY(-4px)",
//                   },
//                 }}
//               >
//                 <CardContent>
//                   {blog.category && (
//                     <Chip
//                       label={blog.category}
//                       size="small"
//                       sx={{
//                         mb: 1,
//                         background: "#f0f4ff",
//                         color: "#667eea",
//                         fontWeight: 600,
//                       }}
//                     />
//                   )}

//                   {/* Title (clickable) */}
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       fontWeight: 700,
//                       cursor: "pointer",
//                       "&:hover": { color: "#667eea" },
//                     }}
//                     onClick={() => setSelectedBlog(blog)}
//                   >
//                     {blog.title}
//                   </Typography>

//                   {/* Preview (2 lines only) */}
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       color: "#666",
//                       mt: 1,
//                       display: "-webkit-box",
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: "vertical",
//                       overflow: "hidden",
//                     }}
//                   >
//                     {blog.description}
//                   </Typography>

//                   {/* Meta */}
//                   <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
//                     <Avatar sx={{ width: 28, height: 28 }}>
//                       {blog.author?.[0]}
//                     </Avatar>
//                     <Typography variant="caption">{blog.author}</Typography>
//                     <AccessTimeIcon sx={{ fontSize: 16 }} />
//                     <Typography variant="caption">
//                       {blog.readTime} min
//                     </Typography>
//                   </Stack>
//                 </CardContent>

//                 {/* Actions */}
//                 <CardActions sx={{ borderTop: "1px solid #eee" }}>
//                   <Button
//                     size="small"
//                     startIcon={<ArrowForwardIcon />}
//                     onClick={() => setSelectedBlog(blog)}
//                   >
//                     Read More
//                   </Button>

//                   <Box sx={{ ml: "auto" }}>
//                     <Button
//                       size="small"
//                       onClick={() => handleLike(blog.id)}
//                       startIcon={<FavoriteBorderIcon />}
//                     >
//                       {(blog.likes || 0) + (isLiked ? 1 : 0)}
//                     </Button>
//                     <Button size="small">
//                       <BookmarkBorderIcon />
//                     </Button>
//                     <Button size="small">
//                       <ShareIcon />
//                     </Button>
//                   </Box>
//                 </CardActions>
//               </Card>
//             </Grid>
//           );
//         })}
//       </Grid>

//       {/* Read Blog Modal */}
//       {selectedBlog && (
//         <BlogReadModal
//           blog={selectedBlog}
//           onClose={() => setSelectedBlog(null)}
//         />
//       )}
//     </Container>
//   );
// }
// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Container,
//   Stack,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Chip,
//   Button,
//   Avatar,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
// import ShareIcon from "@mui/icons-material/Share";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// /* =========================
//    Types
// ========================= */
// interface Blog {
//   _id: string;
//   title: string;
//   description: string; // short preview
//   content: string; // full blog
//   author: {
//     _id: string;
//     name: string;
//   };
//   category?: string;
//   readTime?: number;
//   createdAt?: string;
//   likes?: number;
// }

// /* =========================
//    Blog Read Modal
// ========================= */
// function BlogReadModal({
//   blog,
//   onClose,
// }: {
//   blog: Blog;
//   onClose: () => void;
// }) {
//   return (
//     <Dialog open onClose={onClose} maxWidth="md" fullWidth>
//       <DialogTitle sx={{ fontWeight: 700 }}>{blog.title}</DialogTitle>
//       <DialogContent dividers>
//         <Stack spacing={2}>
//           <Typography variant="body2" color="text.secondary">
//             {blog.author?.name} • {blog.createdAt} • {blog.readTime} min read
//           </Typography>
//           <Typography
//             variant="body1"
//             sx={{ whiteSpace: "pre-line", lineHeight: 1.7 }}
//           >
//             {blog.content}
//           </Typography>
//         </Stack>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Close</Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// /* =========================
//    Main Blogs Page
// ========================= */
// export default function BlogsPage() {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [likedBlogs, setLikedBlogs] = useState<Set<string>>(new Set());
//   const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

//   useEffect(() => {
//     async function fetchBlogs() {
//       try {
//         const res = await fetch("/api/blog/allblogs");
//         if (!res.ok) throw new Error("Failed to fetch blogs");
//         const data = await res.json();
//         setBlogs(data.blogs || []);
//       } catch (err: any) {
//         console.error(err);
//         setError(err.message || "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchBlogs();
//   }, []);

//   const handleLike = (id: string) => {
//     setLikedBlogs((prev) => {
//       const next = new Set(prev);
//       next.has(id) ? next.delete(id) : next.add(id);
//       return next;
//     });
//   };

//   if (loading) {
//     return (
//       <Box
//         sx={{ display: "flex", justifyContent: "center", minHeight: "60vh" }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Container maxWidth="md" sx={{ py: 4 }}>
//         <Alert severity="error">{error}</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="md" sx={{ py: 6 }}>
//       {/* Header */}
//       <Stack spacing={2} sx={{ mb: 4 }}>
//         <Typography
//           variant="h4"
//           sx={{
//             fontWeight: 700,
//             background: "linear-gradient(135deg,#667eea,#764ba2)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//           }}
//         >
//           Research Blogs
//         </Typography>
//         <Typography color="text.secondary">
//           Explore research notes and insights written by students.
//         </Typography>
//       </Stack>

//       {/* Blog Cards */}
//       <Grid container spacing={3}>
//         {blogs.map((blog) => {
//           const isLiked = likedBlogs.has(blog._id);
//           return (
//             <Grid item xs={12} sm={6} md={4} key={blog._id}>
//               <Card
//                 sx={{
//                   borderRadius: 2,
//                   border: "1px solid #e0e0e0",
//                   transition: "0.3s",
//                   "&:hover": {
//                     boxShadow: "0 8px 24px rgba(102,126,234,.15)",
//                     transform: "translateY(-4px)",
//                   },
//                 }}
//               >
//                 <CardContent>
//                   {blog.category && (
//                     <Chip
//                       label={blog.category}
//                       size="small"
//                       sx={{
//                         mb: 1,
//                         background: "#f0f4ff",
//                         color: "#667eea",
//                         fontWeight: 600,
//                       }}
//                     />
//                   )}

//                   <Typography
//                     variant="h6"
//                     sx={{
//                       fontWeight: 700,
//                       cursor: "pointer",
//                       "&:hover": { color: "#667eea" },
//                     }}
//                     onClick={() => setSelectedBlog(blog)}
//                   >
//                     {blog.title}
//                   </Typography>

//                   <Typography
//                     variant="body2"
//                     sx={{
//                       color: "#666",
//                       mt: 1,
//                       display: "-webkit-box",
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: "vertical",
//                       overflow: "hidden",
//                     }}
//                   >
//                     {blog.content}
//                   </Typography>

//                   <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
//                     <Avatar sx={{ width: 28, height: 28 }}>
//                       {blog.author?.name?.[0]}
//                     </Avatar>
//                     <Typography variant="caption">{blog.author?.name}</Typography>
//                     <AccessTimeIcon sx={{ fontSize: 16 }} />
//                     <Typography variant="caption">{blog.readTime} min</Typography>
//                   </Stack>
//                 </CardContent>

//                 <CardActions sx={{ borderTop: "1px solid #eee" }}>
//                   <Button
//                     size="small"
//                     startIcon={<ArrowForwardIcon />}
//                     onClick={() => setSelectedBlog(blog)}
//                   >
//                     Read More
//                   </Button>

//                   <Box sx={{ ml: "auto" }}>
//                     <Button
//                       size="small"
//                       onClick={() => handleLike(blog._id)}
//                       startIcon={<FavoriteBorderIcon />}
//                     >
//                       {(blog.likes || 0) + (isLiked ? 1 : 0)}
//                     </Button>
//                     <Button size="small">
//                       <BookmarkBorderIcon />
//                     </Button>
//                     <Button size="small">
//                       <ShareIcon />
//                     </Button>
//                   </Box>
//                 </CardActions>
//               </Card>
//             </Grid>
//           );
//         })}
//       </Grid>

//       {/* Read Blog Modal */}
//       {selectedBlog && (
//         <BlogReadModal
//           blog={selectedBlog}
//           onClose={() => setSelectedBlog(null)}
//         />
//       )}
//     </Container>
//   );
// }


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