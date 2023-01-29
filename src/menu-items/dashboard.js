// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics, IconListCheck, IconList } from '@tabler/icons';
import ListIcon from '@mui/icons-material/List';

// constant
const icons = {
  IconDashboard,
  IconDeviceAnalytics,
  IconList,
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
      icon: icons.IconList,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
