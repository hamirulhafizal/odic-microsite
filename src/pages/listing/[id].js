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
import { getProductById } from 'store/slices/product';
import { resetCart } from 'store/slices/cart';
import AppBar from 'components/ui-component/extended/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import FooterPage from 'components/landingpage/Footer';
const headerBackground = '/assets/images/landing/header-bg.jpg';

// import MainLayout from 'layout/MainLayout';

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
      id={`product-details-tabpanel-${index}`}
      aria-labelledby={`product-details-tab-${index}`}
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
    id: `product-details-tab-${index}`,
    'aria-controls': `product-details-tabpanel-${index}`
  };
}

const ProductDetails = () => {
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
  const { relatedProducts } = useSelector((state) => state.product);

  useEffect(() => {
    setProduct(productState?.product);
    if (productState?.product && productState?.product?.id) {
      if (router.query.id === 'default') {
        router.push(`/app/e-commerce/product-details/${productState.product.id}`);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productState]);

  useEffect(() => {
    dispatch(getProductById(router.query.id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {relatedProducts.length == 0 ? (
          <>{''}</>
        ) : (
          <>
            <Grid item xs={12} lg={10} sx={{ mt: 3, ml: 2 }}>
              <Typography variant="h2">Similar Properties</Typography>
            </Grid>
            <Grid item xs={11} lg={10}>
              <RelatedProducts id={product?.user_name} />
            </Grid>
          </>
        )}
      </Grid>
      <FooterPage />
    </>

    //  </MainLayout>
  );
};

export default ProductDetails;
