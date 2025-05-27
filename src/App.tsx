import './App.css';
import { Routing } from './routing';
import { AuthProvider } from './providers/auth';

export default function App() {
  return (
    <AuthProvider>
      <Routing />
    </AuthProvider>
  );
}
