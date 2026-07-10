import React, { useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Clock, 
  CheckCircle, 
  Award, 
  Play, 
  Lock,
  ChevronRight,
  Users
} from 'lucide-react';

export default function App() {
  // --- SEGURIDAD Y ESTADOS ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  
  const [activeTab, setActiveTab] = useState('dashboard');

  // --- LAS LLAVES SECRETAS DE TU ESCUELA (3 Profesoras y 6 Estudiantes) ---
  const accounts = {
    // Profesoras (Llave: prome)
    'profesora1': { name: "Profesora Directora", role: "Profesora", avatar: "P1" },
    'profesora2': { name: "Profesora de Alisados", role: "Profesora", avatar: "P2" },
    'profesora3': { name: "Profesora de Estructura", role: "Profesora", avatar: "P3" },
    
    // Estudiantes (Llave: 1234)
    'jeilyn': { name: "Jeilyn", role: "Estudiante Estrella", avatar: "J", progress: 33, points: 150 },
    'estudiante2': { name: "Camila", role: "Estudiante", avatar: "C", progress: 50, points: 210 },
    'estudiante3': { name: "Valentina", role: "Estudiante", avatar: "V", progress: 0, points: 0 },
    'estudiante4': { name: "Sofía", role: "Estudiante", avatar: "S", progress: 65, points: 280 },
    'estudiante5': { name: "Lucía", role: "Estudiante", avatar: "L", progress: 15, points: 50 },
    'estudiante6': { name: "María", role: "Estudiante", avatar: "M", progress: 80, points: 390 }
  };

  // --- TUS 3 UNIDADES Y 6 CLASES ---
  const modules = [
    {
      id: 1,
      title: "Unidad 1: Introducción a la Estructura Capilar",
      duration: "Clase 1 y Clase 2",
      lessons: [
        { title: "Clase 1: Anatomía Básica del Cabello y Cuero Cabelludo", type: "video", duration: "20 min" },
        { title: "Clase 2: Porosidad y Elasticidad (Vocabulario Técnico)", type: "lectura", duration: "15 min" }
      ]
    },
    {
      id: 2,
      title: "Unidad 2: El Proceso Químico de los Alisados",
      duration: "Clase 3 y Clase 4",
      lessons: [
        { title: "Clase 3: Tratamientos Alcalinos vs. Ácidos", type: "video", duration: "30 min" },
        { title: "Clase 4: Fórmulas Libres de Formol (Ácido Glioxílico)", type: "video", duration: "25 min" }
      ]
    },
    {
      id: 3,
      title: "Unidad 3: Práctica y Consulta con el Cliente",
      duration: "Clase 5 y Clase 6",
      lessons: [
        { title: "Clase 5: Frases Clave para la Consulta Técnica en Inglés", type: "lectura", duration: "20 min" },
        { title: "Clase 6: Simulación de Diagnóstico Capilar", type: "quiz", duration: "15 min" }
      ]
    }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const cleanUser = username.toLowerCase().trim();
    const account = accounts[cleanUser];

    if (account) {
      // Si eres profesora la clave es 'prome', si eres estudiante es '1234'
      if ((account.role === "Profesora" && password === "prome") || (account.role !== "Profesora" && password === "1234")) {
        setCurrentUser(account);
        setIsLoggedIn(true);
        setError('');
        return;
      }
    }
    setError('¡Upps! El nombre o la contraseña no coinciden en la lista de la escuela.');
  };

  // ================= PANTALLA 1: EL LOGIN DE LA ESCUELA =================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-200">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-purple-600 p-3 rounded-2xl text-white mb-3 shadow-md">
              <Lock size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 text-center">Beauty English</h2>
            <p className="text-xs text-purple-600 font-bold bg-purple-50 px-3 py-1 rounded-full mt-1">CAMPUS MULTIUSUARIO</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tu Usuario</label>
              <input 
                type="text" 
                placeholder="Ej: 'jeilyn' o 'profesora1'" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Contraseña Secreta</label>
              <input 
                type="password" 
                placeholder="Estudiantes: 1234 | Profes: prome" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

            {error && (
              <p className="text-rose-600 text-xs font-semibold bg-rose-50 p-2.5 rounded-lg border border-rose-100 text-center">{error}</p>
            )}

            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-xl text-sm shadow-md transition-colors">
              Entrar al Campus
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ================= PANTALLA 2: EL CAMPUS ADAPTADO =================
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
            <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-purple-50 text-purple-700' : 'text-slate-600 hover:text-purple-600'}`}>Inicio</button>
            <button onClick={() => setActiveTab('lessons')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'lessons' ? 'bg-purple-50 text-purple-700' : 'text-slate-600 hover:text-purple-600'}`}>Clases</button>
            {currentUser.role !== "Profesora" && (
              <button onClick={() => setActiveTab('grades')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'grades' ? 'bg-purple-50 text-purple-700' : 'text-slate-600 hover:text-purple-600'}`}>Mis Calificaciones</button>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-700 leading-none">{currentUser.name}</p>
              <p className="text-xs text-purple-600 font-medium mt-1">{currentUser.role}</p>
            </div>
            <div className="h-10 w-10 bg-purple-100 border border-purple-200 rounded-xl flex items-center justify-center font-bold text-purple-700">
              {currentUser.avatar}
            </div>
            <button onClick={() => { setIsLoggedIn(false); setCurrentUser(null); }} className="text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-100">
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-700 to-indigo-800 rounded-2xl p-8 text-white shadow-md">
              <span className="bg-purple-500/30 text-purple-200 text-xs px-2.5 py-1 rounded-full border border-purple-400/20 font-medium uppercase">Panel Oficial</span>
              <h1 className="text-3xl font-bold mt-2">¡Hola, {currentUser.name}!</h1>
              <p className="text-purple-100 text-sm mt-1">Has ingresado correctamente con tu cuenta de {currentUser.role}.</p>
            </div>

            {/* Si es estudiante, ve sus puntos */}
            {currentUser.role !== "Profesora" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center space-x-4">
                  <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Clock size={22} /></div>
                  <div><p className="text-xs text-slate-400 font-medium">Tu progreso personal</p><p className="text-xl font-bold text-slate-800">{currentUser.progress}%</p></div>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center space-x-4">
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Award size={22} /></div>
                  <div><p className="text-xs text-slate-400 font-medium">Tus puntos acumulados</p><p className="text-xl font-bold text-slate-800">{currentUser.points} XP</p></div>
                </div>
              </div>
            )}

            {/* Si es profesora, ve el control de la escuela */}
            {currentUser.role === "Profesora" && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-amber-900 flex items-center space-x-4">
                <div className="p-3 bg-white rounded-xl text-amber-600 shadow-sm"><Users size={24} /></div>
                <div>
                  <h4 className="font-bold text-sm">Modo Profesora Activado</h4>
                  <p className="text-xs text-amber-800 mt-0.5">Puedes revisar las unidades y supervisar a tus 6 estudiantes desde este panel.</p>
                </div>
              </div>
            )}

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2"><BookOpen size={20} className="text-purple-600" /> <span>Estructura de las Unidades</span></h3>
              <div className="mt-4 space-y-3">
                {modules.map(mod => (
                  <div key={mod.id} className="border border-slate-100 p-4 rounded-xl flex justify-between items-center bg-slate-50/50">
                    <div><h4 className="font-semibold text-slate-700 text-sm">{mod.title}</h4><p className="text-xs text-slate-400 mt-0.5">{mod.duration}</p></div>
                    <button onClick={() => setActiveTab('lessons')} className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-2 rounded-xl flex items-center space-x-1"><span>Ver Clases</span><ChevronRight size={12} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lessons' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Unidades Disponibles (Clase 1 a la 6)</h2>
            <div className="grid grid-cols-1 gap-6">
              {modules.map(mod => (
                <div key={mod.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="bg-purple-50 border-b border-purple-100 p-4 flex justify-between items-center">
                    <h3 className="font-bold text-purple-900 text-sm">{mod.title}</h3>
                    <span className="text-xs text-purple-600 font-medium bg-white px-2.5 py-1 rounded-full shadow-sm">{mod.duration}</span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {mod.lessons.map((les, index) => (
                      <div key={index} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="text-slate-300 bg-slate-50 p-1.5 rounded-full"><Play size={16} /></div>
                          <div><p className="text-sm font-medium text-slate-700">{les.title}</p><p className="text-xs text-slate-400">Formato: {les.type} • {les.duration}</p></div>
                        </div>
                        <button className="text-xs font-semibold px-3 py-1.5 rounded-lg border text-purple-600 bg-purple-50 border-purple-100 hover:bg-purple-100">Iniciar</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
