import { Sentence } from '../../../api';

export const mockParentPanel: Sentence[] = [
  {
    sentenceUserId: 0,
    sentencePenName: '',
    updatedAt: new Date().toISOString(),
    sentence: '',
    sentenceId: 0,
    profileIconImage: '',
    evaluationGoodCount: 0,
    evaluationStayCount: 0,
    createdAt: new Date().toISOString(),
  },
];

export const mockMainPanel: Sentence[] = [
  {
    sentence: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sentenceId: 0,
    sentenceUserId: 0,
    sentencePenName: '',
    profileIconImage: '',
    evaluationGoodCount: 0,
    evaluationStayCount: 0,
  },
];

export const mockChildrenPanel: Sentence[] = [
  {
    sentence: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sentenceId: 0,
    sentenceUserId: 0,
    sentencePenName: '',
    profileIconImage: '',
    evaluationGoodCount: 0,
    evaluationStayCount: 0,
  },
];

export const mockNovelProps = {
  mainCopy: '',
  overview: '',
  title: '',
  authorUserName: '',
  chips: [],
  avatar: {
    src: '',
    alt: '',
    color: '',
    text: '',
  },
  popular: false,
  newArrival: false,
  readerCount: 0,
  updatedAt: new Date().toISOString(),
  sentenceUserCount: 0,
  sentenceHierarchyCount: 0,
  tags: [],
  sentence: '',
  children: mockChildrenPanel,
  parent: mockParentPanel,
  main: mockMainPanel,
  sentenceId: 0,
  userId: 0,
  penName: '',
  profileIconImage: '',
  evaluationGoodCount: 0,
  evaluationStayCount: 0,
  createdAt: new Date().toISOString(),
  textIndex: 0,
};

// NovelViewContainer用のモックデータ
export const mockContainerData: {
  main: Sentence[];
  parent: Sentence[];
  children: Sentence[];
  parallels: Sentence[];
} = {
  main: [
    {
      sentenceId: 1,
      sentenceUserId: 123,
      sentencePenName: 'Kanepion',
      sentence:
        '主人の帰りが何よりも心待ちだったことを思い出す．今思えば，なんてちっぽけなことに心躍らせていたんだろう',
      profileIconImage: 'path/to/image.png',
      evaluationGoodCount: 0,
      evaluationStayCount: 0,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
  ],
  parent: [
    {
      sentenceId: 1,
      sentence: 'ああ，あの若いころ気づいていれば',
      sentenceUserId: 123,
      sentencePenName: 'Kanepion',
      profileIconImage: 'path/to/image.png',
      evaluationGoodCount: 0,
      evaluationStayCount: 0,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
  ],
  children: [
    {
      sentenceId: 1,
      sentence: 'テストテキスト',
      sentenceUserId: 123,
      sentencePenName: 'Kanepion',
      profileIconImage: 'path/to/image.png',
      evaluationGoodCount: 0,
      evaluationStayCount: 0,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
  ],
  parallels: [],
};
