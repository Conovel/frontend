# NovelDetail

## Properties

| Name                       | Type                    | Description                                                  | Notes                             |
| -------------------------- | ----------------------- | ------------------------------------------------------------ | --------------------------------- |
| **titleId**                | **number**              | 小説の一意のid（この値は他の小説と重複しない必要があります） | [optional] [default to undefined] |
| **title**                  | **string**              | 小説のタイトル                                               | [optional] [default to undefined] |
| **famousSentenceText**     | **string**              | 名言・印象に残るシーン                                       | [optional] [default to undefined] |
| **authorUserId**           | **number**              | 小説の作者のid                                               | [optional] [default to undefined] |
| **authorPenName**          | **string**              | 小説の作者のペンネーム                                       | [optional] [default to undefined] |
| **profileIconImage**       | **string**              | 小説の作者のアイコン画像のurl                                | [optional] [default to undefined] |
| **titleGenres**            | **Array&lt;string&gt;** | 小説のジャンル                                               | [optional] [default to undefined] |
| **isNew**                  | **boolean**             | 新着小説かどうか                                             | [optional] [default to undefined] |
| **isFamous**               | **boolean**             | 人気小説かどうか                                             | [optional] [default to undefined] |
| **viewCount**              | **number**              | 小説の閲覧数                                                 | [optional] [default to undefined] |
| **evaluationGoodCount**    | **number**              | 小説のGood評価の数                                           | [optional] [default to undefined] |
| **createdAt**              | **string**              | 小説の作成日時                                               | [optional] [default to undefined] |
| **updatedAt**              | **string**              | 小説の修正日時                                               | [optional] [default to undefined] |
| **mainCopy**               | **string**              | 小説の紹介文                                                 | [optional] [default to undefined] |
| **sentenceUserCount**      | **number**              | 小説に投稿している投稿者の数                                 | [optional] [default to undefined] |
| **sentenceHierarchyCount** | **number**              | 小説に投稿された投稿の階層数                                 | [optional] [default to undefined] |
| **readerCount**            | **number**              | 小説を読んだユーザーの数                                     | [optional] [default to undefined] |
| **overview**               | **string**              | 小説のあらすじ                                               | [optional] [default to undefined] |

## Example

```typescript
import { NovelDetail } from "./api";

const instance: NovelDetail = {
  titleId,
  title,
  famousSentenceText,
  authorUserId,
  authorPenName,
  profileIconImage,
  titleGenres,
  isNew,
  isFamous,
  viewCount,
  evaluationGoodCount,
  createdAt,
  updatedAt,
  mainCopy,
  sentenceUserCount,
  sentenceHierarchyCount,
  readerCount,
  overview,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
