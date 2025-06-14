import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './components/Home';
import UploadPDF from './components/UploadPDF';
import UploadURL from './components/UploadURL';
import Chat from './components/Chat';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload-pdf" element={<UploadPDF />} />
            <Route path="/upload-url" element={<UploadURL />} />
            <Route path="/chat/:collectionName" element={<Chat />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;