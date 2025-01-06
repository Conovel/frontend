import { z } from 'zod';

export const AccountSettingFormSchema = z.object({
  penName: z.string(),
  nickName: z.string(),
  birthYearAndMonth: z.date(),
  isAnonymous: z.boolean(),
  profileIconImage: z.string(),
});

export type AccountSettingFormType = z.infer<typeof AccountSettingFormSchema>;
