
"use client";

import { useEffect, useState } from "react";
import QueryCard from "./QueryCard";
import AddQueryModal from "@/components/dashboard/AddQueryModal";

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
import { Add as AddIcon } from "@mui/icons-material";

const dashboardStyles = `
  @keyframes floatUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    0% {
      opacity: 0;
      transform: translateX(-30px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.6; }
    50% { transform: scale(1.05); opacity: 0.8; }
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .dashboard-container {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
    min-height: 100vh;
    color: #e0e7ff;
    padding: 2rem;
    position: relative;
    overflow: hidden;
  }

  .background-orbs {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(40px);
  }

  .orb-1 {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(79, 172, 254, 0.1) 0%, transparent 70%);
    top: 10%;
    left: 10%;
    animation: pulse 6s ease-in-out infinite;
  }

  .orb-2 {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%);
    bottom: 10%;
    right: 10%;
    animation: pulse 7s ease-in-out infinite 1s;
  }

  .content-wrapper {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
  }

  .header-section {
    margin-bottom: 2rem;
    animation: floatUp 0.6s ease-out;
  }

  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .icon-box {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    padding: 0.75rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }

  .title {
    font-size: 2rem;
    font-weight: 800;
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -1px;
  }

  .btn-primary {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: #0f172a;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 10px 30px rgba(79, 172, 254, 0.3);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-transform: none;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(79, 172, 254, 0.5);
  }

  .stats-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .stat-card {
    padding: 1.5rem;
    border-radius: 1rem;
    background: rgba(79, 172, 254, 0.08);
    border: 1px solid rgba(79, 172, 254, 0.2);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    animation: floatUp 0.6s ease-out 0.1s backwards;
  }

  .stat-card:hover {
    background: rgba(79, 172, 254, 0.12);
    border-color: rgba(79, 172, 254, 0.4);
    transform: translateY(-5px);
  }

  .stat-card.green {
    background: rgba(34, 197, 94, 0.08);
    border-color: rgba(34, 197, 94, 0.2);
  }

  .stat-card.green:hover {
    background: rgba(34, 197, 94, 0.12);
    border-color: rgba(34, 197, 94, 0.4);
  }

  .stat-label {
    color: #94a3b8;
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    letter-spacing: 1px;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 800;
    color: #00f2fe;
  }

  .stat-card.green .stat-value {
    color: #22c55e;
  }

  .search-container {
    padding: 2rem;
    margin-bottom: 2rem;
    border-radius: 1rem;
    background: rgba(15, 23, 42, 0.4);
    border: 1px solid rgba(79, 172, 254, 0.2);
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    animation: floatUp 0.6s ease-out 0.15s backwards;
  }

  .search-wrapper {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: flex-end;
  }

  .search-input,
  .filter-select {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(79, 172, 254, 0.3);
    color: white;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.95rem;
    transition: all 0.3s ease;
  }

  .search-input {
    flex: 1;
    min-width: 250px;
    font-family: inherit;
  }

  .search-input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  .search-input:focus,
  .filter-select:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(79, 172, 254, 0.6);
    box-shadow: 0 0 20px rgba(79, 172, 254, 0.2);
  }

  .filter-select {
    min-width: 180px;
    cursor: pointer;
    font-family: inherit;
  }

  .filter-select option {
    background: #1e293b;
    color: white;
  }

  .filter-chips {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
    animation: slideInLeft 0.4s ease-out;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    background: rgba(79, 172, 254, 0.2);
    color: #00f2fe;
    border: 1px solid rgba(79, 172, 254, 0.4);
    font-size: 0.85rem;
    animation: floatUp 0.3s ease-out;
  }

  .chip-close {
    cursor: pointer;
    transition: all 0.2s ease;
    opacity: 0.7;
  }

  .chip-close:hover {
    opacity: 1;
    transform: rotate(90deg);
  }

  .chip.green {
    background: rgba(34, 197, 94, 0.2);
    color: #22c55e;
    border-color: rgba(34, 197, 94, 0.4);
  }

  .queries-grid {
    
    display: grid;
    gap: 1.5rem;
  }

  /* Query Card Styling */
  :global(.queries-grid > *) {
    background: rgba(30, 41, 59, 0.6) ;
    border: 1px solid rgba(79, 172, 254, 0.15) !important;
    backdrop-filter: blur(10px);
    border-radius: 1rem !important;
    transition: all 0.3s ease !important;
  }

  :global(.queries-grid > *:hover) {
    background: rgba(30, 41, 59, 0.8) !important;
    border-color: rgba(79, 172, 254, 0.3) !important;
    transform: translateY(-3px) !important;
    box-shadow: 0 10px 30px rgba(79, 172, 254, 0.15) !important;
  }

  :global(.queries-grid h1, .queries-grid h2, .queries-grid h3, .queries-grid h4, .queries-grid h5, .queries-grid h6) {
    color: #e0e7ff !important;
    font-weight: 700 !important;
  }

  :global(.queries-grid p) {
    color: #cbd5e1 !important;
  }

  :global(.queries-grid span, .queries-grid div) {
    color: #cbd5e1 !important;
  }

  :global(.queries-grid a) {
    color: #00f2fe !important;
  }

  :global(.queries-grid button) {
    background: linear-gradient(135deg,rgb(79, 254, 123) 0%, #00f2fe 100%) !important;
    color:rgb(11, 12, 15) !important;
    border: none !important;
    font-weight: 600 !important;
  }

  :global(.queries-grid button:hover) {
    opacity: 0.9 !important;
    transform: translateY(-2px) !important;
  }

  :global(.queries-grid .MuiChip-root) {
    background: rgba(79, 172, 254, 0.2) !important;
    color: #00f2fe !important;
    border: 1px solid rgba(79, 172, 254, 0.4) !important;
  }

  :global(.queries-grid .MuiTag-root) {
    background: rgba(79, 172, 254, 0.2) !important;
    color: #00f2fe !important;
  }


  .empty-state {
    padding: 3rem 2rem;
    text-align: center;
    border-radius: 1rem;
    background: rgba(15, 23, 42, 0.4);
    border: 2px dashed rgba(79, 172, 254, 0.3);
    backdrop-filter: blur(10px);
    color: #94a3b8;
    animation: floatUp 0.6s ease-out;
  }

  .empty-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(79, 172, 254, 0.1);
    margin-bottom: 1rem;
    font-size: 2.5rem;
    animation: pulse 2s ease-in-out infinite;
  }

  .empty-title {
    font-size: 1.3rem;
    color: #e0e7ff;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  .loading-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    color: #e0e7ff;
    font-size: 1.1rem;
  }
`;

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

    const matchesTag = tag === "All" || q.tags?.includes(tag);

    return matchesSearch && matchesTag;
  });

  if (loading) {
    return (
      <div className="dashboard-container loading-container">
        <style>{dashboardStyles}</style>
        <div>⚡ Loading queries...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <style>{dashboardStyles}</style>

      <div className="background-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
      </div>

      <div className="content-wrapper">
        {/* Header Section */}
        <div className="header-section">
          <div className="header-top">
            <div className="header-left">
              <h1 className="title">All Queries</h1>
            </div>
            <button className="btn-primary" onClick={() => setShowModal(true)}>
            <AddIcon sx={{ fontSize: "1.2rem" }} /> Add Query
            </button>
          </div>

          {/* Stats */}
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-label">Total Queries</div>
              <div className="stat-value">{queries.length}</div>
            </div>
            <div className="stat-card green">
              <div className="stat-label">Total Answers</div>
              <div className="stat-value">
                {queries.reduce((sum, q) => sum + (q.answers?.length || 0), 0)}
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="search-container">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search by keyword"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            <select value={tag} onChange={(e) => setTag(e.target.value)} className="filter-select">
              {TAGS.map((t) => (
                <option key={t} value={t}>
                  {t === "All" ? "Filter by Tag" : t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(search || tag !== "All") && (
          <div className="filter-chips">
            {search && (
              <div className="chip">
                Search: "{search}"
                <span className="chip-close" onClick={() => setSearch("")}>✕</span>
              </div>
            )}
            {tag !== "All" && (
              <div className="chip green">
                Tag: {tag}
                <span className="chip-close" onClick={() => setTag("All")}>✕</span>
              </div>
            )}
          </div>
        )}

        {/* Modal */}
        {showModal && <AddQueryModal onClose={() => setShowModal(false)} />}

        {/* Query List */}
        {filteredQueries.length > 0 ? (
          <div className="queries-grid">
            {filteredQueries.map((q) => (
              <QueryCard key={q._id} query={q} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <div className="empty-title">No queries found</div>
            <div>Try adjusting your search or filters</div>
          </div>
        )}
      </div>
    </div>
  );
}