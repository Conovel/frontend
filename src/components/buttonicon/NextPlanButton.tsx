import React from 'react';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

interface NextPlanButtonProps {
  evaluationStayCount: number;
  setEvaluationStayCount: React.Dispatch<React.SetStateAction<number>>;
  isEvaluated: boolean;
  disabled?: boolean;
}

const NextPlanButton: React.FC<NextPlanButtonProps> = ({
  evaluationStayCount,
  setEvaluationStayCount,
  isEvaluated,
  disabled = false,
}) => {
  const handleClick = () => {
    if (!disabled) {
      setEvaluationStayCount(evaluationStayCount + 1);
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
      <span style={{ marginLeft: '4px' }}>{evaluationStayCount}</span>
    </div>
  );
};

export default NextPlanButton;
