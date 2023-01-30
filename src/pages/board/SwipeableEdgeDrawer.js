import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';

import InvestForms from '../../components/forms/forms-validation/InvestForms';
import BankAcc from 'components/forms/forms-validation/BankAcc';
import AggrementForms from 'components/forms/forms-validation/AggrementForms';

const steps = [
  {
    label: 'How much would you like to invest ?',
    description: `Make sure read all T&C before sign anything`,
    component: 'InvestForms'
  },
  {
    label: 'Upload Receipt',
    description: 'After transfer to company bank, kindlly upload the recepit by click the clip icon',
    component: 'BankAcc'
  },
  {
    label: 'Approval',
    description: `Your investment slot will be approved within 24hour working day`,
    component: 'Aggrement'
  }
];

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800]
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)'
}));

function SwipeableEdgeDrawer({ open, handleToggle }) {
  const drawerBleeding = 0;

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(95% - ${drawerBleeding}px)`,
            overflow: 'visible',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
          }
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={handleToggle(false)}
        onOpen={handleToggle(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true
        }}
        sx={{}}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            visibility: 'visible',
            right: 0,
            left: 0,
            pt: 5,
            textAlign: 'center',
            zIndex: 1
          }}
        >
          <Puller />
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            pt: 5,
            height: '100%',
            overflow: 'auto',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={index === 2 ? <Typography variant="caption">Last step</Typography> : null}
                  sx={{
                    textAlign: 'initial',
                    '& .Mui-active': {
                      color: 'black'
                    }
                  }}
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Typography
                    sx={{
                      textAlign: 'initial'
                    }}
                  >
                    {step.description}
                  </Typography>
                  {step.component == 'InvestForms' && <InvestForms handleNext={handleNext} handleBack={handleBack} index={index} />}
                  {step.component == 'BankAcc' && <BankAcc handleNext={handleNext} handleBack={handleBack} index={index} />}
                  {step.component == 'Aggrement' && <AggrementForms handleNext={handleNext} handleBack={handleBack} index={index} />}

                  {/* <Box sx={{ mb: 2 }}>
                    <div>
                      <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                      </Button>
                      <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                        Back
                      </Button>
                    </div>
                  </Box> */}
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>All steps completed - you&apos;re finished</Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          )}

          {/* <Typography variant="h3" sx={{ color: 'text.secondary' }}>
            How much Slot would you like to invest ?
          </Typography> */}
          {/* <Skeleton variant="rectangular" height="100%" /> */}
          {/* <InvestForms handleBank={handleBank} /> */}
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
}

SwipeableEdgeDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
};

export default SwipeableEdgeDrawer;
