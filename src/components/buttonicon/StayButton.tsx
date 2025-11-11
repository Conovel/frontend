import React from 'react';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
interface StayButtonProps {
  evaluationStayCount: number;
  isEvaluated: boolean;
  disabled?: boolean;
  isStayEvaluated: boolean;
  setIsStayEvaluated: React.Dispatch<React.SetStateAction<boolean>>;
  onClick?: () => void;
}

const StayButton: React.FC<StayButtonProps> = ({
  evaluationStayCount,
  isEvaluated,
  disabled = false,
  isStayEvaluated,
  setIsStayEvaluated,
  onClick,
}) => {

  return (
    <div
      onClick={onClick}
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

export default StayButton;
