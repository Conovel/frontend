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
  evaluationGoodCount?: number;
  setEvaluationGoodCount?: React.Dispatch<React.SetStateAction<number>>;
  commentCount?: number;
  setCommentCount?: React.Dispatch<React.SetStateAction<number>>;
  evaluationStayCount?: number;
  setEvaluationStayCount?: React.Dispatch<React.SetStateAction<number>>;
  isGoodEvaluated?: boolean;
  isStayEvaluated?: boolean;
  novel: Sentence;
  onClick: (sentenceId: number | undefined) => void;
  disabled?: boolean;
}

const NovelCard = ({
  novel,
  onClick,
  evaluationGoodCount: initialGoodCount,
  setEvaluationGoodCount: setParentGoodCount,
  evaluationStayCount: initialStayCount,
  setEvaluationStayCount: setParentStayCount,
  isGoodEvaluated,
  isStayEvaluated,
  disabled = false,
}: NovelCardProps) => {
  const [evaluationGoodCount, setEvaluationGoodCount] = useState(
    initialGoodCount || 0,
  );
  const [evaluationStayCount, setEvaluationStayCount] = useState(
    initialStayCount || 0,
  );

  useEffect(() => {
    setEvaluationGoodCount(initialGoodCount || 0);
    setEvaluationStayCount(initialStayCount || 0);
  }, [initialGoodCount, initialStayCount]);

  const handleGoodCountClick = (): void => {
    if (!disabled && setParentGoodCount) {
      const newCount = evaluationGoodCount + 1;
      setEvaluationGoodCount(newCount);
      setParentGoodCount(newCount);
      // ここにバックエンド処理を追加
    }
  };

  const handleSetStayCount = (value: React.SetStateAction<number>): void => {
    setEvaluationStayCount(value);
    if (setParentStayCount) {
      setParentStayCount(value);
    }
  };

  return (
    <Box
      component='div'
      sx={{
        fontSize: '0.8rem',
        position: 'relative',
        backgroundColor: '#fff',
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      onClick={() => {
        if (!disabled) {
          onClick(novel.sentenceId);
        }
      }}
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

      {/* 評価ボタンは常に表示し、評価関連のプロパティが存在しない場合は無効化 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginTop: '0.1vh',
          backgroundColor: 'transparent',
        }}
      >
        <ThumbUpButton
          evaluationGoodCount={evaluationGoodCount}
          isEvaluated={isGoodEvaluated || false}
          disabled={!setParentGoodCount}
          onClick={handleGoodCountClick}
        />
        <NextPlanButton
          evaluationStayCount={evaluationStayCount}
          setEvaluationStayCount={handleSetStayCount}
          isEvaluated={isStayEvaluated || false}
          disabled={!setParentStayCount}
        />
      </Box>
    </Box>
  );
};

export default NovelCard;
