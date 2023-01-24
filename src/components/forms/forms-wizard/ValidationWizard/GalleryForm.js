import PropTypes from 'prop-types';

// material-ui
import { Button, Grid, Input, Stack, Typography, CardMedia, Divider, InputLabel, TextField, FormHelperText } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// project imports
import AnimateButton from 'components/ui-component/extended/AnimateButton';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';

import { useTheme, styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import imageCompression from 'browser-image-compression';
const example = 'assets/images/e-commerce/landscape2.jpeg';

const validationSchema = yup.object({
  // size: yup.mixed().test(200000, 'File Size is too large', (values) => values?.size <= 2000000)
});

// styles
const ImageWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '4px',
  cursor: 'pointer',
  width: '100%',
  height: '350px',
  objectFit: 'contain',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // borderRadius: '20px',
  // border: `1px solid grey`,
  boxShadow: 'inset 0 0 5px #000000',
  background: 'grey',
  '& > svg': {
    verticalAlign: 'sub',
    marginRight: 6
  }
}));

// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

export default function GalleryForm({ imageProperty, setPaymentData, handleNext, handleBack, setErrorIndex, formFor, editData }) {
  const [avatarPreview, setAvatarPreview] = useState('');
  const [avatarPreviewAlbum, setAvatarPreviewAlbum] = useState(null);

  const [imgE, setEImg] = useState();
  const [imgEAlbum, setEImgAlbum] = useState();
  const [message, setMessage] = useState('');
  const [messageAlbum, setMessageAlbum] = useState('');
  const theme = useTheme();

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  };

  const resizeFile = async (file) =>
    await imageCompression(file, options).then((compressedBlob) => {
      compressedBlob.lastModifiedDate = new Date();

      const convertedBlobFile = new File([compressedBlob], file.name, {
        type: file.type,
        lastModified: Date.now()
      });

      return convertedBlobFile;
    });

  const formik = useFormik({
    initialValues: {
      file: '',
      size: ''
    },
    validationSchema,

    onSubmit: (values) => {
      if (values.size >= 2000000) {
        setMessage('File size is too large');
      } else {
        if (formFor == 'CreateListing' && imgE !== undefined && imgEAlbum !== undefined) {
          setPaymentData({
            imgE: imgE,
            imgEAlbum: imgEAlbum
          });

          handleNext();
        } else if (formFor == 'UpdateListing' && (imgE !== null || imgEAlbum !== null)) {
          setPaymentData({
            imgE: imgE,
            imgEAlbum: imgEAlbum
          });

          handleNext();
        } else {
          setErrorIndex(1);
        }
      }
    }
  });

  const preViewImageCover = async (e) => {
    const image = await resizeFile(e.target.files[0]);

    if (image?.size >= 1000000) {
      setMessage('File Size is too largess');
    } else {
      setMessage('');
      setEImg(image);
      const fileReader = new FileReader();

      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          formik.setFieldValue('photo', image);
          formik.setFieldValue('size', image?.size);
          setAvatarPreview(fileReader.result);
        }
      };
      fileReader.readAsDataURL(image);
    }
  };

  const preViewImageAlbum = async (e) => {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      const files = e.target.files;

      // setEImgAlbum(files);

      const output = document.querySelector('#result');
      output.innerHTML = '';
      var totalSize = [];

      var dropTotal = 0;

      for (let i = 0; i < files.length; i++) {
        const album = await resizeFile(files[i]);

        totalSize.push(album);

        if (!files[i].type.match('image')) continue;
        const picReader = new FileReader();
        picReader.addEventListener('load', function (event) {
          const picFile = event.target;

          const div = document.createElement('div');
          div.innerHTML = ` <img style="width: 40vw;height: auto;"  src="${picFile.result}" title="${picFile.name}" /> `;

          output.appendChild(div);
        });

        picReader.readAsDataURL(album);
      }
      totalSize.forEach((element) => {
        dropTotal += element.size;
      });

      if (dropTotal >= 2000000) {
        setMessageAlbum('Total image size is too large, please upload total image below 1MB');
      } else {
        setMessageAlbum('');
        setEImgAlbum(totalSize);
      }
    } else {
      alert('Your browser does not support File API');
    }
  };

  const deleteImgPreview = () => {
    formik.setFieldValue('photo', null);
    formik.setFieldValue('size', null);
    setAvatarPreview(null);
    setEImg(null);
  };

  const deleteImgPreviewAlbum = () => {
    formik.setFieldValue('photo', null);
    formik.setFieldValue('size', null);
    setAvatarPreviewAlbum(null);
    setEImg(null);
  };

  useEffect(() => {
    if (formFor == 'UpdateListing') {
      setEImg(editData?.featureImage);
      setEImgAlbum(editData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h5" gutterBottom>
                Cover Image <br /> *below 1MB
              </Typography>
              {avatarPreview && (
                <AnimateButton>
                  <Button color="error" sx={{ color: 'white' }} variant="contained" onClick={deleteImgPreview}>
                    Delete
                  </Button>
                </AnimateButton>
              )}
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <FormHelperText error>{message}</FormHelperText>
            {!avatarPreview ? (
              <div
                style={{
                  boxShadow: 'inset 0 0 5px #000000',
                  borderRadius: '5px'
                }}
              >
                <TextField
                  inputProps={{
                    accept: 'image/jpeg, image/png, image/jpg'
                  }}
                  name="photo"
                  type="file"
                  id="photo"
                  fullWidth
                  label="Enter SKU"
                  sx={{ display: 'none' }}
                  onChange={(e) => {
                    preViewImageCover(e);
                  }}
                />

                <InputLabel
                  htmlFor="photo"
                  sx={{
                    py: 3.75,
                    px: 3,
                    textAlign: 'center',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    '& > svg': {
                      verticalAlign: 'sub',
                      mr: 0.5
                    }
                  }}
                >
                  <CloudUploadIcon /> Click Here Or Drop file here to upload
                </InputLabel>
              </div>
            ) : (
              <ImageWrapper>
                <CardMedia component="img" image={avatarPreview} title="Product" />
              </ImageWrapper>
            )}
          </Grid>

          <Divider variant="middle" sx={{ width: '100%', p: 3 }} />

          <Grid item xs={12} md={12}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h5" gutterBottom>
                Gallery Image <br /> *Total image below 1MB <br /> *max 5 Image
              </Typography>
              {avatarPreviewAlbum && (
                <AnimateButton>
                  <Button color="error" sx={{ color: 'white' }} variant="contained" onClick={deleteImgPreviewAlbum}>
                    Delete
                  </Button>
                </AnimateButton>
              )}
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ pb: '5%' }}>
              <input
                onChange={(e) => {
                  preViewImageAlbum(e);
                }}
                id="files"
                type="file"
                multiple="multiple"
                accept="image/jpeg, image/png, image/jpg"
              />
            </Box>

            <FormHelperText error>{messageAlbum}</FormHelperText>

            <div
              style={{
                boxShadow: 'inset 0 0 5px #000000',
                borderRadius: '5px'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  flexWrap: 'wrap',
                  padding: '5%'
                }}
              >
                <output id="result" />
              </Box>
            </div>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between">
              <Button onClick={handleBack} sx={{ my: 3, ml: 1, color: 'black' }}>
                Back
              </Button>
              <AnimateButton>
                <Button variant="contained" type="submit" sx={{ my: 3, ml: 1 }} onClick={() => setErrorIndex(1)}>
                  Next
                </Button>
              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

GalleryForm.propTypes = {
  setPaymentData: PropTypes.func,
  handleNext: PropTypes.func,
  handleBack: PropTypes.func,
  setErrorIndex: PropTypes.func
};
