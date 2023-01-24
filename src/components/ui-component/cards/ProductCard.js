import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Link from 'Link';

// material-ui
import { Button, CardContent, CardMedia, Grid, Rating, Stack, Typography } from '@mui/material';

// redux
import { useDispatch, useSelector } from 'store';
import { addProduct } from 'store/slices/cart';
import { useRouter } from 'next/router';

// project import
import MainCard from './MainCard';
import SkeletonProductPlaceholder from 'components/ui-component/cards/Skeleton/ProductPlaceholder';
import { openSnackbar } from 'store/slices/snackbar';

// assets
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import { numberWithCommas } from 'utils/helper';

const prodImage = '/assets/images/e-commerce';

// ==============================|| PRODUCT CARD ||============================== //

const ProductCard = ({ id, color, title, image, description, offerPrice, salePrice, rating, category }) => {
  const dispatch = useDispatch();

  // const prodProfile = image && `${prodImage}/${image}`;
  const [productRating] = useState(rating);
  const cart = useSelector((state) => state.cart);
  const router = useRouter();

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  const addCart = (id) => {
    window.location.href = `/listing/${id}`;
  };

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <SkeletonProductPlaceholder />
      ) : (
        <MainCard
          content={false}
          boxShadow
          sx={{
            '&:hover': {
              transform: 'scale3d(1.02, 1.02, 1)',
              transition: 'all .4s ease-in-out'
            },
            boxShadow: 'rgb(36 37 44 / 30%) 0px 2px 8px',
            width: '300px'
          }}
        >
          <CardMedia
            sx={{ height: 220 }}
            image={image}
            title="Contemplative Reptile"
            onClick={() => {
              addCart(id);
            }}
          />
          <CardContent sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ textAlign: 'start' }}>
                <Typography
                  onClick={() => {
                    addCart(id);
                  }}
                  variant="subtitle1"
                  sx={{ textDecoration: 'none' }}
                >
                  {truncate(title, 15)}
                </Typography>
              </Grid>
              {description && (
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    sx={{
                      overflow: 'hidden',
                      height: 45
                    }}
                  >
                    {description}
                  </Typography>
                </Grid>
              )}

              <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Grid container spacing={1}>
                    <Grid item>
                      <Typography variant="h4" color="primary">
                        RM {numberWithCommas(offerPrice)} {category == 4 && '/ month'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number,
  color: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  offerPrice: PropTypes.number,
  salePrice: PropTypes.number,
  rating: PropTypes.number
};

export default ProductCard;
