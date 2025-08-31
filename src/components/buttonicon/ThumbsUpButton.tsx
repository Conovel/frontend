import React from 'react';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

interface ThumbUpButtonProps {
  evaluationGoodCount: number;
  setEvaluationGoodCount: React.Dispatch<React.SetStateAction<number>>;
  isEvaluated: boolean;
  disabled?: boolean;
}

const ThumbUpButton: React.FC<ThumbUpButtonProps> = ({
  evaluationGoodCount,
  setEvaluationGoodCount,
  isEvaluated,
  disabled = false,
}) => {
  const handleClick = () => {
    if (!disabled) {
      setEvaluationGoodCount(evaluationGoodCount + 1);
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
      <SentimentSatisfiedAltIcon color={isEvaluated ? 'primary' : 'action'} />
      <span style={{ marginLeft: '4px' }}>{evaluationGoodCount}</span>
    </div>
  );
};

export default ThumbUpButton;
