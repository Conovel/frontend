import React from 'react';
import { Box } from '@mui/material';
import NovelCard from '../../components/novelcard/NovelCard';

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
          thumbUpCount={thumbUpCount}
          setThumbUpCount={setThumbUpCount}
          thumbDownCount={thumbDownCount}
          setThumbDownCount={setThumbDownCount}
          commentCount={commentCount}
          setCommentCount={setCommentCount}
          nextPlanCount={nextPlanCount}
          setNextPlanCount={setNextPlanCount}
        />
      ) : null}
    </Box>
  );
};

export default Prev;
