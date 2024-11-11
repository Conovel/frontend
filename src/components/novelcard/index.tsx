import React from 'react';
import { Avatar, Box } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ChatIcon from '@mui/icons-material/Chat';
import NextPlanIcon from '@mui/icons-material/NextPlan';

interface NovelCardProps {
  index: number;
  textIndex: number;
  thumbUpCount: number;
  setThumbUpCount: React.Dispatch<React.SetStateAction<number>>;
  thumbDownCount: number;
  setThumbDownCount: React.Dispatch<React.SetStateAction<number>>;
  commentCount: number;
  setCommentCount: React.Dispatch<React.SetStateAction<number>>;
  nextPlanCount: number;
  setNextPlanCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function NovelCard({
  index,
  textIndex,
  thumbUpCount,
  setThumbUpCount,
  thumbDownCount,
  setThumbDownCount,
  commentCount,
  setCommentCount,
  nextPlanCount,
  setNextPlanCount,
}: NovelCardProps) {
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
      {index === 0 ? (
        <button
          style={{
            width: '100%',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
          }}
          onClick={() => {
            /* ここにボタンの処理を追加 */
          }}
        >
          続きを自分で書く
        </button>
      ) : (
        <p>次の階層のテキスト{textIndex + 1}</p>
      )}
      {index !== 0 && (
        <Box
          sx={{
            position: 'absolute',
            top: '5px',
            left: '5px',
          }}
        >
          <Avatar sx={{ width: 24, height: 24 }} />
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '5px',
        }}
      >
        {index !== 0 && (
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '10px',
              }}
              onClick={() => setThumbUpCount(thumbUpCount + 1)}
            >
              <ThumbUpIcon />
              <span>{thumbUpCount}</span>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '10px',
              }}
              onClick={() => setThumbDownCount(thumbDownCount + 1)}
            >
              <ThumbDownIcon />
              <span>{thumbDownCount}</span>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '10px',
              }}
              onClick={() => setCommentCount(commentCount + 1)}
            >
              <ChatIcon />
              <span>{commentCount}</span>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '10px',
              }}
              onClick={() => setNextPlanCount(nextPlanCount + 1)}
            >
              <NextPlanIcon />
              <span>{nextPlanCount}</span>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
