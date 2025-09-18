import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Button, Fade, TextField, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router';
import { useEffect, useMemo, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import GroupsIcon from '@mui/icons-material/Groups';
import { NovelDetail, NovelsApi } from '../../api/api';
import { axiosConfig } from '../../axiosConfig';

interface NovelInfoProps {
  open: boolean;
  onClose: () => void;
  titleId: number;
}

/**
 * 小説概要モーダル
 */
export const NovelInfo = ({ open, onClose, titleId }: NovelInfoProps) => {
  const navigate = useNavigate();
  const [novel, setNovel] = useState<NovelDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const novelsApi = useMemo(() => new NovelsApi(axiosConfig), []);

  useEffect(() => {
    if (!titleId) {
      return;
    }
    const fetchNovelDetail = async () => {
      setLoading(true);
      setHasError(false);
      try {
        const response = await novelsApi.getNovelById(titleId);
        setNovel(response.data);
      } catch (error) {
        console.error('Error fetching novel detail:', error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchNovelDetail();
  }, [titleId, novelsApi]);

  const handleReadMore = () => {
    navigate('/novelView'); // novelViewページに遷移
  };

  if (loading) {
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
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '200px',
            }}
          >
            <CircularProgress />
          </Box>
        </Fade>
      </Modal>
    );
  }

  if (hasError || !novel) {
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
              textAlign: 'center',
            }}
          >
            <Typography color='error' sx={{ mb: 2 }}>
              小説の詳細情報が見つかりません
            </Typography>
            <Button variant='outlined' onClick={onClose}>
              閉じる
            </Button>
          </Box>
        </Fade>
      </Modal>
    );
  }

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
                sx={{
                  width: 24,
                  height: 24,
                  backgroundColor: 'white',
                }}
                src={novel.profileIconImage}
              >
                {novel.authorPenName?.charAt(0) || 'A'}
              </Avatar>
              <Typography sx={{ ml: 1 }}>{novel.authorPenName}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1.5 }}>
              {novel.titleGenres?.map((genre, index) => (
                <Box key={index}>{genre}</Box>
              ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1 }}>
              <Typography sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                <VisibilityIcon />
                {novel.readerCount}
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                <AccessTimeFilledIcon />
                {novel.updatedAt}
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                <EditNoteIcon />
                {novel.sentenceUserCount}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1 }}>
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                <DynamicFeedIcon />
                {novel.sentenceHierarchyCount}
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                <GroupsIcon />
                {novel.sentenceUserCount}
              </Typography>
            </Box>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant='outlined'
              value={novel.overview || novel.mainCopy}
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
