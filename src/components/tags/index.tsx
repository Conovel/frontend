import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export function LoveStoryTags() {
  return (
    <Stack direction='row' spacing={2}>
      <Chip
        label='ラブストーリー'
        size='small'
        sx={{ borderRadius: '4px', border: '1px solid black' }}
        variant='outlined'
      />
    </Stack>
  );
}

export function FantasyTags() {
  return (
    <Stack direction='row' spacing={2}>
      <Chip
        label='ファンタジー'
        size='small'
        sx={{ borderRadius: '4px', border: '1px solid black' }}
        variant='outlined'
      />
    </Stack>
  );
}
