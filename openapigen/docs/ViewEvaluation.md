# ViewEvaluation

## Properties

| Name                    | Type       | Description        | Notes                             |
| ----------------------- | ---------- | ------------------ | --------------------------------- |
| **sentenceId**          | **number** | 評価対象の投稿のID | [optional] [default to undefined] |
| **evaluationGoodCount** | **number** | Good評価の数       | [optional] [default to undefined] |
| **evaluationStayCount** | **number** | Stay評価の数       | [optional] [default to undefined] |

## Example

```typescript
import { ViewEvaluation } from "./api";

const instance: ViewEvaluation = {
  sentenceId,
  evaluationGoodCount,
  evaluationStayCount,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
