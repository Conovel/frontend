import React from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

interface ThumbUpButtonProps {
  evaluationGoodCount: number;
  setEvaluationGoodCount: React.Dispatch<React.SetStateAction<number>>;
}

const ThumbUpButton: React.FC<ThumbUpButtonProps> = ({
  evaluationGoodCount,
  setEvaluationGoodCount,
}) => {
  const handleClick = () => {
    setEvaluationGoodCount(evaluationGoodCount + 1);
    // ここにバックエンド処理を追加
  };

  return (
    <div
      onClick={handleClick}
      style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}
    >
      <ThumbUpIcon />
      <span>{evaluationGoodCount}</span>
    </div>
  );
};

export default ThumbUpButton;
