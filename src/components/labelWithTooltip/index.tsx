import { InfoOutlined } from '@mui/icons-material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

interface LabelWithTooltipProps {
  label: string;
  hasTooltip?: boolean;
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
        <Tooltip title={tooltipText}>
          <IconButton sx={{ padding: 0 }}>
            <InfoOutlined />
          </IconButton>
        </Tooltip>
      ) : null}
    </Box>
  );
};
