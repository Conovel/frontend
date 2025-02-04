import React from 'react';
interface ChildrenPanelProps {
  childrenPanel: {
    sentence_id: number;
    sentence: string;
    userId: number;
    userName: string;
  };
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
declare const ChildrenPanel: React.FC<ChildrenPanelProps>;
export default ChildrenPanel;
