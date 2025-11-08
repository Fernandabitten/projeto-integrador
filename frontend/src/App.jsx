import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import MyTrails from './pages/MyTrails';
import About from './pages/About';

function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans text-text">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/minhas-trilhas" element={<MyTrails />} />
          <Route path="/sobre" element={<About />} /> 
        </Routes>
      </main>
    </div>
  );
}

export default App;
