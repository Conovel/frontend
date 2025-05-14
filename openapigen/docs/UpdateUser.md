# UpdateUser

## Properties

| Name                   | Type        | Description               | Notes                             |
| ---------------------- | ----------- | ------------------------- | --------------------------------- |
| **user_name**          | **string**  | ユーザーのペンネーム      | [optional] [default to undefined] |
| **nick_name**          | **string**  | ユーザーのニックネーム    | [optional] [default to undefined] |
| **is_anonymous**       | **boolean** | 匿名設定                  | [optional] [default to undefined] |
| **profile_icon_image** | **string**  | ユーザーアイコン画像のurl | [optional] [default to undefined] |

## Example

```typescript
import { UpdateUser } from "./api";

const instance: UpdateUser = {
  user_name,
  nick_name,
  is_anonymous,
  profile_icon_image,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
