import {
  TextField,
  Button,
  DialogContent,
  Typography,
  Box,
  Modal,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { z } from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostSentence } from '../../types/types';
import { useState, memo, useCallback } from 'react';

interface EditPostProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (sentenceRequest: PostSentence) => void;
  mainText: string;
  parentSentenceId: number;
  parentUpdatedAt: string;
}

// バリデーションスキーマを定義
const schema = z.object({
  sentence: z.string().max(100, '100文字以内で入力してください'),
});

// Zodスキーマから型を取得
type EditPostFormValues = z.infer<typeof schema>;

export const EditPost: React.FC<EditPostProps> = memo(
  ({
    open,
    onClose,
    onSubmit,
    mainText,
    parentSentenceId,
    parentUpdatedAt,
  }) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {
      register,
      handleSubmit,
      formState: { errors },
      control,
      reset,
    } = useForm<EditPostFormValues>({
      resolver: zodResolver(schema),
    });

    const watchText = useWatch({ control, name: 'sentence' });
    const textLength = watchText?.length ?? 0;

    const handleFormSubmit = useCallback(
      async (data: EditPostFormValues) => {
        try {
          setIsLoading(true);
          const sentenceRequest: PostSentence = {
            parent_sentence_id: parentSentenceId,
            parent_updated_at: parentUpdatedAt,
            sentence: data.sentence,
          };
          await onSubmit(sentenceRequest);
          setShowSuccess(true);
          reset();
          setTimeout(() => {
            onClose();
            setShowSuccess(false);
          }, 2000);
        } catch (error) {
          console.error('Error submitting form:', error);
        } finally {
          setIsLoading(false);
        }
      },
      [onSubmit, parentSentenceId, parentUpdatedAt, onClose, reset],
    );

    const handleSuccessClose = useCallback(() => {
      setShowSuccess(false);
    }, []);

    return (
      <>
        <Modal
          open={open}
          onClose={onClose}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              padding: '16px',
              width: '90%',
              maxWidth: '600px',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            <DialogContent>
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
                <Typography variant='body1'>{mainText}</Typography>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '90%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '1px',
                    height: '50px',
                    backgroundColor: '#000',
                    zIndex: 1,
                  }}
                />
              </Box>
              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                style={{ position: 'relative', zIndex: 2 }}
              >
                <TextField
                  autoFocus
                  multiline
                  rows={4}
                  fullWidth
                  {...register('sentence')}
                  placeholder='続きの文章を入力してください (100文字以内)'
                  sx={{ mt: 2 }}
                  helperText={errors.sentence?.message}
                  disabled={isLoading}
                />
                <Typography variant='body2' sx={{ mt: 1 }}>
                  {`文字数: ${textLength} / 100`}
                </Typography>
                <Box
                  sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}
                >
                  <Button
                    onClick={onClose}
                    color='inherit'
                    sx={{ mr: 1 }}
                    disabled={isLoading}
                  >
                    キャンセル
                  </Button>
                  <Button
                    type='submit'
                    color='primary'
                    variant='contained'
                    disabled={textLength > 100 || isLoading}
                    startIcon={
                      isLoading ? <CircularProgress size={20} /> : null
                    }
                  >
                    {isLoading ? '投稿中...' : '投稿する'}
                  </Button>
                </Box>
              </form>
            </DialogContent>
          </div>
        </Modal>
        <Snackbar
          open={showSuccess}
          autoHideDuration={2000}
          onClose={handleSuccessClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity='success' sx={{ width: '100%' }}>
            投稿が完了しました！
          </Alert>
        </Snackbar>
      </>
    );
  },
);

EditPost.displayName = 'EditPost';
