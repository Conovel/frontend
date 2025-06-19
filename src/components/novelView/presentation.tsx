import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ViewSentence, SentencesApi } from '../../api';
import { axiosConfig } from '../../axiosConfig';
import { Box, Typography, Container, Paper } from '@mui/material';

export const NovelView: React.FC = () => {
  const { sentenceId } = useParams<{ sentenceId: string }>();
  const [sentence, setSentence] = useState<ViewSentence | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSentence = async () => {
      if (!sentenceId) {
        setError('Sentence ID is required');
        return;
      }

      try {
        const api = new SentencesApi(axiosConfig);
        const response = await api.getSentenceById(Number(sentenceId));
        setSentence(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load sentence',
        );
      }
    };

    loadSentence();
  }, [sentenceId]);

  if (error) {
    return (
      <Container>
        <Typography color='error'>{error}</Typography>
      </Container>
    );
  }

  if (!sentence) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth='md'>
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant='body1' paragraph>
            {sentence.main?.sentence || 'No content'}
          </Typography>
          <Typography variant='subtitle2' color='text.secondary'>
            Author: {sentence.main?.sentence_user_name || 'Unknown'}
          </Typography>
          <Typography variant='subtitle2' color='text.secondary'>
            Created: {sentence.main?.created_at ? new Date(sentence.main.created_at).toLocaleString() : 'Unknown'}
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};
