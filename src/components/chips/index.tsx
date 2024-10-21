import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export function NewArrivalsChips() {
  return (
    <Stack direction='row' spacing={1}>
      <Chip label='新着' size='small' />
    </Stack>
  );
}

export function PopularChips() {
  return (
    <Stack direction='row' spacing={1}>
      <Chip label='人気' size='small' />
    </Stack>
  );
}
