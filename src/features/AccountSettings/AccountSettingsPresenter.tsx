import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { LabelWithTooltip } from '../../components/labelWithTooltip';
import { AccountSettingFormType } from './AccountSettings.schema';
import { ThumbUpAltOutlined } from '@mui/icons-material';

export interface AccountInfo {
  userId: number;
  penName: string;
  nickName: string;
  profileIconImage: string;
  evaluationGoodCount: number;
  birthYearAndMonth: Date;
  isAnonymous: boolean;
}

interface AccountSettingsPresenterProps {
  /** アカウント情報 */
  accountInfo: AccountInfo;
  /** 編集モードかどうか */
  isEdit: boolean;
  /** 編集モードとの切り替え */
  onChangeEditMode: () => void;
  /** アカウント情報更新処理 */
  onClickUpdateAccountInfo: (input: AccountSettingFormType) => void;
  /** 投稿小説画面遷移 */
  onClickGoToMyPostedNovels: () => void;
  /** 閲覧小説画面遷移 */
  onClickGoToMyReadingNovels: () => void;
  /** 削除モーダルの開閉状態 */
  isOpenDeleteAccountModal: boolean;
  /** 削除モーダル開く */
  onClickOpenDeleteAccountModal: () => void;
  /** 削除モーダル閉じる */
  onCloseDeleteAccountModal: () => void;
}

export const AccountSettingsPresenter = ({
  accountInfo,
}: AccountSettingsPresenterProps) => {
  return (
    <>
      <Typography variant='h4' sx={{ marginBottom: '16px' }}>
        アカウント情報
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/** アカウント情報 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/** アバター */}
          <Box sx={{ margin: '0 auto' }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar sx={{ bgcolor: 'magenta' }}>HN</Avatar>
              <IconButton
                sx={{
                  padding: 0,
                  width: 'fit-content',
                  position: 'absolute',
                  bottom: -4,
                  right: -8,
                }}
              >
                <EditIcon sx={{ color: 'black' }} />
              </IconButton>
            </Box>
          </Box>

          {/** ペンネーム */}
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
              <Typography sx={{ wordBreak: 'break-word' }}>
                {accountInfo.penName}
              </Typography>
              <IconButton sx={{ padding: 0, width: 'fit-content' }}>
                <EditIcon sx={{ color: 'black' }} />
              </IconButton>
            </Box>
          </Box>

          {/** ニックネーム */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            {/** // TODO：tooltipの内容は、コメント投稿機能実装時に修正 */}
            <LabelWithTooltip
              label='ニックネーム'
              hasTooltip
              tooltipText='ニックネーム'
            />

            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
              <Typography sx={{ wordBreak: 'break-word' }}>
                {accountInfo.nickName}
              </Typography>
              <IconButton sx={{ padding: 0, width: 'fit-content' }}>
                <EditIcon sx={{ color: 'black' }} />
              </IconButton>
            </Box>
          </Box>

          {/** 生年月 */}
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
              tooltipText='生年月は一度登録したら変更できません'
            />

            {/** // TODO：Dayjs入れた方が扱いやすいよ */}
            <Typography>{`${accountInfo.birthYearAndMonth.getFullYear()}/${accountInfo.birthYearAndMonth.getMonth() + 1}`}</Typography>
          </Box>

          {/** 匿名設定 */}
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

            <Switch defaultChecked={accountInfo.isAnonymous} />
          </Box>

          {/** いいね数 */}
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

        {/** アカウント削除ボタン */}
        <Box sx={{ textAlign: 'center' }}>
          <Button variant='contained' sx={{ backgroundColor: '#F24726' }}>
            アカウント削除
          </Button>
        </Box>

        {/** 投稿小説 */}
        <Box>
          <LabelWithTooltip
            label='投稿小説'
            hasTooltip
            tooltipText='自分が投稿した小説の一覧です'
          />
        </Box>

        {/** 読者登録小説（閲覧小説とかの表現の方がベターかも） */}
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
