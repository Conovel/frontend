import { Sentence } from '../../types/types';
interface EditPostProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (sentence: Sentence) => void;
  mainText: string;
}
export declare const EditPost: React.FC<EditPostProps>;
export {};
