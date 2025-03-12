import './App.css';
import { Routing } from './routing';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App() {
  return (
    // デモ用のダミーIDを使用（実際の認証は機能しません）
    <GoogleOAuthProvider clientId='dummy-client-id-for-demo'>
      <Routing />
    </GoogleOAuthProvider>
  );
}
