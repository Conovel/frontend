import React from 'react';
import NextPlanIcon from '@mui/icons-material/NextPlan';

interface NextPlanButtonProps {
  evaluationStayCount: number;
  setEvaluationStayCount: React.Dispatch<React.SetStateAction<number>>;
}

const NextPlanButton: React.FC<NextPlanButtonProps> = ({
  evaluationStayCount,
  setEvaluationStayCount,
}) => {
  const handleClick = () => {
    setEvaluationStayCount(evaluationStayCount + 1);
    // ここにバックエンド処理を追加
  };

  return (
    <div
      onClick={handleClick}
      style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}
    >
      <NextPlanIcon />
      <span>{evaluationStayCount}</span>
    </div>
  );
};

export default NextPlanButton;
