import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import NewInvestForms from '../../components/forms/forms-validation/NewInvestForms';

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800]
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)'
}));

function SwipeableEdgeDrawer({ open, handleToggle }) {
  const drawerBleeding = 0;

  return (
    <>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(80% - ${drawerBleeding}px)`,
            overflow: 'visible',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
          }
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={handleToggle(false)}
        onOpen={handleToggle(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            visibility: 'visible',
            right: 0,
            left: 0,
            pt: 5,
            textAlign: 'center'
          }}
        >
          <Puller />
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            pt: 5,
            height: '100%',
            overflow: 'auto',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <Typography variant="h3" sx={{ color: 'text.secondary' }}>
            How much Slot would you like to invest ?
          </Typography>
          {/* <Skeleton variant="rectangular" height="100%" /> */}
          <NewInvestForms />
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
}

SwipeableEdgeDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
};

export default SwipeableEdgeDrawer;
