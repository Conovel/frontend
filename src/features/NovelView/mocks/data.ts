import { Sentence, NovelProps } from '../../../types/types';

// センテンスの関係性の型定義
interface SentenceRelation {
  children: number[];
  main: number[];
  parent: number[];
}

interface SentenceRelations {
  [key: number]: SentenceRelation;
}

// センテンスデータの型定義
interface SentencesData {
  [key: number]: Sentence;
}

export const mockParentPanel: NovelProps[] = [
  {
    title_id: 1,
    title: '',
    textIndex: 0,
    main_copy: '',
    overview: '',
    popular: false,
    newArrival: false,
    avatar: {
      src: '',
      alt: '',
      color: '',
      text: '',
    },
    author_user_name: '',
    chips: [],
    tags: [],
    reader_count: 0,
    updated_at: new Date().toISOString(),
    sentence_user_count: 0,
    sentence_hierarchy_count: 0,
    sentence: '',
    sentence_id: 0,
    userId: 0,
    userName: '',
    profile_icon_image: '',
    evaluation_good_count: 0,
    evaluation_stay_count: 0,
    children: [],
    parent: [],
    main: [],
    created_at: new Date().toISOString(),
  },
];

export const mockMainPanel: Sentence[] = [
  {
    title_id: 1,
    title: '',
    sentence: '',
    textIndex: 0,
    overview: '',
    popular: false,
    newArrival: false,
    avatar: {
      src: '',
      alt: '',
      color: '',
      text: '',
    },
    author_user_name: '',
    chips: [],
    created_at: new Date().toISOString(),
    tags: [],
    reader_count: 0,
    updated_at: new Date().toISOString(),
    sentence_user_count: 0,
    sentence_hierarchy_count: 0,
    main_copy: '',
    sentence_id: 0,
    userId: 0,
    userName: '',
    profile_icon_image: '',
    evaluation_good_count: 0,
    evaluation_stay_count: 0,
  },
];

export const mockChildrenPanel: Sentence[] = [
  {
    title_id: 1,
    title: '',
    sentence: '',
    textIndex: 0,
    overview: '',
    popular: false,
    newArrival: false,
    avatar: {
      src: '',
      alt: '',
      color: '',
      text: '',
    },
    author_user_name: '',
    chips: [],
    created_at: new Date().toISOString(),
    tags: [],
    reader_count: 0,
    updated_at: new Date().toISOString(),
    sentence_user_count: 0,
    sentence_hierarchy_count: 0,
    main_copy: '',
    sentence_id: 0,
    userId: 0,
    userName: '',
    profile_icon_image: '',
    evaluation_good_count: 0,
    evaluation_stay_count: 0,
  },
];

export const mockNovelProps = {
  title_id: 1,
  main_copy: '',
  overview: '',
  title: '',
  author_user_name: '',
  chips: [],
  avatar: {
    src: '',
    alt: '',
    color: '',
    text: '',
  },
  popular: false,
  newArrival: false,
  reader_count: 0,
  updated_at: new Date().toISOString(),
  sentence_user_count: 0,
  sentence_hierarchy_count: 0,
  tags: [],
  sentence: '',
  children: mockChildrenPanel,
  parent: mockParentPanel,
  main: mockMainPanel,
  sentence_id: 0,
  userId: 0,
  userName: '',
  profile_icon_image: '',
  evaluation_good_count: 0,
  evaluation_stay_count: 0,
  created_at: new Date().toISOString(),
  textIndex: 0,
};

// 初期読み込み用のセンテンスID設定
export const INITIAL_SENTENCE_ID = 2; // 2番目のセンテンスを初期表示

// センテンスの一意のIDを持つデータ
export const sentencesData: SentencesData = {
  1: {
    title_id: 1,
    title: 'テストタイトル',
    sentence: 'ああ，あの若いころ気づいていれば',
    main_copy: 'テストメインコピー',
    overview: 'テスト概要',
    popular: false,
    newArrival: false,
    author_user_name: 'Kanepion',
    sentence_id: 1,
    userId: 123,
    userName: 'Kanepion',
    textIndex: 0,
    profile_icon_image: 'path/to/image.png',
    evaluation_good_count: 3,
    evaluation_stay_count: 1,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    chips: [],
    tags: [],
    reader_count: 0,
    avatar: {
      src: '',
      alt: '',
      color: '',
      text: '',
    },
    sentence_user_count: 0,
    sentence_hierarchy_count: 0,
  },
  2: {
    title_id: 1,
    title: 'テストタイトル',
    main_copy: 'テストメインコピー',
    overview: 'テスト概要',
    popular: false,
    newArrival: false,
    author_user_name: 'Kanepion',
    sentence_id: 2,
    userId: 123,
    userName: 'Kanepion',
    sentence:
      '主人の帰りが何よりも心待ちだったことを思い出す．今思えば，なんてちっぽけなことに心躍らせていたんだろう',
    profile_icon_image: 'path/to/image.png',
    evaluation_good_count: 0,
    evaluation_stay_count: 0,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    chips: [],
    tags: [],
    reader_count: 0,
    avatar: {
      src: '',
      alt: '',
      color: '',
      text: '',
    },
    textIndex: 0,
    sentence_user_count: 0,
    sentence_hierarchy_count: 0,
  },
  3: {
    title_id: 1,
    title: 'テストタイトル',
    sentence:
      '主人の帰りが何よりも心待ちだったことを思い出す．今思えば，なんてちっぽけなことに心躍らせていたんだろう',
    textIndex: 0,
    main_copy: 'テストメインコピー',
    overview: 'テスト概要',
    popular: false,
    newArrival: false,
    author_user_name: 'Kanepion',
    sentence_id: 3,
    userId: 123,
    userName: 'Kanepion',
    profile_icon_image: 'path/to/image.png',
    evaluation_good_count: 0,
    evaluation_stay_count: 0,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    chips: [],
    tags: [],
    reader_count: 0,
    avatar: {
      src: '',
      alt: '',
      color: '',
      text: '',
    },
    sentence_user_count: 0,
    sentence_hierarchy_count: 0,
  },
};

// センテンスの関係性を定義
export const sentenceRelations: SentenceRelations = {
  1: {
    // 親センテンス
    children: [2],
    main: [2],
    parent: [],
  },
  2: {
    // メインセンテンス
    children: [3],
    main: [],
    parent: [1],
  },
  3: {
    // 子センテンス
    children: [],
    main: [],
    parent: [2],
  },
};

// 初期データの構築
export const buildInitialData = (sentenceId: number) => {
  const relations = sentenceRelations[sentenceId];
  if (!relations) return null;

  const main = [sentencesData[sentenceId]]; // 現在のセンテンスをメインとして表示
  const parent = relations.parent.map((id: number) => sentencesData[id]);
  const children = relations.children.map((id: number) => sentencesData[id]);

  return {
    main,
    parent,
    children,
  };
};

// モックデータの更新
export const mockContainerData = buildInitialData(INITIAL_SENTENCE_ID) || {
  main: [],
  parent: [],
  children: [],
};
