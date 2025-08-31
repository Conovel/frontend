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
    titleId: 1,
    title: '',
    sentence: '',
    textIndex: 0,
    mainCopy: '',
    overview: '',
    popular: false,
    newArrival: false,
    avatar: {
      src: '',
      alt: '',
      color: '',
      text: '',
    },
    authorUserName: '',
    chips: [],
    tags: [],
    readerCount: 0,
    sentenceUserCount: 0,
    sentenceHierarchyCount: 0,
    userId: 0,
    userName: '',
    profileIconImage: '',
    evaluationGoodCount: 0,
    evaluationStayCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    children: [],
    parent: [],
    main: [],
    sentenceId: 0,
  },
];

export const mockMainPanel: Sentence[] = [
  {
    titleId: 1,
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
    authorUserName: '',
    chips: [],
    tags: [],
    readerCount: 0,
    sentenceUserCount: 0,
    sentenceHierarchyCount: 0,
    mainCopy: '',
    userId: 0,
    userName: '',
    profileIconImage: '',
    evaluationGoodCount: 0,
    evaluationStayCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sentenceId: 0,
  },
];

export const mockChildrenPanel: Sentence[] = [
  {
    titleId: 1,
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
    authorUserName: '',
    chips: [],
    tags: [],
    readerCount: 0,
    sentenceUserCount: 0,
    sentenceHierarchyCount: 0,
    mainCopy: '',
    userId: 0,
    userName: '',
    profileIconImage: '',
    evaluationGoodCount: 0,
    evaluationStayCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sentenceId: 0,
  },
];

export const mockNovelProps = {
  titleId: 1,
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
  sentenceUserCount: 0,
  sentenceHierarchyCount: 0,
  tags: [],
  sentence: '',
  children: mockChildrenPanel,
  parent: mockParentPanel,
  main: mockMainPanel,
  userId: 0,
  penName: '',
  profileIconImage: '',
  evaluationGoodCount: 0,
  evaluationStayCount: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  textIndex: 0,
};

// 初期読み込み用のセンテンスID設定
export const INITIAL_SENTENCE_ID = 5; // より複雑な構造の中心となるセンテンス

// センテンスの一意のIDを持つデータ
export const sentencesData: SentencesData = {
  1: {
    titleId: 1,
    title: '記憶の欠片',
    sentence: 'ああ，あの若いころ気づいていれば',
    mainCopy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: true,
    newArrival: false,
    authorUserName: '金平',
    sentenceId: 1,
    userId: 123,
    userName: '金平',
    textIndex: 0,
    profileIconImage: 'path/to/image.png',
    evaluationGoodCount: 15,
    evaluationStayCount: 3,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    chips: [{ label: '回想' }, { label: '人生' }],
    tags: [{ label: '恋愛' }, { label: 'ドラマ' }],
    readerCount: 250,
    avatar: {
      src: '',
      alt: '',
      color: '#FF6B6B',
      text: 'K',
    },
    sentenceUserCount: 45,
    sentenceHierarchyCount: 8,
  },
  2: {
    titleId: 1,
    title: '記憶の欠片',
    mainCopy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: false,
    newArrival: false,
    authorUserName: '金平',
    sentenceId: 2,
    userId: 123,
    userName: '金平',
    sentence:
      '主人の帰りが何よりも心待ちだったことを思い出す．今思えば，なんてちっぽけなことに心躍らせていたんだろう',
    profileIconImage: 'path/to/image.png',
    evaluationGoodCount: 12,
    evaluationStayCount: 2,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
    chips: [{ label: '日常' }, { label: '回想' }],
    tags: [{ label: '恋愛' }, { label: 'ドラマ' }],
    readerCount: 180,
    avatar: {
      src: '',
      alt: '',
      color: '#FF6B6B',
      text: 'K',
    },
    textIndex: 0,
    sentenceUserCount: 32,
    sentenceHierarchyCount: 6,
  },
  3: {
    titleId: 1,
    title: '記憶の欠片',
    sentence:
      'それでも、あの頃の私は、それだけで十分だった。玄関の鍵の音、靴を脱ぐ気配、そして「ただいま」という声。それを聞くたびに、胸の奥がじんわりとあたたかくなった。',
    textIndex: 0,
    mainCopy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: false,
    newArrival: false,
    authorUserName: '桜子',
    sentenceId: 3,
    userId: 124,
    userName: '桜子',
    profileIconImage: 'path/to/image2.png',
    evaluationGoodCount: 8,
    evaluationStayCount: 1,
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
    chips: [{ label: '愛情' }, { label: '温もり' }],
    tags: [{ label: '恋愛' }, { label: '日常' }],
    readerCount: 95,
    avatar: {
      src: '',
      alt: '',
      color: '#4ECDC4',
      text: '桜',
    },
    sentenceUserCount: 18,
    sentenceHierarchyCount: 4,
  },
  4: {
    titleId: 1,
    title: '記憶の欠片',
    sentence:
      'しかし時は過ぎ、その小さな幸せも色褪せていく。毎日の繰り返しの中で、私たちはいつしか互いを当たり前のものとして扱うようになった。',
    textIndex: 0,
    mainCopy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: false,
    newArrival: false,
    authorUserName: '夜想',
    sentenceId: 4,
    userId: 125,
    userName: '夜想',
    profileIconImage: 'path/to/image3.png',
    evaluationGoodCount: 14,
    evaluationStayCount: 4,
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-04T00:00:00Z',
    chips: [{ label: '変化' }, { label: '現実' }],
    tags: [{ label: 'ドラマ' }, { label: '人生' }],
    readerCount: 142,
    avatar: {
      src: '',
      alt: '',
      color: '#9B59B6',
      text: '夜',
    },
    sentenceUserCount: 28,
    sentenceHierarchyCount: 5,
  },
  5: {
    titleId: 1,
    title: '記憶の欠片',
    sentence:
      '気がつけば、私たちの間に静寂が流れるようになっていた。言葉を交わすことも減り、同じ空間にいても、まるで別々の世界に住んでいるかのようだった。',
    textIndex: 0,
    mainCopy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: true,
    newArrival: false,
    authorUserName: '響子',
    sentenceId: 5,
    userId: 126,
    userName: '響子',
    profileIconImage: 'path/to/image4.png',
    evaluationGoodCount: 22,
    evaluationStayCount: 6,
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
    chips: [{ label: '孤独' }, { label: '距離' }],
    tags: [{ label: 'ドラマ' }, { label: '恋愛' }],
    readerCount: 320,
    avatar: {
      src: '',
      alt: '',
      color: '#2ECC71',
      text: '響',
    },
    sentenceUserCount: 55,
    sentenceHierarchyCount: 12,
  },
  6: {
    titleId: 1,
    title: '記憶の欠片',
    sentence:
      'ある朝、私は決心した。このままではいけない。何かを変えなければ、この関係は終わってしまう。',
    textIndex: 0,
    mainCopy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: false,
    newArrival: false,
    authorUserName: '希望',
    sentenceId: 6,
    userId: 127,
    userName: '希望',
    profileIconImage: 'path/to/image5.png',
    evaluationGoodCount: 18,
    evaluationStayCount: 3,
    createdAt: '2024-01-06T00:00:00Z',
    updatedAt: '2024-01-06T00:00:00Z',
    chips: [{ label: '決意' }, { label: '転機' }],
    tags: [{ label: 'ドラマ' }, { label: '成長' }],
    readerCount: 167,
    avatar: {
      src: '',
      alt: '',
      color: '#F39C12',
      text: '希',
    },
    sentenceUserCount: 34,
    sentenceHierarchyCount: 7,
  },
  7: {
    titleId: 1,
    title: '記憶の欠片',
    sentence:
      'でも、何をすればいいのかわからなかった。どんな言葉をかければ、あの頃の温もりを取り戻せるのだろう。',
    textIndex: 0,
    mainCopy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: false,
    newArrival: false,
    authorUserName: '迷い人',
    sentenceId: 7,
    userId: 128,
    userName: '迷い人',
    profileIconImage: 'path/to/image6.png',
    evaluationGoodCount: 9,
    evaluationStayCount: 2,
    createdAt: '2024-01-07T00:00:00Z',
    updatedAt: '2024-01-07T00:00:00Z',
    chips: [{ label: '迷い' }, { label: '不安' }],
    tags: [{ label: '心理' }, { label: 'ドラマ' }],
    readerCount: 88,
    avatar: {
      src: '',
      alt: '',
      color: '#E74C3C',
      text: '迷',
    },
    sentenceUserCount: 16,
    sentenceHierarchyCount: 3,
  },
  8: {
    titleId: 1,
    title: '記憶の欠片',
    sentence:
      '私は思い切って、彼の好きだったコーヒーを淹れることにした。かつて毎朝していたように、丁寧に、愛情を込めて。',
    textIndex: 0,
    mainCopy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: false,
    newArrival: true,
    authorUserName: '珈琲好き',
    sentenceId: 8,
    userId: 129,
    userName: '珈琲好き',
    profileIconImage: 'path/to/image7.png',
    evaluationGoodCount: 11,
    evaluationStayCount: 1,
    createdAt: '2024-01-08T00:00:00Z',
    updatedAt: '2024-01-08T00:00:00Z',
    chips: [{ label: '行動' }, { label: '愛情' }],
    tags: [{ label: '日常' }, { label: '恋愛' }],
    readerCount: 102,
    avatar: {
      src: '',
      alt: '',
      color: '#8E44AD',
      text: '珈',
    },
    sentenceUserCount: 21,
    sentenceHierarchyCount: 4,
  },
  9: {
    titleId: 1,
    title: '記憶の欠片',
    sentence:
      'あるいは、素直に謝ってみるのはどうだろう。「最近、私たち、すれ違っているね」と。',
    textIndex: 0,
    mainCopy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: false,
    newArrival: false,
    authorUserName: '真実',
    sentenceId: 9,
    userId: 130,
    userName: '真実',
    profileIconImage: 'path/to/image8.png',
    evaluationGoodCount: 13,
    evaluationStayCount: 5,
    createdAt: '2024-01-09T00:00:00Z',
    updatedAt: '2024-01-09T00:00:00Z',
    chips: [{ label: '正直' }, { label: '対話' }],
    tags: [{ label: 'コミュニケーション' }, { label: 'ドラマ' }],
    readerCount: 134,
    avatar: {
      src: '',
      alt: '',
      color: '#1ABC9C',
      text: '真',
    },
    sentenceUserCount: 26,
    sentenceHierarchyCount: 6,
  },
  10: {
    titleId: 1,
    title: '記憶の欠片',
    sentence:
      'コーヒーの香りが部屋に広がった時、彼が振り返った。その目に、久しぶりに見る優しい光が宿っていた。',
    textIndex: 0,
    mainCopy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: false,
    newArrival: false,
    authorUserName: '優光',
    sentenceId: 10,
    userId: 131,
    userName: '優光',
    profileIconImage: 'path/to/image9.png',
    evaluationGoodCount: 16,
    evaluationStayCount: 2,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
    chips: [{ label: '希望' }, { label: '再生' }],
    tags: [{ label: '感動' }, { label: '恋愛' }],
    readerCount: 189,
    avatar: {
      src: '',
      alt: '',
      color: '#3498DB',
      text: '優',
    },
    sentenceUserCount: 38,
    sentenceHierarchyCount: 8,
  },
  11: {
    titleId: 1,
    title: '記憶の欠片',
    sentence:
      '「ありがとう」と彼が言った。たった一言だったけれど、その声には昔の温もりが戻っていた。',
    textIndex: 0,
    mainCopy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: true,
    newArrival: false,
    authorUserName: '暖かな言葉',
    sentenceId: 11,
    userId: 132,
    userName: '暖かな言葉',
    profileIconImage: 'path/to/image10.png',
    evaluationGoodCount: 25,
    evaluationStayCount: 4,
    createdAt: '2024-01-11T00:00:00Z',
    updatedAt: '2024-01-11T00:00:00Z',
    chips: [{ label: '感謝' }, { label: '絆' }],
    tags: [{ label: '感動' }, { label: '恋愛' }],
    readerCount: 298,
    avatar: {
      src: '',
      alt: '',
      color: '#E67E22',
      text: '暖',
    },
    sentenceUserCount: 52,
    sentenceHierarchyCount: 9,
  },
  12: {
    titleId: 1,
    title: '記憶の欠片',
    sentence:
      '私たちは静かに座り、久しぶりに本当の会話を始めた。お互いの心の奥にあった思いを、少しずつ言葉にしていった。',
    textIndex: 0,
    mainCopy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: false,
    newArrival: false,
    authorUserName: '対話師',
    sentenceId: 12,
    userId: 133,
    userName: '対話師',
    profileIconImage: 'path/to/image11.png',
    evaluationGoodCount: 19,
    evaluationStayCount: 7,
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z',
    chips: [{ label: '対話' }, { label: '理解' }],
    tags: [{ label: 'コミュニケーション' }, { label: 'ドラマ' }],
    readerCount: 221,
    avatar: {
      src: '',
      alt: '',
      color: '#9B59B6',
      text: '対',
    },
    sentenceUserCount: 43,
    sentenceHierarchyCount: 10,
  },
  13: {
    titleId: 1,
    title: '記憶の欠片',
    sentence:
      'しかし、全てが元通りになるわけではないことも、私たちは理解していた。傷ついた時間は消せない。',
    textIndex: 0,
    mainCopy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: false,
    newArrival: false,
    authorUserName: '現実主義者',
    sentenceId: 13,
    userId: 134,
    userName: '現実主義者',
    profileIconImage: 'path/to/image12.png',
    evaluationGoodCount: 8,
    evaluationStayCount: 9,
    createdAt: '2024-01-13T00:00:00Z',
    updatedAt: '2024-01-13T00:00:00Z',
    chips: [{ label: '現実' }, { label: '受容' }],
    tags: [{ label: '哲学' }, { label: 'ドラマ' }],
    readerCount: 156,
    avatar: {
      src: '',
      alt: '',
      color: '#34495E',
      text: '現',
    },
    sentenceUserCount: 29,
    sentenceHierarchyCount: 5,
  },
  14: {
    titleId: 1,
    title: '記憶の欠片',
    sentence:
      'それでも、新しい始まりは可能だった。過去の上に、新しい関係を築いていくことができるのだ。',
    textIndex: 0,
    mainCopy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: false,
    newArrival: true,
    authorUserName: '新しい始まり',
    sentenceId: 14,
    userId: 135,
    userName: '新しい始まり',
    profileIconImage: 'path/to/image13.png',
    evaluationGoodCount: 21,
    evaluationStayCount: 3,
    createdAt: '2024-01-14T00:00:00Z',
    updatedAt: '2024-01-14T00:00:00Z',
    chips: [{ label: '希望' }, { label: '未来' }],
    tags: [{ label: '成長' }, { label: '恋愛' }],
    readerCount: 203,
    avatar: {
      src: '',
      alt: '',
      color: '#27AE60',
      text: '新',
    },
    sentenceUserCount: 41,
    sentenceHierarchyCount: 8,
  },
  15: {
    titleId: 1,
    title: '記憶の欠片',
    sentence:
      '今、私たちは手を取り合って、新しい物語を紡いでいる。あの頃とは違う、でも確かな愛情とともに。',
    textIndex: 0,
    mainCopy: 'ノスタルジックな回想録',
    overview: '人生の振り返りと後悔の物語',
    popular: true,
    newArrival: false,
    authorUserName: '愛の物語',
    sentenceId: 15,
    userId: 136,
    userName: '愛の物語',
    profileIconImage: 'path/to/image14.png',
    evaluationGoodCount: 31,
    evaluationStayCount: 2,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    chips: [{ label: '愛' }, { label: '完結' }],
    tags: [{ label: '感動' }, { label: '恋愛' }],
    readerCount: 412,
    avatar: {
      src: '',
      alt: '',
      color: '#E91E63',
      text: '愛',
    },
    sentenceUserCount: 67,
    sentenceHierarchyCount: 11,
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
  2: [3, 4], // sentenceId=2から2つのパラレル展開
  5: [6, 7], // sentenceId=5から決意と迷いの2つのパラレル
  6: [8, 9], // sentenceId=6から行動と対話の2つの選択
  7: [8, 9], // sentenceId=7からも同様の選択
  8: [10, 11], // sentenceId=8からコーヒーと感謝へ
  9: [12, 13], // sentenceId=9から対話と現実へ
  10: [11, 12], // sentenceId=10から感謝と対話へ
  11: [12, 14], // sentenceId=11から対話と新しい始まりへ
  12: [13, 14], // sentenceId=12から現実的視点と希望的視点へ
  13: [14, 15], // sentenceId=13から希望と結末へ
  14: [15], // sentenceId=14から結末へ
};

// 現在のユーザー情報を取得する関数（モック）
const getCurrentUserInfo = () => {
  return {
    userId: 999, // 現在のユーザーID
    userName: '現在のユーザー', // 現在のユーザーのペンネーム
    profileIconImage: 'https://via.placeholder.com/40', // 現在のユーザーのアイコン
  };
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

  // 現在のユーザー情報を取得
  const currentUser = getCurrentUserInfo();

  // 新しいセンテンスオブジェクトを作成
  const newSentence: Sentence = {
    ...parentSentence, // 基本的な情報を継承
    sentence: sentenceText,
    sentenceId: nextId,
    userId: currentUser.userId,
    userName: currentUser.userName,
    profileIconImage: currentUser.profileIconImage,
    createdAt: now,
    updatedAt: now,
    evaluationGoodCount: 0,
    evaluationStayCount: 0,
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
  // 重複を避けてパラレル投稿に追加
  if (!parallelSentences[parentSentenceId].includes(nextId)) {
    parallelSentences[parentSentenceId].push(nextId);
  }

  return {
    newSentence,
    newSentenceId: nextId,
  };
};

// パラレル投稿を取得する関数
export const getParallelSentences = (sentenceId: number): Sentence[] => {
  const parallelIds = parallelSentences[sentenceId] || [];
  const parallelSentencesList = parallelIds
    .map((id) => sentencesData[id])
    .filter(Boolean);

  // パラレル投稿の順序を保持し、存在しないIDを除外
  return parallelSentencesList.sort((a, b) => {
    const aIndex = parallelIds.indexOf(a.sentenceId);
    const bIndex = parallelIds.indexOf(b.sentenceId);
    return aIndex - bIndex;
  });
};

// センテンスの評価を更新する関数
export const updateSentenceEvaluation = (
  sentenceId: number,
  evaluationType: 'good' | 'stay',
  increment: boolean = true,
): Sentence | null => {
  const sentence = sentencesData[sentenceId];
  if (!sentence) return null;

  // 評価を更新
  if (evaluationType === 'good') {
    if (increment) {
      sentence.evaluationGoodCount += 1;
      // Stay評価をリセット
      sentence.evaluationStayCount = 0;
    } else {
      sentence.evaluationGoodCount = Math.max(
        0,
        sentence.evaluationGoodCount - 1,
      );
    }
  } else {
    if (increment) {
      sentence.evaluationStayCount += 1;
      // Good評価をリセット
      sentence.evaluationGoodCount = 0;
    } else {
      sentence.evaluationStayCount = Math.max(
        0,
        sentence.evaluationStayCount - 1,
      );
    }
  }

  // 更新日時を更新
  sentence.updatedAt = new Date().toISOString();

  return sentence;
};

// センテンスの評価状態を取得する関数
export const getSentenceEvaluation = (sentenceId: number) => {
  const sentence = sentencesData[sentenceId];
  if (!sentence)
    return {
      goodCount: 0,
      stayCount: 0,
      isGoodEvaluated: false,
      isStayEvaluated: false,
    };

  return {
    goodCount: sentence.evaluationGoodCount,
    stayCount: sentence.evaluationStayCount,
    isGoodEvaluated: sentence.evaluationGoodCount > 0,
    isStayEvaluated: sentence.evaluationStayCount > 0,
  };
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
    main: main.map((m) => m.sentenceId),
    parent: parent.map((p) => p.sentenceId),
    children: children.map((c) => c.sentenceId),
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
  titleId: 1,
  sentenceId: 1,
  sentence: 'これは取得したサンプル文です',
  profileIconImage: '/path/to/avatar.jpg',
  evaluationGoodCount: 10,
  evaluationStayCount: 2,
  createdAt: '2024-06-01T00:00:00Z',
  updatedAt: '2024-06-01T00:00:00Z',
  title: '',
  mainCopy: '',
  overview: '',
  popular: false,
  newArrival: false,
  authorUserName: '',
  chips: [],
  tags: [],
  readerCount: 0,
  avatar: { src: '', alt: '', color: '', text: '' },
  sentenceUserCount: 0,
  sentenceHierarchyCount: 0,
  textIndex: 0,
  userId: 0,
  userName: '',
};
