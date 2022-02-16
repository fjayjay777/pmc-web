import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { fetchCoursesBySearch } from '../api';
import PageWithScheduler from './PageWithScheduler';
import { useMount } from '../utils';
import CourseResultList from '../components/CourseCardGrid/CourseResultList';
import { fetchCoursesByCourseIDs } from './HomePage';

export default function SearchPage({ shouldShowScheduler }) {
  const [courses, setCourses] = useState(null);

  const urlParams = useParams();

  useMount(() => {
    fetchCoursesBySearch(urlParams['query']).then((courseIDs) => {
      setCourses(Array(courseIDs.length).fill({}));
      fetchCoursesByCourseIDs(courseIDs, (courses) => setCourses(courses));
    });
  });

  return (
    <PageWithScheduler shouldShowScheduler={shouldShowScheduler}>
      {courses ? (
        <Box sx={{ padding: '24px' }}>
          <Typography variant='subtitle2' gutterBottom>
            Found {courses.length} results for <b>"{urlParams['query']}"</b>
          </Typography>
          <CourseResultList courses={courses} />
        </Box>
      ) : (
        <Box sx={{ width: '100%', height: '100%', display: 'flex' }}>
          <CircularProgress sx={{ margin: 'auto' }} />
        </Box>
      )}
    </PageWithScheduler>
  );
}
