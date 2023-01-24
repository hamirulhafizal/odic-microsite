/* eslint-disable import/no-unresolved */

import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Button,
  ButtonBase,
  ButtonGroup,
  Divider,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  TableContainer,
  Badge
} from '@mui/material';

// third-party
import { useFormik, Form, FormikProvider, useField } from 'formik';
import * as yup from 'yup';

// project imports
import Chip from 'components/ui-component/extended/Chip';
import Avatar from 'components/ui-component/extended/Avatar';
import ColorOptions from '../ColorOptions';
import { openSnackbar } from 'store/slices/snackbar';
import { useDispatch, useSelector } from 'store';
import { addProduct } from 'store/slices/cart';

// assets
import WhatsApp from '@mui/icons-material/WhatsApp';
import { getProfileAgentById } from 'contexts/ApiListing';
import { useEffect, useState } from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import YouTubeIcon from '@mui/icons-material/YouTube';

import moment from 'moment';
import { getRelatedProducts } from 'store/slices/product';
import { numberWithCommas } from 'utils/helper';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const defaultImage = 'https://onedream.dynamicdigital.guru/media/profile_photo/avatar.png';

const validationSchema = yup.object({
  color: yup.string().required('Colors selection is required'),
  size: yup.number().required('Size selection is required.')
});

// ==============================|| PRODUCT DETAILS - INFORMATION ||============================== //

const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [agentData, setAgentData] = useState();

  const cart = useSelector((state) => state.cart);
  const userData = useSelector((state) => state.user);

  const agetData = () => {
    setAgentData(userData?.userData?.userData[0]);
    dispatch(getRelatedProducts(router.query.id, userData?.userData?.userData[0]?.inventories));
  };

  useEffect(() => {
    if (agentData == null) {
      agetData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.user_name, agentData]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: product.id,
      name: product.name,
      image: product.image,
      salePrice: product.salePrice,
      offerPrice: product.offerPrice,
      color: '',
      size: '',
      quantity: 1
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(addProduct(values, cart.checkout.products));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Submit Success',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    }
  });

  const { values, errors, handleSubmit, handleChange } = formik;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Stack direction={'row'} sx={{ width: 'max-content' }}>
                <Chip
                  size="small"
                  className={
                    product?.state == 'Available' || product?.state == '-' || product?.state == null
                      ? 'labelStatusSuccess'
                      : 'labelstatusunavailable'
                  }
                  label={product?.state == 'Available' || product?.state == '-' || product?.state == null ? 'Available' : product?.state}
                  chipcolor={product?.state == 'Available' || product?.state == '-' || product?.state == null ? 'success' : 'fail'}
                  sx={{
                    borderRadius: '4px',
                    textTransform: 'capitalize',
                    backgroundColor:
                      product?.state == 'Available' || product?.state == '-' || product?.state == null ? '#00c853' : '#00c853',
                    color: 'white'
                  }}
                />
                <Chip
                  size="small"
                  className={'viewsChip'}
                  label={
                    <>
                      {' '}
                      <VisibilityOutlinedIcon sx={{ p: '5%', color: 'black' }} />
                      <Typography variant="span" component={'span'}>
                        views {product?.view_count}{' '}
                      </Typography>
                    </>
                  }
                  // chipcolor={product?.state == 'Available' || product?.state == null ? 'success' : 'fail'}
                  sx={{
                    borderRadius: '4px',
                    textTransform: 'capitalize',
                    backgroundColor: 'white',
                    color: 'black',
                    position: 'relative',
                    left: '10px',
                    width: 'max-content',
                    '.MuiChip-label': {
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignContent: 'center',
                      p: 0
                    },

                    '& .MuiChip-root': {
                      '&:hover': {
                        backgroundColor: 'transparent'
                      }
                    }
                  }}
                />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3">{product?.title}</Typography>
      </Grid>

      <Grid item xs={12}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h2" color="primary">
            RM {numberWithCommas(product?.price)} {product?.category == 4 && '/ month'}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Stack direction="column" sx={{ pt: 2 }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={<VerifiedIcon sx={{ fontSize: '1.5em' }} color="secondary" />}
            >
              <Avatar
                onClick={() => {
                  router.push(`/${agentData?.user_name}`);
                }}
                alt={`${agentData?.user_name}`}
                src={agentData?.photo == defaultImage ? '/oneDream.ico' : agentData?.photo}
                sx={{
                  borderRadius: '16px',
                  margin: '5px auto 0',
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'transparent',
                  borderRadius: '100%',
                  cursor: 'pointer',
                  '& .MuiAvatar-img': {
                    objectFit: Boolean(agentData?.photo == defaultImage) ? 'contain' : null,
                    border: Boolean(agentData?.photo == defaultImage) ? ' 1px solid #b5a837' : null,
                    borderRadius: '50%'
                  }
                }}
              />
            </Badge>
          </Stack>

          <Stack direction="column" sx={{ pl: 2, pt: { xs: 3 } }}>
            <Typography
              onClick={() => {
                router.push(`/${agentData?.user_name}`);
              }}
              variant="h4"
              color="main"
              sx={{ textTransform: 'capitalize', cursor: 'pointer' }}
            >
              {agentData?.firstName} {agentData?.lastName}
            </Typography>
            <Typography variant="subtitle2" color="secondary">
              Posted on {moment(product?.inventory_date).format('DD MMM YYYY')}
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={10}>
                <TableContainer>
                  <Table sx={{ maxWidth: 380 }} size="small" aria-label="simple table">
                    <TableBody>
                      <TableRow sx={{ '& td, & th': { border: 0, textTransform: 'capitalize' } }}>
                        <TableCell>
                          <b>Bedrooms </b> {product?.bedrooms}
                        </TableCell>
                        <TableCell>
                          <b>Bathrooms </b> {parseInt(product?.bathrooms)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      sx={{
                        justifyContent: 'start'
                      }}
                    >
                      {product?.video !== null && (
                        <Button sx={{ position: 'relative', right: '2%' }} variant="contained" size="medium" startIcon={<YouTubeIcon />}>
                          <a target="_blank" href={product?.video} rel="noopener noreferrer">
                            Youtube
                          </a>
                        </Button>
                      )}
                      <Button
                        startIcon={<WhatsApp />}
                        variant="contained"
                        size="medium"
                        sx={{ backgroundColor: '#28933F', color: 'white' }}
                      >
                        <a target="_blank" href={`https://wasap.my/6${agentData?.phone}/${product.title}`} rel="noopener noreferrer">
                          Whatsapp
                        </a>
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Grid>
    </Grid>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.object
};

export default ProductInfo;
