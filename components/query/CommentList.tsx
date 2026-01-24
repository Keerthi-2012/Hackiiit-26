
'use client';

import React from 'react';
import {
  Box,
  Paper,
  Stack,
  Typography,
  Avatar,
  Divider,
  Chip,
  IconButton,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ReplyIcon from '@mui/icons-material/Reply';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface Comment {
  id?: string | number;
  text: string;
  time: string;
  author?: string;
  avatar?: string;
  likes?: number;
}

interface CommentListProps {
  comments: Comment[];
}

const getInitials = (name: string = 'User'): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

const getAvatarColor = (index: number): string => {
  const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];
  return colors[index % colors.length];
};

export default function CommentList({ comments = [] }: CommentListProps) {
  const [likedComments, setLikedComments] = React.useState<Set<string | number>>(new Set());

  const handleLike = (id: string | number): void => {
    setLikedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (comments.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body2" sx={{ color: '#999' }}>
          No comments yet. Be the first to share your thoughts!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 700, mx: 'auto', p: 2 }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          mb: 3,
          color: '#333',
        }}
      >
        {comments.length} Comment{comments.length !== 1 ? 's' : ''}
      </Typography>

      <Stack spacing={2}>
        {comments.map((comment, index) => {
          const commentId = comment.id || index;
          const isLiked = likedComments.has(commentId);

          return (
            <Paper
              key={commentId}
              elevation={1}
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  elevation: 3,
                  boxShadow: '0 8px 24px rgba(102, 126, 234, 0.15)',
                },
              }}
            >
              <Box sx={{ p: 3 }}>
                {/* Comment Header */}
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="flex-start"
                  justifyContent="space-between"
                  mb={2}
                >
                  <Stack direction="row" spacing={2} alignItems="flex-start" flex={1}>
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        background: `linear-gradient(135deg, ${getAvatarColor(index)} 0%, ${getAvatarColor(index + 1)} 100%)`,
                        fontWeight: 700,
                        color: 'white',
                      }}
                    >
                      {getInitials(comment.author)}
                    </Avatar>
                    <Box flex={1}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          color: '#333',
                        }}
                      >
                        {comment.author || 'Anonymous User'}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: '#999',
                          display: 'block',
                          mt: 0.5,
                        }}
                      >
                        {comment.time}
                      </Typography>
                    </Box>
                  </Stack>
                  <IconButton
                    size="small"
                    sx={{
                      color: '#999',
                      '&:hover': {
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                      },
                    }}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Stack>

                {/* Comment Text */}
                <Typography
                  variant="body2"
                  sx={{
                    color: '#555',
                    lineHeight: 1.6,
                    mb: 2,
                    wordBreak: 'break-word',
                  }}
                >
                  {comment.text}
                </Typography>

                {/* Comment Actions */}
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{
                    pt: 1,
                    borderTop: '1px solid #f0f0f0',
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => handleLike(commentId)}
                    sx={{
                      color: isLiked ? '#667eea' : '#999',
                      '&:hover': {
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        color: '#667eea',
                      },
                    }}
                  >
                    <ThumbUpIcon
                      fontSize="small"
                      sx={{
                        fill: isLiked ? '#667eea' : 'none',
                      }}
                    />
                  </IconButton>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#999',
                      fontWeight: 600,
                    }}
                  >
                    {(comment.likes || 0) + (isLiked ? 1 : 0)}
                  </Typography>

                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      borderColor: '#e0e0e0',
                      mx: 1,
                    }}
                  />

                  <IconButton
                    size="small"
                    sx={{
                      color: '#999',
                      '&:hover': {
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        color: '#667eea',
                      },
                    }}
                  >
                    <ReplyIcon fontSize="small" />
                  </IconButton>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#999',
                      fontWeight: 600,
                    }}
                  >
                    Reply
                  </Typography>
                </Stack>
              </Box>
            </Paper>
          );
        })}
      </Stack>
    </Box>
  );
}