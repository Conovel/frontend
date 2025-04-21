// TransitionsModal.tsx
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { novels } from '../NovelList/mocks/data';
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
            {novels.map((novel: NovelProps, index: number) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <NovelCardContainer
                  novel={{
                    title: novel.title,
                    main_copy: novel.main_copy,
                    overview: novel.overview,
                    popular: novel.popular,
                    newArrival: novel.newArrival,
                    author_user_name: novel.author_user_name,
                    chips: novel.chips,
                    tags: novel.tags,
                    reader_count: novel.reader_count,
                    avatar: novel.avatar,
                    sentence_id: novel.sentence_id,
                    sentence_user_count: novel.sentence_user_count,
                    sentence_hierarchy_count: novel.sentence_hierarchy_count,
                    sentence: novel.sentence,
                    textIndex: novel.textIndex,
                    userId: novel.userId,
                    userName: novel.userName,
                    profile_icon_image: novel.profile_icon_image,
                    evaluation_good_count: novel.evaluation_good_count,
                    evaluation_stay_count: novel.evaluation_stay_count,
                    created_at: novel.created_at,
                    updated_at: novel.updated_at,
                    children: novel.children,
                    main: novel.main,
                    parent: novel.parent,
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
