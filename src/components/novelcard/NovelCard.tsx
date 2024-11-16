import React from 'react';
import { Avatar, Box, TextField } from '@mui/material';
import ThumbUpButton from '../buttonicon/ThumbsUpButton';
import CommentButton from '../buttonicon/CommentButton';
import NextPlanButton from '../buttonicon/NextPlanButton';

interface NovelCardProps {
  index: number;
  textIndex: number;
  text: string;
  thumbUpCount: number;
  setThumbUpCount: React.Dispatch<React.SetStateAction<number>>;
  thumbDownCount: number;
  setThumbDownCount: React.Dispatch<React.SetStateAction<number>>;
  commentCount: number;
  setCommentCount: React.Dispatch<React.SetStateAction<number>>;
  nextPlanCount: number;
  setNextPlanCount: React.Dispatch<React.SetStateAction<number>>;
}

const NovelCard: React.FC<NovelCardProps> = ({
  text,
  thumbUpCount,
  setThumbUpCount,
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
          padding: '10px',
          borderRadius: '5px',
        }}
      >
        <Avatar sx={{ width: 24, height: 24, marginBottom: '5px' }}>C</Avatar>
        {/* 小説のテキストを表示するテキストボックス */}
        <Box
          sx={{
            fontSize: '1.0rem',
            height: '4rem',
            marginBottom: '5px',
            overflow: 'hidden',
          }}
        >
          <TextField
            multiline
            fullWidth
            variant='outlined'
            value={text}
            InputProps={{
              readOnly: true,
            }}
            sx={{
              fontSize: '1.0rem',
              height: '100%',
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginTop: '5px',
        }}
      >
        <>
          <ThumbUpButton
            thumbUpCount={thumbUpCount}
            setThumbUpCount={setThumbUpCount}
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
