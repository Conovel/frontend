import React, { useState } from 'react';
import { Box, TextField, Button, Modal, Typography } from '@mui/material';
import ParentPanel from './ParentPanel';
import MainPanel from './MainPanel';
import ChildrenPanel from './ChildrenPanel';
import { NovelProps, Sentence } from '../../types/types';

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
  const [newSentence, setNewSentence] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePost = async () => {
    if (newSentence.trim()) {
      await onPost(newSentence);
      setNewSentence('');
      setIsModalOpen(false);
    }
  };

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
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
          zIndex: 1,
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
            <Button
              variant='contained'
              color='primary'
              onClick={() => setIsModalOpen(true)}
              sx={{ mt: 2, mb: 2 }}
            >
              続きを書く
            </Button>
            <Modal
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              aria-labelledby='novel-post-modal'
            >
              <Box sx={modalStyle}>
                <Typography variant='h6' component='h2' gutterBottom>
                  続きを書く
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  value={newSentence}
                  onChange={(e) => setNewSentence(e.target.value)}
                  placeholder='新しい文章を入力してください'
                  variant='outlined'
                  sx={{ mb: 2 }}
                />
                <Box
                  sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}
                >
                  <Button
                    variant='outlined'
                    onClick={() => setIsModalOpen(false)}
                  >
                    キャンセル
                  </Button>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handlePost}
                  >
                    投稿する
                  </Button>
                </Box>
              </Box>
            </Modal>
            <ChildrenPanel
              childrenPanel={childrenPanel}
              setChildrenPanel={() => {}}
              mainPanel={mainPanel}
              setMainPanel={() => {}}
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
