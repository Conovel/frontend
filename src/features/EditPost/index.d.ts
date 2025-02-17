interface EditPostProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
  mainText: string;
}
export declare const EditPost: React.FC<EditPostProps>;
export {};
