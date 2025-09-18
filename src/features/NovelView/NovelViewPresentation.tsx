import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import ParentPanel from './ParentPanel';
import MainPanel from './MainPanel';
import ChildrenPanel from './ChildrenPanel';
import { Sentence, NovelProps } from '../../types/types';
import { EditPost } from '../EditPost';

interface NovelViewPresentationProps {
  mainPanel: Sentence[];
  parentPanel: Sentence[];
  childrenPanel: Sentence[];
  startIndexParent: number;
  setStartIndexParent: React.Dispatch<React.SetStateAction<number>>;
  startIndexChildren: number;
  setStartIndexChildren: React.Dispatch<React.SetStateAction<number>>;
  hasMainPanelEvaluation: boolean;
  textCount: number;
  onPost: (newSentence: string) => Promise<void>;
  onNextParallel: () => void;
  onPrevParallel: () => void;
  hasParallels: boolean;
  onParentClick: (clickedSentence: any) => void;
  onMainPanelNavigate: (direction: 'prev' | 'next') => void;
  onBackToOriginal: () => void;
  isInParallelMode: boolean;
  canGoNext: boolean;
  canGoPrev: boolean;
}

const NovelViewPresentation: React.FC<NovelViewPresentationProps> = ({
  mainPanel,
  parentPanel,
  childrenPanel,
  startIndexParent,
  setStartIndexParent,
  setStartIndexChildren,
  hasMainPanelEvaluation,
  textCount,
  onPost,
  onNextParallel,
  onPrevParallel,
  hasParallels,
  onParentClick,
  onMainPanelNavigate,
  onBackToOriginal,
  isInParallelMode,
  canGoNext,
  canGoPrev,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePostSuccess = async () => {
    // 投稿成功後の処理（画面更新など）
    await onPost(''); // 空文字列を渡して画面更新をトリガー
  };

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
        <Box sx={{ mb: 4, width: '100%', maxWidth: '600px' }}>
          {parentPanel.slice(-1).map((novel, index) => {
            const novelWithRelations: NovelProps = {
              ...novel,
              titleId: novel.titleId || novel.sentenceId,
              children: childrenPanel,
              main: mainPanel,
              parent: [],
              chips:
                novel.chips?.map((chip) => ({
                  label: chip.label || '',
                })) || [],
              tags:
                novel.tags?.map((tag) => ({
                  label: tag.label || '',
                })) || [],
            };

            return (
              <Box key={index} sx={{ mb: 2 }}>
                <ParentPanel
                  parentPanel={novelWithRelations}
                  startIndex={startIndexParent}
                  setStartIndex={setStartIndexParent}
                  visibleTextCount={1}
                  textCount={textCount}
                  onClick={() => onParentClick(novel)}
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
        onPostSuccess={handlePostSuccess}
        mainText={mainPanel[0]?.sentence || ''}
        sentenceId={mainPanel[0]?.sentenceId || 0}
        parentUpdatedAt={mainPanel[0]?.updatedAt || ''}
      />

      {/* Children Panel */}
      <Box sx={{ width: '100%', maxWidth: '600px' }}></Box>

      <ChildrenPanel
        childrenPanel={childrenPanel}
        setChildrenPanel={() => {}}
        mainPanel={mainPanel}
        setStartIndex={setStartIndexChildren}
        visibleTextCount={3}
        hasMainPanelEvaluation={hasMainPanelEvaluation}
      />
    </Box>
  );
};

export default NovelViewPresentation;
