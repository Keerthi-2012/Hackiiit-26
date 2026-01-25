// 'use client';

// import React, { useState, ChangeEvent } from 'react';
// import {
//   Box,
//   TextField,
//   Button,
//   Paper,
//   Stack,
//   Typography,
//   CircularProgress,
//   IconButton,
//   Alert,
//   Chip,
// } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import ClearIcon from '@mui/icons-material/Clear';

// interface CommentFormProps {
//   queryId: string;
//   parentReplyId?: string; // ✅ optional
//   onSuccess?: () => void;
// }

// export default function CommentForm({
//   queryId,
//   parentReplyId,
//   onSuccess,
// }: CommentFormProps) {
//   const [text, setText] = useState('');
//   const [file, setFile] = useState<File | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState('');

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const f = e.target.files?.[0] || null;
//     if (f && f.size > 10 * 1024 * 1024) {
//       setError('File size must be under 10MB');
//       return;
//     }
//     setFile(f);
//   };

//   const handleSubmit = async () => {
//     if (!text.trim()) {
//       setError('Please write something');
//       return;
//     }

//     setIsSubmitting(true);
//     setError('');

//     try {
//       const formData = new FormData(); // ✅ FIRST
//       formData.append('queryId', queryId);
//       formData.append('text', text);
//       formData.append('isAnonymous', 'false');

//       if (parentReplyId) {
//         formData.append('parentReplyId', parentReplyId); // ✅ SAFE
//       }

//       if (file) {
//         formData.append('file', file);
//       }

//       const res = await fetch('/api/reply', {
//         method: 'POST',
//         body: formData,
//         credentials: 'include',
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         throw new Error(err.error || 'Failed to post reply');
//       }

//       // ✅ reset
//       setText('');
//       setFile(null);

//       // ✅ auto-refresh
//       onSuccess?.();
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Box sx={{ mt: 3 }}>
//       <Paper sx={{ p: 3, borderRadius: 2 }}>
//         <Typography variant="h6" fontWeight={700}>
//           {parentReplyId ? 'Write a Reply' : 'Write Your Answer'}
//         </Typography>

//         {error && (
//           <Alert severity="error" sx={{ mt: 2 }}>
//             {error}
//           </Alert>
//         )}

//         <TextField
//           fullWidth
//           multiline
//           rows={4}
//           sx={{ mt: 2 }}
//           placeholder="Write your answer..."
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />

//         {file && (
//           <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
//             <Stack direction="row" justifyContent="space-between">
//               <Typography>{file.name}</Typography>
//               <IconButton onClick={() => setFile(null)}>
//                 <ClearIcon />
//               </IconButton>
//             </Stack>
//           </Paper>
//         )}

//         <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
//           <Button component="label" startIcon={<AttachFileIcon />}>
//             Attach File
//             <input hidden type="file" onChange={handleFileChange} />
//           </Button>

//           <Button
//             variant="contained"
//             endIcon={
//               isSubmitting ? (
//                 <CircularProgress size={20} />
//               ) : (
//                 <SendIcon />
//               )
//             }
//             onClick={handleSubmit}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? 'Posting...' : 'Post'}
//           </Button>
//         </Stack>

//         {file && <Chip label="1 file attached" size="small" sx={{ mt: 2 }} />}
//       </Paper>
//     </Box>
//   );
// }


'use client';

import React, { useState, ChangeEvent } from 'react';

interface CommentFormProps {
  queryId: string;
  parentReplyId?: string;
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
      const formData = new FormData();
      formData.append('queryId', queryId);
      formData.append('text', text);
      formData.append('isAnonymous', 'false');

      if (parentReplyId) {
        formData.append('parentReplyId', parentReplyId);
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

      setText('');
      setFile(null);
      onSuccess?.();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        .comment-box {
          margin-top: 24px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 16px;
        }

        .comment-title {
          font-weight: 700;
          font-size: 0.95rem;
          color: #e5e7eb;
        }

        .error {
          margin-top: 12px;
          background: rgba(239,68,68,0.15);
          border: 1px solid rgba(239,68,68,0.4);
          color: #fecaca;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 0.8rem;
        }

        .textarea {
          width: 100%;
          margin-top: 12px;
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 10px;
          color: #e5e7eb;
          resize: vertical;
          font-size: 0.85rem;
        }

        .textarea:focus {
          outline: none;
          border-color: #22d3ee;
        }

        .file-box {
          margin-top: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 8px 10px;
          border-radius: 6px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          color: #d1d5db;
        }

        .file-remove {
          cursor: pointer;
          color: #ef4444;
        }

        .actions {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .attach {
          font-size: 0.75rem;
          color: #9ca3af;
          cursor: pointer;
        }

        .attach:hover {
          color: #22d3ee;
        }

        .post-btn {
          background: linear-gradient(135deg, #22d3ee, #2563eb);
          border: none;
          color: black;
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 0.75rem;
          cursor: pointer;
          font-weight: 600;
        }

        .post-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .file-chip {
          margin-top: 10px;
          font-size: 0.7rem;
          color: #22d3ee;
        }
      `}</style>

      <div className="comment-box">
        <div className="comment-title">
          {parentReplyId ? 'Write a Reply' : 'Write Your Answer'}
        </div>

        {error && <div className="error">{error}</div>}

        <textarea
          className="textarea"
          rows={4}
          placeholder="Write your answer..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {file && (
          <div className="file-box">
            <span>{file.name}</span>
            <span className="file-remove" onClick={() => setFile(null)}>
              ✕
            </span>
          </div>
        )}

        <div className="actions">
          <label className="attach">
            📎 Attach file
            <input type="file" hidden onChange={handleFileChange} />
          </label>

          <button
            className="post-btn"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting…' : 'Post'}
          </button>
        </div>

        {file && <div className="file-chip">1 file attached</div>}
      </div>
    </>
  );
}