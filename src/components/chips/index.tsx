import Chip from '@mui/material/Chip';

interface ChipProps {
  label: string;
}

export const Chips = ({ label }: ChipProps) => {
  return (
    <Chip
      label={label}
      size='small'
      sx={{ borderRadius: '4px', border: '1px solid black' }}
      variant='outlined'
    />
  );
};
