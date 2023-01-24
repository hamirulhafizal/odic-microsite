import React from 'react';
import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { CardMedia } from '@mui/material';

const CoverImg = ({ title, coverImage, slug }) => {
  const image = (
    // <Image
    //   width={2000}
    //   height={1000}
    //   alt={`Cover Image for ${title}`}
    //   src={coverImage?.node.sourceUrl}
    //   className={cn('shadow-small', {
    //     'hover:shadow-medium transition-shadow duration-200': slug
    //   })}
    // />

    <CardMedia component="img" height="140" image={coverImage?.node.sourceUrl} alt="green iguana" />
  );

  return (
    <>
      <div className="sm:mx-0">
        {slug ? (
          <Link href={`/posts/${slug}`} aria-label={title}>
            {image}
          </Link>
        ) : (
          image
        )}
      </div>
    </>
  );
};

export default CoverImg;
