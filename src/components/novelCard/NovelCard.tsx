import { useRef, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import ThumbUpButton from '../buttonicon/ThumbsUpButton';
import NextPlanButton from '../buttonicon/NextPlanButton';
import { EvaluationsApi, EvaluateSentence } from '../../api/api';
import { axiosConfig } from '../../axiosConfig';

interface NovelCardProps {
  sentence: string;
  userName: string;
  sentenceId: number;
  evaluationGoodCount: number;
  evaluationStayCount: number;
  isGoodEvaluated: boolean;
  isStayEvaluated: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const NovelCard = ({
  sentence,
  userName,
  sentenceId,
  onClick,
  evaluationGoodCount,
  evaluationStayCount,
  isGoodEvaluated,
  isStayEvaluated,
  disabled = false,
}: NovelCardProps) => {
  const [localGoodCount, setLocalGoodCount] = useState(evaluationGoodCount);
  const [localStayCount, setLocalStayCount] = useState(evaluationStayCount);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const busyRef = useRef(false); // 再入防止
  const abortRef = useRef<AbortController | null>(null);

  const evaluationsApi = new EvaluationsApi(axiosConfig);
  const handleGoodCountClick = async (): Promise<void> => {
    if (busyRef.current || disabled) return; // 連打無視
    busyRef.current = true;
    setIsEvaluating(true);

    // 既存リクエストがあれば中断（任意）
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    try {
      const evaluateSentence: EvaluateSentence = {
        sentenceId: sentenceId,
        evaluation: 'good',
      };

      const response = await evaluationsApi.evaluateSentence(evaluateSentence);
      if (response?.data) {
        setLocalGoodCount(
          response.data.evaluationGoodCount || localGoodCount + 1,
        );
      } else {
        setLocalGoodCount(localGoodCount + 1);
      }
    } catch (error) {
      if ((error as any).name !== 'AbortError') {
        console.error('評価エラー:', error);
        // エラー時はローカルでカウントアップ
        setLocalGoodCount(localGoodCount + 1);
      }
    } finally {
      setIsEvaluating(false);
      busyRef.current = false;
    }
  };

  return (
    <Box
      component='div'
      sx={{
        fontSize: '0.8rem',
        position: 'relative',
        backgroundColor: '#fff',
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      onClick={() => {
        if (!disabled && onClick) {
          onClick();
        }
      }}
    >
      <Box
        sx={{
          border: '1px solid #000',
          padding: '1vh 1vw',
          borderRadius: '1vh',
        }}
      >
        {/* 小説のテキストを表示するテキストボックス */}
        <Box
          sx={{
            alignItems: 'flex-start',
            height: '20vh',
          }}
        >
          <Avatar sx={{ width: 24, height: 24, zIndex: 2 }}>
            {(userName || 'U').charAt(0)}
          </Avatar>
          <Typography
            sx={{
              marginTop: '0.5vh',
              fontSize: '1rem',
              height: '8vh',
            }}
          >
            {sentence}
          </Typography>
        </Box>
      </Box>

      {/* 評価ボタンは常に表示し、評価関連のプロパティが存在しない場合は無効化 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginTop: '0.1vh',
          backgroundColor: 'transparent',
        }}
      >
        <ThumbUpButton
          evaluationGoodCount={localGoodCount}
          isEvaluated={isGoodEvaluated}
          onClick={handleGoodCountClick}
          disabled={disabled || isEvaluating}
        />
        <NextPlanButton
          evaluationStayCount={localStayCount}
          setEvaluationStayCount={setLocalStayCount}
          isEvaluated={isStayEvaluated}
          sentenceId={sentenceId}
          disabled={disabled || isEvaluating}
        />
      </Box>
    </Box>
  );
};

export default NovelCard;
