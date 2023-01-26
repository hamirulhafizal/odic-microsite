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

const HtmlTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(97, 97, 97, 0.9)',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  }
}));

const InvestFormula = ({ value }) => {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const checkRoi = (value) => {
    let roi;

    if (value <= 10000) roi = 25;
    if (value > 1000) roi = 30;
    console.log('roi', roi);

    return roi;
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
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 'inherit'
          }}
        >
          <Typography variant="h5">RM {numberWithCommas(value)}</Typography>
          <Typography variant="h5">{value / 1000} Slot</Typography>
        </Stack>

        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 'inherit'
          }}
        >
          <Typography variant="h3">RM {numberWithCommas(value * 0.33)}</Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <ClickAwayListener onClickAway={handleTooltipClose}>
              <IconButton
                onClick={handleTooltipOpen}
                sx={{
                  p: 0
                }}
              >
                <HtmlTooltip
                  arrow
                  placement="bottom-end"
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  onClose={handleTooltipClose}
                  open={open}
                  title={
                    <>
                      <Stack
                        sx={{
                          pt: 2,
                          color: 'white',
                          textAlign: 'center'
                        }}
                      >
                        Return On Investment (ROI)
                      </Stack>

                      <List
                        sx={{
                          width: 'auto'
                        }}
                      >
                        <ListItem
                          disablePadding
                          sx={{
                            textAlign: 'center',
                            flexDirection: 'column'
                          }}
                        >
                          <ListItemText primary="RM10K below ROI 25%" />
                          <br />
                          <ListItemText primary="RM10-30K range ROI 27%" />
                          <br />
                          <ListItemText primary="RM30K above ROI 30%" />
                        </ListItem>
                      </List>
                    </>
                  }
                >
                  <InfoOutlinedIcon sx={{ fontSize: '70%', p: 0, mr: 0.5 }} />
                </HtmlTooltip>
              </IconButton>
            </ClickAwayListener>
            <Typography
              variant="h3"
              sx={{
                position: 'relative',
                top: '1px'
              }}
            >
              ROI {checkRoi(value)}%
            </Typography>
          </Box>
        </Stack>

        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 'inherit'
          }}
        >
          <Typography variant="h5">Lock duration </Typography>

          <Typography variant="h5">14 Month</Typography>
        </Stack>
      </Box>
    </>
  );
};

export default InvestFormula;
