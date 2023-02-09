import PropTypes from 'prop-types';
import * as React from 'react';
import Link from 'Link';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  CardContent,
  Checkbox,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  Tab,
  Tabs,
  Box,
  useMediaQuery,
  CircularProgress
} from '@mui/material';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';

// third-party
import { format } from 'date-fns';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';
import Avatar from 'components/ui-component/extended/Avatar';
import Chip from 'components/ui-component/extended/Chip';
import { useDispatch, useSelector } from 'store';
import { getProducts, getSlotData, resetAllSlot } from 'store/slices/product';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import useAuth from 'hooks/useAuth';
import ReviewEdit from 'components/application/customer/ProductReview/ReviewEdit';
import ListingUpdate from './ListingUpdate';

import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { deleteListingById, getListsbyQuery } from 'contexts/ApiListing';
import { dispatch } from '../../store/index';
import { openSnackbar } from 'store/slices/snackbar';
import { numberWithCommas } from 'utils/helper';

import BottomAppBar from './BottomAppBar';

import AddIcon from '@mui/icons-material/Add';
const prodImage = '/assets/images/e-commerce';

import ListIcon from '@mui/icons-material/List';
import CardSlot from 'components/board/CardSlot';

// table sort
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const getComparator = (order, orderBy) =>
  order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// table header options
const headCells = [
  {
    id: 'cover',
    numeric: false,
    label: 'Cover Photo',
    align: 'center'
  },
  {
    id: 'title',
    numeric: false,
    label: 'Title',
    align: 'center'
  },
  {
    id: 'price',
    numeric: true,
    label: 'Price',
    align: 'center'
  },
  {
    id: 'location',
    numeric: false,
    label: 'Location',
    align: 'center'
  },
  {
    id: 'propertyType',
    numeric: false,
    label: 'Property Type',
    align: 'center'
  },
  {
    id: 'bathrooms',
    numeric: true,
    label: 'Bathrooms',
    align: 'center'
  },

  {
    id: 'bedrooms',
    numeric: true,
    label: 'Bedrooms',
    align: 'center'
  },

  {
    id: 'status',
    numeric: true,
    label: 'Status',
    align: 'center'
  }
];

// ==============================|| TABLE HEADER TOOLBAR ||============================== //

const EnhancedTableToolbar = ({ numSelected }) => (
  <Toolbar
    sx={{
      p: 0,
      pl: 2,
      pr: 1,
      color: numSelected > 0 ? 'secondary.main' : 'inherit'
    }}
  >
    {numSelected > 0 ? (
      <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="h4" component="div">
        {numSelected} Selected
      </Typography>
    ) : (
      <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
        Nutrition
      </Typography>
    )}

    {numSelected > 0 && (
      <Tooltip title="Delete">
        <IconButton size="large">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    )}
  </Toolbar>
);

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

// ==============================|| TABLE HEADER ||============================== //

function EnhancedTableHead({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, theme, selected }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox" sx={{ pl: 3 }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell> */}
        {numSelected > 0 && (
          <TableCell padding="none" colSpan={7}>
            <EnhancedTableToolbar numSelected={selected.length} />
          </TableCell>
        )}
        {numSelected <= 0 &&
          headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.align}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Typography component="span" sx={{ display: 'none' }}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Typography>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        {numSelected <= 0 && (
          <TableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
            <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : 'grey.900' }}>
              Action
            </Typography>
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  theme: PropTypes.object,
  selected: PropTypes.array,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

// ==============================|| PRODUCT LIST ||============================== //

const handleDelete = (index) => {
  deleteListingById(index).then((res) => {
    const deleteRow = document.getElementById(`row-${index}`);
    deleteRow?.remove();

    dispatch(
      openSnackbar({
        open: true,
        message: 'Your list has been successfully Deleted.',
        variant: 'alert',
        alert: {
          color: 'error'
        },
        close: false
      })
    );
  });
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
};

const Listing = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useAuth();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [paging, setPagging] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const { slot } = useSelector((state) => state.product);

  const [categoryState, setCategory] = React.useState(0);
  const [locationState, setLocation] = React.useState(null);
  const [typeState, setType] = React.useState({ value: null, label: 'all' });
  const [titleState, setTitle] = React.useState(null);

  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [productEditId, setProductEditId] = React.useState(null);
  // open dialog to edit review
  const [open, setOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [isMessage, setMessage] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDialog = (index) => {
    setProductEditId(index);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setProductEditId();
    setOpen(false);
    dispatch(getProducts(user?.user_name));
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const filterByCategory = (param) => {
    return rows
      ?.slice(0)
      .reverse()
      .filter((item) => {
        return item.category == param;
      });
  };

  const handleSearch = (event) => {
    const newString = event.target.value;
    setSearch(newString || '');

    if (newString) {
      const newRows = rows.filter((row) => {
        let matches = true;

        const properties = ['name', 'description', 'rating', 'salePrice', 'offerPrice', 'gender'];
        let containsQuery = false;

        properties?.forEach((property) => {
          if (row[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
            containsQuery = true;
          }
        });

        if (!containsQuery) {
          matches = false;
        }
        return matches;
      });
      setRows(newRows);
    } else {
      getProducts();
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedId = rows.map((n) => n.name);
      setSelected(newSelectedId);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    if (event.target.value) setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const propertyTypeData = (num) => {
    if (num == 5) return 'Apartment';
    if (num == 6) return 'Landed House';
    if (num == 7) return 'Private Room';
    if (num == 8) return 'Factory';
    if (num == 9) return 'Office';
    if (num == 10) return 'Hotel/Resort';
    if (num == 11) return 'ShopLot';
    if (num == 12) return 'Land';
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;

  const fetchPrimaryPokemonData = async (categoryState, locationState, type, page) => {
    try {
      const querySet = { username: user?.user_name };
      setLoading(true);
      await getListsbyQuery(querySet, page).then((response) => {
        let data = response.results;
        setRows(data);
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      setMessage(true);
    }
  };

  const handleSwipe = () => {
    const btnAdd = document.getElementById('ButtonAddInvest');
    btnAdd.click();
  };

  const handleClear = () => {
    dispatch(resetAllSlot());
  };

  React.useEffect(() => {
    fetchPrimaryPokemonData(categoryState, locationState, typeState.value, 1);

    // slotState?.aggrement == undefined && handleSlot();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    dispatch(getProducts(user?.user_name));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging]);

  return (
    <>
      <MainCard
        title={
          <>
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <ListIcon sx={{ mr: 1 }} />
              <Typography variant="h4">INVESTMENT BOARD</Typography>
            </Stack>
          </>
        }
        content={true}
        contentSX={{ p: 0 }}
        sx={{ textAlign: 'center', p: 0, mb: 2 }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* {products?.length != 0 && (
            <>
              <Stack
                direction="column"
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Typography
                  variant="h4"
                  onClick={() => {
                    handleSwipe();
                  }}
                >
                  Start
                </Typography>
                <IconButton
                  onClick={() => {
                    handleSwipe();
                  }}
                  aria-label="delete"
                  sx={{
                    mt: 1,
                    maxWidth: 'max-content',
                    backgroundColor: '#b5a837',
                    boxShadow: '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)',
                    '&:hover': {
                      backgroundColor: '#b5a837'
                    }
                  }}
                  size="small"
                >
                  <AddIcon sx={{ color: 'white' }} fontSize="small" />
                </IconButton>
              </Stack>
            </>
          )} */}

          {slot.length == 0 ? (
            <Stack
              direction="column"
              sx={{
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography
                variant="h4"
                onClick={() => {
                  handleSwipe();
                }}
              >
                Start
              </Typography>
              <IconButton
                onClick={() => {
                  handleSwipe();
                }}
                aria-label="delete"
                sx={{
                  mt: 1,
                  maxWidth: 'max-content',
                  backgroundColor: '#b5a837',
                  boxShadow: '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)',
                  '&:hover': {
                    backgroundColor: '#b5a837'
                  }
                }}
                size="small"
              >
                <AddIcon sx={{ color: 'white' }} fontSize="small" />
              </IconButton>
            </Stack>
          ) : (
            <>
              <Button onClick={handleClear} variant="contained" sx={{ mb: 2 }}>
                CLEAR ALL
              </Button>
              <Stack
                direction="column"
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <CardSlot />
              </Stack>
            </>
          )}
        </CardContent>
      </MainCard>

      {/* <ListingUpdate open={open} productId={productEditId} handleCloseDialog={handleCloseDialog} /> */}

      <BottomAppBar />
    </>
  );
};
Listing.Layout = 'authGuard';
export default Listing;
