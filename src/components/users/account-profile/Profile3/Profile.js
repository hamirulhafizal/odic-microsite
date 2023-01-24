import { useState } from 'react';

// material-ui
import { Box, Grid, Stack, Button, TextField, useMediaQuery, FormHelperText, CircularProgress, TextareaAutosize } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import useAuth from 'hooks/useAuth';
import SubCard from 'components/ui-component/cards/SubCard';
import AnimateButton from 'components/ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import { Form, Formik } from 'formik';
import { openSnackbar } from 'store/slices/snackbar';

// third party
import * as Yup from 'yup';

// hook
import useScriptRef from 'hooks/useScriptRef';
import { useDispatch } from 'store';
import UploadUserInput from './UploadUserInput';

// assets
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// ==============================|| PROFILE 3 - PROFILE ||============================== //

const Profile = ({ ...others }) => {
  const { updateProfile, user } = useAuth();

  const theme = useTheme();
  const scriptedRef = useScriptRef();

  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Formik
      enableReinitialize={Boolean(true)}
      initialValues={{
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        description:
          user?.description ||
          `Nama saya ${user?.firstName} ${user?.lastName}.
          Saya merupakan agent sah aktif One Dream Property.
          Saya sudah bantu lebih 500 orang pembeli dan pelabur hartanah.
          Ingin saya bantu anda? Hubungi saya untuk bimbingan.`,
        facebook: user?.facebook || '',
        instagram: user?.instagram || '',
        youtube: user?.youtube || '',
        linkedin: user?.linkedin || '',
        tiktok: user?.tiktok || '',
        twitter: user?.twitter || ''
      }}
      validator={() => ({})}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().max(255).required(),
        lastName: Yup.string().max(255).required(),
        phone: Yup.number().min(15).required()
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        if (!values.firstName) {
          setErrors({ firstName: 'Required' });
        } else if (!values.lastName) {
          setErrors({ lastName: 'Required' });
        }

        setLoading(true);

        /* Then create a new FormData obj */
        const formData = new FormData();
        /* append input field values to formData */
        Object.keys(values).forEach((value) => {
          formData.append(value, values[value]);
        });

        try {
          await updateProfile(user?.user_name, formData).then((res) => {
            // if (scriptedRef.current) {
            setLoading(false);
            setStatus({ success: true, msg: 'success' });
            setSubmitting(false);
            dispatch(
              openSnackbar({
                open: true,
                message: 'Your Profile has been successfully Updated.',
                variant: 'alert',
                alert: {
                  color: 'success'
                },
                close: false
              })
            );
          });
        } catch (err) {
          if (scriptedRef.current === false) {
            setLoading(false);
            setStatus({ success: false, msg: 'fail' });
            if (err.password[0] !== null) {
              setErrors({ submit: 'try stronger password' });
            }
            if (err.email[0] !== null) {
              setErrors({ submit: 'email must be unique' });
            }
            setSubmitting(false);
          }
        }
        setLoading(false);
      }}
    >
      {({ errors, touched, status, handleBlur, handleChange, handleSubmit, values }) => (
        <>
          <Form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} md={4}>
                <SubCard title="Profile Picture" contentSX={{ textAlign: 'center' }}>
                  <UploadUserInput />
                </SubCard>
              </Grid>
              <Grid item sm={6} md={8}>
                <SubCard title="Edit Account Details">
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        required
                        fullWidth
                        inputProps={{ style: { textTransform: 'capitalize' } }}
                        label="First Name"
                        id="outlined-basic1"
                        name="firstName"
                        type="text"
                        value={values.firstName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(errors.firstName && touched.firstName)}
                        helperText={errors.firstName && touched.firstName && String(errors.firstName)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        required
                        fullWidth
                        inputProps={{ style: { textTransform: 'capitalize' } }}
                        id="outlined-basic6"
                        label="Last Name"
                        name="lastName"
                        type="text"
                        value={values.lastName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(errors.lastName && touched.lastName)}
                        helperText={errors.lastName && touched.lastName && String(errors.lastName)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        id="outlined-basic4"
                        label="Phone number"
                        name="phone"
                        type="tel"
                        required
                        placeholder="012345678"
                        value={values.phone}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        // focused
                        error={user?.phone ? false : true}
                        sx={{
                          '& .MuiFormHelperText-root ': {
                            color: 'red'
                          }
                        }}
                        helperText={errors.phone && touched.phone && String(errors.phone)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField fullWidth disabled type="email" value={values.email} name="email" id="filled-disabled" label="Email" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextareaAutosize
                        rows={6}
                        fullWidth
                        id="outlined-basic4"
                        label="Bio"
                        name="description"
                        type="text"
                        value={values.description}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        style={{
                          borderRadius: '8px',
                          width: '-webkit-fill-available',
                          borderRadius: '8px',
                          borderColor: '#afafaf',
                          padding: matchDownSM ? '5%' : '2%',
                          fontFamily: 'inherit',
                          overflow: 'unset'
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Grid container alignItems="center" spacing={gridSpacing} sx={{ mb: 1.25 }}>
                        <Grid item>
                          <FacebookIcon />
                        </Grid>
                        <Grid item xs zeroMinWidth>
                          <TextField
                            fullWidth
                            id="outlined-basic4"
                            label="Facebook Profile Url"
                            name="facebook"
                            type="text"
                            value={values.facebook}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container alignItems="center" spacing={gridSpacing} sx={{ mb: 1.25 }}>
                        <Grid item>
                          <InstagramIcon />
                        </Grid>
                        <Grid item xs zeroMinWidth>
                          <TextField
                            fullWidth
                            id="outlined-basic4"
                            label="Instagram Profile Url"
                            name="instagram"
                            type="text"
                            value={values.instagram}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container alignItems="center" spacing={gridSpacing} sx={{ mb: 1.25 }}>
                        <Grid item>
                          <YouTubeIcon />
                        </Grid>
                        <Grid item xs zeroMinWidth>
                          <TextField
                            fullWidth
                            id="outlined-basic4"
                            label="Youtube Profile Url"
                            name="youtube"
                            type="text"
                            value={values.youtube}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container alignItems="center" spacing={gridSpacing} sx={{ mb: 1.25 }}>
                        <Grid item>
                          <LinkedInIcon />
                        </Grid>
                        <Grid item xs zeroMinWidth>
                          <TextField
                            fullWidth
                            id="outlined-basic4"
                            label="Linkedin Profile Url"
                            name="linkedin"
                            type="text"
                            value={values.linkedin}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Grid container alignItems="center" spacing={gridSpacing} sx={{ mb: 1.25 }}>
                        <Grid item>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-tiktok"
                            viewBox="0 0 16 16"
                          >
                            <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z" />
                          </svg>
                        </Grid>
                        <Grid item xs zeroMinWidth>
                          <TextField
                            fullWidth
                            id="outlined-basic4"
                            label="Tiktok Profile Url"
                            name="tiktok"
                            type="text"
                            value={values.tiktok}
                            sx={{ pl: 1 }}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Stack direction="row">
                        <AnimateButton>
                          <Button type="submit" variant="contained" color="secondary" sx={{ color: 'white' }}>
                            {isLoading ? <CircularProgress sx={{ color: 'white' }} size={20} /> : 'Save Details'}
                          </Button>
                        </AnimateButton>
                      </Stack>

                      <Box sx={{ mt: 3 }}>
                        <FormHelperText sx={{ color: 'green' }}>{status?.success && `${status?.msg}`}</FormHelperText>
                      </Box>
                    </Grid>
                  </Grid>
                </SubCard>
              </Grid>
            </Grid>
          </Form>
        </>
      )}
    </Formik>
  );
};

Profile.Layout = 'authGuard';
export default Profile;
