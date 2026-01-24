// "use client";

// import { useEffect, useState } from "react";
// import EditProfileModal from "./EditProfileModal";
// import styles from "./ProfilePage.module.css";

// type User = {
//   name: string;
//   email: string;
//   lab?: string;
//   researchArea?: string;
// };

// export default function ProfilePage() {
//   const [showEdit, setShowEdit] = useState(false);
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     async function fetchProfile() {
//       try {
//         const res = await fetch("/api/profile", {
//           credentials: "include", // ✅ send cookies
//         });

//         if (!res.ok) {
//           throw new Error("Failed to load profile");
//         }

//         const data = await res.json();
//         setUser(data.user);
//       } catch (err) {
//         setError("Could not load profile");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchProfile();
//   }, []);

//   if (loading) {
//     return <div className={styles.container}>Loading profile...</div>;
//   }

//   if (error || !user) {
//     return <div className={styles.container}>{error}</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <h1>Profile</h1>

//       <div className={styles.card}>
//         <p><strong>Name:</strong> {user.name}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>Lab:</strong> {user.lab || "Not specified"}</p>

//         <div>
//           <strong>Research Area:</strong>
//           <div className={styles.tags}>
//             {(user.researchArea ? user.researchArea.split(",") : []).map(
//               (tag) => (
//                 <span key={tag} className={styles.tag}>
//                   {tag.trim()}
//                 </span>
//               )
//             )}
//           </div>
//         </div>

//         <button onClick={() => setShowEdit(true)}>
//           Update Profile
//         </button>
//       </div>

//       {/* Action buttons */}
//       <div className={styles.actions}>
//         <button>My Queries</button>
//         <button>Answered Queries</button>
//         <button>My Blogs</button>
//         <button>Add Blog</button>
//       </div>

//       {showEdit && (
//         <EditProfileModal
//           user={user}
//           onClose={() => setShowEdit(false)}
//         />
//       )}
//     </div>
//   );
// }

'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
  Button,
  Avatar,
  Chip,
  CircularProgress,
  Alert,
  Grid,
  Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArticleIcon from '@mui/icons-material/Article';
import AddIcon from '@mui/icons-material/Add';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import LabelIcon from '@mui/icons-material/Label';
import EditProfileModal from './EditProfileModal';
import { useRouter } from "next/navigation";
type User = {
  name: string;
  email: string;
  lab?: string;
  researchArea?: string;
};

interface ProfileStats {
  queries: number;
  answers: number;
  blogs: number;
}

export default function ProfilePage() {
  
  const router = useRouter();
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [stats] = useState<ProfileStats>({
    queries: 12,
    answers: 28,
    blogs: 5,
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/profile', {
          credentials: 'include',
        });
        if (!res.ok) {
          throw new Error('Failed to load profile');
        }
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        setError('Could not load profile');
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !user) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error || 'Could not load profile'}</Alert>
      </Container>
    );
  }

  const researchAreas = user.researchArea
    ? user.researchArea.split(',').map((tag) => tag.trim())
    : [];

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={4}>
        {/* Profile Header Card */}
        <Paper
          elevation={2}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          <Box sx={{ p: 4, color: 'white' }}>
            <Stack
              direction="row"
              spacing={3}
              alignItems="center"
              justifyContent="space-between"
              sx={{
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              <Stack direction="row" spacing={3} alignItems="center">
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    background: 'rgba(255, 255, 255, 0.2)',
                    fontSize: '2.5rem',
                    fontWeight: 700,
                    border: '3px solid rgba(255, 255, 255, 0.3)',
                  }}
                >
                  {getInitials(user.name)}
                </Avatar>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      mb: 0.5,
                    }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      opacity: 0.95,
                    }}
                  >
                    Research Profile
                  </Typography>
                </Box>
              </Stack>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setShowEdit(true)}
                sx={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.3)',
                  },
                }}
              >
                Edit Profile
              </Button>
            </Stack>
          </Box>
        </Paper>

        {/* Stats Grid */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                p: 2.5,
                borderRadius: 2,
                textAlign: 'center',
                border: '1px solid #e0e0e0',
              }}
            >
              <HelpOutlineIcon
                sx={{
                  fontSize: 32,
                  color: '#667eea',
                  mb: 1,
                }}
              />
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                {stats.queries}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Queries Asked
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                p: 2.5,
                borderRadius: 2,
                textAlign: 'center',
                border: '1px solid #e0e0e0',
              }}
            >
              <CheckCircleOutlineIcon
                sx={{
                  fontSize: 32,
                  color: '#388e3c',
                  mb: 1,
                }}
              />
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                {stats.answers}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Answers Provided
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                p: 2.5,
                borderRadius: 2,
                textAlign: 'center',
                border: '1px solid #e0e0e0',
              }}
            >
              <ArticleIcon
                sx={{
                  fontSize: 32,
                  color: '#f57c00',
                  mb: 1,
                }}
              />
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                {stats.blogs}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Blogs Written
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Profile Details Card */}
        <Paper
          elevation={1}
          sx={{
            borderRadius: 2,
            p: 3,
            backgroundColor: '#fafbfc',
            border: '1px solid #e0e0e0',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 2.5,
              color: '#333',
            }}
          >
            Profile Information
          </Typography>

          <Stack spacing={2.5}>
            {/* Email */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  p: 1,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <EmailIcon sx={{ color: 'white', fontSize: 20 }} />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#999', fontWeight: 600 }}>
                  EMAIL
                </Typography>
                <Typography variant="body2" sx={{ color: '#555' }}>
                  {user.email}
                </Typography>
              </Box>
            </Stack>

            <Divider />

            {/* Lab */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  p: 1,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <WorkIcon sx={{ color: 'white', fontSize: 20 }} />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#999', fontWeight: 600 }}>
                  LAB
                </Typography>
                <Typography variant="body2" sx={{ color: '#555' }}>
                  {user.lab || 'Not specified'}
                </Typography>
              </Box>
            </Stack>

            <Divider />

            {/* Research Areas */}
            <Box>
              <Stack direction="row" spacing={2} alignItems="flex-start" mb={1.5}>
                <Box
                  sx={{
                    p: 1,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 0.5,
                  }}
                >
                  <LabelIcon sx={{ color: 'white', fontSize: 20 }} />
                </Box>
                <Box flex={1}>
                  <Typography variant="caption" sx={{ color: '#999', fontWeight: 600 }}>
                    RESEARCH AREAS
                  </Typography>
                  {researchAreas.length > 0 ? (
                    <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
                      {researchAreas.map((area, index) => (
                        <Chip
                          key={index}
                          label={area}
                          size="small"
                          sx={{
                            backgroundColor: '#f0f4ff',
                            color: '#667eea',
                            fontWeight: 600,
                            height: 28,
                          }}
                        />
                      ))}
                    </Stack>
                  ) : (
                    <Typography variant="body2" sx={{ color: '#999', mt: 1 }}>
                      Not specified
                    </Typography>
                  )}
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Paper>

        {/* Action Buttons */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<HelpOutlineIcon />}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderColor: '#667eea',
                color: '#667eea',
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'rgba(102, 126, 234, 0.08)',
                  borderColor: '#667eea',
                },
              }}
            onClick={() => {
              router.push("/profile/my-queries");
              }}
            >
              My Queries
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<CheckCircleOutlineIcon />}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderColor: '#388e3c',
                color: '#388e3c',
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'rgba(56, 142, 60, 0.08)',
                  borderColor: '#388e3c',
                },
              }}
            onClick={() => {
              router.push("/profile/answered");
              }}
            >
              Answered
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<ArticleIcon />}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderColor: '#f57c00',
                color: '#f57c00',
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'rgba(245, 124, 0, 0.08)',
                  borderColor: '#f57c00',
                },
              }}
              onClick={() => {
              router.push("/profile/blogs");
              }}
            >
              My Blogs
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                py: 1.5,
                '&:hover': {
                  opacity: 0.9,
                },
              }}
            >
              Add Blog
            </Button>
          </Grid>
        </Grid>

        {/* Edit Modal */}
        {showEdit && (
          <EditProfileModal user={user} onClose={() => setShowEdit(false)} />
        )}
      </Stack>
    </Container>
  );
}