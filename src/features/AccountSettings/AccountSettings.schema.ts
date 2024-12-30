import { z } from 'zod';

export const AccountSettingFormSchema = z.object({
  penName: z.string(),
  nickName: z.string(),
  birth: z.date(),
  isAnonymous: z.boolean(),
});

export type AccountSettingFormType = z.infer<typeof AccountSettingFormSchema>;
