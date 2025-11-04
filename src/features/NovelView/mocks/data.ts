import { Sentence } from '../../../api/api';

// センテンスの関係性の型定義
interface SentenceRelation {
  children: number[];
  main: number[];
  parent: number[];
}

interface SentenceRelations {
  [key: number]: SentenceRelation;
}

// パラレル投稿管理用の型定義
interface ParallelSentences {
  [sentenceId: number]: number[]; // 各sentenceIdに対するパラレル投稿のIDリスト
}

export const mockParentPanel: Sentence[] = [
  {
    sentenceId: 0,
    sentence: '',
    sentenceUserId: 0,
    sentencePenName: '',
    profileIconImage: '',
    evaluationGoodCount: 0,
    evaluationStayCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockMainPanel: Sentence[] = [
  {
    sentenceId: 0,
    sentence: '',
    sentenceUserId: 0,
    sentencePenName: '',
    profileIconImage: '',
    evaluationGoodCount: 0,
    evaluationStayCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockChildrenPanel: Sentence[] = [
  {
    sentenceId: 0,
    sentence: '',
    sentenceUserId: 0,
    sentencePenName: '',
    profileIconImage: '',
    evaluationGoodCount: 0,
    evaluationStayCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockNovelProps = {
  sentenceId: 0,
  sentence: '',
  sentenceUserId: 0,
  sentencePenName: '',
  profileIconImage: '',
  evaluationGoodCount: 0,
  evaluationStayCount: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  children: mockChildrenPanel,
  parent: mockParentPanel,
  main: mockMainPanel,
};

// 初期読み込み用のセンテンスID設定
// The initial sentence ID is set to 5 by default, as it represents the center of a more complex structure in the mock data.
// You can override this value by setting the environment variable INITIAL_SENTENCE_ID.
export const INITIAL_SENTENCE_ID =
  typeof process !== 'undefined' &&
  process.env &&
  process.env.INITIAL_SENTENCE_ID
    ? Number(process.env.INITIAL_SENTENCE_ID)
    : 5;

// センテンスの一意のIDを持つデータ

export const sentencesData: Record<number, Sentence> = {
  1: {
    sentenceId: 1,
    sentence: 'ああ，あの若いころ気づいていれば',
    sentenceUserId: 123,
    sentencePenName: '金平',
    profileIconImage: 'path/to/image.png',
    evaluationGoodCount: 15,
    evaluationStayCount: 3,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  2: {
    sentenceId: 2,
    sentence:
      '主人の帰りが何よりも心待ちだったことを思い出す．今思えば，なんてちっぽけなことに心躍らせていたんだろう',
    sentenceUserId: 123,
    sentencePenName: '金平',
    profileIconImage: 'path/to/image.png',
    evaluationGoodCount: 12,
    evaluationStayCount: 2,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
  3: {
    sentenceId: 3,
    sentence:
      'それでも、あの頃の私は、それだけで十分だった。玄関の鍵の音、靴を脱ぐ気配、そして「ただいま」という声。それを聞くたびに、胸の奥がじんわりとあたたかくなった。',
    sentenceUserId: 124,
    sentencePenName: '桜子',
    profileIconImage: 'path/to/image2.png',
    evaluationGoodCount: 8,
    evaluationStayCount: 1,
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
  },
  4: {
    sentenceId: 4,
    sentence:
      'しかし時は過ぎ、その小さな幸せも色褪せていく。毎日の繰り返しの中で、私たちはいつしか互いを当たり前のものとして扱うようになった。',
    sentenceUserId: 125,
    sentencePenName: '夜想',
    profileIconImage: 'path/to/image3.png',
    evaluationGoodCount: 14,
    evaluationStayCount: 4,
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-04T00:00:00Z',
  },
  5: {
    sentenceId: 5,
    sentence:
      '気がつけば、私たちの間に静寂が流れるようになっていた。言葉を交わすことも減り、同じ空間にいても、まるで別々の世界に住んでいるかのようだった。',
    sentenceUserId: 126,
    sentencePenName: '響子',
    profileIconImage: 'path/to/image4.png',
    evaluationGoodCount: 22,
    evaluationStayCount: 6,
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
  },
  6: {
    sentenceId: 6,
    sentence:
      '私は決意した。もう一度、彼と向き合うために。小さな一歩でもいいから、何か変えてみようと。',
    sentenceUserId: 127,
    sentencePenName: '決意',
    profileIconImage: 'path/to/image5.png',
    evaluationGoodCount: 18,
    evaluationStayCount: 5,
    createdAt: '2024-01-06T00:00:00Z',
    updatedAt: '2024-01-06T00:00:00Z',
  },
  7: {
    sentenceId: 7,
    sentence:
      'でも、何をすればいいのかわからなかった。どんな言葉をかければ、あの頃の温もりを取り戻せるのだろう。',
    sentenceUserId: 128,
    sentencePenName: '迷い人',
    profileIconImage: 'path/to/image6.png',
    evaluationGoodCount: 9,
    evaluationStayCount: 2,
    createdAt: '2024-01-07T00:00:00Z',
    updatedAt: '2024-01-07T00:00:00Z',
  },
  8: {
    sentenceId: 8,
    sentence:
      '私は思い切って、彼の好きだったコーヒーを淹れることにした。かつて毎朝していたように、丁寧に、愛情を込めて。',
    sentenceUserId: 129,
    sentencePenName: '珈琲好き',
    profileIconImage: 'path/to/image7.png',
    evaluationGoodCount: 11,
    evaluationStayCount: 1,
    createdAt: '2024-01-08T00:00:00Z',
    updatedAt: '2024-01-08T00:00:00Z',
  },
  9: {
    sentenceId: 9,
    sentence:
      'あるいは、素直に謝ってみるのはどうだろう。「最近、私たち、すれ違っているね」と。',
    sentenceUserId: 130,
    sentencePenName: '真実',
    profileIconImage: 'path/to/image8.png',
    evaluationGoodCount: 13,
    evaluationStayCount: 5,
    createdAt: '2024-01-09T00:00:00Z',
    updatedAt: '2024-01-09T00:00:00Z',
  },
  10: {
    sentenceId: 10,
    sentence:
      'コーヒーの香りが部屋に広がった時、彼が振り返った。その目に、久しぶりに見る優しい光が宿っていた。',
    sentenceUserId: 131,
    sentencePenName: '優光',
    profileIconImage: 'path/to/image9.png',
    evaluationGoodCount: 16,
    evaluationStayCount: 2,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
  },
  11: {
    sentenceId: 11,
    sentence:
      '「ありがとう」と彼が言った。たった一言だったけれど、その声には昔の温もりが戻っていた。',
    sentenceUserId: 132,
    sentencePenName: '暖かな言葉',
    profileIconImage: 'path/to/image10.png',
    evaluationGoodCount: 25,
    evaluationStayCount: 4,
    createdAt: '2024-01-11T00:00:00Z',
    updatedAt: '2024-01-11T00:00:00Z',
  },
  12: {
    sentenceId: 12,
    sentence:
      '私たちは静かに座り、久しぶりに本当の会話を始めた。お互いの心の奥にあった思いを、少しずつ言葉にしていった。',
    sentenceUserId: 133,
    sentencePenName: '対話師',
    profileIconImage: 'path/to/image11.png',
    evaluationGoodCount: 19,
    evaluationStayCount: 7,
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z',
  },
  13: {
    sentenceId: 13,
    sentence:
      'しかし、全てが元通りになるわけではないことも、私たちは理解していた。傷ついた時間は消せない。',
    sentenceUserId: 134,
    sentencePenName: '現実主義者',
    profileIconImage: 'path/to/image12.png',
    evaluationGoodCount: 8,
    evaluationStayCount: 9,
    createdAt: '2024-01-13T00:00:00Z',
    updatedAt: '2024-01-13T00:00:00Z',
  },
  14: {
    sentenceId: 14,
    sentence:
      'それでも、新しい始まりは可能だった。過去の上に、新しい関係を築いていくことができるのだ。',
    sentenceUserId: 135,
    sentencePenName: '新しい始まり',
    profileIconImage: 'path/to/image13.png',
    evaluationGoodCount: 21,
    evaluationStayCount: 3,
    createdAt: '2024-01-14T00:00:00Z',
    updatedAt: '2024-01-14T00:00:00Z',
  },
  15: {
    sentenceId: 15,
    sentence:
      '今、私たちは手を取り合って、新しい物語を紡いでいる。あの頃とは違う、でも確かな愛情とともに。',
    sentenceUserId: 136,
    sentencePenName: '愛の物語',
    profileIconImage: 'path/to/image14.png',
    evaluationGoodCount: 31,
    evaluationStayCount: 2,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
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
    userId: 999,
    sentenceUserId: 999,
    sentencePenName: '現在のユーザー', // 現在のユーザーのペンネーム
    profileIconImage: 'https://via.placeholder.com/40', // 現在のユーザーのアイコン
  };
};

// ユーザーごとの評価状態を管理
export const userEvaluations: { [key: string]: 'good' | 'stay' | null } = {};

// 現在のユーザーIDを取得
const getCurrentUserId = (): number => {
  return getCurrentUserInfo().userId;
};

// ユーザーの評価キーを生成
const getUserEvaluationKey = (userId: number, sentenceId: number): string => {
  return `${userId}_${sentenceId}`;
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

  // 現在のユーザー情報を取得
  const currentUser = getCurrentUserInfo();

  // 新しいセンテンスオブジェクトを作成
  const newSentence: Sentence = {
    sentenceId: nextId,
    sentence: sentenceText,
    sentenceUserId: currentUser.sentenceUserId,
    sentencePenName: currentUser.sentencePenName,
    profileIconImage: currentUser.profileIconImage,
    evaluationGoodCount: 0,
    evaluationStayCount: 0,
    createdAt: now,
    updatedAt: now,
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
    const aIndex = parallelIds.indexOf(a.sentenceId || 0);
    const bIndex = parallelIds.indexOf(b.sentenceId || 0);
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

  const currentUserId = getCurrentUserId();
  const userKey = getUserEvaluationKey(currentUserId, sentenceId);
  const currentUserEvaluation = userEvaluations[userKey] || null;

  // 一人一評価制のチェック
  if (increment) {
    // 既に同じ評価をしている場合は何もしない
    if (currentUserEvaluation === evaluationType) {
      return sentence;
    }

    // 既に別の評価をしている場合は、その評価を減らす
    if (currentUserEvaluation === 'good') {
      sentence.evaluationGoodCount = Math.max(
        0,
        (sentence.evaluationGoodCount || 0) - 1,
      );
    } else if (currentUserEvaluation === 'stay') {
      sentence.evaluationStayCount = Math.max(
        0,
        (sentence.evaluationStayCount || 0) - 1,
      );
    }

    // 新しい評価を追加
    if (evaluationType === 'good') {
      sentence.evaluationGoodCount = (sentence.evaluationGoodCount || 0) + 1;
    } else {
      sentence.evaluationStayCount = (sentence.evaluationStayCount || 0) + 1;
    }

    // ユーザーの評価状態を更新
    userEvaluations[userKey] = evaluationType;
  } else {
    // 評価を取り消す場合
    if (currentUserEvaluation === evaluationType) {
      if (evaluationType === 'good') {
        sentence.evaluationGoodCount = Math.max(
          0,
          (sentence.evaluationGoodCount || 0) - 1,
        );
      } else {
        sentence.evaluationStayCount = Math.max(
          0,
          (sentence.evaluationStayCount || 0) - 1,
        );
      }
      userEvaluations[userKey] = null;
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

  const currentUserId = getCurrentUserId();
  const userKey = getUserEvaluationKey(currentUserId, sentenceId);
  const currentUserEvaluation = userEvaluations[userKey] || null;

  return {
    goodCount: sentence.evaluationGoodCount,
    stayCount: sentence.evaluationStayCount,
    isGoodEvaluated: currentUserEvaluation === 'good',
    isStayEvaluated: currentUserEvaluation === 'stay',
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

const emptySentence: Sentence = {
  sentenceId: 0,
  sentence: '',
  sentenceUserId: 0,
  sentencePenName: '',
  profileIconImage: '',
  evaluationGoodCount: 0,
  evaluationStayCount: 0,
  createdAt: '1970-01-01T00:00:00Z',
  updatedAt: '1970-01-01T00:00:00Z',
};

// 初期サンプル文データ（OpenAPI仕様に準拠）
// OpenAPI仕様のSentence型に完全に準拠していることを保証
export const initialSampleSentence: Sentence = {
  sentenceId:
    sentencesData[INITIAL_SENTENCE_ID]?.sentenceId ??
    sentencesData[1]?.sentenceId ??
    emptySentence.sentenceId,
  sentence:
    sentencesData[INITIAL_SENTENCE_ID]?.sentence ??
    sentencesData[1]?.sentence ??
    emptySentence.sentence,
  sentenceUserId:
    sentencesData[INITIAL_SENTENCE_ID]?.sentenceUserId ??
    sentencesData[1]?.sentenceUserId ??
    emptySentence.sentenceUserId,
  sentencePenName:
    sentencesData[INITIAL_SENTENCE_ID]?.sentencePenName ??
    sentencesData[1]?.sentencePenName ??
    emptySentence.sentencePenName,
  profileIconImage:
    sentencesData[INITIAL_SENTENCE_ID]?.profileIconImage ??
    sentencesData[1]?.profileIconImage ??
    emptySentence.profileIconImage,
  evaluationGoodCount:
    sentencesData[INITIAL_SENTENCE_ID]?.evaluationGoodCount ??
    sentencesData[1]?.evaluationGoodCount ??
    emptySentence.evaluationGoodCount,
  evaluationStayCount:
    sentencesData[INITIAL_SENTENCE_ID]?.evaluationStayCount ??
    sentencesData[1]?.evaluationStayCount ??
    emptySentence.evaluationStayCount,
  createdAt:
    sentencesData[INITIAL_SENTENCE_ID]?.createdAt ??
    sentencesData[1]?.createdAt ??
    emptySentence.createdAt,
  updatedAt:
    sentencesData[INITIAL_SENTENCE_ID]?.updatedAt ??
    sentencesData[1]?.updatedAt ??
    emptySentence.updatedAt,
};
