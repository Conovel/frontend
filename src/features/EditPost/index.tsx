import {
  TextField,
  Button,
  DialogContent,
  Typography,
  Box,
  Modal,
  Alert,
  Snackbar,
} from '@mui/material';
import { z } from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SentencesApi, PostSentence } from '../../api/api';
import { axiosConfig } from '../../axiosConfig';

interface EditPostProps {
  open: boolean;
  onClose: () => void;
  onPostSuccess: () => void;
  mainText: string;
  sentenceId: number;
  parentUpdatedAt: string;
}

// バリデーションスキーマを定義
const schema = z.object({
  text: z.string().max(100, '100文字以内で入力してください'),
});

// Zodスキーマから型を取得
type EditPostFormValues = z.infer<typeof schema>;

export const EditPost: React.FC<EditPostProps> = ({
  open,
  onClose,
  onPostSuccess,
  mainText,
  sentenceId,
  parentUpdatedAt,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sentencesApi = new SentencesApi(axiosConfig);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<EditPostFormValues>({
    resolver: zodResolver(schema),
  });

  const watchText = useWatch({ control, name: 'text' });
  const textLength = watchText?.length ?? 0;

  const onSubmitForm = async (data: EditPostFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const postSentence: PostSentence = {
        sentence: data.text,
        parentSentenceId: sentenceId,
        parentUpdatedAt: parentUpdatedAt,
      };

      await sentencesApi.postSentence(postSentence);

      // 成功時の処理
      setShowSuccessMessage(true);
      reset(); // フォームをリセット
      onPostSuccess(); // 親コンポーネントに成功を通知
      onClose(); // モーダルを閉じる
    } catch (error) {
      console.error('投稿エラー:', error);
      setErrorMessage('投稿に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              onSubmit={handleSubmit(onSubmitForm)}
              style={{ position: 'relative', zIndex: 2 }}
            >
              <TextField
                autoFocus
                multiline
                rows={4}
                fullWidth
                {...register('text')}
                placeholder='続きの文章を入力してください (100文字以内)'
                sx={{ mt: 2 }}
                helperText={errors.text?.message}
              />
              <Typography variant='body2' sx={{ mt: 1 }}>
                {`文字数: ${textLength} / 100`}
              </Typography>
              {errorMessage && (
                <Alert severity='error' sx={{ mt: 2 }}>
                  {errorMessage}
                </Alert>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  onClick={onClose}
                  color='inherit'
                  sx={{ mr: 1 }}
                  disabled={isSubmitting}
                >
                  キャンセル
                </Button>
                <Button
                  type='submit'
                  color='primary'
                  variant='contained'
                  disabled={textLength > 100 || isSubmitting}
                >
                  {isSubmitting ? '投稿中...' : '投稿する'}
                </Button>
              </Box>
            </form>
          </DialogContent>
        </div>
      </Modal>
      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={3000}
        onClose={() => setShowSuccessMessage(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSuccessMessage(false)}
          severity='success'
          sx={{ width: '100%' }}
        >
          投稿が完了しました！
        </Alert>
      </Snackbar>
    </>
  );
};
