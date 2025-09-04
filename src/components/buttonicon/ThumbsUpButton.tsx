import React from 'react';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

interface ThumbUpButtonProps {
  evaluationGoodCount: number;
  isEvaluated: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const ThumbUpButton: React.FC<ThumbUpButtonProps> = ({
  evaluationGoodCount,
  isEvaluated,
  disabled = false,
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
      <SentimentSatisfiedAltIcon color={isEvaluated ? 'primary' : 'action'} />
      <span style={{ marginLeft: '4px' }}>{evaluationGoodCount}</span>
    </div>
  );
};

export default ThumbUpButton;
