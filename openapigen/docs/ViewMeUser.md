# ViewMeUser

## Properties

| Name                    | Type        | Description                 | Notes                             |
| ----------------------- | ----------- | --------------------------- | --------------------------------- |
| **userId**              | **number**  | ユーザーの一意のid          | [optional] [default to undefined] |
| **penName**             | **string**  | ユーザーのペンネーム        | [optional] [default to undefined] |
| **nickName**            | **string**  | ユーザーのニックネーム      | [optional] [default to undefined] |
| **profileIconImage**    | **string**  | ユーザーアイコン画像のurl   | [optional] [default to undefined] |
| **evaluationGoodCount** | **number**  | Good評価の数                | [optional] [default to undefined] |
| **createdAt**           | **string**  | ユーザーの作成日時          | [optional] [default to undefined] |
| **updatedAt**           | **string**  | ユーザーの修正日時          | [optional] [default to undefined] |
| **birthYearAndMonth**   | **string**  | ユーザーの生年月（YYYY/MM） | [optional] [default to undefined] |
| **isAnonymous**         | **boolean** | 匿名設定                    | [optional] [default to undefined] |

## Example

```typescript
import { ViewMeUser } from "./api";

const instance: ViewMeUser = {
  userId,
  penName,
  nickName,
  profileIconImage,
  evaluationGoodCount,
  createdAt,
  updatedAt,
  birthYearAndMonth,
  isAnonymous,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
