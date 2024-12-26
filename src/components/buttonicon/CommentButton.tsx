import React from 'react';
import ChatIcon from '@mui/icons-material/Chat';

interface CommentButtonProps {
  comment_count: number;
  setComment_count: React.Dispatch<React.SetStateAction<number>>;
}

const CommentButton: React.FC<CommentButtonProps> = ({
  comment_count,
  setComment_count,
}) => {
  const handleClick = () => {
    setComment_count(comment_count + 1);
    // ここにバックエンド処理を追加
  };

  return (
    <div
      onClick={handleClick}
      style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}
    >
      <ChatIcon />
      <span>{comment_count}</span>
    </div>
  );
};

export default CommentButton;
