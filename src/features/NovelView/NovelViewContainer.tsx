import NovelViewPresentation from './NovelViewPresentation';
import { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sentence } from '../../types/types';
import {
  mockContainerData,
  buildInitialData,
  INITIAL_SENTENCE_ID,
  addNewSentence,
  getParallelSentences,
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
  const [evaluationGoodCountParent, setEvaluationGoodCountParent] =
    useState<number>(0);
  const [commentCountParent, setCommentCountParent] = useState<number>(0);
  const [evaluationStayCountParent, setEvaluationStayCountParent] =
    useState<number>(0);
  const [isGoodEvaluatedParent] = useState(false);
  const [isStayEvaluatedParent] = useState(false);
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

        // パラレル投稿を取得
        const parentSentence = newData.parent[newData.parent.length - 1];
        if (parentSentence) {
          const parallels = getParallelSentences(parentSentence.sentenceId);
          setParallelSentences(parallels);

          // 現在のsentenceがパラレル投稿の中にある場合、そのインデックスを設定
          const currentIndex = parallels.findIndex(
            (p) => p.sentenceId === targetId,
          );
          setCurrentParallelIndex(Math.max(0, currentIndex));
        }
      }
    }
  }, [sentenceId, currentSentenceId]);

  // MainPanelの評価状態を更新する関数
  const handleMainPanelEvaluation = useCallback(
    (type: 'good' | 'stay', value: React.SetStateAction<number>) => {
      const newValue = typeof value === 'function' ? value(0) : value;

      if (type === 'good') {
        setEvaluationGoodCountMain(value);
        setIsGoodEvaluatedMain(newValue > 0);
      } else {
        setEvaluationStayCountMain(value);
        setIsStayEvaluatedMain(newValue > 0);
      }

      // どちらかの評価が行われた場合、評価済みフラグを設定
      if (newValue > 0) {
        setHasMainPanelEvaluation(true);
      }
    },
    [],
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

        // 現在のmainPanelの内容をparentPanelに移動
        setParentPanel(mainPanel);

        // 新しい投稿をmainPanelに設定
        setMainPanel([createdSentence]);

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
    if (parallelSentences.length > 0) {
      const nextIndex = (currentParallelIndex + 1) % parallelSentences.length;
      const nextSentence = parallelSentences[nextIndex];
      setCurrentParallelIndex(nextIndex);

      // URLを更新
      navigate(`/novelView/${titleId || '1'}/${nextSentence.sentenceId}`, {
        replace: true,
      });
    }
  }, [currentParallelIndex, parallelSentences, navigate, titleId]);

  const handlePrevParallel = useCallback(() => {
    if (parallelSentences.length > 0) {
      const prevIndex =
        currentParallelIndex === 0
          ? parallelSentences.length - 1
          : currentParallelIndex - 1;
      const prevSentence = parallelSentences[prevIndex];
      setCurrentParallelIndex(prevIndex);

      // URLを更新
      navigate(`/novelView/${titleId || '1'}/${prevSentence.sentenceId}`, {
        replace: true,
      });
    }
  }, [currentParallelIndex, parallelSentences, navigate, titleId]);

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

  // パラレル投稿が存在するかどうか
  const hasParallels = parallelSentences.length > 0;

  // デバッグ用のログ出力
  console.log('Current sentence ID:', sentenceId);
  console.log('Current data:', {
    mainPanel,
    parentPanel,
    childrenPanel,
    parallelSentences,
    currentParallelIndex,
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
      commentCountParent={commentCountParent}
      setCommentCountParent={setCommentCountParent}
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
      setEvaluationGoodCountMain={(value) =>
        handleMainPanelEvaluation('good', value)
      }
      evaluationStayCountMain={evaluationStayCountMain}
      setEvaluationStayCountMain={(value) =>
        handleMainPanelEvaluation('stay', value)
      }
      isGoodEvaluatedMain={isGoodEvaluatedMain}
      isStayEvaluatedMain={isStayEvaluatedMain}
      hasMainPanelEvaluation={hasMainPanelEvaluation}
      textCount={15} // モックデータの総数
      onPost={handlePost}
      onNextParallel={handleNextParallel}
      onPrevParallel={handlePrevParallel}
      hasParallels={hasParallels}
      currentParallelIndex={currentParallelIndex}
      totalParallels={parallelSentences.length}
      onParentClick={handleParentClick}
      onMainPanelNavigate={handleMainPanelNavigate}
      titleId={titleId || '1'}
    />
  );
};
