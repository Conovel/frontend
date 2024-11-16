import { NovelViewPresentation } from './NovelViewPresentation';

const main = [
  {
    sentence_id: 2,
    sentence:
      '主人の帰りが何よりも心待ちだったことを思い出す。今思えば、なんてちっぽけなことに心躍らせていたのだろう。',
  },
];

const parent = {
  sentence_id: 1,
  sentence: '前の階層のテキスト1',
};

const children = {
  sentence_id: 3,
  sentence: '次の階層のテキスト1',
};

export const NovelViewContainer = () => {
  return (
    <NovelViewPresentation
      posts={[]}
      mainPanels={main}
      parentPanel={parent}
      childrenPanel={children}
    />
  );
};
