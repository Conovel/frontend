import React from 'react';
import { Box, Container } from '@mui/material';
import Prev from '../../components/novelview/Prev';
import Next from '../../components/novelview/Next';
import { FaThumbsUp } from 'react-icons/fa';
import ChatIcon from '@mui/icons-material/Chat';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface Post {
  id: number;
  text: string;
  likes: number;
  comments: number;
  main_copy: string;
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

const styles: { [key: string]: React.CSSProperties } = {
  contentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    zIndex: 2,
  },
  icon: {
    fontSize: '18px',
  },
  verticalLine: {
    position: 'absolute',
    bottom: '10vh',
    left: '50%',
    width: '1px',
    backgroundColor: '#000',
    zIndex: 1,
  },
  mainPanel: {
    backgroundColor: '#fff',
    position: 'relative',
    textAlign: 'left',
    border: '1px solid #000',
    borderRadius: '10px',
    margin: '5vh 0',
    height: '40vh',
    alignItems: 'center',
    fontSize: '1.2rem',
    zIndex: 2,
  },

  panelItem: {
    flex: 1,
    textAlign: 'center',
  },
  buttonWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    width: '90%',
    padding: '5px 10px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    textAlign: 'left',
  },
  footerReactions: {
    display: 'flex',
    alignItems: 'center',
  },
  commentCount: {
    display: 'flex',
    alignItems: 'center',
  },
  textWrapper: {
    fontSize: '0.8rem',
    border: '1px solid #000',
    padding: '10px',
    borderRadius: '5px',
    margin: '0 5px',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '5px',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '10px',
  },
};

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
          <Box key={post.id}>
            <Box style={styles.postBox}>
              <p>{post.text}</p>
              <p>{post.main_copy}</p>
              <Box style={styles.iconWrapper}>
                <Box style={styles.reactionWrapper}>
                  <FaThumbsUp style={styles.icon} />
                  <span>{post.likes}</span>
                </Box>
                <Box style={styles.reactionWrapper}>
                  <ChatIcon style={styles.icon} />
                  <span>{post.comments}</span>
                </Box>
              </Box>
              <p>投稿数: {post.sentence_user_count}</p>
              <p>階層数: {post.sentence_hierarchy_count}</p>
              <p>読者数: {post.reader_count}</p>
              <p>あらすじ: {post.overview}</p>
            </Box>
          </Box>
        ))}
      </Box>
      <Box style={styles.verticalLine}></Box>

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

      {mainPanels.map((panel) => (
        <Box key={panel.id} style={styles.mainPanel}>
          <p>{panel.text1}</p>
          <p>{panel.text2}</p>
          <DragIndicatorIcon
            sx={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              cursor: 'pointer',
            }}
          />
        </Box>
      ))}

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
