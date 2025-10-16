import React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router';
import { FOOTER_LINKS } from '../../const/link';

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
        boxSizing: 'border-box',
        position: 'sticky',
        left: 0,
        bottom: 0,
        zIndex: 2000,
        boxShadow: '0 -2px 8px rgba(0,0,0,0.15)',
      }}>
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
        }}>
        {FOOTER_LINKS.map((link, idx) => (
          <React.Fragment key={link.label + idx}>
            <Link
              to={link.to}
              style={{ color: '#FFFFFF', textDecoration: 'none' }}
              {...(link.targetBlank ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {link.label}
            </Link>
            {idx < FOOTER_LINKS.length - 1 && <Box key={"sep-" + idx}>/</Box>}
          </React.Fragment>
        ))}
      </Box>

      {/** コピーライト */}
      <Box sx={{ fontSize: '0.5rem', color: '#FFFFFF', textAlign: 'center' }}>
        &copy;2025 合同会社TechnoKuRo. All Rights Reserved.
      </Box>
    </Box>
  );
};
