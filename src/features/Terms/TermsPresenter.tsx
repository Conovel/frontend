import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';

export const TermsPresenter = () => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      sx={{ width: 1 }}
      gap='16px'
      height='100%'
    >
      <Typography variant='h4'>利用規約</Typography>
      <Box flex={1}>
        <iframe
          src='/terms.pdf#toolbar=0&navpanes=0&view=FitH'
          width='100%'
          height='100%'
          style={{ border: 'none' }}
        />
      </Box>
    </Box>
  );
};
