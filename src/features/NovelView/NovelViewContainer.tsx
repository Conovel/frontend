import { NovelViewPresentation } from './NovelViewPresentation';
import { useState } from 'react';
import { mockContainerData } from './mocks/data';

export const NovelViewContainer = () => {
  const [startIndexParent, setStartIndexParent] = useState(0);
  const [startIndexChildren, setStartIndexChildren] = useState(0);
  const [evaluationGoodCountParent, setEvaluationGoodCountParent] =
    useState<number>(0);
  const [commentCountParent, setCommentCountParent] = useState<number>(0);
  const [evaluationStayCountParent, setEvaluationStayCountParent] =
    useState<number>(0);
  const [evaluationGoodCountChildren, setEvaluationGoodCountChildren] =
    useState<number>(0);
  const [commentCountChildren, setCommentCountChildren] = useState<number>(0);
  const [evaluationStayCountChildren, setEvaluationStayCountChildren] =
    useState<number>(0);

  // MainPanelに関する状態を定義
  const [evaluationGoodCountMain, setEvaluationGoodCountMain] =
    useState<number>(0);
  const [commentCountMain, setCommentCountMain] = useState<number>(0);
  const [evaluationStayCountMain, setEvaluationStayCountMain] =
    useState<number>(0);

  return (
    <NovelViewPresentation
      mainPanel={mockContainerData.main}
      parentPanel={mockContainerData.parent}
      childrenPanel={mockContainerData.children}
      startIndexParent={startIndexParent}
      setStartIndexParent={setStartIndexParent}
      evaluationGoodCountParent={evaluationGoodCountParent}
      setEvaluationGoodCountParent={setEvaluationGoodCountParent}
      commentCountParent={commentCountParent}
      setCommentCountParent={setCommentCountParent}
      evaluationStayCountParent={evaluationStayCountParent}
      setEvaluationStayCountParent={setEvaluationStayCountParent}
      startIndexChildren={startIndexChildren}
      setStartIndexChildren={setStartIndexChildren}
      evaluationGoodCountChildren={evaluationGoodCountChildren}
      setEvaluationGoodCountChildren={setEvaluationGoodCountChildren}
      commentCountChildren={commentCountChildren}
      setCommentCountChildren={setCommentCountChildren}
      evaluationStayCountChildren={evaluationStayCountChildren}
      setEvaluationStayCountChildren={setEvaluationStayCountChildren}
      evaluationGoodCountMain={evaluationGoodCountMain}
      setEvaluationGoodCountMain={setEvaluationGoodCountMain}
      commentCountMain={commentCountMain}
      setCommentCountMain={setCommentCountMain}
      evaluationStayCountMain={evaluationStayCountMain}
      setEvaluationStayCountMain={setEvaluationStayCountMain}
      textCount={
        mockContainerData.main.length +
        mockContainerData.parent.length +
        mockContainerData.children.length
      }
    />
  );
};
