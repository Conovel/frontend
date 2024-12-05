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
import { Button, TextField } from '@mui/material';

interface Novel {
  description: string;
  title: string;
  chips: React.ReactNode[];
  avatar: {
    src: string;
    alt: string;
    color: string;
    text: string;
  };
  author: string;
  tags: React.ReactNode[];
  views: number;
  date: string;
  sentence_user_count: number;
  sentence_count: number;
}

const NovelCard = ({
  novel,
  onClick,
}: {
  novel: Novel;
  onClick: () => void;
}) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant='outlined' sx={{ borderColor: 'black' }} onClick={onClick}>
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
            {novel.description}
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
              <Box key={index}>{chip}</Box>
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
              <Typography sx={{ ml: 1 }}>{novel.author}</Typography>
            </Box>
            <Box
              sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1 }}
              color='text.secondary'
            >
              {novel.tags.map((tag, index) => (
                <Box key={index}>{tag}</Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1.5 }}>
            <Typography sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              {' '}
              {/* Add margin-right */}
              <VisibilityIcon />
              {novel.views}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              {' '}
              {/* Add margin-right */}
              <AccessTimeFilledIcon />
              {novel.date}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              {' '}
              <EditNoteIcon />
              {novel.sentence_user_count}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1 }}>
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              {' '}
              <DynamicFeedIcon />
              {novel.sentence_count}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              {' '}
              <GroupsIcon />
              {novel.sentence_user_count}
            </Typography>
          </Box>
          <Box>
            <Typography variant='h6'>あらすじ</Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant='outlined'
              value={novel.description}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button variant='contained' color='secondary'>
              戻る
            </Button>
            <Button variant='contained' color='primary'>
              本文へ
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NovelCard;
