import { BASE_PATH } from 'config';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="title" content="Most Professional Real Estate Agency" />
        <meta
          name="description"
          content="ONE LEGACY REALTY SDN BHD E(1) 2004 is a registered Real Estate Agents (REA) with Board of Valuers, Appraisers, Estate Agents and Property Managers (BOVAEA). Our agency was incorporated on APRIL 2018 and which is located at Johor Bahru area that’s include our HQ Office at Damansara Aliff Tampoi and our New Branch at Taman Adda Height."
        />
        <meta
          name="keywords"
          content="sewa rumah, sewa rumah murah, rent a house, house for rent johor bahru, house for rent mount austin, house for rent skudai, house for rent gelang patah,   house for rent masai,  rumah sewa johor bahru, rumah sewa skudai, rumah sewa masai, iproperty, propertyguru, ibilik, mudah, rumah sewa murah, apartment johor bahru, apartment for rent johor bahru, apartment for rent mount austin, apartment for rent, apartment for rent kuala lumpur, house for rent, hoom, hoomventure, hoom venture sdn bhd, bryce wong, raymond koo, bosskoo, Real Estate Agents (REA), Johor Bahru, property, rumah sewa, rumah lelong, beli rumah,  Rent / Sale , Buy property, Academy , Training Services, Valuation Consultancy Services, Property Investment Consultancy, Property Legal Consultancy, Refinance Consultancy, Find properties for rent, sell and short-stay"
        />
        <meta property="og:image" content={`${BASE_PATH}assets/images/previewImg1.jpg`} />
        {/* <meta content="https://target.scene7.com/is/image/Target/GUEST_33494c00-2310-4da2-9204-1b6f272e730a" property="og:image" /> */}

        {/* <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" /> */}
        <meta name="theme-color" content="black" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="article:publisher" content="https://www.facebook.com/OneDreamLegacyJohor" />
        <meta property="og:title" content="One Dream Legacy - Most Professional Real Estate Agency" />
        <meta
          property="og:description"
          content="ONE LEGACY REALTY SDN BHD E(1) 2004 is a registered Real Estate Agents (REA) with Board of Valuers, Appraisers, Estate Agents and Property Managers (BOVAEA). Our agency was incorporated on APRIL 2018 and which is located at Johor Bahru area that’s include our HQ Office at Damansara Aliff Tampoi and our New Branch at Taman Adda Height"
        />
        <meta name="twitter:card" content="summary" />
        {/* <meta property="twitter:url" content="https://onedreamproperty.com.my" /> */}
        <meta property="twitter:title" content="One Dream Legacy - Most Professional Real Estate Agency" />
        <meta property="twitter:image" content={`${BASE_PATH}assets/images/previewImg1.jpg`} />

        <meta
          name="twitter:description"
          content="ONE LEGACY REALTY SDN BHD E(1) 2004 is a registered Real Estate Agents (REA) with Board of Valuers, Appraisers, Estate Agents and Property Managers (BOVAEA). Our agency was incorporated on APRIL 2018 and which is located at Johor Bahru area that’s include our HQ Office at Damansara Aliff Tampoi and our New Branch at Taman Adda Height"
        />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />

        {/* <meta property="article:modified_time" content="2021-12-20T13:35:53+00:00" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
