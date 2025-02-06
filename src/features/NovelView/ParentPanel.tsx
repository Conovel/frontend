import React from 'react';
import { Box } from '@mui/material';
import NovelCard from '../../components/novelcard/NovelCard';
import { NovelProps } from '../../types/types';

interface ParentPanelProps {
  parentPanel: NovelProps;
  startIndex: number;
  setStartIndex: React.Dispatch<React.SetStateAction<number>>;
  visibleTextCount: number;
  textCount: number;
  evaluation_good_count: number;
  setEvaluation_good_count: React.Dispatch<React.SetStateAction<number>>;
  comment_count: number;
  setComment_count: React.Dispatch<React.SetStateAction<number>>;
  evaluation_stay_count: number;
  setEvaluation_stay_count: React.Dispatch<React.SetStateAction<number>>;
}

const ParentPanel: React.FC<ParentPanelProps> = ({
  parentPanel,
  startIndex,
  textCount,
  evaluation_good_count,
  setEvaluation_good_count,
  comment_count,
  setComment_count,
  evaluation_stay_count,
  setEvaluation_stay_count,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        margin: '5vh auto',
        height: '20vh',
        width: '70vw',
        alignItems: 'center',
        zIndex: 2,
      }}
    >
      {startIndex < textCount ? (
        <NovelCard
          key={startIndex}
          index={0}
          textIndex={startIndex}
          text={parentPanel.sentence}
          novel={{
            main_copy: parentPanel.main_copy,
            overview: parentPanel.overview,
            title: parentPanel.title,
            author_user_name: parentPanel.author_user_name,
            chips: parentPanel.chips,
            avatar: parentPanel.avatar,
            popular: parentPanel.popular,
            newArrival: parentPanel.newArrival,
            reader_count: parentPanel.reader_count,
            updated_at: parentPanel.updated_at,
            sentence_user_count: parentPanel.sentence_user_count,
            sentence_hierarchy_count: parentPanel.sentence_hierarchy_count,
            text: parentPanel.text,
          }}
          onClick={() => {}}
          evaluation_good_count={evaluation_good_count}
          setEvaluation_good_count={setEvaluation_good_count}
          comment_count={comment_count}
          setComment_count={setComment_count}
          evaluation_stay_count={evaluation_stay_count}
          setEvaluation_stay_count={setEvaluation_stay_count}
        />
      ) : null}
    </Box>
  );
};

export default ParentPanel;
