import React, { memo } from 'react';
import { Box, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NovelCard from '../../components/novelCard/NovelCard';
import { EditPost } from '../EditPost';
import { Sentence, PostSentence, NovelProps } from '../../types/types';
import { SentencesApi } from '../../api/api';

interface ChildrenPanelProps {
  childrenPanels: Sentence[];
  evaluation_good_count: number;
  setEvaluation_good_count: React.Dispatch<React.SetStateAction<number>>;
  comment_count: number;
  setComment_count: React.Dispatch<React.SetStateAction<number>>;
  evaluation_stay_count: number;
  setEvaluation_stay_count: React.Dispatch<React.SetStateAction<number>>;
  onPostSuccess: (newPost: Sentence) => void;
}

export const ChildrenPanel: React.FC<ChildrenPanelProps> = memo(
  ({
    childrenPanels,
    evaluation_good_count,
    setEvaluation_good_count,
    comment_count,
    setComment_count,
    evaluation_stay_count,
    setEvaluation_stay_count,
  }) => {
    const navigate = useNavigate();
    const [isEditPostOpen, setIsEditPostOpen] = React.useState(false);
    const [selectedChild, setSelectedChild] = React.useState<Sentence | null>(
      null,
    );
    const [error, setError] = React.useState<string | null>(null);

    const handlePostSubmit = async (sentenceRequest: PostSentence) => {
      try {
        setError(null);
        const sentencesApi = new SentencesApi();
        const response = await sentencesApi.postSentence(sentenceRequest);

        if (
          response.status === 201 &&
          response.data.main &&
          Array.isArray(response.data.main) &&
          response.data.main.length > 0
        ) {
          const newPost = response.data.main[0];
          const convertedSentence: Sentence = {
            title: newPost.title || '',
            main_copy: newPost.main_copy || '',
            overview: newPost.overview || '',
            popular: newPost.popular || false,
            newArrival: newPost.newArrival || false,
            author_user_name: newPost.author_user_name || '',
            chips: newPost.chips || [],
            tags: newPost.tags || [],
            reader_count: newPost.reader_count || 0,
            avatar: newPost.avatar || {
              src: '',
              alt: '',
              color: '',
              text: '',
            },
            sentence_id: newPost.sentence_id!,
            sentence_user_count: newPost.sentence_user_count || 0,
            sentence_hierarchy_count: newPost.sentence_hierarchy_count || 0,
            sentence: newPost.sentence || '',
            textIndex: newPost.textIndex || 0,
            userId: newPost.userId || 0,
            userName: newPost.userName || '',
            profile_icon_image: newPost.profile_icon_image || '',
            evaluation_good_count: newPost.evaluation_good_count || 0,
            evaluation_stay_count: newPost.evaluation_stay_count || 0,
            created_at: newPost.created_at || '',
            updated_at: newPost.updated_at || '',
            comment_count: 0,
          };

          console.log('変換後の投稿:', convertedSentence);
          navigate(`/novelView/${convertedSentence.sentence_id}`);
          setIsEditPostOpen(false);
          setSelectedChild(null);
        } else {
          throw new Error('投稿に失敗しました。もう一度お試しください。');
        }
      } catch (error) {
        console.error('Error posting sentence:', error);
        setError(
          error instanceof Error
            ? error.message
            : '投稿に失敗しました。もう一度お試しください。',
        );
      }
    };

    const handleEditPostOpen = (child: Sentence) => {
      setSelectedChild(child);
      setIsEditPostOpen(true);
    };

    const handleEditPostClose = () => {
      setIsEditPostOpen(false);
      setSelectedChild(null);
    };

    const handleErrorClose = () => {
      setError(null);
    };

    return (
      <Box
        sx={{
          width: '100%',
          maxWidth: 800,
          mx: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant='h6' sx={{ mb: 2 }}>
          続きの文章
        </Typography>
        {childrenPanels.map((child) => {
          const novelProps: NovelProps = {
            ...child,
            children: [],
            main: [],
            parent: [],
          };

          return (
            <NovelCard
              key={child.sentence_id}
              novel={novelProps}
              evaluation_good_count={evaluation_good_count}
              setEvaluation_good_count={setEvaluation_good_count}
              comment_count={comment_count}
              setComment_count={setComment_count}
              evaluation_stay_count={evaluation_stay_count}
              setEvaluation_stay_count={setEvaluation_stay_count}
              onPostClick={() => handleEditPostOpen(child)}
            />
          );
        })}
        {selectedChild && (
          <EditPost
            open={isEditPostOpen}
            onClose={handleEditPostClose}
            onSubmit={handlePostSubmit}
            mainText={selectedChild.sentence}
            parentSentenceId={selectedChild.sentence_id}
            parentUpdatedAt={selectedChild.updated_at}
          />
        )}
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleErrorClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity='error' sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Box>
    );
  },
);

ChildrenPanel.displayName = 'ChildrenPanel';
