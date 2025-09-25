import { FormProvider, useForm } from 'react-hook-form';
import {
  AccountInfo,
  AccountSettingsPresenter,
} from './AccountSettingsPresenter';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccountSettingFormSchema } from './AccountSettings.schema';
import { Box, Paper, Alert, Snackbar } from '@mui/material';
import { useState, useEffect } from 'react';
import { UsersApi, UpdateUser, ViewMeUser } from '../../api/api';
import { Configuration } from '../../api/configuration';

export const AccountSettings: React.FC = () => {
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const methods = useForm({
    mode: 'onBlur',
    resolver: zodResolver(AccountSettingFormSchema),
  });

  // API設定
  const configuration = new Configuration({
    basePath: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080',
  });
  const usersApi = new UsersApi(configuration);

  // ユーザー情報を取得
  const fetchUserInfo = async () => {
    try {
      setIsLoading(true);
      const response = await usersApi.getUserByMe();
      if (!response || !response.data) {
        throw new Error('ユーザー情報の取得に失敗しました');
      }
      const userData: ViewMeUser = response.data;

      const accountData: AccountInfo = {
        userId: userData.userId || 0,
        penName: userData.penName || '',
        nickName: userData.nickName || '',
        profileIconImage: userData.profileIconImage || '',
        evaluationGoodCount: userData.evaluationGoodCount || 0,
        birthYearAndMonth: userData.birthYearAndMonth
          ? new Date(userData.birthYearAndMonth + '/01')
          : new Date(),
        isAnonymous: userData.isAnonymous || false,
      };

      setAccountInfo(accountData);

      // フォームに初期値を設定
      methods.reset({
        penName: accountData.penName,
        nickName: accountData.nickName,
        birthYearAndMonth: accountData.birthYearAndMonth,
        isAnonymous: accountData.isAnonymous,
        profileIconImage: accountData.profileIconImage,
      });
    } catch (error) {
      console.error('ユーザー情報の取得に失敗しました:', error);
      setErrorMessage('ユーザー情報の取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  // コンポーネントマウント時にユーザー情報を取得
  useEffect(() => {
    fetchUserInfo();
  }, []);

  // アカウント情報更新処理
  const handleUpdateAccountInfo = async () => {
    try {
      // フォームのバリデーションを実行
      const isValid = await methods.trigger();
      if (!isValid) {
        return;
      }

      setIsLoading(true);
      const formData = methods.getValues();

      const updateData: UpdateUser = {
        penName: formData.penName,
        nickName: formData.nickName,
        isAnonymous: formData.isAnonymous,
        profileIconImage: formData.profileIconImage,
        birthYm: formData.birthYearAndMonth.toISOString().slice(0, 7), // YYYY-MM形式
        agreedTermsVersion: 1, // 仮の値
      };

      await usersApi.updateUserByMe(updateData);

      setSuccessMessage('アカウント情報が正常に更新されました');
      setIsEdit(false);

      // 更新された情報を再取得
      await fetchUserInfo();
    } catch (error) {
      console.error('アカウント情報の更新に失敗しました:', error);
      setErrorMessage('アカウント情報の更新に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  // 編集モード切り替え
  const handleChangeEditMode = () => {
    setIsEdit(!isEdit);
    if (!isEdit) {
      // 編集モードに入る時は現在の値をフォームに設定
      if (accountInfo) {
        methods.reset({
          penName: accountInfo.penName,
          nickName: accountInfo.nickName,
          birthYearAndMonth: accountInfo.birthYearAndMonth,
          isAnonymous: accountInfo.isAnonymous,
          profileIconImage: accountInfo.profileIconImage,
        });
      }
    }
  };

  // 成功メッセージを閉じる
  const handleCloseSuccessMessage = () => {
    setSuccessMessage(null);
  };

  // エラーメッセージを閉じる
  const handleCloseErrorMessage = () => {
    setErrorMessage(null);
  };

  if (isLoading && !accountInfo) {
    return <div>読み込み中...</div>;
  }

  if (!accountInfo) {
    return <div>ユーザー情報を取得できませんでした</div>;
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
            isEdit={isEdit}
            onChangeEditMode={handleChangeEditMode}
            onClickUpdateAccountInfo={handleUpdateAccountInfo}
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

      {/* 成功メッセージ */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSuccessMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSuccessMessage} severity='success'>
          {successMessage}
        </Alert>
      </Snackbar>

      {/* エラーメッセージ */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={handleCloseErrorMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseErrorMessage} severity='error'>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
