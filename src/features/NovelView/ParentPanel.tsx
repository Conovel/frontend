import React from 'react';
import { Box } from '@mui/material';
import NovelCard from '../../components/novelCard/NovelCard';
import { Sentence } from '../../api/api';

interface ParentPanelProps {
  parentPanel: Sentence;
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
          sentence={parentPanel.sentence || ''}
          novel={{
            sentenceId: parentPanel.sentenceId || 0,
            sentence: parentPanel.sentence || '',
            createdAt: '',
            updatedAt: parentPanel.updatedAt || '',
            sentenceUserId: 0,
            sentencePenName: '',
            profileIconImage: '',
            evaluationGoodCount: 0,
            evaluationStayCount: 0,
          }}
          onClick={() => {}}
          evaluationGoodCount={evaluationGoodCount}
          setEvaluationGoodCount={setEvaluationGoodCount}
          commentCount={commentCount}
          setCommentCount={setCommentCount}
          evaluationStayCount={evaluationStayCount}
          setEvaluationStayCount={setEvaluationStayCount}
        />
      ) : null}
    </Box>
  );
};

export default ParentPanel;
