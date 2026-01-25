
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
} from "@mui/icons-material";

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

const TAG_COLORS: { [key: string]: string } = {
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
  const [text, setText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [anonymous, setAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  }

async function handleSubmit() {
  if (!text.trim() || selectedTags.length === 0) return;

  setIsSubmitting(true);

  try {
    const res = await fetch("/api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: text.slice(0, 80),
        description: text,
        tags: selectedTags,
        isAnonymous: anonymous,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to create query");
    }

    onClose();
    window.location.reload(); // simple refresh
  } catch (err) {
    console.error(err);
    alert("Failed to post query");
  } finally {
    setIsSubmitting(false);
  }
}

  const isFormValid = text.trim().length > 0 && selectedTags.length > 0;

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
          background: "linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)",
          border: "1px solid rgba(33, 150, 243, 0.1)",
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
          borderBottom: "2px solid rgba(33, 150, 243, 0.1)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SendIcon sx={{ color: "white", fontSize: 20 }} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#1A1A1A",
              fontSize: "1.2rem",
            }}
          >
            Create New Query
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(244, 67, 54, 0.1)",
              color: "#F44336",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Stack spacing={3}>
          {/* Query Text Area */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                mb: 1,
                color: "#333",
                fontSize: "0.9rem",
              }}
            >
              Describe Your Research Query
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={5}
              placeholder="Be specific and detailed. The more information you provide, the better answers you'll get..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#FFF",
                  transition: "all 0.3s ease",
                  fontSize: "0.95rem",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(33, 150, 243, 0.1)",
                  },
                  "&.Mui-focused": {
                    boxShadow: "0 0 0 3px rgba(33, 150, 243, 0.15)",
                  },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(33, 150, 243, 0.2)",
                },
              }}
            />
            <Typography
              variant="caption"
              sx={{
                mt: 1,
                display: "block",
                color: "text.secondary",
                fontSize: "0.8rem",
              }}
            >
              {text.length}/500 characters
            </Typography>
          </Box>

          {/* Tags Section */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
              <TagIcon
                sx={{
                  color: "#2196F3",
                  fontSize: 20,
                }}
              />
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: "#333",
                  fontSize: "0.9rem",
                }}
              >
                Select Tags ({selectedTags.length}/3)
              </Typography>
            </Box>

            <Paper
              sx={{
                p: 2,
                background: "rgba(33, 150, 243, 0.05)",
                border: "1px solid rgba(33, 150, 243, 0.1)",
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                {TAG_OPTIONS.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onClick={() => toggleTag(tag)}
                    sx={{
                      backgroundColor: selectedTags.includes(tag)
                        ? TAG_COLORS[tag]
                        : "rgba(0, 0, 0, 0.08)",
                      color: selectedTags.includes(tag) ? "white" : "#666",
                      border: selectedTags.includes(tag)
                        ? `2px solid ${TAG_COLORS[tag]}`
                        : "1px solid rgba(0, 0, 0, 0.12)",
                      fontWeight: selectedTags.includes(tag) ? 600 : 500,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      fontSize: "0.85rem",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  />
                ))}
              </Box>
            </Paper>

            {selectedTags.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    display: "block",
                    mb: 1,
                    fontSize: "0.8rem",
                  }}
                >
                  Selected tags:
                </Typography>
                <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap" }}>
                  {selectedTags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => toggleTag(tag)}
                      size="small"
                      sx={{
                        backgroundColor: TAG_COLORS[tag],
                        color: "white",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        "& .MuiChip-deleteIcon": {
                          color: "rgba(255, 255, 255, 0.7)",
                          "&:hover": {
                            color: "white",
                          },
                        },
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            )}
          </Box>

          {/* Anonymous Checkbox */}
          <Paper
            sx={{
              p: 2,
              background: "linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)",
              border: "1px solid #CE93D8",
              borderRadius: 2,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                  sx={{
                    color: "#7B1FA2",
                    "&.Mui-checked": {
                      color: "#7B1FA2",
                    },
                  }}
                />
              }
              label={
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: "#333" }}
                  >
                    Post Anonymously
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", fontSize: "0.75rem" }}
                  >
                    Your identity will be hidden from other users
                  </Typography>
                </Box>
              }
              sx={{
                width: "100%",
                m: 0,
              }}
            />
          </Paper>

          {/* Info Alert */}
          {text.length > 0 && (
            <Alert
              icon={<InfoIcon sx={{ fontSize: 20 }} />}
              severity="info"
              sx={{
                borderRadius: 2,
                backgroundColor: "rgba(33, 150, 243, 0.08)",
                border: "1px solid rgba(33, 150, 243, 0.2)",
                "& .MuiAlert-message": {
                  fontSize: "0.85rem",
                },
              }}
            >
              Your query will be visible to the community. Please ensure you
              provide enough context for others to understand your question.
            </Alert>
          )}
        </Stack>
      </DialogContent>

      {/* Actions */}
      <DialogActions
        sx={{
          p: 2,
          borderTop: "1px solid rgba(33, 150, 243, 0.1)",
          gap: 1,
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            textTransform: "none",
            fontSize: "0.95rem",
            fontWeight: 600,
            borderColor: "#E0E0E0",
            color: "#666",
            borderRadius: 2,
            px: 3,
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: "#999",
              backgroundColor: "rgba(0, 0, 0, 0.02)",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!isFormValid || isSubmitting}
          startIcon={<SendIcon />}
          sx={{
            textTransform: "none",
            fontSize: "0.95rem",
            fontWeight: 600,
            background: isFormValid
              ? "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)"
              : "rgba(0, 0, 0, 0.12)",
            color: isFormValid ? "white" : "rgba(0, 0, 0, 0.38)",
            borderRadius: 2,
            px: 3,
            boxShadow: isFormValid ? "0 4px 15px rgba(33, 150, 243, 0.3)" : "none",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: isFormValid
                ? "0 6px 20px rgba(33, 150, 243, 0.4)"
                : "none",
              transform: isFormValid ? "translateY(-2px)" : "none",
            },
          }}
        >
          {isSubmitting ? "Posting..." : "Post Query"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}