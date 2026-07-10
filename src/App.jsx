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
  Volume2
} from 'lucide-react';

export default function App() {
  // --- SEGURIDAD Y ESTADOS ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  
  const [activeTab, setActiveTab] = useState('dashboard');

  // --- LAS MAESTRAS Y ESTUDIANTES REALES ---
  const accounts = {
    'daniela': { name: "Miss Manzaba Daniela", role: "Profesora", avatar: "MD", email: "dmanzaba4967@utm.edu.ec" },
    'josselyne': { name: "Miss Lucas Josselyne", role: "Profesora", avatar: "MJ", email: "jlucas9873@utm.edu.ec" },
    'jeilyn': { name: "Miss Gómez Jeilyn", role: "Profesora", avatar: "MG", email: "jgomez3878@utm.edu.ec" },
    
    'jean': { name: "Jean", role: "Estudiante", avatar: "JN", progress: 33, points: 120 },
    'ricardo': { name: "Ricardo", role: "Estudiante", avatar: "RC", progress: 50, points: 180 },
    'victoria': { name: "Victoria", role: "Estudiante", avatar: "VC", progress: 100, points: 350 },
    'yaritza': { name: "Yaritza", role: "Estudiante", avatar: "YR", progress: 65, points: 240 },
    'annelys': { name: "Annelys", role: "Estudiante", avatar: "AN", progress: 15, points: 60 },
    'melany': { name: "Melany", role: "Estudiante", avatar: "ML", progress: 85, points: 300 }
  };

  // --- TODO TU LIBRO DE CLASES REALES (UNIDAD 1 Y UNIDAD 2) ---
  const modules = [
    {
      id: 1,
      title: "UNIDAD 1: WELCOME TO THE CLIENT (BIENVENIDA AL CLIENTE) 🚪",
      duration: "Clase 1 y Clase 2 • Miss Daniela, Miss Josselyne, Miss Jeilyn",
      lessons: [
        { 
          title: "CLASE 1: Greetings (Saludos para recibir al cliente) 👋", 
          type: "Speaking", 
          duration: "30-40 min",
          objective: "Objetivo: Al finalizar la clase, podrás saludar y recibir a un cliente en inglés utilizando expresiones básicas.",
          content: [
            { en: "Hello! / Hi!", es: "Hola" },
            { en: "Good morning.", es: "Buenos días" },
            { en: "Good afternoon.", es: "Buenas tardes" },
            { en: "Welcome!", es: "¡Bienvenido(a)!" },
            { en: "How are you?", es: "¿Cómo está?" },
            { en: "My name is...", es: "Mi nombre es..." },
            { en: "Nice to meet you.", es: "Mucho gusto." },
            { en: "Please, have a seat. 🪑", es: "Por favor, tome asiento." },
            { en: "Thank you. 🙏", es: "Gracias." }
          ],
          gameUrl: "https://wordwall.net/es/resource/115823970",
          task: "Role-Play en Parejas: Estilista dice: 'Good morning! Welcome! My name is... Please, have a seat.' y el Cliente responde: 'Hello! My name is... Nice to meet you. Thank you!'"
        },
        { 
          title: "CLASE 2: Explain the Keratin Process (Explicar el proceso) 🧪", 
          type: "Speaking", 
          duration: "30-40 min",
          objective: "Objetivo: Al finalizar la clase, podrás explicar de forma sencilla el proceso de un tratamiento de keratina utilizando conectores básicos.",
          content: [
            { en: "Today, we will do a keratin treatment.", es: "Hoy, haremos un tratamiento de keratina." },
            { en: "First, we wash your hair. 🧼", es: "Primero, lavamos tu cabello." },
            { en: "Then, we dry your hair. 💨", es: "Luego, secamos tu cabello." },
            { en: "Next, we apply the keratin. 🧴", es: "Después, aplicamos la keratina." },
            { en: "Finally, we use the flat iron. 💇‍♀️", es: "Finalmente, usamos la plancha." },
            { en: "The treatment takes about two hours. ⏰", es: "El tratamiento toma aproximadamente dos horas." }
          ],
          gameUrl: "Ruleta de Palabras en Clase",
          task: "🎤 TAREA OFICIAL: Grabar un audio de 30-45 segundos explicando el proceso completo en inglés usando First, Then, Next y Finally."
        }
      ]
    },
    {
      id: 2,
      title: "UNIDAD 2: GIVING INFORMATION (BRINDAR INFORMACIÓN) 📢",
      duration: "Clase 3 y Clase 4 • Miss Daniela, Miss Josselyne, Miss Jeilyn",
      lessons: [
        { 
          title: "CLASE 3: Aftercare Instructions (Instrucciones de cuidado) 🧴", 
          type: "Speaking", 
          duration: "30-40 min",
          objective: "Objetivo: Al finalizar la clase, podrás dar instrucciones sencillas en inglés a un cliente después de un tratamiento de keratina.",
          content: [
            { en: "Please, don't move.", es: "Por favor, no se mueva." },
            { en: "Please, wait a moment.", es: "Espere un momento." },
            { en: "Don't wash your hair for 3 days. 🗓️", es: "No lave su cabello durante 3 días." },
            { en: "Don't tie your hair. 🎀", es: "No se recoja el cabello." },
            { en: "Don't get your hair wet. 💧", es: "No moje su cabello." },
            { en: "Use sulfate-free shampoo. 🧼", es: "Use un shampoo sin sulfatos." }
          ],
          gameUrl: "Actividad en Parejas con Tarjetas",
          task: "🎤 TAREA OFICIAL: Grabar un audio dando las instrucciones de cuidado después del tratamiento de keratina a un compañero."
        },
        { 
          title: "CLASE 4: Price and Time (Hablar sobre Precio y Tiempo) 💰", 
          type: "Speaking", 
          duration: "30-40 min",
          objective: "Objetivo: Al finalizar la clase, podrás informar el precio, la duración del tratamiento y las formas de pago en una conversación sencilla.",
          content: [
            { en: "The price is $40. 💵", es: "El precio es $40." },
            { en: "The treatment takes around two hours. ⏰", es: "El tratamiento dura aproximadamente dos horas." },
            { en: "We will finish in 30 minutes. ⏱️", es: "Terminaremos en 30 minutos." },
            { en: "You can pay by cash. 🪙", es: "Puede pagar en efectivo." },
            { en: "You can pay by card. 💳", es: "Puede pagar con tarjeta." }
          ],
          gameUrl: "Role-Play de la Tiendita en Clase",
          task: "🎭 ROLE-PLAY PRÁCTICO: Jugar con un compañero donde el cliente pregunta 'How much is it? How long does it take?' y tú respondes con el precio, tiempo y formas de pago."
        }
      ]
    }
  ];

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
    setError('¡Upps! Ese nombre no está en mi lista del salón.');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border-4 border-purple-200">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-purple-600 p-4 rounded-2xl text-white mb-2 shadow-md animate-bounce">
              <GraduationCap size={32} />
            </div>
            <h2 className="text-2xl font-black text-purple-900 text-center">Beauty English ✨</h2>
            <p className="text-xs text-purple-600 font-bold bg-purple-50 px-3 py-1 rounded-full mt-1">✨ CAMPUS DE JUGUETE ✨</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tu Nombre de Usuario</label>
              <input type="text" placeholder="Ej: jeilyn, daniela, jean..." value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-purple-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Contraseña Secreta</label>
              <input type="password" placeholder="Estudiantes: 1234 | Profes: prome" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-purple-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            {error && <p className="text-rose-600 text-xs font-bold bg-rose-50 p-2.5 rounded-lg text-center">{error}</p>}
            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-3 rounded-xl text-sm shadow-md transition-all transform hover:scale-105">¡Entrar a Jugar y Aprender! ➡️</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <header className="bg-white border-b border-purple-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-purple-600 p-2 rounded-xl text-white"><GraduationCap size={24} /></div>
            <div>
              <span className="font-black text-lg text-purple-900 block leading-tight">Beauty English</span>
              <span className="text-[10px] text-purple-600 font-bold tracking-wide uppercase">Keratin Talk 💇‍♀️</span>
            </div>
          </div>

          <nav className="flex space-x-1">
            <button onClick={() => setActiveTab('dashboard')} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${activeTab === 'dashboard' ? 'bg-purple-100 text-purple-700' : 'text-slate-600'}`}>Inicio</button>
            <button onClick={() => setActiveTab('lessons')} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${activeTab === 'lessons' ? 'bg-purple-100 text-purple-700' : 'text-slate-600'}`}>Clases Reales 📖</button>
          </nav>

          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-slate-700 leading-none">{currentUser.name}</p>
              <p className="text-[10px] text-purple-600 font-bold mt-0.5">{currentUser.role}</p>
            </div>
            <div className="h-9 w-9 bg-purple-600 text-white rounded-xl flex items-center justify-center font-black text-sm">{currentUser.avatar}</div>
            <button onClick={() => setIsLoggedIn(false)} className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-lg">Salir</button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-6 text-white shadow-md">
              <h1 className="text-2xl font-black">¡Hola, {currentUser.name}! ✨</h1>
              <p className="text-purple-100 text-xs mt-1">¡Bienvenida a tu aula virtual interactiva! Ahora con las Unidades 1 y 2 listas.</p>
            </div>

            {currentUser.role === "Profesora" ? (
              <div className="bg-white border-2 border-purple-100 rounded-2xl p-4 shadow-sm">
                <h3 className="text-xs font-black text-purple-900 uppercase tracking-wider mb-3 flex items-center space-x-1"><span>Mis 6 Estudiantes Estrellas:</span></h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.values(accounts).filter(acc => acc.role === "Estudiante").map((est, i) => (
                    <div key={i} className="bg-purple-50/50 p-2.5 rounded-xl flex items-center space-x-2 border border-purple-100">
                      <div className="h-6 w-6 bg-pink-500 rounded-md text-white font-black flex items-center justify-center text-[10px]">{est.avatar}</div>
                      <p className="text-xs font-bold text-slate-700">{est.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-900 flex items-center space-x-3">
                <div className="p-2 bg-white rounded-lg text-amber-600 font-bold text-xs">⭐</div>
                <div>
                  <p className="text-xs font-bold">¡Tu meta hoy!</p>
                  <p className="text-[11px] text-amber-800">¡Tienes dos unidades para estudiar! Gana puntos completando tus audios.</p>
                </div>
              </div>
            )}

            <button onClick={() => setActiveTab('lessons')} className="w-full bg-white border-2 border-dashed border-purple-300 hover:border-purple-500 p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-all group">
              <BookOpen size={32} className="text-purple-500 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-black text-purple-900">¡Hacer clic aquí para ver todo el libro! 🎉</span>
              <span className="text-xs text-slate-400 mt-0.5">¡Ya están activas las Clases 1, 2, 3 y 4!</span>
            </button>
          </div>
        )}

        {activeTab === 'lessons' && (
          <div className="space-y-6">
            {modules.map(mod => (
              <div key={mod.id} className="space-y-4">
                <div className="bg-purple-900 text-white p-4 rounded-2xl shadow-sm flex justify-between items-center">
                  <div>
                    <h2 className="text-sm font-black uppercase tracking-wider">{mod.title}</h2>
                    <p className="text-[11px] text-purple-200 font-medium mt-0.5">{mod.duration}</p>
                  </div>
                  <span className="bg-pink-500 text-white text-[10px] font-black px-2 py-1 rounded-lg">ACTIVA ⭐</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {mod.lessons.map((les, index) => (
                    <div key={index} className="bg-white border-2 border-purple-100 rounded-2xl p-5 shadow-sm space-y-4">
                      <div>
                        <span className="bg-pink-100 text-pink-700 font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide">Clase Oficial</span>
                        <h3 className="text-base font-black text-slate-800 mt-1">{les.title}</h3>
                        <p className="text-xs text-purple-700 font-bold bg-purple-50 p-2 rounded-lg border border-purple-100/60 mt-2 italic">{les.objective}</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Vocabulario y Frases del PDF:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {les.content.map((item, i) => (
                            <div key={i} className="bg-slate-50 p-2.5 rounded-xl flex justify-between items-center border border-slate-100 hover:bg-purple-50/30 transition-colors">
                              <span className="text-xs font-black text-purple-900">{item.en}</span>
                              <span className="text-xs font-bold text-slate-400">🗣️ {item.es}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-100 space-y-2">
                        <div className="flex items-center space-x-2 text-amber-800 font-black text-xs">
                          <span>🎯 ACTIVIDAD REQUERIDA:</span>
                        </div>
                        <p className="text-xs font-bold text-amber-900 leading-relaxed">{les.task}</p>
                        {les.gameUrl.startsWith("http") ? (
                          <a href={les.gameUrl} target="_blank" rel="noreferrer" className="inline-block mt-2 text-xs font-black bg-purple-600 text-white px-3 py-1.5 rounded-lg shadow-sm hover:bg-purple-700">🕹️ ¡Hacer Clic para Jugar Wordwall!</a>
                        ) : (
                          <span className="inline-block mt-2 text-xs font-black bg-amber-200 text-amber-800 px-3 py-1.5 rounded-lg">🎲 {les.gameUrl}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
