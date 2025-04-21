import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import GroupsIcon from '@mui/icons-material/Groups';
import { Button, TextField, Modal } from '@mui/material';
import { NovelProps } from '../../types/types';

const NovelCard = ({ novel }: { novel: NovelProps; onClick: () => void }) => {
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card
        variant='outlined'
        sx={{ borderColor: 'black' }}
        onClick={handleOpenModal}
      >
        <CardContent>
          <Typography
            variant='body2'
            gutterBottom
            sx={{
              color: 'text.secondary',
              fontSize: 14,
              minHeight: '2em',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {novel.main_copy}
          </Typography>
          <Typography
            variant='h5'
            component='div'
            sx={{
              minHeight: '2em',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {novel.title}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1.5 }}>
            {novel.chips?.map((chip, index) => (
              <Box key={index}>{chip.label}</Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
            </Box>
            <Box
              sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}
              color='text.secondary'
            >
              {novel.tags?.map((tag, index) => (
                <Box key={index}>{tag.label}</Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1.5 }}>
            <Typography sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <VisibilityIcon />
              {novel.reader_count}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <AccessTimeFilledIcon />
              {novel.updated_at}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              <EditNoteIcon />
              {novel.sentence_user_count}
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <NovelModal open={openModal} onClose={handleCloseModal} novel={novel} />
    </Box>
  );
};

const NovelModal = ({
  open,
  onClose,
  novel,
}: {
  open: boolean;
  onClose: () => void;
  novel: NovelProps;
}) => {
  const navigate = useNavigate(); // historyを初期化
  const handleReadMore = () => {
    navigate('/novelView'); // novelViewページに遷移
  };

  return (
    <Modal open={open} onClose={onClose}>
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
            {novel.chips?.map((chip, index) => (
              <Box key={index}>{chip.label}</Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}
              color='text.secondary'
            >
              {novel.tags?.map((tag, index) => (
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
    </Modal>
  );
};

export default NovelCard;
