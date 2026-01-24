// "use client";

// import { useState } from "react";
// import styles from "./EditProfileModal.module.css";

// const INTERESTS = [
//   "Machine Learning",
//   "Systems",
//   "VLSI",
//   "Theory",
//   "Computer Vision",
//   "NLP",
//   "Databases",
//   "Networks",
//   "Security",
//   "Distributed Systems",
//   "Algorithms",
//   "Optimization",
//   "Robotics",
//   "HCI",
//   "Bioinformatics",
// ];

// export default function EditProfileModal({
//   onClose,
// }: {
//   onClose: () => void;
// }) {
//   const [name, setName] = useState("");
//   const [lab, setLab] = useState("");
//   const [selected, setSelected] = useState<string[]>([]);

//   function toggleInterest(tag: string) {
//     setSelected((prev) =>
//       prev.includes(tag)
//         ? prev.filter((t) => t !== tag)
//         : [...prev, tag]
//     );
//   }

//   function saveChanges() {
//     console.log({
//       name,
//       lab,
//       interests: selected,
//     });
//     onClose();
//   }

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.modal}>
//         <h3>Edit Profile</h3>

//         <input
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <input
//           placeholder="Lab"
//           value={lab}
//           onChange={(e) => setLab(e.target.value)}
//         />

//         <p>Research Interests</p>
//         <div className={styles.tags}>
//           {INTERESTS.map((tag) => (
//             <button
//               key={tag}
//               type="button"
//               className={
//                 selected.includes(tag)
//                   ? styles.tagSelected
//                   : styles.tag
//               }
//               onClick={() => toggleInterest(tag)}
//             >
//               {tag}
//             </button>
//           ))}
//         </div>

//         <div className={styles.actions}>
//           <button onClick={onClose}>Cancel</button>
//           <button onClick={saveChanges}>Save</button>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Stack,
  Chip,
  CircularProgress,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

interface User {
  name: string;
  email: string;
  lab?: string;
  researchArea?: string;
}

interface EditProfileModalProps {
  user?: User;
  onClose: () => void;
}

const INTERESTS: string[] = [
  'Machine Learning',
  'Systems',
  'VLSI',
  'Theory',
  'Computer Vision',
  'NLP',
  'Databases',
  'Networks',
  'Security',
  'Distributed Systems',
  'Algorithms',
  'Optimization',
  'Robotics',
  'HCI',
  'Bioinformatics',
];

export default function EditProfileModal({ user, onClose }: EditProfileModalProps) {
  const [name, setName] = useState<string>(user?.name || '');
  const [lab, setLab] = useState<string>(user?.lab || '');
  const [selected, setSelected] = useState<string[]>(
    user?.researchArea ? user.researchArea.split(',').map((a: string) => a.trim()) : []
  );
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const toggleInterest = (tag: string): void => {
    setSelected((prev: string[]) =>
      prev.includes(tag) ? prev.filter((t: string) => t !== tag) : [...prev, tag]
    );
  };

  const saveChanges = async (): Promise<void> => {
    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          lab: lab.trim(),
          researchArea: selected.join(', '),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      const data = await response.json();
      console.log('Profile updated:', data);

      onClose();
    } catch (err) {
      setError('Could not save changes. Please try again.');
      console.error('Error saving profile:', err);
    } finally {
      setSaving(false);
    }
  };

  const isFormValid = name.trim().length > 0;

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          fontWeight: 700,
          fontSize: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pr: 1,
          mb: 3,
        }}
      >
        Edit Profile
        <IconButton
          onClick={onClose}
          disabled={saving}
          size="small"
          sx={{
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ pt: 3 }}>
        <Stack spacing={3}>
          {/* Error Message */}
          {error && (
            <Typography
              variant="body2"
              sx={{
                color: '#d32f2f',
                backgroundColor: '#ffebee',
                p: 1.5,
                borderRadius: 1,
              }}
            >
              {error}
            </Typography>
          )}

          {/* Name Input */}
          <TextField
            fullWidth
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={saving}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#667eea',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                  borderWidth: 2,
                },
              },
            }}
          />

          {/* Lab Input */}
          <TextField
            fullWidth
            label="Lab"
            placeholder="Enter your lab name"
            value={lab}
            onChange={(e) => setLab(e.target.value)}
            disabled={saving}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#667eea',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                  borderWidth: 2,
                },
              },
            }}
          />

          {/* Research Interests */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: '#333',
              }}
            >
              Research Interests
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {INTERESTS.map((tag: string) => (
                <Chip
                  key={tag}
                  label={tag}
                  onClick={() => toggleInterest(tag)}
                  disabled={saving}
                  variant={selected.includes(tag) ? 'filled' : 'outlined'}
                  sx={{
                    backgroundColor: selected.includes(tag) ? '#667eea' : 'transparent',
                    color: selected.includes(tag) ? 'white' : '#667eea',
                    fontWeight: 600,
                    cursor: saving ? 'not-allowed' : 'pointer',
                    borderColor: '#667eea',
                    height: 32,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: selected.includes(tag) ? '#667eea' : '#e8eef7',
                      opacity: saving ? 0.6 : 1,
                      transform: saving ? 'none' : 'scale(1.05)',
                    },
                  }}
                />
              ))}
            </Stack>
            {selected.length > 0 && (
              <Typography
                variant="caption"
                sx={{
                  color: '#667eea',
                  fontWeight: 600,
                  mt: 1.5,
                  display: 'block',
                }}
              >
                {selected.length} selected
              </Typography>
            )}
          </Box>
        </Stack>
      </DialogContent>

      {/* Actions */}
      <DialogActions
        sx={{
          p: 2,
          backgroundColor: '#f9fafb',
          borderTop: '1px solid #e0e0e0',
          gap: 1,
        }}
      >
        <Button
          onClick={onClose}
          disabled={saving}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            color: '#666',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={saveChanges}
          disabled={!isFormValid || saving}
          variant="contained"
          startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            background: isFormValid && !saving
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : '#ccc',
            color: 'white',
            '&:hover': {
              opacity: 0.9,
            },
          }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}