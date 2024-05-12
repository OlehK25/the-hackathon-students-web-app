import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function SelectComponent({
  defValue,
  placeholder,
  label,
}: {
  defValue: string;
  placeholder: string;
  label: string;
}) {
  const [value, setValue] = React.useState(defValue);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <p className="text-sm block py-1 font-medium text-gray-900">{label}</p>

      <FormControl sx={{ width: "320px" }}>
        <Select
          value={value}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Faculty" }}
          sx={{
            "& .MuiSelect-select": {
              paddingY: "8px",
              backgroundColor: "#f9fafb",
            },
            borderRadius: "8px",
            border: "1px solid #fcfdff !important",
            color: "#9ca3af",
          }}
        >
          <MenuItem value={value}>{placeholder}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectComponent;
