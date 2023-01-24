import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';

// ==============================|| FORM CONTROL SELECT ||============================== //

const FormControlSelect = ({
  id,
  name,
  captionLabel,

  value,
  onChange,

  fullWidth,
  error,
  helperText,

  currencies,
  formState,
  iconPrimary,
  iconSecondary,
  selected,
  textPrimary,
  textSecondary
}) => {
  const theme = useTheme();
  const IconPrimary = iconPrimary;
  const primaryIcon = iconPrimary ? <IconPrimary fontSize="small" sx={{ color: theme.palette.grey[700] }} /> : null;

  const IconSecondary = iconSecondary;
  const secondaryIcon = iconSecondary ? <IconSecondary fontSize="small" sx={{ color: theme.palette.grey[700] }} /> : null;

  const errorState = formState === 'error';
  const val = selected || '';

  const [currency, setCurrency] = useState(val);
  return (
    <FormControl fullWidth error={errorState}>
      <InputLabel id="demo-simple-select-label">{captionLabel}</InputLabel>
      <Select id={id} value={value} name={name} label={captionLabel} onChange={onChange}>
        {currencies.map((state, index) => (
          <MenuItem key={index} value={state?.value}>
            {state?.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

FormControlSelect.propTypes = {
  captionLabel: PropTypes.string,
  currencies: PropTypes.array,
  formState: PropTypes.string,
  iconPrimary: PropTypes.object,
  iconSecondary: PropTypes.object,
  selected: PropTypes.string,
  textPrimary: PropTypes.string,
  textSecondary: PropTypes.string
};

export default FormControlSelect;
