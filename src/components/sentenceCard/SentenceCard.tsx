import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import ThumbUpButton from '../buttonicon/ThumbsUpButton';
import CommentButton from '../buttonicon/CommentButton';
import NextPlanButton from '../buttonicon/NextPlanButton';
import { Sentence } from '../../types/sentences';

interface SentenceCardProps {
  key: number;
  index: number;
  textIndex: number;
  sentence: string;
  evaluationGoodCount: number;
  setEvaluationGoodCount: React.Dispatch<React.SetStateAction<number>>;
  commentCount: number;
  setCommentCount: React.Dispatch<React.SetStateAction<number>>;
  evaluationStayCount: number;
  setEvaluationStayCount: React.Dispatch<React.SetStateAction<number>>;
  novel: Sentence;
  onClick: (sentence_id: number) => void;
}

export const SentenceCard = ({
  novel,
  onClick,
  evaluationGoodCount,
  setEvaluationGoodCount,
  commentCount,
  setCommentCount,
  evaluationStayCount,
  setEvaluationStayCount,
}: SentenceCardProps) => {
  return (
    <Box
      component='div'
      sx={{
        fontSize: '0.8rem',
        position: 'relative',
        backgroundColor: '#fff',
      }}
      onClick={() => onClick(novel.sentenceId)}
    >
      <Box
        sx={{
          border: '1px solid #000',
          padding: '1vh 1vw',
          borderRadius: '1vh',
        }}
      >
        {/* 小説のテキストを表示するテキストボックス */}
        <Box
          sx={{
            alignItems: 'flex-start',
            height: '15vh',
          }}
        >
          <Avatar sx={{ width: 24, height: 24, zIndex: 2 }}>C</Avatar>
          <Typography
            sx={{
              marginTop: '0.5vh',
              fontSize: '1rem',
              height: '10vh',
            }}
          >
            {novel.sentence}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginTop: '0.2vh',
          backgroundColor: 'transparent',
        }}
      >
        <>
          <ThumbUpButton
            evaluation_good_count={evaluationGoodCount}
            setEvaluation_good_count={setEvaluationGoodCount}
          />
          <CommentButton
            comment_count={commentCount}
            setComment_count={setCommentCount}
          />
          <NextPlanButton
            evaluation_stay_count={evaluationStayCount}
            setEvaluation_stay_count={setEvaluationStayCount}
          />
        </>
      </Box>
    </Box>
  );
};
