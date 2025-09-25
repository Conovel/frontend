import NovelViewPresentation from './NovelViewPresentation';
import { useState, useCallback, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sentence } from '../../types/types';
import { SentencesApi } from '../../api/api';
import { axiosConfig } from '../../axiosConfig';
import {
  mockContainerData,
  buildInitialData,
  INITIAL_SENTENCE_ID,
  addNewSentence,
  getParallelSentences as getMockParallelSentences,
  getSentenceEvaluation,
} from './mocks/data';

const sentencesApi = new SentencesApi(axiosConfig);

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
  const [mainPanel, setMainPanel] = useState(mockContainerData.main);
  const [parentPanel, setParentPanel] = useState(mockContainerData.parent);
  const [childrenPanel, setChildrenPanel] = useState(
    mockContainerData.children,
  );

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
      console.log('URL changed, updating to sentence ID:', targetId);

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
            sentenceUserName:
              apiSentence.sentencePenName || apiSentence.sentenceUserName || '',
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
            hasMainPanelEvaluationRef.current = false;
          }
        } catch (error) {
          console.error('Error fetching sentence data:', error);
          // エラー時はモックデータを使用
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
                // パラレル投稿の中にある場合
                currentParallelIndexRef.current = currentIndex;
                // 元のセンテンスを保存（パラレル投稿の親センテンス）
                setOriginalMainSentence(currentMainSentence);
              } else {
                // パラレル投稿の中にない場合
                currentParallelIndexRef.current = -1; // 初期状態を示す
                // 現在のセンテンスを元のセンテンスとして保存
                setOriginalMainSentence(currentMainSentence);
              }

              // MainPanelの評価状態をSentenceデータから取得
              if (newData.main.length > 0) {
                const mainEvaluation = getSentenceEvaluation(
                  newData.main[0].sentenceId,
                );
                hasMainPanelEvaluationRef.current =
                  mainEvaluation.isGoodEvaluated ||
                  mainEvaluation.isStayEvaluated;
              }
            }
          }
        }
      };

      fetchSentenceData();
    }
  }, [sentenceId]);

  // 統合された投稿処理
  const handlePost = useCallback(
    async (newSentence: string) => {
      try {
        // 現在のmainPanelのIDを親IDとして取得
        const currentMainId = mainPanel[0].sentenceId;
        const currentMainUpdatedAt = mainPanel[0].updatedAt;

        // APIを使用して新しい投稿を作成
        const response = await sentencesApi.postSentence({
          parentSentenceId: currentMainId,
          parentUpdatedAt: currentMainUpdatedAt,
          sentence: newSentence,
        });

        if (response && response.data) {
          const data = response.data;

          // APIレスポンスを内部のSentence型に変換
          const convertToSentence = (apiSentence: any): Sentence => ({
            sentenceId: apiSentence.sentenceId,
            sentence: apiSentence.sentence,
            sentenceUserId: apiSentence.sentenceUserId,
            sentenceUserName:
              apiSentence.sentencePenName || apiSentence.sentenceUserName || '',
            profileIconImage: apiSentence.profileIconImage || '',
            evaluationGoodCount: apiSentence.evaluationGoodCount || 0,
            evaluationStayCount: apiSentence.evaluationStayCount || 0,
            createdAt: apiSentence.createdAt,
            updatedAt: apiSentence.updatedAt,
          });

          // 新しい投稿をmainPanelに設定
          if (data.main) {
            const createdSentence = convertToSentence(data.main);

            // 現在のmainPanelの内容をparentPanelに移動
            setParentPanel(mainPanel);

            // 新しい投稿をmainPanelに設定
            setMainPanel([createdSentence]);

            // 新しい投稿の評価状態を初期化
            hasMainPanelEvaluationRef.current = false;

            // 新規投稿の場合、childrenPanelを空にする
            setChildrenPanel([]);

            // パラレル投稿情報もリセット
            setParallelSentences([]);
            currentParallelIndexRef.current = 0;

            // URLを新しい投稿のIDに更新
            navigate(
              `/novelView/${titleId || '1'}/${createdSentence.sentenceId}`,
              {
                replace: false,
              },
            );
          }
        }
      } catch (error: any) {
        // 409 Conflictの場合は親投稿が編集された
        if (error.response?.status === 409) {
          console.error('親投稿が編集されたため、投稿を保留しました');
          // TODO: ユーザーに通知する処理を追加
        } else {
          console.error('投稿に失敗しました:', error);
        }

        // エラー時はモックデータの処理にフォールバック
        const { newSentence: createdSentence } = addNewSentence(
          newSentence,
          mainPanel[0].sentenceId,
        );

        setParentPanel(mainPanel);
        setMainPanel([createdSentence]);

        const newEvaluation = getSentenceEvaluation(createdSentence.sentenceId);
        hasMainPanelEvaluationRef.current =
          newEvaluation.isGoodEvaluated || newEvaluation.isStayEvaluated;

        setChildrenPanel([]);
        setParallelSentences([]);
        currentParallelIndexRef.current = 0;

        navigate(`/novelView/${titleId || '1'}/${createdSentence.sentenceId}`, {
          replace: false,
        });
      }
    },
    [mainPanel, navigate, titleId],
  );

  // 新しいmainパネルのchildrenデータを取得する共通関数
  const updateChildrenPanelForMain = useCallback(async (sentenceId: number) => {
    try {
      const response = await sentencesApi.getSentenceById(sentenceId);
      if (response && response.data && response.data.children) {
        const convertToSentence = (apiSentence: any): Sentence => ({
          sentenceId: apiSentence.sentenceId,
          sentence: apiSentence.sentence,
          sentenceUserId: apiSentence.sentenceUserId,
          sentenceUserName:
            apiSentence.sentencePenName || apiSentence.sentenceUserName || '',
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
      // エラー時はモックデータを使用
      const mockChildren = getMockParallelSentences(sentenceId);
      setChildrenPanel(mockChildren);
    }
  }, []);

  // パラレル投稿のナビゲーション関数
  const handleNextParallel = useCallback(async () => {
    console.log('handleNextParallel called:', {
      parallelSentencesLength: parallelSentences.length,
      currentParallelIndex: currentParallelIndexRef.current,
      canGoNext: currentParallelIndexRef.current < parallelSentences.length - 1,
    });

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
      await updateChildrenPanelForMain(nextSentence.sentenceId);

      // 評価状態をリセット
      hasMainPanelEvaluationRef.current = false;
    } else if (
      parallelSentences.length > 0 &&
      currentParallelIndexRef.current === -1
    ) {
      // 初期状態から最初のパラレル投稿に遷移
      const firstSentence = parallelSentences[0];
      currentParallelIndexRef.current = 0;
      setMainPanel([firstSentence]);

      // 新しいmainパネルのchildrenデータを取得
      await updateChildrenPanelForMain(firstSentence.sentenceId);

      // 評価状態をリセット
      hasMainPanelEvaluationRef.current = false;
    }
  }, [parallelSentences, updateChildrenPanelForMain]);

  const handlePrevParallel = useCallback(async () => {
    console.log('handlePrevParallel called:', {
      parallelSentencesLength: parallelSentences.length,
      currentParallelIndex: currentParallelIndexRef.current,
      canGoPrev: currentParallelIndexRef.current >= 0,
    });

    if (parallelSentences.length > 0 && currentParallelIndexRef.current >= 0) {
      if (currentParallelIndexRef.current === 0) {
        // 最初のパラレル投稿の場合は元の投稿に戻る
        if (originalMainSentence) {
          setMainPanel([originalMainSentence]);
          currentParallelIndexRef.current = -1;

          // 元のmainパネルのchildrenデータを取得
          await updateChildrenPanelForMain(originalMainSentence.sentenceId);

          // 評価状態をリセット
          hasMainPanelEvaluationRef.current = false;
        }
      } else {
        // それ以外の場合は前のパラレル投稿に移動
        const prevIndex = currentParallelIndexRef.current - 1;
        const prevSentence = parallelSentences[prevIndex];
        currentParallelIndexRef.current = prevIndex;

        // MainPanelの内容を更新（URLは変更しない）
        setMainPanel([prevSentence]);

        // 新しいmainパネルのchildrenデータを取得
        await updateChildrenPanelForMain(prevSentence.sentenceId);

        // 評価状態をリセット
        hasMainPanelEvaluationRef.current = false;
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
      await updateChildrenPanelForMain(originalMainSentence.sentenceId);

      // 評価状態をリセット
      hasMainPanelEvaluationRef.current = false;
    }
  }, [originalMainSentence, updateChildrenPanelForMain]);

  // ParentPanelがクリックされたときのハンドラー
  const handleParentClick = useCallback(
    (clickedSentence: any) => {
      console.log('Parent clicked:', clickedSentence);
      // ParentPanelの投稿をクリックしたときは、その投稿をmainに移動
      navigate(`/novelView/${titleId || '1'}/${clickedSentence.sentenceId}`);
    },
    [navigate, titleId],
  );

  // MainPanelのナビゲーション処理（コンテンツ内での移動）
  const handleMainPanelNavigate = useCallback((direction: 'prev' | 'next') => {
    // MainPanel内でのナビゲーションは現在のsentenceの前後の関連投稿を表示
    // 実装は今後の拡張として残す
    console.log('MainPanel navigate:', direction);
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
  console.log('Current sentence ID:', sentenceId);
  console.log('Current data:', {
    mainPanel,
    parentPanel,
    childrenPanel,
    parallelSentences,
    currentParallelIndex: currentParallelIndexRef.current,
    hasParallels,
    isInParallelMode,
    mainPanelIds: mainPanel.map((p) => p.sentenceId),
    parentPanelIds: parentPanel.map((p) => p.sentenceId),
    childrenPanelIds: childrenPanel.map((p) => p.sentenceId),
  });

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
      textCount={15} // モックデータの総数
      titleId={titleId}
      onPost={handlePost}
      onNextParallel={handleNextParallel}
      onPrevParallel={handlePrevParallel}
      hasParallels={hasParallels}
      onParentClick={handleParentClick}
      onMainPanelNavigate={handleMainPanelNavigate}
      onBackToOriginal={handleBackToOriginal}
      isInParallelMode={isInParallelMode}
      canGoNext={canGoNext}
      canGoPrev={canGoPrev}
    />
  );
};
