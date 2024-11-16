import React, { useState } from 'react';
import { Box } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ThumbUpButton from '../buttonicon/ThumbsUpButton';
import CommentButton from '../buttonicon/CommentButton';
import NextPlanButton from '../buttonicon/NextPlanButton';

interface MainPanelProps {
  mainPanels: {
    id: number;
    text1: string;
    text2: string;
  }[];
  thumbUpCount: number;
  setThumbUpCount: React.Dispatch<React.SetStateAction<number>>;
  thumbDownCount: number;
  setThumbDownCount: React.Dispatch<React.SetStateAction<number>>;
  commentCount: number;
  setCommentCount: React.Dispatch<React.SetStateAction<number>>;
  nextPlanCount: number;
  setNextPlanCount: React.Dispatch<React.SetStateAction<number>>;
}

const MainPanel: React.FC<MainPanelProps> = ({
  mainPanels,
  thumbUpCount,
  setThumbUpCount,
  commentCount,
  setCommentCount,
  nextPlanCount,
  setNextPlanCount,
}) => {
  const [showIcons, setShowIcons] = useState(false);

  const handleIconClick = () => {
    setShowIcons((prev) => !prev);
  };

  return (
    <Box>
      {mainPanels.map((panel) => (
        <Box
          key={panel.id}
          sx={{
            backgroundColor: '#fff',
            position: 'relative',
            textAlign: 'left',
            border: '1px solid #000',
            borderRadius: '10px',
            margin: '5vh 5vh',
            height: '40vh',
            alignItems: 'center',
            fontSize: '2.0rem',
            zIndex: 2,
          }}
        >
          <p>{panel.text1}</p>
          <p>{panel.text2}</p>
          <DragIndicatorIcon
            onClick={handleIconClick}
            sx={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              cursor: 'pointer',
            }}
          />
          {showIcons && (
            <Box
              sx={{
                display: 'flex',
                position: 'absolute',
                bottom: '40px',
                right: '10px',
              }}
            >
              <ThumbUpButton
                thumbUpCount={thumbUpCount}
                setThumbUpCount={setThumbUpCount}
              />
              <CommentButton
                commentCount={commentCount}
                setCommentCount={setCommentCount}
              />
              <NextPlanButton
                nextPlanCount={nextPlanCount}
                setNextPlanCount={setNextPlanCount}
              />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default MainPanel;
