import React from 'react';
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
    onClick?: () => void;
}
declare const ParentPanel: React.FC<ParentPanelProps>;
export default ParentPanel;
