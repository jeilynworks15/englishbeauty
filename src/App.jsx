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
  Users,
  FileText,
  Bookmark
} from 'lucide-react';

export default function App() {
  // --- ESTADOS DE CONTROL ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  
  const [activeTab, setActiveTab] = useState('dashboard');

  // --- CUENTAS OFICIALES DE LA ESCUELA ---
  const accounts = {
    // Profesores (Contraseña: prome)
    'daniela': { name: "Miss Manzaba Daniela", role: "Profesora", avatar: "MD", email: "dmanzaba4967@utm.edu.ec" },
    'josselyne': { name: "Miss Lucas Josselyne", role: "Profesora", avatar: "MJ", email: "jlucas9873@utm.edu.ec" },
    'jeilyn': { name: "Miss Gómez Jeilyn", role: "Profesora", avatar: "MG", email: "jgomez3878@utm.edu.ec" },
    
    // Estudiantes (Contraseña: 1234)
    'jean': { name: "Jean", role: "Estudiante", avatar: "JN", progress: 33, points: 120 },
    'ricardo': { name: "Ricardo", role: "Estudiante", avatar: "RC", progress: 50, points: 180 },
    'victoria': { name: "Victoria", role: "Estudiante", avatar: "VC", progress: 100, points: 350 },
    'yaritza': { name: "Yaritza", role: "Estudiante", avatar: "YR", progress: 65, points: 240 },
    'annelys': { name: "Annelys", role: "Estudiante", avatar: "AN", progress: 15, points: 60 },
    'melany': { name: "Melany", role: "Estudiante", avatar: "ML", progress: 85, points: 300 }
  };

  // --- CONTENIDO REAL DEL SYLLABUS "BEAUTY ENGLISH: KERATIN TALK" ---
  const modules = [
    {
      id: 1,
      title: "Unit 1: Welcome to the Client (13-18 July)",
      duration: "Clase 1 y Clase 2 • Greetings and explanation",
      lessons: [
        { 
          title: "Class 1: Greetings & Introduction", 
          type: "Speaking", 
          duration: "35 min",
          content: "Phrases: Hello! • Hi! • Good morning • Good afternoon • Welcome! • How are you? • My name is... • Nice to meet you • Please, have a seat • Thank you.",
          task: "Task: Greeting and introduction in the online class."
        },
        { 
          title: "Class 2: Explaining the Keratin Process", 
          type: "Speaking", 
          duration: "40 min",
          content: "Phrases: Today, we will do a keratin treatment. • First, we wash your hair. • Then, we dry your hair. • Next, we apply the keratin. • Finally, we use the flat iron. • The treatment takes about two hours.",
          task: "Task: Explain the keratin process in a voice recorder."
        }
      ]
    },
    {
      id: 2,
      title: "Unit 2: Giving Information (20-25 July)",
      duration: "Clase 3 y Clase 4 • Instructions and simple questions",
      lessons: [
        { 
          title: "Class 3: Giving Instructions & Aftercare", 
          type: "Speaking", 
          duration: "35 min",
          content: "Phrases: Please, don't move. • Please, wait a moment. • Don't wash your hair for 3 days. • Don't tie your hair. • Don't get your hair wet. • Use sulfate-free shampoo.",
          task: "Task: Give aftercare instructions to a partner in a voice recorder."
        },
        { 
          title: "Class 4: Discussing Prices and Duration", 
          type: "Speaking", 
          duration: "40 min",
          content: "Phrases: The price is $40. • The treatment takes around two hours. • We will finish in 30 minutes. • You can pay by cash. • You can pay by card.",
          task: "Task: Simulate a conversation about the price and duration of the service with a partner."
        }
      ]
    },
    {
      id: 3,
      title: "Unit 3: Customer Interaction (27 July - 1 August)",
      duration: "Clase 5 y Clase 6 • Maintaining a simple conversation",
      lessons: [
        { 
          title: "Class 5: Client Questions & Answers", 
          type: "Speaking", 
          duration: "35 min",
          content: "Phrases: Is this your first keratin treatment? • Do you have any allergies? • Is your hair colored? • No problem. • Of course.",
          task: "Task: Practice a dialogue by asking and answering common questions in a voice recorder."
        },
        { 
          title: "Class 6: Closing and Farewell", 
          type: "Speaking", 
          duration: "40 min",
          content: "Phrases: Thank you for coming. • Thank you for your visit. • Have a nice day. • See you next time. • Take care. • Goodbye! • We hope to see you again.",
          task: "Task: Final Assessment: Complete role-play of the interaction with a partner (Greetings, explanation, instructions, price and farewell)."
        }
      ]
    }
  ];

  const gradingInfo = {
    scale: "Pass 100% - 70% | Fail below 70%",
    distribution: [
      { name: "Participation", percentage: "30%" },
      { name: "Assignments (Recordings, dialogues)", percentage: "40%" },
      { name: "Final Oral Performance", percentage: "30%" }
    ]
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const cleanUser = username.toLowerCase().trim();
    const account = accounts[cleanUser];

    if (account) {
      if ((account.role === "Profesora" && password === "prome") || (account.role !== "Profesora" && password === "1234")) {
        setCurrentUser(account);
        setIsLoggedIn(true);
        setError('');
        return;
      }
    }
    setError('¡Upps! Tu nombre o contraseña no están registrados en el aula virtual.');
  };

  // ================= PANTALLA 1: LOGIN =================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-200">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-purple-600 p-3 rounded-2xl text-white mb-2 shadow-md">
              <Lock size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 text-center">Beauty English</h2>
            <p className="text-xs text-purple-600 font-bold bg-purple-50 px-3 py-1 rounded-full mt-1">KERATIN TALK LMS</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nombre de Usuario</label>
              <input 
                type="text" 
                placeholder="Ej: 'daniela', 'jeilyn', 'jean'..." 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Contraseña Secreta</label>
              <input 
                type="password" 
                placeholder="Estudiantes: 1234 | Profesoras: prome" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

            {error && (
              <p className="text-rose-600 text-xs font-semibold bg-rose-50 p-2.5 rounded-lg border border-rose-100 text-center">{error}</p>
            )}

            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-xl text-sm shadow-md transition-colors">
              Ingresar al Aula Virtual
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ================= PANTALLA 2: CAMPUS ADAPTADO AL SYLLABUS =================
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-purple-600 p-2 rounded-xl text-white"><GraduationCap size={24} /></div>
            <div>
              <span className="font-bold text-lg text-slate-800 block leading-tight">Beauty English</span>
              <span className="text-xs text-purple-600 font-medium tracking-wide">KERATIN TALK</span>
            </div>
          </div>

          <nav className="hidden md:flex space-x-1">
            <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-purple-50 text-purple-700' : 'text-slate-600 hover:text-purple-600'}`}>Inicio</button>
            <button onClick={() => setActiveTab('lessons')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'lessons' ? 'bg-purple-50 text-purple-700' : 'text-slate-600 hover:text-purple-600'}`}>Syllabus (Clases)</button>
            <button onClick={() => setActiveTab('grades')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'grades' ? 'bg-purple-50 text-purple-700' : 'text-slate-600 hover:text-purple-600'}`}>Calificaciones</button>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-700 leading-none">{currentUser.name}</p>
              <p className="text-[11px] text-purple-600 font-medium mt-1">{currentUser.email || currentUser.role}</p>
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
              <span className="bg-purple-500/30 text-purple-200 text-xs px-2.5 py-1 rounded-full border border-purple-400/20 font-medium uppercase">Official Course</span>
              <h1 className="text-3xl font-bold mt-2">¡Welcome, {currentUser.name}!</h1>
              <p className="text-purple-100 text-sm mt-1">Course Modality: Online (Synchronous) | Goal: Master English for Keratin Treatments.</p>
            </div>

            {/* Panel de Profesora */}
            {currentUser.role === "Profesora" && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center space-x-3 text-purple-700 font-bold"><Users size={22} /> <h3>Listado Oficial de Estudiantes (6)</h3></div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.values(accounts).filter(acc => acc.role === "Estudiante" || acc.role === "Estudiante Estrella").map((est, i) => (
                    <div key={i} className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex items-center space-x-3">
                      <div className="h-8 w-8 bg-purple-600 rounded-lg text-white font-bold flex items-center justify-center text-xs">{est.avatar}</div>
                      <div><p className="text-xs font-bold text-slate-700">{est.name}</p><p className="text-[10px] text-slate-400">Progreso: {est.progress}%</p></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Panel de Estudiante */}
            {currentUser.role !== "Profesora" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center space-x-4">
                  <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Clock size={22} /></div>
                  <div><p className="text-xs text-slate-400 font-medium">Tu Progreso del Curso</p><p className="text-xl font-bold text-slate-800">{currentUser.progress}%</p></div>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center space-x-4">
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Award size={22} /></div>
                  <div><p className="text-xs text-slate-400 font-medium">Puntos Ganados</p><p className="text-xl font-bold text-slate-800">{currentUser.points} XP</p></div>
                </div>
              </div>
            )}

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-800 flex items-center space-x-2"><BookOpen size={20} className="text-purple-600" /> <span>Estructura de Unidades del Syllabus</span></h3>
              <div className="mt-4 space-y-3">
                {modules.map(mod => (
                  <div key={mod.id} className="border border-slate-100 p-4 rounded-xl flex justify-between items-center bg-slate-50/50">
                    <div><h4 className="font-semibold text-slate-700 text-sm">{mod.title}</h4><p className="text-xs text-purple-600 font-medium mt-0.5">{mod.duration}</p></div>
                    <button onClick={() => setActiveTab('lessons')} className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-2 rounded-xl flex items-center space-x-1"><span>Ver Unidades</span><ChevronRight size={12} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lessons' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Syllabus Integrado (Clase 1 a 6)</h2>
            <div className="grid grid-cols-1 gap-6">
              {modules.map(mod => (
                <div key={mod.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="bg-purple-600 text-white p-4 flex justify-between items-center">
                    <h3 className="font-bold text-sm">{mod.title}</h3>
                    <span className="text-[11px] bg-purple-500/30 px-3 py-1 rounded-full font-medium border border-purple-400/20">{mod.duration}</span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {mod.lessons.map((les, index) => (
                      <div key={index} className="p-5 space-y-3 hover:bg-slate-50/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-sm font-bold text-slate-800">{les.title}</h4>
                            <p className="text-xs text-purple-600 font-semibold mt-0.5">Main Skill: {les.type} • Duration: {les.duration}</p>
                          </div>
                          <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">{les.task}</span>
                        </div>
                        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Vocabulary & Expressions:</p>
                          <p className="text-xs font-medium text-slate-600 italic bg-white p-2.5 rounded-lg border border-slate-200/60 leading-relaxed">{les.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'grades' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-800 flex items-center space-x-2"><FileText size={20} className="text-purple-600" /> <span>Course Grading Rules</span></h3>
              <p className="text-xs text-slate-500 mt-1">Scale: {gradingInfo.scale}</p>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {gradingInfo.distribution.map((dist, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-center">
                    <p className="text-lg font-bold text-purple-600">{dist.percentage}</p>
                    <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{dist.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100"><h3 className="font-bold text-slate-800 text-sm">Control de Rendimiento</h3></div>
              <div className="p-4 bg-slate-50 text-slate-600 text-xs text-center border-b border-slate-100 font-medium">
                {currentUser.role === "Profesora" ? "Como Profesora, aquí verás la libreta general de las 6 estudiantes." : `Libreta personal de: ${currentUser.name}`}
              </div>
              <table className="w-full text-left border-collapse text-xs">
                <thead><tr className="bg-slate-100 border-b border-slate-200"><th className="p-3 font-bold text-slate-500">Componente</th><th className="p-3 font-bold text-slate-500">Peso</th><th className="p-3 font-bold text-slate-500">Estado</th></tr></thead>
                <tbody className="divide-y divide-slate-100">
                  <tr><td className="p-3 font-medium">Participation</td><td className="p-3 font-bold text-purple-600">30%</td><td className="p-3"><span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-md">Activo</span></td></tr>
                  <tr><td className="p-3 font-medium">Assignments (recordings, dialogues)</td><td className="p-3 font-bold text-purple-600">40%</td><td className="p-3"><span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-md">En Progreso</span></td></tr>
                  <tr><td className="p-3 font-medium">Final oral performance</td><td className="p-3 font-bold text-purple-600">30%</td><td className="p-3"><span className="bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-md">Pendiente</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
