import { NovelProps } from '../../../types/types';
import * as React from 'react';

export const novels: NovelProps[] = [
  {
    main_copy: '目を覚ますとエンジニアに転生していた',
    overview:
      '雪山で目を覚ますとエンジニアに転生していた.雪山ながら密林からガジェットを取り寄せて悠々生活・快適ライフを送っている',
    title:
      '山暮らし聖女の異世界スローライフ～聖女召喚された私，偽物だとして雪山に廃棄されるも，目が覚めるとエンジニアに転生していたことにより本当の「聖女」になる～',
    text: '雪山で目を覚ますとエンジニアに転生していた。',
    popular: true,
    newArrival: true,
    avatar: {
      src: '/static/images/avatar/1.jpg',
      alt: 'Remy Sharp',
      color: 'magenta',
      text: 'RS',
    },
    author_user_name: 'Remy Sharp',
    chips: [
      React.createElement('span', { key: 'popular' }, '人気'),
      React.createElement('span', { key: 'new' }, '新着'),
    ],
    tags: [
      React.createElement('span', { key: 'love' }, 'ラブストーリー'),
      React.createElement('span', { key: 'fantasy' }, 'ファンタジー'),
    ],
    reader_count: 100,
    updated_at: '2024/08/20',
    sentence_user_count: 150,
    sentence_hierarchy_count: 1000,
    created_at: new Date().toISOString(),
    sentence_id: 1,
    sentence: '',
    userId: 1,
    userName: 'Remy Sharp',
    profile_icon_image: '/static/images/avatar/1.jpg',
    evaluation_good_count: 0,
    evaluation_stay_count: 0,
    textIndex: 0,
    children: [],
    main: [],
    parent: [],
  },
];
