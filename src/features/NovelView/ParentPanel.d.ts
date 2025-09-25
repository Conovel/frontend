import React from 'react';
import { Sentence } from '../../api/api';
interface ParentPanelProps {
    parentPanel: Sentence;
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
declare const ParentPanel: React.FC<ParentPanelProps>;
export default ParentPanel;
