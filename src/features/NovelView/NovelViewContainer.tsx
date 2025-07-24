import { NovelViewPresentation } from './NovelViewPresentation';
import { useState, useEffect } from 'react';
import { mockContainerData } from './mocks/data';
import { useAuth } from '../../providers/auth';
import { useNavigate } from 'react-router';

export const NovelViewContainer = () => {
  const { currentUser, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !currentUser) {
      navigate('/login');
    }
  }, [currentUser, isLoading, navigate]);

  const [start_index_parent, setStart_index_parent] = useState(0);
  const [start_index_children, setStart_index_children] = useState(0);
  const [evaluation_good_count_parent, setEvaluation_good_count_parent] =
    useState<number>(0);
  const [comment_count_parent, setComment_count_parent] = useState<number>(0);
  const [evaluation_stay_count_parent, setEvaluation_stay_count_parent] =
    useState<number>(0);
  const [evaluation_good_count_children, setEvaluation_good_count_children] =
    useState<number>(0);
  const [comment_count_children, setComment_count_children] =
    useState<number>(0);
  const [evaluation_stay_count_children, setEvaluation_stay_count_children] =
    useState<number>(0);

  // MainPanelに関する状態を定義
  const [evaluation_good_count_main, setEvaluation_good_count_main] =
    useState<number>(0);
  const [comment_count_main, setComment_count_main] = useState<number>(0);
  const [evaluation_stay_count_main, setEvaluation_stay_count_main] =
    useState<number>(0);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return null;
  }

  return (
    <NovelViewPresentation
      mainPanel={mockContainerData.main}
      parentPanel={mockContainerData.parent}
      childrenPanel={mockContainerData.children}
      start_index_parent={start_index_parent}
      setStart_index_parent={setStart_index_parent}
      evaluation_good_count_parent={evaluation_good_count_parent}
      setEvaluation_good_count_parent={setEvaluation_good_count_parent}
      comment_count_parent={comment_count_parent}
      setComment_count_parent={setComment_count_parent}
      evaluation_stay_count_parent={evaluation_stay_count_parent}
      setEvaluation_stay_count_parent={setEvaluation_stay_count_parent}
      start_index_children={start_index_children}
      setStart_index_children={setStart_index_children}
      evaluation_good_count_children={evaluation_good_count_children}
      setEvaluation_good_count_children={setEvaluation_good_count_children}
      comment_count_children={comment_count_children}
      setComment_count_children={setComment_count_children}
      evaluation_stay_count_children={evaluation_stay_count_children}
      setEvaluation_stay_count_children={setEvaluation_stay_count_children}
      evaluation_good_count_main={evaluation_good_count_main}
      setEvaluation_good_count_main={setEvaluation_good_count_main}
      comment_count_main={comment_count_main}
      setComment_count_main={setComment_count_main}
      evaluation_stay_count_main={evaluation_stay_count_main}
      setEvaluation_stay_count_main={setEvaluation_stay_count_main}
      textCount={
        mockContainerData.main.length +
        mockContainerData.parent.length +
        mockContainerData.children.length
      }
    />
  );
};
