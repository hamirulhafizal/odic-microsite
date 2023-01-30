import React, { useEffect, useState, useReducer } from 'react';

// material-ui
import { Avatar, Button, FormHelperText, Grid, InputLabel, Typography, Stack, Box, IconButton, Dialog, Slide } from '@mui/material';
import { styled } from '@mui/material/styles';
import useAuth from 'hooks/useAuth';
import AnimateButton from 'components/ui-component/extended/AnimateButton';
import accountReducer from 'store/accountReducer';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';

const Input = styled('input')({
  display: 'none'
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UploadResit = () => {
  const { updateProfile, user } = useAuth();
  const [photo, setFieldImgValue] = useState(undefined);
  const [message, setMessage] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [state, dispatch] = useReducer(accountReducer);

  const [open, setOpen] = useState(false);

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
        // const response = await updateProfile(user?.user_name, formData).then((res) => {});
      }
    }
    if (photo !== undefined) {
      putDataProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photo]);

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
          <Stack directiom="column">
            <Typography variant="subtitle2" align="center">
              Upload/Change Your Profile Image <br /> *Below 1MB
            </Typography>
            <FormHelperText sx={{ textAlign: 'center' }} error>
              {message}
            </FormHelperText>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <AnimateButton>
            <InputLabel htmlFor="photo">
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
              <Button fullWidth endIcon={<AttachFileIcon />} color="secondary" sx={{ color: 'white' }} variant="contained" component="span">
                Upload
              </Button>
            </InputLabel>
          </AnimateButton>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              position: 'relative',
              top: '-15%',
              width: 'fit-content'
            }}
          >
            {avatarPreview && (
              <>
                <ZoomInIcon
                  sx={{
                    position: 'relative',
                    top: '80px',
                    zIndex: 10,
                    color: 'white',
                    left: '3px'
                  }}
                />

                <IconButton
                  color="secondary"
                  sx={{ width: '0px', position: 'relative', top: '18px', zIndex: 1, left: '32px' }}
                  variant="contained"
                  size="small"
                  aria-label="delete"
                >
                  <CancelIcon
                    sx={{
                      backgroundColor: 'white',
                      borderRadius: '50%'
                    }}
                  />
                </IconButton>
                <Avatar
                  onClick={handleClickOpen}
                  alt={user?.nickname}
                  src={avatarPreview}
                  sx={{
                    width: 62,
                    height: 62,
                    borderRadius: '5%',
                    filter: 'brightness(0.5)'
                  }}
                />
              </>
            )}
          </Box>
        </Grid>
      </Grid>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <IconButton
          color="secondary"
          sx={{ position: 'relative' }}
          variant="contained"
          size="small"
          aria-label="delete"
          onClick={handleClose}
        >
          <CancelIcon
            sx={{
              backgroundColor: 'white',
              borderRadius: '50%'
            }}
          />
        </IconButton>
        <img
          src={avatarPreview}
          style={{
            height: 'max-content',
            width: '100%',
            position: 'relative',
            top: '1%'
          }}
        ></img>
      </Dialog>
    </>
  );
};

export default UploadResit;
