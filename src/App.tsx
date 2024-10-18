import './App.css';
import HeaderBar from './components/header';
import { NovelView } from './features/NovelView';

function App() {
  return (
    <div className='App'>
      <header>
        <HeaderBar />
      </header>
      <main>
        <NovelView />
      </main>
    </div>
  );
}

export default App;
