import React from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import ChatIcon from '@mui/icons-material/Chat';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Box, Container } from '@mui/material';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import NextPlanIcon from '@mui/icons-material/NextPlan';

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
    fontSize: '20px',
  },
  verticalLine: {
    position: 'absolute',
    bottom: '10vh',
    left: '50%',
    width: '1px',
    backgroundColor: '#000',
    zIndex: 1,
  },
  prevPanel: {
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '5vh 0',
    height: '20vh',
    alignItems: 'center',
    zIndex: 2,
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
  nextPanel: {
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '5vh 0',
    height: '20vh',
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

  const handleScrollPrev = (direction: 'next' | 'prev') => {
    if (
      direction === 'next' &&
      startIndexPrev + visibleTextCount < prevTextCount
    ) {
      setStartIndexPrev(startIndexPrev + visibleTextCount);
    } else if (direction === 'prev' && startIndexPrev > 0) {
      setStartIndexPrev(startIndexPrev - visibleTextCount);
    }
  };

  const handleScrollNext = (direction: 'next' | 'prev') => {
    if (
      direction === 'next' &&
      startIndexNext + visibleTextCount < nextTextCount
    ) {
      setStartIndexNext(startIndexNext + visibleTextCount);
    } else if (direction === 'prev' && startIndexNext > 0) {
      setStartIndexNext(startIndexNext - visibleTextCount);
    }
  };

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

      <Box style={styles.prevPanel}>
        <KeyboardArrowLeftIcon
          onClick={() => handleScrollPrev('prev')}
          style={{ cursor: startIndexPrev === 0 ? 'not-allowed' : 'pointer' }}
          color={startIndexPrev === 0 ? 'disabled' : 'action'}
        />
        {Array.from({ length: visibleTextCount }, (_, index) => {
          const textIndex = startIndexPrev + index;
          return textIndex < prevTextCount ? (
            <Box key={textIndex} style={styles.textWrapper}>
              <p>前の階層のテキスト{textIndex + 1}</p>
              <Box style={styles.iconContainer}>
                <Box style={styles.iconWrapper}>
                  <ThumbUpIcon />
                  <span>{/* ここにいいねの数を入れる */}</span>
                </Box>
                <Box style={styles.iconWrapper}>
                  <ThumbDownIcon />
                  <span>{/* ここに嫌いの数を入れる */}</span>
                </Box>
                <Box style={styles.iconWrapper}>
                  <ChatIcon />
                  <span>{/* ここにコメントの数を入れる */}</span>
                </Box>
                <Box style={styles.iconWrapper}>
                  <NextPlanIcon />
                  <span>{/* ここに次の計画の数を入れる */}</span>
                </Box>
              </Box>
            </Box>
          ) : null;
        })}
        <KeyboardArrowRightIcon
          onClick={() => handleScrollPrev('next')}
          style={{
            cursor:
              startIndexPrev + visibleTextCount >= prevTextCount
                ? 'not-allowed'
                : 'pointer',
          }}
          color={
            startIndexPrev + visibleTextCount >= prevTextCount
              ? 'disabled'
              : 'action'
          }
        />
      </Box>

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

      <Box style={styles.nextPanel}>
        <KeyboardArrowLeftIcon
          onClick={() => handleScrollNext('prev')}
          style={{ cursor: startIndexNext === 0 ? 'not-allowed' : 'pointer' }}
          color={startIndexNext === 0 ? 'disabled' : 'action'}
        />
        {Array.from({ length: visibleTextCount }, (_, index) => {
          const textIndex = startIndexNext + index;
          return textIndex < nextTextCount ? (
            <Box key={textIndex} style={styles.textWrapper}>
              <p>次の階層のテキスト{textIndex + 1}</p>
              <Box style={styles.iconContainer}>
                <Box style={styles.iconWrapper}>
                  <ThumbUpIcon />
                  <span>{/* ここにいいねの数を入れる */}</span>
                </Box>
                <Box style={styles.iconWrapper}>
                  <ThumbDownIcon />
                  <span>{/* ここに嫌いの数を入れる */}</span>
                </Box>
                <Box style={styles.iconWrapper}>
                  <ChatIcon />
                  <span>{/* ここにコメントの数を入れる */}</span>
                </Box>
                <Box style={styles.iconWrapper}>
                  <NextPlanIcon />
                  <span>{/* ここに次の計画の数を入れる */}</span>
                </Box>
              </Box>
            </Box>
          ) : null;
        })}
        <KeyboardArrowRightIcon
          onClick={() => handleScrollNext('next')}
          style={{
            cursor:
              startIndexNext + visibleTextCount >= nextTextCount
                ? 'not-allowed'
                : 'pointer',
          }}
          color={
            startIndexNext + visibleTextCount >= nextTextCount
              ? 'disabled'
              : 'action'
          }
        />
      </Box>
    </Container>
  );
};
