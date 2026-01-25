'use client';

import React from 'react';
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  Typography,
  Stack,
  Chip,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';

interface Attachment {
  name: string;
  url: string;
}

interface AttachmentViewerProps {
  attachments?: Attachment[];
}

const getFileIcon = (fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase();

  switch (ext) {
    case 'pdf':
      return <PictureAsPdfIcon sx={{ color: '#d32f2f' }} />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'webp':
      return <ImageIcon sx={{ color: '#1976d2' }} />;
    case 'doc':
    case 'docx':
    case 'txt':
      return <DescriptionIcon sx={{ color: '#2196f3' }} />;
    default:
      return <InsertDriveFileIcon sx={{ color: '#757575' }} />;
  }
};
export default function AttachmentViewer({
  attachments,
}: AttachmentViewerProps) {
  // ✅ hard guard
  if (!Array.isArray(attachments) || attachments.length === 0) return null;

  return (
    <Box sx={{ width: '100%', maxWidth: 700, mx: 'auto', mt: 2 }}>
      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {/* Header */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            p: 2,
            color: 'white',
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <FileDownloadIcon />
            <Typography fontWeight={700}>
              Attachments ({attachments.length})
            </Typography>
          </Stack>
        </Box>

        {/* Files */}
        <List disablePadding>
          {attachments.map((file, index) => {
            if (!file?.name || !file?.url) return null; // ✅ guard

            return (
              <React.Fragment key={`${file.url}-${index}`}>
                <ListItem disablePadding>
                  <ListItemButton
                    component="a"
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ListItemIcon>
                      {getFileIcon(file.name)}
                    </ListItemIcon>

                    <Typography sx={{ fontWeight: 600 }}>
                      {file.name}
                    </Typography>

                    <Chip
                      label="Download"
                      size="small"
                      sx={{
                        ml: 'auto',
                        background:
                          'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                      }}
                    />
                  </ListItemButton>
                </ListItem>

                {index < attachments.length - 1 && (
                  <Box sx={{ borderBottom: '1px solid #eee' }} />
                )}
              </React.Fragment>
            );
          })}
        </List>
      </Paper>
    </Box>
  );
}

