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
  const [evaluationGoodCountPrev, setEvaluationGoodCountPrev] =
    useState<number>(0);
  const [commentCountPrev, setCommentCountPrev] = useState<number>(0);
  const [nextPlanCountPrev, setNextPlanCountPrev] = useState<number>(0);
  const [evaluationGoodCountNext, setEvaluationGoodCountNext] =
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
      evaluationGoodCountPrev={evaluationGoodCountPrev}
      setEvaluationGoodCountPrev={setEvaluationGoodCountPrev}
      commentCountPrev={commentCountPrev}
      setCommentCountPrev={setCommentCountPrev}
      nextPlanCountPrev={nextPlanCountPrev}
      setNextPlanCountPrev={setNextPlanCountPrev}
      startIndexNext={startIndexNext}
      setStartIndexNext={setStartIndexNext}
      evaluationGoodCountNext={evaluationGoodCountNext}
      setEvaluationGoodCountNext={setEvaluationGoodCountNext}
      commentCountNext={commentCountNext}
      setCommentCountNext={setCommentCountNext}
      nextPlanCountNext={nextPlanCountNext}
      setNextPlanCountNext={setNextPlanCountNext}
    />
  );
};
