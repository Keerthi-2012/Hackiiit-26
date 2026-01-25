// 'use client';

// import React from 'react';
// import {
//   Box,
//   Typography,
//   Stack,
//   Chip,
//   Divider,
//   IconButton,
//   Tooltip,
// } from '@mui/material';
// import PersonIcon from '@mui/icons-material/Person';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import ShareIcon from '@mui/icons-material/Share';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

// interface QueryHeaderProps {
//   title: string;
//   author: string;
//   tags: string[];
//   queryId: string;
// }

// export default function QueryHeader({
//   title,
//   author,
//   tags,
//   queryId,
// }: QueryHeaderProps) {
//   const [copied, setCopied] = React.useState<boolean>(false);

//   const handleCopyId = (): void => {
//     navigator.clipboard.writeText(queryId);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <Box
//       sx={{
//         borderBottom: '1px solid #e0e0e0',
//         pb: 3,
//         mb: 3,
//       }}
//     >
//       {/* Title */}
//       <Typography
//         variant="h4"
//         sx={{
//           fontWeight: 700,
//           mb: 2.5,
//           color: '#1a1a1a',
//           lineHeight: 1.4,
//           my: 3,
//           mx: 60,
//         }}
//       >
//         {title}
//       </Typography>

//       {/* Meta Information */}
//       <Stack
//         direction="row"
//         spacing={2}
//         alignItems="center"
//         justifyContent="space-between"
//         sx={{
//           flexWrap: 'wrap',
//           gap: 2,
//           mx: 75,
//         }}
//       >
//         {/* Left Side - Author, Tags, ID */}
//         <Stack
//           direction="row"
//           spacing={1.5}
//           alignItems="center"
//           sx={{
//             flexWrap: 'wrap',
//             gap: 1,
//           }}
//         >
//           {/* Author */}
//           <Stack direction="row" spacing={0.8} alignItems="center">
//             <Box
//               sx={{
//                 p: 0.5,
//                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 borderRadius: '50%',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}
//             >
//               <PersonIcon sx={{ color: 'white', fontSize: 16 }} />
//             </Box>
//             <Typography
//               variant="body2"
//               sx={{
//                 color: '#666',
//                 fontWeight: 500,
//               }}
//             >
//               {author}
//             </Typography>
//           </Stack>

//           <Typography variant="body2" sx={{ color: '#ddd' }}>
//             •
//           </Typography>

//           {/* Tags */}
//           <Stack direction="row" spacing={0.8} alignItems="center">
//             {tags.map((tag) => (
//               <Chip
//                 key={tag}
//                 label={tag}
//                 size="small"
//                 sx={{
//                   backgroundColor: '#f0f4ff',
//                   color: '#667eea',
//                   fontWeight: 600,
//                   height: 24,
//                   fontSize: '0.75rem',
//                   '&:hover': {
//                     backgroundColor: '#e8eef7',
//                   },
//                 }}
//               />
//             ))}
//           </Stack>

//           <Typography variant="body2" sx={{ color: '#ddd' }}>
//             •
//           </Typography>

//           {/* Query ID */}
//           <Tooltip title={copied ? 'Copied!' : 'Copy ID'}>
//             <Box
//               sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 0.5,
//                 px: 1.5,
//                 py: 0.5,
//                 backgroundColor: '#f5f5f5',
//                 borderRadius: 1,
//                 cursor: 'pointer',
//                 transition: 'all 0.2s',
//                 '&:hover': {
//                   backgroundColor: '#efefef',
//                 },
//               }}
//               onClick={handleCopyId}
//             >
//               <Typography
//                 variant="caption"
//                 sx={{
//                   color: '#999',
//                   fontFamily: 'monospace',
//                   fontWeight: 600,
//                   fontSize: '0.8rem',
//                 }}
//               >
//                 ID: {queryId}
//               </Typography>
//               <ContentCopyIcon
//                 sx={{
//                   fontSize: 14,
//                   color: '#999',
//                 }}
//               />
//             </Box>
//           </Tooltip>
//         </Stack>

//         {/* Right Side - Action Buttons */}
//         <Stack direction="row" spacing={1}>
//           <Tooltip title="Share">
//             <IconButton
//               size="small"
//               sx={{
//                 color: '#999',
//                 border: '1px solid #e0e0e0',
//                 borderRadius: 1,
//                 '&:hover': {
//                   backgroundColor: 'rgba(102, 126, 234, 0.1)',
//                   color: '#667eea',
//                   borderColor: '#667eea',
//                 },
//               }}
//             >
//               <ShareIcon fontSize="small" />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Save">
//             <IconButton
//               size="small"
//               sx={{
//                 color: '#999',
//                 border: '1px solid #e0e0e0',
//                 borderRadius: 1,
//                 '&:hover': {
//                   backgroundColor: 'rgba(102, 126, 234, 0.1)',
//                   color: '#667eea',
//                   borderColor: '#667eea',
//                 },
//               }}
//             >
//               <BookmarkBorderIcon fontSize="small" />
//             </IconButton>
//           </Tooltip>
//         </Stack>
//       </Stack>
//     </Box>
//   );
// }



'use client';

import React, { useState } from 'react';

interface QueryHeaderProps {
  title: string;
  author: string;
  tags: string[];
  queryId: string;
}

export default function QueryHeader({
  title,
  author,
  tags,
  queryId,
}: QueryHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(queryId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{`
        body {
          background: linear-gradient(135deg, #050b1a, #0b122b, #000);
        }

        .query-header {
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding-bottom: 2rem;
          margin-bottom: 2rem;
        }

        .query-title {
          text-align: center;
          font-size: 2rem;
          font-weight: 700;
          color: #22d3ee;
          margin: 1.5rem 0;
        }

        .query-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          max-width: 1200px;
          margin: auto;
          padding: 0 2rem;
        }

        .query-left {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
          color: #d1d5db;
          font-size: 0.875rem;
        }

        .author {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .author-icon {
          background: linear-gradient(135deg, #22d3ee, #2563eb);
          color: black;
          border-radius: 50%;
          padding: 4px;
          font-size: 0.75rem;
        }

        .dot {
          color: #6b7280;
        }

        .tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .tag {
          background: rgba(34,211,238,0.1);
          color: #22d3ee;
          padding: 2px 8px;
          font-size: 0.7rem;
          border-radius: 6px;
          border: 1px solid rgba(34,211,238,0.3);
        }

        .query-id {
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(255,255,255,0.05);
          padding: 4px 10px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: monospace;
        }

        .query-id:hover {
          color: #22d3ee;
          border: 1px solid #22d3ee;
        }

        .copied {
          color: #22c55e;
          font-size: 0.7rem;
        }

        .actions {
          display: flex;
          gap: 0.5rem;
        }

        .actions button {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: #9ca3af;
          padding: 6px 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .actions button:hover {
          color: #22d3ee;
          border-color: #22d3ee;
          background: rgba(34,211,238,0.1);
        }
      `}</style>

      <div className="query-header">
        <h1 className="query-title">{title}</h1>

        <div className="query-meta">
          <div className="query-left">
            <span className="dot">•</span>

            <div className="tags">
              {tags.map(tag => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            {copied && <span className="copied">Copied!</span>}
          </div>
        </div>
      </div>
    </>
  );
}
