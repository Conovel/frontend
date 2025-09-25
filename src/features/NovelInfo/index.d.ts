import { NovelListItem } from '../../api/api';
interface NovelInfoProps {
  open: boolean;
  onClose: () => void;
  novel: NovelListItem;
}
/**
 * 小説概要モーダル
 */
export declare const NovelInfo: ({
  open,
  onClose,
  novel,
}: NovelInfoProps) => import('react/jsx-runtime').JSX.Element;
export {};
