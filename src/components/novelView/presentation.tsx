import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ViewSentence } from '../../types/api';
import { fetchSentence } from '../../api/sentence';
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
        const data = await fetchSentence(sentenceId);
        setSentence(data);
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
          <Typography variant='h4' component='h1' gutterBottom>
            {sentence.title}
          </Typography>
          <Typography variant='body1' paragraph>
            {sentence.content}
          </Typography>
          <Typography variant='subtitle2' color='text.secondary'>
            Created: {new Date(sentence.created_at).toLocaleString()}
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};
