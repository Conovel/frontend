import { z } from 'zod';
export declare const AccountSettingFormSchema: z.ZodObject<
  {
    penName: z.ZodString;
    nickName: z.ZodString;
    birth: z.ZodDate;
    isAnonymous: z.ZodBoolean;
  },
  'strip',
  z.ZodTypeAny,
  {
    penName: string;
    nickName: string;
    birth: Date;
    isAnonymous: boolean;
  },
  {
    penName: string;
    nickName: string;
    birth: Date;
    isAnonymous: boolean;
  }
>;
export type AccountSettingFormType = z.infer<typeof AccountSettingFormSchema>;
