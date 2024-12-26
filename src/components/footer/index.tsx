import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { LINK } from '../../const/link';

export const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '100%',
        backgroundColor: '#4D4D4D',
        padding: '8px',
        justifyContent: 'space-between',
        position: 'sticky',
        top: '100vh',
        boxSizing: 'border-box',
      }}
    >
      {/** 広告エリア */}
      {/** // TODO:Adsense未設定なので、仮実装 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
          fontSize: '24px',
          border: '1px solid #000000',
          color: '#FFFFFF',
        }}
      >
        広告エリア
      </Box>

      {/** リンク */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '0.5rem',
        }}
      >
        <Link
          to={LINK.terms}
          style={{ color: '#FFFFFF', textDecoration: 'none' }}
        >
          利用規約
        </Link>
        <Box>/</Box>
        {/** // TODO:仮のリンク */}
        <Link to={'/'} style={{ color: '#FFFFFF', textDecoration: 'none' }}>
          お問合せ
        </Link>
        <Box>/</Box>
        <Link
          to={LINK.company}
          style={{ color: '#FFFFFF', textDecoration: 'none' }}
        >
          運営会社
        </Link>
      </Box>

      {/** コピーライト */}
      <Box sx={{ fontSize: '0.5rem', color: '#FFFFFF', textAlign: 'center' }}>
        &copy;2025 合同会社TechnoKuRo. All Rights Reserved.
      </Box>
    </Box>
  );
};
