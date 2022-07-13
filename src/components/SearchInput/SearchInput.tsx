import React from 'react';
import { FormControl, OutlinedInput, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


interface SearchInputProps {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}
const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <FormControl variant="outlined" fullWidth margin="none">
      <OutlinedInput
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon htmlColor="#3A3C40" />
          </InputAdornment>
        }
        sx={{ borderRadius: 4.5 }}
        inputProps={{ sx: { py: 0.75, pl: 2, fontSize: 15 }, placeholder: 'Search Apps...' }}
        value={value}
        onChange={onChange}
      />
    </FormControl>
  );
};

export default SearchInput;
