import { NovelViewPresentation } from './NovelViewPresentation';

const posts = [
  {
    id: 1,
    text: 'ああ、あの若い頃気づいていれば...',
    likes: 120,
    comments: 120,
  },
  {
    id: 2,
    text: 'ああ、あの若い頃気づいていれば...',
    likes: 120,
    comments: 120,
  },
  {
    id: 3,
    text: 'ああ、あの若い頃気づいていれば...',
    likes: 120,
    comments: 120,
  },
  {
    id: 4,
    text: 'ああ、あの若い頃気づいていれば...',
    likes: 120,
    comments: 120,
  },
];

const mainPanels = [
  {
    id: 1,
    text1: '主人の帰りが何よりも心待ちだったことを思い出す。',
    text2: '今思えば、なんてちっぽけなことに心躍らせていたのだろう。',
  },
];

export const NovelViewContainer = () => {
  return <NovelViewPresentation posts={posts} mainPanels={mainPanels} />;
};
