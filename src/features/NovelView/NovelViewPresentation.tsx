import React from 'react';
import { Box, Container } from '@mui/material';
import ParentPanel from '../../components/novelview/ParentPanel';
import ChildrenPanel from '../../components/novelview/ChildrenPanel';
import MainPanel from '../../components/novelview/MainPanel';

// TODO: サンプルデータ後で削除
interface Post {
  sentence_id: number;
  sentence: string;
  evaluation_good_count: number;
  evaluation_stay_count: number;
  comments: number;
  sentence_user_count: number;
  sentence_hierarchy_count: number;
  reader_count: number;
  overview: string;
  userName: string;
}
interface MainPanel {
  sentence_id: number;
  sentence: string;
  userId: number;
  userName: string;
}

interface Panel {
  sentence_id: number;
  sentence: string;
}

interface NovelViewPresentationProps {
  posts: Post[];
  mainPanels: MainPanel[];
  parentPanel: Panel;
  childrenPanel: Panel;
}

export const NovelViewPresentation: React.FC<NovelViewPresentationProps> = ({
  mainPanels,
}) => {
  const prevTextCount = 10;
  const nextTextCount = 10;
  const visibleTextCount = 3;
  const [startIndexPrev, setStartIndexPrev] = React.useState(0);
  const [startIndexNext, setStartIndexNext] = React.useState(0);

  const [thumbUpCountPrev, setThumbUpCountPrev] = React.useState<number>(0);
  const [thumbDownCountPrev, setThumbDownCountPrev] = React.useState<number>(0);
  const [commentCountPrev, setCommentCountPrev] = React.useState<number>(0);
  const [nextPlanCountPrev, setNextPlanCountPrev] = React.useState<number>(0);

  const [thumbUpCountNext, setThumbUpCountNext] = React.useState<number>(0);
  const [thumbDownCountNext, setThumbDownCountNext] = React.useState<number>(0);
  const [commentCountNext, setCommentCountNext] = React.useState<number>(0);
  const [nextPlanCountNext, setNextPlanCountNext] = React.useState<number>(0);

  return (
    <Container sx={{ position: 'relative', top: '8vh', alignItems: 'center' }}>
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
        <ParentPanel
          startIndex={startIndexPrev}
          setStartIndex={setStartIndexPrev}
          visibleTextCount={visibleTextCount}
          textCount={prevTextCount}
          thumbUpCount={thumbUpCountPrev}
          setThumbUpCount={setThumbUpCountPrev}
          thumbDownCount={thumbDownCountPrev}
          setThumbDownCount={setThumbDownCountPrev}
          commentCount={commentCountPrev}
          setCommentCount={setCommentCountPrev}
          nextPlanCount={nextPlanCountPrev}
          setNextPlanCount={setNextPlanCountPrev}
        />

        <MainPanel
          mainPanels={mainPanels}
          thumbUpCount={thumbUpCountPrev}
          setThumbUpCount={setThumbUpCountPrev}
          thumbDownCount={thumbDownCountPrev}
          setThumbDownCount={setThumbDownCountPrev}
          commentCount={commentCountPrev}
          setCommentCount={setCommentCountPrev}
          nextPlanCount={nextPlanCountPrev}
          setNextPlanCount={setNextPlanCountPrev}
        />

        <ChildrenPanel
          startIndex={startIndexNext}
          setStartIndex={setStartIndexNext}
          visibleTextCount={visibleTextCount}
          textCount={nextTextCount}
          thumbUpCount={thumbUpCountNext}
          setThumbUpCount={setThumbUpCountNext}
          thumbDownCount={thumbDownCountNext}
          setThumbDownCount={setThumbDownCountNext}
          commentCount={commentCountNext}
          setCommentCount={setCommentCountNext}
          nextPlanCount={nextPlanCountNext}
          setNextPlanCount={setNextPlanCountNext}
        />
      </Box>
    </Container>
  );
};
