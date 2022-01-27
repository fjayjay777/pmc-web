import React from 'react';
import { Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddCommentIcon from '@mui/icons-material/AddComment';
import CourseContext from '../../components/CourseDetails/CourseContext';
import { Link } from 'react-router-dom';

export default function CourseAddReview() {
  return (
    <Grid item>
      <MuiTypography variant='h5' gutterBottom>
        Review this course
      </MuiTypography>
      <MuiTypography variant='subtitle1' gutterBottom>
        Share your thoughts with other students
      </MuiTypography>
      <Stack spacing={2} direction='row'>
        <Link
          to={`/courseDetails/${CourseContext.courseID}/review`}
          style={{ textDecoration: 'none' }}
        >
          <Button variant='contained' startIcon={<AddCommentIcon />}>
            Write a Review
          </Button>
        </Link>
      </Stack>
    </Grid>
  );
}
