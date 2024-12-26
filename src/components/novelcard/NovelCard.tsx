import React from 'react';
import { Avatar, Box, TextField } from '@mui/material';
import ThumbUpButton from '../buttonicon/ThumbsUpButton';
import CommentButton from '../buttonicon/CommentButton';
import NextPlanButton from '../buttonicon/NextPlanButton';

interface NovelCardProps {
  key: number;
  index: number;
  textIndex: number;
  text: string;
  evaluation_good_count: number;
  setEvaluation_good_count: React.Dispatch<React.SetStateAction<number>>;
  commentCount: number;
  setCommentCount: React.Dispatch<React.SetStateAction<number>>;
  nextPlanCount: number;
  setNextPlanCount: React.Dispatch<React.SetStateAction<number>>;
}

const NovelCard: React.FC<NovelCardProps> = ({
  text,
  evaluation_good_count,
  setEvaluation_good_count,
  commentCount,
  setCommentCount,
  nextPlanCount,
  setNextPlanCount,
}) => {
  return (
    <Box
      sx={{
        fontSize: '0.8rem',
        position: 'relative',
        backgroundColor: '#fff',
        zIndex: 1,
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
            height: '15vh',
          }}
        >
          <Avatar sx={{ width: 24, height: 24, zIndex: 2 }}>C</Avatar>
          <TextField
            multiline
            fullWidth
            variant='outlined'
            value={text}
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
        }}
      >
        <>
          <ThumbUpButton
            evaluation_good_count={evaluation_good_count}
            setEvaluation_good_count={setEvaluation_good_count}
          />
          <CommentButton
            commentCount={commentCount}
            setCommentCount={setCommentCount}
          />
          <NextPlanButton
            nextPlanCount={nextPlanCount}
            setNextPlanCount={setNextPlanCount}
          />
        </>
      </Box>
    </Box>
  );
};

export default NovelCard;
