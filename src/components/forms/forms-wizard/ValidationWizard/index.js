import React, { useEffect } from 'react';

// material-ui
import { Button, Step, Stepper, StepLabel, Stack, Typography, FormHelperText, useMediaQuery } from '@mui/material';

// project imports
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import GalleryForm from './GalleryForm';
import Review from './Review';
import MainCard from 'components/ui-component/cards/MainCard';
import AnimateButton from 'components/ui-component/extended/AnimateButton';
import { Router, useRouter } from 'next/router';
import axiosInstance from 'contexts/axios';
import { setProduct, updateListingById } from 'contexts/ApiListing';
import slugify from 'utils/helper';
import useAuth from 'hooks/useAuth';
import Link from 'Link';
import { CircularProgress } from '@mui/material';
import { openSnackbar } from 'store/slices/snackbar';
import { useTheme } from '@mui/material/styles';
import { getProducts } from 'store/slices/product';
import { useDispatch } from 'react-redux';

// step options
const steps = ['Fill Up Detail', 'Upload Image', 'Review your Listing'];

const getStepContent = (
  step,
  handleNext,
  handleBack,
  setErrorIndex,
  shippingData,
  setShippingData,
  imageProperty,
  setPaymentData,
  editData,
  previewData,
  formFor
) => {
  switch (step) {
    case 0:
      return (
        <AddressForm
          editData={editData}
          handleNext={handleNext}
          setErrorIndex={setErrorIndex}
          shippingData={shippingData}
          setShippingData={setShippingData}
          formFor={formFor}
        />
      );
    case 1:
      return (
        <GalleryForm
          editData={editData}
          handleNext={handleNext}
          handleBack={handleBack}
          setErrorIndex={setErrorIndex}
          imageProperty={imageProperty}
          setPaymentData={setPaymentData}
          formFor={formFor}
        />
      );
    case 2:
      return (
        <Review editData={editData} shippingData={shippingData} imageProperty={imageProperty} previewData={previewData} formFor={formFor} />
      );
    default:
      throw new Error('Unknown step');
  }
};

// ==============================|| FORMS WIZARD - BASIC ||============================== //

const ValidationWizard = ({ updateProperty, formFor }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [shippingData, setShippingData] = React.useState({});
  const [imageProperty, setPaymentData] = React.useState({});
  const [previewData, setPreviewData] = React.useState();
  const [errorIndex, setErrorIndex] = React.useState(null);
  const [editData, setEditData] = React.useState(null);
  const [isApi, setApi] = React.useState(false);
  const dispatch = useDispatch();

  const theme = useTheme();

  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [lisitngId, setLisitngId] = React.useState(null);

  const [isLoading, setLoading] = React.useState(false);

  const [errorMessage, setErrorMessage] = React.useState('');

  const router = useRouter();

  const { user } = useAuth();

  const handleNext = () => {
    setErrorIndex(null);
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = () => {
    setApi(true);
    setLoading(true);
  };

  useEffect(() => {
    if (activeStep == 1 && imageProperty?.imgE != null && imageProperty?.imgEAlbum != null && previewData == null) {
      const featureImage = imageProperty?.imgE;
      const photo_1 = imageProperty?.imgEAlbum[0];
      const photo_2 = imageProperty?.imgEAlbum[1];
      const photo_3 = imageProperty?.imgEAlbum[2];
      const photo_4 = imageProperty?.imgEAlbum[3];
      const photo_5 = imageProperty?.imgEAlbum[4];

      const propertyObj = {
        featureImage: featureImage ? featureImage : '',
        photo_1: photo_1 ? photo_1 : '',
        photo_2: photo_2 ? photo_2 : '',
        photo_3: photo_3 ? photo_3 : '',
        photo_4: photo_4 ? photo_4 : '',
        photo_5: photo_5 ? photo_5 : '',
        realtor: user?.user,
        ...shippingData
      };

      if (formFor == 'UpdateListing') {
        const clean = (obj) => {
          if (editData?.featureImage == featureImage) {
            delete propertyObj['featureImage'];
          }

          for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
              delete obj[propName];
            }
          }
          return obj;
        };

        clean(propertyObj);

        setPreviewData(propertyObj);
      } else {
        setPreviewData(propertyObj);
      }
    }

    if (Boolean(isApi) == true && Boolean(isLoading) == true && activeStep == 2) {
      var form_data = new FormData();

      Object.keys(previewData).map(function (key, index) {
        form_data.append(key, previewData[key]);
      });

      if (formFor == 'CreateListing' && lisitngId == null) {
        setProduct(form_data)
          .then((res) => {
            const resJson1 = JSON.stringify(res);
            const resParse1 = JSON.parse(resJson1);

            if (res.status == 201 || res.status == 200) {
              setLisitngId(res?.data?.id);
              setLoading(false);
              setApi(false);
              handleNext();

              dispatch(
                openSnackbar({
                  open: true,
                  message: 'Your list has been successfully Created.',
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  },
                  close: false
                })
              );
              dispatch(getProducts(res?.data?.user_name));
            }

            if (resParse1.status == 400) {
              setErrorIndex(2);
              setLoading(false);
              setErrorMessage('something error, please check detail');
            }
          })
          .catch((err) => {
            setLoading(false);
            setErrorMessage('something error, please check detail');
          })
          .finally(() => {
            setLoading(false);
          });
      }

      if (formFor == 'UpdateListing' && updateProperty !== null) {
        updateListingById(updateProperty?.id, form_data).then((res) => {
          if (res?.status == 200) {
            setLisitngId(res?.data?.id);
            setLoading(false);
            setApi(false);
            handleNext();
            dispatch(
              openSnackbar({
                open: true,
                message: 'Your list has been successfully Updated.',
                variant: 'alert',
                alert: {
                  color: 'success'
                },
                close: false
              })
            );
            // dispatch(getProducts(res?.data?.user_name));
          } else {
            const resJson1 = JSON?.stringify(res);
            const resParse1 = JSON?.parse(resJson1);

            if (resParse1?.status == 400) {
              setErrorIndex(2);
              setLoading(false);
              setErrorMessage('something error');
            }
          }
        });
      }
    }

    if (updateProperty != undefined) {
      setEditData(updateProperty);
    }

    if (updateProperty == undefined) {
      setEditData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep, shippingData, imageProperty, user, updateProperty, editData, formFor, previewData, handleNext, handleBack]);

  return (
    <MainCard title={formFor == 'CreateListing' ? 'Cover Image' : formFor == 'UpdateListing' ? 'Update Listing' : null}>
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5, overflow: matchDownSM ? 'scroll' : 'unset' }}>
        {steps.map((label, index) => {
          const labelProps = {};

          if (index === errorIndex) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                Error
              </Typography>
            );

            labelProps.error = true;
          }

          return (
            <Step key={label}>
              <StepLabel
                sx={{
                  width: 'max-content',
                  '& .MuiStepIcon-text': {
                    fill: 'white'
                  }
                }}
                {...labelProps}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Thank you for your Submit
            </Typography>
            <Typography variant="subtitle1">Your Lisiting property is Live. Share to your waiting clients using this </Typography>

            <Link
              href={`/listing/${lisitngId}`}
              underline="always"
              // color="default"
              variant="h6"
              sx={{
                overflow: 'hidden',
                display: 'block',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                ':hover': { color: 'primary.main' },
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              LINK
            </Link>

            {formFor == 'CreateListing' && (
              <Stack direction="row" justifyContent="flex-end">
                <AnimateButton>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      router.push('/listing');
                    }}
                    sx={{ my: 3, ml: 1 }}
                  >
                    Listing
                  </Button>
                </AnimateButton>
              </Stack>
            )}
          </>
        ) : (
          <>
            {getStepContent(
              activeStep,
              handleNext,
              handleBack,
              setErrorIndex,
              shippingData,
              setShippingData,
              imageProperty,
              setPaymentData,
              editData,
              previewData,
              formFor
            )}

            {activeStep === steps.length - 1 && (
              <Stack direction="row" justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <AnimateButton>
                  <Button
                    variant="contained"
                    onClick={() => {
                      activeStep === steps?.length - 1 ? handleSubmit() : handleNext();
                    }}
                    sx={{ my: 3, ml: 1 }}
                  >
                    {activeStep === steps?.length - 1 ? 'Submit' : 'Next'}
                    {Boolean(isLoading) == true ? (
                      <CircularProgress sx={{ color: 'white', position: 'relative', left: '10%' }} size={20} />
                    ) : (
                      ''
                    )}
                  </Button>
                  <FormHelperText sx={{ pb: 1 }} error>
                    {errorMessage}
                  </FormHelperText>
                </AnimateButton>
              </Stack>
            )}
          </>
        )}
      </>
    </MainCard>
  );
};

export default ValidationWizard;
