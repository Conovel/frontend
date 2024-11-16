import React from 'react';
import { Box } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import NovelCard from '../novelcard/NovelCard';

interface NextProps {
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

const Next: React.FC<NextProps> = ({
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
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        {Array.from({ length: Math.min(visibleTextCount, 3) }, (_, index) => {
          const textIndex = startIndex + index + 1;
          return textIndex <= textCount ? (
            <Box
              key={textIndex}
              sx={{
                width: '33.33%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <NovelCard
                index={textIndex}
                textIndex={textIndex}
                text={`Text content for index ${textIndex}`}
                thumbUpCount={thumbUpCount}
                setThumbUpCount={setThumbUpCount}
                thumbDownCount={thumbDownCount}
                setThumbDownCount={setThumbDownCount}
                commentCount={commentCount}
                setCommentCount={setCommentCount}
                nextPlanCount={nextPlanCount}
                setNextPlanCount={setNextPlanCount}
              />
            </Box>
          ) : null;
        })}
      </Box>
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

export default Next;
