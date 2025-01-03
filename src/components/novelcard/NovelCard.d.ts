import React from 'react';
interface NovelCardProps {
  key: number;
  index: number;
  textIndex: number;
  text: string;
  evaluation_good_count: number;
  setEvaluation_good_count: React.Dispatch<React.SetStateAction<number>>;
  comment_count: number;
  setComment_count: React.Dispatch<React.SetStateAction<number>>;
  evaluation_stay_count: number;
  setEvaluation_stay_count: React.Dispatch<React.SetStateAction<number>>;
}
declare const NovelCard: React.FC<NovelCardProps>;
export default NovelCard;
