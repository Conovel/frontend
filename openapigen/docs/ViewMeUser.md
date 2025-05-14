# ViewMeUser

## Properties

| Name                      | Type        | Description                 | Notes                             |
| ------------------------- | ----------- | --------------------------- | --------------------------------- |
| **user_id**               | **number**  | ユーザーの一意のid          | [optional] [default to undefined] |
| **user_name**             | **string**  | ユーザーのペンネーム        | [optional] [default to undefined] |
| **nick_name**             | **string**  | ユーザーのニックネーム      | [optional] [default to undefined] |
| **profile_icon_image**    | **string**  | ユーザーアイコン画像のurl   | [optional] [default to undefined] |
| **evaluation_good_count** | **number**  | Good評価の数                | [optional] [default to undefined] |
| **created_at**            | **string**  | ユーザーの作成日時          | [optional] [default to undefined] |
| **updated_at**            | **string**  | ユーザーの修正日時          | [optional] [default to undefined] |
| **birth_year_and_month**  | **string**  | ユーザーの生年月（YYYY/MM） | [optional] [default to undefined] |
| **is_anonymous**          | **boolean** | 匿名設定                    | [optional] [default to undefined] |

## Example

```typescript
import { ViewMeUser } from "./api";

const instance: ViewMeUser = {
  user_id,
  user_name,
  nick_name,
  profile_icon_image,
  evaluation_good_count,
  created_at,
  updated_at,
  birth_year_and_month,
  is_anonymous,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
