import Link from 'Link';
// material-ui
import { Link as MuiLink } from '@mui/material';

// project imports
import { LISTING_PATH, BASE_PATH } from 'config';
import Logo from 'components/ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ htmlFor }) => (
  <MuiLink component={Link} href={BASE_PATH}>
    <Logo htmlFor={htmlFor} />
  </MuiLink>
);

export default LogoSection;
