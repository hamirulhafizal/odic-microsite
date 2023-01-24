import PropTypes from 'prop-types';
import { Provider, useStore } from 'react-redux';

// third-party
import { PersistGate } from 'redux-persist/integration/react';

// styles
import 'scss/style.scss';
import 'styles/globals.css';

import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

// project import
import NavigationScroll from 'layout/NavigationScroll';
import { persister, store } from 'store';
import ThemeCustomization from 'themes';
import MainLayout from 'layout/MainLayout';
import GuestGuard from 'layout/GuestGuard';
import MinimalLayout from 'layout/MinimalLayout';
import RTLLayout from 'components/ui-component/RTLLayout';
import Locales from 'components/ui-component/Locales';
import Snackbar from 'components/ui-component/extended/Snackbar';

import { ConfigProvider } from 'contexts/ConfigContext';

// import { FirebaseProvider as AuthProvider } from '../contexts/FirebaseContext';
// import { Auth0Provider as AuthProvider } from '../contexts/Auth0Context';
// import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';

import { ApiProvider as AuthProvider } from 'contexts/ApiContext';
import { wrapper } from 'store';
import { useSelector } from 'store';
import SeoMeta from 'components/SEO/SeoMeta';
import SeoMetaMain from 'components/SEO/SeoMetaMain';
import { useRouter } from 'next/router';

const Noop = ({ children }) => <> {children} </>;

Noop.propTypes = {
  children: PropTypes.node
};

// ==============================|| APP ||============================== //

function App({ Component, pageProps }) {
  const router = useRouter();
  const store = useStore(pageProps.initialReduxState);
  const { userData } = useSelector((state) => state?.user);

  const agent = userData?.userData[0];

  let Layout;
  switch (Component.Layout) {
    case 'authGuard':
      Layout = MainLayout;
      break;
    case 'guestGuard':
      Layout = GuestGuard;
      break;
    case 'minimalLayout':
      Layout = MinimalLayout;
      break;
    default:
      Layout = Noop;
  }

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={store.__persistor}>
          {() => (
            <>
              <ConfigProvider>
                <ThemeCustomization>
                  <RTLLayout>
                    {router !== undefined ? <SeoMeta /> : <SeoMetaMain />}
                    <Locales>
                      <NavigationScroll>
                        <AuthProvider>
                          <Layout>
                            <Component {...pageProps} />
                            <Snackbar />
                          </Layout>
                        </AuthProvider>
                      </NavigationScroll>
                    </Locales>
                  </RTLLayout>
                </ThemeCustomization>
              </ConfigProvider>
            </>
          )}
        </PersistGate>
      </Provider>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object
};

export default wrapper.withRedux(App);
