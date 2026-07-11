import React, { useState, useEffect } from 'react';
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
  FileCheck,
  Eye,
  Star
} from 'lucide-react';

export default function App() {
  // --- 🕶️ SUPER HECHIZO DE MEMORIA PARA EL MODO OSCURO (¡AHORA SÍ SE QUEDA!) ---
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('beauty_salon_dark_mode_v2');
    return savedDarkMode === 'true';
  });

  // Este guardián pinta la pantalla de oscuro inmediatamente al recargar
  useEffect(() => {
    localStorage.setItem('beauty_salon_dark_mode_v2', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // --- 🔐 COFRE DE SESIÓN PARA TU LOGIN ---
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('beauty_salon_logged') === 'true';
  });
  
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('beauty_salon_current_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Guardar video de práctica en el cofre
  const [videoUrl, setVideoUrl] = useState(() => {
    return localStorage.getItem('beauty_salon_video_url') || null;
  });

  // --- 📄 COFRE REFORZADO DE TAREAS COMPARTIDAS (ALUMNOS Y PROFESORAS) ---
  const [allStudentsTasks, setAllStudentsTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('beauty_salon_tasks_final_v2');
      return savedTasks ? JSON.parse(savedTasks) : {
        jean: { clase2: null, clase3: null, clase5: null, clase6: null },
        ricardo: { clase2: null, clase3: null, clase5: null, clase6: null },
        victoria: { clase2: null, clase3: null, clase5: null, clase6: null },
        yaritza: { clase2: null, clase3: null, clase5: null, clase6: null },
        annelys: { clase2: null, clase3: null, clase5: null, clase6: null },
        melany: { clase2: null, clase3: null, clase5: null, clase6: null }
      };
    } catch (e) {
      return {
        jean: { clase2: null, clase3: null, clase5: null, clase6: null },
        ricardo: { clase2: null, clase3: null, clase5: null, clase6: null },
        victoria: { clase2: null, clase3: null, clase5: null, clase6: null },
        yaritza: { clase2: null, clase3: null, clase5: null, clase6: null },
        annelys: { clase2: null, clase3: null, clase5: null, clase6: null },
        melany: { clase2: null, clase3: null, clase5: null, clase6: null }
      };
    }
  });

  // Guardar tareas al instante en el cofre eterno
  useEffect(() => {
    localStorage.setItem('beauty_salon_tasks_final_v2', JSON.stringify(allStudentsTasks));
  }, [allStudentsTasks]);

  // --- 📊 BASE DE DATOS MÁGICA DE CALIFICACIONES ---
  const [grades, setGrades] = useState(() => {
    try {
      const savedGrades = localStorage.getItem('beauty_salon_grades_final');
      return savedGrades ? JSON.parse(savedGrades) : {
        jean: { clase2: '-', clase3: '-', clase5: '-', clase6: '-' },
        ricardo: { clase2: '-', clase3: '-', clase5: '-', clase6: '-' },
        victoria: { clase2: '-', clase3: '-', clase5: '-', clase6: '-' },
        yaritza: { clase2: '-', clase3: '-', clase5: '-', clase6: '-' },
        annelys: { clase2: '-', clase3: '-', clase5: '-', clase6: '-' },
        melany: { clase2: '-', clase3: '-', clase5: '-', clase6: '-' }
      };
    } catch (e) {
      return {
        jean: { clase2: '-', clase3: '-', clase5: '-', clase6: '-' },
        ricardo: { clase2: '-', clase3: '-', clase5: '-', clase6: '-' },
        victoria: { clase2: '-', clase3: '-', clase5: '-', clase6: '-' },
        yaritza: { clase2: '-', clase3: '-', clase5: '-', clase6: '-' },
        annelys: { clase2: '-', clase3: '-', clase5: '-', clase6: '-' },
        melany: { clase2: '-', clase3: '-', clase5: '-', clase6: '-' }
      };
    }
  });

  useEffect(() => {
    localStorage.setItem('beauty_salon_grades_final', JSON.stringify(grades));
  }, [grades]);

  const [selectedStudent, setSelectedStudent] = useState('jean');

  // --- ESCUCHAR AUDIO EN INGLÉS ---
  const escucharPalabra = (textoEnIngles) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(textoEnIngles);
      u.lang = 'en-US';
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  };

  // --- SUBIR EL VIDEO ---
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Video = event.target.result;
        setVideoUrl(base64Video);
        localStorage.setItem('beauty_salon_video_url', base64Video);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- HECHIZO REPARADO PARA SUBIR TAREAS QUE LA PROFESORA SÍ PUEDE VER ---
  const handlePdfUpload = (e, claseKey, studentUser) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "application/pdf") {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64Data = event.target.result;
          
          // Guardamos directamente usando el nombre del alumno para que la Miss lo vea reflejado
          setAllStudentsTasks(prev => {
            const updated = {
              ...prev,
              [studentUser]: {
                ...prev[studentUser],
                [claseKey]: {
                  name: file.name,
                  url: base64Data
                }
              }
            };
            // Forzar guardado inmediato en el almacenamiento de la computadora
            localStorage.setItem('beauty_salon_tasks_final_v2', JSON.stringify(updated));
            return updated;
          });
          
          alert(`¡Perfecto! Tu tarea real "${file.name}" voló al buzón de la profesora de forma permanente. 📄✨`);
        };
        reader.readAsDataURL(file);
      } else {
        alert("¡Upps! Recuerda que solo puedes subir archivos en formato PDF. 📄");
      }
    }
  };

  // --- ASIGNAR NOTAS ---
  const asignarNota = (estudiante, claseKey, nota) => {
    setGrades(prev => ({
      ...prev,
      [estudiante]: {
        ...prev[estudiante],
        [claseKey]: nota
      }
    }));
  };

  // --- CUENTAS DEL SALÓN ---
  const accounts = {
    'daniela': { username: 'daniela', name: "Miss Manzaba Daniela", role: "Profesora" },
    'josselyne': { username: 'josselyne', name: "Miss Lucas Josselyne", role: "Profesora" },
    'jeilyn': { username: 'jeilyn', name: "Miss Gómez Jeilyn", role: "Profesora" },
    'jean': { username: 'jean', name: "Jean", role: "Estudiante" },
    'ricardo': { username: 'ricardo', name: "Ricardo", role: "Estudiante" },
    'victoria': { username: 'victoria', name: "Victoria", role: "Estudiante" },
    'yaritza': { username: 'yaritza', name: "Yaritza", role: "Estudiante" },
    'annelys': { username: 'annelys', name: "Annelys", role: "Estudiante" },
    'melany': { username: 'melany', name: "Melany", role: "Estudiante" }
  };

  const estudiantesLista = [
    { id: 'jean', name: 'Jean' },
    { id: 'ricardo', name: 'Ricardo' },
    { id: 'victoria', name: 'Victoria' },
    { id: 'yaritza', name: 'Yaritza' },
    { id: 'annelys', name: 'Annelys' },
    { id: 'melany', name: 'Melany' }
  ];

  // --- CONTENIDOS Y LINKS DE JUEGOS INTACTOS ---
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
          gameUrl: "https://wordwall.net/resource/116065664",
          task: "Grabar un audio dando las instrucciones de cuidado después del tratamiento de keratina.",
          taskKey: "clase3"
        },
        { 
          title: "CLASE 4: Price and Time (Hablar sobre Precio y Tiempo) 💰", 
          objective: "Objetivo: Al finalizar la clase, podrás informar el precio, la duración del tratamiento y las formas de pago en una conversation sencilla.",
          content: [
            { en: "The price is $40.", es: "El precio es $40." },
            { en: "The treatment takes around two hours.", es: "El tratamiento dura aproximadamente dos horas." },
            { en: "We will finish in 30 minutes.", es: "Terminaremos en 30 minutes." },
            { en: "You can pay by cash.", es: "Puede pagar en efectivo." },
            { en: "You can pay by card.", es: "Puede pagar con tarjeta." }
          ],
          gameUrl: "https://wordwall.net/resource/116065924",
          task: "ROLE-PLAY: Jugar con un compañero a preguntar precios, tiempos y formas de pago."
        }
      ]
    },
    {
      id: 3,
      title: "UNIDAD 3: CUSTOMER INTERACTION (INTERACTUAR CON EL CLIENTE) 💬",
      duration: "Clase 3 y Clase 4 • Profesoras del Curso",
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
          gameUrl: "",
          task: "Grabar un audio practicando las expresiones y preguntas que aprendieron en esta clase.",
          taskKey: "clase5"
        },
        {
          title: "CLASE 6: Despedir al Cliente de manera amable 👋💖",
          objective: "Objetivo: Al finalizar la clase, los estudiantes podrán despedir a un cliente de manera cortés y participar en una conversación completa de atención al cliente.",
          content: [
            { en: "Thank you for coming.", es: "Gracias por venir." },
            { en: "Thank you for your visit.", es: "Gracias por su visita." },
            { en: "Have a nice day.", es: "Que tenga un buen día." },
            { en: "See you next time.", es: "Hasta la próxima." },
            { en: "Take care.", es: "Cuídese." },
            { en: "Goodbye!", es: "¡Adiós!" },
            { en: "We hope to see you again.", es: "Esperamos verla nuevamente." }
          ],
          gameUrl: "",
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
        localStorage.setItem('beauty_salon_logged', 'true');
        localStorage.setItem('beauty_salon_current_user', JSON.stringify(account));
        setCurrentUser(account);
        setIsLoggedIn(true);
        setError('');
        return;
      }
    }
    setError('¡Upps! Ese nombre no está en mi lista del salón.');
  };

  const handleLogout = () => {
    localStorage.removeItem('beauty_salon_logged');
    localStorage.removeItem('beauty_salon_current_user');
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  if (!isLoggedIn || !currentUser) {
    return (
      <div className="min-h-screen bg-purple-950 flex flex-col items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full space-y-4 border-4 border-pink-400">
          <div className="text-center">
            <span className="text-5xl">💇‍♀️✨</span>
            <h2 className="text-2xl font-black text-purple-950 mt-2">Beauty English Salón</h2>
            <p className="text-xs text-slate-500 font-bold">¡Pon tu nombre y tu código mágico!</p>
          </div>
          <div className="space-y-2">
            <input type="text" placeholder="Tu nombre (ej. jean)" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-3 border-2 border-purple-100 rounded-xl text-xs text-slate-900 font-bold focus:border-pink-400 outline-none" />
            <input type="password" placeholder="Tu Clave Mágica" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border-2 border-purple-100 rounded-xl text-xs text-slate-900 font-bold focus:border-pink-400 outline-none" />
          </div>
          {error && <p className="text-rose-500 text-xs font-black text-center bg-rose-50 p-2 rounded-xl">❌ {error}</p>}
          <button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-black p-3.5 rounded-xl text-xs shadow-md transition-all">¡Entrar al Salón! 🚀</button>
        </form>
      </div>
    );
  }

  const esProfesora = currentUser.role === "Profesora";
  // ¡HECHIZO CLAVE! Si eres profesora miras al alumno seleccionado en el desplegable, si eres alumno miras tu propio perfil.
  const targetStudent = esProfesora ? selectedStudent : currentUser.username;

  return (
    <div className={`min-h-screen font-sans flex flex-col transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-white dark-theme' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* --- ENCABEZADO CON SOL Y LUNA --- */}
      <header className={`border-b sticky top-0 z-40 shadow-sm transition-colors ${darkMode ? 'bg-slate-900 border-purple-950 text-white' : 'bg-white border-purple-100'}`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-purple-600 p-2 rounded-xl text-white"><GraduationCap size={24} /></div>
            <div>
              <span className={`font-black text-base block leading-tight ${darkMode ? 'text-purple-300' : 'text-purple-900'}`}>Beauty English</span>
              <span className="text-[10px] text-pink-500 font-bold tracking-wide uppercase">Modo Oscuro Permanente Activo 🕶️🔒</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-xl transition-all ${darkMode ? 'bg-slate-800 text-amber-400' : 'bg-purple-100 text-purple-950'}`}>
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="flex items-center space-x-2">
              <div className="text-right hidden sm:block">
                <p className={`text-xs font-black ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{currentUser.name}</p>
                <p className="text-[9px] text-purple-500 font-bold uppercase">{currentUser.role}</p>
              </div>
              <button onClick={handleLogout} className="text-[10px] font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 px-2.5 py-1.5 rounded-lg transition-all">Salir</button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        
        {/* --- MENÚ LATERAL --- */}
        <aside className={`w-full md:w-56 p-4 flex flex-col gap-1.5 md:min-h-[calc(100vh-4rem)] md:sticky md:top-16 z-30 shadow-inner ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-purple-950 text-white'}`}>
          <p className="text-[10px] uppercase font-black tracking-wider mb-2 px-2 hidden md:block text-purple-300">Navegación Salón</p>
          <button onClick={() => setActiveTab('dashboard')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-pink-500 text-white' : 'hover:bg-purple-900/50'}`}><span>🏠</span> Inicio</button>
          <button onClick={() => setActiveTab('unit1')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'unit1' ? 'bg-pink-500 text-white' : 'hover:bg-purple-900/50'}`}><span>📦</span> Unit 1</button>
          <button onClick={() => setActiveTab('unit2')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'unit2' ? 'bg-pink-500 text-white' : 'hover:bg-purple-900/50'}`}><span>🛍️</span> Unit 2</button>
          <button onClick={() => setActiveTab('unit3')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'unit3' ? 'bg-pink-500 text-white' : 'hover:bg-purple-900/50'}`}><span>💬</span> Unit 3</button>
          <button onClick={() => setActiveTab('activities')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'activities' ? 'bg-pink-500 text-white' : 'hover:bg-purple-900/50'}`}><span>🎒</span> Mochila de Tareas</button>
          <button onClick={() => setActiveTab('gradesTab')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'gradesTab' ? 'bg-pink-500 text-white' : 'hover:bg-purple-900/50'}`}><span>⭐</span> Calificaciones</button>
          <button onClick={() => setActiveTab('vocabulary')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'vocabulary' ? 'bg-pink-500 text-white' : 'hover:bg-purple-900/50'}`}><span>🔊</span> Vocabulario</button>
          
          <div className="border-t border-purple-900 my-2 pt-2">
            <button onClick={() => setActiveTab('games')} className={`w-full text-left px-4 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'games' ? 'bg-amber-500 text-purple-950' : 'bg-purple-900 text-amber-300 hover:bg-purple-800'}`}><span>🕹️</span> Área de Juegos</button>
          </div>
        </aside>

        {/* --- CONTENIDO PRINCIPAL --- */}
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6">
          
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-6 text-white shadow-xl text-center">
                <h1 className="text-2xl font-black">¡Hola, {currentUser.name}! ✨</h1>
                <p className="text-purple-100 text-xs mt-1">¡Tus tareas y tu modo oscuro se guardan súper fuerte ahora!</p>
              </div>

              <div className={`border-2 rounded-3xl p-6 shadow-sm text-center space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-200'}`}>
                <div className="flex flex-col items-center justify-center">
                  <Video className="text-pink-500 mb-2" size={32} />
                  <h3 className={`text-sm font-black ${darkMode ? 'text-purple-300' : 'text-purple-950'}`}>📺 El Televisor de Práctica</h3>
                </div>
                {!videoUrl ? (
                  <label className="mx-auto max-w-xs flex flex-col items-center justify-center border-2 border-dashed p-4 rounded-xl cursor-pointer bg-purple-50/50">
                    <Upload size={24} className="text-purple-500 mb-1" />
                    <span className="text-xs font-black text-slate-900">Seleccionar mi video</span>
                    <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                  </label>
                ) : (
                  <div className="space-y-2">
                    <video src={videoUrl} controls className="w-full max-w-md mx-auto rounded-xl border-4 border-purple-900 bg-black" />
                    <button onClick={() => { setVideoUrl(null); localStorage.removeItem('beauty_salon_video_url'); }} className="text-[10px] font-black text-rose-600 bg-rose-50 px-3 py-1 rounded-lg">❌ Quitar video</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {['unit1', 'unit2', 'unit3'].includes(activeTab) && (
            <div className="space-y-4">
              {/* Selector global de alumnos visible arriba de las unidades si eres profesora para que cambies de alumno fácilmente */}
              {esProfesora && (
                <div className="p-3 bg-purple-600 text-white rounded-2xl flex items-center justify-between shadow-md mb-2">
                  <span className="text-xs font-black">Revisando las unidades del alumno:</span>
                  <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} className="text-xs font-bold p-1 rounded border text-slate-950 bg-white">
                    {estudiantesLista.map(est => <option key={est.id} value={est.id}>{est.name}</option>)}
                  </select>
                </div>
              )}

              {modules.filter((_, idx) => (activeTab === 'unit1' && idx === 0) || (activeTab === 'unit2' && idx === 1) || (activeTab === 'unit3' && idx === 2)).map(mod => (
                <div key={mod.id} className="space-y-4">
                  <div className="bg-purple-900 text-white p-4 rounded-2xl shadow-sm">
                    <h2 className="text-xs font-black uppercase tracking-wider">{mod.title}</h2>
                  </div>

                  {mod.lessons.map((les, index) => {
                    // Carga dinámicamente la tarea según el alumno seleccionado
                    const taskData = allStudentsTasks[targetStudent]?.[les.taskKey];
                    return (
                      <div key={index} className={`border-2 rounded-2xl p-5 shadow-sm space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                        <h3 className="text-base font-black">{les.title}</h3>
                        <p className="text-xs font-bold p-2 bg-purple-50 text-purple-700 rounded-lg italic">{les.objective}</p>

                        <div className="grid grid-cols-1 gap-1.5">
                          {les.content.map((item, i) => (
                            <div key={i} className="p-2.5 rounded-xl flex justify-between items-center border bg-slate-50/50 dark:bg-slate-800/40">
                              <div className="flex items-center space-x-2">
                                <button onClick={() => escucharPalabra(item.en)} className="p-1.5 bg-purple-600 text-white rounded-lg"><Volume2 size={14} /></button>
                                <span className="text-xs font-black text-slate-900 dark:text-white">{item.en}</span>
                              </div>
                              <span className="text-[11px] font-bold text-slate-400">🗣️ {item.es}</span>
                            </div>
                          ))}
                        </div>

                        <div className="p-3 bg-amber-50 dark:bg-slate-800/80 rounded-xl border text-xs text-amber-950 dark:text-amber-200 font-bold">
                          <p className="font-black text-amber-600">🎯 Actividad Obligatoria:</p>
                          <p className="my-1">{les.task}</p>
                          
                          {les.gameUrl && (
                            <div className="mt-2">
                              <a href={les.gameUrl} target="_blank" rel="noreferrer" className="inline-block text-[10px] font-black bg-purple-600 text-white px-3 py-1.5 rounded-xl hover:bg-purple-700 transition-all">🕹️ Abrir Juego</a>
                            </div>
                          )}

                          {les.taskKey && (
                            <div className="mt-3 pt-3 border-t border-amber-200/40 space-y-2">
                              <div className="p-1.5 bg-purple-900 text-white rounded-lg text-[10px] font-black">
                                👀 Viendo la mochila de: <b>{targetStudent.toUpperCase()}</b>
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-2">
                                {!esProfesora && (
                                  <label className="bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-black px-2.5 py-1.5 rounded-lg cursor-pointer inline-flex items-center gap-1">
                                    <Upload size={12} /> {taskData ? "Cambiar mi PDF Real" : "Subir Tarea PDF Real"}
                                    <input type="file" accept=".pdf" onChange={(e) => handlePdfUpload(e, les.taskKey, currentUser.username)} className="hidden" />
                                  </label>
                                )}
                                {taskData && (
                                  <a href={taskData.url} download={taskData.name} target="_blank" rel="noreferrer" className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black px-2.5 py-1.5 rounded-lg inline-flex items-center gap-1 shadow-sm">
                                    <Eye size={12} /> Descargar / Ver PDF Real 👁️
                                  </a>
                                )}
                              </div>
                              {taskData ? (
                                <p className="text-[10px] text-emerald-500 font-bold mt-1">✅ Entregado: {taskData.name}</p>
                              ) : (
                                <p className="text-[10px] text-rose-500 font-bold mt-1">❌ Sin entregar todavía.</p>
                              )}
                              <p className="text-[11px] font-black text-purple-600 mt-1">⭐ Calificación: {grades[targetStudent]?.[les.taskKey] || '-'} / 10</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'activities' && (
            <div className={`border-2 rounded-3xl p-6 shadow-sm space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-200'}`}>
              <div className="flex items-center space-x-2 border-b-2 border-purple-100 pb-3">
                <Activity className="text-purple-600" size={24} />
                <h2 className="text-xl font-black">CENTRO DE TAREAS GENERAL 🎒👁️</h2>
              </div>
              
              {esProfesora && (
                <div className="p-3 bg-purple-100 rounded-xl flex items-center gap-2 mb-4">
                  <span className="text-xs font-black text-purple-950">Selecciona un alumno para ver sus PDF subidos:</span>
                  <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} className="text-xs font-bold p-1 rounded border bg-white text-slate-900">
                    {estudiantesLista.map(est => <option key={est.id} value={est.id}>{est.name}</option>)}
                  </select>
                </div>
              )}

              <div className="space-y-4">
                {['clase2', 'clase3', 'clase5', 'clase6'].map((key) => {
                  const names = {
                    clase2: "🔹 Clase 2: Explicación del Proceso (Keratina)",
                    clase3: "🔹 Clase 3: Instrucciones de Cuidado Posterior",
                    clase5: "🔹 Clase 5: Conversación / Preguntas de Alergias",
                    clase6: "🏆 Clase 6: Despedida y Evaluación Final"
                  };
                  // Carga dinámicamente los archivos del alumno seleccionado en tiempo real
                  const currentTask = allStudentsTasks[targetStudent]?.[key];

                  return (
                    <div key={key} className="p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/40 text-slate-900 dark:text-white">
                      <div className="text-xs">
                        <span className="font-black text-purple-500 block">{names[key]}</span>
                        <span className="text-slate-400 font-bold">Mochila actual de: <b className="text-pink-500 font-black">{targetStudent.toUpperCase()}</b></span>
                      </div>
                      <div className="flex items-center gap-2">
                        {!esProfesora && (
                          <label className="bg-purple-600 text-white text-[10px] font-black px-3 py-1.5 rounded-xl cursor-pointer">
                            📄 {currentTask ? "Cambiar" : "Elegir PDF Real"}
                            <input type="file" accept=".pdf" onChange={(e) => handlePdfUpload(e, key, currentUser.username)} className="hidden" />
                          </label>
                        )}
                        {currentTask ? (
                          <a href={currentTask.url} download={currentTask.name} target="_blank" rel="noreferrer" className="bg-emerald-600 text-white text-[10px] font-black px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-md">
                            <Eye size={12} /> Ver PDF de {targetStudent.toUpperCase()} 👁️
                          </a>
                        ) : (
                          <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-1 rounded font-bold">Sin entregar</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'gradesTab' && (
            <div className={`border-2 rounded-3xl p-6 shadow-sm space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-200'}`}>
              <div className="flex items-center space-x-2 border-b-2 border-purple-100 pb-3">
                <Star className="text-amber-500 fill-amber-500" size={24} />
                <h2 className="text-xl font-black">SISTEMA DE CALIFICACIONES ⭐</h2>
              </div>
              {esProfesora ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black">Elegir alumno para poner nota:</span>
                    <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} className="text-xs font-bold p-1 rounded border text-slate-900 bg-white">
                      {estudiantesLista.map(est => <option key={est.id} value={est.id}>{est.name}</option>)}
                    </select>
                  </div>
                  {['clase2', 'clase3', 'clase5', 'clase6'].map(key => (
                    <div key={key} className="p-3 border rounded-xl flex justify-between items-center text-xs text-slate-900 dark:text-white font-bold">
                      <span>{key.toUpperCase()}</span>
                      <select value={grades[selectedStudent]?.[key] || '-'} onChange={(e) => asignarNota(selectedStudent, key, e.target.value)} className="border p-1 rounded bg-white text-slate-900">
                        <option value="-">-</option>
                        {[10,9,8,7,6,5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {['clase2', 'clase3', 'clase5', 'clase6'].map(key => (
                    <div key={key} className="p-3 bg-purple-50 dark:bg-slate-800/60 rounded-xl text-xs font-bold flex justify-between text-slate-900 dark:text-white">
                      <span>{key.toUpperCase()}</span>
                      <span className="bg-purple-600 text-white px-2 py-0.5 rounded-md">{grades[currentUser.username]?.[key] || '-'} / 10</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'vocabulary' && (
            <div className={`border-2 rounded-3xl p-6 shadow-sm space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-200'}`}>
              <div className="flex items-center space-x-2 border-b-2 border-purple-100 pb-3">
                <Volume2 className="text-purple-600" size={24} />
                <h2 className="text-xl font-black">DICCIONARIO PARLANTE COMPLETO 🔊✨</h2>
              </div>
              <div className="space-y-4 pt-2">
                {modules.map(mod => (
                  <div key={mod.id} className="border-l-4 border-pink-400 pl-3 py-1">
                    <h3 className="text-xs font-black text-purple-500 uppercase mb-2">{mod.title.split(":")[0]}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {mod.lessons.flatMap(l => l.content).map((item, idx) => (
                        <div key={idx} className="p-2 rounded-xl flex justify-between items-center border bg-slate-50 dark:bg-slate-800/40 text-slate-900 dark:text-white">
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

          {activeTab === 'games' && (
            <div className="bg-white border-2 border-amber-300 rounded-3xl p-6 text-center text-slate-950 space-y-4">
              <h2 className="text-xl font-black text-amber-500">🎡 LA FERIA DE JUEGOS DE VOCABULARIO 🕹️</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="border-2 p-4 rounded-2xl bg-purple-50 text-center space-y-2">
                  <span className="text-2xl">🎯</span>
                  <h4 className="text-xs font-black">Saludos (Clase 1)</h4>
                  <a href="https://wordwall.net/es/resource/115823970" target="_blank" rel="noreferrer" className="w-full block text-[11px] font-black bg-purple-600 text-white py-1.5 rounded-xl">¡Jugar!</a>
                </div>
                <div className="border-2 p-4 rounded-2xl bg-pink-50 text-center space-y-2">
                  <span className="text-2xl">🧪</span>
                  <h4 className="text-xs font-black">Keratina (Clase 2)</h4>
                  <a href="https://interacty.me/projects/e502cc8626a13026" target="_blank" rel="noreferrer" className="w-full block text-[11px] font-black bg-pink-500 text-white py-1.5 rounded-xl">¡Jugar!</a>
                </div>
                <div className="border-2 p-4 rounded-2xl bg-amber-50 text-center space-y-2">
                  <span className="text-2xl">🧴</span>
                  <h4 className="text-xs font-black">Cuidado (Clase 3)</h4>
                  <a href="https://wordwall.net/resource/116065664" target="_blank" rel="noreferrer" className="w-full block text-[11px] font-black bg-amber-500 text-white py-1.5 rounded-xl">¡Jugar!</a>
                </div>
                <div className="border-2 p-4 rounded-2xl bg-emerald-50 text-center space-y-2">
                  <span className="text-2xl">💰</span>
                  <h4 className="text-xs font-black">Precios (Clase 4)</h4>
                  <a href="https://wordwall.net/resource/116065924" target="_blank" rel="noreferrer" className="w-full block text-[11px] font-black bg-emerald-600 text-white py-1.5 rounded-xl">¡Jugar!</a>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
