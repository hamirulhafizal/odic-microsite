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
import { fetchAllPost, fetchMedia } from 'contexts/ApiBlog';
import { id } from 'date-fns/locale';
import ImgPost from 'components/blog/ImgPost';
import FooterPage from 'components/landingpage/Footer';
import CircularLoader from 'components/ui-component/CircularLoader';

const images2 = '/assets/images/landing/footerBg-1.png';

const useStyles = makeStyles({
  pokemonCardsArea: {
    justifyContent: 'space-evenly'
  },
  progress: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginTop: '-100px',
    marginLeft: '-100px'
  }
});

const SecondWrapper = styled('div')(() => ({
  backgroundImage: `url(${images2})`,
  backgroundSize: 'cover'
}));

const SamplePage = () => {
  const classes = useStyles();

  const theme = useTheme();

  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

  const [pokemonData, setPokemonData] = useState();

  const [scrollData, setScrollData] = useState();
  const [hasMoreValue, setHasMoreValue] = useState(true);

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
        const data = response;

        const newPokemonData = [];
        data.forEach((pokemon, index) => {
          const { title, id, featured_media, excerpt } = pokemon;

          newPokemonData.push({
            id: index + 1,
            name: title.rendered,
            idPost: id,
            imgUrl: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${index + 1}.svg`,
            featured_media: featured_media,
            excerpt: excerpt.rendered
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
    const { name, id, idPost, featured_media, imgUrl, excerpt } = pokemonData[pokemonIndex];

    return (
      <Grid key={pokemonIndex} item>
        <MainCard sx={{ maxWidth: 345 }} contentSX={{ pt: 0 }} title={sliceString(`${name}`, matchDownMD ? 30 : 30)} content={true}>
          {featured_media !== undefined && <ImgPost id={featured_media} />}

          <CardContent sx={{ p: 0, pt: 2 }}>
            <Typography variant="body2">{sliceString(string2Html(`${excerpt}`), matchDownMD ? 160 : 100)}</Typography>
          </CardContent>
          <CardActions sx={{ p: 0, pt: 2 }}>
            <Button disableElevation sx={{ color: 'white' }} size="small" variant="contained" color="secondary">
              Share
            </Button>

            <Button disableElevation sx={{ color: 'white' }} size="small" variant="contained" color="secondary">
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
        <CircularLoader color="inherit" className={classes.progress} size={150} />
      )}

      <SecondWrapper>
        <FooterPage />
      </SecondWrapper>
    </>
  );
};
SamplePage.Layout = 'minimalLayout';
export default SamplePage;
