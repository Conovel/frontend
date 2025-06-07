import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { NovelProps } from '../../components/novelCard/presentation';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Button, Fade, TextField } from '@mui/material';
import { useNavigate } from 'react-router';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import GroupsIcon from '@mui/icons-material/Groups';

interface NovelInfoProps {
  open: boolean;
  onClose: () => void;
  novel: NovelProps;
}

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
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            variant='h6'
            component='div'
            sx={{
              minHeight: '2em',
            }}
          >
            {novel.title}
          </Typography>
          <Box sx={{ border: '1px solid black', padding: 1 }}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}
              color='text.secondary'
            >
              <Avatar
                alt={novel.avatar.alt}
                sx={{
                  width: 24,
                  height: 24,
                  backgroundColor: novel.avatar.color,
                }}
                src={novel.avatar.src}
              >
                {novel.avatar.text}
              </Avatar>
              <Typography sx={{ ml: 1 }}>{novel.author_user_name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1.5 }}>
              {novel.chips.map((chip, index) => (
                <Box key={index}>{chip.label}</Box>
              ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box
                sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}
                color='text.secondary'
              >
                {novel.tags.map((tag, index) => (
                  <Box key={index}>{tag.label}</Box>
                ))}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1 }}>
              <Typography sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                <VisibilityIcon />
                {novel.reader_count}
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                <AccessTimeFilledIcon />
                {novel.updated_at}
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                <EditNoteIcon />
                {novel.sentence_user_count}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1 }}>
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                <DynamicFeedIcon />
                {novel.sentence_hierarchy_count}
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                <GroupsIcon />
                {novel.sentence_user_count}
              </Typography>
            </Box>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant='outlined'
              value={novel.overview}
              InputProps={{
                readOnly: true,
              }}
              sx={{ mt: 2 }}
            />
            <Box
              sx={{ display: 'flex', justifyContent: 'center', mt: 1, gap: 2 }}
            >
              <Button
                variant='outlined'
                color='inherit'
                sx={{ borderColor: 'black', color: 'black', flex: 1 }}
                onClick={onClose}
              >
                戻る
              </Button>
              <Button
                variant='contained'
                color='primary'
                sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  flex: 1,
                  '&:hover': {
                    backgroundColor: 'white',
                    color: 'black',
                  },
                }}
                onClick={handleReadMore}
              >
                本文へ
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
