// material-ui
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextareaAutosize,
  Typography,
  useMediaQuery,
  Stack
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

const propertyType = (item) => {
  if (item == 5) {
    return 'Apartment';
  }
  if (item == 6) {
    return 'Landed House';
  }

  if (item == 7) {
    return 'Private Room';
  }

  if (item == 8) {
    return 'Factory';
  }

  if (item == 9) {
    return 'Office';
  }

  if (item == 10) {
    return 'Hotel/Resort';
  }

  if (item == 11) {
    return 'ShopLot';
  }

  if (item == 12) {
    return 'Land';
  }
  if (item == null) {
    return null;
  }
};

const furnishing = (item) => {
  if (item == 'Fully furnish') {
    return 'Fully Furnish';
  }
  if (item == 'Partial') {
    return 'Partly Furnish';
  }
  if (item == 'None') {
    return 'UnFurnish';
  }
};

// ==============================|| PRODUCT DETAILS - SPECIFICATION ||============================== //

const Specification = ({ product }) => {
  const productData = product['product'];
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6}>
        {/* <Typography variant="h4" sx={{ pb: 1.5 }}>
          General
        </Typography> */}
        <TableContainer>
          <Table sx={{ maxWidth: 'auto' }} size="small" aria-label="simple table">
            <TableBody>
              <TableRow sx={{ '& td, & th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
                    Bedrooms
                  </Typography>
                </TableCell>
                <TableCell>{productData?.bedrooms}</TableCell>
              </TableRow>
              <TableRow sx={{ '& td, & th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
                    Bathrooms
                  </Typography>
                </TableCell>
                <TableCell>{parseInt(productData?.bathrooms)}</TableCell>
              </TableRow>

              {productData?.category == 2 && (
                <TableRow sx={{ '& td, & th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                      Tenure
                    </Typography>
                  </TableCell>
                  <TableCell>{productData?.tenure ? 'Leasehold' : 'Freehold'}</TableCell>
                </TableRow>
              )}

              <TableRow sx={{ '& td, & th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
                    Type
                  </Typography>
                </TableCell>
                <TableCell>{propertyType(productData?.propertyType)}</TableCell>
              </TableRow>

              <TableRow sx={{ '& td, & th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
                    Furnishing
                  </Typography>
                </TableCell>
                <TableCell>{furnishing(productData?.furnishing)}</TableCell>
              </TableRow>

              {productData?.otherInfo !== '-' && productData?.otherInfo !== null && (
                <TableRow sx={{ '& td, & th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                      Other Info
                    </Typography>
                  </TableCell>
                  <TableCell>{productData?.otherInfo}</TableCell>
                </TableRow>
              )}

              {productData?.description !== '' && (
                <TableRow sx={{ '& td, & th': { border: 0 }, display: matchDownSM ? 'none' : '' }}>
                  <TableCell sx={{ display: 'block' }} component="th" scope="row">
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                      Description
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <TextareaAutosize
                      inputProps={{ readOnly: true }}
                      label="Description"
                      multiline
                      rows={5}
                      value={productData?.description}
                      disableUnderline
                      disabled
                      readOnly
                      aria-label="empty textarea"
                      style={{
                        width: '100%',
                        cursor: 'default',
                        border: '0px',
                        resize: 'none',
                        fontFamily: 'inherit',
                        overflow: 'unset',
                        cursor: 'default',
                        backgroundColor: 'white'
                      }}
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {productData?.description !== '' && (
            <Stack sx={{ padding: '6px 16px ', width: '100%', display: matchDownSM ? 'flex' : 'none' }}>
              <Typography variant="caption" sx={{ fontWeight: 500 }}>
                Description
              </Typography>
              <TextareaAutosize
                InputProps={{ readOnly: true, disableUnderline: true }}
                label="Description"
                multiline
                rows={5}
                value={productData?.description}
                disable
                aria-label="empty textarea"
                style={{
                  width: '100%',
                  cursor: 'default',
                  border: '0px',
                  fontFamily: 'inherit',
                  overflow: 'unset',
                  resize: 'none'
                }}
              />
            </Stack>
          )}
        </TableContainer>
      </Grid>

      {/* <Grid item xs={12} lg={6}>
        <Typography variant="h4" sx={{ pb: 1.5 }}>
          In The Box
        </Typography>
        <TableContainer>
          <Table sx={{ maxWidth: 280 }} size="small" aria-label="simple table">
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.key} sx={{ '& td, & th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                      {row.key}
                    </Typography>
                  </TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid> */}
    </Grid>
  );
};

export default Specification;
