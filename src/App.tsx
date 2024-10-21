import HeaderBar from './components/header';
import NovelList from './features/NovelList';
import './App.css';

export default function App() {
  return (
    <div className='App'>
      <header>
        <HeaderBar />
      </header>
      <main>
        <NovelList />
      </main>
    </div>
  );
}
