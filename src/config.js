export const JWT_API = {
  secret: 'SECRET-KEY',
  timeout: '1 days'
};

export const FIREBASE_API = {
  apiKey: 'AIzaSyBernKzdSojh_vWXBHt0aRhf5SC9VLChbM',
  authDomain: 'berry-material-react.firebaseapp.com',
  projectId: 'berry-material-react',
  storageBucket: 'berry-material-react.appspot.com',
  messagingSenderId: '901111229354',
  appId: '1:901111229354:web:a5ae5aa95486297d69d9d3',
  measurementId: 'G-MGJHSL8XW3'
};

export const AUTH0_API = {
  client_id: '7T4IlWis4DKHSbG8JAye4Ipk0rvXkH9V',
  domain: 'dev-w0-vxep3.us.auth0.com'
};

export const AWS_API = {
  poolId: 'us-east-1_AOfOTXLvD',
  appClientId: '3eau2osduslvb7vks3vsh9t7b0'
};

// basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
// like '/berry-material-react/react/default'
export const BASE_PATH = '/';

export const DASHBOARD_PATH = '/dashboard';
export const LISTING_PATH = '/listing';

export const GOOLE_API_MAP = 'AIzaSyCw3wsa90tFvFey2uNhqaA3iIn_eLCFTv8';

export const BACKEND_PATH = 'https://onedream.dynamicdigital.guru';
//export const BACKEND_PATH = 'http://127.0.0.1:8000';

export const BACKEND_WP_PATH = 'https://onedreamproperty.net';
export const BACKEND_WP_MEDIA = 'wp-json/wp/v2/media';
export const BACKEND_WP_POST = 'wp-json/wp/v2/posts';

export const WORDPRESS_API_URL = 'https://onedreamproperty.net/graphql';
// export const WORDPRESS_AUTH_REFRESH_TOKEN = 'wp-json/wp/v2/posts';
// export const WORDPRESS_PREVIEW_SECRET = 'wp-json/wp/v2/posts';

const config = {
  fontFamily: `Roboto, sans-serif`,
  borderRadius: 8,
  outlinedFilled: true,
  navType: 'light', // light, dark
  presetColor: 'default', // default, theme1, theme2, theme3, theme4, theme5, theme6
  locale: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
  rtlLayout: false
};

export default config;
