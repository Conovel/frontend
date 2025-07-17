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

// パラレル投稿管理用の型定義
interface ParallelSentences {
  [sentenceId: number]: number[]; // 各sentenceIdに対するパラレル投稿のIDリスト
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
export const INITIAL_SENTENCE_ID = 5; // より複雑な構造の中心となるセンテンス

// センテンスの一意のIDを持つデータ
export const sentencesData: SentencesData = {
  1: {
    title_id: 1,
    title: '記憶の欠片',
    sentence: 'ああ，あの若いころ気づいていれば',
    main_copy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: true,
    newArrival: false,
    author_user_name: '金平',
    sentence_id: 1,
    userId: 123,
    userName: '金平',
    textIndex: 0,
    profile_icon_image: 'path/to/image.png',
    evaluation_good_count: 15,
    evaluation_stay_count: 3,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    chips: [{ label: '回想' }, { label: '人生' }],
    tags: [{ label: '恋愛' }, { label: 'ドラマ' }],
    reader_count: 250,
    avatar: {
      src: '',
      alt: '',
      color: '#FF6B6B',
      text: 'K',
    },
    sentence_user_count: 45,
    sentence_hierarchy_count: 8,
  },
  2: {
    title_id: 1,
    title: '記憶の欠片',
    main_copy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: false,
    newArrival: false,
    author_user_name: '金平',
    sentence_id: 2,
    userId: 123,
    userName: '金平',
    sentence:
      '主人の帰りが何よりも心待ちだったことを思い出す．今思えば，なんてちっぽけなことに心躍らせていたんだろう',
    profile_icon_image: 'path/to/image.png',
    evaluation_good_count: 12,
    evaluation_stay_count: 2,
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z',
    chips: [{ label: '日常' }, { label: '回想' }],
    tags: [{ label: '恋愛' }, { label: 'ドラマ' }],
    reader_count: 180,
    avatar: {
      src: '',
      alt: '',
      color: '#FF6B6B',
      text: 'K',
    },
    textIndex: 0,
    sentence_user_count: 32,
    sentence_hierarchy_count: 6,
  },
  3: {
    title_id: 1,
    title: '記憶の欠片',
    sentence:
      'それでも、あの頃の私は、それだけで十分だった。玄関の鍵の音、靴を脱ぐ気配、そして「ただいま」という声。それを聞くたびに、胸の奥がじんわりとあたたかくなった。',
    textIndex: 0,
    main_copy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: false,
    newArrival: false,
    author_user_name: '桜子',
    sentence_id: 3,
    userId: 124,
    userName: '桜子',
    profile_icon_image: 'path/to/image2.png',
    evaluation_good_count: 8,
    evaluation_stay_count: 1,
    created_at: '2024-01-03T00:00:00Z',
    updated_at: '2024-01-03T00:00:00Z',
    chips: [{ label: '愛情' }, { label: '温もり' }],
    tags: [{ label: '恋愛' }, { label: '日常' }],
    reader_count: 95,
    avatar: {
      src: '',
      alt: '',
      color: '#4ECDC4',
      text: '桜',
    },
    sentence_user_count: 18,
    sentence_hierarchy_count: 4,
  },
  4: {
    title_id: 1,
    title: '記憶の欠片',
    sentence:
      'しかし時は過ぎ、その小さな幸せも色褪せていく。毎日の繰り返しの中で、私たちはいつしか互いを当たり前のものとして扱うようになった。',
    textIndex: 0,
    main_copy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: false,
    newArrival: false,
    author_user_name: '夜想',
    sentence_id: 4,
    userId: 125,
    userName: '夜想',
    profile_icon_image: 'path/to/image3.png',
    evaluation_good_count: 14,
    evaluation_stay_count: 4,
    created_at: '2024-01-04T00:00:00Z',
    updated_at: '2024-01-04T00:00:00Z',
    chips: [{ label: '変化' }, { label: '現実' }],
    tags: [{ label: 'ドラマ' }, { label: '人生' }],
    reader_count: 142,
    avatar: {
      src: '',
      alt: '',
      color: '#9B59B6',
      text: '夜',
    },
    sentence_user_count: 28,
    sentence_hierarchy_count: 5,
  },
  5: {
    title_id: 1,
    title: '記憶の欠片',
    sentence:
      '気がつけば、私たちの間に静寂が流れるようになっていた。言葉を交わすことも減り、同じ空間にいても、まるで別々の世界に住んでいるかのようだった。',
    textIndex: 0,
    main_copy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: true,
    newArrival: false,
    author_user_name: '響子',
    sentence_id: 5,
    userId: 126,
    userName: '響子',
    profile_icon_image: 'path/to/image4.png',
    evaluation_good_count: 22,
    evaluation_stay_count: 6,
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-01-05T00:00:00Z',
    chips: [{ label: '孤独' }, { label: '距離' }],
    tags: [{ label: 'ドラマ' }, { label: '恋愛' }],
    reader_count: 320,
    avatar: {
      src: '',
      alt: '',
      color: '#2ECC71',
      text: '響',
    },
    sentence_user_count: 55,
    sentence_hierarchy_count: 12,
  },
  6: {
    title_id: 1,
    title: '記憶の欠片',
    sentence:
      'ある朝、私は決心した。このままではいけない。何かを変えなければ、この関係は終わってしまう。',
    textIndex: 0,
    main_copy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: false,
    newArrival: false,
    author_user_name: '希望',
    sentence_id: 6,
    userId: 127,
    userName: '希望',
    profile_icon_image: 'path/to/image5.png',
    evaluation_good_count: 18,
    evaluation_stay_count: 3,
    created_at: '2024-01-06T00:00:00Z',
    updated_at: '2024-01-06T00:00:00Z',
    chips: [{ label: '決意' }, { label: '転機' }],
    tags: [{ label: 'ドラマ' }, { label: '成長' }],
    reader_count: 167,
    avatar: {
      src: '',
      alt: '',
      color: '#F39C12',
      text: '希',
    },
    sentence_user_count: 34,
    sentence_hierarchy_count: 7,
  },
  7: {
    title_id: 1,
    title: '記憶の欠片',
    sentence:
      'でも、何をすればいいのかわからなかった。どんな言葉をかければ、あの頃の温もりを取り戻せるのだろう。',
    textIndex: 0,
    main_copy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: false,
    newArrival: false,
    author_user_name: '迷い人',
    sentence_id: 7,
    userId: 128,
    userName: '迷い人',
    profile_icon_image: 'path/to/image6.png',
    evaluation_good_count: 9,
    evaluation_stay_count: 2,
    created_at: '2024-01-07T00:00:00Z',
    updated_at: '2024-01-07T00:00:00Z',
    chips: [{ label: '迷い' }, { label: '不安' }],
    tags: [{ label: '心理' }, { label: 'ドラマ' }],
    reader_count: 88,
    avatar: {
      src: '',
      alt: '',
      color: '#E74C3C',
      text: '迷',
    },
    sentence_user_count: 16,
    sentence_hierarchy_count: 3,
  },
  8: {
    title_id: 1,
    title: '記憶の欠片',
    sentence:
      '私は思い切って、彼の好きだったコーヒーを淹れることにした。かつて毎朝していたように、丁寧に、愛情を込めて。',
    textIndex: 0,
    main_copy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: false,
    newArrival: true,
    author_user_name: '珈琲好き',
    sentence_id: 8,
    userId: 129,
    userName: '珈琲好き',
    profile_icon_image: 'path/to/image7.png',
    evaluation_good_count: 11,
    evaluation_stay_count: 1,
    created_at: '2024-01-08T00:00:00Z',
    updated_at: '2024-01-08T00:00:00Z',
    chips: [{ label: '行動' }, { label: '愛情' }],
    tags: [{ label: '日常' }, { label: '恋愛' }],
    reader_count: 102,
    avatar: {
      src: '',
      alt: '',
      color: '#8E44AD',
      text: '珈',
    },
    sentence_user_count: 21,
    sentence_hierarchy_count: 4,
  },
  9: {
    title_id: 1,
    title: '記憶の欠片',
    sentence:
      'あるいは、素直に謝ってみるのはどうだろう。「最近、私たち、すれ違っているね」と。',
    textIndex: 0,
    main_copy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: false,
    newArrival: false,
    author_user_name: '真実',
    sentence_id: 9,
    userId: 130,
    userName: '真実',
    profile_icon_image: 'path/to/image8.png',
    evaluation_good_count: 13,
    evaluation_stay_count: 5,
    created_at: '2024-01-09T00:00:00Z',
    updated_at: '2024-01-09T00:00:00Z',
    chips: [{ label: '正直' }, { label: '対話' }],
    tags: [{ label: 'コミュニケーション' }, { label: 'ドラマ' }],
    reader_count: 134,
    avatar: {
      src: '',
      alt: '',
      color: '#1ABC9C',
      text: '真',
    },
    sentence_user_count: 26,
    sentence_hierarchy_count: 6,
  },
  10: {
    title_id: 1,
    title: '記憶の欠片',
    sentence:
      'コーヒーの香りが部屋に広がった時、彼が振り返った。その目に、久しぶりに見る優しい光が宿っていた。',
    textIndex: 0,
    main_copy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: false,
    newArrival: false,
    author_user_name: '優光',
    sentence_id: 10,
    userId: 131,
    userName: '優光',
    profile_icon_image: 'path/to/image9.png',
    evaluation_good_count: 16,
    evaluation_stay_count: 2,
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-10T00:00:00Z',
    chips: [{ label: '希望' }, { label: '再生' }],
    tags: [{ label: '感動' }, { label: '恋愛' }],
    reader_count: 189,
    avatar: {
      src: '',
      alt: '',
      color: '#3498DB',
      text: '優',
    },
    sentence_user_count: 38,
    sentence_hierarchy_count: 8,
  },
  11: {
    title_id: 1,
    title: '記憶の欠片',
    sentence:
      '「ありがとう」と彼が言った。たった一言だったけれど、その声には昔の温もりが戻っていた。',
    textIndex: 0,
    main_copy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: true,
    newArrival: false,
    author_user_name: '暖かな言葉',
    sentence_id: 11,
    userId: 132,
    userName: '暖かな言葉',
    profile_icon_image: 'path/to/image10.png',
    evaluation_good_count: 25,
    evaluation_stay_count: 4,
    created_at: '2024-01-11T00:00:00Z',
    updated_at: '2024-01-11T00:00:00Z',
    chips: [{ label: '感謝' }, { label: '絆' }],
    tags: [{ label: '感動' }, { label: '恋愛' }],
    reader_count: 298,
    avatar: {
      src: '',
      alt: '',
      color: '#E67E22',
      text: '暖',
    },
    sentence_user_count: 52,
    sentence_hierarchy_count: 9,
  },
  12: {
    title_id: 1,
    title: '記憶の欠片',
    sentence:
      '私たちは静かに座り、久しぶりに本当の会話を始めた。お互いの心の奥にあった思いを、少しずつ言葉にしていった。',
    textIndex: 0,
    main_copy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: false,
    newArrival: false,
    author_user_name: '対話師',
    sentence_id: 12,
    userId: 133,
    userName: '対話師',
    profile_icon_image: 'path/to/image11.png',
    evaluation_good_count: 19,
    evaluation_stay_count: 7,
    created_at: '2024-01-12T00:00:00Z',
    updated_at: '2024-01-12T00:00:00Z',
    chips: [{ label: '対話' }, { label: '理解' }],
    tags: [{ label: 'コミュニケーション' }, { label: 'ドラマ' }],
    reader_count: 221,
    avatar: {
      src: '',
      alt: '',
      color: '#9B59B6',
      text: '対',
    },
    sentence_user_count: 43,
    sentence_hierarchy_count: 10,
  },
  13: {
    title_id: 1,
    title: '記憶の欠片',
    sentence:
      'しかし、全てが元通りになるわけではないことも、私たちは理解していた。傷ついた時間は消せない。',
    textIndex: 0,
    main_copy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: false,
    newArrival: false,
    author_user_name: '現実主義者',
    sentence_id: 13,
    userId: 134,
    userName: '現実主義者',
    profile_icon_image: 'path/to/image12.png',
    evaluation_good_count: 8,
    evaluation_stay_count: 9,
    created_at: '2024-01-13T00:00:00Z',
    updated_at: '2024-01-13T00:00:00Z',
    chips: [{ label: '現実' }, { label: '受容' }],
    tags: [{ label: '哲学' }, { label: 'ドラマ' }],
    reader_count: 156,
    avatar: {
      src: '',
      alt: '',
      color: '#34495E',
      text: '現',
    },
    sentence_user_count: 29,
    sentence_hierarchy_count: 5,
  },
  14: {
    title_id: 1,
    title: '記憶の欠片',
    sentence:
      'それでも、新しい始まりは可能だった。過去の上に、新しい関係を築いていくことができるのだ。',
    textIndex: 0,
    main_copy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: false,
    newArrival: true,
    author_user_name: '新しい始まり',
    sentence_id: 14,
    userId: 135,
    userName: '新しい始まり',
    profile_icon_image: 'path/to/image13.png',
    evaluation_good_count: 21,
    evaluation_stay_count: 3,
    created_at: '2024-01-14T00:00:00Z',
    updated_at: '2024-01-14T00:00:00Z',
    chips: [{ label: '希望' }, { label: '未来' }],
    tags: [{ label: '成長' }, { label: '恋愛' }],
    reader_count: 203,
    avatar: {
      src: '',
      alt: '',
      color: '#27AE60',
      text: '新',
    },
    sentence_user_count: 41,
    sentence_hierarchy_count: 8,
  },
  15: {
    title_id: 1,
    title: '記憶の欠片',
    sentence:
      '今、私たちは手を取り合って、新しい物語を紡いでいる。あの頃とは違う、でも確かな愛情とともに。',
    textIndex: 0,
    main_copy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: true,
    newArrival: false,
    author_user_name: '愛の物語',
    sentence_id: 15,
    userId: 136,
    userName: '愛の物語',
    profile_icon_image: 'path/to/image14.png',
    evaluation_good_count: 31,
    evaluation_stay_count: 2,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    chips: [{ label: '愛' }, { label: '完結' }],
    tags: [{ label: '感動' }, { label: '恋愛' }],
    reader_count: 412,
    avatar: {
      src: '',
      alt: '',
      color: '#E91E63',
      text: '愛',
    },
    sentence_user_count: 67,
    sentence_hierarchy_count: 11,
  },
};

// センテンスの関係性を定義
export const sentenceRelations: SentenceRelations = {
  1: {
    // 物語の始まり
    children: [2],
    main: [],
    parent: [],
  },
  2: {
    // 回想の詳細
    children: [3, 4],
    main: [],
    parent: [1],
  },
  3: {
    // 幸せな思い出の続き
    children: [4],
    main: [],
    parent: [2],
  },
  4: {
    // 関係の変化
    children: [5],
    main: [],
    parent: [2, 3],
  },
  5: {
    // 現在の状況（メイン）
    children: [6, 7],
    main: [],
    parent: [4],
  },
  6: {
    // 決意のルート
    children: [8, 9],
    main: [],
    parent: [5],
  },
  7: {
    // 迷いのルート
    children: [8, 9],
    main: [],
    parent: [5],
  },
  8: {
    // 行動する選択
    children: [10],
    main: [],
    parent: [6, 7],
  },
  9: {
    // 対話する選択
    children: [12],
    main: [],
    parent: [6, 7],
  },
  10: {
    // コーヒーの結果
    children: [11, 12],
    main: [],
    parent: [8],
  },
  11: {
    // 感謝の言葉
    children: [12, 14],
    main: [],
    parent: [10],
  },
  12: {
    // 対話の始まり
    children: [13, 14],
    main: [],
    parent: [9, 10, 11],
  },
  13: {
    // 現実的な視点
    children: [14, 15],
    main: [],
    parent: [12],
  },
  14: {
    // 新しい始まり
    children: [15],
    main: [],
    parent: [11, 12, 13],
  },
  15: {
    // 物語の結末
    children: [],
    main: [],
    parent: [13, 14],
  },
};

// パラレル投稿の管理（より複雑な構造）
export const parallelSentences: ParallelSentences = {
  2: [3, 4], // sentence_id=2から2つのパラレル展開
  5: [6, 7], // sentence_id=5から決意と迷いの2つのパラレル
  6: [8, 9], // sentence_id=6から行動と対話の2つの選択
  7: [8, 9], // sentence_id=7からも同様の選択
  10: [11, 12], // sentence_id=10から感謝と対話へ
  11: [12, 14], // sentence_id=11から対話と新しい始まりへ
  12: [13, 14], // sentence_id=12から現実的視点と希望的視点へ
  13: [14, 15], // sentence_id=13から希望と結末へ
  14: [15], // sentence_id=14から結末へ
};

// 新しい文章を投稿する関数
export const addNewSentence = (
  sentenceText: string,
  parentSentenceId: number,
) => {
  // 現在の最大IDを取得して新しいIDを生成
  const allIds = Object.keys(sentencesData).map((id) => parseInt(id, 10));
  const nextId = Math.max(...allIds) + 1;

  // 投稿日時の生成
  const now = new Date().toISOString();

  // 親センテンスの情報を取得
  const parentSentence = sentencesData[parentSentenceId];

  // 新しいセンテンスオブジェクトを作成
  const newSentence: Sentence = {
    ...parentSentence, // 親の情報を継承
    sentence: sentenceText,
    sentence_id: nextId,
    created_at: now,
    updated_at: now,
    evaluation_good_count: 0,
    evaluation_stay_count: 0,
  };

  // sentencesDataに新しいセンテンスを追加
  sentencesData[nextId] = newSentence;

  // 関係性を更新
  if (!sentenceRelations[nextId]) {
    sentenceRelations[nextId] = {
      children: [],
      main: [],
      parent: [parentSentenceId],
    };
  }

  // 親センテンスの子として追加
  if (sentenceRelations[parentSentenceId]) {
    if (!sentenceRelations[parentSentenceId].children.includes(nextId)) {
      sentenceRelations[parentSentenceId].children.push(nextId);
    }
  }

  // パラレル投稿として管理
  if (!parallelSentences[parentSentenceId]) {
    parallelSentences[parentSentenceId] = [];
  }
  parallelSentences[parentSentenceId].push(nextId);

  return {
    newSentence,
    newSentenceId: nextId,
  };
};

// パラレル投稿を取得する関数
export const getParallelSentences = (sentenceId: number): Sentence[] => {
  const parallelIds = parallelSentences[sentenceId] || [];
  return parallelIds.map((id) => sentencesData[id]).filter(Boolean);
};

// 初期データの構築
export const buildInitialData = (sentenceId: number) => {
  const relations = sentenceRelations[sentenceId];
  if (!relations) return null;

  // メインパネルには現在のセンテンスを表示
  const main = [sentencesData[sentenceId]];

  // 親パネルには親センテンスを表示
  const parent = relations.parent.map((id: number) => sentencesData[id]);

  // 子パネルには子センテンスを表示
  const children = relations.children.map((id: number) => sentencesData[id]);

  console.log('Building data for sentence ID:', sentenceId, {
    main: main.map((m) => m.sentence_id),
    parent: parent.map((p) => p.sentence_id),
    children: children.map((c) => c.sentence_id),
  });

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

// 初期サンプル文データ
export const initialSampleSentence: Sentence = {
  title_id: 1,
  sentence_id: 1,
  sentence: 'これは取得したサンプル文です',
  profile_icon_image: '/path/to/avatar.jpg',
  evaluation_good_count: 10,
  evaluation_stay_count: 2,
  created_at: '2024-06-01T00:00:00Z',
  updated_at: '2024-06-01T00:00:00Z',
  title: '',
  main_copy: '',
  overview: '',
  popular: false,
  newArrival: false,
  author_user_name: '',
  chips: [],
  tags: [],
  reader_count: 0,
  avatar: { src: '', alt: '', color: '', text: '' },
  sentence_user_count: 0,
  sentence_hierarchy_count: 0,
  textIndex: 0,
  userId: 0,
  userName: '',
};
