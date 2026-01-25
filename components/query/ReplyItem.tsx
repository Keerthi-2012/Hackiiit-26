'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Stack,
  Collapse,
} from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CommentForm from './CommentForm';

interface Reply {
  _id: string;
  text: string;
  userName?: string;
  createdAt: string;
  replies?: Reply[];
  files?: { filename: string; url: string }[];
}

interface ReplyItemProps {
  reply?: Reply; // ✅ optional
  queryId: string;
  onReplySuccess: () => void;
}

/* ✅ HARD SAFE GUARD */
const getInitials = (name?: string) =>
  typeof name === 'string' && name.length > 0
    ? name.charAt(0).toUpperCase()
    : 'U';

export default function ReplyItem({
  reply,
  queryId,
  onReplySuccess,
}: ReplyItemProps) {
  if (!reply) return null; // ✅ NEVER CRASH

  const [showReplyForm, setShowReplyForm] = useState(false);
  const [expanded, setExpanded] = useState(true);

  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Avatar sx={{ bgcolor: '#667eea' }}>
          {getInitials(reply.userName)}
        </Avatar>

        <Box flex={1}>
          <Typography fontWeight={600}>
            {reply.userName || 'User'}
          </Typography>

          <Typography sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}>
            {reply.text}
          </Typography>

          {/* Attachments */}
          {reply.files && reply.files.length > 0 && (
            <Box mt={1}>
              {reply.files.map((file) => (
                <Box key={file.url}>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#667eea',
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                    }}
                  >
                    📎 {file.filename}
                  </a>
                </Box>
              ))}
            </Box>
          )}

          {/* Actions */}
          <Stack direction="row" spacing={1} mt={1}>
            <IconButton
              size="small"
              onClick={() => setShowReplyForm((v) => !v)}
            >
              <ReplyIcon fontSize="small" />
            </IconButton>

            {reply.replies?.length > 0 && (
              <IconButton
                size="small"
                onClick={() => setExpanded((v) => !v)}
              >
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            )}
          </Stack>

          {/* Inline Reply */}
          {showReplyForm && (
            <Box mt={2}>
              <CommentForm
                queryId={queryId}
                parentReplyId={reply._id}
                onSuccess={() => {
                  setShowReplyForm(false);
                  onReplySuccess();
                }}
              />
            </Box>
          )}

          {/* Nested Replies */}
          {reply.replies?.length > 0 && (
            <Collapse in={expanded}>
              <Box ml={4} mt={2}>
                {reply.replies.map((child) => (
                  <ReplyItem
                    key={child._id}
                    reply={child}
                    queryId={queryId}
                    onReplySuccess={onReplySuccess}
                  />
                ))}
              </Box>
            </Collapse>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
