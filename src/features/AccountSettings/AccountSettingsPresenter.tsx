import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { LabelWithTooltip } from '../../components/labelWithTooltip';
import { AccountSettingFormType } from './AccountSettings.schema';
import { ThumbUpAltOutlined } from '@mui/icons-material';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useNavigate } from 'react-router';

export interface AccountInfo {
  userId: number;
  penName: string;
  nickName: string;
  profileIconImage: string;
  evaluationGoodCount: number;
  birthYm: Date;
  isAnonymous: boolean;
  agreedTermsVersion: number;
}

interface AccountSettingsPresenterProps {
  accountInfo: AccountInfo;
  isEdit: boolean;
  onChangeEditMode: () => void;
  onClickUpdateAccountInfo: (input: AccountSettingFormType) => void;
  onClickGoToMyPostedNovels: () => void;
  onClickGoToMyReadingNovels: () => void;
  isOpenDeleteAccountModal: boolean;
  onClickOpenDeleteAccountModal: () => void;
  onCloseDeleteAccountModal: () => void;
}

const AnonymousSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&::before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText('#F24726'),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&::after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText('#F24726'),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
  '& .Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#F24726', // Red background color when checked
  },
  '& .Mui-checked': {
    color: '#F24726', // Red color for the thumb when checked
  },
}));

export const AccountSettingsPresenter = ({
  accountInfo,
  onClickUpdateAccountInfo,
}: AccountSettingsPresenterProps) => {
  const navigate = useNavigate();

  const [isOpenDeleteAccountModal, setIsOpenDeleteAccountModal] =
    useState(false);

  const toggleDeleteAccountModal = () => {
    setIsOpenDeleteAccountModal((prev) => !prev);
  };

  const [isEditingPenName, setIsEditingPenName] = useState(false);
  const [isEditingNickName, setIsEditingNickName] = useState(false);
  const [isEditingBirthYm, setIsEditingBirthYm] = useState(false);
  const [penName, setPenName] = useState(accountInfo.penName);
  const [nickName, setNickName] = useState(accountInfo.nickName);
  const [isAnonymous, setIsAnonymous] = useState(accountInfo.isAnonymous);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileIconImage, setProfileIconImage] = useState(
    accountInfo.profileIconImage,
  );
  const [birthYm, setBirthYm] = useState(accountInfo.birthYm);

  useEffect(() => {
    setPenName(accountInfo.penName);
    setNickName(accountInfo.nickName);
    setProfileIconImage(accountInfo.profileIconImage);
    setIsAnonymous(accountInfo.isAnonymous);
    setBirthYm(accountInfo.birthYm);
  }, [accountInfo]);

  const formatBirthYm = (date: Date) => {
    if (!date || Number.isNaN(date.getTime())) return '--/--';
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
      2,
      '0',
    )}`;
  };

  const formatBirthYmForInput = (date: Date) => {
    if (!date || Number.isNaN(date.getTime())) return '';
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0',
    )}`;
  };

  const handleUpdateAccountInfo = (
    overrides: Partial<AccountSettingFormType> = {},
  ) => {
    const payload: AccountSettingFormType = {
      penName,
      nickName,
      profileIconImage,
      isAnonymous,
      birthYm,
      agreedTermsVersion: accountInfo.agreedTermsVersion,
      ...overrides,
    };
    onClickUpdateAccountInfo(payload);
  };

  const handlePenNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPenName(event.target.value);
  };

  const handleNickNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(event.target.value);
  };

  const handleSave = () => {
    handleUpdateAccountInfo();
    setIsEditingPenName(false);
    setIsEditingNickName(false);
  };

  const handleBirthYmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!value) return;

    const parsedDate = new Date(`${value}-01`);
    if (!Number.isNaN(parsedDate.getTime())) {
      setBirthYm(parsedDate);
    }
  };

  const handleSaveBirthYm = () => {
    if (!birthYm || Number.isNaN(birthYm.getTime())) return;
    handleUpdateAccountInfo({ birthYm });
    setIsEditingBirthYm(false);
  };

  const handleAnonymousChange = (checked: boolean) => {
    setIsAnonymous(checked);
    handleUpdateAccountInfo({ isAnonymous: checked });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const image = e.target.result as string;
          setProfileIconImage(image);
          handleUpdateAccountInfo({ profileIconImage: image });
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleGoToDeletePolicy = () => {
    toggleDeleteAccountModal();
    navigate('/deleteAccount');
  };

  return (
    <>
      <Typography
        variant='h5'
        sx={{ textAlign: 'center', marginBottom: '16px' }}
      >
        アカウント情報
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Box sx={{ margin: '0 auto' }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={profileIconImage}
                sx={{ bgcolor: 'magenta', width: 56, height: 56 }}
              >
                HN
              </Avatar>
              <IconButton
                sx={{
                  padding: 0,
                  width: 'fit-content',
                  position: 'absolute',
                  bottom: -4,
                  right: -8,
                }}
                onClick={() => setIsModalOpen(true)}
              >
                <EditIcon sx={{ color: 'black' }} />
              </IconButton>
            </Box>
          </Box>

          <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
            container={() =>
              typeof document !== 'undefined'
                ? document.getElementById('root')
                : null
            }
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80vw',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
              }}
            >
              <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                <IconButton onClick={() => setIsModalOpen(false)}>
                  <CloseIcon sx={{ color: 'black' }} />
                </IconButton>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                  プロフィール写真をアップロード
                </Typography>
              </Box>

              <Button
                component='label'
                variant='contained'
                startIcon={<CloudUploadIcon />}
                sx={{ width: 'fit-content', backgroundColor: 'gray' }}
              >
                アップロード
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </Button>
            </Box>
          </Modal>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <LabelWithTooltip
              label='ペンネーム'
              hasTooltip
              tooltipText='ペンネームはストーリー投稿時に表示します'
            />

            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
              {isEditingPenName ? (
                <TextField
                  value={penName}
                  onChange={handlePenNameChange}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      handleSave();
                    }
                  }}
                />
              ) : (
                <Typography sx={{ wordBreak: 'break-word' }}>
                  {penName}
                </Typography>
              )}
              <IconButton
                sx={{ padding: 0, width: 'fit-content' }}
                onClick={() => {
                  if (isEditingPenName) {
                    handleSave();
                  } else {
                    setIsEditingPenName(true);
                  }
                }}
              >
                {isEditingPenName ? (
                  <CheckIcon sx={{ color: 'black' }} />
                ) : (
                  <EditIcon sx={{ color: 'black' }} />
                )}
              </IconButton>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <LabelWithTooltip
              label='ニックネーム'
              hasTooltip
              tooltipText='ニックネーム'
            />

            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
              {isEditingNickName ? (
                <TextField
                  value={nickName}
                  onChange={handleNickNameChange}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      handleSave();
                    }
                  }}
                />
              ) : (
                <Typography sx={{ wordBreak: 'break-word' }}>
                  {nickName}
                </Typography>
              )}
              <IconButton
                sx={{ padding: 0, width: 'fit-content' }}
                onClick={() => {
                  if (isEditingNickName) {
                    handleSave();
                  } else {
                    setIsEditingNickName(true);
                  }
                }}
              >
                {isEditingNickName ? (
                  <CheckIcon sx={{ color: 'black' }} />
                ) : (
                  <EditIcon sx={{ color: 'black' }} />
                )}
              </IconButton>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <LabelWithTooltip
              label='生年月'
              hasTooltip
              tooltipText='生年月は年と月を登録します（後から変更可能です）'
            />
            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
              {isEditingBirthYm ? (
                <TextField
                  type='month'
                  value={formatBirthYmForInput(birthYm)}
                  onChange={handleBirthYmChange}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      handleSaveBirthYm();
                    }
                  }}
                  inputProps={{
                    max: formatBirthYmForInput(new Date()),
                  }}
                  sx={{ minWidth: '180px' }}
                />
              ) : (
                <Typography>{formatBirthYm(birthYm)}</Typography>
              )}
              <IconButton
                sx={{ padding: 0, width: 'fit-content' }}
                onClick={() => {
                  if (isEditingBirthYm) {
                    handleSaveBirthYm();
                  } else {
                    setIsEditingBirthYm(true);
                  }
                }}
              >
                {isEditingBirthYm ? (
                  <CheckIcon sx={{ color: 'black' }} />
                ) : (
                  <EditIcon sx={{ color: 'black' }} />
                )}
              </IconButton>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <LabelWithTooltip
              label='匿名設定'
              hasTooltip
              tooltipText='匿名設定をONにすると投稿は匿名で表示されます'
            />
            <AnonymousSwitch
              checked={isAnonymous}
              onChange={(e) => handleAnonymousChange(e.target.checked)}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <ThumbUpAltOutlined />
            <Typography>{accountInfo.evaluationGoodCount}</Typography>
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            onClick={toggleDeleteAccountModal}
            variant='contained'
            sx={{
              backgroundColor: '#F24726',
              '&:hover': {
                backgroundColor: '#F24726',
              },
            }}
          >
            アカウント削除
          </Button>
        </Box>

        {/* 削除モーダル（ポリシー確認へ誘導） */}
        <Dialog
          open={isOpenDeleteAccountModal}
          onClose={toggleDeleteAccountModal}
        >
          <DialogTitle>アカウント削除前の確認</DialogTitle>
          <DialogContent>
            <DialogContentText>
              アカウント削除にはポリシーへの同意が必要です。
              同意画面へ進みますか？
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant='outlined'
              onClick={toggleDeleteAccountModal}
              sx={{ color: 'black', borderColor: 'black' }}
            >
              キャンセル
            </Button>
            <Button
              variant='contained'
              onClick={handleGoToDeletePolicy}
              color='error'
            >
              同意画面へ
            </Button>
          </DialogActions>
        </Dialog>

        <Box>
          <LabelWithTooltip
            label='投稿小説'
            hasTooltip
            tooltipText='自分が投稿した小説の一覧です'
          />
        </Box>

        <Box>
          <LabelWithTooltip
            label='閲覧小説'
            hasTooltip
            tooltipText='自分が読んだ小説の一覧です'
          />
        </Box>
      </Box>
    </>
  );
};
