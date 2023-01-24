import React from 'react';

import Image from 'next/image';
import { Avatar } from '@mui/material';

const AvatarImg = ({ author }) => {
  const isAuthorHaveFullName = author?.node?.firstName && author?.node?.lastName;
  const name = isAuthorHaveFullName ? `${author.node.firstName} ${author.node.lastName}` : author.node.name || null;

  return (
    <div className="flex items-center">
      <div className="w-12 h-12 relative mr-4">
        {/* <Image src={author?.node?.avatar?.url} layout="fill" className="rounded-full" alt={name} /> */}
        <Avatar alt="Remy Sharp" src={author?.node?.avatar?.url} />
      </div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
};

export default AvatarImg;
