import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { COMPANY_INFO } from '../../const/companyInfo';

export const CompanyPresenter = () => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      sx={{ width: '100%' }}
      gap='16px'
    >
      <Typography variant='h4'>運営会社</Typography>
      <Box>
        <Typography variant='body1'>{COMPANY_INFO.companyName}</Typography>
        <Box display='flex' alignItems='center' gap='4px'>
          <Link
            href={COMPANY_INFO.link}
            target='_blank'
            rel='noopener noreferrer'
            variant='body1'
          >
            {COMPANY_INFO.link}
          </Link>
          <OpenInNewOutlinedIcon fontSize='small' />
        </Box>
      </Box>
    </Box>
  );
};
