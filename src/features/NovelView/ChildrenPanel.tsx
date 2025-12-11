import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Snackbar, Alert } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SentenceCard from '../../components/novelCard/SentenceCard';
import type { Sentence } from '../../api/api';
import { EditPost } from '../EditPost';
import MosaicOverlay from '../../components/mosaicOverlay/MosaicOverlay';

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
  minHeight: '25vh',
  width: { xs: '90vw', sm: '82vw', md: '75vw' },
  maxWidth: '720px',
  alignItems: 'center',
  zIndex: 2,
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  paddingTop: { xs: '8px', sm: '12px' },
  paddingBottom: { xs: '8px', sm: '12px' },
};

const innerBoxStyle = {
  justifyContent: 'center',
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
  minHeight: '22vh',
};

const novelCardBoxStyle = {
  justifyContent: 'center',
  margin: '0 1vw',
  width: '100%',
  position: 'relative' as const,
};

interface ChildrenPanelProps {
  childrenPanel: Sentence[];
  mainPanel: Sentence[];
  canAccessChildren: boolean;
  getSentenceEvaluation: (sentenceId: number) => Promise<{
    goodCount: number;
    stayCount: number;
    isGoodEvaluated: boolean;
    isStayEvaluated: boolean;
  }>;
  onChildrenClick: (clickedSentence: Sentence) => void;
}

const ChildrenPanel: React.FC<ChildrenPanelProps> = ({
  childrenPanel,
  mainPanel,
  canAccessChildren,
  getSentenceEvaluation,
  onChildrenClick,
}) => {
  const [isEditPostOpen, setIsEditPostOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setActiveIndex(0);
  }, [childrenPanel.length]);

  const handleCarouselChange = (now?: number) => {
    if (now !== undefined) {
      setActiveIndex(now);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  const handleCardClick = (panel: Sentence) => {
    if (!canAccessChildren) {
      setError(
        '先に親投稿を評価してください。評価後に続きの投稿を閲覧できます。',
      );
      return;
    }
    onChildrenClick(panel);
  };

  const renderNovelCard = (panel: Sentence) => {
    const isUnlocked = canAccessChildren;

    // ロック時は本文の60%だけ表示する
    const displaySentence = isUnlocked
      ? panel
      : {
          ...panel,
          sentence: (() => {
            const full = panel.sentence || '';
            if (!full) return '';
            const visibleLength = Math.max(1, Math.ceil(full.length * 0.6));
            return `${full.slice(0, visibleLength)}...`;
          })(),
        };

    return (
      <Box key={panel.sentenceId} sx={novelCardBoxStyle}>
        <SentenceCard
          sentence={displaySentence}
          canEvaluate={false}
          isInteractionDisabled={!isUnlocked}
          getSentenceEvaluation={getSentenceEvaluation}
          onClick={() => handleCardClick(panel)}
        />
        <MosaicOverlay isVisible={!isUnlocked} />
      </Box>
    );
  };

  const handlePostSuccess = async () => {
    // 投稿成功後にモーダルを閉じる
    setIsEditPostOpen(false);
  };

  // カルーセルを表示する条件を追加
  const showCarousel = childrenPanel && childrenPanel.length > 0;
  const showNavigation = childrenPanel.length > 1;

  if (!showCarousel) return null;

  return (
    <Box sx={mainBoxStyle}>
      <Box sx={innerBoxStyle}>
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
