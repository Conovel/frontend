import React from 'react';
import './css/GoogleSignInButton.css';
import GoogleIcon from './GoogleIcon';

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  iconOnly?: boolean;
  className?: string;
  ariaLabel?: string;
};

export default function GoogleSignInButton({
  onClick,
  children = 'Googleログイン',
  iconOnly = false,
  className = '',
  ariaLabel = 'Sign in with Google',
}: Props) {
  // 「Google でログイン」のブランドの取り扱いガイドラインを元に作成
  // https://developers.google.com/identity/branding-guidelines?hl=ja
  return (
    <button
      type="button"
      className={`gsi-material-button ${iconOnly ? 'icon-only' : 'full'} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <div className="gsi-material-button-state" />
      <div className="gsi-material-button-content-wrapper">
        <div className="gsi-material-button-icon">
          <GoogleIcon size={20} />
        </div>
        {!iconOnly && <span className="gsi-material-button-contents">{children}</span>}
      </div>
    </button>
  );
}
