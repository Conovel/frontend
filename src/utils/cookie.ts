/**
 * Cookie操作のユーティリティ関数
 */

/**
 * Cookieの設定オプション
 */
interface CookieOptions {
  expires?: Date;
  maxAge?: number; // 秒数
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

/**
 * Cookieを設定する
 * @param name Cookie名
 * @param value Cookie値
 * @param options Cookie設定オプション
 */
export const setCookie = (
  name: string,
  value: string,
  options: CookieOptions = {},
): void => {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options.expires) {
    cookieString += `; expires=${options.expires.toUTCString()}`;
  }

  if (options.maxAge) {
    cookieString += `; max-age=${options.maxAge}`;
  }

  if (options.path) {
    cookieString += `; path=${options.path}`;
  }

  if (options.domain) {
    cookieString += `; domain=${options.domain}`;
  }

  if (options.secure) {
    cookieString += '; secure';
  }

  if (options.sameSite) {
    cookieString += `; samesite=${options.sameSite}`;
  }

  document.cookie = cookieString;
};

/**
 * Cookieを取得する
 * @param name Cookie名
 * @returns Cookie値 (存在しない場合はnull)
 */
export const getCookie = (name: string): string | null => {
  const nameEQ = encodeURIComponent(name) + '=';
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }

  return null;
};

/**
 * Cookieを削除する
 * @param name Cookie名
 * @param path Cookieのパス
 * @param domain Cookieのドメイン
 */
export const deleteCookie = (
  name: string,
  path?: string,
  domain?: string,
): void => {
  setCookie(name, '', {
    expires: new Date(0),
    path,
    domain,
  });
};

/**
 * すべてのCookieを取得する
 * @returns Cookie名と値のオブジェクト
 */
export const getAllCookies = (): Record<string, string> => {
  const cookies: Record<string, string> = {};
  const cookieArray = document.cookie.split(';');

  for (let cookie of cookieArray) {
    cookie = cookie.trim();
    const [name, value] = cookie.split('=');
    if (name && value) {
      cookies[decodeURIComponent(name)] = decodeURIComponent(value);
    }
  }

  return cookies;
};
