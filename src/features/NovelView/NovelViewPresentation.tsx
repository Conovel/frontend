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
  start_index_children,
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
}) => {
  const [start_index_main, setStart_index_main] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mainPanelState, setMainPanelState] = useState<Sentence[]>(mainPanel);
  const [childrenPanelState, setChildrenPanelState] =
    useState<Sentence[]>(childrenPanel);

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
      {parentPanel.map((novel, index) => {
        const novelWithRelations: NovelProps = {
          ...novel,
          title_id: novel.sentence_id,
          children: childrenPanel,
          main: mainPanel,
          parent: parentPanel,
          chips: novel.chips.map((chip) => ({ label: chip.props.children })),
          tags: novel.tags.map((tag) => ({ label: tag.props.children })),
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
              />
            </Box>
            <Box sx={{ mb: 0.5 }}>
              <MainPanel
                mainPanel={mainPanel}
                startIndex={start_index_main}
                setStartIndex={setStart_index_main}
                visibleTextCount={3}
                textCount={textCount}
                evaluation_good_count={evaluation_good_count_main}
                setEvaluation_good_count={setEvaluation_good_count_main}
                comment_count={comment_count_main}
                setComment_count={setComment_count_main}
                evaluation_stay_count={evaluation_stay_count_main}
                setEvaluation_stay_count={setEvaluation_stay_count_main}
              />
            </Box>
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
              childrenPanel={childrenPanelState}
              setChildrenPanel={setChildrenPanelState}
              mainPanel={mainPanelState}
              setMainPanel={setMainPanelState}
              startIndex={start_index_children}
              setStartIndex={setStart_index_children}
              visibleTextCount={3}
              textCount={textCount}
              evaluation_good_count={evaluation_good_count_children}
              setEvaluation_good_count={setEvaluation_good_count_children}
              comment_count={comment_count_children}
              setComment_count={setComment_count_children}
              evaluation_stay_count={evaluation_stay_count_children}
              setEvaluation_stay_count={setEvaluation_stay_count_children}
              novel={novelWithRelations}
              onClick={() => {}}
              textIndex={index}
            />
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default NovelViewPresentation;
