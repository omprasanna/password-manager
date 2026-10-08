import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Copy, Grid, Shield, Plus, Home, Settings, LogOut, Key, Trash2, Globe, Check, ShieldCheck } from 'lucide-react';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import logoDark from './logo_dark.svg'
import { v4 as uuidv4 } from "uuid";

const Navbardark = () => {
  const [vault, setVault] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const passwordInput = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("passwords");
    if (saved) {
      try {
        setVault(JSON.parse(saved));
      } catch (e) {
        setVault([]);
      }
    }
  }, []);

  const onSubmit = (data) => {
    const newItem = {
      id: uuidv4(),
      iscopied: false,
      name: data.name,
      password: data.password,
      icon: logoDark
    };

    const updatedList = [newItem,...vault];
    setVault(updatedList);
    localStorage.setItem("passwords", JSON.stringify(updatedList));
    reset();
    toast.success('Password protected!', {
    style: {
      borderRadius: '10px',
      background: '#1e293b', // Matching your dark theme slate
      color: '#fff',
    },
    iconTheme: {
      primary: '#3b82f6', // Blue icon to match your "Protect" button
      secondary: '#fff',
    },
  });
  };

  const deleteItem = (id) => {
    const filtered = vault.filter(item => item.id !== id);
    setVault(filtered);
    localStorage.setItem("passwords", JSON.stringify(filtered));
    toast.success('Password deleted successfully', {
    style: {
      borderRadius: '10px',
      background: '#1e293b', // Match your dark theme or use conditional colors
      color: '#fff',
    },
    iconTheme: {
      primary: '#ef4444', // Red icon for delete
      secondary: '#fff',
    },
  });
  };

  // Muted colors for dark theme //changed
  const categories = [
    { name: 'Login', icon: '📦', color: 'bg-blue-900/30 text-blue-400' }, 
    { name: 'Browse', icon: '🌐', color: 'bg-green-900/30 text-green-400' },
    { name: 'Card', icon: '💳', color: 'bg-red-900/30 text-red-400' },
    { name: 'Identity', icon: '🆔', color: 'bg-purple-900/30 text-purple-400' },
    { name: 'Notes', icon: '📝', color: 'bg-yellow-900/30 text-yellow-400' },
    { name: 'Finance', icon: '💰', color: 'bg-emerald-900/30 text-emerald-400' },
  ];

  const executeSuccess = (id) => {

    toast.success('Password copied!', {
    id: 'copy-toast', // changed: use a fixed ID to prevent multiple toasts if clicked rapidly
    duration: 2000,
    style: {
      borderRadius: '10px',
      background: '#1e293b', // Matching your dark theme slate
      color: '#fff',
    },
    iconTheme: {
      primary: '#60a5fa', // Blue icon for copy
      secondary: '#fff',
    },
  })
    setVault((prevVault) =>
      prevVault.map((item) =>
        item.id === id ? { ...item, iscopied: true } : item
      )
    );

    setTimeout(() => {
      setVault((prevVault) =>
        prevVault.map((item) =>
          item.id === id ? { ...item, iscopied: false } : item
        )
      );
    }, 2000);
  };

  const handleCopy = (password, id) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(password)
        .then(() => executeSuccess(id))
        .catch(err => console.error(err));
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = password;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        executeSuccess(id);
      } catch (err) {
        console.error(err);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleMobilePlus = () => {
    passwordInput.current?.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    // Changed bg-gray-50 to bg-[#0f172a] (Slate 950) and text-gray-800 to text-gray-100 //changed
    <div className="flex h-screen bg-[#0f172a] text-gray-100 font-sans overflow-hidden"> 

      {/* SIDEBAR - Changed bg-white to bg-[#1e293b] and border color //changed */}
      <aside className="hidden md:flex flex-col w-64 bg-[#1e293b] border-r border-gray-800 p-6"> 
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">P</div>
          <span className="text-xl font-bold tracking-tight text-blue-500">PassGuard</span>
        </div>
        <nav className="space-y-2 flex-1">
          <div className="flex items-center gap-3 p-3 bg-blue-900/40 text-blue-400 rounded-xl cursor-pointer font-bold transition-all">
            <Home size={20} /> <span>Vault</span>
          </div>
          <div className="flex items-center gap-3 p-3 text-gray-500 hover:bg-gray-800 rounded-xl cursor-pointer">
            <Shield size={20} /> <span>Security</span>
          </div>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto custom-scrollbar pb-24 md:pb-8">
        {/* Header - Changed bg-gray-50/80 to transparent/blur //changed */}
        <header className="sticky top-0 z-10 bg-[#0f172a]/80 backdrop-blur-md p-6 flex justify-between items-center max-w-5xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-pink-900/30 overflow-hidden border-2 border-gray-700 shadow-sm">
              <img src="https://picsum.photos/100" alt="avatar" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Hello, Om</p>
              <p className="font-bold text-sm md:text-base text-white">Secure Vault</p>
            </div>
          </div>
         
        </header>

        <div className="max-w-5xl mx-auto px-6">
          <form onSubmit={handleSubmit(onSubmit)} className="flex-col gap-3">
            <div className='mb-8 flex gap-3'>
            <div className="relative flex-1 max-w-md">
              <Key className="absolute left-4 top-3.5 text-gray-500" size={18} />
              {/* Changed input bg to #1e293b //changed */}
              <input
                type="text"
                ref={passwordInput}
                placeholder="Secure a New Password..."
                className="w-full bg-[#1e293b] py-3.5 pl-12 pr-4 rounded-2xl shadow-sm focus:outline-none border border-transparent focus:border-blue-500 transition-all text-sm text-white"
                {...register("password", { required: true })}
              />
            </div>
            <button type="submit" className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-2xl shadow-lg shadow-blue-900/20 hover:bg-blue-700 transition-all active:scale-95 cursor-pointer">
              <Plus size={20} /> <span className="hidden md:inline font-bold">Protect Key</span>
            </button>
            </div>
            <input
                type="text"
                placeholder="Enter name(optional)"
                className="w-fit bg-[#1e293b] py-3.5 pl-4 pr-4 rounded-2xl shadow-sm focus:outline-none border border-gray-800 focus:border-blue-500 transition-all text-sm text-white placeholder:text-gray-500"
                {...register("name", { required: false })}
              />
          </form>

          <section className="mb-10">
            <h3 className="font-bold mb-4 text-lg text-gray-200">Categories</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {categories.map((cat) => (
                // Changed card bg to #1e293b and border //changed
                <div key={cat.name} className="bg-[#1e293b] p-4 rounded-3xl shadow-sm flex flex-col items-center gap-2 hover:shadow-md transition-all cursor-pointer border border-gray-800 active:scale-95">
                  <div className={`w-12 h-12 ${cat.color} rounded-2xl flex items-center justify-center text-xl`}>
                    {cat.icon}
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-gray-400">{cat.name}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-gray-200">My Vault ({vault.length})</h3>
              <button className="text-blue-400 text-sm font-medium hover:underline">View All</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vault.length > 0 ? (
                vault.map((item) => (
                  // Changed item card bg to #1e293b //changed
                  <div key={item.id} className="bg-[#1e293b] p-4 rounded-2xl shadow-sm flex items-center justify-between border border-gray-800 group hover:border-blue-900 transition-all">
                    <div className="flex items-center gap-4">
                      {/* Changed icon bg to #0f172a //changed */}
                      <div className="w-12 h-12 bg-[#0f172a] rounded-xl flex items-center justify-center border border-gray-800">
                        <img src={item.icon} alt="" className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-200">{item.name}</h4>
                        <p className="text-xs text-gray-500 font-mono tracking-tighter">{item.password}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => handleCopy(item.password, item.id)} className="p-2 text-gray-500 hover:text-blue-400 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
                        {item.iscopied ? <ShieldCheck className='text-green-500' size={18} /> : <Copy size={18} />}
                      </button>
                      <button onClick={() => deleteItem(item.id)} className="p-2 text-gray-500 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
                        <Trash2  size={18} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                // Changed empty state bg //changed
                <div className="col-span-full py-12 text-center bg-[#1e293b] rounded-3xl border-2 border-dashed border-gray-800 text-gray-500 text-sm">
                  Your vault is empty. Enter a password above to begin.
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* MOBILE BOTTOM NAV - Changed bg color //changed */}
      <div className="md:hidden fixed bottom-0 w-full bg-[#1e293b]/90 backdrop-blur-lg px-10 py-5 flex justify-between items-center border-t border-gray-800">
        <Grid size={24} className="text-blue-500" />
        <div className="absolute -top-7 left-1/2 -translate-x-1/2">
          <button onClick={handleMobilePlus} className="bg-blue-600 p-4 rounded-full shadow-xl shadow-blue-900/50 text-white border-4 border-[#0f172a] active:scale-95 transition-transform">
            <Plus size={26} />
          </button>
        </div>
        <Shield size={24} className="text-gray-500" />
      </div>
    </div>
  );
};

export default Navbardark;