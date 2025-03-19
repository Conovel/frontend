export interface UserProfile {
  username: string;
  bio?: string;
  avatarUrl?: string;
  selectedGenres?: string[];
  isAnonymous?: boolean;
  birthYearAndMonth?: Date;
}
export declare const useAuth: () => {
  isLoggedIn: boolean;
  userProfile: UserProfile | null;
  login: (profile?: UserProfile | null) => void;
  logout: () => void;
  updateProfile: (profile: UserProfile) => void;
};
