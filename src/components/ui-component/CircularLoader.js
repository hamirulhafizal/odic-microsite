// material-ui
import { CircularProgress } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

// styles
const LoaderWrapper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1301,
  width: '100%',
  backgroundColor: 'black',
  height: '100%',
  opacity: 0.5
});

// ==============================|| LOADER ||============================== //

const CircularLoader = ({ color, className, size, sx }) => (
  <LoaderWrapper>
    <CircularProgress color={color} className={className} size={size} sx={sx} />
  </LoaderWrapper>
);

export default CircularLoader;
