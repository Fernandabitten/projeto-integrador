// import { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Home from './pages/Home';
// import MyTrails from './pages/MyTrails';

// function App() {
//   const [currentPage, setCurrentPage] = useState('home');
//   return (
//     <div className="flex min-h-screen bg-gray-50 font-sans">
//       {/* Passa o estado e a função para o Sidebar */}
//       <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
//       {console.log(currentPage)}
//       <main className="flex-1 flex flex-col md:ml-0 ml-0 md:pl-0 pt-16 md:pt-0">
//         {/* Renderiza a página conforme o estado */}
//         {/* {currentPage === 'home' && <Home />}
//         {currentPage === 'minhas-trilhas' && <MyTrails />} */}
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/minhas-trilhas" element={<MyTrails />} />
//           </Routes>
//       </main>
//     </div>
//   );
// }

// export default App;

import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import MyTrails from './pages/MyTrails';

function App() {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-text">
      <Sidebar />
      <main className="flex-1 flex flex-col p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/minhas-trilhas" element={<MyTrails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
