import React from 'react';
interface ThumbUpButtonProps {
    evaluation_good_count: number;
    setEvaluation_good_count: React.Dispatch<React.SetStateAction<number>>;
}
declare const ThumbUpButton: React.FC<ThumbUpButtonProps>;
export default ThumbUpButton;
