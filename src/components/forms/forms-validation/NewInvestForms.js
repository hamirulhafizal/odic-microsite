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

/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
  investVal: yup.number().min(1000, 'Min. RM1000 = 1 Slot').max(1000000, 'Max. RM1,000,000.00 = 1000 Slot').required('Amount is required')
});

// ==============================|| FORM VALIDATION - LOGIN FORMIK  ||============================== //

const NewInvestForms = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      investVal: 1000
    },
    validationSchema,
    onSubmit: () => {
      dispatch(
        openSnackbar({
          open: true,
          message: 'Submit Success',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
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
              maxWidth: '300px',
              boxShadow: '1px 5px 5px -1px rgb(0 0 0 / 64%) !important',
              borderColor: 'transparent'
            }}
          >
            <InvestFormula value={formik.values.investVal} />
          </MainCard>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <TextField
                focused
                fullWidth
                id="investVal"
                name="investVal"
                label={<>AMOUNT</>}
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">RM</InputAdornment>
                }}
                InputLabelProps={{
                  shrink: true
                }}
                value={formik.values.investVal}
                onChange={formik.handleChange}
                error={formik.errors.investVal}
                placeholder={1000}
                helperText={
                  formik.values.investVal >= 1000 && formik.values.investVal <= 1000000
                    ? `${formik.values.investVal / 1000} Slot`
                    : formik.errors.investVal
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Stack direction="column" justifyContent="flex-end">
                <Box sx={{ pb: 1 }}>
                  <FormControlLabel control={<Checkbox defaultChecked />} label={`By ticking this Box, your agreed with our T&C`} />
                </Box>
                <AnimateButton>
                  <Button
                    fullWidth
                    endIcon={<ArrowForwardIcon />}
                    variant="contained"
                    type="submit"
                    disabled={formik.values.investVal >= 1000 && formik.values.investVal <= 1000000 ? false : true}
                  >
                    NEXT
                  </Button>
                </AnimateButton>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Stack>
    </>
  );
};

export default NewInvestForms;
