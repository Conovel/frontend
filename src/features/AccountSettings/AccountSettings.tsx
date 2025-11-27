import { FormProvider, useForm } from 'react-hook-form';
import {
  AccountInfo,
  AccountSettingsPresenter,
} from './AccountSettingsPresenter';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccountSettingFormSchema } from './AccountSettings.schema';
import { Box, Paper } from '@mui/material';
import {
  UpdateUser,
  User as ApiUser,
  UsersApi,
  ViewMeUser,
} from '../../api/api';
import { axiosConfig } from '../../axiosConfig';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth, type User as AuthUser } from '../../providers/auth';
import { type AccountSettingFormType } from './AccountSettings.schema';

type UserLike = (ViewMeUser | ApiUser) & {
  birthYm?: string;
  isAnonymous?: boolean;
  agreedTermsVersion?: number;
};

const convertToAccountInfo = (userData: UserLike): AccountInfo => ({
  userId: userData.userId || 0,
  penName: userData.penName || '',
  nickName: userData.nickName || '',
  profileIconImage: userData.profileIconImage || '',
  evaluationGoodCount: userData.evaluationGoodCount || 0,
  birthYm: userData.birthYm ? new Date(userData.birthYm + '/01') : new Date(),
  isAnonymous: userData.isAnonymous || false,
  agreedTermsVersion: userData.agreedTermsVersion || 1,
});

const convertToAuthUser = (userData: UserLike): AuthUser => ({
  userId: userData.userId || 0,
  penName: userData.penName || '',
  nickName: userData.nickName || '',
  profileIconImage: userData.profileIconImage || '',
  evaluationGoodCount: userData.evaluationGoodCount || 0,
  createdAt: userData.createdAt || '',
  updatedAt: userData.updatedAt || '',
  birthYm: userData.birthYm || '',
  isAnonymous: userData.isAnonymous || false,
  agreedTermsVersion: userData.agreedTermsVersion || 1,
});

const formatBirthYm = (birthYm: Date) => {
  const year = birthYm.getFullYear();
  const month = String(birthYm.getMonth() + 1).padStart(2, '0');
  return `${year}/${month}`;
};

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
    birthYm: new Date('1900/01'),
    isAnonymous: false,
    agreedTermsVersion: 1,
  });
  const [isLoading, setIsLoading] = useState(true);

  const usersApi = useMemo(() => new UsersApi(axiosConfig), []);
  const { setCurrentUser } = useAuth();

  const resetFormValues = useCallback(
    (info: AccountInfo) => {
      methods.reset({
        penName: info.penName,
        nickName: info.nickName,
        profileIconImage: info.profileIconImage,
        birthYm: info.birthYm,
        isAnonymous: info.isAnonymous,
        agreedTermsVersion: info.agreedTermsVersion,
      });
    },
    [methods],
  );

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setIsLoading(true);
        const response = await usersApi.getUserByMe();
        if (!response || !response.data) {
          throw new Error('ユーザー情報の取得に失敗しました');
        }
        const userData: ViewMeUser = response.data;

        const convertedAccountInfo = convertToAccountInfo(userData);
        setAccountInfo(convertedAccountInfo);
        resetFormValues(convertedAccountInfo);
        setCurrentUser(convertToAuthUser(userData));
      } catch (error) {
        console.error('ユーザー情報の取得に失敗しました:', error);
        // エラー時はデフォルト値を使用
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [resetFormValues, setCurrentUser, usersApi]);

  const handleUpdateAccountInfo = async (
    input: AccountSettingFormType,
  ): Promise<void> => {
    try {
      const updateUserInput: UpdateUser = {
        penName: input.penName,
        nickName: input.nickName,
        profileIconImage: input.profileIconImage,
        birthYm: formatBirthYm(input.birthYm),
        isAnonymous: input.isAnonymous,
        agreedTermsVersion: input.agreedTermsVersion,
      };

      const response = await usersApi.updateUserByMe(updateUserInput);
      if (!response || !response.data) {
        throw new Error('ユーザー情報の更新に失敗しました');
      }

      const updatedAccountInfo = convertToAccountInfo(response.data);
      setAccountInfo(updatedAccountInfo);
      resetFormValues(updatedAccountInfo);
      setCurrentUser(convertToAuthUser(response.data));
    } catch (error) {
      console.error('ユーザー情報の更新に失敗しました:', error);
    }
  };

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
    </Box>
  );
};
