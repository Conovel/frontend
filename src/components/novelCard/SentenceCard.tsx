import { useRef, useState, useEffect } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import GoodButton from '../buttonicon/GoodButton';
import StayButton from '../buttonicon/StayButton';
import { EvaluationsApi, EvaluateSentence, Sentence } from '../../api/api';
import { axiosConfig } from '../../axiosConfig';

interface SentenceWithOptionalUserName extends Sentence {
  userName?: string;
}

interface SentenceCardProps {
  sentence: SentenceWithOptionalUserName;
  canEvaluate?: boolean;
  onClick?: () => void;
  onEvaluationSuccess?: () => void;
  isInteractionDisabled?: boolean;
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
  isInteractionDisabled = false,
  getSentenceEvaluation: _getSentenceEvaluation,
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
  const avatarSrc = sentence.profileIconImage?.trim() || undefined;

  const busyRef = useRef(false); // prevent duplicate submissions
  const abortRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef<number>(0); // track latest evaluation request

  useEffect(() => {
    setLocalGoodCount(sentence.evaluationGoodCount || 0);
    setLocalStayCount(sentence.evaluationStayCount || 0);
  }, [
    sentence.sentenceId,
    sentence.evaluationGoodCount,
    sentence.evaluationStayCount,
  ]);

  useEffect(() => {
    if (sentence.userEvaluation === 'good') {
      setIsGoodEvaluated(true);
      setIsStayEvaluated(false);
    } else if (sentence.userEvaluation === 'stay') {
      setIsGoodEvaluated(false);
      setIsStayEvaluated(true);
    } else {
      setIsGoodEvaluated(false);
      setIsStayEvaluated(false);
    }
  }, [sentence.sentenceId, sentence.userEvaluation]);

  const evaluationsApi = new EvaluationsApi(axiosConfig);

  // Handle Good/Stay evaluation button clicks
  const handleEvaluationClick = async (
    evaluationType: 'good' | 'stay',
  ): Promise<void> => {
    if (busyRef.current || !canEvaluate) return;
    const sentenceId = sentence.sentenceId;
    if (!sentenceId) {
      console.warn('sentenceが評価できません: sentenceIdがありません');
      return;
    }
    if (busyRef.current) return;
    busyRef.current = true;
    setIsEvaluating(true);
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    const currentRequestId = ++requestIdRef.current;
    try {
      const evaluateSentence: EvaluateSentence = {
        sentenceId,
        evaluation: evaluationType,
      };
      const response = await evaluationsApi.evaluateSentence(evaluateSentence);
      if (currentRequestId === requestIdRef.current) {
        const { evaluationGoodCount, evaluationStayCount } =
          response?.data || {};
        if (typeof evaluationGoodCount === 'number')
          setLocalGoodCount(evaluationGoodCount);
        if (typeof evaluationStayCount === 'number')
          setLocalStayCount(evaluationStayCount);
        // レスポンスにはuserEvaluationが含まれないため、送信した評価タイプで状態を更新
        setIsGoodEvaluated(evaluationType === 'good');
        setIsStayEvaluated(evaluationType === 'stay');
        if (onEvaluationSuccess) onEvaluationSuccess();
      }
    } catch (error) {
      if (
        currentRequestId === requestIdRef.current &&
        (error as any).name !== 'AbortError'
      ) {
        console.error('評価エラー:', error);
      }
    } finally {
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
        width: '100%',
        boxSizing: 'border-box',
        opacity: isInteractionDisabled ? 0.6 : 1,
        cursor: onClick
          ? isInteractionDisabled
            ? 'not-allowed'
            : 'pointer'
          : 'default',
      }}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      <Box
        sx={{
          border: '1px solid #000',
          padding: '1vh 1vw',
          borderRadius: '1vh',
          boxSizing: 'border-box',
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
        onClick={(e) => {
          // 評価ボタンのクリックイベントが親に伝播しないようにする
          e.stopPropagation();
        }}
      >
        <GoodButton
          evaluationGoodCount={localGoodCount}
          isEvaluated={isGoodEvaluated}
          onClick={() => handleEvaluationClick('good')}
          disabled={!canEvaluate || isEvaluating}
        />
        <StayButton
          evaluationStayCount={localStayCount}
          isEvaluated={isStayEvaluated}
          disabled={!canEvaluate || isEvaluating}
          onClick={() => handleEvaluationClick('stay')}
        />
      </Box>
    </Box>
  );
};

export default SentenceCard;
