import './App.css';
import { Routing } from './routing';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App() {
  return (
    <GoogleOAuthProvider clientId='dummy-client-id-for-demo'>
      <Routing />
    </GoogleOAuthProvider>
  );
}
