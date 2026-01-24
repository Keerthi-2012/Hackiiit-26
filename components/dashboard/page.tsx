
<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
"use client";
import { useState } from "react";
>>>>>>> 36a473bec7b89011da50bf031c5da058c0579e39
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
<<<<<<< HEAD

=======
>>>>>>> 36a473bec7b89011da50bf031c5da058c0579e39
import QueryCard from "./QueryCard";
import AddQueryModal from "@/components/dashboard/AddQueryModal";

const TAGS = ["All", "Systems", "ML", "Theory", "VLSI", "Networks"];

const TAGS = ["All", "Systems", "ML", "Theory", "VLSI", "Networks"];
const TAG_COLORS = {
  Systems: "#2196F3",
  ML: "#4CAF50",
  Theory: "#FF9800",
  VLSI: "#9C27B0",
  Networks: "#F44336",
};

export default function Dashboard() {
  const [queries, setQueries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("All");

<<<<<<< HEAD
  useEffect(() => {
    async function fetchQueries() {
      try {
        const res = await fetch("/api/query", { cache: "no-store" });
        const data = await res.json();
        setQueries(data);
      } catch (err) {
        console.error("Failed to fetch queries", err);
      } finally {
        setLoading(false);
      }
    }

    fetchQueries();
  }, []);

  const filteredQueries = queries.filter((q) => {
    const matchesSearch =
      q.title?.toLowerCase().includes(search.toLowerCase()) ||
      q.description?.toLowerCase().includes(search.toLowerCase());

    const matchesTag =
      tag === "All" || q.tags?.includes(tag);

    return matchesSearch && matchesTag;
  });

  if (loading) {
    return <Box sx={{ p: 4 }}>Loading queries...</Box>;
  }

=======
  const filteredQueries = queries.filter((q) => {
    const matchesSearch = q.title
      .toLowerCase()
      .includes(search.toLowerCase()) ||
      q.description.toLowerCase().includes(search.toLowerCase());
    const matchesTag = tag === "All" || q.tags.includes(tag);
    return matchesSearch && matchesTag;
  });

>>>>>>> 36a473bec7b89011da50bf031c5da058c0579e39
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
<<<<<<< HEAD
            sx={{ fontWeight: 700, color: "#1F2937" }}
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

=======
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

>>>>>>> 36a473bec7b89011da50bf031c5da058c0579e39
        {/* Stats */}
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Paper
            sx={{
              p: 2,
              background: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
              borderRadius: 2,
<<<<<<< HEAD
              minWidth: 160,
            }}
          >
            <Typography variant="body2" sx={{ color: "#6B7280" }}>
              Total Queries
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {queries.length}
            </Typography>
          </Paper>

=======
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
>>>>>>> 36a473bec7b89011da50bf031c5da058c0579e39
          <Paper
            sx={{
              p: 2,
              background: "linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)",
              borderRadius: 2,
<<<<<<< HEAD
              minWidth: 160,
            }}
          >
            <Typography variant="body2" sx={{ color: "#6B7280" }}>
              Total Answers
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {queries.reduce(
                (sum, q) => sum + (q.answers?.length || 0),
                0
              )}
=======
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
>>>>>>> 36a473bec7b89011da50bf031c5da058c0579e39
            </Typography>
          </Paper>
        </Box>
      </Box>

<<<<<<< HEAD
      {/* Search & Filter */}
=======
      {/* Search & Filter Section */}
>>>>>>> 36a473bec7b89011da50bf031c5da058c0579e39
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
<<<<<<< HEAD
=======
            "@media (max-width: 600px)": {
              flexDirection: "column",
              alignItems: "stretch",
            },
>>>>>>> 36a473bec7b89011da50bf031c5da058c0579e39
          }}
        >
          <TextField
            fullWidth
            placeholder="Search by keyword"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
<<<<<<< HEAD
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#9CA3AF" }} />
                </InputAdornment>
              ),
            }}
            sx={{
=======
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
>>>>>>> 36a473bec7b89011da50bf031c5da058c0579e39
              minWidth: 250,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "#F9FAFB",
              },
<<<<<<< HEAD
            }}
          />

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Filter by Tag</InputLabel>
            <Select
              value={tag}
              label="Filter by Tag"
              onChange={(e) => setTag(e.target.value)}
=======
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
>>>>>>> 36a473bec7b89011da50bf031c5da058c0579e39
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

<<<<<<< HEAD
      {/* Active Filters */}
      {(search || tag !== "All") && (
        <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap" }}>
          {search && (
            <Chip
              label={`Search: "${search}"`}
              onDelete={() => setSearch("")}
              size="small"
              variant="outlined"
            />
          )}
          {tag !== "All" && (
            <Chip
              label={`Tag: ${tag}`}
              onDelete={() => setTag("All")}
              size="small"
              variant="outlined"
            />
          )}
        </Stack>
=======
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
>>>>>>> 36a473bec7b89011da50bf031c5da058c0579e39
      )}

      {/* Modal */}
      {showModal && <AddQueryModal onClose={() => setShowModal(false)} />}

<<<<<<< HEAD
      {/* Query List */}
      {filteredQueries.length > 0 ? (
        filteredQueries.map((q) => (
          <QueryCard key={q._id} query={q} />
        ))
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
          <SearchIcon sx={{ fontSize: 48, mb: 2 }} />
          <Typography variant="h6">No queries found</Typography>
          <Typography variant="body2">
            Try adjusting your search or filters
          </Typography>
        </Paper>
      )}
=======
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
>>>>>>> 36a473bec7b89011da50bf031c5da058c0579e39
    </Container>
  );
}
