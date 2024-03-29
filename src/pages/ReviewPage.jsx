import React, { useState, useContext } from 'react';
import { Box, Button } from '@mui/material';
import ReviewRatings from '../components/ReviewInputDetails/ReviewRatings';
import ReviewComments from '../components/ReviewInputDetails/ReviewComments';
import { postReview, postTagsByCourseID } from '../../src/api/index';
import ReviewAnonymous from '../components/ReviewInputDetails/ReviewAnonymous';
import ReviewRecommend from '../components/ReviewInputDetails/ReviewRecommend';
import ReviewRadioButtons from '../components/ReviewInputDetails/ReviewRadioButtons';
import ReviewDropdownSemester from '../components/ReviewInputDetails/ReviewDropdownSemester';
import ReviewDropdownProfessor from '../components/ReviewInputDetails/ReviewDropdownProfessor';
import Stack from '@mui/material/Stack';
import { useSnackbar } from 'notistack';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { CourseContext } from './CoursePage';
import ReviewTags from 'components/ReviewInputDetails/ReviewTags';

export default function ReviewPage() {
  const [ratingValue, setRatingValue] = useState(3);
  const [commentValue, setCommentValue] = useState('');
  const [anonymity, setAnonymity] = useState(false);
  const [recommendation, setRecommendation] = useState(false);
  const [HourSpent, setHourSpent] = useState();
  const [GradeReceived, setGradeReceived] = useState();
  const [IsExamHeavy, setExamHeavy] = useState();
  const [IsHomeworkHeavy, setHomeworkHeavy] = useState();
  const [ExtraCreditOffered, setExtraCreditOffered] = useState();
  const { reviewTags: tagSuggestion, refreshCourseData, course } = useContext(CourseContext);

  const [positiveTags, setPositiveTags] = useState([]);
  const [negativeTags, setNegativeTags] = useState([]);
  const [professor, setProfessor] = useState('');
  const [semester, setSemester] = useState();
  const { user } = useContext(UserContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const { professors } = useContext(CourseContext);
  const { semesters } = useContext(CourseContext);
  const handleNext = () => {
    if (activeStep === 1) {
      if (positiveTags.length === 0) {
        enqueueSnackbar(snackBarMessage.lackPos.message, {
          variant: snackBarMessage.lackPos.variant,
        });

        return;
      }
      if (negativeTags.length === 0) {
        enqueueSnackbar(snackBarMessage.lackNeg.message, {
          variant: snackBarMessage.lackNeg.variant,
        });
        return;
      }
    }

    if (activeStep === 2) {
      if (
        IsExamHeavy === undefined ||
        ExtraCreditOffered === undefined ||
        GradeReceived === undefined ||
        IsHomeworkHeavy === undefined ||
        HourSpent === undefined
      ) {
        enqueueSnackbar(snackBarMessage.lackAnswers.message, {
          variant: snackBarMessage.lackAnswers.variant,
        });

        return;
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const tagsPosLabel = 'Positive Side';
  const tagsNegLabel = 'Negative Side';
  //getTagsByCourseID(course.ID).then(setTags);

  const steps = [
    {
      label: 'Select Course Ratings',
      description: (
        <ReviewRatings
          course={course}
          value={ratingValue}
          onChange={(ratingValue) => {
            setRatingValue(ratingValue);
          }}
        />
      ),
    },
    {
      label:
        'Comments on the postive & negative sides of the course by selecting or adding your own tags',
      description: (
        <Box>
          <ReviewTags
            tags={positiveTags}
            tagsLabel={tagsPosLabel}
            tagSuggestion={positiveTags.concat(
              tagSuggestion.filter(
                (x) => !positiveTags.find((y) => x.name.trim() === y.name.trim())
              )
            )}
            onChange={(positiveTags) => {
              setPositiveTags(positiveTags);
            }}
          />
          <ReviewTags
            tags={negativeTags}
            tagsLabel={tagsNegLabel}
            tagSuggestion={negativeTags.concat(
              tagSuggestion.filter(
                (x) => !negativeTags.find((y) => x.name.trim() === y.name.trim())
              )
            )}
            onChange={(negativeTags) => {
              setNegativeTags(negativeTags);
            }}
          />
        </Box>
      ),
    },

    {
      label: 'Tells us more about your experience',
      description: (
        <Box>
          <ReviewRadioButtons
            radioLabel={'Did you spend more or less time than expected?'}
            options={[
              { optionValue: 0, optionLabel: 'less' },
              { optionValue: 1, optionLabel: 'as expected' },
              { optionValue: 2, optionLabel: 'more' },
            ]}
            radioValue={HourSpent}
            onChange={(HourSpent) => {
              setHourSpent(HourSpent);
            }}
          />

          <ReviewRadioButtons
            radioLabel={'Was there a lot of Homework?'}
            options={[
              { optionValue: false, optionLabel: 'No' },
              { optionValue: true, optionLabel: 'Yes' },
            ]}
            radioValue={IsHomeworkHeavy}
            onChange={(IsHomeworkHeavy) => {
              setHomeworkHeavy(IsHomeworkHeavy);
            }}
          />
          <ReviewRadioButtons
            radioLabel={'Were there a lot of Exams?'}
            options={[
              { optionValue: false, optionLabel: 'No' },
              { optionValue: true, optionLabel: 'Yes' },
            ]}
            radioValue={IsExamHeavy}
            onChange={(IsExamHeavy) => {
              setExamHeavy(IsExamHeavy);
            }}
          />
          <ReviewRadioButtons
            radioLabel={'Extra credited?'}
            options={[
              { optionValue: false, optionLabel: 'No' },
              { optionValue: true, optionLabel: 'Yes' },
            ]}
            radioValue={ExtraCreditOffered}
            onChange={(ExtraCreditOffered) => {
              setExtraCreditOffered(ExtraCreditOffered);
            }}
          />
          <ReviewRadioButtons
            radioLabel={'Grade Received'}
            options={[
              { optionValue: 'A', optionLabel: 'A' },
              { optionValue: 'A-', optionLabel: 'A-' },
              { optionValue: 'B+', optionLabel: 'B+' },
              { optionValue: 'B', optionLabel: 'B' },
              { optionValue: 'B-', optionLabel: 'B-' },
              { optionValue: 'C+', optionLabel: 'C+' },
              { optionValue: 'C', optionLabel: 'C' },
              { optionValue: 'C-', optionLabel: 'C-' },
              { optionValue: 'D+', optionLabel: 'D+' },
              { optionValue: 'D', optionLabel: 'D' },
            ]}
            radioValue={GradeReceived}
            onChange={(GradeReceived) => {
              setGradeReceived(GradeReceived);
            }}
          />
        </Box>
      ),
    },
    {
      label: 'Additional Information on the course',
      description: (
        <Box sx={{ padding: '12px 24px', '> *': { marginY: '12px !important' } }}>
          <ReviewComments
            value={commentValue}
            onChange={(commentValue) => {
              setCommentValue(commentValue);
            }}
          />
          <Stack direction='row' spacing={1}>
            {' '}
            <ReviewDropdownSemester
              options={semesters}
              value={semester}
              onChange={(semester) => {
                setSemester(semester);
              }}
            />
            <ReviewDropdownProfessor
              options={professors}
              value={professor}
              onChange={(professor) => {
                setProfessor(professor);
              }}
            />
          </Stack>
        </Box>
      ),
    },
  ];
  return (
    <Box sx={{ maxWidth: 1400 }}>
      <ReviewAnonymous
        userName={user.name}
        value={anonymity}
        onChange={(anonymity) => {
          setAnonymity(anonymity);
        }}
      />
      <ReviewRecommend
        value={recommendation}
        onChange={(recommendation) => {
          setRecommendation(recommendation);
        }}
      />{' '}
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 3 ? <Typography variant='caption'>Last step</Typography> : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 9 }}>
                <div>
                  <Button variant='contained' onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Link to={`/course/${course.id}/`} style={{ textDecoration: 'none' }}>
            <Button
              variant='contained'
              onClick={() => {
                for (let i = 0; i < positiveTags.length; i++) {
                  postTagsByCourseID(course.id, {
                    content: positiveTags[i].name.trim(),
                    type: 1,
                  }).catch((error) =>
                    enqueueSnackbar(snackBarMessage.error.message + error, {
                      variant: snackBarMessage.error.variant,
                    })
                  );
                }
                for (let i = 0; i < negativeTags.length; i++) {
                  postTagsByCourseID(course.id, {
                    content: negativeTags[i].name.trim(),
                    type: 0,
                  }).catch((error) =>
                    enqueueSnackbar(snackBarMessage.error.message + error, {
                      variant: snackBarMessage.error.variant,
                    })
                  );
                }

                postReview(course.id, {
                  classSemester: {
                    collegeName: semester.collegeName,
                    year: semester.year,
                    season: semester.season,
                  },
                  classProfessor: professor.professorName,
                  rating: ratingValue,
                  anonymous: anonymity,
                  recommended: recommendation,
                  comment: commentValue,
                  courseID: course.id,
                  userID: user.userID,
                  username: user.name,
                  //createdAt: createDateLocal,
                  likedCount: 0,
                  dislikedCount: 0,
                  hourSpent: HourSpent,
                  gradeReceived: GradeReceived,
                  isExamHeavy: IsExamHeavy,
                  isHomeworkHeavy: IsHomeworkHeavy,
                  extraCreditOffered: ExtraCreditOffered,
                })
                  .catch((error) =>
                    enqueueSnackbar(snackBarMessage.error.message + error, {
                      variant: snackBarMessage.error.variant,
                    })
                  )
                  .then(() => refreshCourseData(course.id));
                enqueueSnackbar(snackBarMessage.reviewSuccess.message, {
                  variant: snackBarMessage.reviewSuccess.variant,
                });
              }}
            >
              Submit
            </Button>
          </Link>
        </Paper>
      )}
    </Box>
  );
}
const snackBarMessage = {
  error: { message: 'Error : ', variant: 'error' },

  lackPos: { message: 'Please fill in the postive side of the course ', variant: 'warning' },
  lackNeg: { message: 'Please fill in the negative side of the course', variant: 'warning' },
  lackAnswers: {
    message: 'You have question(s）unanswered',
    variant: 'warning',
  },
  reviewSuccess: {
    message: 'Good job! You submitted the review!',
    variant: 'success',
  },
};
