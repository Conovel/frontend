import React from 'react';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

interface NextPlanButtonProps {
  evaluation_stay_count: number;
  setEvaluation_stay_count: React.Dispatch<React.SetStateAction<number>>;
  isEvaluated: boolean;
  disabled?: boolean;
}

const NextPlanButton: React.FC<NextPlanButtonProps> = ({
  evaluation_stay_count,
  setEvaluation_stay_count,
  isEvaluated,
  disabled = false,
}) => {
  const handleClick = () => {
    if (!disabled) {
      setEvaluation_stay_count(evaluation_stay_count + 1);
      // ここにバックエンド処理を追加
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        marginRight: '10px',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      <SentimentVeryDissatisfiedIcon
        color={isEvaluated ? 'primary' : 'action'}
      />
      <span style={{ marginLeft: '4px' }}>{evaluation_stay_count}</span>
    </div>
  );
};

export default NextPlanButton;
