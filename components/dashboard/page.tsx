"use client";

import { useEffect, useState } from "react";
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

const TAGS = ["All", "Systems", "ML", "Theory", "VLSI", "Networks"];

export default function Dashboard() {
  const [queries, setQueries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("All");

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

        {/* Stats */}
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Paper
            sx={{
              p: 2,
              background: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
              borderRadius: 2,
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

          <Paper
            sx={{
              p: 2,
              background: "linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)",
              borderRadius: 2,
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
            </Typography>
          </Paper>
        </Box>
      </Box>

      {/* Search & Filter */}
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
          }}
        >
        <input
            type="text"
            placeholder="Search by keyword"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, padding: 8 }}
          />
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Filter by Tag</InputLabel>
            <Select
              value={tag}
              label="Filter by Tag"
              onChange={(e) => setTag(e.target.value)}
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
      )}

      {/* Modal */}
      {showModal && <AddQueryModal onClose={() => setShowModal(false)} />}

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
    </Container>
  );
}