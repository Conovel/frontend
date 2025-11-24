import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import ParentPanel from './ParentPanel';
import MainPanel from './MainPanel';
import ChildrenPanel from './ChildrenPanel';
import type { Sentence } from '../../api/api';
import { EditPost } from '../EditPost';

interface NovelViewPresentationProps {
  mainPanel: Sentence[];
  parentPanel: Sentence[];
  childrenPanel: Sentence[];
  startIndexParent: number;
  hasMainPanelEvaluation: boolean;
  textCount: number;
  onNextParallel: () => void;
  onPrevParallel: () => void;
  hasParallels: boolean;
  onParentClick: (clickedSentence: Sentence) => void;
  onMainPanelNavigate: (direction: 'prev' | 'next') => void;
  onBackToOriginal: () => void;
  isInParallelMode: boolean;
  canGoNext: boolean;
  canGoPrev: boolean;
  onEvaluationSuccess: () => void;
  onPostSuccess: () => void;
  getSentenceEvaluation: (sentenceId: number) => Promise<{
    goodCount: number;
    stayCount: number;
    isGoodEvaluated: boolean;
    isStayEvaluated: boolean;
  }>;
  onChildrenClick: (clickedSentence: Sentence) => void;
}

const NovelViewPresentation: React.FC<NovelViewPresentationProps> = ({
  mainPanel,
  parentPanel,
  childrenPanel,
  startIndexParent,
  hasMainPanelEvaluation,
  textCount,
  onNextParallel,
  onPrevParallel,
  hasParallels,
  onParentClick,
  onMainPanelNavigate,
  onBackToOriginal,
  isInParallelMode,
  canGoNext,
  canGoPrev,
  onEvaluationSuccess,
  onPostSuccess,
  getSentenceEvaluation,
  onChildrenClick,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        position: 'relative',
        pt: 0,
        pb: 16,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '2px',
          backgroundColor: '#e0e0e0',
          zIndex: 0,
        }}
      />

      {/* Parent Panel */}
      {parentPanel.length > 0 && (
        <Box
          sx={{
            mb: 4,
            width: { xs: '90vw', sm: '82vw', md: '75vw' },
            maxWidth: '720px',
            margin: '0 auto',
          }}
        >
          {parentPanel.slice(-1).map((novel, index) => {
            return (
              <Box key={index} sx={{ mb: 2 }}>
                <ParentPanel
                  parentPanel={novel}
                  startIndex={startIndexParent}
                  textCount={textCount}
                  onClick={() => onParentClick(novel)}
                  getSentenceEvaluation={getSentenceEvaluation}
                />
              </Box>
            );
          })}
        </Box>
      )}

      {/* Main Panel */}
      <Box
        sx={{
          mb: 4,
          width: '100%',
          maxWidth: {
            xs: '95vw', // スマホ
            sm: '90vw', // タブレット
            md: '800px', // デスクトップ
          },
          position: 'relative',
          margin: '0 auto',
        }}
      >
        <MainPanel
          mainPanel={mainPanel}
          startIndex={0}
          visibleTextCount={1}
          onNavigate={hasParallels ? (onMainPanelNavigate as any) : undefined}
          hasParallels={hasParallels}
          onPrevParallel={onPrevParallel}
          onNextParallel={onNextParallel}
          onBackToOriginal={onBackToOriginal}
          isInParallelMode={isInParallelMode}
          canGoNext={canGoNext}
          canGoPrev={canGoPrev}
          onEvaluationSuccess={onEvaluationSuccess}
          getSentenceEvaluation={getSentenceEvaluation}
        />
      </Box>

      {/* 統合された投稿ボタン */}
      <Button
        variant='contained'
        color='primary'
        onClick={() => setIsModalOpen(true)}
        sx={{ mb: 2, zIndex: 2, position: 'relative' }}
      >
        投稿を作成
      </Button>

      <EditPost
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostSuccess={onPostSuccess}
        mainText={mainPanel[0]?.sentence || ''}
        sentenceId={mainPanel[0]?.sentenceId || 0}
        parentUpdatedAt={mainPanel[0]?.updatedAt || ''}
      />

      {/* Children Panel */}
      <Box sx={{ width: '100%', maxWidth: '600px' }}></Box>

      <ChildrenPanel
        childrenPanel={childrenPanel}
        mainPanel={mainPanel}
        hasMainPanelEvaluation={hasMainPanelEvaluation}
        getSentenceEvaluation={getSentenceEvaluation}
        onChildrenClick={onChildrenClick}
      />
    </Box>
  );
};

export default NovelViewPresentation;
