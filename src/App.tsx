import './App.css';
import { Routing } from './routing';
import { AuthProvider } from './providers/auth';
import { HelmetProvider } from 'react-helmet-async';

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Routing />
      </AuthProvider>
    </HelmetProvider>
  );
}
