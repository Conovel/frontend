import React from 'react';
import { Box } from '@mui/material';
import { MainPanel } from './MainPanel';
import ParentPanel from './ParentPanel';
import { ChildrenPanel } from './ChildrenPanel';
import { Sentence } from '../../types/types';

interface NovelViewPresentationProps {
  mainPanel: Sentence | null;
  parentPanel: Sentence | null;
  childrenPanels: Sentence[];
  startIndex: number;
  setStartIndex: React.Dispatch<React.SetStateAction<number>>;
  textCount: number;
  evaluation_good_count: number;
  setEvaluation_good_count: React.Dispatch<React.SetStateAction<number>>;
  comment_count: number;
  setComment_count: React.Dispatch<React.SetStateAction<number>>;
  evaluation_stay_count: number;
  setEvaluation_stay_count: React.Dispatch<React.SetStateAction<number>>;
  onPostSuccess: (newPost: Sentence) => void;
}

const NovelViewPresentation: React.FC<NovelViewPresentationProps> = ({
  mainPanel,
  parentPanel,
  childrenPanels,
  startIndex,
  setStartIndex,
  textCount,
  evaluation_good_count,
  setEvaluation_good_count,
  comment_count,
  setComment_count,
  evaluation_stay_count,
  setEvaluation_stay_count,
  onPostSuccess,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      {parentPanel && (
        <ParentPanel
          parentPanel={parentPanel}
          startIndex={startIndex}
          setStartIndex={setStartIndex}
          visibleTextCount={3}
          textCount={textCount}
          evaluation_good_count={evaluation_good_count}
          setEvaluation_good_count={setEvaluation_good_count}
          comment_count={comment_count}
          setComment_count={setComment_count}
          evaluation_stay_count={evaluation_stay_count}
          setEvaluation_stay_count={setEvaluation_stay_count}
        />
      )}
      {mainPanel && (
        <MainPanel
          mainPanel={mainPanel}
          onPostSuccess={onPostSuccess}
          evaluation_good_count={evaluation_good_count}
          setEvaluation_good_count={setEvaluation_good_count}
          comment_count={comment_count}
          setComment_count={setComment_count}
          evaluation_stay_count={evaluation_stay_count}
          setEvaluation_stay_count={setEvaluation_stay_count}
        />
      )}
      {childrenPanels.length > 0 && (
        <ChildrenPanel
          childrenPanels={childrenPanels}
          evaluation_good_count={evaluation_good_count}
          setEvaluation_good_count={setEvaluation_good_count}
          comment_count={comment_count}
          setComment_count={setComment_count}
          evaluation_stay_count={evaluation_stay_count}
          setEvaluation_stay_count={setEvaluation_stay_count}
          onPostSuccess={onPostSuccess}
        />
      )}
    </Box>
  );
};

export default NovelViewPresentation;
