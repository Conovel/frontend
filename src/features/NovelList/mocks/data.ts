import { NovelDetail } from '../../../api';

export const novels: NovelDetail[] = [
  {
    mainCopy: '目を覚ますとエンジニアに転生していた',
    overview:
      '雪山で目を覚ますとエンジニアに転生していた.雪山ながら密林からガジェットを取り寄せて悠々生活・快適ライフを送っている',
    title:
      '山暮らし聖女の異世界スローライフ～聖女召喚された私，偽物だとして雪山に廃棄されるも，目が覚めるとエンジニアに転生していたことにより本当の「聖女」になる～',
    isFamous: true,
    isNew: true,
    profileIconImage: '/static/images/avatar/1.jpg',
    authorUserName: 'Remy Sharp',
    titleGenres: ['人気', '新着'],
    readerCount: 100,
    updatedAt: '2024/08/20',
    sentenceUserCount: 150,
    sentenceHierarchyCount: 1000,
    createdAt: new Date().toISOString(),
    titleId: 1,
    authorUserId: 1,
    evaluationGoodCount: 0,
  },
];
