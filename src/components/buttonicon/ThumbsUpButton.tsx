import React from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

interface ThumbUpButtonProps {
  thumbUpCount: number;
  setThumbUpCount: React.Dispatch<React.SetStateAction<number>>;
}

const ThumbUpButton: React.FC<ThumbUpButtonProps> = ({
  thumbUpCount,
  setThumbUpCount,
}) => {
  const handleClick = () => {
    setThumbUpCount(thumbUpCount + 1);
    // ここにバックエンド処理を追加
  };

  return (
    <div
      onClick={handleClick}
      style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}
    >
      <ThumbUpIcon />
      <span>{thumbUpCount}</span>
    </div>
  );
};

export default ThumbUpButton;
