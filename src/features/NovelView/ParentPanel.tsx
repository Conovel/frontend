import React from 'react';
import { Box } from '@mui/material';
import NovelCard from '../../components/novelCard/NovelCard';
import { NovelProps } from '../../types/types';

interface ParentPanelProps {
  parentPanel: NovelProps;
  startIndex: number;
  setStartIndex: React.Dispatch<React.SetStateAction<number>>;
  visibleTextCount: number;
  textCount: number;
  evaluationGoodCount: number;
  setEvaluationGoodCount: React.Dispatch<React.SetStateAction<number>>;
  commentCount: number;
  setCommentCount: React.Dispatch<React.SetStateAction<number>>;
  evaluationStayCount: number;
  setEvaluationStayCount: React.Dispatch<React.SetStateAction<number>>;
  isGoodEvaluated: boolean;
  isStayEvaluated: boolean;
  onClick: () => void;
}

const ParentPanel: React.FC<ParentPanelProps> = ({
  parentPanel,
  startIndex,
  textCount,
  evaluationGoodCount,
  setEvaluationGoodCount,
  commentCount,
  setCommentCount,
  evaluationStayCount,
  setEvaluationStayCount,
  isGoodEvaluated,
  isStayEvaluated,
  onClick,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        margin: '1vh auto',
        height: '23vh',
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
          sentence={parentPanel.sentence}
          novel={parentPanel}
          onClick={onClick}
          evaluation_good_count={evaluationGoodCount}
          setEvaluation_good_count={setEvaluationGoodCount}
          comment_count={commentCount}
          setComment_count={setCommentCount}
          evaluation_stay_count={evaluationStayCount}
          setEvaluation_stay_count={setEvaluationStayCount}
          isGoodEvaluated={isGoodEvaluated}
          isStayEvaluated={isStayEvaluated}
        />
      ) : null}
    </Box>
  );
};

export default ParentPanel;
