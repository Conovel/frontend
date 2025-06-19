import { Sentence, NovelProps } from '../../../types/types';
interface SentenceRelation {
    children: number[];
    main: number[];
    parent: number[];
}
interface SentenceRelations {
    [key: number]: SentenceRelation;
}
interface SentencesData {
    [key: number]: Sentence;
}
interface ParallelSentences {
    [sentenceId: number]: number[];
}
export declare const mockParentPanel: NovelProps[];
export declare const mockMainPanel: Sentence[];
export declare const mockChildrenPanel: Sentence[];
export declare const mockNovelProps: {
    title_id: number;
    main_copy: string;
    overview: string;
    title: string;
    author_user_name: string;
    chips: never[];
    avatar: {
        src: string;
        alt: string;
        color: string;
        text: string;
    };
    popular: boolean;
    newArrival: boolean;
    reader_count: number;
    updated_at: string;
    sentence_user_count: number;
    sentence_hierarchy_count: number;
    tags: never[];
    sentence: string;
    children: Sentence[];
    parent: NovelProps[];
    main: Sentence[];
    sentence_id: number;
    userId: number;
    userName: string;
    profile_icon_image: string;
    evaluation_good_count: number;
    evaluation_stay_count: number;
    created_at: string;
    textIndex: number;
};
export declare const INITIAL_SENTENCE_ID = 5;
export declare const sentencesData: SentencesData;
export declare const sentenceRelations: SentenceRelations;
export declare const parallelSentences: ParallelSentences;
export declare const addNewSentence: (sentenceText: string, parentSentenceId: number) => {
    newSentence: Sentence;
    newSentenceId: number;
};
export declare const getParallelSentences: (sentenceId: number) => Sentence[];
export declare const buildInitialData: (sentenceId: number) => {
    main: Sentence[];
    parent: Sentence[];
    children: Sentence[];
} | null;
export declare const mockContainerData: {
    main: Sentence[];
    parent: Sentence[];
    children: Sentence[];
};
export {};
