import { useRef, useState, useEffect } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import ThumbUpButton from '../buttonicon/ThumbsUpButton';
import NextPlanButton from '../buttonicon/NextPlanButton';
import { EvaluationsApi, EvaluateSentence } from '../../api/api';
import { axiosConfig } from '../../axiosConfig';
import { Sentence } from '../../types/types';

interface SentenceWithOptionalUserName extends Sentence {
  userName?: string;
}

interface SentenceCardProps {
  sentence: SentenceWithOptionalUserName;
  canEvaluate?: boolean;
  onClick?: () => void;
  onEvaluationSuccess?: () => void;
  getSentenceEvaluation?: (sentenceId: number) => Promise<{
    goodCount: number;
    stayCount: number;
    isGoodEvaluated: boolean;
    isStayEvaluated: boolean;
  }>;
}

const SentenceCard = ({
  sentence,
  canEvaluate = true,
  onClick,
  onEvaluationSuccess,
  getSentenceEvaluation,
}: SentenceCardProps) => {
  const [localGoodCount, setLocalGoodCount] = useState(
    sentence.evaluationGoodCount || 0,
  );
  const [localStayCount, setLocalStayCount] = useState(
    sentence.evaluationStayCount || 0,
  );
  const [isGoodEvaluated, setIsGoodEvaluated] = useState(false);
  const [isStayEvaluated, setIsStayEvaluated] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const displayName = sentence.userName || sentence.sentencePenName || '';
  const avatarText = displayName.trim().charAt(0) || 'U';
  const avatarSrc = sentence.profileIconImage || undefined;

  const busyRef = useRef(false); // 再入防止
  const abortRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef<number>(0); // リクエストIDで最新のリクエストのみ処理

  // 評価状態を取得
  useEffect(() => {
    const fetchEvaluation = async () => {
      if (!getSentenceEvaluation || !sentence.sentenceId) return;

      try {
        const evalData = await getSentenceEvaluation(sentence.sentenceId);
        setIsGoodEvaluated(evalData.isGoodEvaluated);
        setIsStayEvaluated(evalData.isStayEvaluated);
      } catch (error) {
        console.error('Error fetching evaluation:', error);
      }
    };
    fetchEvaluation();
  }, [sentence.sentenceId, getSentenceEvaluation]);

  const evaluationsApi = new EvaluationsApi(axiosConfig);
  const handleGoodCountClick = async (): Promise<void> => {
    if (busyRef.current || !canEvaluate) return; // 連打無視

    const sentenceId = sentence.sentenceId;
    if (!sentenceId) {
      console.warn('sentenceが評価できません: sentenceIdがありません');
      return;
    }

    // アトミックな操作でbusyフラグを設定
    if (busyRef.current) return; // 二重チェック
    busyRef.current = true;
    setIsEvaluating(true);

    // 既存リクエストがあれば中断
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    // リクエストIDをインクリメント（最新のリクエストのみ処理）
    const currentRequestId = ++requestIdRef.current;

    try {
      const evaluateSentence: EvaluateSentence = {
        sentenceId,
        evaluation: 'good',
      };

      const response = await evaluationsApi.evaluateSentence(evaluateSentence);

      // 最新のリクエストかどうかをチェック
      if (currentRequestId === requestIdRef.current) {
        const serverGoodCount = response?.data?.evaluationGoodCount;
        if (typeof serverGoodCount === 'number') {
          setLocalGoodCount(serverGoodCount);
          if (onEvaluationSuccess) {
            onEvaluationSuccess();
          }
        } else {
          console.warn('評価エラー: evaluationGoodCount is not a number');
        }
      }
    } catch (error) {
      // 最新のリクエストかつAbortErrorでない場合のみエラー処理
      if (
        currentRequestId === requestIdRef.current &&
        (error as any).name !== 'AbortError'
      ) {
        console.error('評価エラー:', error);
      }
    } finally {
      // 最新のリクエストの場合のみ状態をリセット
      if (currentRequestId === requestIdRef.current) {
        setIsEvaluating(false);
        busyRef.current = false;
      }
    }
  };

  return (
    <Box
      component='div'
      sx={{
        fontSize: '0.8rem',
        position: 'relative',
        backgroundColor: '#fff',
        opacity: !canEvaluate ? 0.6 : 1,
        cursor: !canEvaluate ? 'not-allowed' : 'pointer',
      }}
      onClick={() => {
        if (canEvaluate && onClick) {
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
          <Avatar
            sx={{ width: 24, height: 24, zIndex: 2 }}
            src={avatarSrc}
            alt={displayName || 'User avatar'}
          >
            {avatarText}
          </Avatar>
          <Typography
            sx={{
              marginTop: '0.5vh',
              fontSize: '1rem',
              height: '8vh',
            }}
          >
            {sentence.sentence || ''}
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
          disabled={!canEvaluate || isEvaluating}
        />
        <NextPlanButton
          evaluationStayCount={localStayCount}
          setEvaluationStayCount={setLocalStayCount}
          isEvaluated={isStayEvaluated}
          sentenceId={sentence.sentenceId || 0}
          disabled={!canEvaluate || isEvaluating}
          onEvaluationSuccess={onEvaluationSuccess}
        />
      </Box>
    </Box>
  );
};

export default SentenceCard;
