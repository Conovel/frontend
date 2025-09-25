import React from 'react';
import { Sentence } from '../../api/api';
export interface CreateSentenceRequest {
  text: string;
}
interface ChildrenPanelProps {
  childrenPanel: Sentence[];
  setChildrenPanel: React.Dispatch<React.SetStateAction<Sentence[]>>;
  mainPanel: Sentence[];
  setMainPanel: React.Dispatch<React.SetStateAction<Sentence[]>>;
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
  novel: Sentence;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  textIndex: number;
}
declare const ChildrenPanel: React.FC<ChildrenPanelProps>;
export default ChildrenPanel;
