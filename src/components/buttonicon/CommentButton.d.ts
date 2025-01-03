import React from 'react';
interface CommentButtonProps {
  comment_count: number;
  setComment_count: React.Dispatch<React.SetStateAction<number>>;
}
declare const CommentButton: React.FC<CommentButtonProps>;
export default CommentButton;
