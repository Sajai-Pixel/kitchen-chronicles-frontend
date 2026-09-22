import Header from './components/Header';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f8f6]">
      <Header />
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
};

export default App;