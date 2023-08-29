import { getSearchedFieldStyles } from "../helpers";
import TextField from "@mui/material/TextField";

const SearchField = ({ handleSearchedFieldChange }) => (
  <TextField
    sx={getSearchedFieldStyles()}
    id="outlined-helperText"
    label="Search Band"
    defaultValue=""
    onChange={handleSearchedFieldChange}
  />
);

export default SearchField;
