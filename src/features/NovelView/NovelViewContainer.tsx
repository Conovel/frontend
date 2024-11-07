import { NovelViewPresentation } from './NovelViewPresentation';

const mainPanels = [
  {
    id: 1,
    text1: '主人の帰りが何よりも心待ちだったことを思い出す。',
    text2: '今思えば、なんてちっぽけなことに心躍らせていたのだろう。',
  },
];

const prevPanel = {
  id: 1,
  text1: '前の階層のテキスト1',
  text2: '前の階層のテキスト2',
};

const nextPanel = {
  id: 2,
  text1: '次の階層のテキスト1',
  text2: '次の階層のテキスト2',
};

export const NovelViewContainer = () => {
  return (
    <NovelViewPresentation
      posts={[]}
      mainPanels={mainPanels}
      prevPanel={prevPanel}
      nextPanel={nextPanel}
    />
  );
};
