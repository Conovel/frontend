import React from 'react';
import ChatIcon from '@mui/icons-material/Chat';

interface CommentButtonProps {
  commentCount: number;
  setCommentCount: React.Dispatch<React.SetStateAction<number>>;
}

const CommentButton: React.FC<CommentButtonProps> = ({
  commentCount,
  setCommentCount,
}) => {
  const handleClick = () => {
    setCommentCount(commentCount + 1);
    // ここにバックエンド処理を追加
  };

  return (
    <div
      onClick={handleClick}
      style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}
    >
      <ChatIcon />
      <span>{commentCount}</span>
    </div>
  );
};

export default CommentButton;
