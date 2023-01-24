import * as React from 'react';
import {
  MenuItem,
  Button,
  Menu,
  Stack,
  Typography,
  ListItemButton,
  Collapse,
  ListItemIcon,
  ListItemText,
  Checkbox,
  List
} from '@mui/material/';

import TuneIcon from '@mui/icons-material/Tune';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import { Router, useRouter } from 'next/router';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const propertyTypes = [
  {
    value: null,
    label: 'All'
  },
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

const location = [
  {
    value: null,
    label: 'All'
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

export default function FilterByState({ handleLoc, handleType }) {
  const [anchorel, setAnchorel] = React.useState(null);
  const [locationState, setLocation] = React.useState(null);
  const [typeState, setType] = React.useState(null);
  const [openSubMenu, setOpenSubMenu] = React.useState(true);
  const [paramMenu, setParamMenu] = React.useState('');

  const open = Boolean(anchorel);
  const router = useRouter();

  const handleClick = (event) => {
    setAnchorel(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorel(null);
  };

  const handleClickSubMenu = (param) => {
    setOpenSubMenu(!openSubMenu);
    setParamMenu(param);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={() => {
          router.reload(window.location.pathname);
        }}
        sx={{ color: '#b5a837 !important', backgroundColor: 'white !important', mr: 2 }}
        startIcon={<TuneIcon />}
      >
        Reset
      </Button>
      <Button
        variant="contained"
        color="secondary"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ backgroundColor: '#b5a837 important' }}
        startIcon={<TuneIcon />}
      >
        Filter
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorel}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        sx={{
          '& .MuiPopover-paper': {
            backgroundColor: 'rgba(0, 0, 0, 0.51)',
            boxShadow: '4px 10px 13px rgba(0, 0, 0, 0.25)',
            backdropFilter: 'blur(29px)',
            WebkitBackdropFilter: 'blur(29px)',
            overflow: 'auto',
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: '0.4em'
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
              p: 1
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#b5a837',
              borderRadius: '5px',
              position: 'relative',
              left: '20px',
              mr: 3
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#b5a837'
            }
          }
        }}
        PaperProps={{
          anchorEl: 'right',
          elevation: 0,
          disableScrollLock: false,
          sx: {
            maxHeight: 48 * 4.5,
            width: '20ch',
            color: 'white',
            backdropFilter: 'blur(29px)',
            backgroundColor: 'rgba(0, 0, 0, 0.51) ',
            boxShadow: '4px 10px 13px rgb(0 0 0 / 25%)',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            WebkitBackdropFilter: 'blur(29px)',
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
        <ListItemButton
          key={0}
          className="menuFilter"
          onClick={() => {
            handleClickSubMenu('type');
          }}
        >
          <ListItemIcon>
            <HomeWorkOutlinedIcon sx={{ color: '#b5a837' }} />
          </ListItemIcon>
          <ListItemText
            sx={{
              span: {
                color: '#b5a837 !important'
              }
            }}
            primary="Type"
          />
          {openSubMenu && paramMenu == 'type' ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openSubMenu && paramMenu == 'type'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {paramMenu == 'state' &&
              location?.map((item, index) => {
                return (
                  <>
                    <MenuItem
                      key={index}
                      onClick={() => {
                        handleLoc(item.value);
                        setLocation(item.value);
                      }}
                    >
                      <Checkbox
                        sx={{
                          pl: 0,
                          '& .MuiSvgIcon-root': {
                            color: '#b5a837'
                          }
                        }}
                        checked={locationState == item?.value}
                      />
                      <ListItemText
                        sx={{
                          span: {
                            color: '#b5a837 !important'
                          }
                        }}
                        primary="Type"
                      >
                        {item.label}
                      </ListItemText>
                    </MenuItem>
                  </>
                );
              })}

            {paramMenu == 'type' &&
              propertyTypes?.map((item, index) => {
                return (
                  <>
                    <MenuItem
                      key={index}
                      onClick={() => {
                        handleType({ value: item.value, label: item.label });
                        setType(item.value);
                      }}
                    >
                      <Checkbox
                        sx={{
                          pl: 0,
                          '& .MuiSvgIcon-root': {
                            color: '#b5a837'
                          }
                        }}
                        checked={typeState == item?.value}
                      />
                      <ListItemText
                        sx={{
                          '& .MuiListItemText-primary': {
                            color: 'white'
                          }
                        }}
                      >
                        {item.label}
                      </ListItemText>
                    </MenuItem>
                  </>
                );
              })}
          </List>
        </Collapse>

        <ListItemButton
          className="menuFilter"
          onClick={() => {
            handleClickSubMenu('state');
          }}
        >
          <ListItemIcon>
            <OutlinedFlagIcon sx={{ color: '#b5a837' }} />
          </ListItemIcon>
          <ListItemText
            sx={{
              span: {
                color: '#b5a837 !important'
              }
            }}
            primary="State"
          />
          {openSubMenu && paramMenu == 'state' ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openSubMenu && paramMenu == 'state'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {paramMenu == 'state' &&
              location?.map((item, index) => {
                return (
                  <>
                    <MenuItem
                      key={index}
                      onClick={() => {
                        handleLoc(item.value);
                        setLocation(item.value);
                      }}
                    >
                      <Checkbox
                        sx={{
                          pl: 0,
                          '& .MuiSvgIcon-root': {
                            color: '#b5a837'
                          }
                        }}
                        checked={locationState == item?.value}
                      />
                      <ListItemText
                        sx={{
                          '& .MuiListItemText-primary': {
                            color: 'white'
                          }
                        }}
                      >
                        {item.label}
                      </ListItemText>
                    </MenuItem>
                  </>
                );
              })}
          </List>
        </Collapse>
      </Menu>
    </>
  );
}
