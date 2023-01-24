// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Button, Container, Grid, Typography } from '@mui/material';

// third party
import { motion } from 'framer-motion';
import Link from 'Link';
// project imports
// project imports
import Avatar from 'components/ui-component/extended/Avatar';
import AnimateButton from 'components/ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import MailerSubscriber from 'components/maintenance/ComingSoon/ComingSoon1/MailerSubscriber';

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

const Suscribe1 = () => {
  const theme = useTheme();

  const parse = localStorage.getItem('agent');
  const agent = JSON.parse(parse);
  return (
    <Container>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={gridSpacing}
        sx={{
          mt: { xs: 5, sm: 3, md: 10 },
          mb: { xs: 2.5, md: 10 }
        }}
      >
        <Grid item xs={12}>
          <Grid
            container
            spacing={gridSpacing}
            sx={{
              textAlign: 'center'
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
                  variant="h1"
                  color="secondary"
                  sx={{
                    fontWeight: 900,
                    lineHeight: 1.4,
                    textTransform: 'capitalize'
                  }}
                >
                  Need Help
                  <Box component="span" variant="h5" color="inherit" sx={{ ml: 2, color: 'white' }}>
                    from {agent?.firstName} {agent?.lastName}
                    {!agent?.firstName && (
                      <>
                        <br />
                        One Dream Property
                      </>
                    )}{' '}
                    ?
                  </Box>
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12}>
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
                    // fontSize: { xs: '1rem', md: '1.125rem' },
                    fontWeight: 400,
                    lineHeight: 1.4
                  }}
                >
                  Let Us manage your Property in better way.{' '}
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
                    <MailerSubscriber />
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

export default Suscribe1;
