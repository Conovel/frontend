import { NovelProps } from '../../components/novelcard/presentation';
interface TransitionsModalProps {
  open: boolean;
  handleClose: () => void;
  onNovelClick: (novel: NovelProps) => void;
}
export default function TransitionsModal({
  open,
  handleClose,
}: TransitionsModalProps): import('react/jsx-runtime').JSX.Element;
export {};
