import React from 'react';
import MainPanel from './MainPanel';
interface MainPanel {
  sentence_id: number;
  sentence: string;
  userId: number;
  userName: string;
}
interface Panel {
  sentence_id: number;
  sentence: string;
}
interface NovelViewPresentationProps {
  mainPanels: MainPanel[];
  parentPanel: Panel;
  childrenPanel: Panel;
  startIndexPrev: number;
  setStartIndexPrev: React.Dispatch<React.SetStateAction<number>>;
  evaluation_good_countPrev: number;
  setEvaluation_good_countPrev: React.Dispatch<React.SetStateAction<number>>;
  comment_countPrev: number;
  setComment_countPrev: React.Dispatch<React.SetStateAction<number>>;
  evaluation_stay_countPrev: number;
  setEvaluation_stay_countPrev: React.Dispatch<React.SetStateAction<number>>;
  startIndexNext: number;
  setStartIndexNext: React.Dispatch<React.SetStateAction<number>>;
  evaluation_good_countNext: number;
  setEvaluation_good_countNext: React.Dispatch<React.SetStateAction<number>>;
  comment_countNext: number;
  setComment_countNext: React.Dispatch<React.SetStateAction<number>>;
  evaluation_stay_countNext: number;
  setEvaluation_stay_countNext: React.Dispatch<React.SetStateAction<number>>;
}
export declare const NovelViewPresentation: React.FC<NovelViewPresentationProps>;
export {};
