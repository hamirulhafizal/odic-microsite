import React from 'react';
// import styles from './post-body.module.css';

const PostBody = ({ content }) => {
  return (
    <>
      <div className="max-w-2xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </>
  );
};

export default PostBody;
