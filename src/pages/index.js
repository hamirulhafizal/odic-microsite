// material-ui
import { styled } from '@mui/material/styles';

// project imports
import Header from 'components/landingpage/Header';
import Footer from 'components/landingpage/Footer';
import AppBar from 'components/ui-component/extended/AppBar';
import Suscribe1 from 'components/landingpage/Suscribe1';
import ReviewCard from 'components/ui-component/cards/ReviewCard';

// third party

import { Card, CardContent, Container, Grid, Typography, Stack, Paper, Box, useMediaQuery } from '@mui/material';
import { gridSpacing } from 'store/constant';
import SubCard from 'components/ui-component/cards/SubCard';
import { useTheme } from '@mui/system';
import { motion } from 'framer-motion';

// assets
const images1 = '/assets/images/landing/living-room-with-yellow.png';
const images2 = '/assets/images/landing/footerBg-1.png';
const images3 = '/assets/images/landing/ladningbg1.png';
const images4 = '/assets/images/landing/ladningbg2.png';

const HeaderWrapper = styled('div')(({ theme }) => ({
  paddingTop: 30,
  overflowX: 'hidden',
  overflowY: 'clip',

  backgroundImage: `url(${images1})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'bottom',

  [theme.breakpoints.down('md')]: {
    paddingTop: 42
  }
}));

const SecondWrapper = styled('div')(({ theme }) => ({
  backgroundImage: `url(${images2})`,
  backgroundSize: 'cover',
  paddingTop: 10,
  [theme.breakpoints.down('md')]: {
    paddingTop: 42
  }
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

// =============================|| LANDING MAIN ||============================= //

const Landing = () => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <HeaderWrapper id="home">
        <AppBar />
        <Header />
      </HeaderWrapper>

      <Container>
        <Card
          sx={{
            backgroundImage: `url(${images3})`,
            backgroundPosition: 'bottom',
            mx: 3,
            mt: 4
          }}
        >
          <CardContent>
            <Grid
              spacing={gridSpacing}
              container
              sx={{
                justifyContent: 'space-between',
                my: 4
              }}
            >
              <Grid lg={12} md={12} sm={12} xs={12} sx={{ ml: 2 }} item>
                <motion.div
                  initial={{ opacity: 0, translateY: 550 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 30
                  }}
                >
                  <Typography sx={{ pt: 2, color: 'white' }} variant="h2">
                    Who Are We
                  </Typography>
                  <Stack sx={{ mr: matchDownLG ? '0%' : '50%' }}>
                    <Typography sx={{ py: 2, color: 'white', textAlign: 'justify' }} variant="body1">
                      <b>ONE LEGACY REALTY SDN BHD E(1) 2004</b> is a registered Real Estate Agents (REA) with Board of Valuers, Appraisers,
                      Estate Agents and Property Managers (BOVAEA). Our agency was incorporated on APRIL 2018 and which is located at Johor
                      Bahru city centre.
                      <br />
                      <br />
                      We have all 3 branches which is include our HQ office located at Taman Damansara Aliff, Taman Adda Height and our
                      Training Centre at Taman Molek.
                      <br />
                      <br />
                      Our best achievement throughout establishment, we have managed to help almost more than 2000 client in property field
                      include buy, sell & rent property.
                    </Typography>
                  </Stack>

                  {/* <AnimateButton>
                    <Button sx={{ color: 'white' }} component={Link} href="/dashboard/" size="large" variant="contained" color="secondary">
                      Read More
                    </Button>
                  </AnimateButton> */}
                </motion.div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>

      <Container>
        <Card>
          <CardContent sx={{ py: 5 }}>
            <Grid
              container
              spacing={gridSpacing}
              sx={{
                justifyContent: 'space-between',
                flexDirection: matchDownLG ? 'column-reverse' : 'row'
              }}
            >
              <Grid lg={4} md={4} sm={12} xs={12} item>
                <Box
                  sx={{
                    p: 2,
                    alignItems: 'center',
                    backgroundColor: '#ededed',
                    height: ' 100%',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(0, 0, 0, 0.45)',
                    backdropFilter: 'blur(25px)',
                    WebkitBackdropFilter: 'blur(25px)',
                    boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'
                  }}
                >
                  <Typography sx={{ ml: 2, py: 2, color: 'white' }} variant="h4">
                    Recent reviews
                  </Typography>
                  <motion.div
                    initial={{ opacity: 0, translateY: 550 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 150,
                      damping: 30
                    }}
                  >
                    <ReviewCard />
                  </motion.div>
                </Box>
              </Grid>

              <Grid lg={7} md={7} sm={12} xs={12} item>
                <Box
                  sx={{
                    p: 2,
                    alignItems: 'center',
                    backgroundColor: '#ededed',
                    height: ' 100%',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(0, 0, 0, 0.45)',
                    backdropFilter: 'blur(25px)',
                    WebkitBackdropFilter: 'blur(25px)',
                    boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'
                  }}
                >
                  <Typography sx={{ ml: 2, py: 2, color: 'white' }} variant="h2">
                    Why join us ?
                  </Typography>

                  <Grid container justifyContent="center" spacing={gridSpacing}>
                    <Grid item lg={6} md={6} xs={12} sm={6}>
                      <motion.div>
                        <SubCard sx={{ borderRadius: 'none' }}>
                          <Grid container alignItems="center" spacing={2}>
                            <Grid item xs zeroMinWidth>
                              <Typography variant="h1">200 AGENT</Typography>
                              <Typography variant="h5">We have almost 200 registered property consultants.</Typography>
                            </Grid>
                          </Grid>
                        </SubCard>
                      </motion.div>
                    </Grid>

                    <Grid item lg={6} md={6} xs={12} sm={6}>
                      <motion.div>
                        <SubCard>
                          <Grid container alignItems="center" spacing={2}>
                            <Grid item xs zeroMinWidth>
                              <Typography variant="h1">1200 RENT</Typography>
                              <Typography variant="h5">We have more 1200 listing unit for rent every year.</Typography>
                            </Grid>
                          </Grid>
                        </SubCard>
                      </motion.div>
                    </Grid>

                    <Grid item lg={6} md={6} xs={12} sm={6}>
                      <motion.div>
                        <SubCard>
                          <Grid container alignItems="center" spacing={2}>
                            <Grid item xs zeroMinWidth>
                              <Typography variant="h1">600 SALE</Typography>
                              <Typography variant="h5">More than 600 listing for sell & buy.</Typography>
                            </Grid>
                          </Grid>
                        </SubCard>
                      </motion.div>
                    </Grid>

                    <Grid item lg={6} md={6} xs={12} sm={6}>
                      <motion.div>
                        <SubCard>
                          <Grid container alignItems="center" spacing={2}>
                            <Grid item xs zeroMinWidth>
                              <Typography variant="h1">6 PROJECT</Typography>
                              <Typography variant="h5">We already engage with 6 new project with developer.</Typography>
                            </Grid>
                          </Grid>
                        </SubCard>
                      </motion.div>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>

      <Container>
        <Card
          sx={{
            backgroundImage: `url(${images4})`,
            backgroundPosition: 'bottom',
            mx: 3,
            my: 4
          }}
        >
          <CardContent>
            <Grid
              spacing={gridSpacing}
              container
              sx={{
                justifyContent: 'space-between',
                my: 4
              }}
            >
              <Grid lg={12} md={12} sm={12} xs={12} sx={{ ml: 2, textAlign: 'end' }} item>
                <motion.div
                  initial={{ opacity: 0, translateY: 550 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 30
                  }}
                >
                  <Typography sx={{ pt: 2, color: 'white' }} variant="h2">
                    Why <span style={{ color: '#b5a837' }}>JOIN US?</span>
                  </Typography>
                  <Stack sx={{ ml: matchDownLG ? '0%' : '50%' }}>
                    <Typography sx={{ py: 2, color: 'white', textAlign: 'right' }} variant="body1">
                      Our agents are able to enjoy training such as the products and services we provide, as well as selling method skills
                      in our <b>ONE DREAM LEGACY (HQ).</b>
                      {matchDownLG ? (
                        <>
                          {' '}
                          <br></br>
                          <br></br>{' '}
                        </>
                      ) : (
                        ''
                      )}
                      We will provide a wide range of product materials training and selling skills for you to communicate with your
                      customers in effective ways.
                    </Typography>
                  </Stack>

                  {/* <AnimateButton>
                    <Button sx={{ color: 'white' }} component={Link} href="/dashboard/" size="large" variant="contained" color="secondary">
                      Join Agent
                    </Button>
                  </AnimateButton> */}
                </motion.div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>

      <SecondWrapper>
        <Suscribe1 />
        <Footer />
      </SecondWrapper>
      {/* <Customization /> */}
    </>
  );
};

export default Landing;
