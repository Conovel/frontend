import './App.css';
import { Routing } from './routing';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { AuthProvider } from "./providers/auth"; // Google認証機能に使用予定

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
console.log('clientId:', clientId);

export default function App() {
  return (
    // デモ用のダミーIDを使用（実際の認証は機能しません）
    <GoogleOAuthProvider clientId={clientId}>
      {/* <AuthProvider> */}
        <Routing />
      {/* </AuthProvider> */}
    </GoogleOAuthProvider>
  );
}
