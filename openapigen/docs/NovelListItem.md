# NovelListItem

## Properties

| Name                      | Type                    | Description                                                  | Notes                             |
| ------------------------- | ----------------------- | ------------------------------------------------------------ | --------------------------------- |
| **title_id**              | **number**              | 小説の一意のid（この値は他の小説と重複しない必要があります） | [optional] [default to undefined] |
| **title**                 | **string**              | 小説のタイトル                                               | [optional] [default to undefined] |
| **famous_sentence_text**  | **string**              | 名言・印象に残るシーン                                       | [optional] [default to undefined] |
| **author_user_id**        | **number**              | 小説の作者のid                                               | [optional] [default to undefined] |
| **author_user_name**      | **string**              | 小説の作者のペンネーム                                       | [optional] [default to undefined] |
| **profile_icon_image**    | **string**              | 小説の作者のアイコン画像のurl                                | [optional] [default to undefined] |
| **title_genres**          | **Array&lt;string&gt;** | 小説のジャンル                                               | [optional] [default to undefined] |
| **is_new**                | **boolean**             | 新着小説かどうか                                             | [optional] [default to undefined] |
| **is_famous**             | **boolean**             | 人気小説かどうか                                             | [optional] [default to undefined] |
| **view_count**            | **number**              | 小説の閲覧数                                                 | [optional] [default to undefined] |
| **evaluation_good_count** | **number**              | 小説のGood評価の数                                           | [optional] [default to undefined] |
| **created_at**            | **string**              | 小説の作成日時                                               | [optional] [default to undefined] |
| **updated_at**            | **string**              | 小説の修正日時                                               | [optional] [default to undefined] |

## Example

```typescript
import { NovelListItem } from "./api";

const instance: NovelListItem = {
  title_id,
  title,
  famous_sentence_text,
  author_user_id,
  author_user_name,
  profile_icon_image,
  title_genres,
  is_new,
  is_famous,
  view_count,
  evaluation_good_count,
  created_at,
  updated_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
