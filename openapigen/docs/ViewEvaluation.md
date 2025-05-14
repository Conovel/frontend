# ViewEvaluation

## Properties

| Name                      | Type       | Description        | Notes                             |
| ------------------------- | ---------- | ------------------ | --------------------------------- |
| **sentence_id**           | **number** | 評価対象の投稿のID | [optional] [default to undefined] |
| **evaluation_good_count** | **number** | Good評価の数       | [optional] [default to undefined] |
| **evaluation_stay_count** | **number** | Stay評価の数       | [optional] [default to undefined] |

## Example

```typescript
import { ViewEvaluation } from "./api";

const instance: ViewEvaluation = {
  sentence_id,
  evaluation_good_count,
  evaluation_stay_count,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
