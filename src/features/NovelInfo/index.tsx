import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Button, Fade, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router';
import { useNovelDetail } from '../../hooks/api/useNovelApi';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import GroupsIcon from '@mui/icons-material/Groups';

interface NovelInfoProps {
  open: boolean;
  onClose: () => void;
  titleId: number | string;
}

/**
 * 小説概要モーダル
 */
export const NovelInfo = ({ open, onClose, titleId }: NovelInfoProps) => {
  const navigate = useNavigate();

  const {
    data: novel,
    loading,
    error,
    refetch,
  } = useNovelDetail(
    titleId.toString(),
    open, // モーダルが開いているときのみAPIを呼び出す
  );

  const handleReadMore = () => {
    navigate(`/titles/${titleId}/sentences/1`);
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

  if (error || !novel) {
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
            <Alert severity='error' sx={{ mb: 2 }}>
              小説情報の取得に失敗しました。
            </Alert>
            <Button variant='outlined' onClick={() => refetch()}>
              再読み込み
            </Button>
            <Button sx={{ ml: 2 }} onClick={onClose}>
              閉じる
            </Button>
          </Box>
        </Fade>
      </Modal>
    );
  }

  // 統計情報の計算
  const updateDate = novel.updatedAt
    ? new Date(novel.updatedAt).toLocaleDateString('ja-JP')
    : 'N/A';
  const createdDate = novel.createdAt
    ? new Date(novel.createdAt).toLocaleDateString('ja-JP')
    : 'N/A';

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
          {/* 小説タイトル */}
          <Typography
            variant='h4'
            sx={{
              pb: 2,
              fontWeight: 'bold',
            }}
          >
            {novel.title}
          </Typography>

          {/* 小説の説明 */}
          <Typography
            variant='body1'
            sx={{
              pb: 3,
              color: 'text.secondary',
            }}
          >
            {novel.description}
          </Typography>

          {/* 統計情報 */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3,
              pb: 3,
              borderTop: '1px solid',
              borderBottom: '1px solid',
              borderColor: 'divider',
              pt: 2,
              mb: 3,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <VisibilityIcon sx={{ color: 'text.secondary' }} />
              <Typography variant='body2' color='text.secondary'>
                閲覧数: {novel.viewCount || 0}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTimeFilledIcon sx={{ color: 'text.secondary' }} />
              <Typography variant='body2' color='text.secondary'>
                更新日: {updateDate}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EditNoteIcon sx={{ color: 'text.secondary' }} />
              <Typography variant='body2' color='text.secondary'>
                作成日: {createdDate}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DynamicFeedIcon sx={{ color: 'text.secondary' }} />
              <Typography variant='body2' color='text.secondary'>
                投稿形式:{' '}
                {novel.postType === 'TREE' ? 'ツリー形式' : '順次形式'}
              </Typography>
            </Box>
          </Box>

          {/* タグ */}
          {novel.tags && novel.tags.length > 0 && (
            <Box sx={{ pb: 3 }}>
              <Typography
                variant='subtitle2'
                sx={{ pb: 1, fontWeight: 'bold' }}
              >
                タグ
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {novel.tags.map((tag: string, index: number) => (
                  <Box
                    key={index}
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      px: 2,
                      py: 0.5,
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                    }}
                  >
                    {tag}
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* 作者情報 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              pb: 3,
            }}
          >
            <Avatar sx={{ width: 50, height: 50 }}>
              {novel.authorName?.charAt(0) || 'A'}
            </Avatar>
            <Box>
              <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                {novel.authorName || '名無しの作者'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <GroupsIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant='caption' color='text.secondary'>
                  ID: {novel.authorId}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* アクションボタン */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2,
            }}
          >
            <Button variant='outlined' onClick={onClose}>
              閉じる
            </Button>
            <Button variant='contained' onClick={handleReadMore}>
              読む
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default NovelInfo;
