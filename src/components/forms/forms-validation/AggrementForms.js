import { useDispatch } from 'store';

// material-ui
import { Box, Button, Checkbox, FormControlLabel, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';
import AnimateButton from 'components/ui-component/extended/AnimateButton';
import SecondaryAction from 'components/ui-component/cards/CardSecondaryAction';
import { openSnackbar } from 'store/slices/snackbar';
import { gridSpacing } from 'store/constant';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// assets
import LinkIcon from '@mui/icons-material/Link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import InvestFormula from './InvestFormula';
import { useRef } from 'react';
import BankQr from './BankQr';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
  investVal: yup.number().min(1000, 'Min. RM1000 = 1 Slot').max(1000000, 'Max. RM1,000,000.00 = 1000 Slot').required('Amount is required')
});

// ==============================|| FORM VALIDATION - LOGIN FORMIK  ||============================== //

const AggrementForms = ({ handleNext, handleBack, index }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      investVal: 1000
    },
    validationSchema,
    onSubmit: () => {
      // dispatch(
      //   openSnackbar({
      //     open: true,
      //     message: 'Submit Success',
      //     variant: 'alert',
      //     alert: {
      //       color: 'success'
      //     },
      //     close: false
      //   })
      // );
      handleNext();
    }
  });

  return (
    <>
      <Stack direction={'column'}>
        <Box
          sx={{
            pt: 2,
            pb: 5,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <MainCard
            sx={{
              width: '100%',
              maxWidth: '350px',
              boxShadow: '1px 5px 5px -1px rgb(0 0 0 / 64%) !important',
              borderColor: 'transparent'
            }}
          >
            <BankQr>
              <form
                onSubmit={formik.handleSubmit}
                style={{
                  width: '100%'
                }}
              >
                <Button fullWidth variant="contained" component="label" type="submit" endIcon={<AttachFileIcon />} sx={{ mt: 2 }}>
                  Upload
                  <input hidden accept="image/*" multiple type="file" />
                </Button>
              </form>
            </BankQr>
          </MainCard>
        </Box>
        <Grid container spacing={gridSpacing}>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <AnimateButton>
              <Button startIcon={<ArrowBackIcon />} variant="contained" onClick={handleBack}>
                BACK
              </Button>
            </AnimateButton>
            <AnimateButton>
              <Button endIcon={<ArrowForwardIcon />} variant="contained" type="submit" onClick={handleNext}>
                NEXT
              </Button>

              {/* <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}></Button> */}
            </AnimateButton>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};

export default AggrementForms;
