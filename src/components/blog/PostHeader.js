import React from 'react';
import AvatarImg from './AvatarImg';
import CoverImg from './CoverImg';
import Date from './Date';
import PostTitle from './PostTitle';
import Category from './Category';

const PostHeader = ({ title, coverImage, date, author, categories }) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <AvatarImg author={author} />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImg title={title} coverImage={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <AvatarImg author={author} />
        </div>
        <div className="mb-6 text-lg">
          Posted <Date dateString={date} />
          <Category categories={categories} />
        </div>
      </div>
    </>
  );
};

export default PostHeader;
