import NovelViewPresentation from './NovelViewPresentation';
import { useState, useCallback } from 'react';
import { mockContainerData } from './mocks/data';
import { useParams } from 'react-router-dom';

export const NovelViewContainer = () => {
  const { sentenceId } = useParams<{ sentenceId: string }>();
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
  const [childrenPanel] = useState(mockContainerData.children);

  // 投稿処理
  const handlePost = useCallback(
    async (newSentence: string) => {
      try {
        // ここでAPIを呼び出して投稿を保存
        // const response = await api.post('/sentences', { sentence: newSentence });

        // 投稿が成功したら、データを更新
        const newMainSentence = {
          ...mockContainerData.main[0], // 既存のデータ構造を継承
          sentence: newSentence,
          sentence_id: mockContainerData.main[0].sentence_id + 1, // 既存のIDに1を加算
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        // 現在のmainPanelの内容をparentPanelに移動
        const currentMain = mainPanel[0];
        if (currentMain) {
          setParentPanel([currentMain]);
        }

        // 新しい投稿をmainPanelの先頭に追加
        setMainPanel([newMainSentence]);

        // 画面をリロード
        window.location.reload();
      } catch (error) {
        console.error('投稿に失敗しました:', error);
        // エラー処理を追加
      }
    },
    [mainPanel],
  );

  // sentenceIdを使用してデータを取得する処理をここに追加
  console.log('Current sentence ID:', sentenceId);

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
      textCount={mainPanel.length + parentPanel.length + childrenPanel.length}
      onPost={handlePost}
    />
  );
};
