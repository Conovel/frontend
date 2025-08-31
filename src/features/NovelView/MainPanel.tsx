import React, { useState } from 'react';
import { Avatar, Box, IconButton } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ThumbUpButton from '../../components/buttonicon/ThumbsUpButton';
import NextPlanButton from '../../components/buttonicon/NextPlanButton';
import { Sentence, NavigationDirection } from '../../types/types';

interface MainPanelProps {
  mainPanel: Sentence[];
  startIndex: number;
  visibleTextCount: number;
  evaluationGoodCount: number;
  setEvaluationGoodCount: React.Dispatch<React.SetStateAction<number>>;
  evaluationStayCount: number;
  setEvaluationStayCount: React.Dispatch<React.SetStateAction<number>>;
  isGoodEvaluated: boolean;
  isStayEvaluated: boolean;
  onNavigate?: (direction: NavigationDirection) => void;
  hasParallels?: boolean;
  onPrevParallel?: () => void;
  onNextParallel?: () => void;
}

const MainPanel: React.FC<MainPanelProps> = ({
  mainPanel,
  startIndex,
  visibleTextCount,
  evaluationGoodCount,
  setEvaluationGoodCount,
  evaluationStayCount,
  setEvaluationStayCount,
  isGoodEvaluated,
  isStayEvaluated,
  onNavigate,
  hasParallels,
  onPrevParallel,
  onNextParallel,
}) => {
  const [localStartIndex, setLocalStartIndex] = useState(startIndex);

  const handleNavigation = (direction: NavigationDirection) => {
    if (onNavigate) {
      onNavigate(direction);
    } else {
      // ローカルナビゲーション
      if (
        direction === 'next' &&
        localStartIndex + visibleTextCount < mainPanel.length
      ) {
        setLocalStartIndex(localStartIndex + visibleTextCount);
      } else if (direction === 'prev' && localStartIndex > 0) {
        setLocalStartIndex(Math.max(0, localStartIndex - visibleTextCount));
      }
    }
  };

  const currentStartIndex = onNavigate ? startIndex : localStartIndex;
  const showPrevButton = currentStartIndex > 0;
  const showNextButton =
    currentStartIndex + visibleTextCount < mainPanel.length;

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* 左ナビゲーションボタン - 常に表示 */}
      <IconButton
        onClick={() => {
          if (hasParallels && onPrevParallel) {
            onPrevParallel();
          } else {
            handleNavigation('prev');
          }
        }}
        disabled={!hasParallels && !showPrevButton}
        sx={{
          position: 'absolute',
          left: '-60px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          backgroundColor: '#BDBDBD',
          color: '#fff',
          width: '40px',
          height: '40px',
          '&:hover': {
            backgroundColor: '#9E9E9E',
          },
          '&:disabled': {
            backgroundColor: '#E0E0E0',
            color: '#BDBDBD',
          },
        }}
        size='small'
      >
        <KeyboardArrowLeftIcon />
      </IconButton>

      {/* メインコンテンツ */}
      <Box>
        {mainPanel
          .slice(currentStartIndex, currentStartIndex + visibleTextCount)
          .map((panel) => (
            <Box
              key={panel.sentenceId}
              sx={{
                backgroundColor: '#fff',
                position: 'relative',
                textAlign: 'left',
                border: '1px solid #000',
                borderRadius: '10px',
                height: '35vh',
                width: '80vw',
                alignItems: 'center',
                zIndex: 2,
                overflowY: 'auto',
                mb: 2,
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
            </Box>
          ))}
      </Box>

      {/* ボタン群 - メインパネルの枠外右下に固定表示 */}
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          bottom: '-20px',
          right: '20px',
          zIndex: 10,
          gap: 1,
        }}
      >
        <ThumbUpButton
          evaluation_good_count={evaluationGoodCount}
          setEvaluation_good_count={setEvaluationGoodCount}
          isEvaluated={isGoodEvaluated}
        />
        <NextPlanButton
          evaluation_stay_count={evaluationStayCount}
          setEvaluation_stay_count={setEvaluationStayCount}
          isEvaluated={isStayEvaluated}
        />
      </Box>

      {/* 右ナビゲーションボタン - 常に表示 */}
      <IconButton
        onClick={() => {
          if (hasParallels && onNextParallel) {
            onNextParallel();
          } else {
            handleNavigation('next');
          }
        }}
        disabled={!hasParallels && !showNextButton}
        sx={{
          position: 'absolute',
          right: '-60px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          backgroundColor: '#BDBDBD',
          color: '#fff',
          width: '40px',
          height: '40px',
          '&:hover': {
            backgroundColor: '#9E9E9E',
          },
          '&:disabled': {
            backgroundColor: '#E0E0E0',
            color: '#BDBDBD',
          },
        }}
        size='small'
      >
        <KeyboardArrowRightIcon />
      </IconButton>
    </Box>
  );
};

export default MainPanel;
