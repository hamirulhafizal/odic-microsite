// eslint-disable-next-line import/no-unresolved

import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, CardMedia, Grid, useMediaQuery } from '@mui/material';

// project import
import MainCard from 'components/ui-component/cards/MainCard';
import Avatar from 'components/ui-component/extended/Avatar';
import { gridSpacing } from 'store/constant';

// third-party
import Slider from 'react-slick';
import Carousel, { Modal, ModalGateway } from 'react-images';

import useConfig from '../../../../hooks/useConfig';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';

// ==============================|| PRODUCT DETAILS - IMAGES ||============================== //

const ProductImages = ({ product }) => {
  const theme = useTheme();
  const { borderRadius } = useConfig();
  const products = [product?.featureImage, product?.photo_2, product?.photo_3, product?.photo_4, product?.photo_5, product?.photo_1];

  const matchDownLG = useMediaQuery(theme.breakpoints.up('lg'));
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const initialImage = product.image ? product?.photo_1 : product?.photo_1;

  const [selected, setSelected] = useState(initialImage);
  const [modal, setModal] = useState(false);

  const lgNo = matchDownLG ? 4 : 3;

  var resultObject = Object.values(products).filter((item) => item != null);

  return (
    <>
      <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
        <Grid item xs={12}>
          {/* <MainCard content={false} sx={{ m: '0 auto' }}>
            <CardMedia
              // onClick={() => setModal(!modal)}
              component="img"
              image={selected}
              sx={{
                borderRadius: `${borderRadius}px`,
                overflow: 'hidden',
                cursor: 'zoom-in',
                height: ' 350px',
                objectFit: 'contain',
                backgroundColor: 'black'
              }}
            />
          </MainCard>
        </Grid> */}
          <Grid item>
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
                      key={index}
                      style={{
                        width: '100%',
                        height: matchDownSM ? '250px' : '450px',
                        p: 2,
                        objectFit: 'cover',
                        backgroundColor: 'white',
                        borderRadius: '8px'
                      }}
                      component="img"
                      image={item}
                      alt="one dream property"
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </Grid>
        </Grid>
      </Grid>
      {/* <ModalGateway>
        {modal ? (
          <Modal onClose={() => setModal(!modal)}>
            <Carousel views={images} />
          </Modal>
        ) : null}
      </ModalGateway> */}
    </>
  );
};

ProductImages.propTypes = {
  product: PropTypes.object
};

export default ProductImages;
