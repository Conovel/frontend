import Chip from '@mui/material/Chip';

interface TagProps {
  label: string;
}

export const Tags = ({ label }: TagProps) => {
  return (
    <Chip
      label={label}
      size='small'
      sx={{ borderRadius: '4px', border: '1px solid black' }}
      variant='outlined'
    />
  );
};
