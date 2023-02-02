import { forwardRef, useRef, useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'store';

// material-ui
import { Avatar, Box, Button, CircularProgress, Dialog, Grid, IconButton, Slide, Stack, useMediaQuery, useTheme } from '@mui/material';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';
import AnimateButton from 'components/ui-component/extended/AnimateButton';
import { openSnackbar } from 'store/slices/snackbar';
import { gridSpacing } from 'store/constant';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// assets
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import CancelIcon from '@mui/icons-material/Cancel';
import ScreenRotationIcon from '@mui/icons-material/ScreenRotation';
import ClearIcon from '@mui/icons-material/Clear';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

import DownloadIcon from '@mui/icons-material/Download';
import SignatureCanvas from 'react-signature-canvas';

import { useReactToPrint } from 'react-to-print';
import ComponentToPrint from './ComponentToPrint';

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

  const componentRef = useRef();

  const [open, setOpen] = useState(false);
  const [isSign, setSign] = useState({ trimmedDataURL: null });

  const onBeforeGetContentResolve = useRef(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('old boring text');
  const [isDoc, setDoc] = useState(false);
  const [isPreview, setPreview] = useState(true);

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

  const handleAfterPrint = useCallback(() => {
    console.log('`onAfterPrint` called'); // tslint:disable-line no-console\
    setPreview(true);
    setDoc(false);
  }, []);

  const handleBeforePrint = useCallback(() => {
    console.log('`onBeforePrint` called'); // tslint:disable-line no-console
  }, []);

  const handleOnBeforeGetContent = useCallback(() => {
    console.log('`onBeforeGetContent` called'); // tslint:disable-line no-console
    setLoading(true);
    setText('Loading new text...');
    setDoc(true);
    setPreview(false);

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        setLoading(false);
        setText('New, Updated Text!');
        resolve();
      }, 2000);
    });
  }, [setLoading, setText]);

  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: '',
    onBeforeGetContent: handleOnBeforeGetContent,
    onBeforePrint: handleBeforePrint,
    onAfterPrint: handleAfterPrint,
    removeAfterPrint: false
    // fonts
  });

  useEffect(() => {
    if (text === 'New, Updated Text!' && typeof onBeforeGetContentResolve.current === 'function') {
      onBeforeGetContentResolve.current();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onBeforeGetContentResolve.current, text]);

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
            justifyContent: 'center',
            width: '100%',
            maxWidth: '100%'
          }}
        >
          <MainCard
            sx={{
              boxShadow: '1px 2px 5px -1px rgb(0 0 0/64%) !important',
              borderColor: 'transparent',
              width: matchDownSM ? '100%' : '550px',
              overflowX: 'scroll',
              height: '50vh',
              overflowY: 'scroll'
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
                  <ComponentToPrint ref={componentRef} isPreview={isPreview}>
                    {!isDoc ? (
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'end',
                          flexDirection: 'column',
                          alignItems: 'center',
                          position: 'relative',
                          top: '-11%'
                        }}
                      >
                        <Box
                          sx={{
                            width: matchDownSM ? '77%' : '77%',
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
                            width: matchDownSM ? '77%' : '77%',
                            height: 'auto',
                            backgroundColor: 'white',
                            padding: '12px',
                            borderBottomLeftRadius: '5px',
                            borderBottomRightRadius: '5px',
                            borderRadius: '5px',
                            border: '1px solid black'
                          }}
                          alt="signature"
                          src={isSign?.trimmedDataURL}
                        />
                      </Box>
                    ) : (
                      <Avatar
                        sx={{
                          width: matchDownSM ? '77%' : '77%',
                          height: 'auto',
                          backgroundColor: 'white',
                          padding: '12px'
                        }}
                        alt="signature"
                        src={isSign?.trimmedDataURL}
                      />
                    )}
                  </ComponentToPrint>

                  <Button
                    variant="contained"
                    component="label"
                    type="submit"
                    endIcon={
                      loading ? <CircularProgress sx={{ color: 'white', position: 'relative', left: '10%' }} size={20} /> : <DownloadIcon />
                    }
                    sx={{ mt: 2 }}
                    onClick={() => {
                      handlePrint();
                    }}
                  >
                    {loading ? 'Loading...' : 'Download'}
                  </Button>
                </Stack>
              </>
            ) : (
              <>
                <Button
                  fullWidth
                  variant="contained"
                  component="label"
                  type="submit"
                  endIcon={<HistoryEduIcon />}
                  sx={{ mb: 2 }}
                  onClick={handleClickOpen}
                >
                  Signature
                </Button>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Avatar
                    sx={{
                      width: matchDownSM ? '77%' : '77%',
                      height: 'auto',
                      backgroundColor: 'white',
                      borderRadius: '1px',

                      '.MuiAvatar-img': {
                        border: ' 1px solid black',
                        borderRadius: '5px'
                      }
                    }}
                    alt="signature"
                    src={'assets/images/sign/prepdf1.png'}
                  />
                </Box>
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
