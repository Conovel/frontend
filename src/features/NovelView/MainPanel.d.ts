import React from 'react';
import { Sentence } from '../../api/api';
interface MainPanelProps {
    mainPanel: Sentence;
    evaluation_good_count: number;
    setEvaluation_good_count: React.Dispatch<React.SetStateAction<number>>;
    comment_count: number;
    setComment_count: React.Dispatch<React.SetStateAction<number>>;
    evaluation_stay_count: number;
    setEvaluation_stay_count: React.Dispatch<React.SetStateAction<number>>;
}
declare const MainPanel: React.FC<MainPanelProps>;
export default MainPanel;
