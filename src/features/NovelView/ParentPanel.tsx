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
  onClick,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        margin: '0.5vh auto',
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
          novel={{
            titleId: parentPanel.titleId,
            mainCopy: parentPanel.mainCopy,
            overview: parentPanel.overview,
            title: parentPanel.title,
            authorUserName: parentPanel.authorUserName,
            chips: parentPanel.chips,
            avatar: parentPanel.avatar,
            popular: parentPanel.popular,
            newArrival: parentPanel.newArrival,
            readerCount: parentPanel.readerCount,
            updatedAt: parentPanel.updatedAt,
            sentenceUserCount: parentPanel.sentenceUserCount,
            sentenceHierarchyCount: parentPanel.sentenceHierarchyCount,
            tags: parentPanel.tags,
            userId: 0,
            userName: '',
            textIndex: 0,
            children: [],
            parent: [],
            main: [],
            sentenceId: parentPanel.sentenceId || 0,
            sentence: parentPanel.sentence || '',
            createdAt: '',
            profileIconImage: '',
            evaluationGoodCount: 0,
            evaluationStayCount: 0,
          }}
          onClick={onClick}
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
