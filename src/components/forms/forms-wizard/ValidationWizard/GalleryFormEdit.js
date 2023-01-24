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

export default function GalleryForm({ imageProperty, setPaymentData, handleNext, handleBack, setErrorIndex }) {
  const [avatarPreview, setAvatarPreview] = useState('');
  const [avatarPreviewAlbum, setAvatarPreviewAlbum] = useState(null);

  const [imgE, setEImg] = useState();
  const [imgEAlbum, setEImgAlbum] = useState();
  const [message, setMessage] = useState('');
  const [messageAlbum, setMessageAlbum] = useState('');
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      file: '',
      size: ''
    },
    validationSchema,

    onSubmit: (values) => {
      if (values.size >= 2000000) {
        setMessage('File Size is too large');
      } else {
        setPaymentData({
          imgE: imgE,
          imgEAlbum: imgEAlbum
        });

        handleNext();
      }
    }
  });

  const preViewImageCover = (e) => {
    if (e.target?.files[0]?.size >= 2000000) {
      setMessage('File Size is too large');
    }
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        formik.setFieldValue('photo', e.target?.files[0]);
        formik.setFieldValue('size', e.target?.files[0]?.size);
        setAvatarPreview(fileReader.result);
        setEImg(e.target.files[0]);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const preViewImageAlbum = (e) => {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      const files = e.target.files;

      console.log('files', files);

      setEImgAlbum(files);

      const output = document.querySelector('#result');
      output.innerHTML = '';
      for (let i = 0; i < files.length; i++) {
        if (!files[i].type.match('image')) continue;
        const picReader = new FileReader();
        picReader.addEventListener('load', function (event) {
          const picFile = event.target;

          console.log('picFile', picFile);

          const div = document.createElement('div');
          div.innerHTML = ` <img style="width: 40vw;height: auto;"  src="${picFile.result}" title="${picFile.name}" /> `;

          output.appendChild(div);
        });
        picReader.readAsDataURL(files[i]);
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

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h5" gutterBottom>
                Cover Image
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
            {!avatarPreview ? (
              <div
                style={{
                  // border: `1px solid grey`,
                  boxShadow: 'inset 0 0 5px #000000',
                  borderRadius: '5px'
                }}
              >
                <TextField
                  // multiple
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

                <FormHelperText error>{message}</FormHelperText>
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
                Gallery Image
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

            <div
              style={{
                // border: `1px solid grey`,
                boxShadow: 'inset 0 0 5px #000000',
                borderRadius: '5px'
              }}
            >
              {/* <TextField
                  accept="image/jpeg, image/png, image/jpg"
                  inputProps={{ multiple: true }}
                  name="file"
                  type="file"
                  id="files"
                  fullWidth
                  label="Enter SKU"
                  sx={{ display: 'none' }}
                  onChange={(e) => {
                    preViewImageAlbum(e);
                  }}
                /> */}

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

              {/* {avatarPreviewAlbum && (
                <ImageWrapper>
                 
                </ImageWrapper>
              )} */}

              {/* <InputLabel
                  htmlFor="file-upload"
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
                  <CloudUploadIcon /> Click Here Or Drop file here to uploads
                </InputLabel> */}

              {/* <InputLabel htmlFor="photo">
                  <Input
                    accept="image/*"
                    id="photo"
                    type="file"
                    name="photo"
                    label="photo"
                    onChange={(e) => {
                      setFieldImgValue(e.target.files[0]);
                      preViewImage(e);
                    }}
                  />
                  <Button color="secondary" sx={{ color: 'white' }} variant="contained" component="span">
                    Upload Avatar
                  </Button>
                </InputLabel> */}

              <FormHelperText error>{messageAlbum}</FormHelperText>
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
