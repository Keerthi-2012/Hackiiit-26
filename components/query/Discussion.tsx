'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import ReplyItem from './ReplyItem';
import CommentForm from './CommentForm';

interface Reply {
  _id: string;
  text: string;
  userName?: string;
  createdAt: string;
  replies?: Reply[];
  files?: { filename: string; url: string }[];
}

interface DiscussionProps {
  queryId: string;
}

export default function Discussion({ queryId }: DiscussionProps) {
  const [comments, setComments] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReplies = async () => {
    try {
      const res = await fetch(`/api/reply?queryId=${queryId}`, {
        cache: 'no-store',
      });

      const data = await res.json();
      setComments(Array.isArray(data) ? data : []); // ✅ SAFE
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, [queryId]);

  if (loading) {
    return <Typography>Loading answers...</Typography>;
  }

  return (
    <Box mt={4}>
      <Typography variant="h6" fontWeight={700} mb={2}>
        Answers ({comments.length})
      </Typography>

      {comments.length === 0 && (
        <Typography color="text.secondary">
          No answers yet. Be the first to answer!
        </Typography>
      )}

      <Stack spacing={3}>
        {comments.map((reply) =>
          reply ? (
            <ReplyItem
              key={reply._id}
              reply={reply}
              queryId={queryId}
              onReplySuccess={fetchReplies}
            />
          ) : null
        )}
      </Stack>

      <CommentForm queryId={queryId} onSuccess={fetchReplies} />
    </Box>
  );
}
