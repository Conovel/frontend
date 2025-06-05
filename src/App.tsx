import './App.css';
import { Routing } from './routing';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId='dummy-client-id-for-demo'>
        <Routing />
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}
