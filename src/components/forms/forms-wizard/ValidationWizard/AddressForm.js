import PropTypes from 'prop-types';

// material-ui
import { Button, Checkbox, FormControlLabel, Grid, Stack, Typography, TextField, TextareaAutosize, useMediaQuery } from '@mui/material';

// project imports
import AnimateButton from 'components/ui-component/extended/AnimateButton';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import FormControlSelect from 'components/ui-component/extended/Form/FormControlSelect';
import useAuth from 'hooks/useAuth';
import { slugify } from 'utils/helper';
import axios from 'axios';

import { BACKEND_PATH, GOOLE_API_MAP } from 'config';
import { boolean } from 'yup/lib/locale';
import { withScriptjs } from 'react-google-maps';
import Map from 'components/application/map/Map';
import { useTheme } from '@mui/styles';

const category = [
  {
    value: 4,
    label: 'Rent'
  },
  {
    value: 2,
    label: 'Sale'
  }
];

const statusRent = [
  {
    value: 'Available',
    label: 'Available'
  },
  {
    value: 'Rented',
    label: 'Rented'
  }
];

const statusSell = [
  {
    value: 'Available',
    label: 'Available'
  },

  {
    value: 'Sold',
    label: 'Sold'
  }
];

const tenures = [
  {
    value: true,
    label: 'Leasehold'
  },
  {
    value: false,
    label: 'Freehold'
  }
];

const propertyTypes = [
  {
    value: 5,
    label: 'Apartment'
  },
  {
    value: 6,
    label: 'Landed House'
  },
  {
    value: 7,
    label: 'Private Room'
  },
  {
    value: 8,
    label: 'Factory'
  },
  {
    value: 9,
    label: 'Office'
  },
  {
    value: 10,
    label: 'Hotel/Resort'
  },
  {
    value: 11,
    label: 'ShopLot'
  },
  {
    value: 12,
    label: 'Land'
  }
];

const furnish = [
  {
    value: 'None',
    label: 'UnFurnish'
  },
  {
    value: 'Partial',
    label: 'Partly Furnish'
  },
  {
    value: 'Fully furnish',
    label: 'Fully Furnished'
  }
];

const location = [
  {
    value: '',
    label: 'Region'
  },
  {
    value: 'Johor',
    label: 'Johor'
  },
  {
    value: 'Melaka',
    label: 'Melaka'
  },
  {
    value: 'Kuala Lumpur',
    label: 'Kuala Lumpur'
  },
  {
    value: 'Selangor',
    label: 'Selangor'
  },
  {
    value: 'Penang',
    label: 'Penang'
  },
  {
    value: 'Pahang',
    label: 'Pahang'
  },
  {
    value: 'Sabah',
    label: 'Sabah'
  },
  {
    value: 'Sarawak',
    label: 'Sarawak'
  },
  {
    value: 'Terengganu',
    label: 'Terengganu'
  },
  {
    value: 'Kelantan',
    label: 'Kelantan'
  },
  {
    value: 'Kedah',
    label: 'Kedah'
  },
  {
    value: 'Perak',
    label: 'Perak'
  },
  {
    value: 'Perlis',
    label: 'Perlis'
  },
  {
    value: 'Putrajaya',
    label: 'Putrajaya'
  },
  {
    value: 'Labuan',
    label: 'Labuan'
  }
];

const propertyTitles = [
  {
    value: 'Land',
    label: 'Land'
  },
  {
    value: 'Strata',
    label: 'Strata'
  }
];

const otherInfo = [
  {
    value: '-',
    label: '-'
  },
  {
    value: 'Bumi Lot',
    label: 'Bumi Lot'
  },
  {
    value: 'Non Bumi Lot',
    label: 'Non Bumi Lot'
  },
  {
    value: 'Malay Reserved',
    label: 'Malay Reserved'
  }
];

const carPark = [
  {
    value: '0',
    label: '-'
  },
  {
    value: '1',
    label: '1'
  },
  {
    value: '2',
    label: '2'
  },
  {
    value: '3',
    label: '3'
  },
  {
    value: '4',
    label: '4'
  },
  {
    value: '5',
    label: '5'
  },
  {
    value: 'More-than-6',
    label: 'More than 6'
  }
];

const rentalDeposit = [
  {
    value: 'Zero Deposit',
    label: 'Zero Deposit'
  },
  {
    value: '0.5-Month',
    label: '0.5 Month'
  },
  {
    value: '1.0-Month',
    label: '1.0 Month'
  },
  {
    value: '1.5-Month',
    label: '1.5 Month'
  },
  {
    value: '2.0-Month',
    label: '2.0 Month'
  },
  {
    value: '2.5-Month',
    label: '2.5 Month'
  },
  {
    value: '3.0-Month',
    label: '3.0 Month'
  }
];

const MapLoader = withScriptjs(Map);

// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

const AddressForm = ({ shippingData, setShippingData, handleNext, setErrorIndex, editData, formFor }) => {
  const { user } = useAuth();
  const theme = useTheme();

  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  const initials = {
    category: editData?.category || 2,
    propertyType: editData?.propertyType || 6,
    tenure: editData?.tenure || true,
    furnishing: editData?.furnishing || 'Partial',
    amenities: editData?.amenities || '',
    title: editData?.title || '',
    description: editData?.description || '',
    price: editData?.price || '',
    phone: editData?.phone || user?.phone || '',
    location: editData?.location || 'Johor',
    city: editData?.city || 'Johor Bahru',
    lat: editData?.lat || '',
    lon: editData?.lon || '',
    video: editData?.video || '',
    slug: editData?.slug || '',
    bedrooms: editData?.bedrooms || 1,
    bathrooms: editData?.bathrooms || '1',
    address: editData?.address || '-',
    otherInfo: editData?.otherInfo || '-',
    size: editData?.size || '',
    carpark: editData?.carpark || '0',
    zipcode: editData?.zipcode || '-',
    state: editData?.state == null ? 'Available' : editData?.state
    // propertyTitle: editData?.propertyTitle || 'Land',
    // saleType: editData?.saleType || ''
    // floorRange: editData?.floorRange || '1'
    // rentalDeposit: editData?.rentalDeposit || '',
  };

  const check = (value) => {
    const slugTitle = slugify(value);
    return new Promise((resolve, reject) => {
      axios
        .get(`${BACKEND_PATH}/api/v1/inventory/${slugTitle}`)
        .then((res) => {
          if (res?.status == 200) {
            resolve(false);
          }
        })
        .catch((error) => {
          const resJson1 = JSON.stringify(error);
          const resParse1 = JSON.parse(resJson1);
          resolve(true);
        });
    });
  };

  const newListing = yup.object({
    title: yup
      .string()
      .min(8, 'Must be at least 8 characters')
      .max(100, 'Must be less  than 20 characters')
      .required('Title is required')
      .test(
        'title',
        'Title already in used', // <- key, message
        async (value) => {
          if (editData != null || editData != undefined) {
            return false;
          } else {
            const res = await check(value);

            return res;
          }
        }
      )
  });

  const updateLisitng = yup.object({
    title: yup.string().min(8, 'Must be at least 10 characters').max(100, 'Must be less  than 100 characters').required('Title is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initials,

    validationSchema: Boolean(editData) ? updateLisitng : newListing,

    onSubmit: async (values) => {
      const {
        slug,
        title,
        city,
        price,
        bedrooms,
        bathrooms,
        furnishing,
        video,
        category,
        propertyType,
        tenure,
        amenities,
        description,
        address,
        phone,
        location,
        lat,
        lon,
        otherInfo,
        size,
        zipcode,
        carpark,
        state
        // propertyTitle
        // floorRange,
        // saleType
        // rentalDeposit,
      } = values;

      setShippingData({
        slug: slugify(title),
        title: title,
        price: price,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        furnishing: furnishing,
        city: city,
        video: video,
        category: category,
        propertyType: propertyType,
        tenure: tenure,
        amenities: amenities,
        description: description,
        address: address,
        phone: phone,
        location: location,
        lat: lat,
        lon: lon,
        otherInfo: otherInfo,
        size: size,
        zipcode: zipcode,
        carpark: carpark,
        state: state
        // propertyTitle: propertyTitle
        // saleType: saleType
        // floorRange: floorRange
        // rentalDeposit: rentalDeposit,
      });

      handleNext();
    }
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} id="validation-forms">
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Property Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <FormControlSelect
              currencies={category}
              id="category"
              name="category"
              captionLabel="Category"
              value={formik.values.category}
              onChange={formik.handleChange}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControlSelect
              currencies={formik.values.category == 4 ? statusRent : statusSell}
              id="state"
              name="state"
              captionLabel="Status"
              value={formik.values.state}
              onChange={formik.handleChange}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControlSelect
              currencies={propertyTypes}
              id="propertyType"
              name="propertyType"
              captionLabel="Property Type"
              value={formik.values.propertyType}
              onChange={formik.handleChange}
              error={formik.touched.propertyType && Boolean(formik.errors.propertyType)}
              helperText={formik.touched.propertyType && formik.errors.propertyType}
              fullWidth
            />
          </Grid>

          {formik.values.category == 2 && (
            <>
              <Grid item xs={12} sm={12}>
                <FormControlSelect
                  currencies={tenures}
                  id="tenure"
                  name="tenure"
                  captionLabel="Tenure"
                  value={formik.values.tenure}
                  onChange={formik.handleChange}
                  error={formik.touched.tenure && Boolean(formik.errors.tenure)}
                  helperText={formik.touched.tenure && formik.errors.tenure}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  id="size"
                  name="size"
                  label="Size (sq.ft.)"
                  value={formik.values.size}
                  onChange={formik.handleChange}
                  error={formik.touched.size && Boolean(formik.errors.size)}
                  helperText={formik.touched.size && formik.errors.size}
                  fullWidth
                  required
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlSelect
                  currencies={otherInfo}
                  id="otherInfo"
                  name="otherInfo"
                  captionLabel="Other Info"
                  value={formik.values.otherInfo}
                  onChange={formik.handleChange}
                  error={formik.touched.otherInfo && Boolean(formik.errors.otherInfo)}
                  helperText={formik.touched.otherInfo && formik.errors.otherInfo}
                  fullWidth
                />
              </Grid>
            </>
          )}

          {/*
          Property Type
          Tenure
          Property Title
          Size (sq.ft.)
          Other Info
          Title
          Description
          Price
          Phone
          Property Location
          Area / City
          Map
          Feature Image
          Photos
          Videos
          */}

          <Grid item xs={12} sm={12}>
            <FormControlSelect
              currencies={furnish}
              id="furnishing"
              name="furnishing"
              captionLabel="Furnishing"
              value={formik.values.furnishing}
              onChange={formik.handleChange}
              error={formik.touched.furnishing && Boolean(formik.errors.furnishing)}
              helperText={formik.touched.furnishing && formik.errors.furnishing}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="amenities"
              name="amenities"
              label="Amenities"
              value={formik.values.amenities}
              onChange={formik.handleChange}
              error={formik.touched.amenities && Boolean(formik.errors.amenities)}
              helperText={formik.touched.amenities && formik.errors.amenities}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              fullWidth
            />
          </Grid>
          <Grid hidden item xs={12}>
            <TextField
              hidden
              id="zipcode"
              name="zipcode"
              label="Postcode"
              value={formik.values.zipcode}
              onChange={formik.handleChange}
              error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
              helperText={formik.touched.zipcode && formik.errors.zipcode}
              fullWidth
            />
          </Grid>
          <Grid hidden item xs={12}>
            <FormControlSelect
              hidden
              currencies={carPark}
              id="carpark"
              name="carpark"
              captionLabel="Carpark"
              type="number"
              value={formik.values.carpark}
              onChange={formik.handleChange}
              error={formik.touched.carpark && Boolean(formik.errors.carpark)}
              helperText={formik.touched.carpark && formik.errors.carpark}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="bedrooms"
              name="bedrooms"
              label="Bedrooms"
              value={formik.values.bedrooms}
              onChange={formik.handleChange}
              error={formik.touched.bedrooms && Boolean(formik.errors.bedrooms)}
              helperText={formik.touched.bedrooms && formik.errors.bedrooms}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="bathrooms"
              name="bathrooms"
              label="Bathrooms"
              value={formik.values.bathrooms}
              onChange={formik.handleChange}
              error={formik.touched.bathrooms && Boolean(formik.errors.bathrooms)}
              helperText={formik.touched.bathrooms && formik.errors.bathrooms}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              id="description"
              name="description"
              label="Descriptions"
              placeholder="Description"
              minRows={5}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              aria-label="empty textarea"
              style={{
                borderRadius: '8px',
                width: '-webkit-fill-available',
                borderColor: '#afafaf',
                padding: matchDownSM ? '3%' : '2%',
                fontFamily: 'inherit',
                overflow: 'unset'
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="price"
              name="price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              label={formik.values.category == 2 ? 'Price' : 'Price Per Month'}
              placeholder={formik.values.category == 2 ? 'Asking Price' : '1500'}
              helperText={formik.touched.price && formik.errors.price}
              error={formik.touched.price && Boolean(formik.errors.price)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="phone"
              name="phone"
              label="Phone"
              type="tel"
              placeholder="014644305"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControlSelect
              required
              fullWidth
              currencies={location}
              id="location"
              name="location"
              captionLabel="Location*"
              value={formik.values.location}
              onChange={formik.handleChange}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="city"
              name="city"
              label="City"
              type="text"
              placeholder="Area/City"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="video"
              name="video"
              label="Youtube"
              type="text"
              placeholder="Youtube Link"
              value={formik.values.video}
              onChange={formik.handleChange}
              error={formik.touched.video && Boolean(formik.errors.video)}
              helperText={formik.touched.video && formik.errors.video}
            />
          </Grid>
          {/* <Grid item xs={12} sm={12}>
                <FormControlSelect
                  currencies={propertyTitles}
                  id="propertyTitle"
                  name="propertyTitle"
                  captionLabel="Property Title"
                  value={formik.values.propertyTitle}
                  onChange={formik.handleChange}
                  error={formik.touched.propertyTitle && Boolean(formik.errors.propertyTitle)}
                  helperText={formik.touched.propertyTitle && formik.errors.propertyTitle}
                  fullWidth
                />
              </Grid> */}
          {/* <Grid hidden item xs={12}>
            <TextField
              hidden
              id="address"
              name="address"
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              fullWidth
            />
          </Grid> */}
          {/* <Grid hidden item xs={12}>
            <TextField
              hidden
              id="floorRange"
              name="floorRange"
              label="Floor Range"
              value={formik.values.floorRange}
              onChange={formik.handleChange}
              error={formik.touched.floorRange && Boolean(formik.errors.floorRange)}
              helperText={formik.touched.floorRange && formik.errors.floorRange}
              fullWidth
            />
          </Grid> */}
          {/* <Grid item xs={12}>
            <TextField
              id="map"
              name="map"
              label="Map*"
              type="text"
              placeholder="Adress"
              value={formik.values.map}
              onChange={formik.handleChange}
              error={formik.touched.map && Boolean(formik.errors.map)}
              helperText={formik.touched.map && formik.errors.map}
              fullWidth
            />
          </Grid> */}
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{ my: 3, ml: 1, color: 'white' }}
                  type="submit"
                  onClick={() => setErrorIndex(0)}
                >
                  Next
                </Button>
              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

AddressForm.propTypes = {
  shippingData: PropTypes.object,
  setShippingData: PropTypes.func,
  handleNext: PropTypes.func,
  setErrorIndex: PropTypes.func
};

export default AddressForm;
