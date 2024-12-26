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
  evaluation_good_count: number;
  setEvaluation_good_count: React.Dispatch<React.SetStateAction<number>>;
  commentCount: number;
  setCommentCount: React.Dispatch<React.SetStateAction<number>>;
  nextPlanCount: number;
  setNextPlanCount: React.Dispatch<React.SetStateAction<number>>;
}

const MainPanel: React.FC<MainPanelProps> = ({
  mainPanels,
  evaluation_good_count,
  setEvaluation_good_count,
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
    <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
      <KeyboardArrowBackIcon
        sx={{
          cursor: 'pointer',
          position: 'absolute',
          left: '1vw',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 3,
        }}
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
              height: '30vh',
              alignItems: 'center',
              zIndex: 2,
              overflowY: 'auto',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                margin: '2vh 2vh',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ fontSize: '1.2rem', width: 32, height: 32 }}>
                  {panel.userName.charAt(0)}
                </Avatar>
                <Box sx={{ marginLeft: '1vh', fontSize: '1.2rem' }}>
                  {panel.userName}
                </Box>
              </Box>
              <DragIndicatorIcon
                onClick={handleIconClick}
                sx={{
                  cursor: 'pointer',
                  marginLeft: '1vh',
                }}
              />
            </Box>
            <p style={{ margin: '1vh 1vh', fontSize: '1.6rem' }}>
              {panel.sentence}
            </p>
            {showIcons && (
              <Box
                sx={{
                  display: 'flex',
                  position: 'absolute',
                  top: '0',
                  right: '10px',
                  zIndex: 4,
                }}
              >
                <ThumbUpButton
                  evaluationGoodCount={evaluation_good_count}
                  setEvaluationGoodCount={setEvaluation_good_count}
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
        sx={{
          cursor: 'pointer',
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 3,
        }}
        onClick={() => {
          /* Handle right arrow click */
        }}
      />
    </Box>
  );
};

export default MainPanel;
