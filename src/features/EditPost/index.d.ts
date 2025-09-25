import { CreateSentenceRequest } from '../NovelView/ChildrenPanel';
interface EditPostProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (sentenceRequest: CreateSentenceRequest) => void;
  mainText: string;
}
export declare const EditPost: React.FC<EditPostProps>;
export {};
