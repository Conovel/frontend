# PostSentence

## Properties

| Name                 | Type       | Description                                              | Notes                             |
| -------------------- | ---------- | -------------------------------------------------------- | --------------------------------- |
| **parentSentenceId** | **number** | 親投稿のid                                               | [optional] [default to undefined] |
| **parentUpdatedAt**  | **string** | 親投稿の修正日時(投稿中の親投稿の更新有無を確認するため) | [optional] [default to undefined] |
| **sentence**         | **string** | 新投稿の本文テキスト                                     | [optional] [default to undefined] |

## Example

```typescript
import { PostSentence } from "./api";

const instance: PostSentence = {
  parentSentenceId,
  parentUpdatedAt,
  sentence,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
