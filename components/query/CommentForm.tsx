'use client';

import React, { useState, ChangeEvent } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Stack,
  Chip,
  Typography,
  CircularProgress,
  IconButton,
  Alert,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ClearIcon from '@mui/icons-material/Clear';

interface CommentFormState {
  text: string;
  file: File | null;
}

export default function CommentForm() {
  const [formState, setFormState] = useState<CommentFormState>({
    text: '',
    file: null,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setFormState((prev) => ({
      ...prev,
      text: e.target.value,
    }));
    setError('');
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile && selectedFile.size > 10 * 1024 * 1024) {
      setError('File size should be less than 10MB');
      return;
    }
    setFormState((prev) => ({
      ...prev,
      file: selectedFile,
    }));
    setError('');
  };

  const handleRemoveFile = (): void => {
    setFormState((prev) => ({
      ...prev,
      file: null,
    }));
  };

  const handleSubmit = async (): Promise<void> => {
    if (!formState.text.trim()) {
      setError('Please write something before posting');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // API call would go here
      const formData = new FormData();
      formData.append('text', formState.text);
      if (formState.file) {
        formData.append('file', formState.file);
      }

      console.log('Submitting:', {
        text: formState.text,
        file: formState.file?.name,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form
      setFormState({ text: '', file: null });
    } catch (err) {
      setError('Error submitting comment. Please try again.');
      console.error('Error submitting comment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formState.text.trim().length > 0;
  const fileSize = formState.file ? (formState.file.size / 1024 / 1024).toFixed(2) : '0';

  return (
    <Box sx={{ width: '100%', maxWidth: 700, mx: 'auto', p: 2 }}>
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            p: 3,
            color: 'white',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Write Your Answer
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.9 }}>
            Share your thoughts and insights
          </Typography>
        </Box>

        {/* Form Content */}
        <Box sx={{ p: 3 }}>
          <Stack spacing={3}>
            {/* Error Alert */}
            {error && (
              <Alert severity="error" onClose={() => setError('')}>
                {error}
              </Alert>
            )}

            {/* Text Input */}
            <TextField
              fullWidth
              multiline
              rows={5}
              placeholder="Write your answer..."
              value={formState.text}
              onChange={handleTextChange}
              variant="outlined"
              disabled={isSubmitting}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'white',
                  '&:hover fieldset': {
                    borderColor: '#667eea',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#667eea',
                    borderWidth: 2,
                  },
                },
                '& .MuiOutlinedInput-input': {
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                },
              }}
            />

            {/* File Preview */}
            {formState.file && (
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  background: 'linear-gradient(135deg, #f5f7fa 0%, #f0f4ff 100%)',
                  borderColor: '#667eea',
                  borderWidth: 2,
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack direction="row" spacing={2} alignItems="center" flex={1}>
                    <AttachFileIcon sx={{ color: '#667eea', fontSize: 28 }} />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
                        {formState.file.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#666' }}>
                        {fileSize} MB
                      </Typography>
                    </Box>
                  </Stack>
                  <IconButton
                    size="small"
                    onClick={handleRemoveFile}
                    disabled={isSubmitting}
                    sx={{
                      color: '#667eea',
                      '&:hover': {
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                      },
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </Stack>
              </Paper>
            )}

            {/* File Input and Submit */}
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
              <Button
                component="label"
                startIcon={<AttachFileIcon />}
                variant="outlined"
                disabled={isSubmitting}
                sx={{
                  textTransform: 'none',
                  borderColor: '#667eea',
                  color: '#667eea',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'rgba(102, 126, 234, 0.08)',
                    borderColor: '#667eea',
                  },
                  '&.Mui-disabled': {
                    borderColor: '#ccc',
                    color: '#ccc',
                  },
                }}
              >
                Attach File
                <input
                  hidden
                  type="file"
                  onChange={handleFileChange}
                  disabled={isSubmitting}
                  aria-label="Upload file"
                />
              </Button>

              <Button
                variant="contained"
                endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                onClick={handleSubmit}
                disabled={!isFormValid || isSubmitting}
                sx={{
                  background: isFormValid && !isSubmitting
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : '#ccc',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 4,
                  py: 1.2,
                  borderRadius: 1.5,
                  '&:hover': {
                    opacity: 0.9,
                  },
                  '&.Mui-disabled': {
                    color: '#999',
                  },
                }}
              >
                {isSubmitting ? 'Posting...' : 'Post Answer'}
              </Button>
            </Stack>
          </Stack>
        </Box>

        {/* Footer Stats */}
        <Box
          sx={{
            borderTop: '1px solid #e0e0e0',
            p: 2,
            backgroundColor: '#f5f7fa',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="caption" sx={{ color: '#666' }}>
            Character count: {formState.text.length}
          </Typography>
          {formState.file && (
            <Chip
              label={`1 file attached`}
              size="small"
              icon={<AttachFileIcon />}
              sx={{
                backgroundColor: '#e8eef7',
                color: '#667eea',
                fontWeight: 600,
              }}
            />
          )}
        </Box>
      </Paper>
    </Box>
  );
}