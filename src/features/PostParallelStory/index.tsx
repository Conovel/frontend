import React from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  DialogContent,
} from '@mui/material';
import { z } from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateSentenceRequest } from '../../types/types';

interface PostParallelStoryProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (sentenceRequest: CreateSentenceRequest) => void;
  parentText: string;
  mainText: string;
  sentenceId: number;
}

// バリデーションスキーマを定義
const schema = z.object({
  text: z.string().max(100, '100文字以内で入力してください'),
});

// Zodスキーマから型を取得
type PostParallelStoryFormValues = z.infer<typeof schema>;

export const PostParallelStory: React.FC<PostParallelStoryProps> = ({
  open,
  onClose,
  onSubmit,
  parentText,
  mainText,
  sentenceId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<PostParallelStoryFormValues>({
    resolver: zodResolver(schema),
  });

  const watchText = useWatch({ control, name: 'text' });
  const textLength = watchText?.length ?? 0;

  const onSubmitForm = (data: PostParallelStoryFormValues) => {
    const sentenceRequest: CreateSentenceRequest = {
      text: data.text,
      sentenceId: sentenceId,
    };
    onSubmit(sentenceRequest);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          backgroundColor: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          padding: '16px',
          maxWidth: '600px',
          width: '90%',
        }}
      >
        <DialogContent>
          <Typography variant='h6' sx={{ mb: 2 }}>
            パラレル投稿を作成
          </Typography>

          {/* 親投稿の表示 */}
          {parentText && (
            <Box
              sx={{
                p: 2,
                mb: 1,
                backgroundColor: '#f0f0f0',
                borderRadius: 1,
                border: '1px solid #d0d0d0',
              }}
            >
              <Typography variant='caption' color='text.secondary'>
                親投稿
              </Typography>
              <Typography variant='body2'>{parentText}</Typography>
            </Box>
          )}

          {/* 現在の投稿の表示 */}
          <Box
            sx={{
              p: 2,
              mb: 2,
              backgroundColor: '#f5f5f5',
              borderRadius: 1,
              border: '1px solid #e0e0e0',
              position: 'relative',
            }}
          >
            <Typography variant='caption' color='text.secondary'>
              現在の投稿
            </Typography>
            <Typography variant='body1'>{mainText}</Typography>

            {/* パラレル投稿であることを示す線 */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                right: '-50px',
                width: '50px',
                height: '1px',
                backgroundColor: '#666',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  right: 0,
                  top: '-4px',
                  width: '0',
                  height: '0',
                  borderTop: '4px solid transparent',
                  borderBottom: '4px solid transparent',
                  borderLeft: '8px solid #666',
                },
              }}
            />
          </Box>

          <form onSubmit={handleSubmit(onSubmitForm)}>
            <TextField
              autoFocus
              multiline
              rows={4}
              fullWidth
              {...register('text')}
              placeholder='パラレル投稿の内容を入力してください (100文字以内)'
              sx={{ mt: 2 }}
              helperText={errors.text?.message}
              error={!!errors.text}
            />

            <Typography variant='body2' sx={{ mt: 1, textAlign: 'right' }}>
              {`文字数: ${textLength} / 100`}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 2,
                gap: 1,
              }}
            >
              <Button onClick={handleClose} color='inherit'>
                キャンセル
              </Button>
              <Button
                type='submit'
                color='primary'
                variant='contained'
                disabled={textLength > 100 || textLength === 0}
              >
                パラレル投稿する
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Box>
    </Modal>
  );
};

export default PostParallelStory;
