import React from 'react';
import { Box, Container } from '@mui/material';
import Prev from '../../components/novelview/ParentPanel';
import Next from '../../components/novelview/ChildrenPanel';
import { FaThumbsUp } from 'react-icons/fa';
import ChatIcon from '@mui/icons-material/Chat';
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
}

interface MainPanel {
  id: number;
  text1: string;
  text2: string;
}

interface Panel {
  id: number;
  text1: string;
  text2: string;
}

interface NovelViewPresentationProps {
  posts: Post[];
  mainPanels: MainPanel[];
  prevPanel: Panel;
  nextPanel: Panel;
}

export const NovelViewPresentation: React.FC<NovelViewPresentationProps> = ({
  posts,
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
      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100vw' }}>
        {posts.map((post) => (
          <Box
            key={post.sentence_id}
            sx={{
              backgroundColor: '#fff',
              border: '1px solid #000',
              borderRadius: '10px',
              padding: '10px',
              margin: '5vh 0',
              width: '100%',
              zIndex: 2,
            }}
          >
            <p>{post.sentence}</p>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '5px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <FaThumbsUp style={{ fontSize: '18px' }} />
                <span>{post.evaluation_good_count}</span>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <ChatIcon style={{ fontSize: '18px' }} />
                <span>{post.comments}</span>
              </Box>
            </Box>
            <p>投稿数: {post.sentence_user_count}</p>
            <p>階層数: {post.sentence_hierarchy_count}</p>
            <p>読者数: {post.reader_count}</p>
            <p>あらすじ: {post.overview}</p>
          </Box>
        ))}
      </Box>
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

      <Prev
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

      <Next
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
    </Container>
  );
};
