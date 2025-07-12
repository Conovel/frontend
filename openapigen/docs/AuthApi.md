# AuthApi

All URIs are relative to _/v1_

| Method                            | HTTP request           | Description                        |
| --------------------------------- | ---------------------- | ---------------------------------- |
| [**logOut**](#logout)             | **POST** /auth/logout  | ログアウト                         |
| [**refreshToken**](#refreshtoken) | **POST** /auth/refresh | トークンのリフレッシュ（認証あり） |

# **logOut**

> logOut()

### Example

```typescript
import { AuthApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

const { status, data } = await apiInstance.logOut();
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

| Status code | Description    | Response headers |
| ----------- | -------------- | ---------------- |
| **200**     | ログアウト成功 | -                |
| **401**     | 認証失敗       | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **refreshToken**

> refreshToken()

### Example

```typescript
import { AuthApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

const { status, data } = await apiInstance.refreshToken();
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

| Status code | Description                | Response headers |
| ----------- | -------------------------- | ---------------- |
| **200**     | トークンのリフレッシュ成功 | -                |
| **401**     | 認証失敗                   | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
