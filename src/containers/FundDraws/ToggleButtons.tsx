import React, { Dispatch } from 'react';
import GridOnIcon from '@material-ui/icons/GridOn';
import ListIcon from '@material-ui/icons/List';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

interface props {
  value: string
  onChange: Dispatch<string>
}

export default function ToggleButtons({ value, onChange }) {


  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    onChange(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleAlignment}
      aria-label="list or grid view"
      size="small"
    >
      <ToggleButton value="list" aria-label="left aligned">
        <ListIcon />
      </ToggleButton>
      <ToggleButton value="grid" aria-label="centered">
        <GridOnIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}