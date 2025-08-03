import { z } from 'zod';

export const AccountSettingFormSchema = z.object({
  penName: z.string(),
  nickName: z.string(),
  birthYm: z.date(),
  isAnonymous: z.boolean(),
  profileIconImage: z.string(),
  agreedTermsVersion: z.number(),
});

export type AccountSettingFormType = z.infer<typeof AccountSettingFormSchema>;
