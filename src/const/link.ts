/**
 * 遷移先リンク
 */

export const LINK = {
  account: '/Account', // アカウント
  company: '/Company', // 運営会社
  terms: '/Terms', // ポリシー
  list: '/List', // 一覧
  contact: 'https://forms.gle/ARNQGNrWEtjarkD86', // お問合せ
};

export const FOOTER_LINKS = [
  { label: '利用規約', to: LINK.terms, targetBlank: false },
  { label: 'お問合せ', to: LINK.contact, targetBlank: true },
  { label: '運営会社', to: LINK.company, targetBlank: false },
];
