import React from 'react';
import { Box } from '@mui/material';
import SentenceCard from '../../components/novelCard/SentenceCard';
import type { Sentence } from '../../api/api';

interface ParentPanelProps {
  parentPanel: Sentence;
  startIndex: number;
  textCount: number;
  onClick: () => void;
  getSentenceEvaluation: (sentenceId: number) => Promise<{
    goodCount: number;
    stayCount: number;
    isGoodEvaluated: boolean;
    isStayEvaluated: boolean;
  }>;
}

const ParentPanel: React.FC<ParentPanelProps> = ({
  parentPanel,
  startIndex,
  onClick,
  getSentenceEvaluation,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: 'transparent',
        margin: '2vh auto',
        height: '23vh',
        width: '70vw',
        alignItems: 'center',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <SentenceCard
        key={startIndex}
        sentence={parentPanel}
        onClick={onClick}
        getSentenceEvaluation={getSentenceEvaluation}
      />
    </Box>
  );
};

export default ParentPanel;
