import { useState } from 'react';
import './App.css';
import HeaderBar from './components/header';
import TransitionsModal from './features/NovelInfo';
import NovelList from './features/NovelList';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className='App'>
      <HeaderBar />
      <header className='App-header'>
        <TransitionsModal open={isModalOpen} handleClose={handleCloseModal} />
      </header>
      <main>
        <NovelList onNovelClick={handleOpenModal} /> {/* Pass the handler */}
      </main>
    </div>
  );
}

export default App;
