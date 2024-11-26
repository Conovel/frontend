import React, { useState } from 'react';
import { Avatar, Box } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ThumbUpButton from '../../components/buttonicon/ThumbsUpButton';
import CommentButton from '../../components/buttonicon/CommentButton';
import NextPlanButton from '../../components/buttonicon/NextPlanButton';
import KeyboardArrowForwardIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowBackIcon from '@mui/icons-material/KeyboardArrowLeft';

interface MainPanelProps {
  mainPanels: {
    sentence_id: number;
    sentence: string;
    userId: number;
    userName: string;
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
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <KeyboardArrowBackIcon
        sx={{ cursor: 'pointer', marginRight: '1vh' }}
        onClick={() => {
          /* Handle left arrow click */
        }}
      />
      <Box>
        {mainPanels.map((panel) => (
          <Box
            key={panel.sentence_id}
            sx={{
              backgroundColor: '#fff',
              position: 'relative',
              textAlign: 'left',
              border: '1px solid #000',
              borderRadius: '10px',
              margin: '0vh 1vh',
              height: '40vh',
              alignItems: 'center',
              fontSize: '2.0rem',
              zIndex: 2,
              overflowY: 'auto',
            }}
          >
            <Box
              sx={{ display: 'flex', alignItems: 'center', margin: '2vh 2vh' }}
            >
              <Avatar sx={{ fontSize: '2.0rem', width: 32, height: 32 }}>
                {panel.userName.charAt(0)}
              </Avatar>
              <Box sx={{ marginLeft: '1vh', fontSize: '2.0rem' }}>
                {panel.userName}
              </Box>
            </Box>
            <p style={{ margin: '2vh 2vh' }}>{panel.sentence}</p>
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
      <KeyboardArrowForwardIcon
        sx={{ cursor: 'pointer', marginLeft: '1vh' }}
        onClick={() => {
          /* Handle right arrow click */
        }}
      />
    </Box>
  );
};

export default MainPanel;
