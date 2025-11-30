import { FormProvider, useForm } from 'react-hook-form';
import {
  AccountInfo,
  AccountSettingsPresenter,
} from './AccountSettingsPresenter';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccountSettingFormSchema } from './AccountSettings.schema';
import { Box, Paper } from '@mui/material';
import { UsersApi, ViewMeUser, type UpdateUser } from '../../api/api';
import { axiosConfig } from '../../axiosConfig';
import { useEffect, useMemo, useState } from 'react';
import { useAuth, type User } from '../../providers/auth';
import { useNavigate } from 'react-router';

export const AccountSettings: React.FC = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const usersApi = useMemo(() => new UsersApi(axiosConfig), []);
  const parseBirthYmToDate = (birthYm?: string | null) => {
    if (!birthYm) return new Date('1900/01');
    const normalized = birthYm.replace(/-/g, '/').slice(0, 7);
    const parsed = new Date(`${normalized}/01`);
    return Number.isNaN(parsed.getTime()) ? new Date('1900/01') : parsed;
  };
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

  useEffect(() => {
    if (!currentUser) {
      setIsLoading(false);
      return;
    }
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
          birthYm: parseBirthYmToDate(userData.birthYm),
          isAnonymous: userData.isAnonymous || false,
          agreedTermsVersion: userData.agreedTermsVersion || 1,
        };

        setAccountInfo(convertedAccountInfo);

        // フォームの初期値も設定
        methods.reset({
          penName: convertedAccountInfo.penName,
          nickName: convertedAccountInfo.nickName,
          profileIconImage: convertedAccountInfo.profileIconImage,
          birthYm: convertedAccountInfo.birthYm,
          isAnonymous: convertedAccountInfo.isAnonymous,
          agreedTermsVersion: convertedAccountInfo.agreedTermsVersion,
        });
      } catch (error) {
        console.error('ユーザー情報の取得に失敗しました:', error);
        // エラー時はデフォルト値を使用
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [currentUser]); // currentUserを依存配列に追加

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

  if (!currentUser) {
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
          ログインしてください。
          <Box sx={{ mt: 2 }}>
            <button
              type='button'
              onClick={() => navigate('/login')}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: '1px solid #000',
                background: '#000',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              ログイン画面へ
            </button>
          </Box>
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
            onClickUpdateAccountInfo={async (input) => {
              const formatBirthYm = (date: Date) =>
                `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
                  2,
                  '0',
                )}`;

              const payload: UpdateUser = {
                penName: input.penName,
                nickName: input.nickName,
                isAnonymous: input.isAnonymous,
                profileIconImage:
                  input.profileIconImage && input.profileIconImage.trim() !== ''
                    ? input.profileIconImage
                    : undefined,
                birthYm: formatBirthYm(input.birthYm),
                agreedTermsVersion: input.agreedTermsVersion ?? 1,
              };

              try {
                setIsLoading(true);
                await usersApi.updateUserByMe(payload);

                const refreshed = await usersApi.getUserByMe();
                if (refreshed?.data) {
                  const userData: ViewMeUser = refreshed.data;
                  const updatedUser: User = {
                    userId: userData.userId || 0,
                    penName: userData.penName || '',
                    nickName: userData.nickName || '',
                    profileIconImage: userData.profileIconImage || '',
                    evaluationGoodCount: userData.evaluationGoodCount || 0,
                    createdAt: userData.createdAt || '',
                    updatedAt: userData.updatedAt || '',
                    birthYm: userData.birthYm || '',
                    isAnonymous: userData.isAnonymous ?? false,
                    agreedTermsVersion: userData.agreedTermsVersion || 1,
                  };
                  setCurrentUser(updatedUser);
                  const convertedAccountInfo: AccountInfo = {
                    userId: userData.userId || 0,
                    penName: userData.penName || '',
                    nickName: userData.nickName || '',
                    profileIconImage: userData.profileIconImage || '',
                    evaluationGoodCount: userData.evaluationGoodCount || 0,
                    birthYm: parseBirthYmToDate(userData.birthYm),
                    isAnonymous: userData.isAnonymous || false,
                    agreedTermsVersion: userData.agreedTermsVersion || 1,
                  };
                  setAccountInfo(convertedAccountInfo);
                  methods.reset({
                    penName: convertedAccountInfo.penName,
                    nickName: convertedAccountInfo.nickName,
                    profileIconImage: convertedAccountInfo.profileIconImage,
                    birthYm: convertedAccountInfo.birthYm,
                    isAnonymous: convertedAccountInfo.isAnonymous,
                    agreedTermsVersion: convertedAccountInfo.agreedTermsVersion,
                  });
                }
              } catch (error) {
                console.error('アカウント情報の更新に失敗しました:', error);
              } finally {
                setIsLoading(false);
              }
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
