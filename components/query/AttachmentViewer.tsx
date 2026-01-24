
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
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  switch (extension) {
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

const getFileSize = (url: string): string => {
  // Mock function - in real app, get actual size from response headers
  return '2.4 MB';
};

export default function AttachmentViewer({
  attachments = [
    { name: 'Document.pdf', url: '#' },
    { name: 'Presentation.pptx', url: '#' },
    { name: 'Screenshot.png', url: '#' },
    { name: 'Report.docx', url: '#' },
  ],
}: AttachmentViewerProps) {
  return (
    <Box sx={{ width: '100%', maxWidth: 700, mx: 'auto', p: 2 }}>
      <Paper
        elevation={2}
        sx={{
          borderRadius: 2,
          background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)',
          overflow: 'hidden',
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            p: 3,
            color: 'white',
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <FileDownloadIcon sx={{ fontSize: 28 }} />
            <div>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                Attachments
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                {attachments.length} file{attachments.length !== 1 ? 's' : ''} available
              </Typography>
            </div>
          </Stack>
        </Box>

        {/* Files List */}
        <List sx={{ p: 0 }}>
          {attachments.map((file: Attachment, index: number) => (
            <React.Fragment key={file.name}>
              <ListItem
                disablePadding
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(102, 126, 234, 0.08)',
                  },
                  transition: 'background-color 0.2s',
                }}
              >
                <ListItemButton
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    py: 2,
                    px: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center" flex={1}>
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      {getFileIcon(file.name)}
                    </ListItemIcon>
                    <Stack spacing={0.5}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: '#333',
                          wordBreak: 'break-word',
                        }}
                      >
                        {file.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#999' }}>
                        {getFileSize(file.url)}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Chip
                    label="Download"
                    size="small"
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      fontWeight: 600,
                      cursor: 'pointer',
                      ml: 2,
                      '&:hover': {
                        opacity: 0.9,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
              {index < attachments.length - 1 && (
                <Box
                  sx={{
                    borderBottom: '1px solid #e0e0e0',
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </List>

        {attachments.length === 0 && (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <FileDownloadIcon
              sx={{ fontSize: 48, color: '#ccc', mb: 2, display: 'block' }}
            />
            <Typography variant="body2" sx={{ color: '#999' }}>
              No attachments available
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}