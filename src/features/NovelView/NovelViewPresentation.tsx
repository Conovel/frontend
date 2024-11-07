import React from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import ChatIcon from '@mui/icons-material/Chat';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Box, Container } from '@mui/material';

interface Post {
  id: number;
  text: string;
  likes: number;
  comments: number;
}

interface MainPanel {
  id: number;
  text1: string;
  text2: string;
}

interface NovelViewPresentationProps {
  posts: Post[];
  mainPanels: MainPanel[];
}

const styles: { [key: string]: React.CSSProperties } = {
  frame: {
    position: 'absolute',
    top: '8vh',
    height: '90vh',
  },
  contentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    zIndex: 2,
  },
  postBox: {
    display: 'flex',
    alignItems: 'center',
    width: '30vw',
    boxSizing: 'border-box',
    border: '1px solid #000',
    borderRadius: '10px',
    flex: '1 1 30%',
    margin: '0 5px',
    fontSize: '0.8rem',
    height: '8vh',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  icon: {
    fontSize: '20px',
  },
  verticalLine: {
    position: 'absolute',
    top: '8vh',
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
    margin: '15vh 0',
    height: '30vh',
    alignItems: 'center',
    fontSize: '1.2rem',
    zIndex: 2,
  },
  dragIndicatorIcon: {
    fontSize: '20px',
    position: 'absolute',
    bottom: '10px',
    right: '10px',
  },
  nextPanel: {
    position: 'absolute',
    top: '80vh',
    zIndex: 2,
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
};

export const NovelViewPresentation: React.FC<NovelViewPresentationProps> = ({
  posts,
  mainPanels,
}) => {
  return (
    <Container sx={styles.frame}>
      <Box sx={styles.contentWrapper}>
        {posts.map((post) => (
          <Box key={post.id}>
            <Box style={styles.postBox}>
              <p>{post.text}</p>
            </Box>
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
          </Box>
        ))}
      </Box>
      <Box style={styles.verticalLine}></Box>
      <Box>
        {mainPanels.map((panel) => (
          <Box key={panel.id} style={styles.mainPanel}>
            <p>{panel.text1}</p>
            <p>{panel.text2}</p>
            <DragIndicatorIcon style={styles.dragIndicatorIcon} />
          </Box>
        ))}
      </Box>

      <Box style={styles.nextPanel}>
        <Box style={styles.contentWrapper}>
          <Box>
            <Box style={styles.postBox}>
              <AddCircleIcon style={styles.icon} />
              <Box style={styles.buttonWrapper}>
                <button style={styles.button}>
                  続きを
                  <br />
                  自分で書く
                </button>
              </Box>
            </Box>
          </Box>

          {posts.map((post) => (
            <Box key={post.id}>
              <Box style={styles.postBox}>
                <p>{post.text}</p>
              </Box>
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
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};
