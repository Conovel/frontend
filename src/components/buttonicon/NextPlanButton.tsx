import React, { useState } from 'react';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { EvaluationsApi, EvaluateSentence } from '../../api/api';
import { axiosConfig } from '../../axiosConfig';

interface NextPlanButtonProps {
  evaluationStayCount: number;
  setEvaluationStayCount: React.Dispatch<React.SetStateAction<number>>;
  isEvaluated: boolean;
  disabled?: boolean;
  sentenceId: number;
}

const NextPlanButton: React.FC<NextPlanButtonProps> = ({
  evaluationStayCount,
  setEvaluationStayCount,
  isEvaluated,
  disabled = false,
  sentenceId,
}) => {
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleClick = async () => {
    if (!disabled && !isEvaluating) {
      setIsEvaluating(true);
      try {
        const evaluationsApi = new EvaluationsApi(axiosConfig);
        const evaluateSentence: EvaluateSentence = {
          sentenceId: sentenceId,
          evaluation: 'stay',
        };

        const response =
          await evaluationsApi.evaluateSentence(evaluateSentence);
        if (response?.data) {
          setEvaluationStayCount(
            response.data.evaluationStayCount || evaluationStayCount + 1,
          );
        } else {
          setEvaluationStayCount(evaluationStayCount + 1);
        }
      } catch (error) {
        console.error('評価エラー:', error);
        // エラー時はローカルでカウント更新
        setEvaluationStayCount(evaluationStayCount + 1);
      } finally {
        setIsEvaluating(false);
      }
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
