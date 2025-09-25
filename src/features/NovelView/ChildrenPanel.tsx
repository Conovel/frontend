import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Snackbar, Alert } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import NovelCard from '../../components/novelCard/NovelCard';
import { Sentence } from '../../types/types';
import { EditPost } from '../EditPost';

const carouselNavButtonStyle = {
  backgroundColor: '#BDBDBD',
  opacity: 0.7,
  width: '40px',
  height: '40px',
  color: '#fff',
  borderRadius: '50%',
  '&:hover': {
    opacity: 1,
    backgroundColor: '#9E9E9E',
  },
};

const mainBoxStyle = {
  backgroundColor: '#fff',
  justifyContent: 'space-between',
  margin: '2vh auto',
  height: '25vh',
  width: '70vw',
  alignItems: 'center',
  zIndex: 2,
};

const innerBoxStyle = {
  justifyContent: 'center',
  overflow: 'hidden',
  position: 'relative',
  height: '100%',
};

const novelCardBoxStyle = {
  justifyContent: 'center',
  margin: '0 1vw',
  width: 'calc(100% - 2vw)',
};

interface ChildrenPanelProps {
  childrenPanel: Sentence[];
  setChildrenPanel: React.Dispatch<React.SetStateAction<Sentence[]>>;
  mainPanel: Sentence[];
  setStartIndex: React.Dispatch<React.SetStateAction<number>>;
  visibleTextCount: number;
  hasMainPanelEvaluation: boolean;
}

const ChildrenPanel: React.FC<ChildrenPanelProps> = ({
  childrenPanel,
  mainPanel,
  hasMainPanelEvaluation,
}) => {
  const [isEditPostOpen, setIsEditPostOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setActiveIndex(0);
  }, [childrenPanel.length]);

  // 評価状態に応じてカードの展開状態を制御する
  useEffect(() => {
    if (hasMainPanelEvaluation) {
      // 評価が行われた場合はすべてのカードを展開
      const allCardIds = childrenPanel.map((panel) => panel.sentenceId);
      setExpandedCards(new Set(allCardIds));
    } else {
      // 評価が行われていない場合はすべてのカードを折りたたみ
      setExpandedCards(new Set());
    }
  }, [hasMainPanelEvaluation, childrenPanel]);

  const handleCarouselChange = (now?: number) => {
    if (now !== undefined) {
      setActiveIndex(now);
    }
  };

  const handleClick = (sentenceId: number) => {
    // MainPanelで評価が行われていない場合はエラーメッセージを表示
    if (!hasMainPanelEvaluation) {
      setError(
        'メインパネルで評価を行ってから、続きの投稿をクリックしてください',
      );
      return;
    }

    // 親コンポーネントでナビゲーション処理を行う
    console.log('Navigate to sentence:', sentenceId);
  };

  const handleCloseError = () => {
    setError(null);
  };

  const renderNovelCard = (panel: Sentence) => {
    const isExpanded = expandedCards.has(panel.sentenceId);
    const previewText =
      panel.sentence.length > 50
        ? panel.sentence.substring(0, 50) + '...'
        : panel.sentence;

    const handleCardClick = (sentenceId: number | undefined) => {
      if (sentenceId) {
        handleClick(sentenceId);
      }
    };

    return (
      <Box key={panel.sentenceId} sx={novelCardBoxStyle}>
        <NovelCard
          sentence={isExpanded ? panel.sentence : previewText}
          userName={panel.userName || panel.sentenceUserName || ''}
          sentenceId={panel.sentenceId}
          onClick={() => handleCardClick(panel.sentenceId)}
          evaluationGoodCount={panel.evaluationGoodCount || 0}
          evaluationStayCount={panel.evaluationStayCount || 0}
          isGoodEvaluated={false} // TODO: ユーザーの評価状態を取得
          isStayEvaluated={false} // TODO: ユーザーの評価状態を取得
          disabled={!hasMainPanelEvaluation}
        />
      </Box>
    );
  };

  const handlePostSuccess = async () => {
    // 投稿成功後の処理（画面更新など）
    // 必要に応じてchildrenPanelを再取得する処理を追加
    setIsEditPostOpen(false);
  };

  // カルーセルを表示する条件を追加
  const showCarousel = childrenPanel && childrenPanel.length > 0;
  const showNavigation = childrenPanel.length > 1;

  return (
    <Box sx={mainBoxStyle}>
      <Box sx={innerBoxStyle}>
        {/* 評価が行われていない場合のモザイクオーバーレイ */}
        {!hasMainPanelEvaluation && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: `
                linear-gradient(
                  to bottom,
                  transparent 0%,
                  rgba(255, 255, 255, 0.3) 10%,
                  rgba(255, 255, 255, 0.6) 30%,
                  rgba(255, 255, 255, 0.9) 50%,
                  rgba(255, 255, 255, 1) 70%,
                  rgba(255, 255, 255, 1) 100%
                )
              `,
              backdropFilter: 'blur(8px)',
              zIndex: 5,
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingBottom: '15px',
              '&::before': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '100%',
                background: `
                  repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 2px,
                    rgba(0, 0, 0, 0.1) 2px,
                    rgba(0, 0, 0, 0.1) 4px
                  )
                `,
                zIndex: -1,
              },
            }}
          ></Box>
        )}
        {showCarousel ? (
          <Carousel
            autoPlay={false}
            index={activeIndex}
            onChange={handleCarouselChange}
            fullHeightHover={false}
            navButtonsProps={{
              style: carouselNavButtonStyle,
            }}
            navButtonsWrapperProps={{
              style: {
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
              },
            }}
            NextIcon={<KeyboardArrowRightIcon />}
            PrevIcon={<KeyboardArrowLeftIcon />}
            navButtonsAlwaysVisible={showNavigation}
            navButtonsAlwaysInvisible={!showNavigation}
            indicators={showNavigation}
            indicatorIconButtonProps={{
              style: {
                padding: '5px',
                color: '#BDBDBD',
                margin: '0 2px',
              },
            }}
            activeIndicatorIconButtonProps={{
              style: {
                color: '#1976d2',
              },
            }}
            indicatorContainerProps={{
              style: {
                position: 'absolute',
                bottom: '10px',
                zIndex: 15,
                textAlign: 'center',
                width: '100%',
              },
            }}
          >
            {childrenPanel.map(renderNovelCard)}
          </Carousel>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'text.secondary',
              fontSize: '0.875rem',
            }}
          >
            まだ続きの投稿がありません
          </Box>
        )}
      </Box>

      <EditPost
        open={isEditPostOpen}
        onClose={() => setIsEditPostOpen(false)}
        onPostSuccess={handlePostSuccess}
        mainText={mainPanel[mainPanel.length - 1]?.sentence || ''}
        sentenceId={mainPanel[mainPanel.length - 1]?.sentenceId || 0}
        parentUpdatedAt={mainPanel[mainPanel.length - 1]?.updatedAt || ''}
      />

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseError}
          severity='error'
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChildrenPanel;
