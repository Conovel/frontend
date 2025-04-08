import { rest, RestRequest, ResponseComposition, RestContext } from 'msw';
import { NovelListItem } from '../../../api/api';
import { PostSentence } from '../../../types/types';

// @ts-ignore
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const novelListHandlers = [
  // 小説一覧取得APIモック
  rest.get(
    `${apiBaseUrl}/novels`,
    (_req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
      const response: NovelListItem[] = [
        {
          title_id: 0,
          title: 'サンプル小説',
          famous_sentence_text: '吾輩は犬である',
          author_user_id: 0,
          author_user_name: '夏目懐石',
          profile_icon_image: '',
          title_genres: ['純文学'],
          is_new: true,
          is_famous: true,
        },
      ];
      return res(ctx.status(200), ctx.json(response));
    },
  ),

  // 新しい文章投稿APIモック
  rest.post(
    `${apiBaseUrl}/sentences`,
    async (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
      try {
        const postData = (await req.json()) as PostSentence;
        if (!postData) {
          return res(
            ctx.status(400),
            ctx.json({ message: 'Invalid request data' }),
          );
        }
        return res(
          ctx.status(201),
          ctx.json({ message: 'Sentence posted successfully' }),
        );
      } catch (error) {
        return res(
          ctx.status(400),
          ctx.json({ message: 'Failed to parse request data' }),
        );
      }
    },
  ),
];
