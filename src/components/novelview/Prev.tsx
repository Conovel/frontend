import React from 'react';
import { Avatar, Box } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ChatIcon from '@mui/icons-material/Chat';
import NextPlanIcon from '@mui/icons-material/NextPlan';

interface PrevProps {
  startIndex: number;
  setStartIndex: React.Dispatch<React.SetStateAction<number>>;
  visibleTextCount: number;
  textCount: number;
  thumbUpCount: number;
  setThumbUpCount: React.Dispatch<React.SetStateAction<number>>;
  thumbDownCount: number;
  setThumbDownCount: React.Dispatch<React.SetStateAction<number>>;
  commentCount: number;
  setCommentCount: React.Dispatch<React.SetStateAction<number>>;
  nextPlanCount: number;
  setNextPlanCount: React.Dispatch<React.SetStateAction<number>>;
}

const Prev: React.FC<PrevProps> = ({
  startIndex,
  setStartIndex,
  visibleTextCount,
  textCount,
  thumbUpCount,
  setThumbUpCount,
  thumbDownCount,
  setThumbDownCount,
  commentCount,
  setCommentCount,
  nextPlanCount,
  setNextPlanCount,
}) => {
  const handleScroll = (direction: 'next' | 'prev') => {
    if (direction === 'next' && startIndex + visibleTextCount < textCount) {
      setStartIndex(startIndex + visibleTextCount);
    } else if (direction === 'prev' && startIndex > 0) {
      setStartIndex(startIndex - visibleTextCount);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        margin: '5vh 0',
        height: '20vh',
        alignItems: 'center',
        zIndex: 2,
      }}
    >
      <KeyboardArrowLeftIcon
        onClick={() => handleScroll('prev')}
        sx={{ cursor: startIndex === 0 ? 'not-allowed' : 'pointer' }}
        color={startIndex === 0 ? 'disabled' : 'action'}
      />
      {Array.from({ length: visibleTextCount }, (_, index) => {
        const textIndex = startIndex + index;
        return textIndex < textCount ? (
          <Box
            key={textIndex}
            sx={{
              fontSize: '0.8rem',
              border: '1px solid #000',
              padding: '10px',
              borderRadius: '5px',
              margin: '0 5px',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '5px',
                left: '5px',
              }}
            >
              <Avatar sx={{ width: 24, height: 24 }} />
            </Box>
            <p>前の階層のテキスト{textIndex + 1}</p>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '5px',
              }}
            >
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
            </Box>
          </Box>
        ) : null;
      })}
      <KeyboardArrowRightIcon
        onClick={() => handleScroll('next')}
        sx={{
          cursor:
            startIndex + visibleTextCount >= textCount
              ? 'not-allowed'
              : 'pointer',
        }}
        color={
          startIndex + visibleTextCount >= textCount ? 'disabled' : 'action'
        }
      />
    </Box>
  );
};

export default Prev;
