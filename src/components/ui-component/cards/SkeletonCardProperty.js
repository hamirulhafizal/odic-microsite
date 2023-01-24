/* eslint-disable import/no-unresolved */

import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import {
  Avatar,
  Badge,
  CardActions,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Stack,
  useMediaQuery,
  Grid,
  Chip,
  Skeleton
} from '@mui/material';
import useAuth from 'hooks/useAuth';
import { Button } from '@mui/material';
import SimpleList from 'components/ui-elements/basic/UIList/SimpleList';
import VerifiedIcon from '@mui/icons-material/Verified';

import InboxIcon from '@mui/icons-material/Inbox';
import PoolIcon from '@mui/icons-material/Pool';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import MosqueIcon from '@mui/icons-material/Mosque';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import SingleBedRoundedIcon from '@mui/icons-material/SingleBedRounded';
import ShowerRoundedIcon from '@mui/icons-material/ShowerRounded';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import BedIcon from '@mui/icons-material/Bed';
import moment from 'moment';
import ShowerOutlinedIcon from '@mui/icons-material/ShowerOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import WhatsApp from '@mui/icons-material/WhatsApp';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import { useRouter } from 'next/router';

import { numberWithCommas } from 'utils/helper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SkeletonCardProperty = ({ itemData, agentData }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <>
      <Card
        sx={{
          display: 'flex',
          left: '235px',
          top: '2109px',
          flexWrap: 'wrap',
          flexDirection: matchDownSM ? 'column' : 'row',
          background: '#FFFFFF',
          boxShadow: '0px 0px 6px 4px rgba(0, 0, 0, 0.15)',
          borderRadius: '10pX',
          justifyContent: 'center',
          p: 3,
          mb: 4
        }}
      >
        <Box
          sx={{
            width: {
              xs: '-webkit-fill-available',
              md: '40%'
            }
          }}
        >
          <Skeleton
            sx={{ height: matchDownSM ? '32vh !important' : '40vh  !important', borderRadius: '5px' }}
            animation="wave"
            variant="rectangular"
          />
        </Box>

        <Box sx={{ width: { xs: '-webkit-fill-available', md: '60%' }, pl: { md: 2 } }}>
          <CardContent sx={{ flex: '1 0 auto', p: { xs: 0, md: 2 }, pt: { xs: 2 } }}>
            <Stack direction="column" justifyContent={matchDownLG ? 'center' : 'start'}>
              <Grid item xs={12} sx={{ my: 1.5 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Stack direction={'row'} sx={{ width: 'max-content' }}>
                        <Typography variant="span">
                          <Skeleton sx={{ width: '100px' }} animation="wave" />
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>

              <Typography variant="h4" color="main" sx={{ textTransform: 'capitalize', cursor: 'pointer' }}>
                <Skeleton animation="wave" />
              </Typography>
              <Typography noWrap variant="h5" color="main" sx={{ textTransform: 'capitalize', pt: 1 }}>
                <Skeleton animation="wave" />
              </Typography>
              <Typography variant="h3" color="secondary" sx={{ pt: 2 }}>
                <Skeleton animation="wave" />
              </Typography>

              <Typography variant="h5" color="primary" sx={{ pt: 2, color: 'black' }}>
                <Skeleton animation="wave" />
              </Typography>

              <List>
                <ListItem disablePadding sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap ', py: 1, px: 0 }}>
                  <ListItemText
                    sx={{
                      display: 'flex',
                      justifyContent: 'start',

                      '& .MuiListItemText-primary': {
                        pr: '10%'
                      }
                    }}
                    primary={
                      <>
                        <Stack display="flex" direction="row" alignItems="center">
                          <Skeleton animation="wave" sx={{ width: '100px' }} />
                          {/* <ListItemIcon>
                            <ShowerOutlinedIcon />
                          </ListItemIcon>
                          {parseInt(itemData ? bathrooms : null)} Bathroom */}
                        </Stack>
                      </>
                    }
                    secondary={
                      <>
                        <Stack display="flex" direction="row" alignItems="center">
                          <Skeleton animation="wave" sx={{ width: '100px' }} />
                          {/* <ListItemIcon>
                            <BedIcon />
                          </ListItemIcon>
                          {bedrooms} Bedroom */}
                        </Stack>
                      </>
                    }
                  />
                </ListItem>
              </List>
            </Stack>
          </CardContent>

          <Divider sx={{ width: '90%', position: 'relative', left: '2%' }} />

          {/* <CardActions sx={{ p: 0, py: 2, pl: matchDownSM ? 0 : 2 }}>
            <Button
              startIcon={<WhatsApp />}
              variant="contained"
              size="medium"
              sx={{ backgroundColor: '#28933F !important', color: 'white' }}
            >
              <a target="_blank" href={`https://wasap.my/6${phone}/${itemData.title}`} rel="noopener noreferrer">
                Whatsapp
              </a>
            </Button>
          </CardActions> */}
        </Box>
      </Card>
    </>
  );
};

export default SkeletonCardProperty;
