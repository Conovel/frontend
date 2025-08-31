import NovelViewPresentation from './NovelViewPresentation';
import { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sentence } from '../../types/types';
import {
  mockContainerData,
  buildInitialData,
  INITIAL_SENTENCE_ID,
  addNewSentence,
  getParallelSentences as getMockParallelSentences,
  updateSentenceEvaluation,
  getSentenceEvaluation,
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
              mainEvaluation.isGoodEvaluated || mainEvaluation.isStayEvaluated,
            );
          }
        }
      }
    }
  }, [sentenceId, currentSentenceId]);

  // MainPanelの評価状態を更新する関数
  const handleMainPanelEvaluation = useCallback(
    (type: 'good' | 'stay') => {
      const currentSentenceId = mainPanel[0]?.sentenceId;
      if (!currentSentenceId) return;

      // Sentenceデータの評価を更新
      const updatedSentence = updateSentenceEvaluation(
        currentSentenceId,
        type,
        true,
      );
      if (!updatedSentence) return;

      // 更新された評価状態を取得
      const evaluation = getSentenceEvaluation(currentSentenceId);

      // 状態を更新
      setEvaluationGoodCountMain(evaluation.goodCount);
      setEvaluationStayCountMain(evaluation.stayCount);
      setIsGoodEvaluatedMain(evaluation.isGoodEvaluated);
      setIsStayEvaluatedMain(evaluation.isStayEvaluated);

      // どちらかの評価が行われた場合、評価済みフラグを設定
      if (evaluation.isGoodEvaluated || evaluation.isStayEvaluated) {
        setHasMainPanelEvaluation(true);
      }

      // MainPanelのSentenceデータを更新
      setMainPanel([updatedSentence]);
    },
    [mainPanel],
  );

  // 統合された投稿処理
  const handlePost = useCallback(
    async (newSentence: string) => {
      try {
        // 現在のmainPanelのIDを親IDとして取得
        const currentMainId = mainPanel[0].sentenceId;

        // 新しい文章を追加し、親子関係を管理
        const { newSentence: createdSentence } = addNewSentence(
          newSentence,
          currentMainId,
        );

        // 現在のmainPanelの内容をparentPanelに移動（評価はSentenceデータに紐づいているため自動的に保持される）
        setParentPanel(mainPanel);

        // 新しい投稿をmainPanelに設定
        setMainPanel([createdSentence]);

        // 新しい投稿の評価状態を取得
        const newEvaluation = getSentenceEvaluation(createdSentence.sentenceId);
        setEvaluationGoodCountMain(newEvaluation.goodCount);
        setEvaluationStayCountMain(newEvaluation.stayCount);
        setIsGoodEvaluatedMain(newEvaluation.isGoodEvaluated);
        setIsStayEvaluatedMain(newEvaluation.isStayEvaluated);
        setHasMainPanelEvaluation(
          newEvaluation.isGoodEvaluated || newEvaluation.isStayEvaluated,
        );

        // 新規投稿の場合、childrenPanelを空にする
        setChildrenPanel([]);

        // パラレル投稿情報もリセット
        setParallelSentences([]);
        setCurrentParallelIndex(0);

        // URLを新しい投稿のIDに更新
        navigate(`/novelView/${titleId || '1'}/${createdSentence.sentenceId}`, {
          replace: false,
        });
      } catch (error) {
        console.error('投稿に失敗しました:', error);
      }
    },
    [mainPanel, navigate, titleId],
  );

  // パラレル投稿のナビゲーション関数
  const handleNextParallel = useCallback(() => {
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
    } else if (parallelSentences.length > 0 && currentParallelIndex === -1) {
      // 初期状態から最初のパラレル投稿に遷移
      const firstSentence = parallelSentences[0];
      setCurrentParallelIndex(0);
      setMainPanel([firstSentence]);
    }
  }, [currentParallelIndex, parallelSentences]);

  const handlePrevParallel = useCallback(() => {
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
        }
      } else {
        // それ以外の場合は前のパラレル投稿に移動
        const prevIndex = currentParallelIndex - 1;
        const prevSentence = parallelSentences[prevIndex];
        setCurrentParallelIndex(prevIndex);

        // MainPanelの内容を更新（URLは変更しない）
        setMainPanel([prevSentence]);
      }
    }
  }, [currentParallelIndex, parallelSentences, originalMainSentence]);

  // 元のMainPanelに戻る関数
  const handleBackToOriginal = useCallback(() => {
    if (originalMainSentence) {
      // 元のMainPanelの内容に戻す
      setMainPanel([originalMainSentence]);

      // パラレル投稿の状態をリセット（初期状態に戻す）
      setCurrentParallelIndex(-1);
    }
  }, [originalMainSentence]);

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
