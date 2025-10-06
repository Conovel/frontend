import React, { useRef } from 'react';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { EvaluationsApi, EvaluateSentence } from '../../api/api';
import { axiosConfig } from '../../axiosConfig';

interface NextPlanButtonProps {
  evaluationStayCount: number;
  setEvaluationStayCount: React.Dispatch<React.SetStateAction<number>>;
  isEvaluated: boolean;
  disabled?: boolean;
  sentenceId: number;
  onEvaluationSuccess?: () => void;
}

const NextPlanButton: React.FC<NextPlanButtonProps> = ({
  evaluationStayCount,
  setEvaluationStayCount,
  isEvaluated,
  disabled = false,
  sentenceId,
  onEvaluationSuccess,
}) => {
  const busyRef = useRef(false); // 再入防止
  const abortRef = useRef<AbortController | null>(null);

  const handleClick = async () => {
    if (busyRef.current || disabled) return; // 連打無視
    busyRef.current = true;

    // 既存リクエストがあれば中断（任意）
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    try {
      const evaluationsApi = new EvaluationsApi(axiosConfig);
      const evaluateSentence: EvaluateSentence = {
        sentenceId: sentenceId,
        evaluation: 'stay',
      };

      const response = await evaluationsApi.evaluateSentence(evaluateSentence);
      if (response?.data) {
        setEvaluationStayCount(
          response.data.evaluationStayCount || evaluationStayCount + 1,
        );
      } else {
        setEvaluationStayCount(evaluationStayCount + 1);
      }

      // 評価成功時に親コンポーネントに通知
      if (onEvaluationSuccess) {
        onEvaluationSuccess();
      }
    } catch (error) {
      if ((error as any).name !== 'AbortError') {
        console.error('評価エラー:', error);
        // エラー時はローカルでカウント更新
        setEvaluationStayCount(evaluationStayCount + 1);
      }
    } finally {
      busyRef.current = false;
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        marginRight: '10px',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      <SentimentVeryDissatisfiedIcon
        color={isEvaluated ? 'primary' : 'action'}
      />
      <span style={{ marginLeft: '4px' }}>{evaluationStayCount}</span>
    </div>
  );
};

export default NextPlanButton;
