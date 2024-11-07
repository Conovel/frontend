import React from 'react';
import { Box } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ChatIcon from '@mui/icons-material/Chat';
import NextPlanIcon from '@mui/icons-material/NextPlan';

const styles = {
  panel: {
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '5vh 0',
    height: '20vh',
    alignItems: 'center',
    zIndex: 2,
  },
  textWrapper: {
    fontSize: '0.8rem',
    border: '1px solid #000',
    padding: '10px',
    borderRadius: '5px',
    margin: '0 5px',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '5px',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '10px',
  },
};

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
    <Box style={styles.panel}>
      <KeyboardArrowLeftIcon
        onClick={() => handleScroll('prev')}
        style={{ cursor: startIndex === 0 ? 'not-allowed' : 'pointer' }}
        color={startIndex === 0 ? 'disabled' : 'action'}
      />
      {Array.from({ length: visibleTextCount }, (_, index) => {
        const textIndex = startIndex + index;
        return textIndex < textCount ? (
          <Box key={textIndex} style={styles.textWrapper}>
            <p>次の階層のテキスト{textIndex + 1}</p>
            <Box style={styles.iconContainer}>
              <Box
                style={styles.iconWrapper}
                onClick={() => setThumbUpCount(thumbUpCount + 1)}
              >
                <ThumbUpIcon />
                <span>{thumbUpCount}</span>
              </Box>
              <Box
                style={styles.iconWrapper}
                onClick={() => setThumbDownCount(thumbDownCount + 1)}
              >
                <ThumbDownIcon />
                <span>{thumbDownCount}</span>
              </Box>
              <Box
                style={styles.iconWrapper}
                onClick={() => setCommentCount(commentCount + 1)}
              >
                <ChatIcon />
                <span>{commentCount}</span>
              </Box>
              <Box
                style={styles.iconWrapper}
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
        style={{
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
