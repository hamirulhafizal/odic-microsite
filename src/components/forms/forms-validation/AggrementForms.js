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
import BankQr from './BankQr';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import CancelIcon from '@mui/icons-material/Cancel';
import ScreenRotationIcon from '@mui/icons-material/ScreenRotation';
import ClearIcon from '@mui/icons-material/Clear';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

import SignatureCanvas from 'react-signature-canvas';
import AggrementPdf from './AggrementPdf';
import { pdfFromReact } from 'generate-pdf-from-react-html';
import DownloadIcon from '@mui/icons-material/Download';

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
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);
  const [isSign, setSign] = useState({ trimmedDataURL: null });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignClear = () => {
    signRef?.current.clear();
  };

  const handleSignSubmit = () => {
    setSign({
      trimmedDataURL: signRef.current.getTrimmedCanvas().toDataURL('image/png')
    });
    handleClose();
  };

  const handleSignRemove = () => {
    setSign({
      trimmedDataURL: null
    });
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

  console.log('isSign?.trimmedDataURL', isSign?.trimmedDataURL);

  return (
    <>
      <Stack direction={'column'}>
        <Box
          sx={{
            pt: 2,
            pb: 5,
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '100%'
          }}
        >
          <MainCard
            sx={{
              boxShadow: '1px 2px 5px -1px rgb(0 0 0/64%) !important',
              borderColor: 'transparent',
              width: matchDownSM ? '100%' : '550px'
            }}
          >
            {isSign?.trimmedDataURL !== null ? (
              <>
                <Stack
                  sx={{
                    width: '100%',
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <AggrementPdf signImg={isSign?.trimmedDataURL} />

                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'end',
                      position: 'relative',
                      top: '12px',
                      left: '10px',
                      zIndex: 1
                    }}
                  >
                    <IconButton
                      color="secondary"
                      variant="contained"
                      size="large"
                      aria-label="delete"
                      onClick={handleSignRemove}
                      sx={{ p: 0, backgroundColor: 'white' }}
                    >
                      <CancelIcon
                        sx={{
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          color: 'red'
                        }}
                      />
                    </IconButton>
                  </Box>

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

                  <Button
                    variant="contained"
                    component="label"
                    type="submit"
                    endIcon={<DownloadIcon />}
                    sx={{ mt: 2 }}
                    onClick={() => {
                      pdfFromReact('.element-to-print', 'My-file', 'p', true, false);
                    }}
                  >
                    Download
                  </Button>
                </Stack>
              </>
            ) : (
              <>
                <AggrementPdf signImg={null} />

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
