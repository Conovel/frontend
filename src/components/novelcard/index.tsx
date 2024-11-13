import React from 'react';
import { Box, TextField } from '@mui/material'; //Avatar後で追加
import ThumbUpButton from '../buttonicon/ThumbsUpButton';
import ThumbDownButton from '../buttonicon/ThumbsDownButton';
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
  index,
  text,
  thumbUpCount,
  setThumbUpCount,
  thumbDownCount,
  setThumbDownCount,
  commentCount,
  setCommentCount,
  nextPlanCount,
  setNextPlanCount,
}) => {
  return (
    <Box
      sx={{
        fontSize: '0.8rem',
        border: '1px solid #000',
        padding: '10px',
        borderRadius: '5px',
        margin: '0 5px',
        position: 'relative',
      }}
    >
      {/* 小説のテキストを表示するテキストボックス */}
      <TextField
        multiline
        fullWidth
        variant='outlined'
        value={text}
        InputProps={{
          readOnly: true, // 読み取り専用に設定
        }}
        sx={{
          marginBottom: '10px',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '5px',
        }}
      >
        {
          <>
            <ThumbUpButton
              thumbUpCount={thumbUpCount}
              setThumbUpCount={setThumbUpCount}
            />
            <ThumbDownButton
              thumbDownCount={thumbDownCount}
              setThumbDownCount={setThumbDownCount}
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
        }
      </Box>
    </Box>
  );
};

export default NovelCard;
