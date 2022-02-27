import { Box, Chip } from '@mui/material';
import React from 'react';

export default function TagList({ tags, noWrap = false, size = 'medium', gutterLeft = false }) {
  const maxHeight = { small: '24px', medium: '32px', large: '40px' }[size];

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        maxHeight: noWrap ? maxHeight : '',
        overflow: 'hidden',
        marginLeft: gutterLeft ? '8px' : '',
        '> *': { marginRight: '8px', marginBottom: noWrap ? '' : '8px' },
      }}
    >
      {tags.map((label) => (
        <Chip key={label} label={label} size={size} />
      ))}
    </Box>
  );
}