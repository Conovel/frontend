import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Grid } from '@mui/material';
import { NovelProps } from '../../types/types';
import NovelCardContainer from '../../components/novelCard/container';
import { novels } from '../NovelList/mocks/data';

interface NovelInfoProps {
  open: boolean;
  onClose: () => void;
}

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

/**
 * 小説概要モーダル
 */
export const NovelInfo = ({ open, onClose }: NovelInfoProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Fade in={open}>
        <Box sx={modalStyle}>
          <Grid container spacing={2}>
            {novels.map((novel: NovelProps) => (
              <Grid item xs={12} sm={6} md={4} key={novel.id}>
                <NovelCardContainer novel={novel} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};
