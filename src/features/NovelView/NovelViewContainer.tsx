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
  const [commentCountPrev, setCommentCountPrev] = useState<number>(0);
  const [nextPlanCountPrev, setNextPlanCountPrev] = useState<number>(0);
  const [evaluation_good_countNext, setEvaluation_good_countNext] =
    useState<number>(0);
  const [commentCountNext, setCommentCountNext] = useState<number>(0);
  const [nextPlanCountNext, setNextPlanCountNext] = useState<number>(0);

  return (
    <NovelViewPresentation
      mainPanels={main}
      parentPanel={parent}
      childrenPanel={children}
      startIndexPrev={startIndexPrev}
      setStartIndexPrev={setStartIndexPrev}
      evaluation_good_countPrev={evaluation_good_countPrev}
      setEvaluation_good_countPrev={setEvaluation_good_countPrev}
      commentCountPrev={commentCountPrev}
      setCommentCountPrev={setCommentCountPrev}
      nextPlanCountPrev={nextPlanCountPrev}
      setNextPlanCountPrev={setNextPlanCountPrev}
      startIndexNext={startIndexNext}
      setStartIndexNext={setStartIndexNext}
      evaluation_good_countNext={evaluation_good_countNext}
      setEvaluation_good_countNext={setEvaluation_good_countNext}
      commentCountNext={commentCountNext}
      setCommentCountNext={setCommentCountNext}
      nextPlanCountNext={nextPlanCountNext}
      setNextPlanCountNext={setNextPlanCountNext}
    />
  );
};
