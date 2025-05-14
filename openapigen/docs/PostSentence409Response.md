# PostSentence409Response

## Properties

| Name          | Type                                            | Description | Notes                             |
| ------------- | ----------------------------------------------- | ----------- | --------------------------------- |
| **error**     | [**ErrorResponseError**](ErrorResponseError.md) |             | [optional] [default to undefined] |
| **main**      | [**Sentence**](Sentence.md)                     |             | [optional] [default to undefined] |
| **parent**    | [**Sentence**](Sentence.md)                     |             | [optional] [default to undefined] |
| **parallels** | [**Array&lt;Sentence&gt;**](Sentence.md)        |             | [optional] [default to undefined] |
| **children**  | [**Array&lt;Sentence&gt;**](Sentence.md)        |             | [optional] [default to undefined] |

## Example

```typescript
import { PostSentence409Response } from "./api";

const instance: PostSentence409Response = {
  error,
  main,
  parent,
  parallels,
  children,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
