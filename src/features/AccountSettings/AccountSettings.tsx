import { FormProvider, useForm } from 'react-hook-form';
import { AccountSettingsPresenter } from './AccountSettingsPresenter';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccountSettingFormSchema } from './AccountSettings.schema';

export const AccountSettings = () => {
  const methods = useForm({
    mode: 'onBlur', // TODO：アカウント情報の更新処理次第
    resolver: zodResolver(AccountSettingFormSchema),
  });
  return (
    <FormProvider {...methods}>
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
    </FormProvider>
  );
};
