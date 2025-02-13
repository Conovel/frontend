import React, { useState } from 'react';
import { Avatar, Box, TextField } from '@mui/material';
import ThumbUpButton from '../buttonicon/ThumbsUpButton';
import CommentButton from '../buttonicon/CommentButton';
import NextPlanButton from '../buttonicon/NextPlanButton';
import { NovelProps } from '../../types/types';

interface NovelCardProps {
  key: number;
  index: number;
  textIndex: number;
  text: string;
  evaluation_good_count: number;
  setEvaluation_good_count: React.Dispatch<React.SetStateAction<number>>;
  comment_count: number;
  setComment_count: React.Dispatch<React.SetStateAction<number>>;
  evaluation_stay_count: number;
  setEvaluation_stay_count: React.Dispatch<React.SetStateAction<number>>;
  novel: NovelProps;
  onClick: (sentence_id: number) => void;
}

const NovelCard = ({ novel, onClick }: NovelCardProps) => {
  // Local state for counts
  const [evaluation_good_count, setEvaluation_good_count] = useState(0);
  const [comment_count, setComment_count] = useState(0);
  const [evaluation_stay_count, setEvaluation_stay_count] = useState(0);
  return (
    <Box
      component='div'
      sx={{
        fontSize: '0.8rem',
        position: 'relative',
        backgroundColor: '#fff',
      }}
      onClick={() => onClick(novel.sentence_id)}
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
          <TextField
            multiline
            fullWidth
            variant='outlined'
            value={novel.text}
            InputProps={{
              readOnly: true,
            }}
            sx={{
              marginTop: '0.5vh',
              textAlign: 'left',
              alignItems: 'center',
              position: 'absolute',
              inset: '1vh 1vw',
              fontSize: '1.0rem',
              width: '95%',
              height: '10vh',
            }}
          />
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
            evaluation_good_count={evaluation_good_count}
            setEvaluation_good_count={setEvaluation_good_count}
          />
          <CommentButton
            comment_count={comment_count}
            setComment_count={setComment_count}
          />
          <NextPlanButton
            evaluation_stay_count={evaluation_stay_count}
            setEvaluation_stay_count={setEvaluation_stay_count}
          />
        </>
      </Box>
    </Box>
  );
};

export default NovelCard;
