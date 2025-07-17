# UpdateUser

## Properties

| Name                     | Type        | Description                  | Notes                             |
| ------------------------ | ----------- | ---------------------------- | --------------------------------- |
| **userName**             | **string**  | ユーザーのペンネーム         | [optional] [default to undefined] |
| **nickName**             | **string**  | ユーザーのニックネーム       | [optional] [default to undefined] |
| **isAnonymous**          | **boolean** | 匿名設定                     | [optional] [default to undefined] |
| **profileIconImage**     | **string**  | ユーザーアイコン画像のurl    | [optional] [default to undefined] |
| **birth_ym**             | **string**  | ユーザーの生年月（YYYY/MM）  | [optional] [default to undefined] |
| **agreed_terms_version** | **number**  | 同意した利用規約のバージョン | [optional] [default to undefined] |
| **remarks**              | **string**  | ユーザーの備考               | [optional] [default to undefined] |

## Example

```typescript
import { UpdateUser } from "./api";

const instance: UpdateUser = {
  userName,
  nickName,
  isAnonymous,
  profileIconImage,
  birth_ym,
  agreed_terms_version,
  remarks,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
