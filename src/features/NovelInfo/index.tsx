import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Button, Fade, TextField } from '@mui/material';
import { useNavigate } from 'react-router';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import GroupsIcon from '@mui/icons-material/Groups';
import { NovelProps } from '../../types/types';

interface NovelInfoProps {
  open: boolean;
  handleClose: () => void;

/**
 * 小説概要モーダル
 */
export const NovelInfo = ({ open, onClose, novel }: NovelInfoProps) => {
  const navigate = useNavigate(); // historyを初期化
  const handleReadMore = () => {
    navigate('/novelView'); // novelViewページに遷移
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Fade in={open}>
        <Box sx={style}>
          {/* Add the Grid component to display novels */}
          <Grid container spacing={2}>
            {novels.map((novel: NovelProps, index: number) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <NovelCardContainer
                  novel={{
                    title_id: novel.title_id,
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
                    textIndex: 0,
                    children: [],
                    main: [],
                    parent: [],
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};
