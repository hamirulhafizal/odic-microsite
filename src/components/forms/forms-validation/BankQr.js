import {
  Box,
  Button,
  ClickAwayListener,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  styled,
  Tooltip,
  tooltipClasses,
  Typography,
  Zoom
} from '@mui/material';
import React from 'react';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { numberWithCommas } from 'utils/helper';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const HtmlTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(97, 97, 97, 0.9)',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  }
}));

const BankQr = ({ value }) => {
  const [open, setOpen] = React.useState(false);
  const [openBank, setOpenBank] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleBankTooltipClose = () => {
    setOpenBank(false);
  };

  const handleBankTooltipOpen = () => {
    navigator.clipboard.writeText('25101200032810');
    setOpenBank(true);
  };

  console.log('openBank', openBank);

  return (
    <>
      <Box
        flexDirection={'column'}
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between'
        }}
      >
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'space-between',
            width: 'inherit'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              position: 'relative',
              top: '1px',
              color: '#28933F'
            }}
          >
            RHB
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Typography
              variant="h4"
              sx={{
                backgroundColor: 'white',
                color: 'black',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'white'
                }
              }}
            >
              25101200032810
            </Typography>

            <ClickAwayListener onClickAway={handleBankTooltipClose}>
              <IconButton
                size="small"
                aria-label="delete"
                variant="contained"
                sx={{
                  backgroundColor: '#b5a837',
                  ml: 1,
                  boxShadow: '0px 3px 1px -2px rgb(0 0 0/20%) , 0px 2px 2px 0px rgb(0 0 0/14%) , 0px 1px 5px 0px rgb(0 0 0/12%)'
                }}
                onClick={() => {
                  handleBankTooltipOpen();
                }}
              >
                <HtmlTooltip
                  arrow
                  placement="bottom-end"
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  onClose={handleBankTooltipClose}
                  open={openBank}
                  title={
                    <>
                      <Typography
                        variant="h5"
                        sx={{
                          color: 'white'
                        }}
                      >
                        Copied !
                      </Typography>
                    </>
                  }
                >
                  <ContentCopyIcon
                    sx={{
                      color: 'white',
                      '&:hover': {
                        color: '#b5a837'
                      }
                    }}
                    fontSize="small"
                  />
                </HtmlTooltip>
              </IconButton>
            </ClickAwayListener>
          </Box>
        </Stack>

        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 'inherit',
            textAlign: 'start'
          }}
        >
          <Box>
            <List sx={{ p: 0 }}>
              <ListItem disablePadding>
                <ListItemText
                  sx={{
                    textAlign: 'justify'
                  }}
                  primary={
                    <>
                      <b>Bank Detail: </b>
                      {`Bank Account Address: 14&16 Jalan Padi Emas 6/1 Bandar Baru Uda 81200 JB`}
                    </>
                  }
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText
                  primary={
                    <>
                      <b>Swift Code: </b>RHBBMYKL
                    </>
                  }
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText
                  primary={
                    <>
                      <b>Bank Code:</b> 053
                    </>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default BankQr;
