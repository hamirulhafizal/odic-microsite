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
import LinkIcon from '@mui/icons-material/Link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import InvestFormula from './InvestFormula';
import { useRef, useState } from 'react';
import BankQr from './BankQr';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UploadResit from './UploadResit';

/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
  investVal: yup.number().min(1000, 'Min. RM1000 = 1 Slot').max(1000000, 'Max. RM1,000,000.00 = 1000 Slot').required('Amount is required')
});

// ==============================|| FORM VALIDATION - LOGIN FORMIK  ||============================== //

const BankAcc = ({ handleNext, handleBack, index }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [isImg, setImg] = useState(false);

  const handlePreviewImg = (state) => {
    setImg(state);
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
            py: 2,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <MainCard
            sx={{
              width: matchDownSM ? '100%' : '550px',
              boxShadow: '1px 2px 5px -1px rgb(0 0 0 / 64%) !important',
              borderColor: 'transparent'
            }}
          >
            <BankQr>
              <UploadResit handlePreviewImg={handlePreviewImg} />
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
              <Button disabled={isImg ? false : true} endIcon={<ArrowForwardIcon />} variant="contained" type="submit" onClick={handleNext}>
                NEXT
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};

export default BankAcc;
