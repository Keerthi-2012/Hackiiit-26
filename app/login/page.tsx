"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Container,
  TextField,
  Button,
  Typography,
  Stack,
  Alert,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
body {
  min-height: 100vh;
  background:
    radial-gradient(1200px circle at 50% -30%, rgba(56,189,248,0.18), transparent 45%),
    linear-gradient(180deg, #020617, #020b2d);
  color: #e5e7eb;
  font-family: Inter, system-ui, -apple-system;
}

.login-card {
  background: rgba(17, 24, 39, 0.92);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: 20px;
  padding: 44px 36px;
  margin-top: 72px;
  box-shadow: 0 40px 90px rgba(2,6,23,0.85);
}

.login-title {
  font-size: 2.2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #22d3ee, #38bdf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* MUI inputs */
.MuiOutlinedInput-root {
  background: rgba(2,6,23,0.6);
  border-radius: 14px;
}

.MuiOutlinedInput-notchedOutline {
  border-color: rgba(148,163,184,0.25);
}

.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
  border-color: #38bdf8;
  box-shadow: 0 0 0 3px rgba(56,189,248,0.18);
}

.MuiInputBase-input {
  color: #e5e7eb;
  padding: 18px 16px 14px;
}

/* 🔥 AUTOFILL FIX */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-text-fill-color: #e5e7eb !important;
  caret-color: #e5e7eb;
  transition: background-color 9999s ease-in-out 0s;
  box-shadow: 0 0 0 1000px rgba(2,6,23,0.6) inset !important;
  border-radius: 14px;
}

/* Button */
.MuiButton-contained {
  border-radius: 14px;
  padding: 14px 0;
  font-weight: 800;
  background: linear-gradient(135deg, #22d3ee, #38bdf8);
  box-shadow: 0 14px 34px rgba(34,211,238,0.35);
}

.login-link {
  color: #38bdf8;
  font-weight: 600;
  text-decoration: none;
}
`}</style>

      <Container maxWidth="sm">
        <Box className="login-card">
          <Stack spacing={3}>
            <Typography variant="h4" className="login-title">
              Login
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <Box
              component="form"
              onSubmit={handleLogin}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true, // ✅ FIX
                  style: { color: "#9ca3af" },
                }}
                InputProps={{
                  style: { color: "#e5e7eb" },
                }}
              />

              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                InputLabelProps={{ shrink: true, style: { color: "#e5e7eb" } }}
                InputProps={{
                  style: { color: "#e5e7eb" },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        onClick={() => setShowPassword((show) => !show)}
                        edge="end"
                        tabIndex={-1}
                        sx={{ color: "#e5e7eb" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                variant="contained"
                size="large"
                type="submit"
                disabled={loading}
                sx={{
                  background:
                    "linear-gradient(135deg, #22d3ee, #38bdf8)",
                  color: "#020617",
                  fontWeight: 700,
                }}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Box>

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2">
                Don't have an account?{" "}
                <Link href="/signup" className="login-link">
                  Sign up here
                </Link>
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Container>
    </>
  );
}
