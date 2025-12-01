import NovelViewPresentation from './NovelViewPresentation';
import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router';
import { SentencesApi } from '../../api/api';
import type { Sentence } from '../../api/api';
import { axiosConfig } from '../../axiosConfig';

const sentencesApi = new SentencesApi(axiosConfig);
const EVALUATED_STORAGE_KEY = 'novelViewEvaluatedSentenceIds';

const loadStoredEvaluatedSentenceIds = (): Set<number> => {
  if (typeof window === 'undefined') return new Set<number>();
  try {
    const stored = window.sessionStorage.getItem(EVALUATED_STORAGE_KEY);
    if (!stored) return new Set<number>();
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      return new Set(
        parsed.filter((value): value is number => typeof value === 'number'),
      );
    }
  } catch (error) {
    console.warn('Failed to load evaluated sentence IDs from storage:', error);
  }
  return new Set<number>();
};

export const NovelViewContainer = () => {
  // URLパラメータを取得
  const { titleId, sentenceId } = useParams<{
    titleId?: string;
    sentenceId?: string;
  }>();
  const navigate = useNavigate();

  const parsedTitleId = useMemo(() => {
    if (!titleId || !/^\d+$/.test(titleId)) return null;
    return parseInt(titleId, 10);
  }, [titleId]);

  const parsedSentenceId = useMemo(() => {
    if (!sentenceId || !/^\d+$/.test(sentenceId)) return null;
    return parseInt(sentenceId, 10);
  }, [sentenceId]);

  const hasInvalidParams = parsedTitleId === null || parsedSentenceId === null;

  // MainPanelの評価状態を追跡
  const [hasMainPanelEvaluation, setHasMainPanelEvaluation] = useState(false);
  const [evaluatedVersion, setEvaluatedVersion] = useState(0);

  const storedEvaluatedIds = useMemo(
    () => loadStoredEvaluatedSentenceIds(),
    [],
  );
  // 評価済みのセンテンスIDを追跡
  const evaluatedSentenceIdsRef = useRef<Set<number>>(storedEvaluatedIds);

  const persistEvaluatedSentenceIds = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      window.sessionStorage.setItem(
        EVALUATED_STORAGE_KEY,
        JSON.stringify(Array.from(evaluatedSentenceIdsRef.current)),
      );
    } catch (error) {
      console.warn('Failed to persist evaluated sentence IDs:', error);
    }
  }, []);

  const markSentenceAsEvaluated = useCallback(
    (sentenceId?: number | null) => {
      if (!sentenceId) return;
      if (!evaluatedSentenceIdsRef.current.has(sentenceId)) {
        evaluatedSentenceIdsRef.current.add(sentenceId);
        persistEvaluatedSentenceIds();
        setEvaluatedVersion((prev) => prev + 1);
      }
    },
    [persistEvaluatedSentenceIds],
  );

  // データの状態管理
  const [mainPanel, setMainPanel] = useState<Sentence[]>([]);
  const [parentPanel, setParentPanel] = useState<Sentence[]>([]);
  const [childrenPanel, setChildrenPanel] = useState<Sentence[]>([]);
  const hasParentEvaluation = useMemo(() => {
    const parent = parentPanel[0];
    if (!parent?.sentenceId) return true;
    return (
      Boolean(parent.userEvaluation) ||
      evaluatedSentenceIdsRef.current.has(parent.sentenceId)
    );
  }, [parentPanel, evaluatedVersion]);

  // 現在のsentenceIdと関連するパラレル投稿の管理
  const currentSentenceIdRef = useRef<number>(parsedSentenceId ?? 0);

  // パラレル投稿管理用の状態
  const currentParallelIndexRef = useRef(0);
  const [parallelSentences, setParallelSentences] = useState<Sentence[]>([]);
  const [originalMainSentence, setOriginalMainSentence] =
    useState<Sentence | null>(null);

  // Sentence型への変換
  const convertToSentence = (apiSentence: any): Sentence => ({
    sentenceId: apiSentence.sentenceId,
    sentence: apiSentence.sentence,
    sentenceUserId: apiSentence.sentenceUserId,
    sentencePenName: apiSentence.sentencePenName,
    profileIconImage: apiSentence.profileIconImage || '',
    evaluationGoodCount: apiSentence.evaluationGoodCount || 0,
    evaluationStayCount: apiSentence.evaluationStayCount || 0,
    userEvaluation: apiSentence.userEvaluation || null,
    createdAt: apiSentence.createdAt,
    updatedAt: apiSentence.updatedAt,
  });

  // 投稿データ取得処理
  const fetchSentenceData = useCallback(
    async (targetId: number) => {
      if (!targetId) return;
      currentSentenceIdRef.current = targetId;
      try {
        const response = await sentencesApi.getSentenceById(targetId);
        if (!response || !response.data) {
          throw new Error('No data received from API');
        }
        const data = response.data;

        if (data.main) setMainPanel([convertToSentence(data.main)]);
        if (data.parent) setParentPanel([convertToSentence(data.parent)]);
        else setParentPanel([]);
        if (data.parallels && data.parallels.length > 0)
          setParallelSentences(data.parallels.map(convertToSentence));
        else setParallelSentences([]);
        if (data.children && data.children.length > 0)
          setChildrenPanel(data.children.map(convertToSentence));
        else setChildrenPanel([]);

        if (data.main) {
          const currentMainSentence = convertToSentence(data.main);
          setOriginalMainSentence(currentMainSentence);
          if (data.parallels) {
            const parallels = data.parallels.map(convertToSentence);
            const currentIndex = parallels.findIndex(
              (p: Sentence) => p.sentenceId === targetId,
            );
            currentParallelIndexRef.current =
              currentIndex >= 0 ? currentIndex : -1;
          }

          if (data.main.userEvaluation && data.main.sentenceId) {
            markSentenceAsEvaluated(data.main.sentenceId);
          }
          if (data.parent?.userEvaluation && data.parent.sentenceId) {
            markSentenceAsEvaluated(data.parent.sentenceId);
          }
          if (data.parallels) {
            data.parallels.forEach((p: any) => {
              if (p.userEvaluation && p.sentenceId) {
                markSentenceAsEvaluated(p.sentenceId);
              }
            });
          }
          if (data.children) {
            data.children.forEach((c: any) => {
              if (c.userEvaluation && c.sentenceId) {
                markSentenceAsEvaluated(c.sentenceId);
              }
            });
          }
        }
      } catch (error) {
        console.error('Error fetching sentence data:', error);
        setMainPanel([]);
        setParentPanel([]);
        setChildrenPanel([]);
        setParallelSentences([]);
        setOriginalMainSentence(null);
      }
    },
    [markSentenceAsEvaluated],
  );

  // URLが変更されたときにデータを更新（初回も必ず実行）
  useEffect(() => {
    if (parsedSentenceId === null) return;
    fetchSentenceData(parsedSentenceId);
  }, [parsedSentenceId, fetchSentenceData]);

  // 画面更新用の関数
  const handleRefresh = useCallback(() => {
    fetchSentenceData(currentSentenceIdRef.current);
  }, [fetchSentenceData]);

  // 評価成功時の処理
  const handleEvaluationSuccess = useCallback(() => {
    const currentMainSentenceId = mainPanel[0]?.sentenceId;
    markSentenceAsEvaluated(currentMainSentenceId);
    setHasMainPanelEvaluation(true);
    if (currentMainSentenceId) {
      fetchSentenceData(currentMainSentenceId);
    }
  }, [fetchSentenceData, mainPanel, markSentenceAsEvaluated]);

  useEffect(() => {
    const currentMainSentence = mainPanel[0];
    if (!currentMainSentence) {
      setHasMainPanelEvaluation(false);
      return;
    }
    if (currentMainSentence.userEvaluation) {
      setHasMainPanelEvaluation(true);
      return;
    }
    if (
      currentMainSentence.sentenceId &&
      evaluatedSentenceIdsRef.current.has(currentMainSentence.sentenceId)
    ) {
      setHasMainPanelEvaluation(true);
    } else {
      setHasMainPanelEvaluation(false);
    }
  }, [mainPanel, evaluatedVersion]);

  useEffect(() => {
    if (parsedSentenceId !== null) {
      currentSentenceIdRef.current = parsedSentenceId;
    }
  }, [parsedSentenceId]);

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
          userEvaluation: apiSentence.userEvaluation || null,
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
    }
  }, [parallelSentences, updateChildrenPanelForMain]);

  const handlePrevParallel = useCallback(async () => {
    if (parallelSentences.length === 0 || currentParallelIndexRef.current < 0) {
      return;
    }

    if (currentParallelIndexRef.current === 0) {
      // 最初のパラレル投稿の場合は元の投稿に戻る
      if (originalMainSentence) {
        setMainPanel([originalMainSentence]);
        currentParallelIndexRef.current = -1;

        // 元のmainパネルのchildrenデータを取得
        await updateChildrenPanelForMain(originalMainSentence.sentenceId || 0);
      }
      return;
    }

    // それ以外の場合は前のパラレル投稿に移動
    const prevIndex = currentParallelIndexRef.current - 1;
    const prevSentence = parallelSentences[prevIndex];
    currentParallelIndexRef.current = prevIndex;

    // MainPanelの内容を更新（URLは変更しない）
    setMainPanel([prevSentence]);

    // 新しいmainパネルのchildrenデータを取得
    await updateChildrenPanelForMain(prevSentence.sentenceId || 0);
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
    }
  }, [originalMainSentence, updateChildrenPanelForMain]);

  // ParentPanelがクリックされたときのハンドラー
  const handleParentClick = useCallback(
    (clickedSentence: any) => {
      // ParentPanelの投稿をクリックしたときは、その投稿をmainに移動
      if (!parsedTitleId) {
        console.error('Error: titleIdがありません');
        setMainPanel([]);
        setParentPanel([]);
        setChildrenPanel([]);
        setParallelSentences([]);
        setOriginalMainSentence(null);
        setHasMainPanelEvaluation(false);
        return;
      }
      navigate(`/novelView/${parsedTitleId}/${clickedSentence.sentenceId}`);
    },
    [navigate, parsedTitleId],
  );
  // MainPanelのナビゲーション処理（コンテンツ内での移動）
  const handleChildrenClick = useCallback(
    (clickedSentence: any) => {
      if (!parsedTitleId) {
        console.error('Error: titleIdがありません');
        setMainPanel([]);
        setParentPanel([]);
        setChildrenPanel([]);
        setParallelSentences([]);
        setOriginalMainSentence(null);
        setHasMainPanelEvaluation(false);
        return;
      }
      if (clickedSentence?.sentenceId) {
        // 即座にメインエリアへ反映してからルーティング
        currentSentenceIdRef.current = clickedSentence.sentenceId;
        currentParallelIndexRef.current = -1;
        setMainPanel([clickedSentence]);
        setHasMainPanelEvaluation(
          Boolean(clickedSentence.userEvaluation) ||
            evaluatedSentenceIdsRef.current.has(clickedSentence.sentenceId),
        );
      }
      navigate(`/novelView/${parsedTitleId}/${clickedSentence.sentenceId}`);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [navigate, parsedTitleId],
  );

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
  if (hasInvalidParams) {
    console.error(
      'Error: URLパラメータが不正です（titleId, sentenceId は数字である必要があります）',
    );
    return (
      <div>
        エラー: URLパラメータが不正です（titleId, sentenceId
        は数字である必要があります）
      </div>
    );
  }

  return (
    <NovelViewPresentation
      mainPanel={mainPanel}
      parentPanel={parentPanel}
      childrenPanel={childrenPanel}
      startIndexParent={0}
      hasMainPanelEvaluation={hasMainPanelEvaluation}
      hasParentEvaluation={hasParentEvaluation}
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
      onChildrenClick={handleChildrenClick}
    />
  );
};
