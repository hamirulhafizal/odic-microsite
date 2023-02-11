import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { CardContent, IconButton, Stack, Typography, Button } from '@mui/material';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'store';
import { getProducts } from 'store/slices/product';

// import { deleteListingById, getListsbyQuery } from 'contexts/ApiListing';
import { dispatch } from '../../store/index';
import useAuth from 'hooks/useAuth';

import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import BottomAppBar from 'components/board/BottomAppBar';
import CardSlot from 'components/board/CardSlot';

const Board = () => {
  const theme = useTheme();

  const { user } = useAuth();

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [paging, setPagging] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const { products, product, slot } = useSelector((state) => state.product);

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
  const [slotState, setSlot] = React.useState({ resitUpload: null, aggrement: null, investVal: null });

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

  const handleSlot = () => {
    const resitUpload = localStorage.getItem('resitUpload');
    const aggrement = localStorage.getItem('aggrement');
    const investVal = localStorage.getItem('investVal');

    setSlot({ resitUpload, aggrement, investVal });
  };

  React.useEffect(() => {
    slotState?.aggrement == undefined && handleSlot();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // React.useEffect(() => {
  //   fetchPrimaryPokemonData(categoryState, locationState, typeState.value, 1);
  // }, []);

  // React.useEffect(() => {
  //   dispatch(getProducts(user?.user_name));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [paging]);

  console.log('slot-->', slot);

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
        <CardContent>
          {slot?.aggrement == undefined ? (
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
                <CardSlot></CardSlot>
              </Stack>
            </>
          )}
        </CardContent>
      </MainCard>

      <BottomAppBar />
    </>
  );
};

Board.Layout = 'authGuard';
export default Board;
