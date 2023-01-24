// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconKey, IconReceipt2, IconBug, IconBellRinging, IconPhoneCall, IconQuestionMark, IconShieldLock } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconReceipt2,
  IconBug,
  IconBellRinging,
  IconPhoneCall,
  IconQuestionMark,
  IconShieldLock
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: <FormattedMessage id="pages" />,
  caption: <FormattedMessage id="pages-caption" />,
  type: 'group',
  children: [
    {
      id: 'contact-us',
      title: <FormattedMessage id="contact-us" />,
      type: 'item',
      icon: icons.IconPhoneCall,
      url: '/pages/contact-us'
    },
    {
      id: 'faqs',
      title: <FormattedMessage id="faqs" />,
      type: 'item',
      icon: icons.IconQuestionMark,
      url: '/pages/faqs'
    },
    {
      id: 'privacy-policy',
      title: <FormattedMessage id="privacy-policy" />,
      type: 'item',
      icon: icons.IconShieldLock,
      url: '/pages/privacy-policy'
    }
  ]
};

export default pages;
