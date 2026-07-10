import React, { useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Clock, 
  CheckCircle, 
  Award, 
  Play, 
  Lock,
  ChevronRight
} from 'lucide-react';

export default function App() {
  // --- SEGURIDAD Y ESTADOS ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [activeTab, setActiveTab] = useState('dashboard');

  const user = {
    name: "Jeilyn",
    role: "Estudiante Profesional",
    avatar: "J",
    progress: 33,
    points: 150,
    completedTasks: 2,
    totalTasks: 6
  };

  // --- AQUÍ ESTÁN TUS DOCUMENTOS Y CLASES REALES ---
  const modules = [
    {
      id: 1,
      title: "Unidad 1: Introducción a la Estructura Capilar",
      duration: "Clase 1 y Clase 2",
      lessons: [
        { title: "Clase 1: Anatomía Básica del Cabello y Cuero Cabelludo", type: "video", duration: "20 min", completed: true },
        { title: "Clase 2: Porosidad y Elasticidad (Vocabulario Técnico)", type: "lectura", duration: "15 min", completed: true }
      ]
    },
    {
      id: 2,
      title: "Unidad 2: El Proceso Químico de los Alisados",
      duration: "Clase 3 y Clase 4",
      lessons: [
        { title: "Clase 3: Tratamientos Alcalinos vs. Ácidos", type: "video", duration: "30 min", completed: false },
        { title: "Clase 4: Fórmulas Libres de Formol (Ácido Glioxílico)", type: "video", duration: "25 min", completed: false }
      ]
    },
    {
      id: 3,
      title: "Unidad 3: Práctica y Consulta con el Cliente",
      duration: "Clase 5 y Clase 6",
      lessons: [
        { title: "Clase 5: Frases Clave para la Consulta Técnica en Inglés", type: "lectura", duration: "20 min", completed: false },
        { title: "Clase 6: Simulación de Diagnóstico Capilar", type: "quiz", duration: "15 min", completed: false }
      ]
    }
  ];

  const grades = [
    { course: "Quiz Unidad 1: Estructura Capilar", grade: "90/100", status: "Aprobado", date: "10/07/2026" },
    { course: "Vocabulario Técnico de Porosidad", grade: "100/100", status: "Perfecto", date: "10/07/2026" }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.toLowerCase() === 'jeilyn' && password === '1234') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('¡Upps! El usuario o la contraseña no son correctos.');
    }
  };

  // ================= PANTALLA 1: EL LOGIN =================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-200">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-purple-600 p-3 rounded-2xl text-white mb-3 shadow-md">
              <Lock size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 text-center">Beauty English</h2>
            <p className="text-sm text-purple-600 font-medium mt-1">Ingresa a tu Campus Virtual</p>
          </div>

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

            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl text-sm shadow-md transition-colors">
              Abrir Puerta Virtual
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ================= PANTALLA 2: EL CAMPUS CON UNIDADES REALES =================
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
            <button onClick={() => setActiveTab('grades')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'grades' ? 'bg-purple-50 text-purple-700' : 'text-slate-600 hover:text-purple-600'}`}>Calificaciones</button>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 bg-purple-100 border border-purple-200 rounded-xl flex items-center justify-center font-bold text-purple-700 shadow-inner">
              {user.avatar}
            </div>
            <button onClick={() => setIsLoggedIn(false)} className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-100 transition-colors">
              Cerrar Llave
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-700 to-indigo-800 rounded-2xl p-8 text-white shadow-md">
              <span className="bg-purple-500/30 text-purple-200 text-xs px-2.5 py-1 rounded-full border border-purple-400/20 font-medium uppercase tracking-wider">Tu Escuela</span>
              <h1 className="text-3xl font-bold mt-2">¡Hola, {user.name}!</h1>
              <p className="text-purple-100 text-sm mt-1">Tus documentos e información técnica están listos en las pestañas.</p>
              <button onClick={() => setActiveTab('lessons')} className="mt-5 bg-white text-purple-700 hover:bg-purple-50 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center space-x-1">
                <span>Ir a ver las clases</span> <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center space-x-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Clock size={22} /></div>
                <div><p className="text-xs text-slate-400 font-medium">Progreso general</p><p className="text-xl font-bold text-slate-800">{user.progress}%</p></div>
              </div>
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center space-x-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Award size={22} /></div>
                <div><p className="text-xs text-slate-400 font-medium">Puntos ganados</p><p className="text-xl font-bold text-slate-800">{user.points} XP</p></div>
              </div>
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center space-x-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle size={22} /></div>
                <div><p className="text-xs text-slate-400 font-medium">Clases completadas</p><p className="text-xl font-bold text-slate-800">{user.completedTasks} / {user.totalTasks}</p></div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2"><BookOpen size={20} className="text-purple-600" /> <span>Estructura del Curso</span></h3>
              <div className="mt-4 space-y-4">
                {modules.map(mod => (
                  <div key={mod.id} className="border border-slate-100 p-4 rounded-xl hover:border-purple-200 transition-colors flex justify-between items-center bg-slate-50/50">
                    <div><h4 className="font-semibold text-slate-700 text-sm">{mod.title}</h4><p className="text-xs text-slate-400 mt-0.5">{mod.duration}</p></div>
                    <button onClick={() => setActiveTab('lessons')} className="text-xs font-bold text-purple-600 hover:text-purple-700 bg-purple-50 px-3 py-2 rounded-xl transition-colors flex items-center space-x-1"><span>Entrar</span><ChevronRight size={12} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lessons' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Contenido de las Unidades</h2>
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
                          {les.completed ? <div className="text-emerald-500 bg-emerald-50 p-1.5 rounded-full"><CheckCircle size={16} /></div> : <div className="text-slate-300 bg-slate-50 p-1.5 rounded-full"><Play size={16} /></div>}
                          <div><p className="text-sm font-medium text-slate-700">{les.title}</p><p className="text-xs text-slate-400 flex items-center space-x-1"><span className="capitalize">Tipo: {les.type}</span><span>•</span><span>{les.duration}</span></p></div>
                        </div>
                        <button className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${les.completed ? 'text-slate-400 bg-slate-50 border-slate-200' : 'text-purple-600 bg-purple-50 border-purple-100 hover:bg-purple-100'}`}>{les.completed ? 'Completada' : 'Iniciar Clase'}</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'grades' && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100"><h2 className="text-xl font-bold text-slate-800">Historial de Calificaciones</h2></div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead><tr className="bg-slate-50 border-b border-slate-100"><th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actividad</th><th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nota</th><th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Estado</th><th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Fecha</th></tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {grades.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 text-sm font-semibold text-slate-700">{item.course}</td>
                      <td className="p-4 text-sm font-bold text-purple-600">{item.grade}</td>
                      <td className="p-4"><span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${item.status === 'Perfecto' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>{item.status}</span></td>
                      <td className="p-4 text-xs text-slate-400 font-medium">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
