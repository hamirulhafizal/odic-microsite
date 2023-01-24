import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Avatar, Rating, Stack } from '@mui/material';
import useAuth from 'hooks/useAuth';

const Avatar1 = 'https://avatars.githubusercontent.com/u/732422?s=116';
const Avatar2 = 'https://avatars.githubusercontent.com/u/197016?s=116';
const Avatar3 = 'https://avatars.githubusercontent.com/u/197012?s=116';
// const images1 = '/assets/images/landing/living-room-with-yellow.png';

const steps = [
  {
    label: 'Mr.Lee',
    description: `"Fast respond from REN & information of house selling were clearly explained"`,
    avatar: Avatar1,
    star: 4.5
  },
  {
    label: 'Ms. Prema',
    description:
      '"OD managed to get purchaser for my property as fast as 5 days. Luckily the purchaser managed to get fast loan approval also. Goodjob !"',
    avatar: Avatar2,
    star: 5
  },
  {
    label: 'Encik Roslan Saat',
    description: `"Very knowledgeable and experience agent when they make sharing on what we must do as owner/buyer especially on the process flow."`,
    avatar: Avatar3,
    star: 5
  }
];

export default function ReviewCard() {
  const theme = useTheme();
  const { user } = useAuth();
  const [activeStep, setActiveStep] = React.useState(0);
  const [value, setValue] = React.useState(2);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1, backgroundColor: 'white', p: 1, borderRadius: '10px' }}>
      <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{ px: 0 }}
        nextButton={
          <Button size="small" sx={{ color: 'black' }} onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" sx={{ color: 'black' }} onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          bgcolor: 'background.default'
        }}
      >
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Avatar src={`${steps[activeStep].avatar}`} />

          <Stack sx={{ pl: 2 }} direction="column">
            <Typography variant="main" sx={{ fontWeight: 'bold' }}>
              {steps[activeStep].label}
            </Typography>
            <Rating name="read-only" sx={{ position: ' relative', left: '-3px' }} value={steps[activeStep].star} readOnly />
          </Stack>
        </Stack>
      </Paper>
      <Box sx={{ height: 150, maxWidth: 400, width: '100%', py: 2, px: 0 }}>{steps[activeStep].description}</Box>
    </Box>
  );
}
