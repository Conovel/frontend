# UsersApi

All URIs are relative to _/v1_

| Method                                          | HTTP request                         | Description                                        |
| ----------------------------------------------- | ------------------------------------ | -------------------------------------------------- |
| [**deleteUserByMe**](#deleteuserbyme)           | **POST** /users/me/delete            | 自分自身のユーザーアカウントを論理削除（認証あり） |
| [**getNovelsByUserId**](#getnovelsbyuserid)     | **GET** /users/{userId}/postedNovels | ユーザーが投稿している小説リストを取得             |
| [**getUserById**](#getuserbyid)                 | **GET** /users/{userId}              | IDで自分以外のユーザーアカウント情報を取得         |
| [**getUserByMe**](#getuserbyme)                 | **GET** /users/me                    | 自分自身のユーザーアカウント情報を取得（認証あり） |
| [**getViewedNovelsByMe**](#getviewednovelsbyme) | **GET** /users/me/viewedNovels       | 自分自身が閲覧している小説リストを取得（認証あり） |
| [**updateUserByMe**](#updateuserbyme)           | **POST** /users/me/update            | 自分自身のユーザーアカウント情報を更新（認証あり） |

# **deleteUserByMe**

> deleteUserByMe()

### Example

```typescript
import { UsersApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

const { status, data } = await apiInstance.deleteUserByMe();
```

### Parameters

This endpoint does not have any parameters.

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description          | Response headers |
| ----------- | -------------------- | ---------------- |
| **200**     | ユーザーの削除に成功 | -                |
| **422**     | ユーザーの削除に失敗 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getNovelsByUserId**

> Array<NovelListItem> getNovelsByUserId()

### Example

```typescript
import { UsersApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let userId: number; // (default to undefined)

const { status, data } = await apiInstance.getNovelsByUserId(userId);
```

### Parameters

| Name       | Type         | Description | Notes                 |
| ---------- | ------------ | ----------- | --------------------- |
| **userId** | [**number**] |             | defaults to undefined |

### Return type

**Array<NovelListItem>**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description                                          | Response headers |
| ----------- | ---------------------------------------------------- | ---------------- |
| **200**     | ユーザーIDで取得したユーザーが投稿している小説リスト | -                |
| **404**     | ユーザーが見つからない                               | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUserById**

> User getUserById()

### Example

```typescript
import { UsersApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let userId: number; // (default to undefined)

const { status, data } = await apiInstance.getUserById(userId);
```

### Parameters

| Name       | Type         | Description | Notes                 |
| ---------- | ------------ | ----------- | --------------------- |
| **userId** | [**number**] |             | defaults to undefined |

### Return type

**User**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description                                | Response headers |
| ----------- | ------------------------------------------ | ---------------- |
| **200**     | ユーザーIDで取得したユーザーアカウント情報 | -                |
| **404**     | ユーザーが見つからない                     | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUserByMe**

> ViewMeUser getUserByMe()

### Example

```typescript
import { UsersApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

const { status, data } = await apiInstance.getUserByMe();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**ViewMeUser**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description                      | Response headers |
| ----------- | -------------------------------- | ---------------- |
| **200**     | 自分自身のユーザーアカウント情報 | -                |
| **404**     | ユーザーが見つからない           | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getViewedNovelsByMe**

> Array<NovelListItem> getViewedNovelsByMe()

### Example

```typescript
import { UsersApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

const { status, data } = await apiInstance.getViewedNovelsByMe();
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

| Status code | Description                      | Response headers |
| ----------- | -------------------------------- | ---------------- |
| **200**     | 自分自身が閲覧している小説リスト | -                |
| **404**     | ユーザーが見つからない           | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateUserByMe**

> ViewMeUser updateUserByMe(updateUser)

### Example

```typescript
import { UsersApi, Configuration, UpdateUser } from "./api";

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let updateUser: UpdateUser; //

const { status, data } = await apiInstance.updateUserByMe(updateUser);
```

### Parameters

| Name           | Type           | Description | Notes |
| -------------- | -------------- | ----------- | ----- |
| **updateUser** | **UpdateUser** |             |       |

### Return type

**ViewMeUser**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description              | Response headers |
| ----------- | ------------------------ | ---------------- |
| **200**     | ユーザー情報の更新に成功 | -                |
| **422**     | ユーザー情報の更新に失敗 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
