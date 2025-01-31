import { AccountSettingFormType } from './AccountSettings.schema';
export interface AccountInfo {
  userId: number;
  penName: string;
  nickName: string;
  profileIconImage: string;
  evaluationGoodCount: number;
  birthYearAndMonth: Date;
  isAnonymous: boolean;
}
interface AccountSettingsPresenterProps {
  /** アカウント情報 */
  accountInfo: AccountInfo;
  /** 編集モードかどうか */
  isEdit: boolean;
  /** 編集モードとの切り替え */
  onChangeEditMode: () => void;
  /** アカウント情報更新処理 */
  onClickUpdateAccountInfo: (input: AccountSettingFormType) => void;
  /** 投稿小説画面遷移 */
  onClickGoToMyPostedNovels: () => void;
  /** 閲覧小説画面遷移 */
  onClickGoToMyReadingNovels: () => void;
  /** 削除モーダルの開閉状態 */
  isOpenDeleteAccountModal: boolean;
  /** 削除モーダル開く */
  onClickOpenDeleteAccountModal: () => void;
  /** 削除モーダル閉じる */
  onCloseDeleteAccountModal: () => void;
}
export declare const AccountSettingsPresenter: ({
  accountInfo,
}: AccountSettingsPresenterProps) => import('react/jsx-runtime').JSX.Element;
export {};
