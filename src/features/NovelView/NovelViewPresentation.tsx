import React from 'react';
import { Box, Container } from '@mui/material';
import ParentPanel from './ParentPanel';
import ChildrenPanel from './ChildrenPanel';
import MainPanel from './MainPanel';
import { mockContainerData } from './mocks/data';
import { Sentence } from '../../api/api';

interface NovelViewPresentationProps {
  mainPanel: Sentence[];
  parentPanel: Sentence[];
  childrenPanel: Sentence[];
  startIndexParent: number;
  setStartIndexParent: React.Dispatch<React.SetStateAction<number>>;
  evaluationGoodCountParent: number;
  setEvaluationGoodCountParent: React.Dispatch<React.SetStateAction<number>>;
  commentCountParent: number;
  setCommentCountParent: React.Dispatch<React.SetStateAction<number>>;
  evaluationStayCountParent: number;
  setEvaluationStayCountParent: React.Dispatch<React.SetStateAction<number>>;
  startIndexChildren: number;
  setStartIndexChildren: React.Dispatch<React.SetStateAction<number>>;
  evaluationGoodCountChildren: number;
  setEvaluationGoodCountChildren: React.Dispatch<React.SetStateAction<number>>;
  commentCountChildren: number;
  setCommentCountChildren: React.Dispatch<React.SetStateAction<number>>;
  evaluationStayCountChildren: number;
  setEvaluationStayCountChildren: React.Dispatch<React.SetStateAction<number>>;
  startIndexMain?: number;
  setStartIndexMain?: React.Dispatch<React.SetStateAction<number>>;
  evaluationGoodCountMain: number;
  setEvaluationGoodCountMain: React.Dispatch<React.SetStateAction<number>>;
  commentCountMain: number;
  setCommentCountMain: React.Dispatch<React.SetStateAction<number>>;
  evaluationStayCountMain: number;
  setEvaluationStayCountMain: React.Dispatch<React.SetStateAction<number>>;
  textCount: number;
}

export const NovelViewPresentation: React.FC<NovelViewPresentationProps> = ({
  startIndexParent,
  setStartIndexParent,
  commentCountParent,
  setCommentCountParent,
  evaluationStayCountParent,
  setEvaluationStayCountParent,
  startIndexChildren,
  setStartIndexChildren,
  evaluationGoodCountParent,
  setEvaluationGoodCountParent,
  evaluationGoodCountChildren,
  setEvaluationGoodCountChildren,
  commentCountChildren,
  setCommentCountChildren,
  evaluationStayCountChildren,
  setEvaluationStayCountChildren,
  evaluationGoodCountMain,
  setEvaluationGoodCountMain,
  commentCountMain,
  setCommentCountMain,
  evaluationStayCountMain,
  setEvaluationStayCountMain,
}) => {
  const parentTextCount = 10;
  const childrenTextCount = 10;
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
        {mockContainerData.parent.map((NovelProps, index) => (
          <ParentPanel
            key={index}
            parentPanel={NovelProps}
            startIndex={startIndexParent}
            setStartIndex={setStartIndexParent}
            visibleTextCount={visibleTextCount}
            textCount={parentTextCount}
            evaluationGoodCount={evaluationGoodCountParent}
            setEvaluationGoodCount={setEvaluationGoodCountParent}
            commentCount={commentCountParent}
            setCommentCount={setCommentCountParent}
            evaluationStayCount={evaluationStayCountParent}
            setEvaluationStayCount={setEvaluationStayCountParent}
          />
        ))}
        <MainPanel
          mainPanel={mockContainerData.main[0]}
          evaluationGoodCount={evaluationGoodCountMain}
          setEvaluationGoodCount={setEvaluationGoodCountMain}
          commentCount={commentCountMain}
          setCommentCount={setCommentCountMain}
          evaluationStayCount={evaluationStayCountMain}
          setEvaluationStayCount={setEvaluationStayCountMain}
        />
        <ChildrenPanel
          mainPanel={[]}
          childrenPanel={[]}
          setChildrenPanel={() => {}}
          setMainPanel={() => {}}
          novel={{
            updatedAt: new Date().toISOString(),
            sentence: '',
            sentenceId: 0,
            sentenceUserId: 0,
            sentencePenName: '',
            profileIconImage: '',
            evaluationGoodCount: 0,
            evaluationStayCount: 0,
            createdAt: new Date().toISOString(),
          }}
          onClick={() => {}}
          textIndex={0}
          startIndex={startIndexChildren}
          setStartIndex={setStartIndexChildren}
          visibleTextCount={visibleTextCount}
          textCount={childrenTextCount}
          evaluationGoodCount={evaluationGoodCountChildren}
          setEvaluationGoodCount={setEvaluationGoodCountChildren}
          commentCount={commentCountChildren}
          setCommentCount={setCommentCountChildren}
          evaluationStayCount={evaluationStayCountChildren}
          setEvaluationStayCount={setEvaluationStayCountChildren}
        />
      </Box>
    </Container>
  );
};
