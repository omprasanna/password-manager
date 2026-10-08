import React, { useState, useEffect,useRef } from 'react';
import { Search, Bell, Copy, Grid, Shield, Plus, Home, Settings, LogOut, Key, Trash2, Globe, Check, ShieldCheck, MoonStar,Sun } from 'lucide-react';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import logoLight from './logo_light.svg'

const Navbar = () => {
  const [vault, setVault] = useState([]);

  const { register, handleSubmit, reset } = useForm();

  const passwordInput = useRef(null)

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
      id: Date.now(),
      iscopied: false,
      name: data.name,
      password: data.password,
      icon: logoLight
    };

    const updatedList = [newItem, ...vault];
    setVault(updatedList);
    localStorage.setItem("passwords", JSON.stringify(updatedList));
    reset();
    toast.success('Password protected!', {
    style: {
      borderRadius: '10px',
      background: '#1e293b',
      color: '#fff',
    },
    iconTheme: {
      primary: '#3b82f6',
      secondary: '#fff',
    },
  });
  };

  // Extra: Delete function
  const deleteItem = (id) => {
    const filtered = vault.filter(item => item.id !== id);
    setVault(filtered);
    localStorage.setItem("passwords", JSON.stringify(filtered));
    toast.success('Password deleted successfully', {
    style: {
      borderRadius: '10px',
      background: '#1e293b',
      color: '#fff',
    },
    iconTheme: {
      primary: '#ef4444',
      secondary: '#fff',
    },
  });
  };

  const categories = [
    { name: 'Login', icon: '📦', color: 'bg-blue-100 text-blue-600' },
    { name: 'Browse', icon: '🌐', color: 'bg-green-100 text-green-600' },
    { name: 'Card', icon: '💳', color: 'bg-red-100 text-red-600' },
    { name: 'Identity', icon: '🆔', color: 'bg-purple-100 text-purple-600' },
    { name: 'Notes', icon: '📝', color: 'bg-yellow-100 text-yellow-600' },
    { name: 'Finance', icon: '💰', color: 'bg-emerald-100 text-emerald-600' },
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
    }, 1000);
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

  const handleMobilePlus = ()=>{
    passwordInput.current?.focus()
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const notify = () => toast("Wow so easy!");

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 font-sans overflow-hidden">

      {/* SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">P</div>
          <span className="text-xl font-bold tracking-tight text-blue-600">PassGuard</span>
        </div>
        <nav className="space-y-2 flex-1">
          <div className="flex items-center gap-3 p-3 bg-blue-50 text-blue-600 rounded-xl cursor-pointer font-bold transition-all">
            <Home size={20} /> <span>Vault</span>
          </div>
          <div className="flex items-center gap-3 p-3 text-gray-400 hover:bg-gray-50 rounded-xl cursor-pointer">
            <Shield size={20} /> <span>Security</span>
          </div>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto pb-24 md:pb-8 [&::-webkit-scrollbar]:w-2
     [&::-webkit-scrollbar-track]:bg-gray-300
     [&::-webkit-scrollbar-thumb]:bg-gray-500
     [&::-webkit-scrollbar-thumb]:rounded-full">
        <header className="sticky top-0 z-10 bg-gray-50/80 backdrop-blur-md p-6 flex justify-between items-center max-w-5xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-pink-200 overflow-hidden border-2 border-white shadow-sm">
              <img src="https://i.pravatar.cc/100" alt="avatar" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Hello, Om</p>
              <p className="font-bold text-sm md:text-base">Secure Vault</p>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-6">
          {/* Add New Password Form */}
          <form onSubmit={handleSubmit(onSubmit)} className='flex-col'>
            <div className="mb-8 flex gap-3">
            <div className="relative flex-1 max-w-md">
              <Key className="absolute left-4 top-3.5 text-gray-400" size={18} />
              <input
                type="text"
                ref={passwordInput}
                placeholder="Secure a New Password..."
                className="w-full bg-white py-3.5 pl-12 pr-4 rounded-2xl shadow-sm focus:outline-none border border-transparent focus:border-blue-400 transition-all text-sm"
                {...register("password", { required: true })}
              />
            </div>
            <button type="submit" className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 cursor-pointer">
              <Plus size={20} /> <span className="hidden md:inline font-bold cursor-pointer">Protect Key</span>
            </button>
            </div>
            
          <input
                type="text"
                placeholder="Enter name(optional)"
                className="w-fit bg-white py-3.5 pl-4 pr-4 rounded-2xl shadow-sm focus:outline-none border border-transparent focus:border-blue-400 transition-all text-sm"
                {...register("name", { required: false })}
              />
          </form>

          {/* Categories */}
          <section className="mb-10">
            <h3 className="font-bold mb-4 text-lg">Categories</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {categories.map((cat) => (
                <div key={cat.name} className="bg-white p-4 rounded-3xl shadow-sm flex flex-col items-center gap-2 hover:shadow-md transition-all cursor-pointer border border-gray-50 active:scale-95">
                  <div className={`w-12 h-12 ${cat.color} rounded-2xl flex items-center justify-center text-xl`}>
                    {cat.icon}
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-gray-600">{cat.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Items / Vault List */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">My Vault ({vault.length})</h3>
              <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
            </div>

            {/* 4. FIXED: Map through the VAULT state to show dynamic cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vault.length > 0 ? (
                vault.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between border border-gray-50 group hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                        <img src={item.icon} alt="" className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold">{item.name == "" ? "New Entry" : item.name}</h4>
                        {console.log(item.name)}
                        <p className="text-xs text-gray-400 font-mono tracking-tighter">{item.password}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => handleCopy(item.password, item.id)} className="p-2 text-gray-300 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">

                        {item.iscopied ? <ShieldCheck className='text-green-500 bg-green-50 hover:bg-green-50 ' size={18} /> : <Copy size={18} />}

                      </button>
                      <button
                      onClick={notify}
                        onClick={() => deleteItem(item.id)}
                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100 text-gray-400 text-sm">
                  Your vault is empty. Enter a password above to begin.
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* MOBILE BOTTOM NAV */}
      <div className="md:hidden fixed bottom-0 w-full bg-white/90 backdrop-blur-lg px-10 py-5 flex justify-between items-center border-t border-gray-100">
        <Grid size={24} className="text-blue-600" />
        <div className="absolute -top-7 left-1/2 -translate-x-1/2">
          <button className="bg-blue-600 p-4 rounded-full shadow-xl shadow-blue-300 text-white border-4 border-gray-50 active:scale-95 transition-transform">
            <Plus onClick={handleMobilePlus} size={26} />
          </button>
        </div>
        <Shield size={24} className="text-gray-400" />
      </div>
    </div>
  );
};

export default Navbar;