# Sentence

## Properties

| Name                    | Type       | Description                                                  | Notes                             |
| ----------------------- | ---------- | ------------------------------------------------------------ | --------------------------------- |
| **sentenceId**          | **number** | 投稿の一意のid（この値は他の投稿と重複しない必要があります） | [optional] [default to undefined] |
| **sentence**            | **string** | 投稿の本文テキスト                                           | [optional] [default to undefined] |
| **sentenceUserId**      | **number** | 投稿ユーザーのid                                             | [optional] [default to undefined] |
| **sentencePenName**     | **string** | 投稿ユーザーのペンネーム                                     | [optional] [default to undefined] |
| **profileIconImage**    | **string** | 投稿ユーザーアイコン画像のurl                                | [optional] [default to undefined] |
| **evaluationGoodCount** | **number** | 投稿に対するGood評価の数                                     | [optional] [default to undefined] |
| **evaluationStayCount** | **number** | 投稿に対するStay評価の数                                     | [optional] [default to undefined] |
| **userEvaluation**      | **string** | 投稿に対するログインユーザーの評価状態                       | [optional] [default to undefined] |
| **createdAt**           | **string** | 投稿日時                                                     | [optional] [default to undefined] |
| **updatedAt**           | **string** | 修正日時                                                     | [optional] [default to undefined] |

## Example

```typescript
import { Sentence } from "./api";

const instance: Sentence = {
  sentenceId,
  sentence,
  sentenceUserId,
  sentencePenName,
  profileIconImage,
  evaluationGoodCount,
  evaluationStayCount,
  userEvaluation,
  createdAt,
  updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
