import NovelViewPresentation from './NovelViewPresentation';
import { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sentence } from '../../types/types';
import { SentencesApi, EvaluationsApi } from '../../api/api';
import { axiosConfig } from '../../axiosConfig';
import {
  mockContainerData,
  buildInitialData,
  INITIAL_SENTENCE_ID,
  addNewSentence,
  getParallelSentences as getMockParallelSentences,
  updateSentenceEvaluation,
  getSentenceEvaluation,
} from './mocks/data';

const sentencesApi = new SentencesApi(axiosConfig);
const evaluationsApi = new EvaluationsApi(axiosConfig);

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

  // ParentPanelの評価状態（Sentenceデータから取得）
  const [evaluationGoodCountParent, setEvaluationGoodCountParent] =
    useState<number>(0);
  const [evaluationStayCountParent, setEvaluationStayCountParent] =
    useState<number>(0);
  const [isGoodEvaluatedParent, setIsGoodEvaluatedParent] = useState(false);
  const [isStayEvaluatedParent, setIsStayEvaluatedParent] = useState(false);

  const [evaluationGoodCountChildren, setEvaluationGoodCountChildren] =
    useState<number>(0);
  const [commentCountChildren, setCommentCountChildren] = useState<number>(0);
  const [evaluationStayCountChildren, setEvaluationStayCountChildren] =
    useState<number>(0);
  // @ts-ignore
  const [isGoodEvaluatedChildren, _setIsGoodEvaluatedChildren] =
    useState(false);
  // @ts-ignore
  const [isStayEvaluatedChildren, _setIsStayEvaluatedChildren] =
    useState(false);

  // MainPanelに関する状態を定義
  const [evaluationGoodCountMain, setEvaluationGoodCountMain] =
    useState<number>(0);
  const [evaluationStayCountMain, setEvaluationStayCountMain] =
    useState<number>(0);
  const [isGoodEvaluatedMain, setIsGoodEvaluatedMain] = useState(false);
  const [isStayEvaluatedMain, setIsStayEvaluatedMain] = useState(false);

  // MainPanelの評価状態を追跡
  const [hasMainPanelEvaluation, setHasMainPanelEvaluation] = useState(false);

  // データの状態管理
  const [mainPanel, setMainPanel] = useState(mockContainerData.main);
  const [parentPanel, setParentPanel] = useState(mockContainerData.parent);
  const [childrenPanel, setChildrenPanel] = useState(
    mockContainerData.children,
  );

  // 現在のsentenceIdと関連するパラレル投稿の管理
  const [currentSentenceId, setCurrentSentenceId] = useState<number>(() => {
    return sentenceId ? parseInt(sentenceId, 10) : INITIAL_SENTENCE_ID;
  });

  // パラレル投稿管理用の状態
  const [currentParallelIndex, setCurrentParallelIndex] = useState(0);
  const [parallelSentences, setParallelSentences] = useState<Sentence[]>([]);
  const [originalMainSentence, setOriginalMainSentence] =
    useState<Sentence | null>(null);

  // URLが変更されたときにデータを更新
  useEffect(() => {
    const targetId = sentenceId
      ? parseInt(sentenceId, 10)
      : INITIAL_SENTENCE_ID;
    if (targetId !== currentSentenceId) {
      setCurrentSentenceId(targetId);
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
                setCurrentParallelIndex(currentIndex);
              } else {
                setCurrentParallelIndex(-1);
              }
            }

            // MainPanelの評価状態を設定
            setEvaluationGoodCountMain(data.main.evaluationGoodCount || 0);
            setEvaluationStayCountMain(data.main.evaluationStayCount || 0);
            // TODO: ユーザーの評価状態を取得するAPIが必要
            setIsGoodEvaluatedMain(false);
            setIsStayEvaluatedMain(false);
            setHasMainPanelEvaluation(false);
          }

          // ParentPanelの評価状態を設定
          if (data.parent) {
            setEvaluationGoodCountParent(data.parent.evaluationGoodCount || 0);
            setEvaluationStayCountParent(data.parent.evaluationStayCount || 0);
            // TODO: ユーザーの評価状態を取得するAPIが必要
            setIsGoodEvaluatedParent(false);
            setIsStayEvaluatedParent(false);
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
                setCurrentParallelIndex(currentIndex);
                // 元のセンテンスを保存（パラレル投稿の親センテンス）
                setOriginalMainSentence(currentMainSentence);
              } else {
                // パラレル投稿の中にない場合
                setCurrentParallelIndex(-1); // 初期状態を示す
                // 現在のセンテンスを元のセンテンスとして保存
                setOriginalMainSentence(currentMainSentence);
              }

              // ParentPanelの評価状態をSentenceデータから取得
              if (newData.parent.length > 0) {
                const parentEvaluation = getSentenceEvaluation(
                  newData.parent[0].sentenceId,
                );
                setEvaluationGoodCountParent(parentEvaluation.goodCount);
                setEvaluationStayCountParent(parentEvaluation.stayCount);
                setIsGoodEvaluatedParent(parentEvaluation.isGoodEvaluated);
                setIsStayEvaluatedParent(parentEvaluation.isStayEvaluated);
              }

              // MainPanelの評価状態をSentenceデータから取得
              if (newData.main.length > 0) {
                const mainEvaluation = getSentenceEvaluation(
                  newData.main[0].sentenceId,
                );
                setEvaluationGoodCountMain(mainEvaluation.goodCount);
                setEvaluationStayCountMain(mainEvaluation.stayCount);
                setIsGoodEvaluatedMain(mainEvaluation.isGoodEvaluated);
                setIsStayEvaluatedMain(mainEvaluation.isStayEvaluated);
                setHasMainPanelEvaluation(
                  mainEvaluation.isGoodEvaluated ||
                    mainEvaluation.isStayEvaluated,
                );
              }
            }
          }
        }
      };

      fetchSentenceData();
    }
  }, [sentenceId, currentSentenceId]);

  // MainPanelの評価状態を更新する関数
  const handleMainPanelEvaluation = useCallback(
    async (type: 'good' | 'stay') => {
      const currentSentenceId = mainPanel[0]?.sentenceId;
      if (!currentSentenceId) return;

      try {
        // APIを使用して評価を送信
        const response = await evaluationsApi.evaluateSentence({
          sentenceId: currentSentenceId,
          evaluation: type === 'good' ? 'good' : 'stay',
        });

        if (response && response.data) {
          // 状態を更新
          const evaluationData = response.data;
          setEvaluationGoodCountMain(evaluationData.evaluationGoodCount || 0);
          setEvaluationStayCountMain(evaluationData.evaluationStayCount || 0);

          // 評価済みフラグを設定
          if (type === 'good') {
            setIsGoodEvaluatedMain(true);
          } else {
            setIsStayEvaluatedMain(true);
          }
          setHasMainPanelEvaluation(true);

          // MainPanelのSentenceデータを更新
          const updatedMainSentence = {
            ...mainPanel[0],
            evaluationGoodCount: evaluationData.evaluationGoodCount || 0,
            evaluationStayCount: evaluationData.evaluationStayCount || 0,
          };
          setMainPanel([updatedMainSentence]);
        }
      } catch (error) {
        console.error('Error evaluating sentence:', error);
        // エラー時はモックデータの処理にフォールバック
        const updatedSentence = updateSentenceEvaluation(
          currentSentenceId,
          type,
          true,
        );
        if (!updatedSentence) return;

        const evaluation = getSentenceEvaluation(currentSentenceId);
        setEvaluationGoodCountMain(evaluation.goodCount);
        setEvaluationStayCountMain(evaluation.stayCount);
        setIsGoodEvaluatedMain(evaluation.isGoodEvaluated);
        setIsStayEvaluatedMain(evaluation.isStayEvaluated);

        if (evaluation.isGoodEvaluated || evaluation.isStayEvaluated) {
          setHasMainPanelEvaluation(true);
        }

        setMainPanel([updatedSentence]);
      }
    },
    [mainPanel],
  );

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
            setEvaluationGoodCountMain(0);
            setEvaluationStayCountMain(0);
            setIsGoodEvaluatedMain(false);
            setIsStayEvaluatedMain(false);
            setHasMainPanelEvaluation(false);

            // 新規投稿の場合、childrenPanelを空にする
            setChildrenPanel([]);

            // パラレル投稿情報もリセット
            setParallelSentences([]);
            setCurrentParallelIndex(0);

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
        setEvaluationGoodCountMain(newEvaluation.goodCount);
        setEvaluationStayCountMain(newEvaluation.stayCount);
        setIsGoodEvaluatedMain(newEvaluation.isGoodEvaluated);
        setIsStayEvaluatedMain(newEvaluation.isStayEvaluated);
        setHasMainPanelEvaluation(
          newEvaluation.isGoodEvaluated || newEvaluation.isStayEvaluated,
        );

        setChildrenPanel([]);
        setParallelSentences([]);
        setCurrentParallelIndex(0);

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
      currentParallelIndex,
      canGoNext: currentParallelIndex < parallelSentences.length - 1,
    });

    if (
      parallelSentences.length > 0 &&
      currentParallelIndex < parallelSentences.length - 1
    ) {
      const nextIndex = currentParallelIndex + 1;
      const nextSentence = parallelSentences[nextIndex];
      setCurrentParallelIndex(nextIndex);

      // MainPanelの内容を更新（URLは変更しない）
      setMainPanel([nextSentence]);

      // 新しいmainパネルのchildrenデータを取得
      await updateChildrenPanelForMain(nextSentence.sentenceId);

      // 評価状態をリセット
      setEvaluationGoodCountMain(nextSentence.evaluationGoodCount || 0);
      setEvaluationStayCountMain(nextSentence.evaluationStayCount || 0);
      setIsGoodEvaluatedMain(false);
      setIsStayEvaluatedMain(false);
      setHasMainPanelEvaluation(false);
    } else if (parallelSentences.length > 0 && currentParallelIndex === -1) {
      // 初期状態から最初のパラレル投稿に遷移
      const firstSentence = parallelSentences[0];
      setCurrentParallelIndex(0);
      setMainPanel([firstSentence]);

      // 新しいmainパネルのchildrenデータを取得
      await updateChildrenPanelForMain(firstSentence.sentenceId);

      // 評価状態をリセット
      setEvaluationGoodCountMain(firstSentence.evaluationGoodCount || 0);
      setEvaluationStayCountMain(firstSentence.evaluationStayCount || 0);
      setIsGoodEvaluatedMain(false);
      setIsStayEvaluatedMain(false);
      setHasMainPanelEvaluation(false);
    }
  }, [currentParallelIndex, parallelSentences, updateChildrenPanelForMain]);

  const handlePrevParallel = useCallback(async () => {
    console.log('handlePrevParallel called:', {
      parallelSentencesLength: parallelSentences.length,
      currentParallelIndex,
      canGoPrev: currentParallelIndex >= 0,
    });

    if (parallelSentences.length > 0 && currentParallelIndex >= 0) {
      if (currentParallelIndex === 0) {
        // 最初のパラレル投稿の場合は元の投稿に戻る
        if (originalMainSentence) {
          setMainPanel([originalMainSentence]);
          setCurrentParallelIndex(-1);

          // 元のmainパネルのchildrenデータを取得
          await updateChildrenPanelForMain(originalMainSentence.sentenceId);

          // 評価状態をリセット
          setEvaluationGoodCountMain(
            originalMainSentence.evaluationGoodCount || 0,
          );
          setEvaluationStayCountMain(
            originalMainSentence.evaluationStayCount || 0,
          );
          setIsGoodEvaluatedMain(false);
          setIsStayEvaluatedMain(false);
          setHasMainPanelEvaluation(false);
        }
      } else {
        // それ以外の場合は前のパラレル投稿に移動
        const prevIndex = currentParallelIndex - 1;
        const prevSentence = parallelSentences[prevIndex];
        setCurrentParallelIndex(prevIndex);

        // MainPanelの内容を更新（URLは変更しない）
        setMainPanel([prevSentence]);

        // 新しいmainパネルのchildrenデータを取得
        await updateChildrenPanelForMain(prevSentence.sentenceId);

        // 評価状態をリセット
        setEvaluationGoodCountMain(prevSentence.evaluationGoodCount || 0);
        setEvaluationStayCountMain(prevSentence.evaluationStayCount || 0);
        setIsGoodEvaluatedMain(false);
        setIsStayEvaluatedMain(false);
        setHasMainPanelEvaluation(false);
      }
    }
  }, [
    currentParallelIndex,
    parallelSentences,
    originalMainSentence,
    updateChildrenPanelForMain,
  ]);

  // 元のMainPanelに戻る関数
  const handleBackToOriginal = useCallback(async () => {
    if (originalMainSentence) {
      // 元のMainPanelの内容に戻す
      setMainPanel([originalMainSentence]);

      // パラレル投稿の状態をリセット（初期状態に戻す）
      setCurrentParallelIndex(-1);

      // 元のmainパネルのchildrenデータを取得
      await updateChildrenPanelForMain(originalMainSentence.sentenceId);

      // 評価状態をリセット
      setEvaluationGoodCountMain(originalMainSentence.evaluationGoodCount || 0);
      setEvaluationStayCountMain(originalMainSentence.evaluationStayCount || 0);
      setIsGoodEvaluatedMain(false);
      setIsStayEvaluatedMain(false);
      setHasMainPanelEvaluation(false);
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
    parallelSentences.length > 0 && currentParallelIndex >= 0;

  // パラレル投稿のナビゲーション状態
  const canGoNext =
    parallelSentences.length > 0 &&
    (currentParallelIndex === -1 ||
      currentParallelIndex < parallelSentences.length - 1);
  const canGoPrev = parallelSentences.length > 0 && currentParallelIndex >= 0;

  // デバッグ用のログ出力
  console.log('Current sentence ID:', sentenceId);
  console.log('Current data:', {
    mainPanel,
    parentPanel,
    childrenPanel,
    parallelSentences,
    currentParallelIndex,
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
      evaluationGoodCountParent={evaluationGoodCountParent}
      setEvaluationGoodCountParent={setEvaluationGoodCountParent}
      evaluationStayCountParent={evaluationStayCountParent}
      setEvaluationStayCountParent={setEvaluationStayCountParent}
      isGoodEvaluatedParent={isGoodEvaluatedParent}
      isStayEvaluatedParent={isStayEvaluatedParent}
      startIndexChildren={startIndexChildren}
      setStartIndexChildren={setStartIndexChildren}
      evaluationGoodCountChildren={evaluationGoodCountChildren}
      setEvaluationGoodCountChildren={setEvaluationGoodCountChildren}
      commentCountChildren={commentCountChildren}
      setCommentCountChildren={setCommentCountChildren}
      evaluationStayCountChildren={evaluationStayCountChildren}
      setEvaluationStayCountChildren={setEvaluationStayCountChildren}
      isGoodEvaluatedChildren={isGoodEvaluatedChildren}
      isStayEvaluatedChildren={isStayEvaluatedChildren}
      evaluationGoodCountMain={evaluationGoodCountMain}
      setEvaluationGoodCountMain={() => handleMainPanelEvaluation('good')}
      evaluationStayCountMain={evaluationStayCountMain}
      setEvaluationStayCountMain={() => handleMainPanelEvaluation('stay')}
      isGoodEvaluatedMain={isGoodEvaluatedMain}
      isStayEvaluatedMain={isStayEvaluatedMain}
      hasMainPanelEvaluation={hasMainPanelEvaluation}
      textCount={15} // モックデータの総数
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
      titleId={titleId || '1'}
    />
  );
};
