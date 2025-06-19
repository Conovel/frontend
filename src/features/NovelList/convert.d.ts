import { NovelListItem as NovelListItemApi } from '../../api/api';
import { NovelListItem } from '../../types/types';
export declare const convertNovelListResponse: (response: NovelListItemApi[]) => NovelListItem[];
