import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import NovelViewPresentation from './NovelViewPresentation';
import { Sentence } from '../../types/types';
import { fetchNovelData } from './handlers';
import { Snackbar, Alert } from '@mui/material';

const NovelViewContainer: React.FC = () => {
  const { sentence_id } = useParams<{ sentence_id: string }>();
  const [mainPanel, setMainPanel] = useState<Sentence | null>(null);
  const [parentPanel, setParentPanel] = useState<Sentence | null>(null);
  const [childrenPanels, setChildrenPanels] = useState<Sentence[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [textCount, setTextCount] = useState(0);
  const [evaluation_good_count, setEvaluation_good_count] = useState(0);
  const [comment_count, setComment_count] = useState(0);
  const [evaluation_stay_count, setEvaluation_stay_count] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // 小説データを読み込む関数
  const loadNovelData = useCallback(async () => {
    if (!sentence_id) return;

    try {
      setError(null);
      const data = await fetchNovelData(sentence_id);
      if (data) {
        setMainPanel(data);
        setTextCount(data.sentence_hierarchy_count || 0);
        setEvaluation_good_count(data.evaluation_good_count || 0);
        setComment_count(data.comment_count || 0);
        setEvaluation_stay_count(data.evaluation_stay_count || 0);
      }
    } catch (error) {
      console.error('Error loading novel data:', error);
      setError('小説データの読み込みに失敗しました');
    }
  }, [sentence_id]);

  // 初期データ読み込み
  useEffect(() => {
    loadNovelData();
  }, [loadNovelData]);

  // 投稿成功時の処理
  const handlePostSuccess = useCallback(
    (newPost: Sentence) => {
      if (!mainPanel) return;

      try {
        // 現在のメインパネルを親パネルに移動
        setParentPanel(mainPanel);
        // 新しい投稿をメインパネルに設定
        setMainPanel(newPost);
        // 新しい投稿を子パネルから削除（存在する場合）
        setChildrenPanels((prev) =>
          prev.filter((child) => child.sentence_id !== newPost.sentence_id),
        );
      } catch (error) {
        console.error('Error updating panels:', error);
        setError('パネルの更新に失敗しました');
      }
    },
    [mainPanel],
  );

  // エラーをクリアする関数
  const handleErrorClose = useCallback(() => {
    setError(null);
  }, []);

  return (
    <>
      <NovelViewPresentation
        mainPanel={mainPanel}
        parentPanel={parentPanel}
        childrenPanels={childrenPanels}
        startIndex={startIndex}
        setStartIndex={setStartIndex}
        textCount={textCount}
        evaluation_good_count={evaluation_good_count}
        setEvaluation_good_count={setEvaluation_good_count}
        comment_count={comment_count}
        setComment_count={setComment_count}
        evaluation_stay_count={evaluation_stay_count}
        setEvaluation_stay_count={setEvaluation_stay_count}
        onPostSuccess={handlePostSuccess}
      />
      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleErrorClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity='error' sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default NovelViewContainer;
