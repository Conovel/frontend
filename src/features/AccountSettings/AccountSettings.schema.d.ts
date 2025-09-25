import { z } from 'zod';
export declare const AccountSettingFormSchema: z.ZodObject<{
    penName: z.ZodString;
    nickName: z.ZodString;
    birthYearAndMonth: z.ZodDate;
    isAnonymous: z.ZodBoolean;
    profileIconImage: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    penName: string;
    nickName: string;
    birthYearAndMonth: Date;
    isAnonymous: boolean;
    profileIconImage?: string | undefined;
}, {
    penName: string;
    nickName: string;
    birthYearAndMonth: Date;
    isAnonymous: boolean;
    profileIconImage?: string | undefined;
}>;
export type AccountSettingFormType = z.infer<typeof AccountSettingFormSchema>;
