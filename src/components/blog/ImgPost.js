import React, { useEffect, useState } from 'react';
import { CardMedia, Skeleton, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/router';

const ImgPost = ({ url, slug }) => {
  const theme = useTheme();
  const router = useRouter();

  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePost = (link) => {
    router.push(`/posts/${link}`);
  };

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  return (
    <>
      {isLoading ? (
        <Skeleton sx={{ height: matchDownMD ? 190 : 250 }} animation="wave" variant="rectangular" />
      ) : (
        <CardMedia
          onClick={() => {
            handlePost(slug);
          }}
          component="img"
          alt="green iguana"
          image={url !== null ? url?.node?.sourceUrl : '/assets/images/previewImg1.jpg'}
          sx={{ backgroundColor: 'black', borderRadius: '5px', height: matchDownMD ? 190 : 250, cursor: 'pointer' }}
        />
      )}
    </>
  );
};

export default ImgPost;
