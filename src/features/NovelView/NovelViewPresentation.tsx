import React from 'react';
import { Box, Container } from '@mui/material';
import ParentPanel from './ParentPanel';
import ChildrenPanel from './ChildrenPanel';
import MainPanel from './MainPanel';

// TODO: サンプルデータ後で削除
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
  mainPanels: MainPanel[];
  parentPanel: Panel;
  childrenPanel: Panel;
  startIndexPrev: number;
  setStartIndexPrev: React.Dispatch<React.SetStateAction<number>>;
  evaluation_good_countPrev: number;
  setEvaluation_good_countPrev: React.Dispatch<React.SetStateAction<number>>;
  commentCountPrev: number;
  setCommentCountPrev: React.Dispatch<React.SetStateAction<number>>;
  nextPlanCountPrev: number;
  setNextPlanCountPrev: React.Dispatch<React.SetStateAction<number>>;
  startIndexNext: number;
  setStartIndexNext: React.Dispatch<React.SetStateAction<number>>;
  evaluation_good_countNext: number;
  setEvaluation_good_countNext: React.Dispatch<React.SetStateAction<number>>;
  commentCountNext: number;
  setCommentCountNext: React.Dispatch<React.SetStateAction<number>>;
  nextPlanCountNext: number;
  setNextPlanCountNext: React.Dispatch<React.SetStateAction<number>>;
}

export const NovelViewPresentation: React.FC<NovelViewPresentationProps> = ({
  mainPanels,
  startIndexPrev,
  setStartIndexPrev,
  commentCountPrev,
  setCommentCountPrev,
  nextPlanCountPrev,
  setNextPlanCountPrev,
  startIndexNext,
  setStartIndexNext,
  evaluation_good_countPrev,
  setEvaluation_good_countPrev,
  evaluation_good_countNext,
  setEvaluation_good_countNext,
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
        {/* 親の投稿 */}
        <ParentPanel
          startIndex={startIndexPrev}
          setStartIndex={setStartIndexPrev}
          visibleTextCount={visibleTextCount}
          textCount={prevTextCount}
          evaluation_good_count={evaluation_good_countPrev}
          setEvaluation_good_count={setEvaluation_good_countPrev}
          commentCount={commentCountPrev}
          setCommentCount={setCommentCountPrev}
          nextPlanCount={nextPlanCountPrev}
          setNextPlanCount={setNextPlanCountPrev}
        />

        {/* メインの投稿 */}
        <MainPanel
          mainPanels={mainPanels}
          evaluation_good_count={evaluation_good_countPrev}
          setEvaluation_good_count={setEvaluation_good_countPrev}
          commentCount={commentCountPrev}
          setCommentCount={setCommentCountPrev}
          nextPlanCount={nextPlanCountPrev}
          setNextPlanCount={setNextPlanCountPrev}
        />

        {/* 子の投稿 */}
        <ChildrenPanel
          startIndex={startIndexNext}
          setStartIndex={setStartIndexNext}
          visibleTextCount={visibleTextCount}
          textCount={nextTextCount}
          evaluation_good_count={evaluation_good_countNext}
          setEvaluation_good_count={setEvaluation_good_countNext}
          commentCount={commentCountNext}
          setCommentCount={setCommentCountNext}
          nextPlanCount={nextPlanCountNext}
          setNextPlanCount={setNextPlanCountNext}
        />
      </Box>
    </Container>
  );
};
