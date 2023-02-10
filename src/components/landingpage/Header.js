// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Button, Container, Grid, Typography } from '@mui/material';

// third party
import { motion } from 'framer-motion';
import Link from 'Link';

// project imports
import Avatar from 'components/ui-component/extended/Avatar';
import AnimateButton from 'components/ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import ListIcon from '@mui/icons-material/List';
import LoginIcon from '@mui/icons-material/Login';
import useAuth from 'hooks/useAuth';

// styles
const HeaderImage = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  borderRadius: '20px',
  transform: 'scale(1.7)',
  transformOrigin: theme.direction === 'rtl' ? '100% 50%' : '0 50%',
  [theme.breakpoints.down('lg')]: {
    transform: 'scale(1.2)'
  }
}));

const HeaderAnimationImage = styled('img')({
  maxWidth: '100%',
  filter: 'drop-shadow(0px 0px 50px rgb(33 150 243 / 30%))'
});

// ==============================|| LANDING - HEADER PAGE ||============================== //

const HeaderPage = () => {
  const { user } = useAuth();

  return (
    <Container>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={gridSpacing}
        sx={{
          mt: { xs: 10, sm: 6, md: 18.75 },
          mb: { xs: 2.5, md: 10 }
        }}
      >
        <Grid item xs={12}>
          <Grid
            container
            spacing={gridSpacing}
            sx={{
              textAlign: 'center',
              justifyContent: 'center'
            }}
          >
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30
                }}
              >
                <Typography
                  variant="h6"
                  color="secondary"
                  sx={{
                    fontSize: { xs: '1.50rem', sm: '3rem', md: '4rem' },
                    fontWeight: 900,
                    lineHeight: 1.4
                  }}
                >
                  Welcome To<br></br>
                  <Box component="span" variant="h2" color="inherit" sx={{ ml: 2, color: 'white' }}>
                    ONE DREAM INVESTMENT CENTER
                  </Box>
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} lg={10}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.2
                }}
              >
                <Typography
                  variant="h4"
                  component="div"
                  color="white"
                  sx={{
                    fontSize: { xs: '1rem', md: '1.125rem' },
                    fontWeight: 400,
                    lineHeight: 1.4
                  }}
                >
                  {`Are you looking to grow your wealth and secure your financial future? Look no further than ODIC. Don't miss out on the opportunity to grow your wealth and secure your financial future. Sign up for ODIC today and start taking control of your investments.`}
                </Typography>
              </motion.div>
            </Grid>

            <Grid item xs={12} sx={{ my: 3.25 }}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.4
                }}
              >
                <Grid container spacing={2} sx={{ justifyContent: { xs: 'center', md: 'center' } }}>
                  <Grid item>
                    <AnimateButton>
                      <Button
                        sx={{ color: 'white' }}
                        component={Link}
                        href={user == null ? '/register' : '/board'}
                        size="large"
                        variant="contained"
                        color="secondary"
                        startIcon={user == null ? <LoginIcon /> : <ListIcon />}
                      >
                        {user == null ? 'SIGN UP NOW' : 'VIEW BOARD'}
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HeaderPage;
