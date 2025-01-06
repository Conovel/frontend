import { FormProvider, useForm } from 'react-hook-form';
import {
  AccountInfo,
  AccountSettingsPresenter,
} from './AccountSettingsPresenter';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccountSettingFormSchema } from './AccountSettings.schema';

export const AccountSettings = () => {
  const methods = useForm({
    mode: 'onBlur', // TODO：アカウント情報の更新処理次第
    resolver: zodResolver(AccountSettingFormSchema),
  });

  // TODO：モックのアカウント情報
  const accountInfo: AccountInfo = {
    userId: 0,
    penName: '花子花花花花花花花花花花花花花花花花花花花花花花花花花花３２文字',
    nickName: 'HANAAAAAAAAAAAAAAAAAAAAAAAAA32文字',
    profileIconImage: '',
    evaluationGoodCount: 100,
    birthYearAndMonth: new Date('1998/02'),
    isAnonymous: false,
  };

  return (
    <FormProvider {...methods}>
      <AccountSettingsPresenter
        accountInfo={accountInfo}
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
        isOpenDeleteAccountModal={false}
        onCloseDeleteAccountModal={() => {
          // TODO：あとで実装
        }}
      />
    </FormProvider>
  );
};
