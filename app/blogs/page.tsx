
'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Chip,
  Button,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Grid,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface Blog {
  id: string | number;
  title: string;
  description: string;
  author?: string;
  category?: string;
  readTime?: number;
  date?: string;
  likes?: number;
}

interface BlogsPageProps {
  blogs?: Blog[];
}

const defaultBlogs: Blog[] = [
  {
    id: 1,
    title: 'Notes on Distributed Systems',
    description: 'A summary of Lamport clocks and consistency models.',
    author: 'John Doe',
    category: 'Systems',
    readTime: 8,
    date: '2 days ago',
    likes: 24,
  },
  {
    id: 2,
    title: 'Understanding Attention',
    description: 'Intuition and math behind self-attention.',
    author: 'Jane Smith',
    category: 'Machine Learning',
    readTime: 12,
    date: '5 days ago',
    likes: 45,
  },
  {
    id: 3,
    title: 'Notes on Distributed Systems',
    description: 'A summary of Lamport clocks and consistency models.',
    author: 'John Doe',
    category: 'Systems',
    readTime: 8,
    date: '2 days ago',
    likes: 24,
  },
];

export default function BlogsPage({ blogs = defaultBlogs }: BlogsPageProps) {
  const [likedBlogs, setLikedBlogs] = React.useState<Set<string | number>>(new Set());

  const handleLike = (id: string | number): void => {
    setLikedBlogs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ mb: 6 }}>
        {/* Header */}
        <Stack spacing={2} sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: '#1a1a1a',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Research Blogs
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              maxWidth: 500,
            }}
          >
            Explore insightful articles on distributed systems, machine learning, and more.
          </Typography>
        </Stack>

        {/* Blogs Grid */}
        {blogs.length > 0 ? (
          <Grid container spacing={3}>
            {blogs.map((blog) => {
              const isLiked = likedBlogs.has(blog.id);

              return (
                <Grid item xs={12} key={blog.id} md={4} sm={6} lg={3}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      border: '1px solid #e0e0e0',
                      '&:hover': {
                        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.15)',
                        borderColor: '#667eea',
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <CardContent sx={{ pb: 1 }}>
                      {/* Category Chip */}
                      {blog.category && (
                        <Box sx={{ mb: 1.5 }}>
                          <Chip
                            label={blog.category}
                            size="small"
                            sx={{
                              backgroundColor: '#f0f4ff',
                              color: '#667eea',
                              fontWeight: 600,
                              height: 24,
                            }}
                          />
                        </Box>
                      )}

                      {/* Title */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: '#1a1a1a',
                          mb: 1,
                          lineHeight: 1.4,
                          '&:hover': {
                            color: '#667eea',
                            cursor: 'pointer',
                          },
                          transition: 'color 0.2s',
                        }}
                      >
                        {blog.title}
                      </Typography>

                      {/* Description */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#666',
                          mb: 2,
                          lineHeight: 1.6,
                        }}
                      >
                        {blog.description}
                      </Typography>

                      {/* Meta Info */}
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        sx={{
                          flexWrap: 'wrap',
                          gap: 1,
                        }}
                      >
                        {blog.author && (
                          <Stack direction="row" spacing={0.8} alignItems="center">
                            <Avatar
                              sx={{
                                width: 28,
                                height: 28,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                fontSize: '0.875rem',
                                fontWeight: 700,
                              }}
                            >
                              {blog.author.charAt(0).toUpperCase()}
                            </Avatar>
                            <Typography variant="caption" sx={{ color: '#666', fontWeight: 500 }}>
                              {blog.author}
                            </Typography>
                          </Stack>
                        )}

                        {blog.readTime && (
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <AccessTimeIcon sx={{ fontSize: 16, color: '#999' }} />
                            <Typography variant="caption" sx={{ color: '#999', fontWeight: 500 }}>
                              {blog.readTime} min read
                            </Typography>
                          </Stack>
                        )}

                        {blog.date && (
                          <Typography variant="caption" sx={{ color: '#999' }}>
                            {blog.date}
                          </Typography>
                        )}
                      </Stack>
                    </CardContent>

                    {/* Actions */}
                    <CardActions
                      sx={{
                        borderTop: '1px solid #f0f0f0',
                        pt: 2,
                      }}
                    >
                      <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
                        <Button
                          size="small"
                          startIcon={<ArrowForwardIcon />}
                          sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            color: '#667eea',
                            '&:hover': {
                              backgroundColor: 'rgba(102, 126, 234, 0.1)',
                            },
                          }}
                        >
                          Read More
                        </Button>

                        <Box sx={{ ml: 'auto', display: 'flex', gap: 0.5 }}>
                          <Button
                            size="small"
                            startIcon={
                              <FavoriteBorderIcon
                                sx={{
                                  fill: isLiked ? '#667eea' : 'none',
                                  color: isLiked ? '#667eea' : '#999',
                                }}
                              />
                            }
                            onClick={() => handleLike(blog.id)}
                            sx={{
                              textTransform: 'none',
                              color: isLiked ? '#667eea' : '#999',
                              fontWeight: 600,
                              '&:hover': {
                                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                                color: '#667eea',
                              },
                            }}
                          >
                            {(blog.likes || 0) + (isLiked ? 1 : 0)}
                          </Button>

                          <Button
                            size="small"
                            icon={<BookmarkBorderIcon />}
                            sx={{
                              minWidth: 40,
                              p: 1,
                              color: '#999',
                              '&:hover': {
                                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                                color: '#667eea',
                              },
                            }}
                          >
                            <BookmarkBorderIcon sx={{ fontSize: 18 }} />
                          </Button>

                          <Button
                            size="small"
                            sx={{
                              minWidth: 40,
                              p: 1,
                              color: '#999',
                              '&:hover': {
                                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                                color: '#667eea',
                              },
                            }}
                          >
                            <ShareIcon sx={{ fontSize: 18 }} />
                          </Button>
                        </Box>
                      </Stack>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Paper
            elevation={0}
            sx={{
              textAlign: 'center',
              py: 8,
              borderRadius: 3,
              border: '2px dashed #e0e0e0',
              backgroundColor: '#f9fafb',
            }}
          >
            <Typography variant="h6" sx={{ color: '#999', mb: 1 }}>
              No blogs available
            </Typography>
            <Typography variant="body2" sx={{ color: '#bbb' }}>
              Check back later for new research articles.
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
}