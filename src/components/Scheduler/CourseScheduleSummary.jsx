import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { formatInstructorName, parseDayList, secondsToTimeString } from '../../utils';
import DaysIndicator from '../CourseCardGrid/CourseCard/DaysIndicator';
import { getComponent, getInstructor } from './ShoppingCart';

export default function CourseScheduleSummary({ classes, plainText = false }) {
  const [sortedClasses, setSortedClasses] = useState([]);
  const [instructorName, setInstructorName] = useState(null);

  useEffect(() => {
    setSortedClasses(
      classes
        .map((x) => ({ component: getComponent(x), classData: x }))
        .sort((x, y) => +(x.component !== 'Lecture') - +(y.component !== 'Lecture'))
    );
    const instructor = getInstructor(classes[0]);
    setInstructorName(instructor && formatInstructorName(instructor));
  }, [classes]);

  return (
    <Stack spacing={plainText ? 0 : '4px'}>
      <Typography variant='body2' noWrap>
        Instructor: {instructorName || 'TBD'}
      </Typography>
      {sortedClasses.map(({ component, classData }) => (
        <Stack key={component} direction='row' alignItems='center'>
          <Typography variant='body2' noWrap>
            {component}:
          </Typography>
          {classData.offerDate?.length === 0 ? (
            <Typography variant='subtitle2'>&nbsp;meets online</Typography>
          ) : (
            <>
              {plainText ? (
                <Typography variant='subtitle2' noWrap>
                  &nbsp;
                  {formatDayList(parseDayList(classData.offerDate))}
                  &nbsp;@&nbsp;
                </Typography>
              ) : (
                <DaysIndicator
                  days={parseDayList(classData.offerDate)}
                  width='88px'
                  height={1.25}
                  sx={{ marginLeft: '12px', marginRight: '-2px' }}
                />
              )}
              <Typography variant='subtitle2' noWrap>
                {formatTimeRange(classData)}
              </Typography>
            </>
          )}
        </Stack>
      ))}
    </Stack>
  );
}

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const formatDayList = (days) => days.map((x) => dayNames[x]).join(', ');

/** `09:40am–10:30am` becomes `9:40–10:30am`. */
export const formatTimeRange = ({ startTime, endTime }) => {
  if (!isNaN(startTime)) {
    return formatTimeRange({
      startTime: secondsToTimeString(startTime),
      endTime: secondsToTimeString(endTime),
    });
  }
  if (startTime.slice(-2) === endTime.slice(-2)) startTime = startTime.slice(0, -2);
  return `${startTime.replace(/^0+/, '')}–${endTime.replace(/^0+/, '')}`;
};
