import './App.css';
import HeaderBar from './components/header';
import { NovelViewContainer } from './features/NovelView/NovelViewContainer';

function App() {
  return (
    <div className='App'>
      <header>
        <HeaderBar />
      </header>
      <main>
        <NovelViewContainer />
      </main>
    </div>
  );
}

export default App;
