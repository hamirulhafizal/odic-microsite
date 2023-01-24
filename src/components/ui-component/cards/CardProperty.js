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
import { Avatar, Badge, CardActions, Divider, List, ListItem, ListItemText, ListItemIcon, Stack, useMediaQuery } from '@mui/material';
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

import { useRouter } from 'next/router';

import { numberWithCommas } from 'utils/helper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CardProperty = ({ itemData, agentData }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const { user } = useAuth();
  const router = useRouter();

  const temArr = [];

  const { photo_1, photo_2, photo_3, photo_4, photo_5, featureImage } = itemData;

  const { photo, phone, firstName, lastName, user_name } = agentData;

  temArr.push(featureImage, photo_1, photo_2, photo_3, photo_4, photo_5);

  var resultObject = Object.values(temArr).filter((item) => item != null || item !== undefined);

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
          <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
          >
            {resultObject
              .filter((item) => item != null)
              .map((item, index) => (
                <SwiperSlide key={index}>
                  <CardMedia
                    onClick={() => {
                      router.push(`/listing/${itemData?.id}`);
                    }}
                    key={index}
                    sx={{
                      cursor: 'pointer',
                      width: '100%',
                      height: matchDownSM ? '32vh !important' : '40vh  !important',
                      objectFit: 'cover',
                      backgroundColor: 'black',
                      borderRadius: '8px'
                    }}
                    component="img"
                    image={item}
                    alt="one dream property"
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </Box>

        <Box sx={{ width: { xs: '-webkit-fill-available', md: '60%' }, pl: { md: 2 } }}>
          <CardContent sx={{ flex: '1 0 auto', p: { xs: 0, md: 2 }, pt: { xs: 2 } }}>
            <Stack direction="column" justifyContent={matchDownLG ? 'center' : 'start'}>
              <Typography
                onClick={() => {
                  router.push(`/listing/${itemData?.id}`);
                }}
                variant="h4"
                color="main"
                sx={{ textTransform: 'capitalize', cursor: 'pointer' }}
              >
                {itemData?.title}
              </Typography>
              <Typography noWrap variant="h5" color="main" sx={{ textTransform: 'capitalize', pt: 1 }}>
                {itemData?.description}
              </Typography>
              <Typography variant="h3" color="secondary" sx={{ pt: 2 }}>
                RM {numberWithCommas(itemData?.price)} {itemData?.category == 4 && '/ month'}
              </Typography>

              <Typography variant="h5" color="primary" sx={{ pt: 2, color: 'black' }}>
                {itemData?.city}
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
                          <ListItemIcon>
                            <ShowerOutlinedIcon />
                          </ListItemIcon>
                          {parseInt(itemData?.bathrooms)} Bathroom
                        </Stack>
                      </>
                    }
                    secondary={
                      <>
                        <Stack display="flex" direction="row" alignItems="center">
                          <ListItemIcon>
                            <BedIcon />
                          </ListItemIcon>
                          {itemData?.bedrooms} Bedroom
                        </Stack>
                      </>
                    }
                  />
                </ListItem>
              </List>
            </Stack>
          </CardContent>

          <Divider sx={{ width: '90%', position: 'relative', left: '2%' }} />

          <CardActions sx={{ p: 0, py: 2, pl: matchDownSM ? 0 : 2 }}>
            <Button startIcon={<WhatsApp />} variant="contained" size="medium" sx={{ backgroundColor: '#28933F', color: 'white' }}>
              <a target="_blank" href={`https://wasap.my/6${phone}/${itemData.title}`} rel="noopener noreferrer">
                Whatsapp
              </a>
            </Button>
          </CardActions>
        </Box>
      </Card>
    </>
  );
};

export default CardProperty;
