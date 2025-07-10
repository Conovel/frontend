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
  start_index_parent: number;
  setStart_index_parent: React.Dispatch<React.SetStateAction<number>>;
  evaluation_good_count_parent: number;
  setEvaluation_good_count_parent: React.Dispatch<React.SetStateAction<number>>;
  comment_count_parent: number;
  setComment_count_parent: React.Dispatch<React.SetStateAction<number>>;
  evaluation_stay_count_parent: number;
  setEvaluation_stay_count_parent: React.Dispatch<React.SetStateAction<number>>;
  start_index_children: number;
  setStart_index_children: React.Dispatch<React.SetStateAction<number>>;
  evaluation_good_count_children: number;
  setEvaluation_good_count_children: React.Dispatch<
    React.SetStateAction<number>
  >;
  comment_count_children: number;
  setComment_count_children: React.Dispatch<React.SetStateAction<number>>;
  evaluation_stay_count_children: number;
  setEvaluation_stay_count_children: React.Dispatch<
    React.SetStateAction<number>
  >;
  evaluation_good_count_main: number;
  setEvaluation_good_count_main: React.Dispatch<React.SetStateAction<number>>;
  comment_count_main: number;
  setComment_count_main: React.Dispatch<React.SetStateAction<number>>;
  evaluation_stay_count_main: number;
  setEvaluation_stay_count_main: React.Dispatch<React.SetStateAction<number>>;
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
  start_index_parent,
  setStart_index_parent,
  evaluation_good_count_parent,
  setEvaluation_good_count_parent,
  comment_count_parent,
  setComment_count_parent,
  evaluation_stay_count_parent,
  setEvaluation_stay_count_parent,
  setStart_index_children,
  evaluation_good_count_children,
  setEvaluation_good_count_children,
  comment_count_children,
  setComment_count_children,
  evaluation_stay_count_children,
  setEvaluation_stay_count_children,
  evaluation_good_count_main,
  setEvaluation_good_count_main,
  comment_count_main,
  setComment_count_main,
  evaluation_stay_count_main,
  setEvaluation_stay_count_main,
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
              title_id: novel.title_id,
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
                  evaluation_good_count={novel.evaluation_good_count}
                  setEvaluation_good_count={() => {}}
                  comment_count={0}
                  setComment_count={() => {}}
                  evaluation_stay_count={novel.evaluation_stay_count}
                  setEvaluation_stay_count={() => {}}
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
          title_id: Number(novel.title_id) || novel.sentence_id,
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
                startIndex={start_index_parent}
                setStartIndex={setStart_index_parent}
                visibleTextCount={3}
                textCount={textCount}
                evaluation_good_count={evaluation_good_count_parent}
                setEvaluation_good_count={setEvaluation_good_count_parent}
                comment_count={comment_count_parent}
                setComment_count={setComment_count_parent}
                evaluation_stay_count={evaluation_stay_count_parent}
                setEvaluation_stay_count={setEvaluation_stay_count_parent}
                onClick={() => onParentClick(novel)}
              />
            </Box>

            {/* MainPanel */}
            <Box sx={{ mb: 0.5 }}>
              <MainPanel
                mainPanel={mainPanel}
                startIndex={0}
                visibleTextCount={3}
                evaluation_good_count={evaluation_good_count_main}
                setEvaluation_good_count={setEvaluation_good_count_main}
                comment_count={comment_count_main}
                setComment_count={setComment_count_main}
                evaluation_stay_count={evaluation_stay_count_main}
                setEvaluation_stay_count={setEvaluation_stay_count_main}
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
              setStartIndex={setStart_index_children}
              visibleTextCount={3}
              evaluation_good_count={evaluation_good_count_children}
              setEvaluation_good_count={setEvaluation_good_count_children}
              comment_count={comment_count_children}
              setComment_count={setComment_count_children}
              evaluation_stay_count={evaluation_stay_count_children}
              setEvaluation_stay_count={setEvaluation_stay_count_children}
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
