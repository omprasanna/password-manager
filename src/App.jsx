import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Navbardark from './components/Navbardark'
import { Sun, MoonStar } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [isnight, setIsnight] = useState(() => {
    const saved = localStorage.getItem("night");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("night", JSON.stringify(isnight));
  }, [isnight]);

  const handleIsnight = () => {
    setIsnight(!isnight);
  }

  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
      <button 
        onClick={handleIsnight} 
        className={`fixed top-4 right-4 z-50 p-2 rounded-full shadow-sm border transition-colors cursor-pointer ${
          isnight ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-100 hover:bg-gray-50'
        }`} 
      >
        {isnight ? (
          <Sun size={20} className="text-yellow-400" /> 
        ) : (
          <MoonStar size={20} className="text-gray-600" />
        )}
      </button>

      {isnight ? <Navbardark /> : <Navbar />}
    </>
  )
}

export default App;