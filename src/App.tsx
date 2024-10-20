import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg'; // Updated import statement
import './App.css';
import Button from '@mui/material/Button';
import { Routing } from './routing';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <Routing />
      <header className='App-header'>
        <img src={reactLogo} className='App-logo' alt='logo' />
        <img src={viteLogo} className='App-logo' alt='logo' />
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <Button onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </Button>
        </p>
        <p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
          {' | '}
          <a
            className='App-link'
            href='https://vitejs.dev/guide/features.html'
            target='_blank'
            rel='noopener noreferrer'
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
