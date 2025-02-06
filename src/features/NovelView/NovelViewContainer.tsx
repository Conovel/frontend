import { NovelViewPresentation } from './NovelViewPresentation';
import { useState } from 'react';
import { Sentence } from '../../types/types';

const main: Sentence[] = [
  {
    title: 'テストタイトル',
    sentence_id: 1,
    userId: 123,
    userName: 'Kanepion',
    sentence:
      '主人の帰りが何よりも心待ちだったことを思い出す。今思えば、なんてちっぽけなことに心躍らせていたのだろう。',
    profile_icon_image: 'path/to/image.png',
    evaluation_good_count: 0,
    evaluation_stay_count: 0,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];

const parent: Sentence[] = [
  {
    title: 'テストタイトル',
    sentence_id: 1,
    userId: 123,
    userName: 'Kanepion',
    sentence: '前の階層のテキスト1',
    profile_icon_image: 'path/to/image.png',
    evaluation_good_count: 0,
    evaluation_stay_count: 0,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];

const children: Sentence[] = [
  {
    title: 'テストタイトル',
    sentence_id: 1,
    userId: 123,
    userName: 'Kanepion',
    sentence: '次の階層のテキスト1',
    profile_icon_image: 'path/to/image.png',
    evaluation_good_count: 0,
    evaluation_stay_count: 0,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];

export const NovelViewContainer = () => {
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

  return (
    <NovelViewPresentation
      mainPanel={main}
      parentPanel={parent}
      childrenPanel={children}
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
      textCount={main.length + parent.length + children.length}
    />
  );
};
