import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Rating, TextField, Typography } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import AnimateButton from 'components/ui-component/extended/AnimateButton';
import { getListingById } from 'contexts/ApiListing';
import ValidationWizard from 'components/forms/forms-wizard/ValidationWizard';

// review state options
const reviewState = [
  {
    value: '1',
    label: 'Published'
  },
  {
    value: '2',
    label: 'Pending'
  },
  {
    value: '3',
    label: 'confirm'
  }
];

const ListingUpdate = ({ open, handleCloseDialog, productId }) => {
  // handle review status change
  const [currency, setCurrency] = useState('1');
  const handleSelectChange = (event) => {
    setCurrency(event.target.value);
  };

  // handle star rating
  const [value, setValue] = useState(2);

  const [productData, setProductData] = useState();

  const getProductId = async (id) => {
    setProductData();
    getListingById(id).then((res) => {
      setProductData(res);
    });
  };

  useEffect(() => {
    if (productId != null && productData == null) {
      getProductId(productId);
    }

    if (!open) {
      setProductData();
    }
  }, [productId, open, productData]);

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      sx={{
        '&>div:nth-of-type(3)': {
          '&>div': {
            maxWidth: 'xl'
          }
        }
      }}
    >
      {open && (
        <>
          {/* <DialogTitle>Update Property</DialogTitle> */}
          <DialogContent>
            <ValidationWizard formFor="UpdateListing" updateProperty={productData} />
          </DialogContent>
          <DialogActions>
            <AnimateButton>
              <Button variant="contained" onClick={handleCloseDialog}>
                Close
              </Button>
            </AnimateButton>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

ListingUpdate.propTypes = {
  open: PropTypes.bool,
  handleCloseDialog: PropTypes.func
};

export default ListingUpdate;
