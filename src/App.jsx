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
  Volume2,
  Smile,
  Heart
} from 'lucide-react';

export default function App() {
  // --- ESTADOS DE ACCESO Y PANTALLAS ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  // --- FUNCIÓN MÁGICA DE PRONUNCIACIÓN (LA BOCINA) ---
  const escucharPalabra = (textoEnIngles) => {
    if ('speechSynthesis' in window) {
      // Cancelar cualquier voz activa para que no se amontonen
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(textoEnIngles);
      u.lang = 'en-US'; // Voz en inglés americano
      u.rate = 0.9;     // Un poquito más lento para que los niños entiendan bien
      window.speechSynthesis.speak(u);
    } else {
      alert("¡Oh no! Tu navegador no tiene la magia de la voz.");
    }
  };

  // --- LAS MAESTRAS Y ESTUDIANTES REALES ---
  const accounts = {
    'daniela': { name: "Miss Manzaba Daniela", role: "Profesora", avatar: "MD" },
    'josselyne': { name: "Miss Lucas Josselyne", role: "Profesora", avatar: "MJ" },
    'jeilyn': { name: "Miss Gómez Jeilyn", role: "Profesora", avatar: "MG" },
    
    'jean': { name: "Jean", role: "Estudiante", avatar: "JN" },
    'ricardo': { name: "Ricardo", role: "Estudiante", avatar: "RC" },
    'victoria': { name: "Victoria", role: "Estudiante", avatar: "VC" },
    'yaritza': { name: "Yaritza", role: "Estudiante", avatar: "YR" },
    'annelys': { name: "Annelys", role: "Estudiante", avatar: "AN" },
    'melany': { name: "Melany", role: "Estudiante", avatar: "ML" }
  };

  // --- EL SÚPER LIBRO INTERACTIVO (UNIDADES 1, 2 Y 3) ---
  const modules = [
    {
      id: 1,
      title: "UNIDAD 1: WELCOME TO THE CLIENT (BIENVENIDA AL CLIENTE) 🚪",
      duration: "Clase 1 y Clase 2 • Miss Daniela, Miss Josselyne, Miss Jeilyn",
      lessons: [
        { 
          title: "CLASE 1: Greetings (Saludos para recibir al cliente) 👋", 
          objective: "Objetivo: Al finalizar la clase, podrás saludar y recibir a un cliente en inglés utilizando expresiones básicas.",
          content: [
            { en: "Hello! / Hi!", es: "Hola" },
            { en: "Good morning.", es: "Buenos días" },
            { en: "Good afternoon.", es: "Buenas tardes" },
            { en: "Welcome!", es: "¡Bienvenido(a)!" },
            { en: "How are you?", es: "¿Cómo está?" },
            { en: "My name is...", es: "Mi nombre es..." },
            { en: "Nice to meet you.", es: "Mucho gusto." },
            { en: "Please, have a seat.", es: "Por favor, tome asiento." },
            { en: "Thank you.", es: "Gracias." }
          ],
          gameUrl: "https://wordwall.net/es/resource/115823970",
          task: "Role-Play en Parejas: Estilista da la bienvenida y el Cliente responde amablemente."
        },
        { 
          title: "CLASE 2: Explain the Keratin Process (Explicar el proceso) 🧪", 
          objective: "Objetivo: Al finalizar la clase, podrás explicar de forma sencilla el proceso de un tratamiento de keratina utilizando conectores básicos.",
          content: [
            { en: "Today, we will do a keratin treatment.", es: "Hoy, haremos un tratamiento de keratina." },
            { en: "First, we wash your hair.", es: "Primero, lavamos tu cabello." },
            { en: "Then, we dry your hair.", es: "Luego, secamos tu cabello." },
            { en: "Next, we apply the keratin.", es: "Después, aplicamos la keratina." },
            { en: "Finally, we use the flat iron.", es: "Finalmente, usamos la plancha." },
            { en: "The treatment takes about two hours.", es: "El tratamiento toma aproximadamente dos horas." }
          ],
          gameUrl: "Ruleta de Palabras en Clase",
          task: "🎤 TAREA: Grabar un audio explicando el proceso completo usando First, Then, Next y Finally."
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
          objective: "Objetivo: Al finalizar la clase, podrás dar instrucciones sencillas en inglés a un cliente después de un tratamiento de keratina.",
          content: [
            { en: "Please, don't move.", es: "Por favor, no se mueva." },
            { en: "Please, wait a moment.", es: "Espere un momento." },
            { en: "Don't wash your hair for 3 days.", es: "No lave su cabello durante 3 días." },
            { en: "Don't tie your hair.", es: "No se recoja el cabello." },
            { en: "Don't get your hair wet.", es: "No moje su cabello." },
            { en: "Use sulfate-free shampoo.", es: "Use un shampoo sin sulfatos." }
          ],
          gameUrl: "Actividad en Parejas con Tarjetas",
          task: "🎤 TAREA: Grabar un audio dando las instrucciones de cuidado después del tratamiento de keratina."
        },
        { 
          title: "CLASE 4: Price and Time (Hablar sobre Precio y Tiempo) 💰", 
          objective: "Objetivo: Al finalizar la clase, podrás informar el precio, la duración del tratamiento y las formas de pago en una conversación sencilla.",
          content: [
            { en: "The price is $40.", es: "El precio es $40." },
            { en: "The treatment takes around two hours.", es: "El tratamiento dura aproximadamente dos horas." },
            { en: "We will finish in 30 minutes.", es: "Terminaremos en 30 minutos." },
            { en: "You can pay by cash.", es: "Puede pagar en efectivo." },
            { en: "You can pay by card.", es: "Puede pagar con tarjeta." }
          ],
          gameUrl: "Role-Play de la Tiendita en Clase",
          task: "🎭 ROLE-PLAY: Jugar con un compañero a preguntar precios, tiempos y formas de pago."
        }
      ]
    },
    {
      id: 3,
      title: "UNIDAD 3: CUSTOMER INTERACTION (INTERACTUAR CON EL CLIENTE) 💬",
      duration: "Clase 5 y Clase 6 • Miss Daniela, Miss Josselyne, Miss Jeilyn",
      lessons: [
        {
          title: "CLASE 5: Conversar con el Cliente (Preguntas previas) 💇‍♂️",
          objective: "Objetivo: Al finalizar la clase, los estudiantes podrán hacer preguntas sencillas a un cliente antes de realizar un tratamiento de keratina y responder de forma cortés.",
          content: [
            { en: "Is this your first keratin treatment?", es: "¿Es este su primer tratamiento de keratina?" },
            { en: "Do you have any allergies?", es: "¿Tiene alguna alergia?" },
            { en: "Is your hair colored?", es: "¿Su cabello está teñido?" },
            { en: "No problem.", es: "No hay problema." },
            { en: "Of course.", es: "Por supuesto." }
          ],
          gameUrl: "Dinámica de preguntas rápidas en el salón",
          task: "🎤 TAREA OFICIAL: Grabar un audio practicando las expresiones y preguntas que aprendieron en esta clase."
        },
        {
          title: "CLASE 6: Despedir al Cliente de manera amable 👋💖",
          objective: "Objetivo: Al finalizar la clase, los estudiantes podrán despedir a un cliente de manera cortés y participar en una conversación completa de atención al cliente en un salón de belleza.",
          content: [
            { en: "Thank you for coming.", es: "Gracias por venir." },
            { en: "Thank you for your visit.", es: "Gracias por su visita." },
            { en: "Have a nice day.", es: "Que tenga un buen día." },
            { en: "See you next time.", es: "Hasta la próxima." },
            { en: "Take care.", es: "Cuídese." },
            { en: "Goodbye!", es: "¡Adiós!" },
            { en: "We hope to see you again.", es: "Esperamos verla nuevamente." }
          ],
          gameUrl: "Evaluación del Gran Salón de Belleza",
          task: "🏆 EVALUACIÓN FINAL (ROLE-PLAY): Hacer un juego completo con un compañero que incluya: Saludo, Explicación, Instrucciones, Precio/Duración y Despedida. ¡Se calificará sobre 10 puntos!"
        }
      ]
    }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const cleanUser = username.toLowerCase().trim();
    const account = accounts[cleanUser];
    if (account) {
      if (password === "1234" || password === "prome") {
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
            <div className="bg-purple-600 p-4 rounded-2xl text-white mb-2 shadow-md">
              <GraduationCap size={32} />
            </div>
            <h2 className="text-2xl font-black text-purple-900 text-center">Beauty English ✨</h2>
            <p className="text-xs text-purple-600 font-bold bg-purple-50 px-3 py-1 rounded-full mt-1">✨ CAMPUS INTERACTIVO CON AUDIO ✨</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tu Nombre de Usuario</label>
              <input type="text" placeholder="Ej: jeilyn, daniela, jean, victoria..." value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-purple-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Contraseña Secreta</label>
              <input type="password" placeholder="Ingresa tu clave del salón" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-purple-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            {error && <p className="text-rose-600 text-xs font-bold bg-rose-50 p-2.5 rounded-lg text-center">{error}</p>}
            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-3 rounded-xl text-sm shadow-md transition-all transform hover:scale-105">¡Entrar a Escuchar y Aprender! ➡️</button>
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
              <span className="text-[10px] text-purple-600 font-bold tracking-wide uppercase">Interactive Audio App 🔊</span>
            </div>
          </div>

          <nav className="flex space-x-1">
            <button onClick={() => setActiveTab('dashboard')} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${activeTab === 'dashboard' ? 'bg-purple-100 text-purple-700' : 'text-slate-600'}`}>Inicio</button>
            <button onClick={() => setActiveTab('lessons')} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${activeTab === 'lessons' ? 'bg-purple-100 text-purple-700' : 'text-slate-600'}`}>Libro con Audio 📖</button>
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
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-6 text-white shadow-md">
              <h1 className="text-2xl font-black">¡Hola, {currentUser.name}! ✨</h1>
              <p className="text-purple-100 text-xs mt-1">¡Hecho! Agregamos la Unidad 3 con bocinas parlantes automáticas.</p>
            </div>

            <div className="bg-white border-2 border-purple-100 rounded-2xl p-4 shadow-sm text-center">
              <p className="text-xs font-black text-purple-950 flex items-center justify-center gap-1">
                <Smile size={16} className="text-pink-500 animate-bounce" /> 
                ¡Instrucción de voz activada! Presiona el botón morado de bocina en cada frase para escuchar cómo se dice.
              </p>
            </div>

            <button onClick={() => setActiveTab('lessons')} className="w-full bg-white border-2 border-dashed border-purple-300 hover:border-purple-500 p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-all group">
              <BookOpen size={32} className="text-purple-500 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-black text-purple-900">¡Abrir libro de Unidades 1, 2 y 3! 🎉</span>
              <span className="text-xs text-slate-400 mt-0.5">Clases del 1 al 6 listas para escuchar</span>
            </button>
          </div>
        )}

        {activeTab === 'lessons' && (
          <div className="space-y-8">
            {modules.map(mod => (
              <div key={mod.id} className="space-y-4">
                <div className="bg-purple-900 text-white p-4 rounded-2xl shadow-sm flex justify-between items-center">
                  <div>
                    <h2 className="text-sm font-black uppercase tracking-wider">{mod.title}</h2>
                    <p className="text-[11px] text-purple-200 font-medium mt-0.5">{mod.duration}</p>
                  </div>
                  <span className="bg-pink-500 text-white text-[10px] font-black px-2 py-1 rounded-lg">AUDIO COMPATIBLE 🔊</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {mod.lessons.map((les, index) => (
                    <div key={index} className="bg-white border-2 border-purple-100 rounded-2xl p-5 shadow-sm space-y-4">
                      <div>
                        <span className="bg-pink-100 text-pink-700 font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide">Lección Práctica</span>
                        <h3 className="text-base font-black text-slate-800 mt-1">{les.title}</h3>
                        <p className="text-xs text-purple-700 font-bold bg-purple-50 p-2 rounded-lg border border-purple-100/60 mt-2 italic">{les.objective}</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Vocabulario Oficial (Toca la bocina para oír):</p>
                        <div className="grid grid-cols-1 gap-2">
                          {les.content.map((item, i) => (
                            <div key={i} className="bg-slate-50 p-3 rounded-xl flex justify-between items-center border border-slate-100 hover:bg-purple-50/50 transition-colors">
                              <div className="flex items-center space-x-3">
                                <button 
                                  onClick={() => escucharPalabra(item.en)}
                                  className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-sm transition-transform active:scale-95 flex items-center justify-center"
                                  title="Escuchar pronunciación"
                                >
                                  <Volume2 size={16} />
                                </button>
                                <span className="text-sm font-black text-purple-950">{item.en}</span>
                              </div>
                              <span className="text-xs font-bold text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-100">🗣️ {item.es}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 space-y-2">
                        <p className="text-xs font-black text-amber-800 uppercase tracking-wider">🎯 ACTIVIDAD DE LA CLASE:</p>
                        <p className="text-xs font-bold text-amber-950 leading-relaxed">{les.task}</p>
                        {les.gameUrl && les.gameUrl.startsWith("http") && (
                          <a href={les.gameUrl} target="_blank" rel="noreferrer" className="inline-block mt-2 text-xs font-black bg-purple-600 text-white px-3 py-1.5 rounded-lg shadow-sm hover:bg-purple-700">🕹️ Abrir Wordwall</a>
                        )}
                      </div>

                      {/* MOSTRAR RÚBRICA SÓLO EN LA CLASE 6 EVALUACIÓN FINAL */}
                      {les.title.includes("CLASE 6") && (
                        <div className="mt-4 border-t-2 border-purple-100 pt-4">
                          <h4 className="text-xs font-black text-pink-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                            <Heart size={14} /> TABLA DE CALIFICACIÓN (RUBRIC - MAX 10 PTS)
                          </h4>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-[11px]">
                              <thead>
                                <tr className="bg-purple-50 text-purple-900 font-black">
                                  <th className="p-2 border border-purple-100">Criterio</th>
                                  <th className="p-2 border border-purple-100 text-emerald-700">Excelente (2 pts)</th>
                                  <th className="p-2 border border-purple-100 text-amber-700">Bueno (1 pt)</th>
                                  <th className="p-2 border border-purple-100 text-rose-700">Mejorar (0 pts)</th>
                                </tr>
                              </thead>
                              <tbody className="font-bold text-slate-600">
                                <tr>
                                  <td className="p-2 border border-purple-100 bg-slate-50">1. Saludo</td>
                                  <td className="p-2 border border-purple-100">Completo y adecuado</td>
                                  <td className="p-2 border border-purple-100">Omite alguna parte</td>
                                  <td className="p-2 border border-purple-100">Incompleto</td>
                                </tr>
                                <tr>
                                  <td className="p-2 border border-purple-100 bg-slate-50">2. Proceso</td>
                                  <td className="p-2 border border-purple-100">Todos los pasos ordenados</td>
                                  <td className="p-2 border border-purple-100">Mayoría de pasos</td>
                                  <td className="p-2 border border-purple-100">Pocos pasos / errores</td>
                                </tr>
                                <tr>
                                  <td className="p-2 border border-purple-100 bg-slate-50">3. Cuidados</td>
                                  <td className="p-2 border border-purple-100">Instrucciones claras</td>
                                  <td className="p-2 border border-purple-100">Mayoría, con omisión</td>
                                  <td className="p-2 border border-purple-100">Pocas o errores</td>
                                </tr>
                                <tr>
                                  <td className="p-2 border border-purple-100 bg-slate-50">4. Precio / Tiempo</td>
                                  <td className="p-2 border border-purple-100">Informa claro y correcto</td>
                                  <td className="p-2 border border-purple-100">Con algún error</td>
                                  <td className="p-2 border border-purple-100">No informa bien</td>
                                </tr>
                                <tr>
                                  <td className="p-2 border border-purple-100 bg-slate-50">5. Despedida</td>
                                  <td className="p-2 border border-purple-100">Completa y muy cortés</td>
                                  <td className="p-2 border border-purple-100">Omite expresiones</td>
                                  <td className="p-2 border border-purple-100">Inadecuada</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
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
