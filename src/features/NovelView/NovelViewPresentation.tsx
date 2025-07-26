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
  startIndexChildren: number;
  setStartIndexChildren: React.Dispatch<React.SetStateAction<number>>;
  evaluationGoodCountChildren: number;
  setEvaluationGoodCountChildren: React.Dispatch<React.SetStateAction<number>>;
  commentCountChildren: number;
  setCommentCountChildren: React.Dispatch<React.SetStateAction<number>>;
  evaluationStayCountChildren: number;
  setEvaluationStayCountChildren: React.Dispatch<React.SetStateAction<number>>;
  evaluationGoodCountMain: number;
  setEvaluationGoodCountMain: React.Dispatch<React.SetStateAction<number>>;
  commentCountMain: number;
  setCommentCountMain: React.Dispatch<React.SetStateAction<number>>;
  evaluationStayCountMain: number;
  setEvaluationStayCountMain: React.Dispatch<React.SetStateAction<number>>;
  textCount: number;
  onPost: (newSentence: string) => Promise<void>;
  onNextParallel: () => void;
  onPrevParallel: () => void;
  hasParallels: boolean;
  currentParallelIndex: number;
  totalParallels: number;
  onParentClick: (clickedSentence: any) => void;
  onMainPanelNavigate: (direction: 'prev' | 'next') => void;
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
  setStartIndexChildren,
  evaluationGoodCountChildren,
  setEvaluationGoodCountChildren,
  commentCountChildren,
  setCommentCountChildren,
  evaluationStayCountChildren,
  setEvaluationStayCountChildren,
  evaluationGoodCountMain,
  setEvaluationGoodCountMain,
  commentCountMain,
  setCommentCountMain,
  evaluationStayCountMain,
  setEvaluationStayCountMain,
  textCount,
  onPost,
  onNextParallel,
  onPrevParallel,
  hasParallels,
  currentParallelIndex,
  totalParallels,
  onParentClick,
  onMainPanelNavigate,
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

      {/* 履歴表示エリア */}
      {parentPanel.length > 1 && (
        <Box sx={{ mb: 4, width: '100%', maxWidth: '600px' }}>
          <Box
            sx={{
              mb: 2,
              textAlign: 'center',
              color: 'text.secondary',
              fontSize: '0.875rem',
            }}
          >
            過去の投稿
          </Box>
          {parentPanel.slice(0, -1).map((novel, index) => {
            const novelWithRelations: NovelProps = {
              ...novel,
              titleId: novel.titleId,
              children: [],
              main: [],
              parent: [],
              chips: novel.chips.map((chip) => ({
                label: chip.label || '',
              })),
              tags: novel.tags.map((tag) => ({
                label: tag.label || '',
              })),
            };

            return (
              <Box key={index} sx={{ mb: 2, opacity: 0.7 }}>
                <ParentPanel
                  parentPanel={novelWithRelations}
                  startIndex={0}
                  setStartIndex={() => {}}
                  visibleTextCount={1}
                  textCount={1}
                  evaluationGoodCount={novel.evaluationGoodCount}
                  setEvaluationGoodCount={() => {}}
                  commentCount={0}
                  setCommentCount={() => {}}
                  evaluationStayCount={novel.evaluationStayCount}
                  setEvaluationStayCount={() => {}}
                  onClick={() => onParentClick(novel)}
                />
              </Box>
            );
          })}
        </Box>
      )}

      {parentPanel.slice(-1).map((novel, index) => {
        const novelWithRelations: NovelProps = {
          ...novel,
          titleId: Number(novel.titleId) || novel.sentenceId,
          children: childrenPanel,
          main: mainPanel,
          parent: parentPanel,
          chips: novel.chips.map((chip) => ({
            label: chip.label || '',
          })),
          tags: novel.tags.map((tag) => ({
            label: tag.label || '',
          })),
        };

        return (
          <React.Fragment key={index}>
            <Box sx={{ mb: 6 }}>
              <ParentPanel
                parentPanel={novelWithRelations}
                startIndex={startIndexParent}
                setStartIndex={setStartIndexParent}
                visibleTextCount={3}
                textCount={textCount}
                evaluationGoodCount={evaluationGoodCountParent}
                setEvaluationGoodCount={setEvaluationGoodCountParent}
                commentCount={commentCountParent}
                setCommentCount={setCommentCountParent}
                evaluationStayCount={evaluationStayCountParent}
                setEvaluationStayCount={setEvaluationStayCountParent}
                onClick={() => onParentClick(novel)}
              />
            </Box>

            {/* MainPanel */}
            <Box sx={{ mb: 0.5 }}>
              <MainPanel
                mainPanel={mainPanel}
                startIndex={0}
                visibleTextCount={3}
                evaluationGoodCount={evaluationGoodCountMain}
                setEvaluationGoodCount={setEvaluationGoodCountMain}
                commentCount={commentCountMain}
                setCommentCount={setCommentCountMain}
                evaluationStayCount={evaluationStayCountMain}
                setEvaluationStayCount={setEvaluationStayCountMain}
                onNavigate={hasParallels ? onMainPanelNavigate : undefined}
                hasParallels={hasParallels}
                onPrevParallel={onPrevParallel}
                onNextParallel={onNextParallel}
              />
            </Box>

            {/* パラレル投稿インジケーター */}
            {hasParallels && (
              <Box
                sx={{ mb: 0.5, fontSize: '0.75rem', color: 'text.secondary' }}
              >
                パラレル投稿 {currentParallelIndex + 1} / {totalParallels}
              </Box>
            )}

            <Button
              variant='contained'
              color='primary'
              onClick={() => setIsModalOpen(true)}
              sx={{ mt: 0.5, mb: 0.5, zIndex: 2, position: 'relative' }}
            >
              続きを書く
            </Button>
            <EditPost
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={handlePost}
              mainText={mainPanel[0]?.sentence || ''}
            />
            <ChildrenPanel
              childrenPanel={childrenPanel}
              setChildrenPanel={() => {}}
              mainPanel={mainPanel}
              setMainPanel={() => {}}
              setStartIndex={setStartIndexChildren}
              visibleTextCount={3}
              evaluationGoodCount={evaluationGoodCountChildren}
              setEvaluationGoodCount={setEvaluationGoodCountChildren}
              commentCount={commentCountChildren}
              setCommentCount={setCommentCountChildren}
              evaluationStayCount={evaluationStayCountChildren}
              setEvaluationStayCount={setEvaluationStayCountChildren}
              novel={novelWithRelations}
              textIndex={index}
              titleId={titleId || ''}
            />
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default NovelViewPresentation;
