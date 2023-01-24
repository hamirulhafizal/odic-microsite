import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'Link';

// material-ui
import { Box, Chip, Stack, Tab, Tabs, Typography, Button, Grid, useMediaQuery, CircularProgress } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';

// assets
import CardProperty from 'components/ui-component/cards/CardProperty';
import BedroomParentTwoToneIcon from '@mui/icons-material/BedroomParentTwoTone';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import HotelTwoToneIcon from '@mui/icons-material/HotelTwoTone';
import { useRouter } from 'next/router';
import useAuth from 'hooks/useAuth';

import FilterByState from '../../../../pages/listing/FilterByState';
import { getListsbyQuery } from 'contexts/ApiListing';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularLoader from 'components/ui-component/CircularLoader';
import SkeletonCardProperty from 'components/ui-component/cards/SkeletonCardProperty';

const useStyles = makeStyles({
  pokemonCardsArea: {
    justifyContent: 'space-evenly'
  },
  progress: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginTop: '-100px',
    marginLeft: '-100px'
  }
});
// tab content customize

function LinkTab(props) {
  const { hashvalue } = props;
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
        hashvalue();
      }}
      {...props}
    />
  );
}
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box
          sx={{
            p: 1
          }}
        >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

// ================================|| UI TABS - COLOR ||================================ //

const NavBarItem = {
  '/': 0,
  '#sales': 1,
  '#rent': 2
};
export default function TypeTabs({ username, agentData }) {
  const theme = useTheme();
  const router = useRouter();

  const checkUrlsHash = location.hash == '' ? 0 : location.hash == '#sales' ? 2 : location.hash == '#rent' && 4;
  const [value, setValue] = useState(location.hash !== '' ? NavBarItem[location.hash] : 0);

  const [categoryState, setCategory] = useState(checkUrlsHash);
  const [locationState, setLocation] = useState(null);
  const [typeState, setType] = useState({ value: null, label: 'all' });
  const [titleState, setTitle] = useState(null);

  const [statePage, setPage] = useState(1);
  const [scrollData, setScrollData] = useState();
  const [hasMoreValue, setHasMoreValue] = useState(true);
  const [pokemonData, setPokemonData] = useState();
  const [isLoading, setLoading] = useState();
  const [isTimer, setTimer] = useState(false);
  const [isObjectFreeze, setObjectFreeze] = useState();

  const [isMessage, setMessage] = useState(false);

  const handleChange = (event, newValue) => {
    let decoded = decodeURIComponent(Object.keys(NavBarItem)[newValue]);
    router.push(`${agentData?.user_name}/${decoded}`, undefined, { shallow: true });

    setValue(newValue);
    setCategory(newValue);
  };

  const handleLocation = (value) => {
    setLocation(value);
  };

  const handleCategory = (value) => {
    setCategory(value);
  };

  const handleType = (item) => {
    setType(item);
  };

  const filterByCategory = (param, location, type, data) => {
    const newArray = structuredClone(data);

    if (param !== 0 && type !== null && location == null) {
      return newArray?.filter((item) => {
        return item.category == param && item.propertyType == type;
      });
    }
    if (param !== 0 && location !== null && type == null) {
      return newArray?.filter((item) => {
        return item.category == param && item.location == location;
      });
    }
    if (param !== 0 && location !== null && type !== null) {
      return newArray?.filter((item) => {
        return item.category == param && item.location == location && item.propertyType == type;
      });
    }
    if (param == 0 && location == null && type == null) {
      return newArray?.filter((item) => {
        return item;
      });
    }
    if (param == 0 && location !== null && type !== null) {
      return newArray?.slice(0).filter((item) => {
        return item?.location == location && item?.propertyType == type;
      });
    }
    if (param == 0 && location == null && type !== null) {
      return newArray?.slice(0).filter((item) => {
        return item?.propertyType == type;
      });
    }
    if (param == 0 && location !== null && type == null) {
      return newArray?.slice(0).filter((item) => {
        return item?.location == location;
      });
    }
    if (param !== 0 && type == null && location == null) {
      return newArray?.filter((item) => {
        return item.category == param;
      });
    }
  };

  const loadScrollData = async () => {
    try {
      setScrollData(pokemonData.slice(0, scrollData.length + 8));
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnRowsScrollEnd = () => {
    if (scrollData.length < pokemonData.length) {
      setHasMoreValue(true);
      loadScrollData();
    } else {
      setHasMoreValue(false);
    }
  };

  const fetchPrimaryPokemonData = async (categoryState, locationState, type, page) => {
    try {
      const querySet = { username: username, location: locationState, title: titleState };

      await getListsbyQuery(querySet, page).then((response) => {
        let data;
        const dataFreeze = Object.freeze(response?.results);
        setObjectFreeze(dataFreeze);

        if (locationState == null && type == null && categoryState == 0) {
          data = response.results;
        } else {
          data = filterByCategory(categoryState, locationState, type, response.results);
        }

        const newPokemonData = [];

        if (data?.length != 0) {
          data?.forEach((pokemon, index) => {
            const {
              id,
              address,
              amenities,
              bathrooms,
              bedrooms,
              carpark,
              category,
              city,
              description,
              featureImage,
              floorRange,
              furnishing,
              inventory_date,
              lat,
              location,
              lon,
              otherInfo,
              phone_number,
              photo_1,
              photo_2,
              photo_3,
              photo_4,
              photo_5,
              photo_6,
              photo_7,
              photo_8,
              photo_9,
              photo_10,
              price,
              propertyTitle,
              propertyType,
              realtor,
              rentalDeposit,
              saleType,
              size,
              slug,
              state,
              tenure,
              title,
              user_name,
              video,
              view_count,
              zipcode
            } = pokemon;

            newPokemonData.push({
              id: id,
              address: address,
              amenities: amenities,
              bathrooms: bathrooms,
              bedrooms: bedrooms,
              carpark: carpark,
              category: category,
              city: city,
              description: description,
              featureImage: featureImage,
              floorRange: floorRange,
              furnishing: furnishing,
              inventory_date: inventory_date,
              lat: lat,
              location: location,
              lon: lon,
              otherInfo: otherInfo,
              phone_number: phone_number,
              photo_1: photo_1,
              photo_2: photo_2,
              photo_3: photo_3,
              photo_4: photo_4,
              photo_5: photo_5,
              photo_6: photo_6,
              photo_7: photo_7,
              photo_8: photo_8,
              photo_9: photo_9,
              photo_10: photo_10,
              price: price,
              propertyTitle: propertyTitle,
              propertyType: propertyType,
              realtor: realtor,
              rentalDeposit: rentalDeposit,
              saleType: saleType,
              size: size,
              slug: slug,
              state: state,
              tenure: tenure,
              title: title,
              user_name: user_name,
              video: video,
              view_count: view_count,
              zipcod: zipcode
            });
          });
          setMessage(false);

          setPokemonData(newPokemonData);

          setScrollData(newPokemonData.slice(0, 8));
        } else {
          setMessage(true);
        }

        setLoading(false);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);

    fetchPrimaryPokemonData(categoryState, locationState, typeState.value, statePage);

    // setTimeout(() => {
    //   setTimer(true);
    // }, 3000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statePage, typeState.value, locationState, categoryState]);

  const renderCards = (pokemonIndex) => {
    return (
      <>
        <CardProperty agentData={agentData} itemData={pokemonData[pokemonIndex]} key={1} />
      </>
    );
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        sx={{
          '& a': {
            minHeight: 'auto',
            minWidth: 10,
            py: 1.5,
            px: 1,
            mr: 2.2,
            color: theme.palette.grey[600],
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          },
          '& a.Mui-selected': {
            color: theme.palette.primary.secondary
          },
          '& a > svg': {
            mb: '0px !important',
            mr: 1.1
          }
        }}
        centered
      >
        <LinkTab
          component={Link}
          href={`/${username}`}
          hashvalue={() => {
            handleCategory(0);
          }}
          label={
            <>
              All{' '}
              <Chip
                label={isObjectFreeze?.length}
                size="small"
                sx={{ color: theme.palette.secondary.main, background: theme.palette.secondary.light, ml: 1.3 }}
              />
            </>
          }
          icon={<BedroomParentTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
          {...a11yProps(0)}
        />

        <LinkTab
          component={Link}
          hashvalue={() => {
            handleCategory(2);
          }}
          href="#sales"
          icon={<HomeTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
          label={
            <>
              Sales{' '}
              <Chip
                label={
                  categoryState == 2 &&
                  pokemonData &&
                  pokemonData?.filter((item) => item.category == 2 || item.propTypes == typeState.value || item.location == locationState)
                    .length
                }
                size="small"
                sx={{
                  color: theme.palette.secondary.main,
                  background: theme.palette.secondary.light,
                  ml: 1.3,
                  display: categoryState == 2 ? 'inline-flex' : 'none'
                }}
              />
            </>
          }
          {...a11yProps(1)}
        />

        <LinkTab
          component={Link}
          hashvalue={() => {
            handleCategory(4);
          }}
          href="#rent"
          icon={<HotelTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
          label={
            <>
              Rent{' '}
              <Chip
                label={
                  categoryState == 4 &&
                  pokemonData &&
                  pokemonData?.filter((item) => item.category == 4 || item.propTypes == typeState.value || item.location == locationState)
                    .length
                }
                size="small"
                sx={{
                  color: theme.palette.secondary.main,
                  background: theme.palette.secondary.light,
                  ml: 1.3,
                  display: categoryState == 4 ? 'inline-flex' : 'none'
                }}
              />
            </>
          }
          {...a11yProps(2)}
        />
      </Tabs>
      <Box textAlign="right" sx={{ mt: 3, mb: 4 }}>
        <FilterByState handleLoc={handleLocation} handleType={handleType} />
      </Box>
      <TabPanel value={value} index={0}>
        {isMessage ? (
          <Typography variant="h4" sx={{ pb: 2, textAlign: 'center' }}>
            No Property Found in {locationState}
          </Typography>
        ) : (
          <>
            {!isLoading && scrollData ? (
              <>
                <InfiniteScroll
                  dataLength={scrollData.length}
                  next={handleOnRowsScrollEnd}
                  hasMore={hasMoreValue}
                  scrollThreshold={1}
                  loader={<CircularProgress />}
                  style={{ overflow: 'unset', mt: 5 }}
                  endMessage={
                    <Stack sx={{ textAlign: 'center' }}>
                      <Typography variant="caption">Comming Soon More List</Typography>
                    </Stack>
                  }
                >
                  {scrollData.map((pokemon, index) => renderCards(index))}
                </InfiniteScroll>
              </>
            ) : (
              <SkeletonCardProperty />
            )}
          </>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {isMessage ? (
          <Typography variant="h4" sx={{ pb: 2, textAlign: 'center' }}>
            No Property Found in {locationState}
          </Typography>
        ) : (
          <>
            {!isLoading && scrollData ? (
              <>
                <InfiniteScroll
                  dataLength={scrollData.length}
                  next={handleOnRowsScrollEnd}
                  hasMore={hasMoreValue}
                  scrollThreshold={1}
                  loader={<CircularProgress />}
                  endMessage={
                    <Stack sx={{ textAlign: 'center' }}>
                      <Typography variant="caption">Comming Soon More List</Typography>
                    </Stack>
                  }
                  style={{ overflow: 'unset', mt: 5 }}
                >
                  {scrollData.map((pokemon, index) => renderCards(index))}
                </InfiniteScroll>
              </>
            ) : (
              <SkeletonCardProperty />
            )}
          </>
        )}
      </TabPanel>

      <TabPanel value={value} index={2}>
        {isMessage ? (
          <Typography variant="h4" sx={{ pb: 2, textAlign: 'center' }}>
            No Property Found in {locationState}
          </Typography>
        ) : (
          <>
            {!isLoading && scrollData ? (
              <>
                <InfiniteScroll
                  dataLength={scrollData.length}
                  next={handleOnRowsScrollEnd}
                  hasMore={hasMoreValue}
                  scrollThreshold={1}
                  loader={<CircularProgress />}
                  endMessage={
                    <Stack sx={{ textAlign: 'center' }}>
                      <Typography variant="caption">Comming Soon More List</Typography>
                    </Stack>
                  }
                  style={{ overflow: 'unset', mt: 5 }}
                >
                  {scrollData.map((pokemon, index) => renderCards(index))}
                </InfiniteScroll>
              </>
            ) : (
              <SkeletonCardProperty />
            )}
          </>
        )}
      </TabPanel>
    </>
  );
}
