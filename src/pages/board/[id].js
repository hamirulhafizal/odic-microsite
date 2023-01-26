import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'Link';

// material-ui
import { Box, Grid, Stack, Tab, Tabs, Typography, useMediaQuery, Breadcrumbs, Button } from '@mui/material';

// project imports
import ProductImages from 'components/application/e-commerce/ProductDetails/ProductImages';
import ProductInfo from 'components/application/e-commerce/ProductDetails/ProductInfo';
import ProductDescription from 'components/application/e-commerce/ProductDetails/ProductDescription';
import ProductReview from 'components/application/e-commerce/ProductDetails/ProductReview';
import RelatedProducts from 'components/application/e-commerce/ProductDetails/RelatedProducts';
import MainCard from 'components/ui-component/cards/MainCard';
import FloatingCart from 'components/ui-component/cards/FloatingCart';
import Chip from 'components/ui-component/extended/Chip';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import { getProductById, getProducts, getProductsSuccess, setProductStore } from 'store/slices/product';
import { resetCart } from 'store/slices/cart';
import AppBar from 'components/ui-component/extended/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import FooterPage from 'components/landingpage/Footer';
import { getListingById } from 'contexts/ApiListing';
import { wrapper } from 'store';
import { setListing, setUser } from 'store/slices/user';

import { BACKEND_PATH } from 'config';

const headerBackground = '/assets/images/landing/header-bg.jpg';

const HeaderWrapper = styled('div')(({ theme }) => ({
  backgroundImage: `url(${headerBackground})`,
  backgroundSize: '100% 600px',
  backgroundAttachment: 'fixed',
  backgroundRepeat: 'no-repeat',
  textAlign: 'center',
  paddingTop: 30,
  [theme.breakpoints.down('md')]: {
    paddingTop: 0
  }
}));

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`products-details-tabpanel-${index}`}
      aria-labelledby={`products-details-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
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
    id: `products-details-tab-${index}`,
    'aria-controls': `products-details-tabpanel-${index}`
  };
}

ProductDetails.getInitialProps = wrapper.getInitialPageProps((store) => async (context) => {
  const id = context.query.id;

  const userData = await fetch(`${BACKEND_PATH}/api/v1/inventory/${id}`)
    .then((response) => response.json())
    .then((json) => {
      return json;
    });

  const userData1 = await fetch(`${BACKEND_PATH}/api/v1/profile/${userData?.user_name}`)
    .then((response) => response.json())
    .then((json) => {
      return json;
    });

  store.dispatch(setUser({ userData: [userData1] }));
  store.dispatch(setListing(userData));

  return {
    userData: userData
  };
});

function ProductDetails({ userData }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  // product description tabs
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [product, setProduct] = useState(null);
  const productState = useSelector((state) => state.product);

  dispatch(getProductById(null, userData));

  const { relatedProducts, products } = useSelector((state) => state.product);

  useEffect(() => {
    setProduct(userData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productState]);

  return (
    // <MainLayout>
    <>
      <AppBar />
      <Grid
        sx={{
          pt: 12,
          pb: 5
        }}
        container
        alignItems="center"
        justifyContent="center"
        spacing={gridSpacing}
      >
        <Grid item xs={11} lg={10}>
          <Box sx={{ pb: 2 }}>
            <Breadcrumbs separator="›" aria-label="breadcrumbs">
              <Button
                active
                sx={{
                  color: 'black',

                  ':hover': {
                    backgroundColor: 'white'
                  }
                }}
                onClick={() => {
                  router.push(`/${product?.user_name}`);
                }}
              >
                <Typography fontSize="inherit" href={`/${product?.user_name}`}>
                  {product?.user_name}
                </Typography>
              </Button>
              <Typography fontSize="inherit">Listing {product?.id}</Typography>
            </Breadcrumbs>
          </Box>

          <MainCard sx={{ borderColor: '#b5a837' }}>
            {product && (
              <Grid container spacing={matchDownSM ? 1 : 5}>
                <Grid item xs={12} md={6}>
                  <ProductImages product={product} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ProductInfo product={product} />
                </Grid>
                <Grid item xs={12}>
                  <Tabs
                    value={value}
                    indicatorColor="primary"
                    onChange={handleChange}
                    sx={{}}
                    aria-label="product description tabs example"
                    variant="scrollable"
                  >
                    <Tab component={Link} href="#" label="Property Detail" {...a11yProps(0)} />
                  </Tabs>
                  <TabPanel value={value} index={0}>
                    <ProductDescription product={product} />
                  </TabPanel>
                  {/* <TabPanel value={value} index={1}>
                    <ProductReview product={product} />
                  </TabPanel> */}
                </Grid>
              </Grid>
            )}
          </MainCard>
        </Grid>
        <RelatedProducts data={userData} />
      </Grid>
      <FooterPage />
    </>

    //  </MainLayout>
  );
}

export default ProductDetails;
