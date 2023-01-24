/* eslint-disable import/no-unresolved */

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, useMediaQuery, Grid, Typography } from '@mui/material';

// project imports
import ProductCard from 'components/ui-component/cards/ProductCard';
import { useDispatch, useSelector } from 'store';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination, Mousewheel, Keyboard, autoplay } from 'swiper';
import { getListsbyQuery } from 'contexts/ApiListing';

// ==============================|| PRODUCT DETAILS - RELATED PRODUCTS ||============================== //

const RelatedProducts = ({ data }) => {
  const { category, user_name } = data;

  const theme = useTheme();
  const dispatch = useDispatch();
  const [related, setRelated] = useState([]);
  const matchDownXl = useMediaQuery(theme.breakpoints.down('xl'));
  const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  // const { relatedProducts } = useSelector((state) => state.product);å

  // const relatedProductsCopy = [...relatedProducts];

  let noItems = 3;
  noItems = matchDownSM ? 1 : noItems;
  noItems = matchDownMD ? 2 : noItems;
  noItems = matchDownLG ? 3 : noItems;
  noItems = matchDownXl ? 4 : noItems;

  const fetchRelatedCategory = async () => {
    try {
      const querySet = { username: user_name, category: category };

      await getListsbyQuery(querySet, 1).then((response) => {
        let data = response.results;

        setRelated(data?.splice(0, 5));

        // setLoading(false);
      });
    } catch (err) {
      console.log(err);
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchRelatedCategory();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid item xs={12} lg={10} sx={{ mt: 3, ml: 2 }}>
        <Typography variant="h2">Similar Properties</Typography>
      </Grid>
      <Grid item xs={11} lg={10}>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50
            }
          }}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
          style={{
            paddingBottom: 50,
            '& .swiper-wrapper': {
              justifyContent: 'center'
            }
          }}
        >
          {related.map((product, index) => (
            <Box key={index}>
              <SwiperSlide key={index}>
                <ProductCard
                  key={index}
                  id={product?.id}
                  image={product?.featureImage}
                  title={product?.title}
                  offerPrice={product?.price}
                  salePrice={product?.price}
                  category={product?.category}
                />
              </SwiperSlide>
            </Box>
          ))}
        </Swiper>
      </Grid>
    </>
  );
};

RelatedProducts.propTypes = {
  id: PropTypes.string
};

export default RelatedProducts;
