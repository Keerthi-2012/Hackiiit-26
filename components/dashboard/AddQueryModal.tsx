"use client";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Chip,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  Paper,
  Stack,
  IconButton,
  Alert,
} from "@mui/material";
import {
  Close as CloseIcon,
  Send as SendIcon,
  Tag as TagIcon,
  Info as InfoIcon,
  AttachFile as AttachFileIcon,
} from "@mui/icons-material";

/* =========================
   Tags
========================= */
const TAG_OPTIONS = [
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

const TAG_COLORS: Record<string, string> = {
  "Machine Learning": "#2196F3",
  Systems: "#4CAF50",
  VLSI: "#9C27B0",
  Theory: "#FF9800",
  "Computer Vision": "#F44336",
  NLP: "#00BCD4",
  Databases: "#FF5722",
  Networks: "#009688",
  Security: "#795548",
  "Distributed Systems": "#673AB7",
  Algorithms: "#3F51B5",
  Optimization: "#CDDC39",
  Robotics: "#E91E63",
  HCI: "#00ACC1",
  Bioinformatics: "#8BC34A",
};

export default function AddQueryModal({
  onClose,
}: {
  onClose: () => void;
}) {
  /* =========================
     State
  ========================= */
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [anonymous, setAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // UI-only attachments
  const [files, setFiles] = useState<File[]>([]);

  /* =========================
     Helpers
  ========================= */
  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  }

  /* =========================
     Submit (BACKEND SAFE)
  ========================= */
  async function handleSubmit() {
    if (!title.trim() || !text.trim() || selectedTags.length === 0) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description: text,
          tags: selectedTags,
          isAnonymous: anonymous,
        }),
      });

      if (!res.ok) throw new Error("Failed to create query");

      onClose();
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to post query");
    } finally {
      setIsSubmitting(false);
    }
  }

  const isFormValid =
    title.trim().length > 0 &&
    text.trim().length > 0 &&
    selectedTags.length > 0;

  /* =========================
     UI
  ========================= */
  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography fontWeight={700}>Create New Query</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3}>
          {/* ✅ Title */}
          <TextField
            label="Query Title"
            placeholder="Short, clear title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            inputProps={{ maxLength: 80 }}
            helperText={`${title.length}/80`}
          />

          {/* Description */}
          <TextField
            label="Describe Your Research Query"
            multiline
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
          />

          {/* Tags */}
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <TagIcon color="primary" />
              <Typography fontWeight={600}>
                Select Tags ({selectedTags.length})
              </Typography>
            </Stack>

            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {TAG_OPTIONS.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onClick={() => toggleTag(tag)}
                    sx={{
                      backgroundColor: selectedTags.includes(tag)
                        ? TAG_COLORS[tag]
                        : "rgba(0,0,0,0.1)",
                      color: selectedTags.includes(tag) ? "white" : "#333",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </Box>
            </Paper>
          </Box>

          {/* Attachments (UI only) */}
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <AttachFileIcon color="primary" />
              <Typography fontWeight={600}>Attachments</Typography>
            </Stack>

            <Button
              component="label"
              variant="outlined"
              sx={{ mt: 1 }}
              startIcon={<AttachFileIcon />}
            >
              Attach Files
              <input hidden type="file" multiple onChange={handleFileChange} />
            </Button>

            {files.length > 0 && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption">Selected files:</Typography>
                <ul style={{ marginTop: 4 }}>
                  {files.map((file, i) => (
                    <li key={i}>{file.name}</li>
                  ))}
                </ul>
              </Box>
            )}
          </Box>

          {/* Anonymous */}
          <FormControlLabel
            control={
              <Checkbox
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
              />
            }
            label="Post Anonymously"
          />

          <Alert severity="info" icon={<InfoIcon />}>
            Your query will be visible to the community.
          </Alert>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          startIcon={<SendIcon />}
          disabled={!isFormValid || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Posting..." : "Post Query"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
