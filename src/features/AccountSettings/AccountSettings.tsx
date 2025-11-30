import { FormProvider, useForm } from 'react-hook-form';
import {
  AccountInfo,
  AccountSettingsPresenter,
} from './AccountSettingsPresenter';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AccountSettingFormSchema,
  type AccountSettingFormType,
} from './AccountSettings.schema';
import { Box, Paper } from '@mui/material';
import {
  UpdateUser,
  User as ApiUser,
  UsersApi,
  ViewMeUser,
} from '../../api/api';
import { axiosConfig } from '../../axiosConfig';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAuth, type User } from '../../providers/auth';
import { useNavigate } from 'react-router';
import type { AxiosError } from 'axios';

type UserLike = (ViewMeUser | ApiUser) & {
  birthYm?: string | null;
  isAnonymous?: boolean;
  agreedTermsVersion?: number;
};

const parseBirthYmToDate = (birthYm?: string | null) => {
  if (!birthYm) return new Date('1900/01');
  const normalized = birthYm.replace(/-/g, '/').slice(0, 7);
  const parsed = new Date(`${normalized}/01`);
  return Number.isNaN(parsed.getTime()) ? new Date('1900/01') : parsed;
};

const formatBirthYm = (birthYm: Date | string) => {
  const toDate =
    typeof birthYm === 'string'
      ? new Date(birthYm.replace(/-/g, '/').slice(0, 7) + '/01')
      : birthYm;
  const year = toDate.getFullYear();
  const month = String(toDate.getMonth() + 1).padStart(2, '0');
  return `${year}/${month}`;
};

const normalizeProfileIconImage = (value?: string | null) => {
  if (!value) return '';
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('data:')) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return '';
};

const convertToAccountInfo = (userData: UserLike): AccountInfo => ({
  userId: userData.userId || 0,
  penName: userData.penName || '',
  nickName: userData.nickName || '',
  profileIconImage: userData.profileIconImage || '',
  evaluationGoodCount: userData.evaluationGoodCount || 0,
  birthYm: parseBirthYmToDate(userData.birthYm),
  isAnonymous: userData.isAnonymous ?? false,
  agreedTermsVersion: userData.agreedTermsVersion ?? 1,
});

const convertToAuthUser = (userData: UserLike): User => ({
  userId: userData.userId || 0,
  penName: userData.penName || '',
  nickName: userData.nickName || '',
  profileIconImage: userData.profileIconImage || '',
  evaluationGoodCount: userData.evaluationGoodCount || 0,
  createdAt: userData.createdAt || '',
  updatedAt: userData.updatedAt || '',
  birthYm: userData.birthYm || '',
  isAnonymous: userData.isAnonymous ?? false,
  agreedTermsVersion: userData.agreedTermsVersion ?? 1,
});

export const AccountSettings: React.FC = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const usersApi = useMemo(() => new UsersApi(axiosConfig), []);
  const lastFetchedUserIdRef = useRef<number | null>(null);
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
    if (!currentUser) {
      setIsLoading(false);
      return;
    }
    if (lastFetchedUserIdRef.current === currentUser.userId) {
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

        const convertedAccountInfo = convertToAccountInfo(userData);
        setAccountInfo(convertedAccountInfo);
        resetFormValues(convertedAccountInfo);
        if (!currentUser) {
          setCurrentUser(convertToAuthUser(userData));
        }
        lastFetchedUserIdRef.current = userData.userId ?? null;
      } catch (error) {
        console.error('ユーザー情報の取得に失敗しました:', error);
        // エラー時はデフォルト値を使用
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [currentUser, resetFormValues, setCurrentUser, usersApi]);

  const handleUpdateAccountInfo = async (
    input: AccountSettingFormType,
  ): Promise<void> => {
    const penName = input.penName?.trim();
    const nickName = input.nickName?.trim();
    if (!penName || !nickName) {
      console.error('ペンネームとニックネームは必須です');
      return;
    }
    if (!input.birthYm || Number.isNaN(input.birthYm.getTime())) {
      console.error('生年月の形式が正しくありません');
      return;
    }

    const payload: UpdateUser = {
      penName,
      nickName,
      isAnonymous: input.isAnonymous,
      profileIconImage: normalizeProfileIconImage(input.profileIconImage),
      birthYm: formatBirthYm(input.birthYm),
      agreedTermsVersion: input.agreedTermsVersion ?? 1,
    };

    try {
      setIsLoading(true);
      const response = await usersApi.updateUserByMe(payload);
      if (response?.data) {
        const updatedAccountInfo = convertToAccountInfo(response.data);
        setAccountInfo(updatedAccountInfo);
        resetFormValues(updatedAccountInfo);
        setCurrentUser(convertToAuthUser(response.data));
      }
    } catch (error) {
      const axiosErr = error as AxiosError<any>;
      console.error('アカウント情報の更新に失敗しました:', {
        message: axiosErr.message,
        status: axiosErr.response?.status,
        data: axiosErr.response?.data,
      });
    } finally {
      setIsLoading(false);
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
