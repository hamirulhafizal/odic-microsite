import React from 'react';
import Head from 'next/head';
import { getProfileAgentById } from 'contexts/ApiListing';

import axios from 'axios';

const AgentLandingPage = ({ title, res, userData1 }) => {
  let array = [];

  array.push(title);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

        {/* <meta property="og:image" content={userData?.photo || Cover} />
        <meta property="og:title" content={`${userData?.firstName} ${userData?.lastName}`} /> */}
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content="your fb id" />
        <meta name="twitter:card" content="summary" />
        {/* <meta
          property="og:description"
          style={{ textTransform: 'capitalize' }}
          content={`Properties For Rent & Sell by ${userData?.firstName} ${userData?.lastName}`}
        /> */}
      </Head>
    </>
  );
};

AgentLandingPage.getInitialProps = async () => {
  //   const uids = context.query.uid; // Get ID from slug `/book/1`

  const userData1 = await axios
    .get('https://onedream.dynamicdigital.guru/api/v1/inventory/47')
    .then((response) => response.json())
    .then((json) => {
      return json;
    });

  return {
    props: { userData1 }
  };
};

export default AgentLandingPage;
