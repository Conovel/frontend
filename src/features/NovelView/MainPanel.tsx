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
  comment_count: number;
  setComment_count: React.Dispatch<React.SetStateAction<number>>;
  evaluation_stay_count: number;
  setEvaluation_stay_count: React.Dispatch<React.SetStateAction<number>>;
}

const MainPanel: React.FC<MainPanelProps> = ({
  mainPanels,
  evaluation_good_count,
  setEvaluation_good_count,
  comment_count,
  setComment_count,
  evaluation_stay_count,
  setEvaluation_stay_count,
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
            </Box>
            <p style={{ margin: '1vh 1vh', fontSize: '1.6rem' }}>
              {panel.sentence}
            </p>
            <DragIndicatorIcon
              onClick={handleIconClick}
              sx={{
                cursor: 'pointer',
                position: 'absolute',
                bottom: '10px',
                right: '10px',
              }}
            />
            {showIcons && (
              <Box
                sx={{
                  display: 'flex',
                  position: 'absolute',
                  bottom: '10px',
                  right: '25px',
                  zIndex: 4,
                }}
              >
                <ThumbUpButton
                  evaluation_good_count={evaluation_good_count}
                  setEvaluation_good_count={setEvaluation_good_count}
                />
                <CommentButton
                  comment_count={comment_count}
                  setComment_count={setComment_count}
                />
                <NextPlanButton
                  evaluation_stay_count={evaluation_stay_count}
                  setEvaluation_stay_count={setEvaluation_stay_count}
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
