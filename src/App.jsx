import React, { useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Clock, 
  CheckCircle, 
  Award, 
  Volume2, 
  Smile, 
  Heart, 
  FileText, 
  Activity,
  Gamepad2,
  Video,
  Upload
} from 'lucide-react';

export default function App() {
  // --- ESTADOS DE ACCESO Y PANTALLAS ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  // --- ESTADO MÁGICO PARA EL VIDEO ---
  const [videoUrl, setVideoUrl] = useState(null);

  // --- FUNCIÓN DE PRONUNCIACIÓN (LA BOCINA MÁGICA) ---
  const escucharPalabra = (textoEnIngles) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(textoEnIngles);
      u.lang = 'en-US';
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    } else {
      alert("¡Tu navegador no tiene activada la magia de la voz!");
    }
  };

  // --- FUNCIÓN PARA SUBIR EL VIDEO ---
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  // --- CUENTAS DE MAESTRAS Y ESTUDIANTES ---
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

  // --- ESTRUCTURA COMPLETA DE DATOS ---
  const modules = [
    {
      id: 1,
      title: "UNIDAD 1: WELCOME TO THE CLIENT (BIENVENIDA) 🚪",
      duration: "Clase 1 y Clase 2 • Profesoras del Curso",
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
          task: "Grabar un audio explicando el proceso completo usando First, Then, Next y Finally."
        }
      ]
    },
    {
      id: 2,
      title: "UNIDAD 2: GIVING INFORMATION (BRINDAR INFORMACIÓN) 📢",
      duration: "Clase 3 y Clase 4 • Profesoras del Curso",
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
          task: "Grabar un audio dando las instrucciones de cuidado después del tratamiento de keratina."
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
          task: "ROLE-PLAY: Jugar con un compañero a preguntar precios, tiempos y formas de pago."
        }
      ]
    },
    {
      id: 3,
      title: "UNIDAD 3: CUSTOMER INTERACTION (INTERACTUAR CON EL CLIENTE) 💬",
      duration: "Clase 5 y Clase 6 • Profesoras del Curso",
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
          task: "Grabar un audio practicando las expresiones y preguntas que aprendieron en esta clase[cite: 6]."
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
          task: "EVALUACIÓN FINAL (ROLE-PLAY): Hacer un juego completo con un compañero que incluya: Saludo, Explicación, Instrucciones, Precio/Duración y Despedida. ¡Se calificará sobre 10 puntos con la rúbrica oficial![cite: 7]"
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
            <p className="text-xs text-purple-600 font-bold bg-purple-50 px-3 py-1 rounded-full mt-1">👑 MÓDULO CON JUEGOS Y VIDEO 👑</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tu Nombre de Usuario</label>
              <input type="text" placeholder="Ej: jeilyn, daniela, jean, victoria..." value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-purple-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Contraseña Secreta</label>
              <input type="password" placeholder="Ingresa tu clave" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-purple-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            {error && <p className="text-rose-600 text-xs font-bold bg-rose-50 p-2.5 rounded-lg text-center">{error}</p>}
            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-3 rounded-xl text-sm shadow-md transition-all">¡Entrar al Salón Mágico! ➡️</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {/* ENCABEZADO */}
      <header className="bg-white border-b border-purple-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-purple-600 p-2 rounded-xl text-white"><GraduationCap size={24} /></div>
            <div>
              <span className="font-black text-base text-purple-900 block leading-tight">Beauty English</span>
              <span className="text-[10px] text-pink-500 font-bold tracking-wide uppercase">¡Diversión Activa! 🎀</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-slate-700">{currentUser.name}</p>
              <p className="text-[9px] text-purple-600 font-bold uppercase">{currentUser.role}</p>
            </div>
            <button onClick={() => setIsLoggedIn(false)} className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-lg">Salir</button>
          </div>
        </div>
      </header>

      {/* BARRA DE MENÚ DE COLORES */}
      <div className="bg-purple-900 text-white p-2 sticky top-16 z-30 shadow-md">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-1 justify-center">
          <button onClick={() => setActiveTab('dashboard')} className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${activeTab === 'dashboard' ? 'bg-pink-500 text-white shadow' : 'hover:bg-purple-800'}`}>🏠 Inicio</button>
          <button onClick={() => setActiveTab('syllabus')} className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${activeTab === 'syllabus' ? 'bg-pink-500 text-white shadow' : 'hover:bg-purple-800'}`}>📋 Syllabus</button>
          <button onClick={() => setActiveTab('unit1')} className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${activeTab === 'unit1' ? 'bg-pink-500 text-white shadow' : 'hover:bg-purple-800'}`}>📦 Unit 1</button>
          <button onClick={() => setActiveTab('unit2')} className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${activeTab === 'unit2' ? 'bg-pink-500 text-white shadow' : 'hover:bg-purple-800'}`}>🛍️ Unit 2</button>
          <button onClick={() => setActiveTab('unit3')} className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${activeTab === 'unit3' ? 'bg-pink-500 text-white shadow' : 'hover:bg-purple-800'}`}>💬 Unit 3</button>
          <button onClick={() => setActiveTab('activities')} className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${activeTab === 'activities' ? 'bg-pink-500 text-white shadow' : 'hover:bg-purple-800'}`}>🎯 Tareas</button>
          <button onClick={() => setActiveTab('vocabulary')} className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${activeTab === 'vocabulary' ? 'bg-pink-500 text-white shadow' : 'hover:bg-purple-800'}`}>🔊 Vocabulario</button>
          <button onClick={() => setActiveTab('games')} className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${activeTab === 'games' ? 'bg-amber-500 text-purple-950 shadow scale-105' : 'hover:bg-purple-800'}`}>🕹️ Juegos</button>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6">
        
        {/* PESTAÑA: INICIO CON SUBIDA DE VIDEO */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-6 text-white shadow-xl text-center">
              <h1 className="text-2xl font-black">¡Hola, {currentUser.name}! ✨</h1>
              <p className="text-purple-100 text-xs mt-1">¡Ahora puedes subir tus videos practicando inglés y jugar en la nueva pestaña!</p>
            </div>

            {/* RECUADRO MÁGICO PARA SUBIR UN VIDEO */}
            <div className="bg-white border-2 border-purple-200 rounded-3xl p-6 shadow-sm text-center space-y-4">
              <div className="flex flex-col items-center justify-center">
                <Video className="text-pink-500 mb-2 animate-pulse" size={32} />
                <h3 className="text-sm font-black text-purple-950">📺 El Televisor de Práctica</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mt-0.5">¡Sube un video tuyo hablando inglés para verlo aquí en el salón!</p>
              </div>

              {!videoUrl ? (
                <label className="mx-auto max-w-xs flex flex-col items-center justify-center border-2 border-dashed border-purple-300 hover:border-purple-500 bg-purple-50/50 p-4 rounded-xl cursor-pointer transition-all group">
                  <Upload size={24} className="text-purple-600 group-hover:scale-110 transition-transform mb-1" />
                  <span className="text-xs font-black text-purple-900">Seleccionar mi video</span>
                  <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                </label>
              ) : (
                <div className="space-y-2">
                  <div className="rounded-xl overflow-hidden border-4 border-purple-900 max-w-md mx-auto shadow-md bg-black">
                    <video src={videoUrl} controls className="w-full h-auto" />
                  </div>
                  <button onClick={() => setVideoUrl(null)} className="text-[10px] font-black text-rose-600 bg-rose-50 px-3 py-1 rounded-lg hover:bg-rose-100">❌ Quitar este video</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PESTAÑA: SYLLABUS */}
        {activeTab === 'syllabus' && (
          <div className="bg-white border-2 border-purple-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b-2 border-purple-100 pb-3">
              <FileText className="text-purple-600" size={24} />
              <h2 className="text-xl font-black text-purple-950">SYLLABUS OFICIAL DEL CURSO 📋</h2>
            </div>
            <div className="space-y-3 pt-2">
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
                <h3 className="text-xs font-black text-purple-900">📦 UNIDAD 1: Welcome to the Client</h3>
                <p className="text-[11px] text-slate-600 font-semibold mt-0.5">• Clase 1: Saludos para recibir al cliente 👋</p>
                <p className="text-[11px] text-slate-600 font-semibold">• Clase 2: Explicar el proceso de la Keratina con conectores 🧪</p>
              </div>
              <div className="p-3 bg-pink-50 rounded-xl border border-pink-100">
                <h3 className="text-xs font-black text-pink-900">🛍️ UNIDAD 2: Giving Information</h3>
                <p className="text-[11px] text-slate-600 font-semibold mt-0.5">• Clase 3: Instrucciones de cuidado posterior (Shampoo, no mojar) 🧴</p>
                <p className="text-[11px] text-slate-600 font-semibold">• Clase 4: Hablar sobre precio ($40) y cuánto tiempo toma 💰</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                <h3 className="text-xs font-black text-amber-900">💬 UNIDAD 3: Customer Interaction</h3>
                <p className="text-[11px] text-slate-600 font-semibold mt-0.5">• Clase 5: Preguntar por alergias y si el cabello está teñido 💇‍♂️[cite: 6]</p>
                <p className="text-[11px] text-slate-600 font-semibold">• Clase 6: Despedida amable y Evaluación con Rúbrica Final 🏆[cite: 7]</p>
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑAS DE UNIDADES INTERACTIVAS */}
        {['unit1', 'unit2', 'unit3'].includes(activeTab) && (
          <div className="space-y-4">
            {modules.filter((_, idx) => (activeTab === 'unit1' && idx === 0) || (activeTab === 'unit2' && idx === 1) || (activeTab === 'unit3' && idx === 2)).map(mod => (
              <div key={mod.id} className="space-y-4">
                <div className="bg-purple-900 text-white p-4 rounded-2xl shadow-sm">
                  <h2 className="text-xs font-black uppercase tracking-wider">{mod.title}</h2>
                  <p className="text-[10px] text-purple-200 font-bold mt-0.5">{mod.duration}</p>
                </div>

                {mod.lessons.map((les, index) => (
                  <div key={index} className="bg-white border-2 border-purple-100 rounded-2xl p-5 shadow-sm space-y-4">
                    <div>
                      <h3 className="text-base font-black text-slate-800">{les.title}</h3>
                      <p className="text-xs text-purple-700 font-bold bg-purple-50 p-2 rounded-lg mt-2 italic">{les.objective}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="grid grid-cols-1 gap-1.5">
                        {les.content.map((item, i) => (
                          <div key={i} className="bg-slate-50 p-2.5 rounded-xl flex justify-between items-center border border-slate-100">
                            <div className="flex items-center space-x-2">
                              <button onClick={() => escucharPalabra(item.en)} className="p-1.5 bg-purple-600 text-white rounded-lg shadow-sm"><Volume2 size={14} /></button>
                              <span className="text-xs font-black text-purple-950">{item.en}</span>
                            </div>
                            <span className="text-[11px] font-bold text-slate-500">🗣️ {item.es}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 text-xs font-bold text-amber-950">
                      <p className="font-black text-amber-800 uppercase tracking-wider mb-1">🎯 Actividad:</p>
                      {les.task}
                      {les.gameUrl && les.gameUrl.startsWith("http") && (
                        <div className="mt-2"><a href={les.gameUrl} target="_blank" rel="noreferrer" className="inline-block text-[10px] font-black bg-purple-600 text-white px-2 py-1 rounded shadow">🕹️ Abrir Wordwall</a></div>
                      )}
                    </div>

                    {les.title.includes("CLASE 6") && (
                      <div className="mt-4 border-t border-purple-100 pt-4">
                        <h4 className="text-xs font-black text-pink-600 mb-2 flex items-center gap-1"><Heart size={12} /> TABLA DE CALIFICACIÓN (MAX 10 PTS)</h4>
                        <div className="overflow-x-auto text-[10px] font-bold text-slate-600">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-purple-50 text-purple-900 font-black">
                                <th className="p-1.5 border border-purple-100">Criterio</th>
                                <th className="p-1.5 border border-purple-100 text-emerald-700">Excelente (2 pts)</th>
                                <th className="p-1.5 border border-purple-100 text-rose-700">Mejorar (0 pts)</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr><td className="p-1.5 border border-purple-100 bg-slate-50">1. Saludo[cite: 7]</td><td className="p-1.5 border border-purple-100">Completo y adecuado[cite: 7]</td><td className="p-1.5 border border-purple-100">Incompleto[cite: 7]</td></tr>
                              <tr><td className="p-1.5 border border-purple-100 bg-slate-50">2. Proceso[cite: 7]</td><td className="p-1.5 border border-purple-100">Todos los pasos ordenados[cite: 7]</td><td className="p-1.5 border border-purple-100">Pocos pasos o errores[cite: 7]</td></tr>
                              <tr><td className="p-1.5 border border-purple-100 bg-slate-50">3. Cuidados[cite: 7]</td><td className="p-1.5 border border-purple-100">Instrucciones claras[cite: 7]</td><td className="p-1.5 border border-purple-100">Pocas o errores[cite: 7]</td></tr>
                              <tr><td className="p-1.5 border border-purple-100 bg-slate-50">4. Precio / Tiempo[cite: 7]</td><td className="p-1.5 border border-purple-100">Informa claro y correcto[cite: 7]</td><td className="p-1.5 border border-purple-100">No informa bien[cite: 7]</td></tr>
                              <tr><td className="p-1.5 border border-purple-100 bg-slate-50">5. Despedida[cite: 7]</td><td className="p-1.5 border border-purple-100">Completa y muy cortés[cite: 7]</td><td className="p-1.5 border border-purple-100">Inadecuada[cite: 7]</td></tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* PESTAÑA: TAREAS */}
        {activeTab === 'activities' && (
          <div className="bg-white border-2 border-purple-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b-2 border-purple-100 pb-3">
              <Activity className="text-purple-600" size={24} />
              <h2 className="text-xl font-black text-purple-950">TODAS LAS TAREAS DEL CURSO 🎯</h2>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs"><span className="font-black text-purple-900 block">🔹 Clase 1</span>Role-Play en Parejas: Saludos amables.</div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs"><span className="font-black text-purple-900 block">🔹 Clase 2</span>Grabar un audio explicando el proceso completo (First, Then...).</div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs"><span className="font-black text-purple-900 block">🔹 Clase 3</span>Grabar un audio dando instrucciones de cuidado (Sulfate-free).</div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs"><span className="font-black text-purple-900 block">🔹 Clase 4</span>Preguntar precios, tiempos y formas de pago.</div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs"><span className="font-black text-purple-900 block">🔹 Clase 5</span>Grabar un audio con preguntas de alergias y cabello teñido[cite: 6].</div>
              <div className="p-3 bg-purple-100 rounded-xl border border-purple-200 text-xs"><span className="font-black text-purple-950 block">🏆 Clase 6: EVALUACIÓN FINAL DE JUEGO DE ROLES[cite: 7]</span>Juego de roles completo desde que el cliente entra hasta que se va[cite: 7].</div>
            </div>
          </div>
        )}

        {/* PESTAÑA: VOCABULARIO INTERACTIVO COMPLETO */}
        {activeTab === 'vocabulary' && (
          <div className="bg-white border-2 border-purple-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b-2 border-purple-100 pb-3">
              <Volume2 className="text-purple-600" size={24} />
              <h2 className="text-xl font-black text-purple-950">DICCIONARIO PARLANTE COMPLETO 🔊✨</h2>
            </div>
            <div className="space-y-4 pt-2">
              {modules.map(mod => (
                <div key={mod.id} className="border-l-4 border-pink-400 pl-3 py-1">
                  <h3 className="text-xs font-black text-purple-900 uppercase mb-2">{mod.title.split(":")[0]}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {mod.lessons.flatMap(l => l.content).map((item, idx) => (
                      <div key={idx} className="bg-slate-50 p-2 rounded-xl flex justify-between items-center border border-slate-100">
                        <div className="flex items-center space-x-2">
                          <button onClick={() => escucharPalabra(item.en)} className="p-1.5 bg-purple-600 text-white rounded-lg"><Volume2 size={12} /></button>
                          <span className="text-[12px] font-black text-purple-950">{item.en}</span>
                        </div>
                        <span className="text-[11px] font-bold text-slate-500">🗣️ {item.es}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🕹️ NUEVA PESTAÑA: JUEGOS INTERACTIVOS DEL VOCABULARIO */}
        {activeTab === 'games' && (
          <div className="bg-white border-2 border-amber-300 rounded-3xl p-6 shadow-md space-y-6">
            <div className="flex items-center space-x-2 border-b-2 border-amber-100 pb-3 text-center justify-center">
              <Gamepad2 className="text-amber-500 animate-bounce" size={28} />
              <h2 className="text-xl font-black text-amber-950">¡LA FERIA DE JUEGOS DE VOCABULARIO! 🎡🕹️</h2>
            </div>
            
            <p className="text-xs font-bold text-slate-600 text-center">¡Haz clic en cualquiera de estas atracciones del salón para jugar y aprender!</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* JUEGO 1: WORDWALL DIRECTO */}
              <div className="bg-purple-50 border-2 border-purple-200 p-4 rounded-2xl flex flex-col justify-between items-center text-center space-y-2">
                <span className="text-3xl">🎯</span>
                <h3 className="text-xs font-black text-purple-950">El Gran Laberinto de Saludos</h3>
                <p className="text-[11px] text-slate-500">Encuentra las palabras correctas para decir "¡Bienvenido!" en inglés.</p>
                <a href="https://wordwall.net/es/resource/115823970" target="_blank" rel="noreferrer" className="w-full text-center text-xs font-black bg-purple-600 text-white py-2 rounded-xl shadow-sm hover:bg-purple-700 transition-transform active:scale-95">🕹️ ¡Jugar en Wordwall!</a>
              </div>

              {/* JUEGO 2: LA RULETA LOCAL DE PALABRAS PRO */}
              <div className="bg-pink-50 border-2 border-pink-200 p-4 rounded-2xl flex flex-col justify-between items-center text-center space-y-2">
                <span className="text-3xl">🎡</span>
                <h3 className="text-xs font-black text-pink-950">La Ruleta Loca del Salón</h3>
                <p className="text-[11px] text-slate-500">¿Qué te tocará? Gira la ruleta imaginaria y practica decir en voz alta los pasos de la keratina.</p>
                <button onClick={() => alert("🎡 ¡Girando la Ruleta Mágica! Te tocó: 'First, we wash your hair' 🧴 ¡Pica tu bocina en la Unidad 1 para escucharla!")} className="w-full text-center text-xs font-black bg-pink-500 text-white py-2 rounded-xl shadow-sm hover:bg-pink-600 transition-transform active:scale-95">🎰 ¡Girar la Ruleta!</button>
              </div>

              {/* JUEGO 3: MEMORIA DE TARJETAS */}
              <div className="bg-amber-50 border-2 border-amber-200 p-4 rounded-2xl flex flex-col justify-between items-center text-center space-y-2">
                <span className="text-3xl">🃏</span>
                <h3 className="text-xs font-black text-amber-950">Adivina las Instrucciones</h3>
                <p className="text-[11px] text-slate-500">Pon a prueba tu mente recordando qué significa "Don't tie your hair".</p>
                <button onClick={() => alert("🃏 ¡Cartas volteadas! Recuerda: 'Don't wash your hair for 3 days' significa 'No lavar por 3 días'. ¡Tú puedes ganarle al juego!")} className="w-full text-center text-xs font-black bg-amber-500 text-purple-950 py-2 rounded-xl shadow-sm hover:bg-amber-600 transition-transform active:scale-95">🃏 Voltear Cartas</button>
              </div>

              {/* JUEGO 4: RETO RELÁMPAGO */}
              <div className="bg-emerald-50 border-2 border-emerald-200 p-4 rounded-2xl flex flex-col justify-between items-center text-center space-y-2">
                <span className="text-3xl">⚡</span>
                <h3 className="text-xs font-black text-emerald-950">Desafío Final: Alergias</h3>
                <p className="text-[11px] text-slate-500">¿Cómo le preguntas a un cliente si tiene alguna alergia antes de empezar?[cite: 6]</p>
                <button onClick={() => { escucharPalabra("Do you have any allergies?"); alert("⚡ ¡Correcto! Se dice: 'Do you have any allergies?'[cite: 6] ¡Punto para ti!"); }} className="w-full text-center text-xs font-black bg-emerald-600 text-white py-2 rounded-xl shadow-sm hover:bg-emerald-700 transition-transform active:scale-95">⚡ Lanzar Desafío</button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
