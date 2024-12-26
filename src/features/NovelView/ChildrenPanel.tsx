import React from 'react';
import { Box } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import NovelCard from '../../components/novelcard/NovelCard';

interface NextProps {
  startIndex: number;
  setStartIndex: React.Dispatch<React.SetStateAction<number>>;
  visibleTextCount: number;
  textCount: number;
  evaluation_good_count: number;
  setEvaluation_good_count: React.Dispatch<React.SetStateAction<number>>;
  comment_count: number;
  setComment_count: React.Dispatch<React.SetStateAction<number>>;
  evaluation_stay_count: number;
  setEvaluation_stay_count: React.Dispatch<React.SetStateAction<number>>;
}

const Next: React.FC<NextProps> = ({
  startIndex,
  setStartIndex,
  visibleTextCount,
  textCount,
  evaluation_good_count,
  setEvaluation_good_count,
  comment_count,
  setComment_count,
  evaluation_stay_count,
  setEvaluation_stay_count,
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
      <Box
        sx={{
          position: 'absolute',
          left: '1vw',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <KeyboardArrowLeftIcon
          onClick={() => handleScroll('prev')}
          sx={{ cursor: startIndex === 0 ? 'not-allowed' : 'pointer' }}
          color={startIndex === 0 ? 'disabled' : 'action'}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          overflowX: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            height: '100%',
            paddingBottom: '10px',
          }}
        >
          {Array.from({ length: 3 }, (_, index) => {
            const textIndex = startIndex + index + 1;
            return textIndex <= textCount ? (
              <Box
                key={textIndex}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '0 10px',
                  width: index === 1 ? '70%' : '30%',
                  scrollSnapAlign: 'center',
                }}
              >
                <NovelCard
                  key={textIndex}
                  index={textIndex}
                  textIndex={textIndex}
                  text={`Text content for index ${textIndex}`}
                  evaluation_good_count={evaluation_good_count}
                  setEvaluation_good_count={setEvaluation_good_count}
                  comment_count={comment_count}
                  setComment_count={setComment_count}
                  evaluation_stay_count={evaluation_stay_count}
                  setEvaluation_stay_count={setEvaluation_stay_count}
                />
              </Box>
            ) : null;
          })}
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          right: '2vw',
          display: 'flex',
          alignItems: 'center',
        }}
      >
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
    </Box>
  );
};

export default Next;
