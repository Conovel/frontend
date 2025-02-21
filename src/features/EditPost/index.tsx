import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
} from '@mui/material';
import { useState } from 'react';

interface EditPostProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
  mainText: string;
}

export const EditPost: React.FC<EditPostProps> = ({
  open,
  onClose,
  onSubmit,
  mainText,
}) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    onSubmit(text);
    setText('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>新規投稿</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            p: 2,
            mb: 2,
            backgroundColor: '#f5f5f5',
            borderRadius: 1,
            border: '1px solid #e0e0e0',
          }}
        >
          <Typography variant='body1'>{mainText}</Typography>
        </Box>
        <TextField
          autoFocus
          multiline
          rows={4}
          fullWidth
          value={text}
          onChange={(e) => {
            if (e.target.value.length <= 100) {
              setText(e.target.value);
            }
          }}
          placeholder='続きの文章を入力してください (100文字以内)'
          sx={{ mt: 2 }}
          inputProps={{ maxLength: 100 }}
          helperText={`${text.length}/100文字`}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='inherit'>
          キャンセル
        </Button>
        <Button onClick={handleSubmit} color='primary' variant='contained'>
          投稿する
        </Button>
      </DialogActions>
    </Dialog>
  );
};
