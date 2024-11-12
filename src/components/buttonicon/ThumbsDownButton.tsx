import React from 'react';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

interface ThumbDownButtonProps {
  thumbDownCount: number;
  setThumbDownCount: React.Dispatch<React.SetStateAction<number>>;
}

const ThumbDownButton: React.FC<ThumbDownButtonProps> = ({
  thumbDownCount,
  setThumbDownCount,
}) => {
  const handleClick = () => {
    setThumbDownCount(thumbDownCount + 1);
    // ここにバックエンド処理を追加
  };

  return (
    <div
      onClick={handleClick}
      style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}
    >
      <ThumbDownIcon />
      <span>{thumbDownCount}</span>
    </div>
  );
};

export default ThumbDownButton;
