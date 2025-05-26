import './App.css';
import { Routing } from './routing';
import { AuthProvider } from './providers/auth'; // Google認証機能に使用予定

export default function App() {
  return (
    <AuthProvider>
      <Routing />
    </AuthProvider>
  );
}
