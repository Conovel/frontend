import React from 'react';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

interface ThumbUpButtonProps {
  evaluation_good_count: number;
  setEvaluation_good_count: React.Dispatch<React.SetStateAction<number>>;
  isEvaluated: boolean;
  disabled?: boolean;
}

const ThumbUpButton: React.FC<ThumbUpButtonProps> = ({
  evaluation_good_count,
  setEvaluation_good_count,
  isEvaluated,
  disabled = false,
}) => {
  const handleClick = () => {
    if (!disabled) {
      setEvaluation_good_count(evaluation_good_count + 1);
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
      <span style={{ marginLeft: '4px' }}>{evaluation_good_count}</span>
    </div>
  );
};

export default ThumbUpButton;
