import React, { useState, useEffect } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import ThumbUpButton from '../buttonicon/ThumbsUpButton';
import NextPlanButton from '../buttonicon/NextPlanButton';
import { Sentence } from '../../types/types';

interface NovelCardProps {
  key: number;
  index: number;
  textIndex: number;
  sentence: string;
  evaluation_good_count: number;
  setEvaluation_good_count: React.Dispatch<React.SetStateAction<number>>;
  comment_count: number;
  setComment_count: React.Dispatch<React.SetStateAction<number>>;
  evaluation_stay_count: number;
  setEvaluation_stay_count: React.Dispatch<React.SetStateAction<number>>;
  isGoodEvaluated: boolean;
  isStayEvaluated: boolean;
  novel: Sentence;
  onClick: (sentenceId: number | undefined) => void;
}

const NovelCard = ({
  novel,
  onClick,
  evaluation_good_count: initialGoodCount,
  setEvaluation_good_count: setParentGoodCount,
  evaluation_stay_count: initialStayCount,
  setEvaluation_stay_count: setParentStayCount,
  isGoodEvaluated,
  isStayEvaluated,
}: NovelCardProps) => {
  const [evaluation_good_count, setEvaluation_good_count] =
    useState(initialGoodCount);
  const [evaluation_stay_count, setEvaluation_stay_count] =
    useState(initialStayCount);

  useEffect(() => {
    setEvaluation_good_count(initialGoodCount);
  }, [initialGoodCount]);

  useEffect(() => {
    setEvaluation_stay_count(initialStayCount);
  }, [initialStayCount]);

  const handleSetGoodCount = (value: React.SetStateAction<number>): void => {
    setEvaluation_good_count(value);
    setParentGoodCount(value);
  };

  const handleSetStayCount = (value: React.SetStateAction<number>): void => {
    setEvaluation_stay_count(value);
    setParentStayCount(value);
  };

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
            height: '20vh',
          }}
        >
          <Avatar sx={{ width: 24, height: 24, zIndex: 2 }}>C</Avatar>
          <Typography
            sx={{
              marginTop: '0.5vh',
              fontSize: '1rem',
              height: '8vh',
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
          marginTop: '0.1vh',
          backgroundColor: 'transparent',
        }}
      >
        <>
          <ThumbUpButton
            evaluation_good_count={evaluation_good_count}
            setEvaluation_good_count={handleSetGoodCount}
            isEvaluated={isGoodEvaluated}
          />
          <NextPlanButton
            evaluation_stay_count={evaluation_stay_count}
            setEvaluation_stay_count={handleSetStayCount}
            isEvaluated={isStayEvaluated}
          />
        </>
      </Box>
    </Box>
  );
};

export default NovelCard;
