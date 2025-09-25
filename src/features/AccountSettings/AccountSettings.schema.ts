import { z } from 'zod';

export const AccountSettingFormSchema = z.object({
  penName: z.string().min(1, 'ペンネームは必須です'),
  nickName: z.string().min(1, 'ニックネームは必須です'),
  birthYearAndMonth: z.date(),
  isAnonymous: z.boolean(),
  profileIconImage: z.string().optional(),
});

export type AccountSettingFormType = z.infer<typeof AccountSettingFormSchema>;
