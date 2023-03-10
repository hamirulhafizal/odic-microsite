import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'Link';

// material-ui
import { Box, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';

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
import { getProducts } from 'store/slices/product';
import { resetCart } from 'store/slices/cart';

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
  // const { product } = useSelector((state) => state.product);

  // product description tabs
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [product, setProduct] = useState(null);
  const productState = useSelector((state) => state.product);

  useEffect(() => {
    setProduct(productState.product);
    if (productState.product && productState.product.id) {
      if (router.query.id === 'default') {
        router.push(`/app/e-commerce/product-details/${productState.product.id}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productState]);
  useEffect(() => {
    // getProduct();
    dispatch(getProducts(String(router.query.id)));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
      <Grid item xs={12} lg={10}>
        <MainCard>
          {product && (
            <Grid container spacing={gridSpacing}>
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
                  <Tab component={Link} href="#" label="Description" {...a11yProps(0)} />
                  <Tab
                    component={Link}
                    href="#"
                    label={
                      <Stack direction="row" alignItems="center">
                        Reviews <Chip label={String(product.salePrice)} size="small" chipcolor="secondary" sx={{ ml: 1.5 }} />
                      </Stack>
                    }
                    {...a11yProps(1)}
                  />
                </Tabs>
                <TabPanel value={value} index={0}>
                  <ProductDescription />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <ProductReview product={product} />
                </TabPanel>
              </Grid>
            </Grid>
          )}
        </MainCard>
      </Grid>
      <Grid item xs={12} lg={10} sx={{ mt: 3 }}>
        <Typography variant="h2">Related Products</Typography>
      </Grid>
      <Grid item xs={11} lg={10}>
        <RelatedProducts id={router.query.id.toString()} />
      </Grid>
      <FloatingCart />
    </Grid>
  );
};
ProductDetails.Layout = 'authGuard';

export default ProductDetails;
