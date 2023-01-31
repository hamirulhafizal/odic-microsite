import { useRef, useState } from 'react';
import { useDispatch } from 'store';

// material-ui
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';

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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import InvestFormula from './InvestFormula';

/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
  investVal: yup.number().min(1000, 'Min. RM1000 = 1 Slot').max(1000000, 'Max. RM1,000,000.00 = 1000 Slot').required('Amount is required')
});

// ==============================|| FORM VALIDATION - LOGIN FORMIK  ||============================== //

const InvestForms = ({ handleNext, handleBack, index }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [isChecked, setCheckBox] = useState(true);

  const handleCheckBox = (state) => {
    setCheckBox(state);
  };

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
            pb: 3,
            display: 'flex',
            justifyContent: 'start'
          }}
        >
          <MainCard
            sx={{
              width: matchDownSM ? '100%' : '550px',
              boxShadow: '1px 2px 5px -1px rgb(0 0 0 / 64%) !important',
              borderColor: 'transparent'
            }}
          >
            <InvestFormula value={formik.values.investVal != '' ? formik.values.investVal : 0} />
          </MainCard>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <TextField
                autoFocus={true}
                focused
                fullWidth
                id="investVal"
                name="investVal"
                label={<>AMOUNT</>}
                type="number"
                pattern="[0-9]*"
                InputProps={{
                  startAdornment: <InputAdornment position="start">RM</InputAdornment>
                }}
                inputProps={{
                  maxLength: 1
                }}
                InputLabelProps={{
                  shrink: true,
                  disableUnderline: true
                }}
                value={formik.values.investVal}
                onChange={formik.handleChange}
                error={formik.errors.investVal}
                placeholder={'1000'}
                helperText={
                  formik.values.investVal >= 1000 && formik.values.investVal <= 1000000
                    ? `${formik.values.investVal / 1000} Slot`
                    : formik.errors.investVal
                }
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 8);
                }}
              />

              <Box sx={{ pb: 1, display: 'flex' }}>
                <FormControlLabel
                  onClick={() => {
                    handleCheckBox(!isChecked);
                  }}
                  sx={{
                    textAlign: 'initial'
                  }}
                  variant="caption"
                  control={<Checkbox defaultChecked />}
                  label={`By ticking this Box, your agreed with our T&C`}
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={gridSpacing}>
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'end'
              }}
            >
              <AnimateButton>
                <Button
                  endIcon={<ArrowForwardIcon />}
                  variant="contained"
                  type="submit"
                  disabled={formik.values.investVal >= 1000 && formik.values.investVal <= 1000000 && isChecked ? false : true}
                >
                  NEXT
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      </Stack>
    </>
  );
};

export default InvestForms;
