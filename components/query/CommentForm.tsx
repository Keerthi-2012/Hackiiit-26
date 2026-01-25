'use client';

import React, { useState, ChangeEvent } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Stack,
  Typography,
  CircularProgress,
  IconButton,
  Alert,
  Chip,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ClearIcon from '@mui/icons-material/Clear';

interface CommentFormProps {
  queryId: string;
  parentReplyId?: string; // ✅ optional
  onSuccess?: () => void;
}

export default function CommentForm({
  queryId,
  parentReplyId,
  onSuccess,
}: CommentFormProps) {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    if (f && f.size > 10 * 1024 * 1024) {
      setError('File size must be under 10MB');
      return;
    }
    setFile(f);
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError('Please write something');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const formData = new FormData(); // ✅ FIRST
      formData.append('queryId', queryId);
      formData.append('text', text);
      formData.append('isAnonymous', 'false');

      if (parentReplyId) {
        formData.append('parentReplyId', parentReplyId); // ✅ SAFE
      }

      if (file) {
        formData.append('file', file);
      }

      const res = await fetch('/api/reply', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to post reply');
      }

      // ✅ reset
      setText('');
      setFile(null);

      // ✅ auto-refresh
      onSuccess?.();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" fontWeight={700}>
          {parentReplyId ? 'Write a Reply' : 'Write Your Answer'}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          multiline
          rows={4}
          sx={{ mt: 2 }}
          placeholder="Write your answer..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {file && (
          <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography>{file.name}</Typography>
              <IconButton onClick={() => setFile(null)}>
                <ClearIcon />
              </IconButton>
            </Stack>
          </Paper>
        )}

        <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
          <Button component="label" startIcon={<AttachFileIcon />}>
            Attach File
            <input hidden type="file" onChange={handleFileChange} />
          </Button>

          <Button
            variant="contained"
            endIcon={
              isSubmitting ? (
                <CircularProgress size={20} />
              ) : (
                <SendIcon />
              )
            }
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </Button>
        </Stack>

        {file && <Chip label="1 file attached" size="small" sx={{ mt: 2 }} />}
      </Paper>
    </Box>
  );
}
