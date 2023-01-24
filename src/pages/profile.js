import React from 'react';
import PropTypes from 'prop-types';
import Link from 'Link';

// material-ui
import { Box, Tab, Tabs } from '@mui/material';

// project imports
import Profile from 'components/users/account-profile/Profile3/Profile';
import Billing from 'components/users/account-profile/Profile3/Billing';
import Security from 'components/users/account-profile/Profile3/Security';
import Notifications from 'components/users/account-profile/Profile3/Notifications';
import MainCard from 'components/ui-component/cards/MainCard';

// tabs
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

// ==============================|| PROFILE 3 ||============================== //

const Profile3 = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MainCard title="Account">
      <div>
        <Tabs
          value={value}
          indicatorColor="primary"
          onChange={handleChange}
          sx={{
            mb: 3,
            minHeight: 'auto',
            '& button': {
              minWidth: 100
            },
            '& a': {
              minHeight: 'auto',
              minWidth: 10,
              py: 1.5,
              px: 1,
              mr: 2.25,
              color: 'grey.600'
            },
            '& a.Mui-selected': {
              color: 'primary.main'
            }
          }}
          aria-label="simple tabs example"
          variant="scrollable"
        >
          <Tab component={Link} href="#" label="Profile" {...a11yProps(0)} />
          {/* <Tab component={Link} href="#" label="Billing" {...a11yProps(1)} />
          <Tab component={Link} href="#" label="Security" {...a11yProps(1)} />
          <Tab component={Link} href="#" label="Notifications" {...a11yProps(2)} /> */}
        </Tabs>
        <TabPanel value={value} index={0}>
          <Profile />
        </TabPanel>
        {/* <TabPanel value={value} index={1}>
          <Billing />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Security />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Notifications />
        </TabPanel> */}
      </div>
    </MainCard>
  );
};
Profile3.Layout = 'authGuard';

export default Profile3;
