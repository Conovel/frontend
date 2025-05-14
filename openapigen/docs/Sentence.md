# Sentence

## Properties

| Name                      | Type       | Description                                                  | Notes                             |
| ------------------------- | ---------- | ------------------------------------------------------------ | --------------------------------- |
| **sentence_id**           | **number** | 投稿の一意のid（この値は他の投稿と重複しない必要があります） | [optional] [default to undefined] |
| **sentence**              | **string** | 投稿の本文テキスト                                           | [optional] [default to undefined] |
| **sentence_user_id**      | **number** | 投稿ユーザーのid                                             | [optional] [default to undefined] |
| **sentence_user_name**    | **string** | 投稿ユーザーのペンネーム                                     | [optional] [default to undefined] |
| **profile_icon_image**    | **string** | 投稿ユーザーアイコン画像のurl                                | [optional] [default to undefined] |
| **evaluation_good_count** | **number** | 投稿に対するGood評価の数                                     | [optional] [default to undefined] |
| **evaluation_stay_count** | **number** | 投稿に対するStay評価の数                                     | [optional] [default to undefined] |
| **created_at**            | **string** | 投稿日時                                                     | [optional] [default to undefined] |
| **updated_at**            | **string** | 修正日時                                                     | [optional] [default to undefined] |

## Example

```typescript
import { Sentence } from "./api";

const instance: Sentence = {
  sentence_id,
  sentence,
  sentence_user_id,
  sentence_user_name,
  profile_icon_image,
  evaluation_good_count,
  evaluation_stay_count,
  created_at,
  updated_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
