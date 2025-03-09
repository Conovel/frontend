// TransitionsModal.tsx
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { novels } from '../NovelList';
import { Grid } from '@mui/material';
import { NovelProps } from '../../types/types';
import NovelCardContainer from '../../components/novelCard/container';

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
  onNovelClick: (novel: NovelProps) => void;
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
            {novels.map((novel, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <NovelCardContainer
                  novel={{
                    title: novel.title,
                    main_copy: novel.main_copy,
                    overview: novel.overview,
                    popular: novel.popular,
                    newArrival: novel.newArrival,
                    avatar: novel.avatar,
                    author_user_name: novel.author_user_name,
                    chips: novel.chips,
                    sentence_hierarchy_count: novel.sentence_hierarchy_count,
                    created_at: new Date().toISOString(),
                    sentence_id: 0,
                    sentence: '',
                    userId: 0,
                    userName: '',
                    profile_icon_image: '',
                    evaluation_good_count: 0,
                    evaluation_stay_count: 0,
                    sentence_user_count: 0,
                    tags: [],
                    reader_count: 0,
                    updated_at: new Date().toISOString(),
                    text: '',
                    textIndex: 0,
                    children: [],
                    main: [],
                    parent: [],
                  }}
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
