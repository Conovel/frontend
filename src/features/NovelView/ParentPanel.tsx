import React from 'react';
import { Box } from '@mui/material';
import NovelCard from '../../components/novelcard/NovelCard';

interface PrevProps {
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

const Prev: React.FC<PrevProps> = ({
  startIndex,
  textCount,
  evaluation_good_count,
  setEvaluation_good_count,
  comment_count,
  setComment_count,
  evaluation_stay_count,
  setEvaluation_stay_count,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        margin: '5vh auto',
        height: '20vh',
        width: '70vw',
        alignItems: 'center',
        zIndex: 2,
      }}
    >
      {startIndex < textCount ? (
        <NovelCard
          key={startIndex}
          index={0}
          textIndex={startIndex}
          text={`Text content for index ${startIndex}`}
          evaluation_good_count={evaluation_good_count}
          setEvaluation_good_count={setEvaluation_good_count}
          comment_count={comment_count}
          setComment_count={setComment_count}
          evaluation_stay_count={evaluation_stay_count}
          setEvaluation_stay_count={setEvaluation_stay_count}
        />
      ) : null}
    </Box>
  );
};

export default Prev;
