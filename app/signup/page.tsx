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

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    researchArea: "",
    lab: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      // Redirect to login page after successful signup
      router.push("/login");
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
          background: radial-gradient(circle at top, #0f1b4a, #0f172a);
          color: #e5e7eb;
        }
        .signup-card {
          background: #111827;
          border: 1px solid #1f2933;
          border-radius: 14px;
          box-shadow: 0 10px 30px rgba(102,126,234,0.15);
          padding: 40px 32px;
          margin-top: 64px;
        }
        .signup-title {
          font-weight: 700;
          background: linear-gradient(135deg, #22d3ee, #38bdf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .signup-link {
          color: #22d3ee !important;
          text-decoration: none;
          font-weight: 700;
          transition: color 0.2s;
        }
        .signup-link:hover {
          color: #38bdf8 !important;
        }

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

        /* ===== AUTOFILL FIX (SIGNUP) ===== */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        textarea:-webkit-autofill,
        textarea:-webkit-autofill:focus,
        select:-webkit-autofill {

          /* Force correct text color */
          -webkit-text-fill-color: #e5e7eb !important;
          caret-color: #e5e7eb;

          /* Override Chrome grey/yellow autofill bg */
          -webkit-box-shadow: 0 0 0 1000px rgba(2, 6, 23, 0.6) inset !important;
          box-shadow: 0 0 0 1000px rgba(2, 6, 23, 0.6) inset !important;

          /* Prevent flash */
          transition: background-color 9999s ease-in-out 0s;

          border-radius: 14px;
        }
      `}</style>

      <Container maxWidth="sm">
        <Box className="signup-card">
          <Stack spacing={3}>
            <Typography variant="h4" className="signup-title">
              Create Account
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <Box
              component="form"
              onSubmit={handleSignup}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                label="Full Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true, style: { color: "#e5e7eb" } }}
                InputProps={{ style: { color: "#e5e7eb" } }}
              />

              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{shrink: true,  style: { color: "#e5e7eb" } }}
                InputProps={{ style: { color: "#e5e7eb" } }}
              />

              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
                helperText="At least 6 characters"
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

              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true, style: { color: "#e5e7eb" } }}
                InputProps={{
                  style: { color: "#e5e7eb" },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showConfirmPassword ? "Hide password" : "Show password"
                        }
                        onClick={() => setShowConfirmPassword((show) => !show)}
                        edge="end"
                        tabIndex={-1}
                        sx={{ color: "#e5e7eb" }}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Research Area (Optional)"
                name="researchArea"
                type="text"
                value={formData.researchArea}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true, style: { color: "#e5e7eb" } }}
                InputProps={{ style: { color: "#e5e7eb" } }}
              />

              <TextField
                label="Lab/Institute (Optional)"
                name="lab"
                type="text"
                value={formData.lab}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true, style: { color: "#e5e7eb" } }}
                InputProps={{ style: { color: "#e5e7eb" } }}
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
                {loading ? "Creating Account..." : "Sign Up"}
              </Button>
            </Box>

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2">
                Already have an account?{" "}
                <Link href="/login" className="signup-link">
                  Login here
                </Link>
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Container>
    </>
  );
}
