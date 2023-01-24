import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { MenuItem, Button, Menu } from '@mui/material/';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import TuneIcon from '@mui/icons-material/Tune';

import SwipeableEdgeDrawer from './SwipeableEdgeDrawer';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder'
];

export default function FilterByState(param) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerEL, setDrawerEL] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDrawer = () => {
    setDrawerEL(true);
  };

  //   const [personName, setPersonName] = React.useState([]);

  //   const handleChange = (event) => {
  //     const {
  //       target: { value }
  //     } = event;
  //     setPersonName(
  //       // On autofill we get a stringified value.
  //       typeof value === 'string' ? value.split(',') : value
  //     );
  //   };

  //   console.log('personName', personName);

  return (
    <div>
      {/* <Button
        variant="text"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        // disableElevation
        // variant="contained"
        // color="secondary"
        // sx={{ color: 'white' }}
        sx={{
          color: '#b5a837',

          ':hover': {
            color: '#b5a837',
            backgroundColor: 'white'
          }
        }}
        endIcon={<TuneIcon />}
      >
        Filter
      </Button> */}

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        PaperProps={{
          anchorEl: 'right',
          elevation: 0,
          sx: {
            color: 'white',
            backdropFilter: 'blur(29px)',
            backgroundColor: 'rgba(0, 0, 0, 0.51) ',
            boxShadow: '4px 10px 13px rgb(0 0 0 / 25%)',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              color: 'white',
              backdropFilter: 'blur(29px)',
              backgroundColor: 'transparent',
              boxShadow: '4px 10px 13px rgb(0 0 0 / 25%)',
              content: '""',
              display: 'block',
              position: 'absolute',
              top: -5,
              right: 10,
              width: 0,
              height: 0,
              border: '5px solid transparent',
              borderTop: 0,
              borderBottom: '5px solid rgba(0, 0, 0, 0.51)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleOpenDrawer}>State</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      {/* <FormControl sx={{ m: 1, width: 150 }}>
        <InputLabel id="demo-multiple-checkbox-label">State</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}

      {/* {drawerEL && <SwipeableEdgeDrawer open={drawerEL} />} */}
    </div>
  );
}
