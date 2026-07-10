import React, { useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Clock, 
  CheckCircle, 
  Award, 
  MessageSquare, 
  Play, 
  FileText,
  ChevronRight,
  Menu,
  X,
  Lock
} from 'lucide-react';

export default function App() {
  // --- LLAVES MÁGICAS (ESTADO) ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Datos simulados
  const user = { name: "Jeilyn", role: "Estudiante", progress: 65, points: 320 };
  const modules = [
    {
      id: 1,
      title: "Módulo 1: Introduction to Hair Structure",
      duration: "2 horas",
      lessons: [
        { title: "1.1 Basic Anatomy of Hair", type: "video", duration: "15 min", completed: true },
        { title: "1.2 What is Keratin?", type: "video", duration: "20 min", completed: true }
      ]
    }
  ];

  // --- FUNCIÓN PARA REVISAR LA CONTRASEÑA ---
  const handleLogin = (e) => {
    e.preventDefault();
    // La contraseña secreta será: 1234
    if (username.toLowerCase() === 'jeilyn' && password === '1234') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('¡Upps! El usuario o la contraseña no son correctos.');
    }
  };

  // ================= PANTALLA 1: EL LOGIN (LA PUERTA) =================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-200">
          
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-purple-600 p-3 rounded-2xl text-white mb-3 shadow-md">
              <Lock size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 text-center">Beauty English</h2>
            <p className="text-sm text-purple-600 font-medium mt-1">Ingresa a tu Campus Virtual</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tu Nombre</label>
              <input 
                type="text" 
                placeholder="Escribe 'Jeilyn'" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Contraseña Secreta</label>
              <input 
                type="password" 
                placeholder="Escribe '1234'" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

            {error && (
              <p className="text-rose-600 text-xs font-semibold bg-rose-50 p-2.5 rounded-lg border border-rose-100 text-center">
                {error}
              </p>
            )}

            <button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl text-sm shadow-md transition-colors"
            >
              Abrir Puerta Virtual
            </button>
          </form>

        </div>
      </div>
    );
  }

  // ================= PANTALLA 2: EL CAMPUS (ADENTRO) =================
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-purple-600 p-2 rounded-xl text-white"><GraduationCap size={24} /></div>
            <div>
              <span className="font-bold text-lg text-slate-800 block leading-tight">Beauty English</span>
              <span className="text-xs text-purple-600 font-medium tracking-wide">CAMPUS INTEGRADO</span>
            </div>
          </div>

          <nav className="hidden md:flex space-x-1">
            <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'dashboard' ? 'bg-purple-50 text-purple-700' : 'text-slate-600'}`}>Inicio</button>
            <button onClick={() => setActiveTab('lessons')} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'lessons' ? 'bg-purple-50 text-purple-700' : 'text-slate-600'}`}>Clases</button>
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsLoggedIn(false)} 
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-100 transition-colors"
            >
              Cerrar Llave
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-700 to-indigo-800 rounded-2xl p-8 text-white shadow-md">
              <h1 className="text-3xl font-bold">¡Bienvenida de vuelta, {user.name}!</h1>
              <p className="text-purple-100 text-sm mt-1">Has pasado la seguridad con éxito usando tu contraseña secreta.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
