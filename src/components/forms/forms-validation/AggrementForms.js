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
import * as yup from 'yup';

// assets
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import CancelIcon from '@mui/icons-material/Cancel';
import ScreenRotationIcon from '@mui/icons-material/ScreenRotation';
import ClearIcon from '@mui/icons-material/Clear';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import DownloadIcon from '@mui/icons-material/Download';
import SignatureCanvas from 'react-signature-canvas';

import { useReactToPrint } from 'react-to-print';
import ComponentToPrint from './ComponentToPrint';
import { dispatch } from 'store';
import { getSlot } from 'store/slices/product';
import { getSlotData } from 'store/slices/product';
import moment from 'moment';

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
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [isSuccess, setSuccessMessage] = useState('');

  const [text, setText] = useState('old boring text');
  const [isDoc, setDoc] = useState(false);
  const [isPreview, setPreview] = useState(true);

  const handleSubmitAggrement = () => {
    setLoadingSubmit(true);
    setSubmit(true);
  };

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
    setSubmit(false);
    setSuccessMessage();
  };

  const handleAfterPrint = useCallback(() => {
    setPreview(true);
  }, []);

  const handleBeforePrint = useCallback(() => {}, []);

  const handleOnBeforeGetContent = useCallback(() => {
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
    removeAfterPrint: true,
    print: async (printIframe) => {
      const document = printIframe.contentDocument;

      var opt = {
        margin: 0.9,
        filename: 'Aggrement-OD.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      if (document) {
        const html = document.getElementsByTagName('html')[0];

        await html2pdf().set(opt).from(html).save();
      }
    }
  });

  useEffect(() => {
    if (text === 'New, Updated Text!' && typeof onBeforeGetContentResolve.current === 'function') {
      onBeforeGetContentResolve.current();
    }

    if (isSubmit) {
      setTimeout(() => {
        setLoadingSubmit(false);
        setSubmit(true);
        setSuccessMessage('UPLOAD');
        const aggrement = localStorage.setItem('aggrement', true);
        const investVal = localStorage.getItem('investVal');
        const resitUpload = localStorage.getItem('resitUpload');

        const todayDate = moment().format('DD MMM YYYY h:mma');
        const todayTime = moment().format('H');

        console.log('todayTime', todayTime);

        const dividenDate = moment(todayDate).add(14, 'months').format('DD MM YYYY');
        // const targetTime = moment(dividenDate).set({ hour: 13, minute: 0, second: 0, millisecond: 0 });

        const slot1 = {
          aggrement: true,
          investVal: investVal,
          resitUpload: resitUpload,
          created_date: todayDate,
          created_time: todayTime,
          dividenDate: dividenDate
        };

        dispatch(getSlotData(slot1));

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
      }, 3000);

      // await updateProfile(user?.user_name, formData)
      //   .then((res) => {
      //     setLoadingSubmit(false);
      //     setSubmit(false);
      //     setSuccessMessage('UPLOAD');
      //   })
      //   .catch((err) => {
      //     setLoadingSubmit(false);
      //     setMessage('Something when wrong, please try again');
      //     setSubmit(false);
      //   });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onBeforeGetContentResolve.current, text, isSubmit]);

  // console.log('isSubmit', isSubmit);
  // console.log('isSuccess', isSuccess);
  // console.log('isSign?.trimmedDataURL', isSign?.trimmedDataURL !== null);

  return (
    <>
      <Stack direction={'column'}>
        <Stack
          direction="row"
          sx={{
            gap: 2,
            justifyContent: 'space-between',
            mt: 2,

            justifyContent: 'space-around',
            marginTop: '6%',
            py: '5%',
            boxShadow: '1px 2px 5px -1px rgb(0 0 0 /64%)',
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px'
          }}
        >
          {isSign?.trimmedDataURL !== null ? (
            <>
              <AnimateButton>
                <Button
                  variant="contained"
                  component="label"
                  type="submit"
                  size="small"
                  endIcon={
                    loading ? <CircularProgress sx={{ color: 'white', position: 'relative', left: '10%' }} size={20} /> : <DownloadIcon />
                  }
                  onClick={() => {
                    handlePrint();
                  }}
                >
                  {loading ? 'LOADING...' : 'DOWNLOAD'}
                </Button>
              </AnimateButton>

              {isSuccess ? (
                <AnimateButton>
                  <Button
                    endIcon={<CheckCircleOutlineIcon />}
                    sx={{
                      '&.Mui-disabled': {
                        color: 'white',
                        backgroundColor: 'green',
                        opacity: 0.5
                      }
                    }}
                    variant="contained"
                    size="small"
                    disabled
                  >
                    {isSuccess}
                  </Button>
                </AnimateButton>
              ) : (
                <>
                  <AnimateButton>
                    <Button
                      variant="contained"
                      component="label"
                      type="submit"
                      size="small"
                      endIcon={loadingSubmit ? <CircularProgress size={15} sx={{ color: 'white' }} /> : <SendOutlinedIcon />}
                      onClick={() => {
                        handleSubmitAggrement();
                      }}
                    >
                      {loadingSubmit ? 'LOADING...' : 'SUBMIT'}
                    </Button>
                  </AnimateButton>
                </>
              )}
            </>
          ) : (
            <>
              <AnimateButton>
                <Button variant="contained" component="label" type="submit" endIcon={<HistoryEduIcon />} onClick={handleClickOpen}>
                  SIGNATURE
                </Button>
              </AnimateButton>
            </>
          )}
        </Stack>

        <Box
          sx={{
            pt: 0,
            pb: 4,
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          <MainCard
            sx={{
              boxShadow: '1px 2px 5px -1px rgb(0 0 0/64%) !important',
              borderColor: 'transparent',
              width: matchDownSM ? '100%' : '550px',
              overflowX: 'scroll',
              height: '25vh',
              overflowY: 'scroll',
              maxWidth: '100%',
              borderTopLeftRadius: '0px',
              borderTopRightRadius: '0px',
              position: 'relative',
              top: '-1px'
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
                    {!isSubmit ? (
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
                            width: matchDownSM ? '80px' : '50%',
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
                            width: matchDownSM ? '80px' : '77%',
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
                          width: matchDownSM ? '80px' : '77%',
                          height: 'auto',
                          backgroundColor: 'white',
                          padding: '12px'
                        }}
                        alt="signature"
                        src={isSign?.trimmedDataURL}
                      />
                    )}
                  </ComponentToPrint>
                </Stack>
              </>
            ) : (
              <>
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
              <Button
                disabled={isSuccess ? false : true}
                endIcon={<ArrowForwardIcon />}
                variant="contained"
                type="submit"
                onClick={handleNext}
              >
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
          {/* {window.innerHeight > window.innerWidth && (
            <Button
              fullWidth
              variant="text"
              component="label"
              color="secondary"
              endIcon={<ScreenRotationIcon />}
              sx={{ pb: 3, color: 'white', backgroundColor: 'black' }}
            >
              For best Signature,
              <br /> rotate your Mobile !
            </Button>
          )} */}

          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'end',
              justifyContent: matchDownSM ? 'end' : 'end',
              gap: '1%',
              pb: 3
            }}
          >
            <AnimateButton>
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
            </AnimateButton>
            <AnimateButton>
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
            </AnimateButton>
          </Stack>

          <SignatureCanvas ref={signRef} penColor="black" canvasProps={{ className: 'sigCanvas' }} backgroundColor="white" />
        </Box>
      </Dialog>
    </>
  );
};

export default AggrementForms;
