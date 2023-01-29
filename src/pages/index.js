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
const images0 = '/assets/images/invest1.jpg';
const images1 = '/assets/images/landing/living-room-with-yellow.png';
const images2 = '/assets/images/landing/footerBg-1.png';
const images3 = '/assets/images/landing/ladningbg1.png';
const images4 = '/assets/images/landing/ladningbg2.png';

const HeaderWrapper = styled('div')(({ theme }) => ({
  paddingTop: 30,
  overflowX: 'hidden',
  overflowY: 'clip',
  backgroundImage: `linear-gradient(180deg,rgb(0 0 0 / 75%),rgb(0 0 0 / 75%)), url(${images0})`,
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
      <HeaderWrapper id="home" sx={{ height: matchDownLG ? '90vh' : '80vh' }}>
        <AppBar />
        <Header />
      </HeaderWrapper>

      <SecondWrapper>
        <Footer />
      </SecondWrapper>
    </>
  );
};

export default Landing;
