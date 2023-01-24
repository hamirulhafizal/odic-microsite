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

import { Checkbox, FormControlLabel, Grid } from '@mui/material';

const location = [
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

const drawerBleeding = 0;

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

function SwipeableEdgeDrawer(props) {
  const { window, drawerEL } = props;
  const [open, setOpen] = React.useState(null);

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
    checkedD: false,
    checkedE: false,
    checkedF: false
  });

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

  const handleChangeState = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(80% - ${drawerBleeding}px)`,
            overflow: 'visible',
            paddingTop: '5%',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8
          }
        }}
      />
      <Box sx={{ textAlign: 'center', pt: 1 }}>
        <Button onClick={toggleDrawer(true)}>Open</Button>
      </Box>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true
        }}
      >
        <StyledBox
          sx={{
            position: 'relative',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0
          }}
        >
          <Puller />
          <Box>
            <Typography sx={{ p: 2, color: 'text.secondary' }}>Filter By State</Typography>
          </Box>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto'
          }}
        >
          <Grid container spacing={0}>
            <Grid item xs={12}>
              {location?.map((item, key) => {
                <FormControlLabel
                  key={key}
                  control={<Checkbox checked={state.checkedA} onChange={handleChangeState} name={`{item?.label}`} color="primary" />}
                  label={`${item?.label}`}
                />;
              })}
            </Grid>

            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={state.checkedB} onChange={handleChangeState} name="checkedB" color="primary" />}
                label="Make YouTube Video"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={state.checkedC} onChange={handleChangeState} name="checkedC" color="primary" />}
                label="Create Banner"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={state.checkedD} onChange={handleChangeState} name="checkedD" color="primary" />}
                label="Upload Project"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={state.checkedE} onChange={handleChangeState} name="checkedE" color="primary" />}
                label="Update Task"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={state.checkedF} onChange={handleChangeState} name="checkedF" color="primary" />}
                label="Task Issue"
              />
            </Grid>
          */}
            {/* <Skeleton variant="rectangular" height="100%" /> */}
          </Grid>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
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
