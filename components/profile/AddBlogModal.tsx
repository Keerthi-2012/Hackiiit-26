// "use client";

// import { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Chip,
//   Stack,
//   OutlinedInput,
// } from "@mui/material";

// /* =========================
//    Tag Options (same style as dashboard)
// ========================= */
// const TAGS = [
//   "Machine Learning",
//   "Systems",
//   "VLSI",
//   "Theory",
//   "Computer Vision",
//   "NLP",
//   "Databases",
//   "Networks",
//   "Security",
//   "Distributed Systems",
//   "Algorithms",
//   "Optimization",
//   "Robotics",
//   "HCI",
//   "Bioinformatics",
// ];

// export default function AddBlogModal({
//   onClose,
// }: {
//   onClose: () => void;
// }) {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [tags, setTags] = useState<string[]>([]);

//   function submit() {
//     console.log({
//       title,
//       content,
//       tags,
//     });

//     // later → POST /api/blog
//     onClose();
//   }

//   return (
//     <Box sx={overlay}>
//       <Box sx={modal}>
//         <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
//           Add Blog
//         </Typography>

//         {/* Blog Title */}
//         <TextField
//           fullWidth
//           label="Blog Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           sx={{ mb: 2 }}
//         />

//         {/* Blog Content */}
//         <TextField
//           fullWidth
//           multiline
//           rows={6}
//           label="Blog Content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           sx={{ mb: 2 }}
//         />

//         {/* Tag Selection (Dashboard style) */}
//         <FormControl fullWidth sx={{ mb: 2 }}>
//           <InputLabel>Tags</InputLabel>
//           <Select
//             multiple
//             value={tags}
//             onChange={(e) => setTags(e.target.value as string[])}
//             input={<OutlinedInput label="Tags" />}
//             renderValue={(selected) => (
//               <Stack direction="row" spacing={1} flexWrap="wrap">
//                 {selected.map((tag) => (
//                   <Chip key={tag} label={tag} size="small" />
//                 ))}
//               </Stack>
//             )}
//           >
//             {TAGS.map((tag) => (
//               <MenuItem key={tag} value={tag}>
//                 {tag}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         {/* Actions */}
//         <Stack direction="row" spacing={2} justifyContent="flex-end">
//           <Button onClick={onClose}>Cancel</Button>
//           <Button variant="contained" onClick={submit}>
//             Post Blog
//           </Button>
//         </Stack>
//       </Box>
//     </Box>
//   );
// }

// /* =========================
//    Styles
// ========================= */
// const overlay = {
//   position: "fixed",
//   inset: 0,
//   backgroundColor: "rgba(0,0,0,0.4)",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   zIndex: 1300,
// };

// const modal = {
//   backgroundColor: "#fff",
//   padding: 3,
//   borderRadius: 2,
//   width: 550,
// };
"use client";

import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  OutlinedInput,
} from "@mui/material";

/* =========================
   Tag Options (same style as dashboard)
========================= */
const TAGS = [
  "Machine Learning",
  "Systems",
  "VLSI",
  "Theory",
  "Computer Vision",
  "NLP",
  "Databases",
  "Networks",
  "Security",
  "Distributed Systems",
  "Algorithms",
  "Optimization",
  "Robotics",
  "HCI",
  "Bioinformatics",
];

export default function AddBlogModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!title || !content || tags.length === 0) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description: content.slice(0, 120), // short preview
          content,
          tags,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create blog");
      }

      // Success → close modal
      onClose();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={overlay}>
      <Box sx={modal}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Add Blog
        </Typography>

        {/* Blog Title */}
        <TextField
          fullWidth
          label="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Blog Content */}
        <TextField
          fullWidth
          multiline
          rows={6}
          label="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Tag Selection (Dashboard style) */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Tags</InputLabel>
          <Select
            multiple
            value={tags}
            onChange={(e) => setTags(e.target.value as string[])}
            input={<OutlinedInput label="Tags" />}
            renderValue={(selected) => (
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {selected.map((tag) => (
                  <Chip key={tag} label={tag} size="small" />
                ))}
              </Stack>
            )}
          >
            {TAGS.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Actions */}
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="contained" onClick={submit} disabled={loading}>
            {loading ? "Posting..." : "Post Blog"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

/* =========================
   Styles
========================= */
const overlay = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1300,
};

const modal = {
  backgroundColor: "#fff",
  padding: 3,
  borderRadius: 2,
  width: 550,
};
