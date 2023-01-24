import React, { useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  CircularProgress
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'components/ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useRouter } from 'next/router';
import { useDispatch } from 'store';

import { openSnackbar } from 'store/slices/snackbar';

// ========================|| FIREBASE - RESET PASSWORD ||======================== //

const AuthResetPassword = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const [showPassword, setShowPassword] = React.useState(false);
  const [strength, setStrength] = React.useState(0);
  const [level, setLevel] = React.useState();
  const [isLoading, setLoading] = React.useState(false);

  const { setPassword } = useAuth();
  const dispatch = useDispatch();

  const router = useRouter();
  const { tem, user } = router?.query;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const tempInd = strengthIndicator(value);
    setStrength(tempInd);
    setLevel(strengthColor(tempInd));
  };

  useEffect(() => {
    changePassword('123456');
  }, []);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        password: Yup.string().max(255).required('Password is required'),
        confirmPassword: Yup.string().when('password', {
          is: (val) => !!(val && val.length > 0),
          then: Yup.string().oneOf([Yup.ref('password')], 'Both Password must be match!')
        })
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          setLoading(true);
          setPassword(user, tem, values?.password)
            .then((res) => {
              console.log('res-->', res);
              if (res?.status == 201) {
                setLoading(false);

                dispatch(
                  openSnackbar({
                    open: true,
                    message: ` New password created`,
                    variant: 'alert',
                    alert: {
                      color: 'success'
                    },
                    close: false
                  })
                );
              }
              if (res == 'Wrong Services') {
                setLoading(false);
                setErrors({ submit: 'Invalid link' });
              }
            })
            .catch((err) => {
              // console.log('err', err);
            });

          if (scriptedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
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
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-password-reset">Password</InputLabel>
            <OutlinedInput
              autoComplete=""
              id="outlined-adornment-password-reset"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              name="password"
              onBlur={handleBlur}
              onChange={(e) => {
                handleChange(e);
                changePassword(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              inputProps={{}}
            />
          </FormControl>
          {touched.password && errors.password && (
            <FormControl fullWidth>
              <FormHelperText error id="standard-weight-helper-text-reset">
                {errors.password}
              </FormHelperText>
            </FormControl>
          )}
          {strength !== 0 && (
            <FormControl fullWidth>
              <Box sx={{ mb: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Box
                      style={{ backgroundColor: level.color }}
                      sx={{
                        width: 85,
                        height: 8,
                        borderRadius: '7px'
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography color={theme.palette.secondary.main} variant="subtitle1" fontSize="0.75rem">
                      {level.label}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </FormControl>
          )}

          <FormControl
            fullWidth
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
            <OutlinedInput
              autoComplete=""
              id="outlined-adornment-confirm-password"
              type="password"
              value={values.confirmPassword}
              name="confirmPassword"
              label="Confirm Password"
              onBlur={handleBlur}
              onChange={handleChange}
              inputProps={{}}
            />
          </FormControl>

          {touched.confirmPassword && errors.confirmPassword && (
            <FormControl fullWidth>
              <FormHelperText error id="standard-weight-helper-text-confirm-password">
                {' '}
                {errors.confirmPassword}{' '}
              </FormHelperText>
            </FormControl>
          )}

          {errors.submit && (
            <Box
              sx={{
                mt: 3
              }}
            >
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}
          <Box
            sx={{
              mt: 1
            }}
          >
            <AnimateButton>
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                {isLoading ? <CircularProgress sx={{ color: 'white' }} size={20} /> : '  Reset Password'}
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default AuthResetPassword;
