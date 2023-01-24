import { useState } from 'react';

// material-ui
import {
  Typography,
  LinearProgress,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  useMediaQuery,
  Box,
  styled
} from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';

//Third Party
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { useEffect } from 'react';
import MediaCard from 'components/ui-component/cards/MediaCard';

// helper
import { sliceString, string2Html } from '../../utils/helper';
import AppBar from 'components/ui-component/extended/AppBar';
import { fetchAllPost, fetchAPI, fetchMedia, getAllPostsForHome } from 'contexts/ApiBlog';
import { id } from 'date-fns/locale';
import ImgPost from 'components/blog/ImgPost';
import FooterPage from 'components/landingpage/Footer';
import CircularLoader from 'components/ui-component/CircularLoader';
import { useRouter } from 'next/router';

const images2 = '/assets/images/landing/footerBg-1.png';

const useStyles = makeStyles({
  pokemonCardsArea: {
    justifyContent: 'space-evenly'
  },
  progress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: '30%',
    color: '#b5a837 !important',
    width: '100% !important',
    height: '100% !important'
  }
});

const SecondWrapper = styled('div')(() => ({
  backgroundImage: `url(${images2})`,
  backgroundSize: 'cover'
}));

const PostPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();

  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

  const [pokemonData, setPokemonData] = useState();
  const [scrollData, setScrollData] = useState();
  const [hasMoreValue, setHasMoreValue] = useState(true);
  const [isLoading, setLoading] = useState({ state: false, slug: '' });

  const loadScrollData = async () => {
    try {
      setScrollData(pokemonData.slice(0, scrollData.length + 8));
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnRowsScrollEnd = () => {
    if (scrollData.length < pokemonData.length) {
      setHasMoreValue(true);
      loadScrollData();
    } else {
      setHasMoreValue(false);
    }
  };

  const fetchPrimaryPokemonData = async () => {
    try {
      await fetchAllPost().then((response) => {
        const dataApi = response;
        const data = [];

        dataApi?.map((item) => data.push(item?.node));

        const newPokemonData = [];
        data.forEach((pokemon, index) => {
          const { title, id, featuredImage, excerpt, slug } = pokemon;

          newPokemonData.push({
            id: index + 1,
            name: title,
            idPost: id,
            imgUrl: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${index + 1}.svg`,
            featuredImage: featuredImage,
            excerpt: excerpt,
            slug: slug
          });
        });
        setPokemonData(newPokemonData);
        setScrollData(newPokemonData.slice(0, 8));
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPrimaryPokemonData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderCards = (pokemonIndex) => {
    const { name, id, idPost, featuredImage, imgUrl, excerpt, slug } = pokemonData[pokemonIndex];

    const handlePost = (url) => {
      setLoading({ state: true, slug: url });
      router.push(`/posts/${url}`);
      setTimeout(() => {
        setLoading({ state: false, slug: '' });
      }, 3000);
    };

    return (
      <Grid key={pokemonIndex} item>
        <MainCard sx={{ maxWidth: 345 }} contentSX={{ pt: 0 }} title={sliceString(`${name}`, matchDownMD ? 30 : 30)} content={true}>
          <ImgPost slug={slug} url={featuredImage} />
          <CardContent sx={{ p: 0, pt: 2 }}>
            <Typography variant="body2">{sliceString(string2Html(`${excerpt}`), matchDownMD ? 160 : 100)}</Typography>
          </CardContent>
          <CardActions sx={{ p: 0, pt: 2 }}>
            <Button
              size="small"
              sx={{ backgroundColor: '#b5a837' }}
              onClick={() => {
                handlePost(slug);
              }}
              endIcon={isLoading?.state && slug == isLoading?.slug && <CircularProgress size={15} sx={{ color: 'white' }} />}
            >
              Learn More
            </Button>
          </CardActions>
        </MainCard>
      </Grid>
    );
  };

  return (
    <>
      <AppBar />
      {scrollData ? (
        <>
          <InfiniteScroll
            dataLength={scrollData.length}
            next={handleOnRowsScrollEnd}
            hasMore={hasMoreValue}
            scrollThreshold={1}
            // loader={<CircularLoader color="inherit" className={classes.progress} size={150} />}
            style={{ overflow: 'unset', mt: 5 }}
          >
            <Grid container spacing={2} sx={{ mt: matchDownMD ? 12 : 13, mb: matchDownMD ? 10 : 9 }} className={classes.pokemonCardsArea}>
              {scrollData.map((pokemon, index) => renderCards(index))}
            </Grid>
          </InfiniteScroll>
        </>
      ) : (
        <>
          <Box
            sx={{
              height: '80vh',
              display: 'flex',
              justifyContent: 'center',
              top: '10%',
              position: 'relative',
              alignItems: 'center',
              zIndex: 13001,
              width: '100%',
              backgroundColor: 'black',
              opacity: 0.5
            }}
          >
            <CircularProgress
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            />
          </Box>
        </>
      )}

      <SecondWrapper>
        <FooterPage />
      </SecondWrapper>
    </>
  );
};

PostPage.Layout = 'minimalLayout';
export default PostPage;
