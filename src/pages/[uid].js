import React, { useEffect, useState } from 'react';
import { useRouter, withRouter } from 'next/router';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  Badge,
  TextareaAutosize,
  Menu,
  MenuItem,
  Button,
  Box,
  ClickAwayListener
} from '@mui/material';
import Link from 'Link';

// project imports
import Avatar from 'components/ui-component/extended/Avatar';
import ImagePlaceholder from 'components/ui-component/cards/Skeleton/ImagePlaceholder';
import AppBar from 'components/ui-component/extended/AppBar';
import FooterPage from 'components/landingpage/Footer';
import Error from './404';

//third party
import { motion } from 'framer-motion';

// assets

import { BACKEND_PATH } from 'config';
import { styled } from '@mui/system';

import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import VerifiedIcon from '@mui/icons-material/Verified';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import ShareIcon from '@mui/icons-material/Share';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import { WhatsappShareButton, TelegramShareButton, FacebookShareButton } from 'next-share';

import { QRCode } from 'react-qrcode-logo';

import TypeTabs from 'components/ui-elements/basic/UITabs/TypeTabs';
import { wrapper } from 'store';
import { useSelector } from 'store';

import { setUser } from 'store/slices/user';

import autosize from 'autosize';
import { useDispatch } from 'react-redux';
const Cover = '/assets/images/profile/img-profile-bg.png';
const images1 = '/assets/images/landing/living-room-with-yellow.png';
const images2 = '/assets/images/landing/footerBg-1.png';

var mainOrigin = typeof window !== 'undefined' ? window?.location?.origin : null;

const HeaderWrapper = styled('div')(({ theme }) => ({
  paddingTop: 30,
  overflowX: 'hidden',
  [theme.breakpoints.down('md')]: {
    paddingTop: 0
  }
}));

const SecondWrapper = styled('div')(({ theme }) => ({
  backgroundImage: `url(${images2})`,
  backgroundSize: 'cover'
}));

AgentProfile.getInitialProps = wrapper.getInitialPageProps((store) => async (context) => {
  const uids = context.query.uid;

  const userData1 = await fetch(`${BACKEND_PATH}/api/v1/profile/${uids}`)
    .then((response) => response.json())
    .then((json) => {
      return json;
    });

  store.dispatch(setUser({ userData: [userData1] }));

  return {
    userData: userData1
  };
});

function AgentProfile() {
  const { userData } = useSelector((state) => state.user);
  const agent = userData?.userData[0];
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product);

  const theme = useTheme();
  const router = useRouter();
  const [error, setError] = useState(false);

  const [isLoading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerEL, setDrawerEL] = useState(null);

  const open = Boolean(anchorEl);

  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  const defaultImage = 'https://onedream.dynamicdigital.guru/media/profile_photo/avatar.png';

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDrawer = () => {
    setDrawerEL(true);
  };

  useEffect(() => {
    setLoading(false);

    if (agent?.detail == 'Not found.') setError(true);

    const textares = document.getElementsByTagName('textarea');
    autosize(document.getElementById('note'));
    autosize.update(textares[0]?.value);
  }, [agent]);

  return (
    <>
      <HeaderWrapper id="home">
        <AppBar />
        {error ? (
          <Error id="userNotFound" />
        ) : (
          <>
            <Grid
              container
              sx={{
                top: { xs: '-0em', sm: '-2em', md: '-3em', lg: '-3em' },
                position: 'relative',
                width: '101%',
                backgroundImage: `url(${images1})`,
                backgroundRepeat: 'no-repeat',
                textAlign: 'center',
                backgroundSize: 'cover',
                pt: 15,
                pb: 10
              }}
            >
              <Grid item xs={12}>
                <Grid container sx={{ justifyContent: 'center' }}>
                  <Grid
                    item
                    xs={10}
                    md={7}
                    sx={{
                      position: 'relative',
                      top: '10px'
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 1, translateY: 550 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 150,
                        damping: 30
                      }}
                    >
                      <Card
                        sx={{
                          position: 'relative',
                          display: 'flex',
                          textAlign: 'center',
                          alignItems: 'center',
                          flexDirection: 'column',
                          justifyContent: 'space-around',
                          backgroundColor: 'rgba(0, 0, 0, 0.51)',
                          boxShadow: '4px 10px 13px rgba(0, 0, 0, 0.25)',
                          backdropFilter: 'blur(29px)',
                          WebkitBackdropFilter: 'blur(29px)'
                        }}
                      >
                        <CardContent sx={{ width: { xs: '-webkit-fill-available' } }}>
                          {isLoading ? (
                            <ImagePlaceholder
                              sx={{
                                borderRadius: '16px',
                                margin: '-70px 0 0 auto',
                                width: { xs: 72, sm: 100, md: 140 },
                                height: { xs: 72, sm: 100, md: 140 }
                              }}
                            />
                          ) : (
                            <>
                              <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={<VerifiedIcon color="secondary" />}
                              >
                                <Avatar
                                  alt="One Dream Legacy"
                                  src={agent?.photo == defaultImage ? '/oneDream.ico' : agent?.photo}
                                  sx={{
                                    borderRadius: '16px',
                                    margin: '5px auto 0',
                                    width: { xs: 72, sm: 100, md: 140 },
                                    height: { xs: 72, sm: 100, md: 140 },
                                    backgroundColor: agent?.photo == defaultImage ? 'white' : 'white',
                                    borderRadius: '100%',
                                    borderColor: 'white',
                                    border: '2px solid white',
                                    borderRadius: '125px',

                                    '& .MuiAvatar-img': {
                                      objectFit: Boolean(agent?.photo == defaultImage) ? 'contain' : null
                                    }
                                  }}
                                />
                              </Badge>

                              <Stack sx={{ pt: 3 }} direction="column" justifyContent={matchDownLG ? 'center' : 'start'}>
                                <Typography variant="h3" color="main" sx={{ color: 'white', textTransform: 'capitalize' }}>
                                  {agent?.firstName} {agent?.lastName}
                                </Typography>

                                {agent?.description !== '' && (
                                  <TextareaAutosize
                                    variant="subtitle2"
                                    color="main"
                                    type="text"
                                    value={agent?.description}
                                    disableUnderline
                                    readOnly
                                    disabled
                                    style={{
                                      color: 'white',
                                      backgroundColor: 'transparent',
                                      pt: 1,
                                      borderRadius: '8px',
                                      width: '-webkit-fill-available',
                                      borderColor: 'transparent',
                                      padding: matchDownSM ? '5%' : '2%',
                                      fontFamily: 'inherit',
                                      textAlign: 'center',
                                      cursor: 'default',
                                      opacity: 1,
                                      resize: 'none',
                                      overflow: 'unset'
                                    }}
                                  />
                                )}

                                <Stack direction="row" sx={{ justifyContent: 'space-evenly', alignItems: 'center', py: 2 }}>
                                  <Typography variant="caption" sx={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                                    <VisibilityOutlinedIcon sx={{ p: '5%' }} /> {agent?.view_count} views
                                  </Typography>
                                </Stack>

                                {agent?.instagram != null ||
                                agent?.facebook != null ||
                                agent?.linkedin != null ||
                                agent?.user_name != null ||
                                agent?.youtube != null ? (
                                  <Stack sx={{ pt: 2 }} justifyContent={'center'} direction="row">
                                    <Stack
                                      direction="row"
                                      sx={{ width: { xs: '70%', lg: '60%' }, justifyContent: 'space-evenly', alignItems: 'center' }}
                                    >
                                      {agent?.instagram && (
                                        <Link href={`${agent?.instagram}`} target="_blank" underline="hover">
                                          <InstagramIcon color="secondary" />
                                        </Link>
                                      )}
                                      {agent?.facebook && (
                                        <Link href={`${agent?.facebook}`} target="_blank" underline="hover">
                                          <FacebookIcon color="secondary" />
                                        </Link>
                                      )}
                                      {agent?.linkedin && (
                                        <Link href={`${agent?.linkedin}`} target="_blank" underline="hover">
                                          <TelegramIcon color="secondary" />
                                        </Link>
                                      )}
                                      {agent?.youtube && (
                                        <Link href={`${agent?.youtube}`} target="_blank" underline="hover">
                                          <YouTubeIcon color="secondary" />
                                        </Link>
                                      )}
                                      {agent?.tiktok && (
                                        <Link href={`${agent?.tiktok}`} target="_blank" underline="hover">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-tiktok"
                                            viewBox="0 0 16 16"
                                          >
                                            <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z" />
                                          </svg>
                                        </Link>
                                      )}
                                      {agent?.user_name && (
                                        <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={handleClose}>
                                          <>
                                            <Button
                                              variant="text"
                                              id="basic-button"
                                              aria-controls={open ? 'basic-menu' : undefined}
                                              aria-haspopup="true"
                                              aria-expanded={open ? 'true' : undefined}
                                              onClick={handleClick}
                                              sx={{
                                                color: '#b5a837',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                minWidth: 0,
                                                p: 0,
                                                m: 0,
                                                top: '-1px',
                                                ':hover': {
                                                  color: '#b5a837',
                                                  backgroundColor: 'transparent'
                                                },
                                                '& .MuiButton-endIcon': {
                                                  m: 0
                                                }
                                              }}
                                              endIcon={<ShareIcon color="secondary" />}
                                            ></Button>
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
                                                  WebkitBackdropFilter: 'blur(29px)',
                                                  mt: 1.5,
                                                  '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1
                                                  },
                                                  '&:before': {
                                                    color: 'white',
                                                    WebkitBackdropFilter: 'blur(29px)',
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
                                              <MenuItem sx={{ backgroundColor: 'transparent', display: 'flex', flexDirection: 'column' }}>
                                                <WhatsappShareButton
                                                  sx={{
                                                    color: 'white',
                                                    backdropFilter: 'blur(29px)',
                                                    boxShadow: '4px 10px 13px rgb(0 0 0 / 25%)',
                                                    overflow: 'visible',
                                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))'
                                                  }}
                                                  url={`${mainOrigin}/${agent?.user_name}`}
                                                  title={`${agent?.firstName} ${agent?.lastName}`}
                                                >
                                                  <Stack
                                                    sx={{
                                                      display: 'flex',
                                                      justifyContent: 'center',
                                                      alignItems: 'center',
                                                      flexDirection: 'row'
                                                    }}
                                                  >
                                                    <WhatsAppIcon sx={{ mr: 1 }} color="secondary" />
                                                    {'WhatsApp'}
                                                  </Stack>
                                                </WhatsappShareButton>
                                                <br />
                                                <FacebookShareButton
                                                  sx={{
                                                    color: 'white',
                                                    backdropFilter: 'blur(29px)',
                                                    boxShadow: '4px 10px 13px rgb(0 0 0 / 25%)',
                                                    overflow: 'visible',
                                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))'
                                                  }}
                                                  url={`${mainOrigin}/${agent?.user_name}`}
                                                  title={`${agent?.firstName} ${agent?.lastName}`}
                                                >
                                                  <Stack
                                                    sx={{
                                                      display: 'flex',
                                                      justifyContent: 'center',
                                                      alignItems: 'center',
                                                      flexDirection: 'row'
                                                    }}
                                                  >
                                                    <FacebookIcon sx={{ mr: 1 }} color="secondary" />
                                                    {'Facebook'}
                                                  </Stack>
                                                </FacebookShareButton>
                                                <br />
                                                <TelegramShareButton
                                                  sx={{
                                                    color: 'white',
                                                    backdropFilter: 'blur(29px)',
                                                    boxShadow: '4px 10px 13px rgb(0 0 0 / 25%)',
                                                    overflow: 'visible',
                                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))'
                                                  }}
                                                  url={`${mainOrigin}/${agent?.user_name}`}
                                                  title={`${agent?.firstName} ${agent?.lastName}`}
                                                >
                                                  <Stack
                                                    sx={{
                                                      display: 'flex',
                                                      justifyContent: 'center',
                                                      alignItems: 'center',
                                                      flexDirection: 'row'
                                                    }}
                                                  >
                                                    <TelegramIcon sx={{ mr: 1 }} color="secondary" />
                                                    {'Telegram'}
                                                  </Stack>
                                                </TelegramShareButton>
                                                {/* <br />
                                                <QRCode
                                                  eyeRadius="50px"
                                                  removeQrCodeBehindLogo={true}
                                                  logoImage={agent?.photo}
                                                  value={`${mainOrigin}/${agent?.user_name}`}
                                                /> */}
                                              </MenuItem>
                                            </Menu>
                                          </>
                                        </ClickAwayListener>
                                      )}
                                    </Stack>
                                  </Stack>
                                ) : (
                                  ''
                                )}
                              </Stack>
                            </>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{ justifyContent: 'center', alignItems: 'center', pt: matchDownMD ? 3 : 0, pb: 10, height: { xs: 'auto' } }}
            >
              <Grid item xs={10} md={8}>
                <motion.div
                  initial={{ opacity: 0, translateY: 550 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 30
                  }}
                >
                  {agent?.detail !== 'Not found.' && <TypeTabs agentData={agent} username={`${agent?.user_name}`} />}
                </motion.div>
              </Grid>
            </Grid>
          </>
        )}
      </HeaderWrapper>

      <SecondWrapper>
        <FooterPage />
      </SecondWrapper>
    </>
  );
}

export default AgentProfile;
