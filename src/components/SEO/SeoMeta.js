import React, { useEffect, useState } from 'react';

import Head from 'next/head';
import { useSelector } from 'store';
import { useRouter } from 'next/router';
import { capitalizeFirstString, sliceString, string2Html, removePTag } from 'utils/helper';

const SeoMeta = () => {
  const router = useRouter();
  const { userData, userListing, posts } = useSelector((state) => state?.user);

  return (
    <>
      <Head>
        <link href="//db.onlinewebfonts.com/c/32441506567156636049eb850b53f02a?family=Times+New+Roman" rel="stylesheet" type="text/css" />

        {router.pathname == '/[uid]' && (
          <>
            <title>{`ONE DREAM LEGACY | List all type properties at One Dream Property by ${capitalizeFirstString(
              userData?.userData[0]?.firstName
            )} ${capitalizeFirstString(userData?.userData[0]?.lastName)}`}</title>
            <link rel="icon" type="image/x-icon" href="/oneDream.ico" />
            <meta
              name="title"
              content={`${capitalizeFirstString(userData?.userData[0]?.firstName)} ${capitalizeFirstString(
                userData?.userData[0]?.lastName
              )}`}
            />
            <meta name="description" content={`${sliceString(userData?.userData[0]?.description, 100)}`} />

            <meta property="og:type" content="article" />
            <meta property="og:url" content={`http://onedreamproperty.com.my${router.asPath}`} />
            <meta
              property="og:title"
              content={`${capitalizeFirstString(userData?.userData[0]?.firstName)} ${capitalizeFirstString(
                userData?.userData[0]?.lastName
              )}`}
            />
            <meta property="og:description" content={`${sliceString(userData?.userData[0]?.description, 100)}`} />
            <meta property="og:image" content={userData?.userData[0]?.photo} />
            <meta property="og:image:width" content="800" />
            <meta property="og:image:height" content="600" />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={`http://onedreamproperty.com.my${router.asPath}`} />
            <meta
              property="twitter:title"
              content={`${capitalizeFirstString(userData?.userData[0]?.firstName)} ${capitalizeFirstString(
                userData?.userData[0]?.lastName
              )}`}
            />
            <meta property="twitter:description" content={`${sliceString(userData?.userData[0]?.description, 100)}`} />
            <meta property="twitter:image" content={userData?.userData[0]?.photo} />

            <meta
              name="keywords"
              content="sewa rumah,homestay Jb, mudah.my, propertyguru.com.my, onedream, agoda, trivago, sewa rumah murah, rent a house, house for rent johor bahru, house for rent mount austin, house for rent skudai, house for rent gelang patah,   house for rent masai,  rumah sewa johor bahru, rumah sewa skudai, rumah sewa masai, iproperty, propertyguru, ibilik, mudah, rumah sewa murah, apartment johor bahru, apartment for rent johor bahru, apartment for rent mount austin, apartment for rent, apartment for rent kuala lumpur, house for rent, hoom, hoomventure, hoom venture sdn bhd, bryce wong, raymond koo, bosskoo, Real Estate Agents (REA), Johor Bahru, property, rumah sewa, rumah lelong, beli rumah,  Rent / Sale , Buy property, Academy , Training Services, Valuation Consultancy Services, Property Investment Consultancy, Property Legal Consultancy, Refinance Consultancy, Find properties for rent, sell and short-stay"
            />
            <meta name="theme-color" content="black" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
          </>
        )}

        {router.pathname == '/listing/[id]' && (
          <>
            <title>{`${capitalizeFirstString(userListing?.title)} | Property Detail by ${capitalizeFirstString(
              userData?.userData[0]?.firstName
            )} ${capitalizeFirstString(userData?.userData[0]?.lastName)}`}</title>
            <link rel="icon" type="image/x-icon" href="/oneDream.ico" />
            <meta name="title" content={`${capitalizeFirstString(userListing?.title)}`} />
            <meta name="description" content={`${sliceString(userListing?.description, 60)}`} />

            <meta property="og:type" content="article" />
            <meta property="og:url" content={`http://onedreamproperty.com.my${router.asPath}`} />
            <meta property="og:title" content={`${capitalizeFirstString(userListing?.title)}`} />
            <meta property="og:description" content={`${sliceString(userListing?.description, 60)}`} />
            <meta property="og:image" content={userListing?.featureImage} />
            <meta property="og:image:width" content="800" />
            <meta property="og:image:height" content="600" />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={`http://onedreamproperty.com.my${router.asPath}`} />
            <meta property="twitter:title" content={`${capitalizeFirstString(userListing?.title)}`} />
            <meta property="twitter:description" content={`${sliceString(userListing?.description, 60)}`} />
            <meta property="twitter:image" content={userListing?.featureImage} />

            <meta
              name="keywords"
              content="sewa rumah,homestay Jb, mudah.my, propertyguru.com.my, onedream, agoda, trivago, sewa rumah murah, rent a house, house for rent johor bahru, house for rent mount austin, house for rent skudai, house for rent gelang patah, house for rent masai, rumah sewa johor bahru, rumah sewa skudai, rumah sewa masai, iproperty, propertyguru, ibilik, mudah, rumah sewa murah, apartment johor bahru, apartment for rent johor bahru, apartment for rent mount austin, apartment for rent, apartment for rent kuala lumpur, house for rent, hoom, hoomventure, hoom venture sdn bhd, bryce wong, raymond koo, bosskoo, Real Estate Agents (REA), Johor Bahru, property, rumah sewa, rumah lelong, beli rumah,  Rent / Sale , Buy property, Academy , Training Services, Valuation Consultancy Services, Property Investment Consultancy, Property Legal Consultancy, Refinance Consultancy, Find properties for rent, sell and short-stay"
            />
            <meta name="theme-color" content="black" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
          </>
        )}

        {router.pathname == '/posts/[slug]' && (
          <>
            <title>{posts[0]?.post?.title}</title>
            <link rel="icon" type="image/x-icon" href="/oneDream.ico" />

            <meta name="title" content={posts[0]?.post?.title} />

            <meta name="description" content={`${sliceString(`${removePTag(posts[0]?.post?.excerpt)}`, 100)}`} />

            <meta property="og:type" content="article" />

            <meta property="og:url" content={`http://onedreamproperty.com.my${router.asPath}`} />

            <meta property="og:title" content={posts[0]?.post?.title} />

            <meta property="og:description" content={`${sliceString(`${removePTag(posts[0]?.post?.excerpt)}`, 100)}`} />

            <meta property="og:image" content={posts[0]?.post?.featuredImage?.node?.sourceUrl} />
            <meta property="og:image:width" content="800" />
            <meta property="og:image:height" content="600" />

            <meta property="twitter:card" content="summary_large_image" />
            <meta name="twitter:card" content="summary" />

            <meta property="twitter:url" content={`http://onedreamproperty.com.my${router.asPath}`} />
            <meta property="twitter:title" content={posts[0]?.post?.title} />
            <meta property="twitter:description" content={`${sliceString(`${removePTag(posts[0]?.post?.excerpt)}`, 100)}`} />
            <meta property="twitter:image" content={posts[0]?.post?.featuredImage?.node?.sourceUrl} />

            <meta
              name="keywords"
              content="sewa rumah,homestay Jb, mudah.my, propertyguru.com.my, onedream, agoda, trivago, sewa rumah murah, rent a house, house for rent johor bahru, house for rent mount austin, house for rent skudai, house for rent gelang patah,   house for rent masai,  rumah sewa johor bahru, rumah sewa skudai, rumah sewa masai, iproperty, propertyguru, ibilik, mudah, rumah sewa murah, apartment johor bahru, apartment for rent johor bahru, apartment for rent mount austin, apartment for rent, apartment for rent kuala lumpur, house for rent, hoom, hoomventure, hoom venture sdn bhd, bryce wong, raymond koo, bosskoo, Real Estate Agents (REA), Johor Bahru, property, rumah sewa, rumah lelong, beli rumah,  Rent / Sale , Buy property, Academy , Training Services, Valuation Consultancy Services, Property Investment Consultancy, Property Legal Consultancy, Refinance Consultancy, Find properties for rent, sell and short-stay"
            />
            <meta name="theme-color" content="black" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
          </>
        )}
      </Head>
    </>
  );
};

export default SeoMeta;
