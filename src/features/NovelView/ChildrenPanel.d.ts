import React from 'react';
import { Sentence, NovelProps } from '../../types/types';
interface ChildrenPanelProps {
    childrenPanel: Sentence[];
    setChildrenPanel: React.Dispatch<React.SetStateAction<Sentence[]>>;
    mainPanel: Sentence[];
    setMainPanel: React.Dispatch<React.SetStateAction<Sentence[]>>;
    setStartIndex: React.Dispatch<React.SetStateAction<number>>;
    visibleTextCount: number;
    evaluation_good_count: number;
    setEvaluation_good_count: React.Dispatch<React.SetStateAction<number>>;
    comment_count: number;
    setComment_count: React.Dispatch<React.SetStateAction<number>>;
    evaluation_stay_count: number;
    setEvaluation_stay_count: React.Dispatch<React.SetStateAction<number>>;
    novel: NovelProps;
    textIndex: number;
    titleId?: string;
}
declare const ChildrenPanel: React.FC<ChildrenPanelProps>;
export default ChildrenPanel;
