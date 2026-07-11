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
  Upload,
  Sun,
  Moon,
  FileCheck
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

  // --- 🌟 ESTADO NUEVO: MODO OSCURO (SOL Y LUNA) 🌟 ---
  const [darkMode, setDarkMode] = useState(false);

  // --- 🌟 ESTADO NUEVO: CONTROL DE TAREAS SUBIDAS (PDF) 🌟 ---
  const [uploadedTasks, setUploadedTasks] = useState({
    clase2: null,
    clase3: null,
    clase5: null,
    clase6: null
  });

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

  // --- 🌟 FUNCIÓN NUEVA: ENVIAR TAREA PDF 🌟 ---
  const handlePdfUpload = (e, claseKey) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "application/pdf") {
        setUploadedTasks(prev => ({
          ...prev,
          [claseKey]: file.name
        }));
        alert(`¡Súper! Tu tarea "${file.name}" se subió correctamente a la mochila del salón. ✨`);
      } else {
        alert("¡Upps! Recuerda que solo puedes subir archivos en formato PDF (los de la hojita roja). 📄");
      }
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
          gameUrl: "https://interacty.me/projects/e502cc8626a13026",
          task: "Grabar un audio explicando el proceso completo usando First, Then, Next y Finally.",
          taskKey: "clase2"
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
          task: "Grabar un audio dando las instrucciones de cuidado después del tratamiento de keratina.",
          taskKey: "clase3"
        },
        { 
          title: "CLASE 4: Price and Time (Hablar sobre Precio y Tiempo) 💰", 
          objective: "Objetivo: Al finalizar la clase, podrás informar el precio, la duración del tratamiento y las formas de pago en una conversación sencilla.",
          content: [
            { en: "The price is $40.", es: "El precio es $40." },
            { en: "The treatment takes around two hours.", es: "El tratamiento dura aproximadamente dos horas." },
            { en: "We will finish in 30 minutes.", es: "Terminaremos en 30 minutes." },
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
          task: "Grabar un audio practicando las expresiones y preguntas que aprendieron en esta clase.",
          taskKey: "clase5"
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
          task: "EVALUACIÓN FINAL (ROLE-PLAY): Hacer un juego completo con un compañero que incluya todo lo aprendido. ¡Se calificará sobre 10 puntos!",
          taskKey: "clase6"
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
      <div className={`min-h-screen flex items-center justify-center p-4 font-sans transition-colors duration-300 ${darkMode ? 'bg-slate-950' : 'bg-pink-50'}`}>
        <div className={`p-8 rounded-3xl shadow-xl max-w-md w-full border-4 ${darkMode ? 'bg-slate-900 border-purple-900 text-white' : 'bg-white border-purple-200 text-slate-900'}`}>
          
          {/* BOTÓN MODO OSCURO EN LOGIN */}
          <div className="flex justify-end mb-2">
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-xl transition-all ${darkMode ? 'bg-slate-800 text-amber-400' : 'bg-purple-100 text-purple-950'}`}>
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="bg-purple-600 p-4 rounded-2xl text-white mb-2 shadow-md">
              <GraduationCap size={32} />
            </div>
            <h2 className={`text-2xl font-black text-center ${darkMode ? 'text-purple-300' : 'text-purple-900'}`}>Beauty English ✨</h2>
            <p className="text-xs text-purple-600 font-bold bg-purple-50 px-3 py-1 rounded-full mt-1">👑 REPOTENCIADO CON TAREAS PDF 👑</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Tu Nombre de Usuario</label>
              <input type="text" placeholder="Ej: jeilyn, daniela, jean, victoria..." value={username} onChange={(e) => setUsername(e.target.value)} className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-purple-200'}`} />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Contraseña Secreta</label>
              <input type="password" placeholder="Ingresa tu clave" value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-purple-200'}`} />
            </div>
            {error && <p className="text-rose-600 text-xs font-bold bg-rose-50 p-2.5 rounded-lg text-center">{error}</p>}
            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-3 rounded-xl text-sm shadow-md transition-all">¡Entrar al Salón Mágico! ➡️</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-sans flex flex-col transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* ENCABEZADO SUPERIOR */}
      <header className={`border-b sticky top-0 z-40 shadow-sm transition-colors ${darkMode ? 'bg-slate-900 border-purple-950' : 'bg-white border-purple-100'}`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-purple-600 p-2 rounded-xl text-white"><GraduationCap size={24} /></div>
            <div>
              <span className={`font-black text-base block leading-tight ${darkMode ? 'text-purple-300' : 'text-purple-900'}`}>Beauty English</span>
              <span className="text-[10px] text-pink-500 font-bold tracking-wide uppercase">¡Diversión Activa! 🎀</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* INTERRUPTOR SOL / LUNA */}
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-xl transition-all ${darkMode ? 'bg-slate-800 text-amber-400' : 'bg-purple-100 text-purple-950'}`} title="Cambiar Modo de Luz">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="flex items-center space-x-2">
              <div className="text-right hidden sm:block">
                <p className={`text-xs font-black ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{currentUser.name}</p>
                <p className="text-[9px] text-purple-500 font-bold uppercase">{currentUser.role}</p>
              </div>
              <button onClick={() => setIsLoggedIn(false)} className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-lg">Salir</button>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENEDOR PRINCIPAL: MENÚ IZQUIERDO + CONTENIDO */}
      <div className="flex flex-1 flex-col md:flex-row">
        
        {/* 🧭 MENÚ VERTICAL DEL LADO IZQUIERDO */}
        <aside className={`w-full md:w-56 p-4 flex flex-col gap-1.5 md:min-h-[calc(100vh-4rem)] md:sticky md:top-16 z-30 shadow-inner ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-purple-950 text-white'}`}>
          <p className={`text-[10px] uppercase font-black tracking-wider mb-2 px-2 hidden md:block ${darkMode ? 'text-purple-400' : 'text-purple-300'}`}>Navegación Salón</p>
          
          <button onClick={() => setActiveTab('dashboard')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-pink-500 text-white shadow-md' : 'hover:bg-purple-900/50'}`}>
            <span>🏠</span> Inicio
          </button>
          <button onClick={() => setActiveTab('syllabus')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'syllabus' ? 'bg-pink-500 text-white shadow-md' : 'hover:bg-purple-900/50'}`}>
            <span>📋</span> Syllabus
          </button>
          <button onClick={() => setActiveTab('unit1')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'unit1' ? 'bg-pink-500 text-white shadow-md' : 'hover:bg-purple-900/50'}`}>
            <span>📦</span> Unit 1
          </button>
          <button onClick={() => setActiveTab('unit2')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'unit2' ? 'bg-pink-500 text-white shadow-md' : 'hover:bg-purple-900/50'}`}>
            <span>🛍️</span> Unit 2
          </button>
          <button onClick={() => setActiveTab('unit3')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'unit3' ? 'bg-pink-500 text-white shadow-md' : 'hover:bg-purple-900/50'}`}>
            <span>💬</span> Unit 3
          </button>
          <button onClick={() => setActiveTab('activities')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'activities' ? 'bg-pink-500 text-white shadow-md' : 'hover:bg-purple-900/50'}`}>
            <span>🎯</span> Mochila de Tareas
          </button>
          <button onClick={() => setActiveTab('vocabulary')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'vocabulary' ? 'bg-pink-500 text-white shadow-md' : 'hover:bg-purple-900/50'}`}>
            <span>🔊</span> Vocabulario
          </button>
          
          <div className="border-t border-purple-900 my-2 pt-2">
            <button onClick={() => setActiveTab('games')} className={`w-full text-left px-4 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'games' ? 'bg-amber-500 text-purple-950 shadow-md scale-102' : 'bg-purple-900 text-amber-300 hover:bg-purple-800'}`}>
              <span>🕹️</span> Área de Juegos
            </button>
          </div>
        </aside>

        {/* 📄 ESPACIO DERECHO PARA EL CONTENIDO */}
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6">
          
          {/* PESTAÑA: INICIO CON SUBIDA DE VIDEO */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-6 text-white shadow-xl text-center">
                <h1 className="text-2xl font-black">¡Hola, {currentUser.name}! ✨</h1>
                <p className="text-purple-100 text-xs mt-1">¡Ahora puedes cambiar el color del salón con el sol y la luna arriba, y subir tus PDFs de tareas!</p>
              </div>

              {/* RECUADRO MÁGICO PARA SUBIR UN VIDEO */}
              <div className={`border-2 rounded-3xl p-6 shadow-sm text-center space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-200'}`}>
                <div className="flex flex-col items-center justify-center">
                  <Video className="text-pink-500 mb-2 animate-pulse" size={32} />
                  <h3 className={`text-sm font-black ${darkMode ? 'text-purple-300' : 'text-purple-950'}`}>📺 El Televisor de Práctica</h3>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto mt-0.5">¡Sube un video tuyo hablando inglés para verlo aquí en el salón!</p>
                </div>

                {!videoUrl ? (
                  <label className={`mx-auto max-w-xs flex flex-col items-center justify-center border-2 border-dashed p-4 rounded-xl cursor-pointer transition-all group ${darkMode ? 'border-purple-800 bg-slate-800/50 hover:border-purple-600' : 'border-purple-300 bg-purple-50/50 hover:border-purple-500'}`}>
                    <Upload size={24} className="text-purple-500 group-hover:scale-110 transition-transform mb-1" />
                    <span className={`text-xs font-black ${darkMode ? 'text-purple-200' : 'text-purple-900'}`}>Seleccionar mi video</span>
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
            <div className={`border-2 rounded-3xl p-6 shadow-sm space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-200'}`}>
              <div className="flex items-center space-x-2 border-b-2 border-purple-100 pb-3">
                <FileText className="text-purple-600" size={24} />
                <h2 className={`text-xl font-black ${darkMode ? 'text-purple-300' : 'text-purple-950'}`}>SYLLABUS OFICIAL DEL CURSO 📋</h2>
              </div>
              <div className="space-y-3 pt-2">
                <div className={`p-3 rounded-xl border ${darkMode ? 'bg-slate-800 border-purple-950' : 'bg-purple-50 border-purple-100'}`}>
                  <h3 className="text-xs font-black text-purple-400">📦 UNIDAD 1: Welcome to the Client</h3>
                  <p className="text-[11px] font-semibold mt-0.5">• Clase 1: Saludos para recibir al cliente 👋</p>
                  <p className="text-[11px] font-semibold">• Clase 2: Explicar el proceso de la Keratina con conectores 🧪 📝 (Lleva Tarea)</p>
                </div>
                <div className={`p-3 rounded-xl border ${darkMode ? 'bg-slate-800 border-pink-950' : 'bg-pink-50 border-pink-100'}`}>
                  <h3 className="text-xs font-black text-pink-400">🛍️ UNIDAD 2: Giving Information</h3>
                  <p className="text-[11px] font-semibold mt-0.5">• Clase 3: Instrucciones de cuidado posterior 🧴 📝 (Lleva Tarea)</p>
                  <p className="text-[11px] font-semibold">• Clase 4: Hablar sobre precio ($40) y cuánto tiempo toma 💰</p>
                </div>
                <div className={`p-3 rounded-xl border ${darkMode ? 'bg-slate-800 border-amber-950' : 'bg-amber-50 border-amber-100'}`}>
                  <h3 className="text-xs font-black text-amber-400">💬 UNIDAD 3: Customer Interaction</h3>
                  <p className="text-[11px] font-semibold mt-0.5">• Clase 5: Preguntar por alergias y si el cabello está teñido 💇‍♂️ 📝 (Lleva Tarea)</p>
                  <p className="text-[11px] font-semibold">• Clase 6: Despedida amable y Evaluación Final 🏆 📝 (Lleva Tarea)</p>
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
                    <div key={index} className={`border-2 rounded-2xl p-5 shadow-sm space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                      <div>
                        <h3 className={`text-base font-black ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{les.title}</h3>
                        <p className={`text-xs font-bold p-2 rounded-lg mt-2 italic ${darkMode ? 'bg-slate-800 text-purple-300' : 'bg-purple-50 text-purple-700'}`}>{les.objective}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="grid grid-cols-1 gap-1.5">
                          {les.content.map((item, i) => (
                            <div key={i} className={`p-2.5 rounded-xl flex justify-between items-center border ${darkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                              <div className="flex items-center space-x-2">
                                <button onClick={() => escucharPalabra(item.en)} className="p-1.5 bg-purple-600 text-white rounded-lg shadow-sm"><Volume2 size={14} /></button>
                                <span className={`text-xs font-black ${darkMode ? 'text-purple-300' : 'text-purple-950'}`}>{item.en}</span>
                              </div>
                              <span className="text-[11px] font-bold text-slate-400">🗣️ {item.es}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className={`p-3 rounded-xl border text-xs font-bold ${darkMode ? 'bg-slate-800/80 border-amber-900 text-amber-200' : 'bg-amber-50 border-amber-100 text-amber-950'}`}>
                        <p className="font-black text-amber-600 uppercase tracking-wider mb-1">🎯 Actividad Obligatoria:</p>
                        {les.task}
                        
                        {/* BOTÓN DE ENLACE DE JUEGO SI EXISTE */}
                        {les.gameUrl && les.gameUrl.startsWith("http") && (
                          <div className="mt-2"><a href={les.gameUrl} target="_blank" rel="noreferrer" className="inline-block text-[10px] font-black bg-purple-600 text-white px-2 py-1 rounded shadow">🕹️ Abrir Juego en Nueva Ventana</a></div>
                        )}

                        {/* 🌟 APARTADO RÁPIDO PARA SUBIR TAREA DESDE LA PROPIA CLASE 🌟 */}
                        {les.taskKey && (
                          <div className="mt-3 pt-3 border-t border-amber-200/40">
                            <p className="text-[10px] font-black uppercase text-purple-400 mb-1">📥 Entregar archivo PDF:</p>
                            <label className="inline-flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-black px-2.5 py-1.5 rounded-lg cursor-pointer transition-all">
                              <Upload size={12} />
                              {uploadedTasks[les.taskKey] ? "¡Cambiar PDF cambiado!" : "Subir Tarea PDF"}
                              <input type="file" accept=".pdf" onChange={(e) => handlePdfUpload(e, les.taskKey)} className="hidden" />
                            </label>
                            {uploadedTasks[les.taskKey] && (
                              <p className="text-[10px] text-emerald-500 font-bold mt-1 flex items-center gap-1">✅ Listo: {uploadedTasks[les.taskKey]}</p>
                            )}
                          </div>
                        )}
                      </div>

                      {les.title.includes("CLASE 6") && (
                        <div className="mt-4 border-t border-purple-900/20 pt-4">
                          <h4 className="text-xs font-black text-pink-500 mb-2 flex items-center gap-1"><Heart size={12} /> TABLA DE CALIFICACIÓN (MAX 10 PTS)</h4>
                          <div className="overflow-x-auto text-[10px] font-bold">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className={`font-black ${darkMode ? 'bg-slate-800 text-purple-300' : 'bg-purple-50 text-purple-900'}`}>
                                  <th className="p-1.5 border border-purple-900/20">Criterio</th>
                                  <th className="p-1.5 border border-purple-900/20 text-emerald-500">Excelente (2 pts)</th>
                                  <th className="p-1.5 border border-purple-900/20 text-rose-500">Mejorar (0 pts)</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr><td className="p-1.5 border border-purple-900/20">1. Saludo</td><td className="p-1.5 border border-purple-900/20">Completo y adecuado</td><td className="p-1.5 border border-purple-900/20">Incompleto</td></tr>
                                <tr><td className="p-1.5 border border-purple-900/20">2. Proceso</td><td className="p-1.5 border border-purple-900/20">Todos los pasos ordenados</td><td className="p-1.5 border border-purple-900/20">Pocos pasos</td></tr>
                                <tr><td className="p-1.5 border border-purple-900/20">3. Cuidados</td><td className="p-1.5 border border-purple-900/20">Instrucciones claras</td><td className="p-1.5 border border-purple-900/20">Pocas o errores</td></tr>
                                <tr><td className="p-1.5 border border-purple-900/20">4. Precio / Tiempo</td><td className="p-1.5 border border-purple-900/20">Informa claro y correcto</td><td className="p-1.5 border border-purple-900/20">No informa bien</td></tr>
                                <tr><td className="p-1.5 border border-purple-900/20">5. Despedida</td><td className="p-1.5 border border-purple-900/20">Completa y muy cortés</td><td className="p-1.5 border border-purple-900/20">Inadecuada</td></tr>
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

          {/* 🌟 📥 PESTAÑA MEJORADA: LA MOCHILA DE TAREAS CENTRALIZADA 🌟 */}
          {activeTab === 'activities' && (
            <div className={`border-2 rounded-3xl p-6 shadow-sm space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-200'}`}>
              <div className="flex items-center space-x-2 border-b-2 border-purple-100 pb-3">
                <Activity className="text-purple-600" size={24} />
                <h2 className={`text-xl font-black ${darkMode ? 'text-purple-300' : 'text-purple-950'}`}>CENTRO DE RECOLECCIÓN DE TAREAS (PDF) 🎒</h2>
              </div>
              
              <p className="text-xs text-slate-400 font-bold">Aquí puedes subir los archivos de las tareas que te pide el Syllabus de manera organizada:</p>

              <div className="space-y-4 pt-2">
                
                {/* CONTROL DE CLASE 2 */}
                <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${darkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-xs">
                    <span className="font-black text-purple-500 block">🔹 Clase 2: Explicación del Proceso</span>
                    <span className="text-slate-400">Formato requerido: Documento de texto o guión en PDF.</span>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-1">
                    <label className="bg-purple-600 text-white text-[10px] font-black px-3 py-1.5 rounded-xl cursor-pointer hover:bg-purple-700">
                      📄 {uploadedTasks.clase2 ? "Cambiar archivo" : "Elegir PDF"}
                      <input type="file" accept=".pdf" onChange={(e) => handlePdfUpload(e, 'clase2')} className="hidden" />
                    </label>
                    {uploadedTasks.clase2 && <span className="text-[10px] text-emerald-500 font-bold">✅ Recibido: {uploadedTasks.clase2}</span>}
                  </div>
                </div>

                {/* CONTROL DE CLASE 3 */}
                <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${darkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-xs">
                    <span className="font-black text-purple-500 block">🔹 Clase 3: Instrucciones de Cuidado Posterior</span>
                    <span className="text-slate-400">Formato requerido: Ficha técnica o lista en PDF.</span>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-1">
                    <label className="bg-purple-600 text-white text-[10px] font-black px-3 py-1.5 rounded-xl cursor-pointer hover:bg-purple-700">
                      📄 {uploadedTasks.clase3 ? "Cambiar archivo" : "Elegir PDF"}
                      <input type="file" accept=".pdf" onChange={(e) => handlePdfUpload(e, 'clase3')} className="hidden" />
                    </label>
                    {uploadedTasks.clase3 && <span className="text-[10px] text-emerald-500 font-bold">✅ Recibido: {uploadedTasks.clase3}</span>}
                  </div>
                </div>

                {/* CONTROL DE CLASE 5 */}
                <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${darkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-xs">
                    <span className="font-black text-purple-500 block">🔹 Clase 5: Cuestionario de Alergias</span>
                    <span className="text-slate-400">Formato requerido: Preguntas del cliente en PDF.</span>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-1">
                    <label className="bg-purple-600 text-white text-[10px] font-black px-3 py-1.5 rounded-xl cursor-pointer hover:bg-purple-700">
                      📄 {uploadedTasks.clase5 ? "Cambiar archivo" : "Elegir PDF"}
                      <input type="file" accept=".pdf" onChange={(e) => handlePdfUpload(e, 'clase5')} className="hidden" />
                    </label>
                    {uploadedTasks.clase5 && <span className="text-[10px] text-emerald-500 font-bold">✅ Recibido: {uploadedTasks.clase5}</span>}
                  </div>
                </div>

                {/* CONTROL DE CLASE 6 */}
                <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${darkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-xs">
                    <span className="font-black text-pink-500 block">🏆 Clase 6: Rúbrica y Autoevaluación Final</span>
                    <span className="text-slate-400">Formato requerido: Reporte completo final en PDF.</span>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-1">
                    <label className="bg-pink-600 text-white text-[10px] font-black px-3 py-1.5 rounded-xl cursor-pointer hover:bg-pink-700">
                      📄 {uploadedTasks.clase6 ? "Cambiar archivo" : "Elegir PDF"}
                      <input type="file" accept=".pdf" onChange={(e) => handlePdfUpload(e, 'clase6')} className="hidden" />
                    </label>
                    {uploadedTasks.clase6 && <span className="text-[10px] text-emerald-500 font-bold">✅ Recibido: {uploadedTasks.clase6}</span>}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* PESTAÑA: VOCABULARIO INTERACTIVO COMPLETO */}
          {activeTab === 'vocabulary' && (
            <div className={`border-2 rounded-3xl p-6 shadow-sm space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-200'}`}>
              <div className="flex items-center space-x-2 border-b-2 border-purple-100 pb-3">
                <Volume2 className="text-purple-600" size={24} />
                <h2 className={`text-xl font-black ${darkMode ? 'text-purple-300' : 'text-purple-950'}`}>DICCIONARIO PARLANTE COMPLETO 🔊✨</h2>
              </div>
              <div className="space-y-4 pt-2">
                {modules.map(mod => (
                  <div key={mod.id} className="border-l-4 border-pink-400 pl-3 py-1">
                    <h3 className="text-xs font-black text-purple-400 uppercase mb-2">{mod.title.split(":")[0]}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {mod.lessons.flatMap(l => l.content).map((item, idx) => (
                        <div key={idx} className={`p-2 rounded-xl flex justify-between items-center border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                          <div className="flex items-center space-x-2">
                            <button onClick={() => escucharPalabra(item.en)} className="p-1.5 bg-purple-600 text-white rounded-lg"><Volume2 size={12} /></button>
                            <span className="text-[12px] font-black">{item.en}</span>
                          </div>
                          <span className="text-[11px] font-bold text-slate-400">🗣️ {item.es}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 🕹️ PESTAÑA: JUEGOS INTERACTIVOS */}
          {activeTab === 'games' && (
            <div className={`border-2 rounded-3xl p-6 shadow-md space-y-6 ${darkMode ? 'bg-slate-900 border-amber-500/30' : 'bg-white border-amber-300'}`}>
              <div className="flex items-center space-x-2 border-b-2 border-amber-100 pb-3 text-center justify-center">
                <Gamepad2 className="text-amber-500 animate-bounce" size={28} />
                <h2 className={`text-xl font-black ${darkMode ? 'text-amber-300' : 'text-amber-950'}`}>¡LA FERIA DE JUEGOS DE VOCABULARIO! 🎡🕹️</h2>
              </div>
              
              <p className="text-xs font-bold text-slate-400 text-center">¡Haz clic en cualquiera de estas atracciones del salón para jugar y aprender!</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={`border-2 p-4 rounded-2xl flex flex-col justify-between items-center text-center space-y-2 ${darkMode ? 'bg-slate-800 border-purple-900' : 'bg-purple-50 border-purple-200'}`}>
                  <span className="text-3xl">🎯</span>
                  <h3 className="text-xs font-black">El Gran Laberinto de Saludos (Clase 1)</h3>
                  <p className="text-[11px] text-slate-400">Encuentra las palabras correctas para decir "¡Bienvenido!" en inglés.</p>
                  <a href="https://wordwall.net/es/resource/115823970" target="_blank" rel="noreferrer" className="w-full text-center text-xs font-black bg-purple-600 text-white py-2 rounded-xl shadow-sm hover:bg-purple-700">🕹️ ¡Jugar en Wordwall!</a>
                </div>

                <div className={`border-2 p-4 rounded-2xl flex flex-col justify-between items-center text-center space-y-2 ${darkMode ? 'bg-slate-800 border-pink-900' : 'bg-pink-50 border-pink-200'}`}>
                  <span className="text-3xl">🧪</span>
                  <h3 className="text-xs font-black">El Proceso de la Keratina (Clase 2)</h3>
                  <p className="text-[11px] text-slate-400">Une las piezas correctas y domina la explicación de los pasos de la keratina.</p>
                  <a href="https://interacty.me/projects/e502cc8626a13026" target="_blank" rel="noreferrer" className="w-full text-center text-xs font-black bg-pink-500 text-white py-2 rounded-xl shadow-sm hover:bg-pink-600">🕹️ ¡Jugar en Interacty!</a>
                </div>

                <div className={`border-2 p-4 rounded-2xl flex flex-col justify-between items-center text-center space-y-2 ${darkMode ? 'bg-slate-800 border-amber-900' : 'bg-amber-50 border-amber-200'}`}>
                  <span className="text-3xl">🃏</span>
                  <h3 className="text-xs font-black">Adivina las Instrucciones</h3>
                  <p className="text-[11px] text-slate-400">Pon a prueba tu mente recordando qué significa "Don't tie your hair".</p>
                  <button onClick={() => alert("🃏 ¡Cartas volteadas! Recuerda: 'Don't wash your hair for 3 days' significa 'No lavar por 3 días'.")} className="w-full text-center text-xs font-black bg-amber-500 text-purple-950 py-2 rounded-xl shadow-sm hover:bg-amber-600">🃏 Voltear Cartas</button>
                </div>

                <div className={`border-2 p-4 rounded-2xl flex flex-col justify-between items-center text-center space-y-2 ${darkMode ? 'bg-slate-800 border-emerald-900' : 'bg-emerald-50 border-emerald-200'}`}>
                  <span className="text-3xl">⚡</span>
                  <h3 className="text-xs font-black">Desafío Final: Alergias</h3>
                  <p className="text-[11px] text-slate-400">¿Cómo le preguntas a un cliente si tiene alguna alergia antes de empezar?</p>
                  <button onClick={() => { escucharPalabra("Do you have any allergies?"); alert("⚡ ¡Correcto! Se dice: 'Do you have any allergies?'"); }} className="w-full text-center text-xs font-black bg-emerald-600 text-white py-2 rounded-xl shadow-sm hover:bg-emerald-700">⚡ Lanzar Desafío</button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
