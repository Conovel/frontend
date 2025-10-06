import { FormProvider, useForm } from 'react-hook-form';
import {
  AccountInfo,
  AccountSettingsPresenter,
} from './AccountSettingsPresenter';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccountSettingFormSchema } from './AccountSettings.schema';
import { Box, Paper } from '@mui/material';
import { UsersApi, ViewMeUser } from '../../api/api';
import { axiosConfig } from '../../axiosConfig';
import { useEffect, useState } from 'react';

export const AccountSettings: React.FC = () => {
  const methods = useForm({
    mode: 'onBlur', // TODO：アカウント情報の更新処理次第
    resolver: zodResolver(AccountSettingFormSchema),
  });

  const [accountInfo, setAccountInfo] = useState<AccountInfo>({
    userId: 0,
    penName: '',
    nickName: '',
    profileIconImage: '',
    evaluationGoodCount: 100,
    birthYm: new Date('1998/02'),
    isAnonymous: false,
    agreedTermsVersion: 1,
  });
  const [isLoading, setIsLoading] = useState(true);

  const usersApi = new UsersApi(axiosConfig);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setIsLoading(true);
        const response = await usersApi.getUserByMe();
        if (!response || !response.data) {
          throw new Error('ユーザー情報の取得に失敗しました');
        }
        const userData: ViewMeUser = response.data;

        // APIレスポンスをAccountInfo形式に変換
        const convertedAccountInfo: AccountInfo = {
          userId: userData.userId || 0,
          penName: userData.penName || '',
          nickName: userData.nickName || '',
          profileIconImage: userData.profileIconImage || '',
          evaluationGoodCount: userData.evaluationGoodCount || 0,
          birthYm: userData.birthYm
            ? new Date(userData.birthYm + '/01')
            : new Date(),
          isAnonymous: userData.isAnonymous || false,
          agreedTermsVersion: 1,
        };

        setAccountInfo(convertedAccountInfo);

        // フォームの初期値も設定
        methods.reset({
          penName: convertedAccountInfo.penName,
          nickName: convertedAccountInfo.nickName,
          profileIconImage: convertedAccountInfo.profileIconImage,
          birthYm: convertedAccountInfo.birthYm,
          isAnonymous: convertedAccountInfo.isAnonymous,
        });
      } catch (error) {
        console.error('ユーザー情報の取得に失敗しました:', error);
        // エラー時はデフォルト値を使用
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: {
            xs: '16px',
            sm: '16px calc((100% - 450px) / 2)',
          },
        }}
      >
        <Paper
          elevation={2}
          sx={{
            padding: '24px',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          ユーザー情報を読み込み中...
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: {
          xs: '16px', // 450px未満での余白
          sm: '16px calc((100% - 450px) / 2)', // 450px以上での余白
        },
      }}
    >
      <Paper
        elevation={2}
        sx={{
          padding: '24px',
          borderRadius: '8px',
        }}
      >
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
      </Paper>
    </Box>
  );
};
