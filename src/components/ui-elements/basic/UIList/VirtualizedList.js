// material-ui
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

// third party
import { FixedSizeList } from 'react-window';

// list render
function renderRow({ index, style }) {
  return (
    <ListItemButton style={style} key={index}>
      <ListItemText disableGutters primary={`Item ${index + 1}`} />
    </ListItemButton>
  );
}

// ================================|| UI LIST - SCROLLABLE ||================================ //

export default function VirtualizedList() {
  return (
    <div>
      <FixedSizeList height={'auto'} width="auto" itemSize={46} itemCount={4}>
        {renderRow}
      </FixedSizeList>
    </div>
  );
}
