import React, { useState } from 'react';
import { Avatar, Box } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ThumbUpButton from '../../components/buttonicon/ThumbsUpButton';
import CommentButton from '../../components/buttonicon/CommentButton';
import NextPlanButton from '../../components/buttonicon/NextPlanButton';
import KeyboardArrowForwardIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowBackIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Sentence } from '../../api/api';

interface MainPanelProps {
  mainPanel: Sentence;
  evaluationGoodCount: number;
  setEvaluationGoodCount: React.Dispatch<React.SetStateAction<number>>;
  commentCount: number;
  setCommentCount: React.Dispatch<React.SetStateAction<number>>;
  evaluationStayCount: number;
  setEvaluationStayCount: React.Dispatch<React.SetStateAction<number>>;
}

const MainPanel: React.FC<MainPanelProps> = ({
  mainPanel,
  evaluationGoodCount,
  setEvaluationGoodCount,
  commentCount,
  setCommentCount,
  evaluationStayCount,
  setEvaluationStayCount,
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
        <Box
          key={mainPanel.sentenceId}
          sx={{
            backgroundColor: '#fff',
            position: 'relative',
            textAlign: 'left',
            border: '1px solid #000',
            borderRadius: '10px',
            height: '30vh',
            width: '80vw',
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
                {mainPanel.sentenceUserId}
              </Avatar>
              <Box sx={{ marginLeft: '1vh', fontSize: '1.2rem' }}>
                {mainPanel.sentencePenName}
              </Box>
            </Box>
          </Box>
          <p style={{ margin: '1vh 1vh', fontSize: '1.6rem' }}>
            {mainPanel.sentence}
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
                evaluationGoodCount={evaluationGoodCount}
                setEvaluationGoodCount={setEvaluationGoodCount}
              />
              <CommentButton
                commentCount={commentCount}
                setCommentCount={setCommentCount}
              />
              <NextPlanButton
                evaluationStayCount={evaluationStayCount}
                setEvaluationStayCount={setEvaluationStayCount}
              />
            </Box>
          )}
        </Box>
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
