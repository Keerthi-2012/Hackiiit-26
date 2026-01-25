// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";
// import { redirect } from "next/navigation";

// export default async function HomePage() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value;

//   if (token) {
//     try {
//       jwt.verify(token, process.env.JWT_SECRET);
//       redirect("/dashboard");
//     } catch {}
//   }

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-2xl font-bold">Research Discuss</h1>

//       <a
//         href="/api/auth/login"
//         className="mt-4 px-4 py-2 bg-black text-white rounded"
//       >
//         Login with CAS
//       </a>
//     </div>
//   );
// }

import { cookies } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import {
  Box,
  Container,
  Button,
  Typography,
  Stack,
  Paper,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import ForumIcon from '@mui/icons-material/Forum';
import ArticleIcon from '@mui/icons-material/Article';
import PeopleIcon from '@mui/icons-material/People';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

interface TokenPayload extends JwtPayload {
  userId?: string;
  email?: string;
}

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

if (token) {
  try {
    jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    // invalid token → ignore
    return;
  }

  redirect("/dashboard"); // ← OUTSIDE try/catch
}
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f7fa', background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'   }} >
      {/* Header/Navigation */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 3,
          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <ForumIcon sx={{ fontSize: 32 }} />
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                Research Discuss
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    color: '#1a1a1a',
                    lineHeight: 1.2,
                  }}
                >
                  Collaborate, Learn & Innovate
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#555',
                    lineHeight: 1.8,
                    fontSize: '1.1rem',
                  }}
                >
                  Join a thriving community of researchers. Ask questions, share knowledge, publish blogs, and
                  collaborate on groundbreaking discoveries across all domains of computer science.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    href="/api/auth/login"
                    component="a"
                    variant="contained"
                    size="large"
                    startIcon={<LoginIcon />}
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      fontWeight: 700,
                      textTransform: 'none',
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      '&:hover': {
                        opacity: 0.9,
                        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
                      },
                    }}
                  >
                    Get Started
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}