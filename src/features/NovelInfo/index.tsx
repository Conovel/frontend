import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import EditNoteIcon from '@mui/icons-material/EditNote';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router';
import { NovelProps } from '../../types/types';

interface NovelInfoProps {
  open: boolean;
  onClose: () => void;
  novel: NovelProps;
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: 800,
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
};

/**
 * 小説概要モーダル
 */
export const NovelInfo = ({ open, onClose, novel }: NovelInfoProps) => {
  const navigate = useNavigate();

  const handleViewDetail = () => {
    onClose();
    navigate(`/novelView/${novel.title_id}/${novel.sentence_id}`);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Fade in={open}>
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 2,
            }}
          >
            <Typography variant='h4' component='h2' sx={{ flex: 1, mr: 2 }}>
              {novel.title}
            </Typography>
            <Button
              variant='contained'
              startIcon={<OpenInNewIcon />}
              onClick={handleViewDetail}
              size='small'
            >
              詳細を見る
            </Button>
          </Box>

          <Typography variant='body1' paragraph>
            {novel.main_copy}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {novel.chips.map((chip, index) => (
              <Chip key={index} label={chip.label} variant='outlined' />
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              alt={novel.avatar.alt}
              sx={{
                width: 40,
                height: 40,
                backgroundColor: novel.avatar.color,
                mr: 2,
              }}
              src={novel.avatar.src}
            >
              {novel.avatar.text}
            </Avatar>
            <Box>
              <Typography variant='subtitle1'>{novel.avatar.alt}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {novel.tags.map((tag, index) => (
              <Chip key={index} label={tag.label} size='small' />
            ))}
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                <VisibilityIcon sx={{ mr: 0.5 }} />
                {novel.reader_count}
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTimeFilledIcon sx={{ mr: 0.5 }} />
                {novel.updated_at}
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                <EditNoteIcon sx={{ mr: 0.5 }} />
                {novel.sentence_user_count}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
