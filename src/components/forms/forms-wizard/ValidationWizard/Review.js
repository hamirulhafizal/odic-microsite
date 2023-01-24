import * as React from 'react';

// material-ui
import { CardMedia, Grid, List, ListItem, ListItemText, TextareaAutosize, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from '@mui/styles';
import { Box } from '@mui/material';
import { numberWithCommas } from 'utils/helper';

// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

// styles
const ImageWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '4px',
  cursor: 'pointer',
  width: '100%',
  height: 'auto',
  objectFit: 'contain',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.background.default,
  '& > svg': {
    verticalAlign: 'sub',
    marginRight: 6
  }
}));

export default function Review({ shippingData, imageProperty, previewData, editData }) {
  const theme = useTheme();

  const [avatarPreview, setAvatarPreview] = React.useState();

  const { fileName, type, size, imgE } = imageProperty;

  const {
    category,
    propertyType,
    tenure,
    furnishing,
    amenities,
    title,
    description,
    price,
    phone,
    location,
    city,
    lat,
    lon,
    featureImage,
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
    video
    // rentalDeposit,
    // carpark,
    // saleType
  } = editData != null ? editData : previewData;

  const preViewImage = (item) => {
    if (item != undefined && typeof item !== 'string') {
      var src = URL?.createObjectURL(item);
      setAvatarPreview(src);
    } else {
      setAvatarPreview(item);
    }
  };

  React.useEffect(() => {
    if (imageProperty !== undefined || imageProperty !== null || featureImage !== null || editData?.previewData !== null) {
      preViewImage(previewData?.featureImage ? previewData?.featureImage : featureImage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgE, imageProperty, previewData, editData]);

  return (
    <>
      <Typography variant="h3" gutterBottom sx={{ mb: 2 }}>
        Review Property Detail
      </Typography>

      <List disablePadding>
        {[shippingData].map((product, key) => (
          <Box key={key}>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary={'Title'} secondary={title} />
            </ListItem>

            <ListItem sx={{ py: 1, px: 0 }}>
              {category == 2 && <ListItemText primary={'Category'} secondary={'Sale'} />}
              {category == 4 && <ListItemText primary={'Category'} secondary={'Rent'} />}
            </ListItem>

            <ListItem sx={{ py: 1, px: 0, flexWrap: 'wrap' }} key={product?.title}>
              <ListItemText
                primary={'Price'}
                secondary={category == 2 ? `RM ${numberWithCommas(product?.price)}` : `RM ${product?.price} / month`}
              />
            </ListItem>

            <ListItem sx={{ py: 1, px: 0, flexWrap: 'wrap' }} key={product?.title}>
              <ListItemText primary={'Description'} />

              <TextareaAutosize
                InputProps={{ readOnly: true, disableUnderline: true }}
                label="Description"
                disableUnderline
                readOnly
                disabled
                value={product?.description}
                aria-label="empty textarea"
                style={{
                  width: '100%',
                  cursor: 'default',
                  border: '0px',
                  fontFamily: 'inherit',
                  resize: 'none',
                  backgroundColor: 'transparent',
                  overflow: 'unset',
                  color: 'black'
                }}
              />
            </ListItem>
          </Box>
        ))}

        <ListItem sx={{ py: 1, px: 0, flexWrap: 'wrap' }}>
          <ListItemText primary={'Cover Image'} />
        </ListItem>

        <ImageWrapper>
          <CardMedia component="img" image={avatarPreview || ''} title="Product" />
        </ImageWrapper>
      </List>
    </>
  );
}
