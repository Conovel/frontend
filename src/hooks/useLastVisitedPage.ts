import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { getCookie, setCookie } from '../utils/cookie';

const LAST_PAGE_COOKIE_NAME = 'lastVisitedPage';
const COOKIE_EXPIRES_DAYS = 30;

/**
 * 前回訪問したページを記憶し、復元するためのフック
 */
export const useLastVisitedPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * 現在のページを記憶する
   */
  const saveCurrentPage = () => {
    // ログインページは記憶しない（ログイン後に戻りたくないため）
    if (location.pathname === '/login') {
      return;
    }

    const expires = new Date();
    expires.setDate(expires.getDate() + COOKIE_EXPIRES_DAYS);

    setCookie(LAST_PAGE_COOKIE_NAME, location.pathname + location.search, {
      expires,
      path: '/',
      sameSite: 'lax',
    });
  };

  /**
   * 前回訪問したページを取得する
   */
  const getLastVisitedPage = (): string | null => {
    return getCookie(LAST_PAGE_COOKIE_NAME);
  };

  /**
   * 前回訪問したページに遷移する
   */
  const navigateToLastVisitedPage = () => {
    const lastPage = getLastVisitedPage();
    if (lastPage && lastPage !== location.pathname && lastPage !== '/login') {
      navigate(lastPage);
    } else if (!lastPage) {
      // 前回のページがない場合はホームページに遷移
      navigate('/');
    }
  };

  // ページが変更されるたびに現在のページを保存
  useEffect(() => {
    saveCurrentPage();
  }, [location.pathname, location.search]);

  return {
    saveCurrentPage,
    getLastVisitedPage,
    navigateToLastVisitedPage,
  };
};
