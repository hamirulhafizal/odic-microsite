import { forwardRef, useRef, useState } from 'react';
import { useDispatch } from 'store';

// material-ui
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Slide,
  Stack,
  TextField,
  Typography
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
import BankQr from './BankQr';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import CancelIcon from '@mui/icons-material/Cancel';
import ScreenRotationIcon from '@mui/icons-material/ScreenRotation';
import ClearIcon from '@mui/icons-material/Clear';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

import SignatureCanvas from 'react-signature-canvas';

/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
  investVal: yup.number().min(1000, 'Min. RM1000 = 1 Slot').max(1000000, 'Max. RM1,000,000.00 = 1000 Slot').required('Amount is required')
});

// ==============================|| FORM VALIDATION - LOGIN FORMIK  ||============================== //

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AggrementForms = ({ handleNext, handleBack, index }) => {
  const dispatch = useDispatch();
  const signRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [isSign, setSign] = useState({ trimmedDataURL: null });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignClear = () => {
    signRef.current.clear();
    console.log('signRef-->', signRef.current);
  };

  const handleSignSubmit = () => {
    console.log('signRef-->', signRef.current);

    setSign({
      trimmedDataURL: signRef.current.getTrimmedCanvas().toDataURL('image/png')
    });
    handleClose();
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

  console.log('isSign', isSign);

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
              maxWidth: '500px',
              boxShadow: '1px 2px 5px -1px rgb(0 0 0/64%) !important',
              borderColor: 'transparent'
            }}
          >
            {/* <BankQr>
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
            </BankQr> */}

            {isSign?.trimmedDataURL !== null ? (
              <>
                <IconButton
                  color="secondary"
                  sx={{
                    p: 0,
                    pb: 2,
                    position: 'relative',
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  variant="contained"
                  size="large"
                  aria-label="delete"
                  // onClick={handleSignClear}
                >
                  <CancelIcon
                    sx={{
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      color: 'red'
                    }}
                  />
                </IconButton>
                <Avatar
                  sx={{
                    width: '100%',
                    height: 'auto',
                    backgroundColor: '#b5a83730',
                    padding: '12px',
                    borderBottomLeftRadius: '5px',
                    borderBottomRightRadius: '5px',
                    borderRadius: '0px'
                  }}
                  alt="signature"
                  src={isSign?.trimmedDataURL}
                />
              </>
            ) : (
              <>
                <Button
                  fullWidth
                  variant="contained"
                  component="label"
                  type="submit"
                  endIcon={<HistoryEduIcon />}
                  sx={{ mt: 2 }}
                  onClick={handleClickOpen}
                >
                  Signature
                </Button>
              </>
            )}
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

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          '.MuiDialog-paper': {
            backgroundColor: 'black',
            width: '100vw',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center'
          }
        }}
      >
        <IconButton
          color="secondary"
          sx={{ position: 'relative' }}
          variant="contained"
          size="large"
          aria-label="delete"
          onClick={handleClose}
        >
          <CancelIcon
            sx={{
              backgroundColor: 'white',
              borderRadius: '50%',
              color: 'black'
            }}
          />
        </IconButton>
        <Box>
          {window.innerHeight > window.innerWidth ? (
            <>
              <Button
                variant="contained"
                component="label"
                type="submit"
                endIcon={<ScreenRotationIcon />}
                sx={{ mt: 5, color: 'white', backgroundColor: 'black' }}
              >
                To Signature, rotate your Mobile !
              </Button>
            </>
          ) : (
            <>
              <SignatureCanvas ref={signRef} penColor="black" canvasProps={{ className: 'sigCanvas' }} backgroundColor="white" />
              <Stack
                sx={{
                  flexDirection: 'row',
                  alignItems: 'end',
                  justifyContent: 'end',
                  gap: '1%'
                }}
              >
                <Button
                  color="secondary"
                  variant="contained"
                  component="label"
                  type="submit"
                  endIcon={<ClearIcon />}
                  onClick={handleSignClear}
                >
                  clear
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  component="label"
                  type="submit"
                  endIcon={<SendOutlinedIcon />}
                  onClick={handleSignSubmit}
                >
                  Submit
                </Button>
              </Stack>
            </>
          )}
        </Box>
      </Dialog>
    </>
  );
};

export default AggrementForms;
