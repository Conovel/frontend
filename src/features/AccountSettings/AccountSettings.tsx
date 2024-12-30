import { AccountSettingsPresenter } from './AccountSettingsPresenter';

export const AccountSettings = () => {
  return (
    <AccountSettingsPresenter
      isEdit={false}
      onChangeEditMode={() => {
        // TODO:あとで実装
      }}
    />
  );
};
