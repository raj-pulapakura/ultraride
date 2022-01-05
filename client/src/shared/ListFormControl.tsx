import { Add } from "@mui/icons-material";
import {
  Box,
  TextField,
  Typography,
  Chip,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import React, { useRef, useState, useEffect } from "react";

interface ListFormControlProps {
  label: string;
  list: any[];
  onListChange: (value: any) => void;
  onItemDelete: (value: any) => void;
  error: string;
  type?: string;
}

export const ListFormControl: React.FC<ListFormControlProps> = ({
  label,
  list,
  onListChange,
  onItemDelete,
  error,
  type,
}) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Box>
      <TextField
        InputProps={{
          endAdornment: (
            <IconButton
              children={<Add />}
              onClick={() => {
                onListChange(inputValue);
                setInputValue("");
              }}
            />
          ),
        }}
        fullWidth
        label={label}
        error={!!error}
        variant="outlined"
        value={inputValue}
        inputRef={inputRef}
        type={type || "text"}
        onChange={(e) => setInputValue(e.target.value)}
        sx={{ marginBottom: error ? "0.25rem" : "1rem" }}
      />
      <Box sx={{ marginBottom: error ? "1rem" : "0" }}>
        <Typography color="error" variant="caption">
          {error}
        </Typography>
      </Box>
      <Box sx={{ marginBottom: list.length ? "1rem" : "0" }}>
        {list.map((item) => (
          <Chip
            key={item}
            label={item}
            onDelete={() => onItemDelete(item)}
            sx={{ marginRight: "0.5rem" }}
          />
        ))}
      </Box>
    </Box>
  );
};
