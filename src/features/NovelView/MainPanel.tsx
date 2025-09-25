import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import NovelCard from '../../components/novelCard/NovelCard';
import { Sentence, NavigationDirection } from '../../types/types';

interface MainPanelProps {
  mainPanel: Sentence[];
  startIndex: number;
  visibleTextCount: number;
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
            <NovelCard
              key={panel.sentenceId}
              sentence={panel.sentence}
              userName={panel.userName || panel.sentenceUserName || ''}
              sentenceId={panel.sentenceId}
              evaluationGoodCount={panel.evaluationGoodCount || 0}
              evaluationStayCount={panel.evaluationStayCount || 0}
              isGoodEvaluated={false} // TODO: ユーザーの評価状態を取得
              isStayEvaluated={false} // TODO: ユーザーの評価状態を取得
            />
          ))}
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
