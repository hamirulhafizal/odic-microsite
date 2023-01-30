import {
  Avatar,
  Box,
  ClickAwayListener,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  styled,
  Tooltip,
  tooltipClasses,
  Typography
} from '@mui/material';
import React from 'react';

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

const BankQr = ({ value, children }) => {
  const [openBank, setOpenBank] = React.useState(false);

  const handleBankTooltipClose = () => {
    setOpenBank(false);
  };

  const handleBankTooltipOpen = () => {
    navigator.clipboard.writeText('25101200032810');
    setOpenBank(true);
  };

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
            variant="h5"
            sx={{
              backgroundColor: 'white',
              color: 'black',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'white'
              }
            }}
          >
            Bank Account No:
          </Typography>
          <Avatar
            src="assets/images/rhb-logo.png"
            style={{
              width: '30%',
              height: 'auto',
              borderRadius: '0px',
              backgroundColor: 'transparent'
            }}
          />

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
                  boxShadow: '0px 3px 1px -2px rgb(0 0 0/20%) , 0px 2px 2px 0px rgb(0 0 0/14%) , 0px 1px 5px 0px rgb(0 0 0/12%)',
                  '&:hover': {
                    backgroundColor: 'green',
                    color: 'white !important'
                  }
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
                        color: 'white !important'
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
            textAlign: 'start',
            pt: 2
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

          {children}
        </Stack>
      </Box>
    </>
  );
};

export default BankQr;
