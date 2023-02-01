import React from 'react';

import Head from 'next/head';
import { BASE_PATH } from 'config';

const SeoMetaMain = () => {
  return (
    <>
      <Head>
        <title>{'One Dream Legacy - Most Professional Real Estate Agency'}</title>
        <link rel="icon" type="image/x-icon" href="/oneDream.ico" />
        <meta name="title" content="One Dream Legacy - Most Professional Real Estate Agency" />
        <meta name="description" content="One Dream Legacy - Most Professional Real Estate Agency" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`http://onedreamproperty.com.my`} />
        <meta property="og:title" content="One Dream Legacy - Most Professional Real Estate Agency" />
        <meta
          property="og:description"
          content="ONE LEGACY REALTY SDN BHD E(1) 2004 is a registered Real Estate Agents (REA) with Board of Valuers, Appraisers, Estate Agents and Property Managers (BOVAEA). Our agency was incorporated on APRIL 2018 and which is located at Johor Bahru area that’s include our HQ Office at Damansara Aliff Tampoi and our New Branch at Taman Adda Height"
        />
        <meta property="og:image" content={`http://onedreamproperty.com.my/assets/images/previewImg1.jpg`} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta property="og:locale" content="en_US" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`http://onedreamproperty.com.my`} />
        <meta property="twitter:title" content="One Dream Legacy - Most Professional Real Estate Agency" />
        <meta
          property="twitter:description"
          content="ONE LEGACY REALTY SDN BHD E(1) 2004 is a registered Real Estate Agents (REA) with Board of Valuers, Appraisers, Estate Agents and Property Managers (BOVAEA). Our agency was incorporated on APRIL 2018 and which is located at Johor Bahru area that’s include our HQ Office at Damansara Aliff Tampoi and our New Branch at Taman Adda Height"
        />
        <meta property="twitter:image" content={`http://onedreamproperty.com.my/assets/images/previewImg1.jpg`} />
        <meta property="article:publisher" content="https://www.facebook.com/OneDreamLegacyJohor" />

        <meta
          name="keywords"
          content="sewa rumah,homestay Jb, mudah.my, propertyguru.com.my, onedream, agoda, trivago, sewa rumah murah, rent a house, house for rent johor bahru, house for rent mount austin, house for rent skudai, house for rent gelang patah,   house for rent masai,  rumah sewa johor bahru, rumah sewa skudai, rumah sewa masai, iproperty, propertyguru, ibilik, mudah, rumah sewa murah, apartment johor bahru, apartment for rent johor bahru, apartment for rent mount austin, apartment for rent, apartment for rent kuala lumpur, house for rent, hoom, hoomventure, hoom venture sdn bhd, bryce wong, raymond koo, bosskoo, Real Estate Agents (REA), Johor Bahru, property, rumah sewa, rumah lelong, beli rumah,  Rent / Sale , Buy property, Academy , Training Services, Valuation Consultancy Services, Property Investment Consultancy, Property Legal Consultancy, Refinance Consultancy, Find properties for rent, sell and short-stay"
        />
        <meta name="theme-color" content="black" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
    </>
  );
};

export default SeoMetaMain;
