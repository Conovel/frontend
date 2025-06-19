import React from 'react';
import { Sentence } from '../../types/types';
interface MainPanelProps {
    mainPanel: Sentence[];
    startIndex: number;
    visibleTextCount: number;
    evaluation_good_count: number;
    setEvaluation_good_count: React.Dispatch<React.SetStateAction<number>>;
    comment_count: number;
    setComment_count: React.Dispatch<React.SetStateAction<number>>;
    evaluation_stay_count: number;
    setEvaluation_stay_count: React.Dispatch<React.SetStateAction<number>>;
    onNavigate?: (direction: 'prev' | 'next') => void;
    hasParallels?: boolean;
    onPrevParallel?: () => void;
    onNextParallel?: () => void;
}
declare const MainPanel: React.FC<MainPanelProps>;
export default MainPanel;
