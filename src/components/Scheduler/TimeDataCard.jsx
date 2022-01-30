import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Card, Divider, colors } from '@mui/material';
import { Edit, InfoOutlined } from '@material-ui/icons';

export default function TimeDataCard({
  data: { title, subtitle, descriptions, detailPageLink },
}) {
  return (
    <Card
      sx={{
        padding: '0px 16px 16px',
        borderTop: '8px solid',
        borderColor: colors.blue[600],
      }}
    >
      <h3>{title}</h3>
      <div style={{ marginTop: '-16px' }}>{subtitle}</div>
      <Divider sx={{ margin: '12px 0px' }} />
      {descriptions.map((description, i) => (
        <div key={i}>{description}</div>
      ))}
      <Box sx={{ marginTop: '16px', display: 'flex', flexDirection: 'row' }}>
        <Button
          size='small'
          component={Link}
          to={detailPageLink}
          variant='outlined'
          fullWidth
          startIcon={<Edit />}
          endIcon={<InfoOutlined />}
        >
          Edit
          <Divider orientation='vertical' sx={{ margin: '0px 24px' }} />
          Browse Details
        </Button>
      </Box>
    </Card>
  );
}
