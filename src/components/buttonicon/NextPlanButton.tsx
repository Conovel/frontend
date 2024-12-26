import React from 'react';
import NextPlanIcon from '@mui/icons-material/NextPlan';

interface NextPlanButtonProps {
  evaluation_stay_count: number;
  setEvaluation_stay_count: React.Dispatch<React.SetStateAction<number>>;
}

const NextPlanButton: React.FC<NextPlanButtonProps> = ({
  evaluation_stay_count,
  setEvaluation_stay_count,
}) => {
  const handleClick = () => {
    setEvaluation_stay_count(evaluation_stay_count + 1);
    // ここにバックエンド処理を追加
  };

  return (
    <div
      onClick={handleClick}
      style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}
    >
      <NextPlanIcon />
      <span>{evaluation_stay_count}</span>
    </div>
  );
};

export default NextPlanButton;
