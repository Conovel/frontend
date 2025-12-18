import React, { useState } from 'react';
import { InfoOutlined } from '@mui/icons-material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface LabelWithTooltipProps {
  /** ラベル */
  label: string;
  /** Tooltip必要か */
  hasTooltip?: boolean;
  /** Tooltipのテキスト */
  tooltipText?: React.ReactNode;
}

/**
 * Tooltip可能なラベル
 */
export const LabelWithTooltip = ({
  label,
  hasTooltip = false,
  tooltipText,
}: LabelWithTooltipProps) => {
  const theme = useTheme();
  const isTouchDevice = useMediaQuery('(hover: none), (pointer: coarse)');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);
  const tooltipId = popoverOpen ? `${label}-tooltip` : undefined;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexShrink: 0,
      }}
    >
      <Typography>{label}</Typography>
      {hasTooltip ? (
        isTouchDevice ? (
          <>
            <IconButton
              sx={{ padding: 0 }}
              aria-label={`${label}の説明を表示`}
              aria-describedby={tooltipId}
              onClick={handleOpen}
            >
              <InfoOutlined />
            </IconButton>
            <Popover
              id={tooltipId}
              open={popoverOpen}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              disableRestoreFocus
              PaperProps={{
                sx: {
                  p: 1.5,
                  maxWidth: 280,
                  backgroundColor: theme.palette.background.paper,
                },
              }}
            >
              <Typography variant='body2'>{tooltipText}</Typography>
            </Popover>
          </>
        ) : (
          <Tooltip title={tooltipText} arrow enterTouchDelay={0}>
            <IconButton sx={{ padding: 0 }} aria-label={`${label}の説明を表示`}>
              <InfoOutlined />
            </IconButton>
          </Tooltip>
        )
      ) : null}
    </Box>
  );
};
