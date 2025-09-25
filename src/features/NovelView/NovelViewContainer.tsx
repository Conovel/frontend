import NovelViewPresentation from './NovelViewPresentation';
import { useState, useCallback, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sentence } from '../../types/types';
import {
  useSentenceDetail /* , useCreateSentence */,
} from '../../hooks/api/useSentenceApi';
import { CircularProgress, Box } from '@mui/material';
import {
  buildInitialData,
  INITIAL_SENTENCE_ID,
  addNewSentence,
  getParallelSentences as getMockParallelSentences,
} from './mocks/data';

export const NovelViewContainer = () => {
  // URLパラメータを取得
  const { titleId: urlTitleId, sentenceId: urlSentenceId } = useParams<{
    titleId?: string;
    sentenceId?: string;
  }>();
  const navigate = useNavigate();

  // デフォルト値を設定
  const titleId = urlTitleId || '1';
  const sentenceId = urlSentenceId || INITIAL_SENTENCE_ID.toString();

  const [startIndexParent, setStartIndexParent] = useState(0);
  const [startIndexChildren, setStartIndexChildren] = useState(0);

  // MainPanelの評価状態を追跡
  const hasMainPanelEvaluationRef = useRef(false);

  // データの状態管理
  const [mainPanel, setMainPanel] = useState<Sentence[]>([]);
  const [parentPanel, setParentPanel] = useState<Sentence[]>([]);
  const [childrenPanel, setChildrenPanel] = useState<Sentence[]>([]);

  // 現在のsentenceIdと関連するパラレル投稿の管理
  const currentSentenceIdRef = useRef<number>(
    sentenceId ? parseInt(sentenceId, 10) : INITIAL_SENTENCE_ID,
  );

  // パラレル投稿管理用の状態
  const currentParallelIndexRef = useRef(0);
  const [parallelSentences, setParallelSentences] = useState<Sentence[]>([]);
  const [originalMainSentence, setOriginalMainSentence] =
    useState<Sentence | null>(null);

  // API呼び出し
  const { data: sentenceData, loading, error } = useSentenceDetail(sentenceId);
  // const createSentenceMutation = useCreateSentence();

  // APIレスポンスを内部のSentence型に変換
  const convertToSentence = useCallback(
    (safeSentence: any): Sentence => ({
      sentenceId: safeSentence.sentenceId,
      sentence: safeSentence.sentence,
      sentenceUserId: safeSentence.userId,
      sentenceUserName: safeSentence.userName || '',
      profileIconImage: '',
      evaluationGoodCount: safeSentence.likeCount || 0,
      evaluationStayCount: 0,
      createdAt: safeSentence.createdAt,
      updatedAt: safeSentence.updatedAt,
    }),
    [],
  );

  // APIデータが更新されたときの処理
  useEffect(() => {
    if (sentenceData) {
      const targetId = sentenceId
        ? parseInt(sentenceId, 10)
        : INITIAL_SENTENCE_ID;
      currentSentenceIdRef.current = targetId;

      // メイン、親、パラレル、子の投稿を設定
      if (sentenceData.main) {
        setMainPanel([convertToSentence(sentenceData.main)]);
      }
      if (sentenceData.parent) {
        setParentPanel([convertToSentence(sentenceData.parent)]);
      } else {
        setParentPanel([]);
      }
      if (sentenceData.parallels && sentenceData.parallels.length > 0) {
        setParallelSentences(sentenceData.parallels.map(convertToSentence));
      } else {
        setParallelSentences([]);
      }
      if (sentenceData.children && sentenceData.children.length > 0) {
        setChildrenPanel(sentenceData.children.map(convertToSentence));
      } else {
        setChildrenPanel([]);
      }

      // パラレル投稿の初期設定
      if (sentenceData.main) {
        const currentMainSentence = convertToSentence(sentenceData.main);
        setOriginalMainSentence(currentMainSentence);

        // 現在のsentenceがパラレル投稿の中にある場合、そのインデックスを設定
        if (sentenceData.parallels) {
          const parallels = sentenceData.parallels.map(convertToSentence);
          const currentIndex = parallels.findIndex(
            (p: Sentence) => p.sentenceId === targetId,
          );

          if (currentIndex >= 0) {
            currentParallelIndexRef.current = currentIndex;
          } else {
            currentParallelIndexRef.current = -1;
          }
        }

        // MainPanelの評価状態を設定
        hasMainPanelEvaluationRef.current = false;
      }
    } else if (error) {
      // エラー時はモックデータを使用
      const targetId = sentenceId
        ? parseInt(sentenceId, 10)
        : INITIAL_SENTENCE_ID;
      const newData = buildInitialData(targetId);
      if (newData) {
        setMainPanel(newData.main);
        setParentPanel(newData.parent);
        setChildrenPanel(newData.children);

        // パラレル投稿を取得（現在のMainPanelのセンテンスから）
        const currentMainSentence = newData.main[0];
        if (currentMainSentence) {
          const parallels = getMockParallelSentences(
            currentMainSentence.sentenceId,
          );
          setParallelSentences(parallels);

          // 現在のsentenceがパラレル投稿の中にある場合、そのインデックスを設定
          const currentIndex = parallels.findIndex(
            (p) => p.sentenceId === targetId,
          );

          if (currentIndex >= 0) {
            currentParallelIndexRef.current = currentIndex;
            setMainPanel([parallels[currentIndex]]);
          }

          setOriginalMainSentence(currentMainSentence);
        }

        // MainPanelの評価状態を設定
        hasMainPanelEvaluationRef.current = false;
      }
    }
  }, [sentenceData, error, sentenceId, convertToSentence]);

  // パネルクリックイベントハンドラー
  const handleParentPanelClick = useCallback(
    (clickedSentence: Sentence) => {
      console.log('Parent panel clicked: ', clickedSentence);
      const parentId = clickedSentence.sentenceId.toString();
      navigate(`/titles/${titleId}/sentences/${parentId}`);
    },
    [navigate, titleId],
  );

  // const handleChildrenPanelClick = useCallback(
  //   (clickedSentence: Sentence) => {
  //     console.log('Children panel clicked: ', clickedSentence);
  //     const childId = clickedSentence.sentenceId.toString();
  //     navigate(`/titles/${titleId}/sentences/${childId}`);
  //   },
  //   [navigate, titleId],
  // );

  const handleMainPanelClick = useCallback(() => {
    console.log('Main panel clicked');
    if (originalMainSentence) {
      const mainId = originalMainSentence.sentenceId.toString();
      navigate(`/titles/${titleId}/sentences/${mainId}`);
    }
  }, [navigate, titleId, originalMainSentence]);

  // 投稿機能
  // const handlePostToParent = useCallback(
  //   async (text: string) => {
  //     console.log('Posting to parent:', text);

  //     const currentMain = mainPanel[0];
  //     if (!currentMain) return;

  //     // モックデータを使用
  //     const result = addNewSentence(
  //       text,
  //       currentMain.sentenceId
  //     );
  //     if (result) {
  //       setParentPanel((prev) => [...prev, result.newSentence]);
  //     }
  //   },
  //   [mainPanel],
  // );

  const handlePostToChildren = useCallback(
    async (text: string) => {
      console.log('Posting to children:', text);

      const currentMain = mainPanel[0];
      if (!currentMain) return;

      // モックデータを使用
      const result = addNewSentence(text, currentMain.sentenceId);
      if (result) {
        setChildrenPanel((prev) => [...prev, result.newSentence]);
      }
    },
    [mainPanel],
  );

  // 評価機能
  // const handleEvaluateMain = useCallback(
  //   async (evaluation: 'good' | 'stay') => {
  //     if (hasMainPanelEvaluationRef.current) {
  //       console.log('既に評価済みです');
  //       return;
  //     }

  //     const currentMain = mainPanel[0];
  //     if (!currentMain) return;

  //     // ローカルでのみ評価カウントを更新
  //     hasMainPanelEvaluationRef.current = true;
  //     setMainPanel((prev) => {
  //       const updated = [...prev];
  //       if (evaluation === 'good') {
  //         updated[0] = {
  //           ...updated[0],
  //           evaluationGoodCount: updated[0].evaluationGoodCount + 1,
  //         };
  //       } else {
  //         updated[0] = {
  //           ...updated[0],
  //           evaluationStayCount: updated[0].evaluationStayCount + 1,
  //         };
  //       }
  //       return updated;
  //     });
  //   },
  //   [mainPanel],
  // );

  // パラレル投稿の切り替え
  const handleSwitchParallel = useCallback(
    (direction: 'prev' | 'next') => {
      if (parallelSentences.length === 0) return;

      let newIndex = currentParallelIndexRef.current;
      if (direction === 'prev') {
        newIndex = Math.max(0, newIndex - 1);
      } else {
        newIndex = Math.min(parallelSentences.length - 1, newIndex + 1);
      }

      if (newIndex !== currentParallelIndexRef.current) {
        currentParallelIndexRef.current = newIndex;
        const newSentence = parallelSentences[newIndex];
        setMainPanel([newSentence]);
        currentSentenceIdRef.current = newSentence.sentenceId;
        hasMainPanelEvaluationRef.current = false;

        // URL を更新
        navigate(`/titles/${titleId}/sentences/${newSentence.sentenceId}`);
      }
    },
    [parallelSentences, navigate, titleId],
  );

  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='400px'
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <NovelViewPresentation
      mainPanel={mainPanel}
      parentPanel={parentPanel}
      childrenPanel={childrenPanel}
      startIndexParent={startIndexParent}
      setStartIndexParent={setStartIndexParent}
      startIndexChildren={startIndexChildren}
      setStartIndexChildren={setStartIndexChildren}
      hasMainPanelEvaluation={hasMainPanelEvaluationRef.current}
      textCount={mainPanel.length + parentPanel.length + childrenPanel.length}
      titleId={titleId}
      onPost={handlePostToChildren}
      onNextParallel={() => handleSwitchParallel('next')}
      onPrevParallel={() => handleSwitchParallel('prev')}
      hasParallels={parallelSentences.length > 1}
      onParentClick={handleParentPanelClick}
      onMainPanelNavigate={handleSwitchParallel}
      onBackToOriginal={handleMainPanelClick}
      isInParallelMode={currentParallelIndexRef.current >= 0}
      canGoNext={currentParallelIndexRef.current < parallelSentences.length - 1}
      canGoPrev={currentParallelIndexRef.current > 0}
    />
  );
};

export default NovelViewContainer;
