import React from 'react';
import { NovelProps } from '../../types/types';
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
  novel: NovelProps;
  onClick: () => void;
}
declare const NovelCard: ({
  novel,
  onClick,
}: NovelCardProps) => import('react/jsx-runtime').JSX.Element;
export default NovelCard;
