// 'use client';

// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   Avatar,
//   IconButton,
//   Stack,
//   Collapse,
// } from '@mui/material';
// import ReplyIcon from '@mui/icons-material/Reply';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import CommentForm from './CommentForm';

// interface Reply {
//   _id: string;
//   text: string;
//   userName?: string;
//   createdAt: string;
//   replies?: Reply[];
//   files?: { filename: string; url: string }[];
// }

// interface ReplyItemProps {
//   reply?: Reply; // ✅ optional
//   queryId: string;
//   onReplySuccess: () => void;
// }

// /* ✅ HARD SAFE GUARD */
// const getInitials = (name?: string) =>
//   typeof name === 'string' && name.length > 0
//     ? name.charAt(0).toUpperCase()
//     : 'U';

// export default function ReplyItem({
//   reply,
//   queryId,
//   onReplySuccess,
// }: ReplyItemProps) {
//   if (!reply) return null; // ✅ NEVER CRASH

//   const [showReplyForm, setShowReplyForm] = useState(false);
//   const [expanded, setExpanded] = useState(true);

//   return (
//     <Box>
//       <Stack direction="row" spacing={2} alignItems="flex-start">
//         <Avatar sx={{ bgcolor: '#667eea' }}>
//           {getInitials(reply.userName)}
//         </Avatar>

//         <Box flex={1}>
//           <Typography fontWeight={600}>
//             {reply.userName || 'User'}
//           </Typography>

//           <Typography sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}>
//             {reply.text}
//           </Typography>

//           {/* Attachments */}
//           {reply.files && reply.files.length > 0 && (
//             <Box mt={1}>
//               {reply.files.map((file) => (
//                 <Box key={file.url}>
//                   <a
//                     href={file.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     style={{
//                       color: '#667eea',
//                       fontSize: '0.9rem',
//                       textDecoration: 'none',
//                     }}
//                   >
//                     📎 {file.filename}
//                   </a>
//                 </Box>
//               ))}
//             </Box>
//           )}

//           {/* Actions */}
//           <Stack direction="row" spacing={1} mt={1}>
//             <IconButton
//               size="small"
//               onClick={() => setShowReplyForm((v) => !v)}
//             >
//               <ReplyIcon fontSize="small" />
//             </IconButton>

//             {reply.replies?.length > 0 && (
//               <IconButton
//                 size="small"
//                 onClick={() => setExpanded((v) => !v)}
//               >
//                 {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//               </IconButton>
//             )}
//           </Stack>

//           {/* Inline Reply */}
//           {showReplyForm && (
//             <Box mt={2}>
//               <CommentForm
//                 queryId={queryId}
//                 parentReplyId={reply._id}
//                 onSuccess={() => {
//                   setShowReplyForm(false);
//                   onReplySuccess();
//                 }}
//               />
//             </Box>
//           )}

//           {/* Nested Replies */}
//           {reply.replies?.length > 0 && (
//             <Collapse in={expanded}>
//               <Box ml={4} mt={2}>
//                 {reply.replies.map((child) => (
//                   <ReplyItem
//                     key={child._id}
//                     reply={child}
//                     queryId={queryId}
//                     onReplySuccess={onReplySuccess}
//                   />
//                 ))}
//               </Box>
//             </Collapse>
//           )}
//         </Box>
//       </Stack>
//     </Box>
//   );
// }


'use client';

import React, { useState } from 'react';
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
  reply?: Reply;
  queryId: string;
  onReplySuccess: () => void;
}

/* Safe initials */
const getInitials = (name?: string) =>
  typeof name === 'string' && name.length > 0
    ? name.charAt(0).toUpperCase()
    : 'U';

export default function ReplyItem({
  reply,
  queryId,
  onReplySuccess,
}: ReplyItemProps) {
  if (!reply) return null;

  const [showReplyForm, setShowReplyForm] = useState(false);
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <style>{`
        .reply-item {
          position: relative;
          padding-left: 32px;
        }

        /* Arrow before each answer/comment */
        .reply-item::before {
          content: "➜";
          position: absolute;
          left: 0;
          top: 10px;
          color: #22d3ee;
          font-size: 0.9rem;
        }

        .reply-row {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #22d3ee, #2563eb);
          color: black;
          font-size: 0.8rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .reply-body {
          flex: 1;
          color: #e5e7eb;
        }

        .reply-author {
          font-weight: 600;
          font-size: 0.85rem;
          margin-bottom: 4px;
        }

        .reply-text {
          white-space: pre-wrap;
          font-size: 0.9rem;
          color: #d1d5db;
        }

        .attachments {
          margin-top: 6px;
        }

        .attachments a {
          display: block;
          color: #22d3ee;
          font-size: 0.8rem;
          text-decoration: none;
          margin-top: 2px;
        }

        .actions {
          display: flex;
          gap: 10px;
          margin-top: 6px;
        }

        .actions button {
          background: transparent;
          border: none;
          color: #9ca3af;
          font-size: 0.75rem;
          cursor: pointer;
          padding: 2px 4px;
        }

        .actions button:hover {
          color: #22d3ee;
        }

        /* Nested replies */
        .children {
          margin-left: 24px;
          margin-top: 12px;
          padding-left: 16px;
          border-left: 1px solid rgba(34,211,238,0.2);
        }
      `}</style>

      <div className="reply-item">
        <div className="reply-row">
          <div className="avatar">
            {getInitials(reply.userName)}
          </div>

          <div className="reply-body">
            <div className="reply-author">
              {reply.userName || 'User'}
            </div>

            <div className="reply-text">
              {reply.text}
            </div>

            {/* Attachments */}
            {reply.files && reply.files.length > 0 && (
              <div className="attachments">
                {reply.files.map(file => (
                  <a
                    key={file.url}
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📎 {file.filename}
                  </a>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="actions">
              <button onClick={() => setShowReplyForm(v => !v)}>
                Reply
              </button>

              {reply.replies?.length ? (
                <button onClick={() => setExpanded(v => !v)}>
                  {expanded ? 'Hide replies' : 'Show replies'}
                </button>
              ) : null}
            </div>

            {/* Inline Reply Form */}
            {showReplyForm && (
              <div style={{ marginTop: '12px' }}>
                <CommentForm
                  queryId={queryId}
                  parentReplyId={reply._id}
                  onSuccess={() => {
                    setShowReplyForm(false);
                    onReplySuccess();
                  }}
                />
              </div>
            )}

            {/* Nested Replies */}
            {expanded && reply.replies?.length ? (
              <div className="children">
                {reply.replies.map(child => (
                  <ReplyItem
                    key={child._id}
                    reply={child}
                    queryId={queryId}
                    onReplySuccess={onReplySuccess}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
