import { AccountSettingsPresenter } from './AccountSettingsPresenter';

export const AccountSettings = () => {
  return (
    <AccountSettingsPresenter
      isEdit={false}
      onChangeEditMode={() => {
        // TODO:あとで実装
      }}
      onClickUpdateAccountInfo={() => {
        // TODO：あとで実装
      }}
      onClickGoToMyPostedNovels={() => {
        // TODO：あとで実装
      }}
      onClickGoToMyReadingNovels={() => {
        // TODO：あとで実装
      }}
      onClickOpenDeleteAccountModal={() => {
        // TODO：あとで実装
      }}
    />
  );
};
