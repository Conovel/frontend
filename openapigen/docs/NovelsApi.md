# NovelsApi

All URIs are relative to _/v1_

| Method                            | HTTP request              | Description          |
| --------------------------------- | ------------------------- | -------------------- |
| [**getNovelById**](#getnovelbyid) | **GET** /novels/{titleId} | IDで小説の概要を取得 |
| [**getNovels**](#getnovels)       | **GET** /novels           | 小説リストを取得     |

# **getNovelById**

> NovelDetail getNovelById()

### Example

```typescript
import { NovelsApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new NovelsApi(configuration);

let titleId: number; // (default to undefined)

const { status, data } = await apiInstance.getNovelById(titleId);
```

### Parameters

| Name        | Type         | Description | Notes                 |
| ----------- | ------------ | ----------- | --------------------- |
| **titleId** | [**number**] |             | defaults to undefined |

### Return type

**NovelDetail**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | 小説IDで取得した各小説の概要 | -                |
| **404**     | 小説が見つからない           | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getNovels**

> Array<NovelListItem> getNovels()

### Example

```typescript
import { NovelsApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new NovelsApi(configuration);

const { status, data } = await apiInstance.getNovels();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**Array<NovelListItem>**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description                                        | Response headers |
| ----------- | -------------------------------------------------- | ---------------- |
| **200**     | 直近で後続の投稿があったものを先頭にした小説リスト | -                |
| **422**     | 小説リストの取得に失敗                             | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
