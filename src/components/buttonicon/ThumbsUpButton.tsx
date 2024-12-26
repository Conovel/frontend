import React from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

interface ThumbUpButtonProps {
  evaluation_good_count: number;
  setEvaluation_good_count: React.Dispatch<React.SetStateAction<number>>;
}

const ThumbUpButton: React.FC<ThumbUpButtonProps> = ({
  evaluation_good_count,
  setEvaluation_good_count,
}) => {
  const handleClick = () => {
    setEvaluation_good_count(evaluation_good_count + 1);
    // ここにバックエンド処理を追加
  };

  return (
    <div
      onClick={handleClick}
      style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}
    >
      <ThumbUpIcon />
      <span>{evaluation_good_count}</span>
    </div>
  );
};

export default ThumbUpButton;
