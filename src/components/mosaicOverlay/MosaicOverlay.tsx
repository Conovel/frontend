import React from 'react';
import { Box } from '@mui/material';

interface MosaicOverlayProps {
  isVisible: boolean;
}

const MosaicOverlay: React.FC<MosaicOverlayProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
        background: `
          linear-gradient(
            to bottom,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 10%,
            rgba(255, 255, 255, 0.6) 30%,
            rgba(255, 255, 255, 0.9) 50%,
            rgba(255, 255, 255, 1) 70%,
            rgba(255, 255, 255, 1) 100%
          )
        `,
        backdropFilter: 'blur(8px)',
        zIndex: 5,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: '15px',
        '&::before': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.1) 2px,
              rgba(0, 0, 0, 0.1) 4px
            )
          `,
          zIndex: -1,
        },
      }}
    />
  );
};

export default MosaicOverlay;
