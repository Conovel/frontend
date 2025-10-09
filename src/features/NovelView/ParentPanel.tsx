import React from 'react';
import { Box } from '@mui/material';
import NovelCard from '../../components/novelCard/NovelCard';
import { SentenceWithUI } from '../../types/types';

interface ParentPanelProps {
  parentPanel: SentenceWithUI;
  startIndex: number;
  setStartIndex: React.Dispatch<React.SetStateAction<number>>;
  visibleTextCount: number;
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
  textCount,
  onClick,
  getSentenceEvaluation,
}) => {
  // ユーザーの評価状態を取得（非同期）
  const [evaluation, setEvaluation] = React.useState({
    goodCount: 0,
    stayCount: 0,
    isGoodEvaluated: false,
    isStayEvaluated: false,
  });

  React.useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const evalData = await getSentenceEvaluation(
          parentPanel.sentenceId || 0,
        );
        setEvaluation(evalData);
      } catch (error) {
        console.error('Error fetching evaluation:', error);
      }
    };
    fetchEvaluation();
  }, [parentPanel.sentenceId, getSentenceEvaluation]);

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
          sentence={parentPanel.sentence || ''}
          userName={parentPanel.userName || parentPanel.sentencePenName || ''}
          sentenceId={parentPanel.sentenceId || 0}
          onClick={onClick}
          evaluationGoodCount={parentPanel.evaluationGoodCount || 0}
          evaluationStayCount={parentPanel.evaluationStayCount || 0}
          isGoodEvaluated={evaluation.isGoodEvaluated}
          isStayEvaluated={evaluation.isStayEvaluated}
        />
      ) : null}
    </Box>
  );
};

export default ParentPanel;
