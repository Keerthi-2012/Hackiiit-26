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
   Tag Options
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description: content.slice(0, 120),
          content,
          tags,
        }),
      });

      if (!res.ok) throw new Error("Failed to create blog");

      onClose();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* ===== CSS ===== */}
      <style>{`
        :root {
          --bg: #0f172a;
          --card: #111827;
          --border: #1f2933;
          --text: #e5e7eb;
          --muted: #9ca3af;
          --accent: #667eea;
        }

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1300;
        }

        .modal {
          background: var(--card);
          color: var(--text);
          padding: 24px;
          border-radius: 14px;
          width: 560px;
          border: 1px solid var(--border);
          box-shadow: 0 20px 50px rgba(0,0,0,0.4);
        }

        .modal-title {
          font-weight: 700;
          margin-bottom: 16px;
        }

        .input {
          margin-bottom: 16px;
        }

        .chip {
          background: rgba(102,126,234,0.15) !important;
          color: var(--accent) !important;
          font-weight: 600;
        }

        .actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 16px;
        }

        .cancel-btn {
          color: var(--muted);
        }

        .submit-btn {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          font-weight: 700;
        }
      `}</style>

      {/* ===== MODAL ===== */}
      <div className="overlay">
        <div className="modal">
          <Typography variant="h6" className="modal-title">
            Add Blog
          </Typography>

          {/* Title */}
          <TextField
            fullWidth
            label="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            sx={{
              /* ===== LABEL COLOR ===== */
              '& .MuiInputLabel-root': {
                color: '#ffffff',            // default label (white)
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#e0e7ff',             // focused label
              },

              /* ===== INPUT FIELD ===== */
              '& .MuiOutlinedInput-root': {
                color: '#e0e7ff',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '& fieldset': {
                  borderColor: 'rgba(79, 172, 254, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(79, 172, 254, 0.6)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(79, 172, 254, 0.8)',
                  borderWidth: 2,
                },
              },

              /* ===== PLACEHOLDER ===== */
              '& .MuiOutlinedInput-input::placeholder': {
                color: 'rgba(255, 255, 255, 0.4)',
                opacity: 1,
              },
            }}
          />


          {/* Content */}
          <TextField
            fullWidth
            label="Blog Description"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input"
            sx={{
              /* ===== LABEL COLOR ===== */
              '& .MuiInputLabel-root': {
                color: '#ffffff',            // default label (white)
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#e0e7ff',             // focused label
              },

              /* ===== INPUT FIELD ===== */
              '& .MuiOutlinedInput-root': {
                color: '#e0e7ff',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '& fieldset': {
                  borderColor: 'rgba(79, 172, 254, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(79, 172, 254, 0.6)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(79, 172, 254, 0.8)',
                  borderWidth: 2,
                },
              },

              /* ===== PLACEHOLDER ===== */
              '& .MuiOutlinedInput-input::placeholder': {
                color: 'rgba(255, 255, 255, 0.4)',
                opacity: 1,
              },
            }}
          />


          {/* Tags */}
          <FormControl fullWidth className="input" sx={{
            /* ===== LABEL COLOR ===== */
            '& .MuiInputLabel-root': {
              color: '#ffffff',            // default label (white)
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#e0e7ff',             // focused label
            },

            /* ===== INPUT FIELD ===== */
            '& .MuiOutlinedInput-root': {
              color: '#e0e7ff',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              '& fieldset': {
                borderColor: 'rgba(79, 172, 254, 0.3)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(79, 172, 254, 0.6)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'rgba(79, 172, 254, 0.8)',
                borderWidth: 2,
              },
            },

            /* ===== PLACEHOLDER ===== */
            '& .MuiOutlinedInput-input::placeholder': {
              color: 'rgba(255, 255, 255, 0.4)',
              opacity: 1,
            },
          }}>
            <InputLabel>Tags</InputLabel>
            <Select
              multiple
              value={tags}
              onChange={(e) => setTags(e.target.value as string[])}
              input={<OutlinedInput label="Tags" />}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: '#111827', // same as modal card
                    color: '#e5e7eb',
                    border: '1px solid #1f2933',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                  },
                },
              }}
              renderValue={(selected) => (
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {selected.map((tag) => (
                    <Chip key={tag} label={tag} size="small" className="chip" />
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
          <div className="actions">
            <Button onClick={onClose} disabled={loading} className="cancel-btn">
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={submit}
              disabled={loading}
              className="submit-btn"
            >
              {loading ? "Posting..." : "Post Blog"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
