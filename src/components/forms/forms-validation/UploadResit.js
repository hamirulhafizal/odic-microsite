import React, { useEffect, useState } from 'react';

// material-ui
import {
  Avatar,
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  Typography,
  Stack,
  Box,
  IconButton,
  Dialog,
  Slide,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import useAuth from 'hooks/useAuth';
import AnimateButton from 'components/ui-component/extended/AnimateButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CancelIcon from '@mui/icons-material/Cancel';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Input = styled('input')({
  display: 'none'
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UploadResit = ({ handlePreviewImg }) => {
  const { updateProfile, user } = useAuth();
  const [photo, setFieldImgValue] = useState(undefined);
  const [message, setMessage] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [isSuccess, setSuccessMessage] = useState();

  const [open, setOpen] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [isLoading, setLoding] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function putDataProfile() {
      if (photo.size >= 2000000) {
        setMessage('File Size is too large, below 1MB');
      } else {
        setMessage('');
        const formData = new FormData();
        formData.append('photo', photo);

        if (isSubmit) {
          await updateProfile(user?.user_name, formData)
            .then((res) => {
              setLoding(false);
              setFieldImgValue(undefined);
              setAvatarPreview('');
              handlePreviewImg(true);
              setSubmit(false);
              setSuccessMessage('UPLOAD');
            })
            .catch((err) => {
              setMessage('Something when wrong, please try again');
              setLoding(false);
              setFieldImgValue(undefined);
              setAvatarPreview('');
              handlePreviewImg(false);
              setSubmit(false);
            });
        }
      }
    }
    if (photo !== undefined) {
      putDataProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photo, isSubmit]);

  const preViewImage = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        setAvatarPreview(fileReader.result);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {!avatarPreview && isSuccess == null && (
            <Typography variant="subtitle2" align="left" sx={{ pt: 2 }}>
              *Upload image below 1MB
            </Typography>
          )}
          <InputLabel htmlFor="photo">
            {!avatarPreview && isSuccess == null && (
              <>
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
                <AnimateButton>
                  <Button
                    endIcon={<AttachFileIcon />}
                    color="secondary"
                    sx={{ color: 'white' }}
                    variant="contained"
                    size="small"
                    component="span"
                  >
                    Upload
                  </Button>
                </AnimateButton>
              </>
            )}

            <Stack directiom="column">
              <FormHelperText sx={{ textAlign: 'center' }} error>
                {photo !== undefined && message}
              </FormHelperText>

              {isSuccess && (
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
                    size="medium"
                    disabled
                  >
                    {isSuccess}
                  </Button>
                </AnimateButton>
              )}
            </Stack>
          </InputLabel>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            pt: '0px !important'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              position: 'relative',
              width: 'fit-content'
            }}
          >
            {avatarPreview && (
              <>
                <IconButton
                  color="secondary"
                  variant="contained"
                  size="small"
                  aria-label="delete"
                  onClick={handleClickOpen}
                  sx={{
                    position: 'relative',
                    top: '18px',
                    zIndex: 1,
                    width: '100px',
                    height: '100px',
                    backgroundSize: 'contain',
                    borderRadius: '0px',
                    backgroundImage: `url(${avatarPreview})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundColor: 'black',
                    backgroundPosition: 'center',
                    '&:hover': {
                      backgroundColor: 'black'
                    }
                  }}
                >
                  <ZoomInIcon
                    onClick={handleClickOpen}
                    sx={{
                      p: 1,
                      position: 'relative',
                      backgroundColor: 'black',
                      borderRadius: '50px',
                      zIndex: 10,
                      color: 'white',
                      left: '3px',
                      width: '35px',
                      height: '35px',
                      opacity: '0.5'
                    }}
                  />
                </IconButton>

                <CancelIcon
                  onClick={(e) => {
                    setFieldImgValue(undefined);
                    setAvatarPreview('');
                    handlePreviewImg(false);
                  }}
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    position: 'relative',
                    zIndex: 1,
                    top: '-91px',
                    left: '48px',
                    color: 'red'
                  }}
                />
              </>
            )}
          </Box>

          {avatarPreview && (
            <Button
              onClick={() => {
                setSubmit(true);
                setLoding(true);
              }}
              fullwidth
              endIcon={isLoading ? <CircularProgress size={15} sx={{ color: 'white' }} /> : <SendOutlinedIcon />}
              color="secondary"
              sx={{ color: 'white' }}
              variant="contained"
              component="span"
            >
              {isLoading ? 'LOADING...' : 'SUBMIT'}
            </Button>
          )}
        </Grid>
      </Grid>

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
        <Avatar
          src={avatarPreview}
          style={{
            height: 'max-content',
            width: '100%',
            position: 'relative',
            top: '1%',
            borderRadius: '0px',
            backgroundColor: 'black'
          }}
        />
      </Dialog>
    </>
  );
};

export default UploadResit;
