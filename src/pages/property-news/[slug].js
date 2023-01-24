import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import ErrorPage from 'next/error';
import { getAllPostsWithSlug, getPostAndMorePosts } from 'contexts/ApiBlog';

const Cover = '/assets/images/profile/img-profile-bg.png';
const images1 = '/assets/images/landing/living-room-with-yellow.png';
const images2 = '/assets/images/landing/footerBg-1.png';

function PostContent({ post, posts, preview }) {
  //   const router = useRouter();
  const morePosts = posts?.edges;

  //   if (!router.isFallback && !post?.slug) {
  //     return <ErrorPage statusCode={404} />;
  //   }

  return <div>Next stars: {post}</div>;
}

export default PostContent;

export const getStaticProps = async ({ params, preview = false, previewData }) => {
  const data = await getPostAndMorePosts(params?.slug, preview, previewData);

  return {
    props: {
      preview,
      post: data.post,
      posts: data.posts
    },
    revalidate: 10
  };
};

export const getStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts.edges.map(({ node }) => `/property-news/${node.slug}`) || [],
    fallback: true
  };
};
