import NovelViewPresentation from './NovelViewPresentation';
import { useState, useCallback, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { SentencesApi } from '../../api/api';
import type { Sentence } from '../../api/api';
import { axiosConfig } from '../../axiosConfig';

const sentencesApi = new SentencesApi(axiosConfig);

// 初期読み込み用のセンテンスID設定
const INITIAL_SENTENCE_ID = 5;

export const NovelViewContainer = () => {
  // URLパラメータを取得
  const { titleId: urlTitleId, sentenceId: urlSentenceId } = useParams<{
    titleId: string;
    sentenceId: string;
  }>();
  const navigate = useNavigate();

  // デフォルト値を設定
  const titleId = urlTitleId || '1';
  const sentenceId = urlSentenceId || INITIAL_SENTENCE_ID.toString();

  // MainPanelの評価状態を追跡
  const [hasMainPanelEvaluation, setHasMainPanelEvaluation] = useState(false);

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

  // URLが変更されたときにデータを更新
  useEffect(() => {
    const targetId = sentenceId
      ? parseInt(sentenceId, 10)
      : INITIAL_SENTENCE_ID;
    if (targetId !== currentSentenceIdRef.current) {
      currentSentenceIdRef.current = targetId;

      // APIから投稿データを取得
      const fetchSentenceData = async () => {
        try {
          const response = await sentencesApi.getSentenceById(targetId);
          if (!response || !response.data) {
            throw new Error('No data received from API');
          }
          const data = response.data;

          // API レスポンスを内部のSentence型に変換
          const convertToSentence = (apiSentence: any): Sentence => ({
            sentenceId: apiSentence.sentenceId,
            sentence: apiSentence.sentence,
            sentenceUserId: apiSentence.sentenceUserId,
            sentencePenName: apiSentence.sentencePenName,
            profileIconImage: apiSentence.profileIconImage,
            evaluationGoodCount: apiSentence.evaluationGoodCount,
            evaluationStayCount: apiSentence.evaluationStayCount,
            createdAt: apiSentence.createdAt,
            updatedAt: apiSentence.updatedAt,
          });

          // メイン、親、パラレル、子の投稿を設定
          if (data.main) {
            setMainPanel([convertToSentence(data.main)]);
          }
          if (data.parent) {
            setParentPanel([convertToSentence(data.parent)]);
          } else {
            setParentPanel([]);
          }
          if (data.parallels && data.parallels.length > 0) {
            setParallelSentences(data.parallels.map(convertToSentence));
          } else {
            setParallelSentences([]);
          }
          if (data.children && data.children.length > 0) {
            setChildrenPanel(data.children.map(convertToSentence));
          } else {
            setChildrenPanel([]);
          }

          // パラレル投稿の初期設定
          if (data.main) {
            const currentMainSentence = convertToSentence(data.main);
            setOriginalMainSentence(currentMainSentence);

            // 現在のsentenceがパラレル投稿の中にある場合、そのインデックスを設定
            if (data.parallels) {
              const parallels = data.parallels.map(convertToSentence);
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
            setHasMainPanelEvaluation(false);
          }
        } catch (error) {
          console.error('Error fetching sentence data:', error);
          // エラー時は空のデータを設定
          setMainPanel([]);
          setParentPanel([]);
          setChildrenPanel([]);
          setParallelSentences([]);
          setOriginalMainSentence(null);
          setHasMainPanelEvaluation(false);
        }
      };

      fetchSentenceData();
    }
  }, [sentenceId]);

  // 画面更新用の関数
  const handleRefresh = useCallback(() => {
    // 現在のデータを再取得する処理
    const targetId = currentSentenceIdRef.current;

    // データの再取得処理（既存のfetchSentenceDataのロジックを再利用）
    const fetchSentenceData = async () => {
      try {
        const response = await sentencesApi.getSentenceById(targetId);
        if (!response || !response.data) {
          throw new Error('No data received from API');
        }
        const data = response.data;

        // API レスポンスを内部のSentence型に変換
        const convertToSentence = (apiSentence: any): Sentence => ({
          sentenceId: apiSentence.sentenceId,
          sentence: apiSentence.sentence,
          sentenceUserId: apiSentence.sentenceUserId,
          sentencePenName: apiSentence.sentencePenName,
          profileIconImage: apiSentence.profileIconImage || '',
          evaluationGoodCount: apiSentence.evaluationGoodCount || 0,
          evaluationStayCount: apiSentence.evaluationStayCount || 0,
          createdAt: apiSentence.createdAt,
          updatedAt: apiSentence.updatedAt,
        });

        // メイン、親、パラレル、子の投稿を設定
        if (data.main) {
          setMainPanel([convertToSentence(data.main)]);
        }
        if (data.parent) {
          setParentPanel([convertToSentence(data.parent)]);
        } else {
          setParentPanel([]);
        }
        if (data.parallels && data.parallels.length > 0) {
          setParallelSentences(data.parallels.map(convertToSentence));
        } else {
          setParallelSentences([]);
        }
        if (data.children && data.children.length > 0) {
          setChildrenPanel(data.children.map(convertToSentence));
        } else {
          setChildrenPanel([]);
        }

        // パラレル投稿の初期設定
        if (data.main) {
          const currentMainSentence = convertToSentence(data.main);
          setOriginalMainSentence(currentMainSentence);

          // 現在のsentenceがパラレル投稿の中にある場合、そのインデックスを設定
          if (data.parallels) {
            const parallels = data.parallels.map(convertToSentence);
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
          setHasMainPanelEvaluation(false);
        }
      } catch (error) {
        console.error('Error refreshing sentence data:', error);
        // エラー時は空のデータを設定
        setMainPanel([]);
        setParentPanel([]);
        setChildrenPanel([]);
        setParallelSentences([]);
        setOriginalMainSentence(null);
        setHasMainPanelEvaluation(false);
      }
    };

    fetchSentenceData();
  }, []);

  // 評価成功時の処理
  const handleEvaluationSuccess = useCallback(() => {
    setHasMainPanelEvaluation(true);
  }, []);

  // センテンスの評価状態を取得する関数
  const getSentenceEvaluation = useCallback(async (sentenceId: number) => {
    try {
      // 現在のAPIには評価状態を取得する専用のエンドポイントがないため、
      // センテンスデータから評価情報を取得
      const response = await sentencesApi.getSentenceById(sentenceId);
      if (response && response.data && response.data.main) {
        const sentence = response.data.main;
        return {
          goodCount: sentence.evaluationGoodCount || 0,
          stayCount: sentence.evaluationStayCount || 0,
          isGoodEvaluated: false, // 現在のユーザーの評価状態は別途管理が必要
          isStayEvaluated: false, // 現在のユーザーの評価状態は別途管理が必要
        };
      }
      return {
        goodCount: 0,
        stayCount: 0,
        isGoodEvaluated: false,
        isStayEvaluated: false,
      };
    } catch (error) {
      console.error('Error fetching sentence evaluation:', error);
      return {
        goodCount: 0,
        stayCount: 0,
        isGoodEvaluated: false,
        isStayEvaluated: false,
      };
    }
  }, []);

  // 新しいmainパネルのchildrenデータを取得する共通関数
  const updateChildrenPanelForMain = useCallback(async (sentenceId: number) => {
    try {
      const response = await sentencesApi.getSentenceById(sentenceId);
      if (response && response.data && response.data.children) {
        const convertToSentence = (apiSentence: any): Sentence => ({
          sentenceId: apiSentence.sentenceId,
          sentence: apiSentence.sentence,
          sentenceUserId: apiSentence.sentenceUserId,
          sentencePenName: apiSentence.sentencePenName,
          profileIconImage: apiSentence.profileIconImage || '',
          evaluationGoodCount: apiSentence.evaluationGoodCount || 0,
          evaluationStayCount: apiSentence.evaluationStayCount || 0,
          createdAt: apiSentence.createdAt,
          updatedAt: apiSentence.updatedAt,
        });
        setChildrenPanel(response.data.children.map(convertToSentence));
      } else {
        setChildrenPanel([]);
      }
    } catch (error) {
      console.error('Error fetching children data:', error);
      // エラー時は空のデータを設定
      setChildrenPanel([]);
    }
  }, []);

  // パラレル投稿のナビゲーション関数
  const handleNextParallel = useCallback(async () => {
    if (
      parallelSentences.length > 0 &&
      currentParallelIndexRef.current < parallelSentences.length - 1
    ) {
      const nextIndex = currentParallelIndexRef.current + 1;
      const nextSentence = parallelSentences[nextIndex];
      currentParallelIndexRef.current = nextIndex;

      // MainPanelの内容を更新（URLは変更しない）
      setMainPanel([nextSentence]);

      // 新しいmainパネルのchildrenデータを取得
      await updateChildrenPanelForMain(nextSentence.sentenceId || 0);

      // 評価状態をリセット
      setHasMainPanelEvaluation(false);
    } else if (
      parallelSentences.length > 0 &&
      currentParallelIndexRef.current === -1
    ) {
      // 初期状態から最初のパラレル投稿に遷移
      const firstSentence = parallelSentences[0];
      currentParallelIndexRef.current = 0;
      setMainPanel([firstSentence]);

      // 新しいmainパネルのchildrenデータを取得
      await updateChildrenPanelForMain(firstSentence.sentenceId || 0);

      // 評価状態をリセット
      setHasMainPanelEvaluation(false);
    }
  }, [parallelSentences, updateChildrenPanelForMain]);

  const handlePrevParallel = useCallback(async () => {
    if (parallelSentences.length > 0 && currentParallelIndexRef.current >= 0) {
      if (currentParallelIndexRef.current === 0) {
        // 最初のパラレル投稿の場合は元の投稿に戻る
        if (originalMainSentence) {
          setMainPanel([originalMainSentence]);
          currentParallelIndexRef.current = -1;

          // 元のmainパネルのchildrenデータを取得
          await updateChildrenPanelForMain(
            originalMainSentence.sentenceId || 0,
          );

          // 評価状態をリセット
          setHasMainPanelEvaluation(false);
        }
      } else {
        // それ以外の場合は前のパラレル投稿に移動
        const prevIndex = currentParallelIndexRef.current - 1;
        const prevSentence = parallelSentences[prevIndex];
        currentParallelIndexRef.current = prevIndex;

        // MainPanelの内容を更新（URLは変更しない）
        setMainPanel([prevSentence]);

        // 新しいmainパネルのchildrenデータを取得
        await updateChildrenPanelForMain(prevSentence.sentenceId || 0);

        // 評価状態をリセット
        setHasMainPanelEvaluation(false);
      }
    }
  }, [parallelSentences, originalMainSentence, updateChildrenPanelForMain]);

  // 元のMainPanelに戻る関数
  const handleBackToOriginal = useCallback(async () => {
    if (originalMainSentence) {
      // 元のMainPanelの内容に戻す
      setMainPanel([originalMainSentence]);

      // パラレル投稿の状態をリセット（初期状態に戻す）
      currentParallelIndexRef.current = -1;

      // 元のmainパネルのchildrenデータを取得
      await updateChildrenPanelForMain(originalMainSentence.sentenceId || 0);

      // 評価状態をリセット
      setHasMainPanelEvaluation(false);
    }
  }, [originalMainSentence, updateChildrenPanelForMain]);

  // ParentPanelがクリックされたときのハンドラー
  const handleParentClick = useCallback(
    (clickedSentence: any) => {
      // ParentPanelの投稿をクリックしたときは、その投稿をmainに移動
      navigate(`/novelView/${titleId || '1'}/${clickedSentence.sentenceId}`);
    },
    [navigate, titleId],
  );

  // MainPanelのナビゲーション処理（コンテンツ内での移動）
  const handleMainPanelNavigate = useCallback((_direction: 'prev' | 'next') => {
    // MainPanel内でのナビゲーションは現在のsentenceの前後の関連投稿を表示
    // 実装は今後の拡張として残す
  }, []);

  // パラレル投稿が存在するかどうか（1つ以上のパラレル投稿がある場合）
  const hasParallels = parallelSentences.length > 0;

  // パラレルモードかどうか（パラレル投稿に遷移しているかどうか）
  const isInParallelMode =
    parallelSentences.length > 0 && currentParallelIndexRef.current >= 0;

  // パラレル投稿のナビゲーション状態
  const canGoNext =
    parallelSentences.length > 0 &&
    (currentParallelIndexRef.current === -1 ||
      currentParallelIndexRef.current < parallelSentences.length - 1);
  const canGoPrev =
    parallelSentences.length > 0 && currentParallelIndexRef.current >= 0;

  // デバッグ用のログ出力
  return (
    <NovelViewPresentation
      mainPanel={mainPanel}
      parentPanel={parentPanel}
      childrenPanel={childrenPanel}
      startIndexParent={0}
      hasMainPanelEvaluation={hasMainPanelEvaluation}
      textCount={mainPanel.length + parentPanel.length + childrenPanel.length} // 実際のデータの総数
      onNextParallel={handleNextParallel}
      onPrevParallel={handlePrevParallel}
      hasParallels={hasParallels}
      onParentClick={handleParentClick}
      onMainPanelNavigate={handleMainPanelNavigate}
      onBackToOriginal={handleBackToOriginal}
      isInParallelMode={isInParallelMode}
      canGoNext={canGoNext}
      canGoPrev={canGoPrev}
      onEvaluationSuccess={handleEvaluationSuccess}
      onPostSuccess={handleRefresh}
      getSentenceEvaluation={getSentenceEvaluation}
    />
  );
};
