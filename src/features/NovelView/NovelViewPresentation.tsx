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
  start_index_parent: number;
  setStart_index_parent: React.Dispatch<React.SetStateAction<number>>;
  evaluation_good_count_parent: number;
  setEvaluation_good_count_parent: React.Dispatch<React.SetStateAction<number>>;
  comment_count_parent: number;
  setComment_count_parent: React.Dispatch<React.SetStateAction<number>>;
  evaluation_stay_count_parent: number;
  setEvaluation_stay_count_parent: React.Dispatch<React.SetStateAction<number>>;
  start_index_children: number;
  setStart_index_children: React.Dispatch<React.SetStateAction<number>>;
  evaluation_good_count_children: number;
  setEvaluation_good_count_children: React.Dispatch<
    React.SetStateAction<number>
  >;
  comment_count_children: number;
  setComment_count_children: React.Dispatch<React.SetStateAction<number>>;
  evaluation_stay_count_children: number;
  setEvaluation_stay_count_children: React.Dispatch<
    React.SetStateAction<number>
  >;
  start_index_main?: number;
  setStart_index_main?: React.Dispatch<React.SetStateAction<number>>;
  evaluation_good_count_main: number;
  setEvaluation_good_count_main: React.Dispatch<React.SetStateAction<number>>;
  comment_count_main: number;
  setComment_count_main: React.Dispatch<React.SetStateAction<number>>;
  evaluation_stay_count_main: number;
  setEvaluation_stay_count_main: React.Dispatch<React.SetStateAction<number>>;
  textCount: number;
}

export const NovelViewPresentation: React.FC<NovelViewPresentationProps> = ({
  start_index_parent,
  setStart_index_parent,
  comment_count_parent,
  setComment_count_parent,
  evaluation_stay_count_parent,
  setEvaluation_stay_count_parent,
  start_index_children,
  setStart_index_children,
  evaluation_good_count_parent,
  setEvaluation_good_count_parent,
  evaluation_good_count_children,
  setEvaluation_good_count_children,
  comment_count_children,
  setComment_count_children,
  evaluation_stay_count_children,
  setEvaluation_stay_count_children,
  evaluation_good_count_main,
  setEvaluation_good_count_main,
  comment_count_main,
  setComment_count_main,
  evaluation_stay_count_main,
  setEvaluation_stay_count_main,
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
            startIndex={start_index_parent}
            setStartIndex={setStart_index_parent}
            visibleTextCount={visibleTextCount}
            textCount={parentTextCount}
            evaluation_good_count={evaluation_good_count_parent}
            setEvaluation_good_count={setEvaluation_good_count_parent}
            comment_count={comment_count_parent}
            setComment_count={setComment_count_parent}
            evaluation_stay_count={evaluation_stay_count_parent}
            setEvaluation_stay_count={setEvaluation_stay_count_parent}
          />
        ))}
        <MainPanel
          mainPanel={mockContainerData.main[0]}
          evaluation_good_count={evaluation_good_count_main}
          setEvaluation_good_count={setEvaluation_good_count_main}
          comment_count={comment_count_main}
          setComment_count={setComment_count_main}
          evaluation_stay_count={evaluation_stay_count_main}
          setEvaluation_stay_count={setEvaluation_stay_count_main}
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
            sentenceUserName: '',
            profileIconImage: '',
            evaluationGoodCount: 0,
            evaluationStayCount: 0,
            createdAt: new Date().toISOString(),
          }}
          onClick={() => {}}
          textIndex={0}
          startIndex={start_index_children}
          setStartIndex={setStart_index_children}
          visibleTextCount={visibleTextCount}
          textCount={childrenTextCount}
          evaluation_good_count={evaluation_good_count_children}
          setEvaluation_good_count={setEvaluation_good_count_children}
          comment_count={comment_count_children}
          setComment_count={setComment_count_children}
          evaluation_stay_count={evaluation_stay_count_children}
          setEvaluation_stay_count={setEvaluation_stay_count_children}
        />
      </Box>
    </Container>
  );
};
