import NovelViewPresentation from './NovelViewPresentation';
import { useState, useCallback, useEffect } from 'react';
import { Sentence } from '../../types/types';
import {
  mockContainerData,
  buildInitialData,
  INITIAL_SENTENCE_ID,
  addNewSentence,
  getParallelSentences,
} from './mocks/data';

export const NovelViewContainer = () => {
  // URLパラメータの代わりにpropsまたはstateで管理
  const titleId = '1'; // デフォルト値
  const sentenceId = INITIAL_SENTENCE_ID.toString(); // デフォルト値

  // navigateの代わりにconsole.logでデバッグ出力
  const navigate = (path: string, options?: any) => {
    console.log('Navigation requested:', path, options);
  };

  const [start_index_parent, setStart_index_parent] = useState(0);
  const [start_index_children, setStart_index_children] = useState(0);
  const [evaluation_good_count_parent, setEvaluation_good_count_parent] =
    useState<number>(0);
  const [comment_count_parent, setComment_count_parent] = useState<number>(0);
  const [evaluation_stay_count_parent, setEvaluation_stay_count_parent] =
    useState<number>(0);
  const [evaluation_good_count_children, setEvaluation_good_count_children] =
    useState<number>(0);
  const [comment_count_children, setComment_count_children] =
    useState<number>(0);
  const [evaluation_stay_count_children, setEvaluation_stay_count_children] =
    useState<number>(0);

  // MainPanelに関する状態を定義
  const [evaluation_good_count_main, setEvaluation_good_count_main] =
    useState<number>(0);
  const [comment_count_main, setComment_count_main] = useState<number>(0);
  const [evaluation_stay_count_main, setEvaluation_stay_count_main] =
    useState<number>(0);

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
          const parallels = getParallelSentences(parentSentence.sentence_id);
          setParallelSentences(parallels);

          // 現在のsentenceがパラレル投稿の中にある場合、そのインデックスを設定
          const currentIndex = parallels.findIndex(
            (p) => p.sentence_id === targetId,
          );
          setCurrentParallelIndex(Math.max(0, currentIndex));
        }
      }
    }
  }, [sentenceId, currentSentenceId]);

  // 投稿処理
  const handlePost = useCallback(
    async (newSentence: string) => {
      try {
        // 現在のmainPanelのIDを親IDとして取得
        const currentMainId = mainPanel[0].sentence_id;

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
        navigate(
          `/novelView/${titleId || '1'}/${createdSentence.sentence_id}`,
          {
            replace: false,
          },
        );
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
      navigate(`/novelView/${titleId || '1'}/${nextSentence.sentence_id}`, {
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
      navigate(`/novelView/${titleId || '1'}/${prevSentence.sentence_id}`, {
        replace: true,
      });
    }
  }, [currentParallelIndex, parallelSentences, navigate, titleId]);

  // ParentPanelがクリックされたときのハンドラー
  const handleParentClick = useCallback(
    (clickedSentence: any) => {
      console.log('Parent clicked:', clickedSentence);
      // ParentPanelの投稿をクリックしたときは、その投稿をmainに移動
      navigate(`/novelView/${titleId || '1'}/${clickedSentence.sentence_id}`);
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
  const hasParallels = parallelSentences.length > 1;

  // デバッグ用のログ出力
  console.log('Current sentence ID:', sentenceId);
  console.log('Current data:', {
    mainPanel,
    parentPanel,
    childrenPanel,
    parallelSentences,
    currentParallelIndex,
    mainPanelIds: mainPanel.map((p) => p.sentence_id),
    parentPanelIds: parentPanel.map((p) => p.sentence_id),
    childrenPanelIds: childrenPanel.map((p) => p.sentence_id),
  });

  return (
    <NovelViewPresentation
      mainPanel={mainPanel}
      parentPanel={parentPanel}
      childrenPanel={childrenPanel}
      start_index_parent={start_index_parent}
      setStart_index_parent={setStart_index_parent}
      evaluation_good_count_parent={evaluation_good_count_parent}
      setEvaluation_good_count_parent={setEvaluation_good_count_parent}
      comment_count_parent={comment_count_parent}
      setComment_count_parent={setComment_count_parent}
      evaluation_stay_count_parent={evaluation_stay_count_parent}
      setEvaluation_stay_count_parent={setEvaluation_stay_count_parent}
      start_index_children={start_index_children}
      setStart_index_children={setStart_index_children}
      evaluation_good_count_children={evaluation_good_count_children}
      setEvaluation_good_count_children={setEvaluation_good_count_children}
      comment_count_children={comment_count_children}
      setComment_count_children={setComment_count_children}
      evaluation_stay_count_children={evaluation_stay_count_children}
      setEvaluation_stay_count_children={setEvaluation_stay_count_children}
      evaluation_good_count_main={evaluation_good_count_main}
      setEvaluation_good_count_main={setEvaluation_good_count_main}
      comment_count_main={comment_count_main}
      setComment_count_main={setComment_count_main}
      evaluation_stay_count_main={evaluation_stay_count_main}
      setEvaluation_stay_count_main={setEvaluation_stay_count_main}
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
