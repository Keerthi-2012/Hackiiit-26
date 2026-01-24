
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
      elevation={1}
      sx={{
        borderRadius: 2,
        p: 3,
        mx: 75,
        backgroundColor: '#fafbfc',
        border: '1px solid #e0e0e0',
      }}
    >
      {/* QUERY HEADER (NOT FULL WIDTH) */}
      <Stack
        sx={{
          width: 'fit-content',
          mb: 2,
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{
            px: 2,
            py: 1.5,
            borderRadius: 2,
            backgroundColor: '#fafafa',
          }}
        >
          <Box
            sx={{
              p: 1,
              background:
                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <InfoIcon sx={{ color: 'white', fontSize: 18 }} />
          </Box>

          <Box sx={{m:3}}>
            <Typography
              variant="caption"
              sx={{
                color: '#999',
                fontWeight: 600,
                display: 'block',
              }}
            >
              QUERY
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#666',
                mt: 0.3,
              }}
            >
              {calculatedWordCount} words
            </Typography>
          </Box>
        </Stack>
      </Stack>

      {/* DESCRIPTION (FULL WIDTH) */}
      <Typography
        variant="body2"
        sx={{
          color: '#555',
          lineHeight: 1.7,
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
          mb: tags && tags.length > 0 ? 2 : 0,
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
                borderColor: '#667eea',
                color: '#667eea',
                fontWeight: 500,
                backgroundColor: 'transparent',
                border: '1px solid #667eea',
                '&:hover': {
                  backgroundColor: 'rgba(102, 126, 234, 0.08)',
                },
              }}
            />
          ))}
        </Stack>
      )}
    </Paper>
  );
}
