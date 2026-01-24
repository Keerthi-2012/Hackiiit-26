
"use client";
import { useState } from "react";
import {
  Container,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Paper,
  Chip,
  InputAdornment,
  Stack,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import QueryCard from "./QueryCard";
import AddQueryModal from "@/components/dashboard/AddQueryModal";

const queries = [
  {
    id: "1",
    title: "How to start research in distributed systems?",
    description: "Looking for guidance and papers.",
    tags: ["Systems"],
    answers: 3,
    createdAt: "2 hours ago",
  },
];

const TAGS = ["All", "Systems", "ML", "Theory", "VLSI", "Networks"];
const TAG_COLORS = {
  Systems: "#2196F3",
  ML: "#4CAF50",
  Theory: "#FF9800",
  VLSI: "#9C27B0",
  Networks: "#F44336",
};

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("All");

  const filteredQueries = queries.filter((q) => {
    const matchesSearch = q.title
      .toLowerCase()
      .includes(search.toLowerCase()) ||
      q.description.toLowerCase().includes(search.toLowerCase());
    const matchesTag = tag === "All" || q.tags.includes(tag);
    return matchesSearch && matchesTag;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#1F2937",
            }}
          >
            All Queries
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setShowModal(true)}
            sx={{
              background: "#4C6FFF",
              textTransform: "none",
              fontSize: 16,
              fontWeight: 600,
              px: 3,
              py: 1.2,
              borderRadius: 2,
              "&:hover": {
                background: "#1E3A8A",
              },
            }}
          >
            Add Query
          </Button>
        </Box>

        {/* Stats */}
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Paper
            sx={{
              p: 2,
              background: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
              borderRadius: 2,
              flex: "1 1 auto",
              minWidth: 150,
            }}
          >
            <Typography variant="body2" sx={{ color: "#6B7280", mb: 0.5 }}>
              Total Queries
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "#1F2937" }}
            >
              {queries.length}
            </Typography>
          </Paper>
          <Paper
            sx={{
              p: 2,
              background: "linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)",
              borderRadius: 2,
              flex: "1 1 auto",
              minWidth: 150,
            }}
          >
            <Typography variant="body2" sx={{ color: "#6B7280", mb: 0.5 }}>
              Total Answers
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "#1F2937" }}
            >
              {queries.reduce((sum, q) => sum + q.answers, 0)}
            </Typography>
          </Paper>
        </Box>
      </Box>

      {/* Search & Filter Section */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          background: "#FAFAFA",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "flex-end",
            "@media (max-width: 600px)": {
              flexDirection: "column",
              alignItems: "stretch",
            },
          }}
        >
          <TextField
            fullWidth
            placeholder="Search by keyword"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#9CA3AF", mr: 1 }} />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            size="small"
            sx={{
              flex: 1,
              minWidth: 250,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "#F9FAFB",
              },
              "& input": {
                color: "#111827",
              },
            }}
          />
          <FormControl
            sx={{
              minWidth: 150,
              "@media (max-width: 600px)": {
                minWidth: "unset",
                flex: 1,
              },
            }}
            size="small"
          >
            <InputLabel>Filter by Tag</InputLabel>
            <Select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              label="Filter by Tag"
            >
              {TAGS.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* Active Filters Display */}
      {(search || tag !== "All") && (
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
            {search && (
              <Chip
                label={`Search: "${search}"`}
                onDelete={() => setSearch("")}
                color="default"
                variant="outlined"
                size="small"
              />
            )}
            {tag !== "All" && (
              <Chip
                label={`Tag: ${tag}`}
                onDelete={() => setTag("All")}
                color="default"
                variant="outlined"
                size="small"
              />
            )}
          </Stack>
        </Box>
      )}

      {/* Modal */}
      {showModal && <AddQueryModal onClose={() => setShowModal(false)} />}

      {/* Queries List using QueryCard */}
      <div>
        {filteredQueries.length > 0 ? (
          filteredQueries.map((q) => <QueryCard key={q.id} query={q} />)
        ) : (
          <Paper
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 2,
              background: "#F9FAFB",
              border: "2px dashed #D1D5DB",
              color: "#6B7280",
            }}
          >
            <SearchIcon sx={{ fontSize: 48, color: "#9CA3AF", mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              No queries found
            </Typography>
            <Typography variant="body2">
              Try adjusting your search or filters
            </Typography>
          </Paper>
        )}
      </div>
    </Container>
  );
}
