import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import { useDispatch } from 'store';
import CircularProgress from '@mui/material/CircularProgress';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'components/ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { openSnackbar } from 'store/slices/snackbar';

// ========================|| FIREBASE - FORGOT PASSWORD ||======================== //

const AuthForgotPassword = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);

  const { resetPassword } = useAuth();

  return (
    <Formik
      initialValues={{
        username: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string('Must be a valid username').max(255).required('Username is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        setLoading(true);
        try {
          resetPassword(values?.username)
            .then((res) => {
              setLoading(false);
              if (res?.detail == 'Not found.') {
                setStatus({ success: false });
                setErrors({ submit: 'Username not valid' });
                setSubmitting(false);
              }

              if (res?.status == 200) {
                setStatus({ success: true });
                setSubmitting(true);
                dispatch(
                  openSnackbar({
                    open: true,
                    message: `Check email ${res?.data?.email} for reset password link`,
                    variant: 'alert',
                    alert: {
                      color: 'success'
                    },
                    close: false
                  })
                );
              }
            })
            .catch((err) => {
              setLoading(false);
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            });
        } catch (err) {
          console.error(err);
          if (scriptedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }
      }}
    >
      {({ status, errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-email-forgot">Username</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email-forgot"
              type="text"
              value={values.username}
              name="username"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Username"
              inputProps={{}}
            />
            {touched.username && errors.username && (
              <FormHelperText error id="standard-weight-helper-text-email-forgot">
                {errors.username}
              </FormHelperText>
            )}
          </FormControl>

          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}

          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button
                disableElevation
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color={`${status?.success ? 'success' : 'secondary'}`}
              >
                {!isLoading ? 'Send Mail' : <CircularProgress size={30} sx={{ color: 'white' }} />}
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default AuthForgotPassword;
