import React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function RatingMui({value, label = '', onChange, max=5 ,disabled = true}) {

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      {label && <Typography component="legend">{label}</Typography>}
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          onChange(newValue);
        }}
        disabled={disabled}
        max={max}
      />
    </Box>
  );
}