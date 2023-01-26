// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics, IconListCheck } from '@tabler/icons';

// constant
const icons = {
  IconDashboard,
  IconDeviceAnalytics,
  IconListCheck
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: <FormattedMessage id="Menu" />,
  type: 'group',
  children: [
    {
      id: 'board',
      title: <FormattedMessage id="Board" />,
      type: 'item',
      url: '/board/',
      icon: icons.IconListCheck,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
