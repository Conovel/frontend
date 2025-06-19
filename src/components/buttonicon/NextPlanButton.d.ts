import React from 'react';
interface NextPlanButtonProps {
    evaluation_stay_count: number;
    setEvaluation_stay_count: React.Dispatch<React.SetStateAction<number>>;
}
declare const NextPlanButton: React.FC<NextPlanButtonProps>;
export default NextPlanButton;
