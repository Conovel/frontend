import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NovelViewPresentation from './NovelViewPresentation';
import { Sentence } from '../../types/types';
import { fetchNovelData } from './handlers';

const NovelViewContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [mainPanel, setMainPanel] = useState<Sentence | null>(null);
  const [parentPanel, setParentPanel] = useState<Sentence | null>(null);
  const [childrenPanels, setChildrenPanels] = useState<Sentence[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [textCount, setTextCount] = useState(0);
  const [evaluation_good_count, setEvaluation_good_count] = useState(0);
  const [comment_count, setComment_count] = useState(0);
  const [evaluation_stay_count, setEvaluation_stay_count] = useState(0);

  useEffect(() => {
    const loadNovelData = async () => {
      if (id) {
        try {
          const data = await fetchNovelData(id);
          if (data) {
            setMainPanel(data);
            setTextCount(data.sentence_hierarchy_count || 0);
            setEvaluation_good_count(data.evaluation_good_count || 0);
            setComment_count(data.comment_count || 0);
            setEvaluation_stay_count(data.evaluation_stay_count || 0);
          }
        } catch (error) {
          console.error('Error loading novel data:', error);
        }
      }
    };

    loadNovelData();
  }, [id]);

  const handlePostSuccess = (newPost: Sentence) => {
    if (mainPanel) {
      setParentPanel(mainPanel);
      setMainPanel(newPost);
      setChildrenPanels((prev) =>
        prev.filter((child) => child.sentence_id !== newPost.sentence_id),
      );
    }
  };

  return (
    <NovelViewPresentation
      mainPanel={mainPanel}
      parentPanel={parentPanel}
      childrenPanels={childrenPanels}
      startIndex={startIndex}
      setStartIndex={setStartIndex}
      textCount={textCount}
      evaluation_good_count={evaluation_good_count}
      setEvaluation_good_count={setEvaluation_good_count}
      comment_count={comment_count}
      setComment_count={setComment_count}
      evaluation_stay_count={evaluation_stay_count}
      setEvaluation_stay_count={setEvaluation_stay_count}
      onPostSuccess={handlePostSuccess}
    />
  );
};

export default NovelViewContainer;
