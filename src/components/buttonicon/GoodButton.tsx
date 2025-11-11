import React from 'react';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

interface GoodButtonProps {
  evaluationGoodCount: number;
  isEvaluated: boolean;
  disabled?: boolean;
  isGoodEvaluated: boolean;
  setIsGoodEvaluated: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: () => void;
}

const GoodButton: React.FC<GoodButtonProps> = ({
  evaluationGoodCount,
  isEvaluated,
  disabled = false,
  isGoodEvaluated,
  setIsGoodEvaluated,
  onClick,
}) => {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        marginRight: '10px',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      <SentimentSatisfiedAltIcon color={isEvaluated ? 'primary' : 'action'} />
      <span style={{ marginLeft: '4px' }}>{evaluationGoodCount}</span>
    </div>
  );
};

export default GoodButton;
