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
  onBackToOriginal?: () => void;
  isInParallelMode?: boolean;
  canGoNext?: boolean;
  canGoPrev?: boolean;
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
  onBackToOriginal,
  isInParallelMode = false,
  canGoNext = false,
  canGoPrev = false,
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
  const showPrevButton = hasParallels ? true : currentStartIndex > 0;
  const showNextButton = hasParallels
    ? true
    : currentStartIndex + visibleTextCount < mainPanel.length;

  // デバッグ用のログ出力
  console.log('MainPanel Debug:', {
    hasParallels,
    showPrevButton,
    showNextButton,
    canGoPrev,
    canGoNext,
    mainPanelLength: mainPanel.length,
    currentStartIndex,
    visibleTextCount,
  });

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      {/* 左ナビゲーションボタン - 常に表示 */}
      <IconButton
        onClick={() => {
          console.log(
            'Left button clicked, hasParallels:',
            hasParallels,
            'isInParallelMode:',
            isInParallelMode,
            'canGoPrev:',
            canGoPrev,
          );
          if (hasParallels && onPrevParallel) {
            onPrevParallel();
          } else if (isInParallelMode && onBackToOriginal) {
            onBackToOriginal();
          } else {
            handleNavigation('prev');
          }
        }}
        disabled={hasParallels ? !canGoPrev : !showPrevButton}
        sx={{
          position: 'absolute',
          left: {
            xs: '10px', // スマホ
            sm: '15px', // タブレット
            md: '20px', // デスクトップ
          },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          backgroundColor:
            hasParallels || isInParallelMode ? '#1976d2' : '#BDBDBD',
          color: '#fff',
          width: {
            xs: '32px', // スマホ
            sm: '36px', // タブレット
            md: '40px', // デスクトップ
          },
          height: {
            xs: '32px', // スマホ
            sm: '36px', // タブレット
            md: '40px', // デスクトップ
          },
          border: '2px solid #fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          '&:hover': {
            backgroundColor:
              hasParallels || isInParallelMode ? '#1565c0' : '#9E9E9E',
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
      <Box
        sx={{
          width: {
            xs: '85vw', // スマホ
            sm: '80vw', // タブレット
            md: '75vw', // デスクトップ
          },
          maxWidth: '700px',
          position: 'relative',
        }}
      >
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
                height: {
                  xs: '30vh', // スマホ
                  sm: '32vh', // タブレット
                  md: '35vh', // デスクトップ
                },
                width: '100%',
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
                  <Avatar
                    sx={{
                      fontSize: {
                        xs: '1rem', // スマホ
                        sm: '1.1rem', // タブレット
                        md: '1.2rem', // デスクトップ
                      },
                      width: {
                        xs: 28, // スマホ
                        sm: 30, // タブレット
                        md: 32, // デスクトップ
                      },
                      height: {
                        xs: 28, // スマホ
                        sm: 30, // タブレット
                        md: 32, // デスクトップ
                      },
                    }}
                  >
                    {panel.userName.charAt(0)}
                  </Avatar>
                  <Box
                    sx={{
                      marginLeft: '1vh',
                      fontSize: {
                        xs: '1rem', // スマホ
                        sm: '1.1rem', // タブレット
                        md: '1.2rem', // デスクトップ
                      },
                    }}
                  >
                    {panel.userName}
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  margin: '1vh 1vh',
                  fontSize: {
                    xs: '1.2rem', // スマホ
                    sm: '1.4rem', // タブレット
                    md: '1.6rem', // デスクトップ
                  },
                }}
              >
                {panel.sentence}
              </Box>
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
          console.log(
            'Right button clicked, hasParallels:',
            hasParallels,
            'isInParallelMode:',
            isInParallelMode,
            'canGoNext:',
            canGoNext,
          );
          if (hasParallels && onNextParallel) {
            onNextParallel();
          } else if (isInParallelMode && onBackToOriginal) {
            onBackToOriginal();
          } else {
            handleNavigation('next');
          }
        }}
        disabled={hasParallels ? !canGoNext : !showNextButton}
        sx={{
          position: 'absolute',
          right: {
            xs: '10px', // スマホ
            sm: '15px', // タブレット
            md: '20px', // デスクトップ
          },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          backgroundColor:
            hasParallels || isInParallelMode ? '#1976d2' : '#BDBDBD',
          color: '#fff',
          width: {
            xs: '32px', // スマホ
            sm: '36px', // タブレット
            md: '40px', // デスクトップ
          },
          height: {
            xs: '32px', // スマホ
            sm: '36px', // タブレット
            md: '40px', // デスクトップ
          },
          border: '2px solid #fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          '&:hover': {
            backgroundColor:
              hasParallels || isInParallelMode ? '#1565c0' : '#9E9E9E',
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
