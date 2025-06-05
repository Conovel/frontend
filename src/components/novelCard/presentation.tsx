import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { NovelProps } from '../../types/types';
import { NovelInfo } from '../../features/NovelInfo';

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
            {novel.chips.map((chip, index) => (
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
              {novel.tags.map((tag, index) => (
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
      <NovelInfo open={openModal} onClose={handleCloseModal} novel={novel} />
    </Box>
  );
};

export default NovelCard;
