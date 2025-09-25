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
    accountInfo: AccountInfo;
    isEdit: boolean;
    onChangeEditMode: () => void;
    onClickUpdateAccountInfo: () => void;
    onClickGoToMyPostedNovels: () => void;
    onClickGoToMyReadingNovels: () => void;
    isOpenDeleteAccountModal: boolean;
    onClickOpenDeleteAccountModal: () => void;
    onCloseDeleteAccountModal: () => void;
}
export declare const AccountSettingsPresenter: ({ accountInfo, isEdit, onChangeEditMode, onClickUpdateAccountInfo, }: AccountSettingsPresenterProps) => import("react/jsx-runtime").JSX.Element;
export {};
