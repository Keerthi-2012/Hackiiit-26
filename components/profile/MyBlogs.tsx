// "use client";

// import { useState } from "react";
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
// import AccessTimeIcon from "@mui/icons-material/AccessTime";

// /* =========================
//    Types
// ========================= */
// type Blog = {
//   id: string;
//   title: string;
//   summary: string;
//   content: string;
//   createdAt: string;
//   author?: string;
//   category?: string;
//   readTime?: number;
// };

// /* =========================
//    🔹 HARD-CODED BLOGS
// ========================= */
// const HARD_CODED_BLOGS: Blog[] = [
//   {
//     id: "b1",
//     title: "Getting Started with Distributed Systems",
//     summary:
//       "An overview of clocks, consistency, and consensus for beginners.",
//     content: `
// Distributed systems are collections of independent computers
// that appear to users as a single coherent system.

// Topics covered:
// • Logical clocks (Lamport, Vector)
// • Consistency models
// • Leader election
// • Paxos & Raft
// • CAP theorem

// Recommended papers:
// - Lamport (1978)
// - Raft (Ongaro & Ousterhout)
//     `,
//     createdAt: "3 days ago",
//     author: "You",
//     category: "Systems",
//     readTime: 7,
//   },
//   {
//     id: "b2",
//     title: "Attention Mechanism Explained",
//     summary:
//       "Intuition behind self-attention and transformers without heavy math.",
//     content: `
// Attention allows models to focus on relevant parts of input.

// Key ideas:
// • Queries, Keys, Values
// • Scaled dot-product attention
// • Self-attention vs cross-attention
// • Transformers overview

// Used in:
// - BERT
// - GPT
// - Vision Transformers
//     `,
//     createdAt: "1 week ago",
//     author: "You",
//     category: "Machine Learning",
//     readTime: 10,
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
//             {blog.author} • {blog.createdAt} • {blog.readTime} min read
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
//    My Blogs Page
// ========================= */
// export default function MyBlogs() {
//   const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

//   return (
//     <Container maxWidth="md" sx={{ py: 6 }}>
//       <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
//         My Blogs
//       </Typography>

//       <Grid container spacing={3}>
//         {HARD_CODED_BLOGS.map((blog) => (
//           <Grid item xs={12} sm={6} md={4} key={blog.id}>
//             <Card
//               sx={{
//                 borderRadius: 2,
//                 border: "1px solid #e0e0e0",
//                 transition: "0.3s",
//                 "&:hover": {
//                   boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
//                   transform: "translateY(-4px)",
//                 },
//               }}
//             >
//               <CardContent>
//                 {blog.category && (
//                   <Chip
//                     label={blog.category}
//                     size="small"
//                     sx={{ mb: 1 }}
//                   />
//                 )}

//                 {/* Title */}
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     fontWeight: 700,
//                     cursor: "pointer",
//                     "&:hover": { color: "#667eea" },
//                   }}
//                   onClick={() => setSelectedBlog(blog)}
//                 >
//                   {blog.title}
//                 </Typography>

//                 {/* Preview (2 lines max) */}
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     color: "#666",
//                     mt: 1,
//                     display: "-webkit-box",
//                     WebkitLineClamp: 2,
//                     WebkitBoxOrient: "vertical",
//                     overflow: "hidden",
//                   }}
//                 >
//                   {blog.summary}
//                 </Typography>

//                 {/* Meta */}
//                 <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
//                   <Avatar sx={{ width: 28, height: 28 }}>
//                     {blog.author?.[0]}
//                   </Avatar>
//                   <Typography variant="caption">
//                     {blog.createdAt}
//                   </Typography>
//                   <AccessTimeIcon sx={{ fontSize: 16 }} />
//                   <Typography variant="caption">
//                     {blog.readTime} min
//                   </Typography>
//                 </Stack>
//               </CardContent>

//               <CardActions>
//                 <Button
//                   size="small"
//                   startIcon={<ArrowForwardIcon />}
//                   onClick={() => setSelectedBlog(blog)}
//                 >
//                   Read More
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
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

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
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
import AccessTimeIcon from "@mui/icons-material/AccessTime";

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
  return (
    <Dialog open onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>{blog.title}</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            {blog.author} • {blog.createdAt} • {blog.readTime} min read
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
   Blogs Page
========================= */
export default function MyBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  // -------------------------
  // Fetch blogs from API
  // -------------------------
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blog"); // <-- your API endpoint
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        My Blogs
      </Typography>

      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card
              sx={{
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  transform: "translateY(-4px)",
                },
              }}
            >
              <CardContent>
                {blog.category && (
                  <Chip
                    label={blog.category}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                )}

                {/* Title */}
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

                {/* Preview (2 lines max) */}
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
                  {blog.summary}
                </Typography>

                {/* Meta */}
                <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
                  <Avatar sx={{ width: 28, height: 28 }}>
                    {blog.author?.[0]}
                  </Avatar>
                  <Typography variant="caption">{blog.createdAt}</Typography>
                  <AccessTimeIcon sx={{ fontSize: 16 }} />
                  <Typography variant="caption">{blog.readTime} min</Typography>
                </Stack>
              </CardContent>

              <CardActions>
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
        ))}
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
