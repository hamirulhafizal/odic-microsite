import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { CardContent, IconButton, Stack, Typography, Button } from '@mui/material';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'store';
import { getProducts, getSlotData, resetAllSlot } from 'store/slices/product';

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
  const { slot } = useSelector((state) => state.product);

  // const fetchPrimaryPokemonData = async (categoryState, locationState, type, page) => {
  //   try {
  //     const querySet = { username: user?.user_name };
  //     setLoading(true);
  //     await getListsbyQuery(querySet, page).then((response) => {
  //       let data = response.results;
  //       setRows(data);
  //       setLoading(false);
  //     });

  //   } catch (err) {
  //     console.log(err);
  //     setLoading(false);
  //     setMessage(true);
  //   }
  // };

  const handleSwipe = () => {
    const btnAdd = document.getElementById('ButtonAddInvest');
    btnAdd.click();
  };

  // const handleClear = () => {
  //   dispatch(resetAllSlot());
  // };

  // React.useEffect(() => {
  //   fetchPrimaryPokemonData(categoryState, locationState, typeState.value, 1);
  // }, []);

  // React.useEffect(() => {
  //   dispatch(getProducts(user?.user_name));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [paging]);

  return (
    <>
      <MainCard
        // title={
        //   <>
        //     <Stack
        //       sx={{
        //         display: 'flex',
        //         flexDirection: 'row',
        //         justifyContent: 'center',
        //         alignItems: 'center'
        //       }}
        //     >
        //       <ListIcon sx={{ mr: 1 }} />
        //       <Typography variant="h4">INVESTMENT BOARD</Typography>
        //     </Stack>
        //   </>
        // }
        title="INVESTMENT BOARD"
        content={true}
        contentSX={{ p: 0 }}
        sx={{ textAlign: 'center', p: 0, mb: 2 }}
      >
        <CardContent sx={{ p: 3 }}>
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
              {/* <Button onClick={handleClear} variant="contained" sx={{ mb: 2 }}>
                CLEAR ALL
              </Button> */}
              <Stack
                direction="column"
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {/* <CardSlot /> */}
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
