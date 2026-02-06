import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";
import {
  Box,
  Container,
  Button,
  Typography,
  Stack,
  Grid,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

interface TokenPayload extends JwtPayload {
  userId?: string;
  email?: string;
}

export default async function HomePage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  /* =========================
     AUTH CHECK (CORRECT)
  ========================= */
  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
      redirect("/dashboard");
    } catch {
      // invalid token → show landing page
    }
  }

  return (
    <>
      {/* ================= GLOBAL DARK THEME ================= */}
      <style>{`
        :root {
          --bg-main: #070b1f;
          --border: rgba(120,160,255,0.25);
          --accent: #2dd4ff;
          --text-main: #e5e7eb;
          --text-muted: #9ca3af;
        }

        body {
          margin: 0;
          background: radial-gradient(circle at top, #0f1b4a, var(--bg-main));
        }

        .page {
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        .hero-title {
          font-weight: 800;
          font-size: 3.2rem;
          line-height: 1.15;
          color: var(--text-main);
        }

        .hero-title span {
          color: var(--accent);
        }

        .hero-text {
          color: var(--text-muted);
          font-size: 1.1rem;
          line-height: 1.8;
        }

        .cta {
          background: linear-gradient(135deg, #22d3ee, #38bdf8);
          color: #020617;
          font-weight: 700;
          padding: 14px 36px;
          border-radius: 12px;
          text-transform: none;
          box-shadow: 0 10px 30px rgba(34,211,238,0.35);
        }

        .cta:hover {
          opacity: 0.9;
          box-shadow: 0 14px 40px rgba(34,211,238,0.5);
        }
      `}</style>

      {/* ================= HERO ================= */}
      <Box className="page">
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={3}>
                <Typography className="hero-title">
                  Collaborate, Learn <span>& Innovate</span>
                </Typography>

                <Typography className="hero-text">
                  Join a thriving community of researchers. Ask questions,
                  share knowledge, publish blogs, and collaborate on
                  groundbreaking discoveries across all domains of computer
                  science.
                </Typography>

                <Button
                  href="/signup"
                  component="a"
                  startIcon={<LoginIcon />}
                  className="cta"
                >
                  Get Started
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
