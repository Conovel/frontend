import React from 'react';
import NextPlanIcon from '@mui/icons-material/NextPlan';

interface NextPlanButtonProps {
  nextPlanCount: number;
  setNextPlanCount: React.Dispatch<React.SetStateAction<number>>;
}

const NextPlanButton: React.FC<NextPlanButtonProps> = ({
  nextPlanCount,
  setNextPlanCount,
}) => {
  const handleClick = () => {
    setNextPlanCount(nextPlanCount + 1);
    // ここにバックエンド処理を追加
  };

  return (
    <div
      onClick={handleClick}
      style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}
    >
      <NextPlanIcon />
      <span>{nextPlanCount}</span>
    </div>
  );
};

export default NextPlanButton;
