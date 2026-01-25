// 'use client';

// import React, { useEffect, useState } from 'react';
// import { Box, Typography, Stack } from '@mui/material';
// import ReplyItem from './ReplyItem';
// import CommentForm from './CommentForm';

// interface Reply {
//   _id: string;
//   text: string;
//   userName?: string;
//   createdAt: string;
//   replies?: Reply[];
//   files?: { filename: string; url: string }[];
// }

// interface DiscussionProps {
//   queryId: string;
// }

// export default function Discussion({ queryId }: DiscussionProps) {
//   const [comments, setComments] = useState<Reply[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchReplies = async () => {
//     try {
//       const res = await fetch(`/api/reply?queryId=${queryId}`, {
//         cache: 'no-store',
//       });

//       const data = await res.json();
//       setComments(Array.isArray(data) ? data : []); // ✅ SAFE
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReplies();
//   }, [queryId]);

//   if (loading) {
//     return <Typography>Loading answers...</Typography>;
//   }

//   return (
//     <Box mt={4}>
//       <Typography variant="h6" fontWeight={700} mb={2}>
//         Answers ({comments.length})
//       </Typography>

//       {comments.length === 0 && (
//         <Typography color="text.secondary">
//           No answers yet. Be the first to answer!
//         </Typography>
//       )}

//       <Stack spacing={3}>
//         {comments.map((reply) =>
//           reply ? (
//             <ReplyItem
//               key={reply._id}
//               reply={reply}
//               queryId={queryId}
//               onReplySuccess={fetchReplies}
//             />
//           ) : null
//         )}
//       </Stack>

//       <CommentForm queryId={queryId} onSuccess={fetchReplies} />
//     </Box>
//   );
// }


'use client';

import React, { useEffect, useState } from 'react';
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
      setComments(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, [queryId]);

  return (
    <>
      <style>{`
        .discussion {
          margin-top: 2.5rem;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
          padding: 0 2rem;
        }

        .discussion-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #e5e7eb;
          margin-bottom: 1rem;
        }

        .discussion-loading {
          color: #9ca3af;
          font-size: 0.9rem;
        }

        .discussion-empty {
          color: #9ca3af;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }

        .answers {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
          color: #e5e7eb;
        }
      `}</style>

      <div className="discussion">
        {loading ? (
          <div className="discussion-loading">
            Loading answers...
          </div>
        ) : (
          <>
            <div className="discussion-title">
              Answers ({comments.length})
            </div>

            {comments.length === 0 && (
              <div className="discussion-empty">
                No answers yet. Be the first to answer!
              </div>
            )}

            <div className="answers">
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
            </div>

            <CommentForm
              queryId={queryId}
              onSuccess={fetchReplies}
            />
          </>
        )}
      </div>
    </>
  );
}
