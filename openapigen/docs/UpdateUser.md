# UpdateUser

## Properties

| Name                     | Type        | Description                          | Notes                             |
| ------------------------ | ----------- | ------------------------------------ | --------------------------------- |
| **userName**             | **string**  | ユーザーのペンネーム（必須）         | [default to undefined]            |
| **nickName**             | **string**  | ユーザーのニックネーム（必須）       | [default to undefined]            |
| **isAnonymous**          | **boolean** | 匿名設定（必須）                     | [default to undefined]            |
| **profileIconImage**     | **string**  | ユーザーアイコン画像のurl（必須）    | [default to undefined]            |
| **birth_ym**             | **string**  | ユーザーの生年月（YYYY/MM）（必須）  | [default to undefined]            |
| **agreed_terms_version** | **number**  | 同意した利用規約のバージョン（必須） | [default to undefined]            |
| **remarks**              | **string**  | ユーザーの備考                       | [optional] [default to undefined] |

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
