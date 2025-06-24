# SentencesApi

All URIs are relative to _/v1_

| Method                                  | HTTP request                     | Description                                  |
| --------------------------------------- | -------------------------------- | -------------------------------------------- |
| [**getSentenceById**](#getsentencebyid) | **GET** /sentences/{sentence_id} | IDで投稿を取得（認証あり）                   |
| [**postSentence**](#postsentence)       | **POST** /sentences              | メイン投稿の続きの新規投稿を作成（認証あり） |

# **getSentenceById**

> ViewSentence getSentenceById()

### Example

```typescript
import { SentencesApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new SentencesApi(configuration);

let sentenceId: number; // (default to undefined)

const { status, data } = await apiInstance.getSentenceById(sentenceId);
```

### Parameters

| Name           | Type         | Description | Notes                 |
| -------------- | ------------ | ----------- | --------------------- |
| **sentenceId** | [**number**] |             | defaults to undefined |

### Return type

**ViewSentence**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description                        | Response headers |
| ----------- | ---------------------------------- | ---------------- |
| **200**     | 投稿IDで取得した投稿および関連投稿 | -                |
| **404**     | 投稿が見つからない                 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **postSentence**

> ViewSentence postSentence(postSentence)

### Example

```typescript
import { SentencesApi, Configuration, PostSentence } from "./api";

const configuration = new Configuration();
const apiInstance = new SentencesApi(configuration);

let postSentence: PostSentence; //

const { status, data } = await apiInstance.postSentence(postSentence);
```

### Parameters

| Name             | Type             | Description | Notes |
| ---------------- | ---------------- | ----------- | ----- |
| **postSentence** | **PostSentence** |             |       |

### Return type

**ViewSentence**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description                        | Response headers |
| ----------- | ---------------------------------- | ---------------- |
| **201**     | 新規投稿の追加に成功               | -                |
| **422**     | 新規投稿の追加に失敗               | -                |
| **409**     | 親投稿が編集されたため、投稿を保留 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
