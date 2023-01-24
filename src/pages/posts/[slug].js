/* eslint-disable import/no-unresolved */
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { getAllPostsWithSlug, getPostAndMorePosts } from 'contexts/ApiBlog';

import PostHeader from 'components/blog/PostHeader';
import PostBody from 'components/blog/PostBody';
import AppBar from 'components/ui-component/extended/AppBar';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  CircularProgress,
  ClickAwayListener,
  Container,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  styled,
  useMediaQuery
} from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import Header from 'layout/MainLayout/Header';
import Sidebar from 'layout/MainLayout/Sidebar';

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import navigation from 'menu-items';
import { sliceString, string2Html } from 'utils/helper';

import YouTubeIcon from '@mui/icons-material/YouTube';
import VerifiedIcon from '@mui/icons-material/Verified';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import ShareIcon from '@mui/icons-material/Share';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import { WhatsappShareButton, TelegramShareButton, FacebookShareButton } from 'next-share';
import moment from 'moment';

import { gridSpacing } from 'store/constant';
import ProductCard from 'components/ui-component/cards/ProductCard';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';
import { wrapper } from 'store';
import { setListing, setPost } from 'store/slices/user';
import FooterPage from 'components/landingpage/Footer';

const images2 = '/assets/images/landing/footerBg-1.png';

const SecondWrapper = styled('div')(() => ({
  backgroundImage: `url(${images2})`,
  backgroundSize: 'cover'
}));

export default function Post(props) {
  const { post, posts, preview } = props?.data;

  const { title, author, featuredImage, content, categories, date, slug, tags, excerpt } = post;

  const router = useRouter();
  const theme = useTheme();

  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const useStyles = makeStyles({
    postSwiperInline: {
      paddingBottom: matchDownMD ? '40px !important' : '5% !important',
      paddingLeft: matchDownMD ? '5%' : '10px'
    }
  });

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerEL, setDrawerEL] = useState(null);
  const [isLoading, setLoading] = useState({ state: false, slug: '' });

  const open = Boolean(anchorEl);

  var mainOrigin = typeof window !== 'undefined' ? window?.location?.origin : null;

  const morePosts = posts?.edges;

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDrawer = () => {
    setDrawerEL(true);
  };

  const handlePost = (url) => {
    setLoading({ state: true, slug: url });
    router.push(url);
    setTimeout(() => {
      setLoading({ state: false, slug: '' });
    }, 3000);
  };

  return (
    <>
      <AppBar />

      <Box
        sx={{
          height: '75px',
          backgroundColor: 'black'
        }}
      />

      <Box
        sx={{
          pt: 20,
          width: '100%',
          objectFit: 'cover',
          height: matchDownSM ? '33vh' : '60vh',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          transition: 'opacity .3s',
          opacity: 1,
          backgroundColor: 'black',
          backgroundImage: `url(${featuredImage != null ? featuredImage?.node.sourceUrl : '/assets/images/previewImg1.jpg'})`
        }}
      ></Box>

      <Box sx={{ py: 3, px: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/posts">
            Posts
          </Link>
          <Typography color="text.primary">{slug}</Typography>
        </Breadcrumbs>
      </Box>

      <Divider />

      <Container maxWidth={matchDownMD ? 'lg' : 'md'}>
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography
            variant="h1"
            sx={{
              mt: 1,
              px: 2,
              overflowWrap: 'break-word'
            }}
          >
            {title}
          </Typography>
          <Typography variant="h5" sx={{ mt: 3, px: 3 }}>
            {string2Html(`${excerpt}`)}
          </Typography>
        </Box>
        <Divider />

        <Box
          sx={{
            py: 3,
            px: 2,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Avatar
            alt="One Dream Legacy"
            src={author?.node?.avatar?.url}
            sizes="medium"
            sx={{
              borderRadius: '16px',
              margin: '5px auto 0',
              width: { xs: 50, md: 60 },
              height: { xs: 50, md: 60 },
              backgroundColor: 'white',
              borderRadius: '100%',
              borderColor: 'white',
              border: '1px solid black',
              borderRadius: '125px',

              '& .MuiAvatar-img': {
                objectFit: 'contain',
                padding: '5%'
              }
            }}
          />

          <Stack
            sx={{
              flexDirection: 'column',
              flexGrow: 1,
              ml: 2,
              justifyContent: 'center'
            }}
          >
            <Typography variant="h4">
              {author?.node?.firstName} {author?.node?.lastName}
            </Typography>
            <Typography variant="span">{moment(date).format('DD MMM YYYY')}</Typography>
          </Stack>

          <Stack
            sx={{
              ml: 2,
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <IconButton
              aria-label="share"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <ShareIcon />
            </IconButton>

            <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={handleClose}>
              <>
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
                      url={`${window.location.href}`}
                      title={`${title}`}
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
                      url={`${window.location.href}`}
                      title={`${title}`}
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
                      url={`${window.location.href}`}
                      title={`${title}`}
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
                  </MenuItem>
                </Menu>
              </>
            </ClickAwayListener>

            <IconButton aria-label="share">
              <FavoriteIcon checked />
            </IconButton>
          </Stack>
        </Box>

        <Divider />

        <Box sx={{ pt: 4, px: 1 }}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Box>

        {tags?.edges.length != 0 && (
          <Box sx={{ pt: 5, px: 3 }}>
            <Stack direction={'row'} sx={{ alignItems: 'center' }}>
              <Typography variant="h4">Tag: </Typography>
              <Chip sx={{ mx: 2 }} label={tags?.edges} />
            </Stack>
          </Box>
        )}

        <Box sx={{ pt: 2, pb: 3, px: 3 }}>
          <Stack direction={'row'} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ width: matchDownSM ? '100%' : 'unset' }}>
              <Typography variant="h4">Share: </Typography>
            </Box>
            <FacebookShareButton
              sx={{
                color: 'white',
                backdropFilter: 'blur(29px)',
                boxShadow: '4px 10px 13px rgb(0 0 0 / 25%)',
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))'
              }}
              url={`${window.location.href}`}
              title={`${title}`}
            >
              <Chip sx={{ m: 1, p: 2 }} icon={<FacebookIcon />} label="Facebook" />
            </FacebookShareButton>
            <WhatsappShareButton
              sx={{
                color: 'white',
                backdropFilter: 'blur(29px)',
                boxShadow: '4px 10px 13px rgb(0 0 0 / 25%)',
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))'
              }}
              url={`${window.location.href}`}
              title={`${title}`}
            >
              <Stack
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row'
                }}
              >
                <Chip sx={{ m: 1, p: 2 }} icon={<WhatsAppIcon />} label="Whatsapp" />
              </Stack>
            </WhatsappShareButton>
            <TelegramShareButton
              sx={{
                color: 'white',
                backdropFilter: 'blur(29px)',
                boxShadow: '4px 10px 13px rgb(0 0 0 / 25%)',
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))'
              }}
              url={`${window.location.href}`}
              title={`${title}`}
            >
              <Chip sx={{ m: 1, p: 2 }} icon={<TelegramIcon />} label="Telegram" />
            </TelegramShareButton>
          </Stack>
        </Box>

        <Divider />

        <Box
          sx={{
            py: 3,
            px: 2,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Avatar
            alt="One Dream Legacy"
            src={author?.node?.avatar?.url}
            sizes="medium"
            sx={{
              borderRadius: '16px',
              margin: '5px auto 0',
              width: { xs: 50, md: 60 },
              height: { xs: 50, md: 60 },
              backgroundColor: 'white',
              borderRadius: '100%',
              borderColor: 'white',
              border: '1px solid black',
              borderRadius: '125px',

              '& .MuiAvatar-img': {
                objectFit: 'contain',
                padding: '5%'
              }
            }}
          />

          <Stack
            sx={{
              flexDirection: 'column',
              flexGrow: 1,
              ml: 2,
              justifyContent: 'center'
            }}
          >
            <Typography variant="h4">
              {author?.node?.firstName} {author?.node?.lastName}
            </Typography>
            <Typography variant="span">{moment(date).format('DD MMM YYYY')}</Typography>
          </Stack>
        </Box>
      </Container>

      <Divider />

      <Grid
        sx={{
          py: 5
        }}
        container
        alignItems="center"
        justifyContent="center"
        spacing={gridSpacing}
      >
        <Grid item xs={12} lg={10} sx={{ mt: 3, ml: 2 }}>
          <Typography variant="h2">Similar Post</Typography>
        </Grid>
        <Grid item xs={11} lg={10}>
          <Swiper
            navigation={true}
            slidesPerView={1}
            spaceBetween={20}
            pagination={{
              clickable: true
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50
              }
            }}
            modules={[Pagination]}
            className={`mySwiper postSwiper ${classes.postSwiperInline}`}
          >
            {morePosts?.map(({ node }, index) => (
              <>
                <Box>
                  <SwiperSlide key={index} className="eachCardSwiper">
                    <Card
                      key={index}
                      sx={{
                        backgroundColor: 'white',
                        boxShadow: '4px 10px 13px rgba(0, 0, 0, 0.25)',
                        backdropFilter: 'blur(29px)',
                        WebkitBackdropFilter: 'blur(29px)'
                      }}
                    >
                      <CardHeader
                        key={index}
                        avatar={
                          <Avatar
                            sx={{
                              bgcolor: 'red',
                              borderRadius: '16px',
                              margin: '5px auto 0',
                              width: { xs: 40, md: 50 },
                              height: { xs: 40, md: 50 },
                              backgroundColor: 'white',
                              borderRadius: '100%',
                              borderColor: 'white',
                              border: '1px solid black',
                              borderRadius: '125px',
                              padding: '5%',
                              '& .MuiAvatar-img': {
                                objectFit: 'contain'
                              }
                            }}
                            src={node?.author?.node?.avatar?.url}
                            aria-label="recipe"
                          ></Avatar>
                        }
                        title={`${node?.author?.node?.firstName} ${node?.author?.node?.lastName}`}
                        subheader={`${moment(node?.date).format('DD MMM YYYY')}`}
                        sx={{
                          textAlign: 'start',
                          '& .MuiCardHeader-title': {
                            fontWeight: 'bold'
                          }
                        }}
                      />

                      <CardMedia
                        onClick={() => {
                          handlePost(node.slug);
                        }}
                        component="img"
                        height="194"
                        image={
                          node?.featuredImage?.node.sourceUrl != null
                            ? `${node?.featuredImage?.node.sourceUrl}`
                            : '/assets/images/previewImg1.jpg'
                        }
                        alt="Paella dish"
                        sx={{
                          cursor: 'pointer',
                          width: '100%',
                          height: matchDownSM ? '32vh !important' : '40vh  !important',
                          objectFit: node?.featuredImage?.node.sourceUrl == null ? 'contain' : 'cover',
                          backgroundColor: 'black',
                          borderRadius: '8px'
                        }}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h4"
                          component="div"
                          sx={{
                            textAlign: 'start'
                          }}
                          onClick={() => {
                            handlePost(node.slug);
                          }}
                        >
                          {sliceString(node?.title, 32)}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            textAlign: 'start'
                          }}
                        >
                          {sliceString(string2Html(`${node?.excerpt}`), 100)}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ pt: 0 }}>
                        <Button
                          size="small"
                          sx={{ backgroundColor: '#b5a837' }}
                          onClick={() => {
                            handlePost(node.slug);
                          }}
                          endIcon={
                            isLoading?.state &&
                            node.slug == isLoading?.slug && <CircularProgress size={20} sx={{ color: 'white', mr: 1 }} />
                          }
                        >
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  </SwiperSlide>
                </Box>
              </>
            ))}
          </Swiper>
        </Grid>
      </Grid>

      <SecondWrapper>
        <FooterPage />
      </SecondWrapper>
    </>
  );
}

Post.getInitialProps = wrapper.getInitialPageProps((store) => async (context) => {
  const slug = context.query.slug;
  const data = await getPostAndMorePosts(slug, false, undefined);

  store.dispatch(setPost([data]));

  return {
    data: data
  };
});
