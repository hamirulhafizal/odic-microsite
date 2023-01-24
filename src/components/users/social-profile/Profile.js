import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Link, Typography } from '@mui/material';

// project imports

import MainCard from 'components/ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import { getPosts } from 'store/slices/user';

// assets
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PublicTwoToneIcon from '@mui/icons-material/PublicTwoTone';

// ==============================|| SOCIAL PROFILE - POST ||============================== //

const Profile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [posts, setPosts] = React.useState([]);
  const userState = useSelector((state) => state.user);
  const getPost = async () => {
    dispatch(getPosts());
  };

  React.useEffect(() => {
    setPosts(userState.posts);
  }, [userState]);

  React.useEffect(() => {
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sideAvatarSX = {
    borderRadius: '8px',
    width: 48,
    height: 48,
    fontSize: '1.5rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: theme.palette.mode === 'dark' ? '1px solid' : 'none',
    '&>svg': {
      width: 24,
      height: 24
    }
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={12} md={4}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <MainCard>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h4">About</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its
                    layout.
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ margin: '16px 0' }} />
              <Grid
                container
                spacing={2}
                sx={{
                  '& >div': {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'block',
                    width: '100%'
                  },
                  '& a': {
                    color: theme.palette.grey[700],

                    '& svg': {
                      mr: 1,
                      verticalAlign: 'bottom'
                    },
                    '&:hover': {
                      color: theme.palette.primary.main,
                      textDecoration: 'none'
                    }
                  }
                }}
              >
                <Grid item xs={12}>
                  <Link href="https://codedthemes.com/" target="_blank" underline="hover">
                    <PublicTwoToneIcon color="secondary" /> https://codedthemes.com/
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <Link href="https://www.instagram.com/codedthemes" target="_blank" underline="hover">
                    <InstagramIcon sx={{ color: theme.palette.orange.dark }} /> https://www.instagram.com/codedthemes
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <Link href="https://www.facebook.com/codedthemes" target="_blank" underline="hover">
                    <FacebookIcon color="primary" /> https://www.facebook.com/codedthemes
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <Link href="https://in.linkedin.com/company/codedthemes" target="_blank" underline="hover">
                    <LinkedInIcon sx={{ color: theme.palette.grey[900] }} /> https://in.linkedin.com/company/codedthemes
                  </Link>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Profile;
