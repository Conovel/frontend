import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import VisibilityIcon from '@mui/icons-material/Visibility';

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
}

const NovelCard = ({ novel }: { novel: Novel }) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant='outlined' sx={{ borderColor: 'black' }}>
        <CardContent>
          <Typography
            variant='body2'
            gutterBottom
            sx={{ color: 'text.secondary', fontSize: 14, minHeight: '3em' }}
          >
            {novel.description}
          </Typography>
          <Typography variant='h5' component='div' sx={{ minHeight: '3em' }}>
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

          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}
          >
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              <VisibilityIcon />
              {novel.views}
            </Typography>
            <Typography>{novel.date}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NovelCard;
