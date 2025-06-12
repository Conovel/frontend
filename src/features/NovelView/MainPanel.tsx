import React, { useState } from 'react';
import { Avatar, Box, IconButton } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ThumbUpButton from '../../components/buttonicon/ThumbsUpButton';
import CommentButton from '../../components/buttonicon/CommentButton';
import NextPlanButton from '../../components/buttonicon/NextPlanButton';
import { Sentence } from '../../types/types';

interface MainPanelProps {
  mainPanel: Sentence[];
  startIndex: number;
  visibleTextCount: number;
  evaluation_good_count: number;
  setEvaluation_good_count: React.Dispatch<React.SetStateAction<number>>;
  comment_count: number;
  setComment_count: React.Dispatch<React.SetStateAction<number>>;
  evaluation_stay_count: number;
  setEvaluation_stay_count: React.Dispatch<React.SetStateAction<number>>;
  onNavigate?: (direction: 'prev' | 'next') => void;
  hasParallels?: boolean;
  onPrevParallel?: () => void;
  onNextParallel?: () => void;
}

const MainPanel: React.FC<MainPanelProps> = ({
  mainPanel,
  startIndex,
  visibleTextCount,
  evaluation_good_count,
  setEvaluation_good_count,
  comment_count,
  setComment_count,
  evaluation_stay_count,
  setEvaluation_stay_count,
  onNavigate,
  hasParallels,
  onPrevParallel,
  onNextParallel,
}) => {
  const [] = useState(false);
  const [localStartIndex, setLocalStartIndex] = useState(startIndex);


  const handleNavigation = (direction: 'prev' | 'next') => {
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
      {/* 左ナビゲーションボタン - パラレル投稿がある場合はその切り替え、ない場合は通常のナビゲーション */}
      {(hasParallels || showPrevButton) && (
        <IconButton
          onClick={() => {
            if (hasParallels && onPrevParallel) {
              onPrevParallel();
            } else {
              handleNavigation('prev');
            }
          }}
          sx={{
            position: 'absolute',
            left: '-50px',
            zIndex: 10,
            backgroundColor: '#BDBDBD',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#9E9E9E',
            },
          }}
          size='small'
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
      )}

      {/* メインコンテンツ */}
      <Box>
        {mainPanel
          .slice(currentStartIndex, currentStartIndex + visibleTextCount)
          .map((panel) => (
            <Box
              key={panel.sentence_id}
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
          bottom: '20px',
          right: '20px',
          zIndex: 10,
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

      {/* 右ナビゲーションボタン - パラレル投稿がある場合はその切り替え、ない場合は通常のナビゲーション */}
      {(hasParallels || showNextButton) && (
        <IconButton
          onClick={() => {
            if (hasParallels && onNextParallel) {
              onNextParallel();
            } else {
              handleNavigation('next');
            }
          }}
          sx={{
            position: 'absolute',
            right: '-50px',
            zIndex: 10,
            backgroundColor: '#BDBDBD',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#9E9E9E',
            },
          }}
          size='small'
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default MainPanel;
