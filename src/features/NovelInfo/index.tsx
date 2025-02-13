// TransitionsModal.tsx
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { novels } from '../NovelList';
import { Grid } from '@mui/material';
import NovelCardContainer from '../../components/novelCard/container';
import { NovelProps } from '../../components/novelCard/presentation';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface TransitionsModalProps {
  open: boolean;
  handleClose: () => void;
  onNovelClick: () => void;
}

export default function TransitionsModal({
  open,
  handleClose,
}: TransitionsModalProps) {
  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          {/* Add the Grid component to display novels */}
          <Grid container spacing={2}>
            {novels.map((novel: NovelProps) => (
              <Grid item xs={12} sm={6} md={4} key={novel.title}>
                <NovelCardContainer
                  novel={novel}
                  onClick={() => {
                    /* handle click */
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
}
