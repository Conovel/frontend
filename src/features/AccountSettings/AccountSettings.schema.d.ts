import { z } from 'zod';
export declare const AccountSettingFormSchema: z.ZodObject<
  {
    penName: z.ZodString;
    nickName: z.ZodString;
    birthYearAndMonth: z.ZodDate;
    isAnonymous: z.ZodBoolean;
    profileIconImage: z.ZodString;
  },
  'strip',
  z.ZodTypeAny,
  {
    penName: string;
    nickName: string;
    birthYearAndMonth: Date;
    isAnonymous: boolean;
    profileIconImage: string;
  },
  {
    penName: string;
    nickName: string;
    birthYearAndMonth: Date;
    isAnonymous: boolean;
    profileIconImage: string;
  }
>;
export type AccountSettingFormType = z.infer<typeof AccountSettingFormSchema>;
