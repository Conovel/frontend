import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { NovelInfo } from '../../features/NovelInfo';
import type { NovelListItem } from '../../api/api';

const NovelCard = ({
  novel,
}: {
  novel: NovelListItem;
  onClick?: () => void;
}) => {
  const [openModal, setOpenModal] = React.useState(false);

  const hasTitleId = typeof novel.titleId === 'number';

  const displaySentence = novel.famousSentenceText || '';
  const genres = novel.titleGenres || [];
  const avatarText = (novel.authorPenName || '').charAt(0);
  const readerCount = novel.viewCount ?? 0;
  const updatedAt = novel.updatedAt || novel.createdAt || '';
  const evaluationCount = novel.evaluationGoodCount ?? 0;

  const formattedDate = React.useMemo(() => {
    if (!updatedAt) {
      return '';
    }

    const date = new Date(updatedAt);
    if (Number.isNaN(date.getTime())) {
      return updatedAt;
    }

    return date.toLocaleDateString();
  }, [updatedAt]);

  const handleOpenModal = () => {
    if (!hasTitleId) {
      return;
    }
    setOpenModal(true);
  };
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
            {displaySentence}
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
          {genres.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1.5 }}>
              {genres.map((genre, index) => (
                <Box key={`${genre}-${index}`}>{genre}</Box>
              ))}
            </Box>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}
              color='text.secondary'
            >
              <Avatar
                alt={novel.authorPenName || ''}
                sx={{
                  width: 24,
                  height: 24,
                  backgroundColor: 'white',
                }}
                src={novel.profileIconImage}
              >
                {avatarText}
              </Avatar>
            </Box>
            {novel.isNew || novel.isFamous ? (
              <Box
                sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1 }}
                color='text.secondary'
              >
                {novel.isNew && <Box>NEW</Box>}
                {novel.isFamous && <Box>POPULAR</Box>}
              </Box>
            ) : (
              <Box sx={{ mb: 1.5 }} />
            )}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1.5 }}>
            <Typography sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <VisibilityIcon />
              {readerCount}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <AccessTimeFilledIcon />
              {formattedDate}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              <EditNoteIcon />
              {evaluationCount}
            </Typography>
          </Box>
        </CardContent>
      </Card>
      {hasTitleId && (
        <NovelInfo
          open={openModal}
          onClose={handleCloseModal}
          titleId={novel.titleId || 0}
        />
      )}
    </Box>
  );
};

export default NovelCard;
