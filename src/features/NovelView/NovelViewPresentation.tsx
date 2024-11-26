import React from 'react';
import { Box, Container } from '@mui/material';
import ParentPanel from './ParentPanel';
import ChildrenPanel from './ChildrenPanel';
import MainPanel from './MainPanel';

// TODO: サンプルデータ後で削除
interface Post {
  sentence_id: number;
  sentence: string;
  evaluation_good_count: number;
  evaluation_stay_count: number;
  comments: number;
  sentence_user_count: number;
  sentence_hierarchy_count: number;
  reader_count: number;
  overview: string;
  userName: string;
}
interface MainPanel {
  sentence_id: number;
  sentence: string;
  userId: number;
  userName: string;
}

interface Panel {
  sentence_id: number;
  sentence: string;
}

interface NovelViewPresentationProps {
  posts: Post[];
  mainPanels: MainPanel[];
  parentPanel: Panel;
  childrenPanel: Panel;
  startIndexPrev: number;
  setStartIndexPrev: React.Dispatch<React.SetStateAction<number>>;
  thumbUpCountPrev: number;
  setThumbUpCountPrev: React.Dispatch<React.SetStateAction<number>>;
  thumbDownCountPrev: number;
  setThumbDownCountPrev: React.Dispatch<React.SetStateAction<number>>;
  commentCountPrev: number;
  setCommentCountPrev: React.Dispatch<React.SetStateAction<number>>;
  nextPlanCountPrev: number;
  setNextPlanCountPrev: React.Dispatch<React.SetStateAction<number>>;
  startIndexNext: number;
  setStartIndexNext: React.Dispatch<React.SetStateAction<number>>;
  thumbUpCountNext: number;
  setThumbUpCountNext: React.Dispatch<React.SetStateAction<number>>;
  thumbDownCountNext: number;
  setThumbDownCountNext: React.Dispatch<React.SetStateAction<number>>;
  commentCountNext: number;
  setCommentCountNext: React.Dispatch<React.SetStateAction<number>>;
  nextPlanCountNext: number;
  setNextPlanCountNext: React.Dispatch<React.SetStateAction<number>>;
}

export const NovelViewPresentation: React.FC<NovelViewPresentationProps> = ({
  mainPanels,
  startIndexPrev,
  setStartIndexPrev,
  thumbUpCountPrev,
  setThumbUpCountPrev,
  thumbDownCountPrev,
  setThumbDownCountPrev,
  commentCountPrev,
  setCommentCountPrev,
  nextPlanCountPrev,
  setNextPlanCountPrev,
  startIndexNext,
  setStartIndexNext,
  thumbUpCountNext,
  setThumbUpCountNext,
  thumbDownCountNext,
  setThumbDownCountNext,
  commentCountNext,
  setCommentCountNext,
  nextPlanCountNext,
  setNextPlanCountNext,
}) => {
  const prevTextCount = 10;
  const nextTextCount = 10;
  const visibleTextCount = 3;

  return (
    <Container sx={{ position: 'relative', top: '8vh', alignItems: 'center' }}>
      <Box
        sx={{
          position: 'absolute',
          top: '10vh',
          bottom: '5vh',
          left: '50%',
          width: '2px',
          backgroundColor: '#000',
          zIndex: 1,
        }}
      ></Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <ParentPanel
          startIndex={startIndexPrev}
          setStartIndex={setStartIndexPrev}
          visibleTextCount={visibleTextCount}
          textCount={prevTextCount}
          thumbUpCount={thumbUpCountPrev}
          setThumbUpCount={setThumbUpCountPrev}
          thumbDownCount={thumbDownCountPrev}
          setThumbDownCount={setThumbDownCountPrev}
          commentCount={commentCountPrev}
          setCommentCount={setCommentCountPrev}
          nextPlanCount={nextPlanCountPrev}
          setNextPlanCount={setNextPlanCountPrev}
        />

        <MainPanel
          mainPanels={mainPanels}
          thumbUpCount={thumbUpCountPrev}
          setThumbUpCount={setThumbUpCountPrev}
          thumbDownCount={thumbDownCountPrev}
          setThumbDownCount={setThumbDownCountPrev}
          commentCount={commentCountPrev}
          setCommentCount={setCommentCountPrev}
          nextPlanCount={nextPlanCountPrev}
          setNextPlanCount={setNextPlanCountPrev}
        />

        <ChildrenPanel
          startIndex={startIndexNext}
          setStartIndex={setStartIndexNext}
          visibleTextCount={visibleTextCount}
          textCount={nextTextCount}
          thumbUpCount={thumbUpCountNext}
          setThumbUpCount={setThumbUpCountNext}
          thumbDownCount={thumbDownCountNext}
          setThumbDownCount={setThumbDownCountNext}
          commentCount={commentCountNext}
          setCommentCount={setCommentCountNext}
          nextPlanCount={nextPlanCountNext}
          setNextPlanCount={setNextPlanCountNext}
        />
      </Box>
    </Container>
  );
};
