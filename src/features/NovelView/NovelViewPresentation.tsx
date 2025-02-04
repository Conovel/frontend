import React from 'react';
import { Box, Container } from '@mui/material';
import ParentPanel from './ParentPanel';
import ChildrenPanel from './ChildrenPanel';
import MainPanel from './MainPanel';

interface MainPanel {
  sentence_id: number;
  sentence: string;
  userId: number;
  userName: string;
}

interface ParentPanel {
  sentence_id: number;
  sentence: string;
  userId: number;
  userName: string;
}

interface ChildrenPanel {
  sentence_id: number;
  sentence: string;
  userId: number;
  userName: string;
}

interface NovelViewPresentationProps {
  mainPanels: MainPanel[];
  parentPanel: ParentPanel;
  childrenPanel: ChildrenPanel;
  startIndexPrev: number;
  setStartIndexPrev: React.Dispatch<React.SetStateAction<number>>;
  evaluation_good_countPrev: number;
  setEvaluation_good_countPrev: React.Dispatch<React.SetStateAction<number>>;
  comment_countPrev: number;
  setComment_countPrev: React.Dispatch<React.SetStateAction<number>>;
  evaluation_stay_countPrev: number;
  setEvaluation_stay_countPrev: React.Dispatch<React.SetStateAction<number>>;
  startIndexNext: number;
  setStartIndexNext: React.Dispatch<React.SetStateAction<number>>;
  evaluation_good_countNext: number;
  setEvaluation_good_countNext: React.Dispatch<React.SetStateAction<number>>;
  comment_countNext: number;
  setComment_countNext: React.Dispatch<React.SetStateAction<number>>;
  evaluation_stay_countNext: number;
  setEvaluation_stay_countNext: React.Dispatch<React.SetStateAction<number>>;
  evaluation_good_countMain: number;
  setEvaluation_good_countMain: React.Dispatch<React.SetStateAction<number>>;
  comment_countMain: number;
  setComment_countMain: React.Dispatch<React.SetStateAction<number>>;
  evaluation_stay_countMain: number;
  setEvaluation_stay_countMain: React.Dispatch<React.SetStateAction<number>>;
}

export const NovelViewPresentation: React.FC<NovelViewPresentationProps> = ({
  mainPanels,
  parentPanel,
  childrenPanel,
  startIndexPrev,
  setStartIndexPrev,
  comment_countPrev,
  setComment_countPrev,
  evaluation_stay_countPrev,
  setEvaluation_stay_countPrev,
  startIndexNext,
  setStartIndexNext,
  evaluation_good_countPrev,
  setEvaluation_good_countPrev,
  evaluation_good_countNext,
  setEvaluation_good_countNext,
  comment_countNext,
  setComment_countNext,
  evaluation_stay_countNext,
  setEvaluation_stay_countNext,
  evaluation_good_countMain,
  setEvaluation_good_countMain,
  comment_countMain,
  setComment_countMain,
  evaluation_stay_countMain,
  setEvaluation_stay_countMain,
}) => {
  const prevTextCount = 10;
  const nextTextCount = 10;
  const visibleTextCount = 3;

  return (
    <Container sx={{ position: 'relative', alignItems: 'center' }}>
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
        {/* <ParentPanel
          prevPanel={parentPanel}
          startIndex={startIndexPrev}
          setStartIndex={setStartIndexPrev}
          visibleTextCount={visibleTextCount}
          textCount={prevTextCount}
          evaluation_good_count={evaluation_good_countPrev}
          setEvaluation_good_count={setEvaluation_good_countPrev}
          comment_count={comment_countPrev}
          setComment_count={setComment_countPrev}
          evaluation_stay_count={evaluation_stay_countPrev}
          setEvaluation_stay_count={setEvaluation_stay_countPrev}
        /> */}

        {/* メインの投稿 */}
        <MainPanel
          mainPanels={mainPanels}
          evaluation_good_count={evaluation_good_countMain}
          setEvaluation_good_count={setEvaluation_good_countMain}
          comment_count={comment_countMain}
          setComment_count={setComment_countMain}
          evaluation_stay_count={evaluation_stay_countMain}
          setEvaluation_stay_count={setEvaluation_stay_countMain}
        />

        {/* 子の投稿 */}
        {/* <ChildrenPanel
          nextPanel={childrenPanel}
          startIndex={startIndexNext}
          setStartIndex={setStartIndexNext}
          visibleTextCount={visibleTextCount}
          textCount={nextTextCount}
          evaluation_good_count={evaluation_good_countNext}
          setEvaluation_good_count={setEvaluation_good_countNext}
          comment_count={comment_countNext}
          setComment_count={setComment_countNext}
          evaluation_stay_count={evaluation_stay_countNext}
          setEvaluation_stay_count={setEvaluation_stay_countNext}
        /> */}
      </Box>
    </Container>
  );
};
