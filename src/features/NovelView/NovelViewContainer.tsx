import { NovelViewPresentation } from './NovelViewPresentation';
import { useState } from 'react';

const main = [
  {
    sentence_id: 1,
    userId: 123,
    userName: 'Kanepion',
    sentence:
      '主人の帰りが何よりも心待ちだったことを思い出す。今思えば、なんてちっぽけなことに心躍らせていたのだろう。',
  },
];

const parent = {
  sentence_id: 1,
  userId: 123,
  userName: 'Kanepion',
  sentence: '前の階層のテキスト1',
};

const children = {
  sentence_id: 1,
  userId: 123,
  userName: 'Kanepion',
  sentence: '次の階層のテキスト1',
};

export const NovelViewContainer = () => {
  const [startIndexPrev, setStartIndexPrev] = useState(0);
  const [startIndexNext, setStartIndexNext] = useState(0);
  const [evaluation_good_countPrev, setEvaluation_good_countPrev] =
    useState<number>(0);
  const [comment_countPrev, setComment_countPrev] = useState<number>(0);
  const [evaluation_stay_countPrev, setEvaluation_stay_countPrev] =
    useState<number>(0);
  const [evaluation_good_countNext, setEvaluation_good_countNext] =
    useState<number>(0);
  const [comment_countNext, setComment_countNext] = useState<number>(0);
  const [evaluation_stay_countNext, setEvaluation_stay_countNext] =
    useState<number>(0);

  // MainPanelに関する状態を定義
  const [evaluation_good_countMain, setEvaluation_good_countMain] =
    useState<number>(0);
  const [comment_countMain, setComment_countMain] = useState<number>(0);
  const [evaluation_stay_countMain, setEvaluation_stay_countMain] =
    useState<number>(0);

  return (
    <NovelViewPresentation
      mainPanels={main}
      parentPanel={parent}
      childrenPanel={children}
      startIndexPrev={startIndexPrev}
      setStartIndexPrev={setStartIndexPrev}
      evaluation_good_countPrev={evaluation_good_countPrev}
      setEvaluation_good_countPrev={setEvaluation_good_countPrev}
      comment_countPrev={comment_countPrev}
      setComment_countPrev={setComment_countPrev}
      evaluation_stay_countPrev={evaluation_stay_countPrev}
      setEvaluation_stay_countPrev={setEvaluation_stay_countPrev}
      startIndexNext={startIndexNext}
      setStartIndexNext={setStartIndexNext}
      evaluation_good_countNext={evaluation_good_countNext}
      setEvaluation_good_countNext={setEvaluation_good_countNext}
      comment_countNext={comment_countNext}
      setComment_countNext={setComment_countNext}
      evaluation_stay_countNext={evaluation_stay_countNext}
      setEvaluation_stay_countNext={setEvaluation_stay_countNext}
      evaluation_good_countMain={evaluation_good_countMain}
      setEvaluation_good_countMain={setEvaluation_good_countMain}
      comment_countMain={comment_countMain}
      setComment_countMain={setComment_countMain}
      evaluation_stay_countMain={evaluation_stay_countMain}
      setEvaluation_stay_countMain={setEvaluation_stay_countMain}
    />
  );
};
