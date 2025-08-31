import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import ParentPanel from './ParentPanel';
import MainPanel from './MainPanel';
import ChildrenPanel from './ChildrenPanel';
import { NovelProps, Sentence, CreateSentenceRequest } from '../../types/types';
import { EditPost } from '../EditPost';

interface NovelViewPresentationProps {
  mainPanel: Sentence[];
  parentPanel: Sentence[];
  childrenPanel: Sentence[];
  startIndexParent: number;
  setStartIndexParent: React.Dispatch<React.SetStateAction<number>>;
  evaluationGoodCountParent: number;
  setEvaluationGoodCountParent: React.Dispatch<React.SetStateAction<number>>;
  commentCountParent: number;
  setCommentCountParent: React.Dispatch<React.SetStateAction<number>>;
  evaluationStayCountParent: number;
  setEvaluationStayCountParent: React.Dispatch<React.SetStateAction<number>>;
  isGoodEvaluatedParent: boolean;
  isStayEvaluatedParent: boolean;
  startIndexChildren: number;
  setStartIndexChildren: React.Dispatch<React.SetStateAction<number>>;
  evaluationGoodCountChildren: number;
  setEvaluationGoodCountChildren: React.Dispatch<React.SetStateAction<number>>;
  commentCountChildren: number;
  setCommentCountChildren: React.Dispatch<React.SetStateAction<number>>;
  evaluationStayCountChildren: number;
  setEvaluationStayCountChildren: React.Dispatch<React.SetStateAction<number>>;
  isGoodEvaluatedChildren: boolean;
  isStayEvaluatedChildren: boolean;
  evaluationGoodCountMain: number;
  setEvaluationGoodCountMain: React.Dispatch<React.SetStateAction<number>>;
  evaluationStayCountMain: number;
  setEvaluationStayCountMain: React.Dispatch<React.SetStateAction<number>>;
  isGoodEvaluatedMain: boolean;
  isStayEvaluatedMain: boolean;
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
  titleId: string;
}

const NovelViewPresentation: React.FC<NovelViewPresentationProps> = ({
  mainPanel,
  parentPanel,
  childrenPanel,
  startIndexParent,
  setStartIndexParent,
  evaluationGoodCountParent,
  setEvaluationGoodCountParent,
  commentCountParent,
  setCommentCountParent,
  evaluationStayCountParent,
  setEvaluationStayCountParent,
  isGoodEvaluatedParent,
  isStayEvaluatedParent,
  setStartIndexChildren,
  evaluationGoodCountChildren,
  setEvaluationGoodCountChildren,
  commentCountChildren,
  setCommentCountChildren,
  evaluationStayCountChildren,
  setEvaluationStayCountChildren,
  isGoodEvaluatedChildren,
  isStayEvaluatedChildren,
  evaluationGoodCountMain,
  setEvaluationGoodCountMain,
  evaluationStayCountMain,
  setEvaluationStayCountMain,
  isGoodEvaluatedMain,
  isStayEvaluatedMain,
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
  titleId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePost = async (sentenceRequest: CreateSentenceRequest) => {
    if (sentenceRequest.text.trim()) {
      await onPost(sentenceRequest.text);
      setIsModalOpen(false);
    }
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
              titleId: Number(novel.titleId) || novel.sentenceId,
              children: childrenPanel,
              main: mainPanel,
              parent: [],
              chips: novel.chips.map((chip) => ({
                label: chip.label || '',
              })),
              tags: novel.tags.map((tag) => ({
                label: tag.label || '',
              })),
            };

            return (
              <Box key={index} sx={{ mb: 2 }}>
                <ParentPanel
                  parentPanel={novelWithRelations}
                  startIndex={startIndexParent}
                  setStartIndex={setStartIndexParent}
                  visibleTextCount={1}
                  textCount={textCount}
                  evaluationGoodCount={evaluationGoodCountParent}
                  setEvaluationGoodCount={setEvaluationGoodCountParent}
                  commentCount={commentCountParent}
                  setCommentCount={setCommentCountParent}
                  evaluationStayCount={evaluationStayCountParent}
                  setEvaluationStayCount={setEvaluationStayCountParent}
                  isGoodEvaluated={isGoodEvaluatedParent}
                  isStayEvaluated={isStayEvaluatedParent}
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
          evaluationGoodCount={evaluationGoodCountMain}
          setEvaluationGoodCount={setEvaluationGoodCountMain}
          evaluationStayCount={evaluationStayCountMain}
          setEvaluationStayCount={setEvaluationStayCountMain}
          isGoodEvaluated={isGoodEvaluatedMain}
          isStayEvaluated={isStayEvaluatedMain}
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
        onSubmit={handlePost}
        mainText={mainPanel[0]?.sentence || ''}
        sentenceId={mainPanel[0]?.sentenceId || 0}
      />

      {/* Children Panel */}
      <Box sx={{ width: '100%', maxWidth: '600px' }}></Box>
      <ChildrenPanel
        childrenPanel={childrenPanel}
        setChildrenPanel={() => {}}
        mainPanel={mainPanel}
        setStartIndex={setStartIndexChildren}
        visibleTextCount={3}
        evaluationGoodCount={evaluationGoodCountChildren}
        setEvaluationGoodCount={setEvaluationGoodCountChildren}
        commentCount={commentCountChildren}
        setCommentCount={setCommentCountChildren}
        evaluationStayCount={evaluationStayCountChildren}
        setEvaluationStayCount={setEvaluationStayCountChildren}
        isGoodEvaluated={isGoodEvaluatedChildren}
        isStayEvaluated={isStayEvaluatedChildren}
        hasMainPanelEvaluation={hasMainPanelEvaluation}
        novel={{
          titleId: Number(titleId) || 1,
          children: childrenPanel,
          main: mainPanel,
          parent: [],
          chips: [],
          tags: [],
          title: '',
          mainCopy: '',
          overview: '',
          popular: false,
          newArrival: false,
          authorUserName: '',
          readerCount: 0,
          avatar: {
            src: '',
            alt: '',
            color: '',
            text: '',
          },
          sentenceId: 0,
          sentenceUserCount: 0,
          sentenceHierarchyCount: 0,
          sentence: '',
          textIndex: 0,
          userId: 0,
          userName: '',
          profileIconImage: '',
          evaluationGoodCount: 0,
          evaluationStayCount: 0,
          createdAt: '',
          updatedAt: '',
        }}
        textIndex={0}
        titleId={titleId || ''}
      />
    </Box>
  );
};

export default NovelViewPresentation;
