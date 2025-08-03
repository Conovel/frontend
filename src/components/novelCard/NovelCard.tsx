import React, { useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import ThumbUpButton from '../buttonicon/ThumbsUpButton';
import CommentButton from '../buttonicon/CommentButton';
import NextPlanButton from '../buttonicon/NextPlanButton';
import { Sentence } from '../../api/api';

interface NovelCardProps {
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
  onClick: (sentenceId: number | undefined) => void;
}

const NovelCard = ({ novel, onClick }: NovelCardProps) => {
  // Local state for counts
  const [evaluationGoodCount, setEvaluationGoodCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [evaluationStayCount, setEvaluationStayCount] = useState(0);
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
            evaluationGoodCount={evaluationGoodCount}
            setEvaluationGoodCount={setEvaluationGoodCount}
          />
          <CommentButton
            commentCount={commentCount}
            setCommentCount={setCommentCount}
          />
          <NextPlanButton
            evaluationStayCount={evaluationStayCount}
            setEvaluationStayCount={setEvaluationStayCount}
          />
        </>
      </Box>
    </Box>
  );
};

export default NovelCard;
