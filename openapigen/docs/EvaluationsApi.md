# EvaluationsApi

All URIs are relative to _/v1_

| Method                                    | HTTP request          | Description                        |
| ----------------------------------------- | --------------------- | ---------------------------------- |
| [**evaluateSentence**](#evaluatesentence) | **POST** /evaluations | 投稿に対する評価を追加（認証あり） |

# **evaluateSentence**

> ViewEvaluation evaluateSentence(evaluateSentence)

### Example

```typescript
import { EvaluationsApi, Configuration, EvaluateSentence } from "./api";

const configuration = new Configuration();
const apiInstance = new EvaluationsApi(configuration);

let evaluateSentence: EvaluateSentence; //

const { status, data } = await apiInstance.evaluateSentence(evaluateSentence);
```

### Parameters

| Name                 | Type                 | Description | Notes |
| -------------------- | -------------------- | ----------- | ----- |
| **evaluateSentence** | **EvaluateSentence** |             |       |

### Return type

**ViewEvaluation**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description      | Response headers |
| ----------- | ---------------- | ---------------- |
| **201**     | 評価の追加に成功 | -                |
| **422**     | 評価の追加に失敗 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
