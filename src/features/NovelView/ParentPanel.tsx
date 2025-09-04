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
        margin: '2vh auto',
        height: '23vh',
        width: '70vw',
        alignItems: 'center',
        zIndex: 2,
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
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
          evaluationGoodCount={evaluationGoodCount}
          setEvaluationGoodCount={setEvaluationGoodCount}
          evaluationStayCount={evaluationStayCount}
          setEvaluationStayCount={setEvaluationStayCount}
          isGoodEvaluated={isGoodEvaluated}
          isStayEvaluated={isStayEvaluated}
        />
      ) : null}
    </Box>
  );
};

export default ParentPanel;
