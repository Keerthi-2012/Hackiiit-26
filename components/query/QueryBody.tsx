'use client';
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

interface QueryBodyProps {
  description: string;
  wordCount?: number;
  readingTime?: number;
  tags?: string[];
}

export default function QueryBody({
  description,
  wordCount,
  readingTime,
  tags,
}: QueryBodyProps) {
  const calculatedWordCount = wordCount || description.split(/\s+/).length;
  const calculatedReadingTime =
    readingTime || Math.ceil(calculatedWordCount / 200);

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        p: 3,
        mx: { xs: 2, sm: 4, md: 8, lg: 10 },
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.4) 100%)',
        border: '1px solid rgba(79, 172, 254, 0.15)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* DESCRIPTION (FULL WIDTH) */}
      <Typography
        variant="body2"
        sx={{
          color: '#cbd5e1',
          lineHeight: 1.8,
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
          mb: tags && tags.length > 0 ? 2 : 0,
          fontSize: '0.95rem',
        }}
      >
        {description}
      </Typography>

      {/* TAGS (FULL WIDTH) */}
      {tags && tags.length > 0 && (
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              sx={{
                borderColor: '#4facfe',
                color: '#00f2fe',
                fontWeight: 600,
                backgroundColor: 'rgba(79, 172, 254, 0.1)',
                border: '1px solid rgba(79, 172, 254, 0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(79, 172, 254, 0.2)',
                  borderColor: '#00f2fe',
                },
              }}
            />
          ))}
        </Stack>
      )}
    </Paper>
  );
}