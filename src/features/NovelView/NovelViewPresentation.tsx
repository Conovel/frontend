import React from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import ChatIcon from '@mui/icons-material/Chat';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { styles } from './styles';

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

export const NovelViewPresentation: React.FC<NovelViewPresentationProps> = ({
  posts,
  mainPanels,
}) => {
  return (
    <div style={styles.frame}>
      <div style={styles.contentWrapper}>
        {posts.map((post) => (
          <div key={post.id}>
            <div style={styles.postBox}>
              <p>{post.text}</p>
            </div>
            <div style={styles.iconWrapper}>
              <div style={styles.reactionWrapper}>
                <FaThumbsUp style={styles.icon} />
                <span>{post.likes}</span>
              </div>
              <div style={styles.reactionWrapper}>
                <ChatIcon style={styles.icon} />
                <span>{post.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={styles.verticalLine}></div>
      <div>
        {mainPanels.map((panel) => (
          <div key={panel.id} style={styles.mainPanel}>
            <p>{panel.text1}</p>
            <p>{panel.text2}</p>
            <DragIndicatorIcon style={styles.dragIndicatorIcon} />
          </div>
        ))}
      </div>

      <div style={styles.nextPanel}>
        <div style={styles.contentWrapper}>
          <div>
            <div style={styles.postBox}>
              <AddCircleIcon style={styles.icon} />
              <div style={styles.buttonWrapper}>
                <button style={styles.button}>
                  続きを
                  <br />
                  自分で書く
                </button>
              </div>
            </div>
          </div>

          {posts.map((post) => (
            <div key={post.id}>
              <div style={styles.postBox}>
                <p>{post.text}</p>
              </div>
              <div style={styles.iconWrapper}>
                <div style={styles.reactionWrapper}>
                  <FaThumbsUp style={styles.icon} />
                  <span>{post.likes}</span>
                </div>
                <div style={styles.reactionWrapper}>
                  <ChatIcon style={styles.icon} />
                  <span>{post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
