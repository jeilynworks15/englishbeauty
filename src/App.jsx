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
  // --- 🕶️ MODO OSCURO / CLARO ---
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('beauty_salon_dark_mode_v2');
    return savedDarkMode === 'true';
  });

  useEffect(() => {
    localStorage.setItem('beauty_salon_dark_mode_v2', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // --- 🔐 CONTROL DE SESIÓN ---
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
  
  const [videoUrl, setVideoUrl] = useState(() => {
    return localStorage.getItem('beauty_salon_video_url') || null;
  });

  // --- 📄 COFRE REFORZADO DE TAREAS ---
  const [allStudentsTasks, setAllStudentsTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('beauty_salon_tasks_final_v2');
      return savedTasks ? JSON.parse(savedTasks) : {
        jean: { clase2: null, clase3: null, clase5: null, clase6: null },
        ricardo: { clase2: null, clase3: null, clase5: null, clase6: null },
        victoria: { clase2: null, clase3: null, clase5: null, clase6: null },
        yaritza: { clase2: null, clase3: null, clase5: null, clase6: null },
        annelys: { clase2: null, clase3: null, clase5: null, clase6: null },
        melany: { clase2: null, clase3: null, clase5: null, clase6: null },
      };
    } catch (e) {
      return {
        jean: { clase2: null, clase3: null, clase5: null, clase6: null },
        ricardo: { clase2: null, clase3: null, clase5: null, clase6: null },
        victoria: { clase2: null, clase3: null, clase5: null, clase6: null },
        yaritza: { clase2: null, clase3: null, clase5: null, clase6: null },
        annelys: { clase2: null, clase3: null, clase5: null, clase6: null },
        melany: { clase2: null, clase3: null, clase5: null, clase6: null },
      };
    }
  });

  useEffect(() => {
    localStorage.setItem('beauty_salon_tasks_final_v2', JSON.stringify(allStudentsTasks));
  }, [allStudentsTasks]);

  // --- 📊 BASE DE DATOS DE CALIFICACIONES ---
  const [grades, setGrades] = useState(() => {
    try {
      const savedGrades = localStorage.getItem('beauty_salon_grades_final_v3');
      return savedGrades ? JSON.parse(savedGrades) : {
        jean: { clase2: { nota: '-', comentario: '' }, clase3: { nota: '-', comentario: '' }, clase5: { nota: '-', comentario: '' }, clase6: { nota: '-', comentario: '' } },
        ricardo: { clase2: { nota: '-', comentario: '' }, clase3: { nota: '-', comentario: '' }, clase5: { nota: '-', comentario: '' }, clase6: { nota: '-', comentario: '' } },
        victoria: { clase2: { nota: '-', comentario: '' }, clase3: { nota: '-', comentario: '' }, clase5: { nota: '-', comentario: '' }, clase6: { nota: '-', comentario: '' } },
        yaritza: { clase2: { nota: '-', comentario: '' }, clase3: { nota: '-', comentario: '' }, clase5: { nota: '-', comentario: '' }, clase6: { nota: '-', comentario: '' } },
        annelys: { clase2: { nota: '-', comentario: '' }, clase3: { nota: '-', comentario: '' }, clase5: { nota: '-', comentario: '' }, clase6: { nota: '-', comentario: '' } },
        melany: { clase2: { nota: '-', comentario: '' }, clase3: { nota: '-', comentario: '' }, clase5: { nota: '-', comentario: '' }, clase6: { nota: '-', comentario: '' } }
      };
    } catch (e) {
      return {
        jean: { clase2: { nota: '-', comentario: '' }, clase3: { nota: '-', comentario: '' }, clase5: { nota: '-', comentario: '' }, clase6: { nota: '-', comentario: '' } },
        ricardo: { clase2: { nota: '-', comentario: '' }, clase3: { nota: '-', comentario: '' }, clase5: { nota: '-', comentario: '' }, clase6: { nota: '-', comentario: '' } },
        victoria: { clase2: { nota: '-', comentario: '' }, clase3: { nota: '-', comentario: '' }, clase5: { nota: '-', comentario: '' }, clase6: { nota: '-', comentario: '' } },
        yaritza: { clase2: { nota: '-', comentario: '' }, clase3: { nota: '-', comentario: '' }, clase5: { nota: '-', comentario: '' }, clase6: { nota: '-', comentario: '' } },
        annelys: { clase2: { nota: '-', comentario: '' }, clase3: { nota: '-', comentario: '' }, clase5: { nota: '-', comentario: '' }, clase6: { nota: '-', comentario: '' } },
        melany: { clase2: { nota: '-', comentario: '' }, clase3: { nota: '-', comentario: '' }, clase5: { nota: '-', comentario: '' }, clase6: { nota: '-', comentario: '' } }
      };
    }
  });

  useEffect(() => {
    localStorage.setItem('beauty_salon_grades_final_v3', JSON.stringify(grades));
  }, [grades]);

  const [selectedStudent, setSelectedStudent] = useState('jean');

  const escucharPalabra = (textoEnIngles) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(textoEnIngles);
      u.lang = 'en-US';
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  };

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

  const handlePdfUpload = (e, claseKey, studentUser) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "application/pdf") {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64Data = event.target.result;
          
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
            localStorage.setItem('beauty_salon_tasks_final_v2', JSON.stringify(updated));
            return updated;
          });
          
          alert(`¡Listo! La tarea "${file.name}" ya llegó al buzón de la profesora. 📄✨`);
        };
        reader.readAsDataURL(file);
      } else {
        alert("¡Upps! Recuerda que solo puedes subir archivos PDF. 📄");
      }
    }
  };

  const asignarNota = (estudiante, claseKey, nota) => {
    setGrades(prev => ({
      ...prev,
      [estudiante]: {
        ...prev[estudiante],
        [claseKey]: {
          ...prev[estudiante]?.[claseKey],
          nota: nota
        }
      }
    }));
  };

  const asignarComentario = (estudiante, claseKey, comentario) => {
    setGrades(prev => ({
      ...prev,
      [estudiante]: {
        ...prev[estudiante],
        [claseKey]: {
          ...prev[estudiante]?.[claseKey],
          comentario: comentario
        }
      }
    }));
  };

  const calcularProgreso = (estudianteKey) => {
    const tareasEstudiante = allStudentsTasks[estudianteKey] || {};
    const llavesTareas = ['clase2', 'clase3', 'clase5', 'clase6'];
    let entregadas = 0;
    llavesTareas.forEach(key => {
      if (tareasEstudiante[key] && tareasEstudiante[key].url) {
        entregadas++;
      }
    });
    return Math.round((entregadas / llavesTareas.length) * 100);
  };

  const accounts = {
    'daniela': { username: 'daniela', name: "Miss Manzaba Daniela", role: "Profesora" },
    'josselyne': { username: 'josselyne', name: "Miss Lucas Josselyne", role: "Profesora" },
    'jeilyn': { username: 'jeilyn', name: "Miss Gómez Jeilyn", role: "Profesora" },
    'isabel': { username: 'isabel', name: "Miss Isabel", role: "Profesora" },
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

  const infoTareas = {
    clase2: "Tarea 1: Graben un audio de 30-45 segundos explicando el proceso completo del tratamiento de keratina.",
    clase3: "Tarea 2: Graben un audio dando las instrucciones de cuidado posterior al tratamiento de keratina.",
    clase5: "Tarea 3: Graben un audio practicando las expresiones y preguntas de alergias aprendidas.",
    clase6: "Evaluación Final: Juego de Rol (Role-Play) completo con un compañero aplicando todo lo aprendido."
  };

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
            { en: "How are you?", es: "How are you?" },
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
            { en: "The treatment takes about two hours.", es: "El tratamiento toma alrededor de dos horas." }
          ],
          gameUrl: "https://interacty.me/projects/e502cc8626a13026",
          task: "Grabar un audio de 30-45 segundos explicando el proceso completo del tratamiento de keratina.",
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
          objective: "Objetivo: Al finalizar la clase, podrás informar el precio, la duración del tratamiento y las formas de pago en una conversación sencilla.",
          content: [
            { en: "The price is $40.", es: "El precio es $40." },
            { en: "The treatment takes around two hours.", es: "El tratamiento dura aproximadamente dos horas." },
            { en: "We will finish in 30 minutes.", es: "Terminaremos en 30 minutes." },
            { en: "You can pay by cash.", es: "Puede pagar en efectivo." },
            { en: "You can pay by card.", es: "Puede pagar con tarjeta." }
          ],
          gameUrl: "https://create.kahoot.it/share/class-5/16e72ba0-e8fc-4910-9400-b7a3c94c3586",
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
          gameUrl: "https://wordwall.net/es/resource/115823970",
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
          gameUrl: "https://interacty.me/projects/e502cc8626a13026",
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
      <div className="min-h-screen bg-gradient-to-tr from-pink-200 via-purple-100 to-fuchsia-200 flex flex-col items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full space-y-4 border-2 border-pink-500">
          <div className="text-center">
            <span className="text-5xl">💇‍♀️✨</span>
            <h2 className="text-2xl font-black text-purple-950 mt-2">Beauty English Salón</h2>
            <p className="text-xs text-fuchsia-700 font-bold">¡Pon tu nombre y tu código mágico!</p>
          </div>
          <div className="space-y-2">
            <input type="text" placeholder="Tu nombre (ej. isabel)" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-3 border border-pink-200 rounded-xl text-xs text-slate-900 font-black bg-pink-50/30 outline-none focus:border-fuchsia-500" />
            <input type="password" placeholder="Tu Clave Mágica" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border border-pink-200 rounded-xl text-xs text-slate-900 font-black bg-pink-50/30 outline-none focus:border-fuchsia-500" />
          </div>
          {error && <p className="text-red-700 text-xs font-black text-center bg-red-50 p-2 rounded-xl border border-red-200">❌ {error}</p>}
          <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-fuchsia-600 hover:opacity-90 active:scale-95 text-white font-black p-3.5 rounded-xl text-xs shadow-md transition-all">¡Entrar al Salón! 🚀</button>
        </form>
      </div>
    );
  }

  const esProfesora = currentUser.role === "Profesora";
  const targetStudent = esProfesora ? selectedStudent : currentUser.username;
  const progresoActual = calcularProgreso(targetStudent);

  const getSidebarBtnClass = (tabId) => {
    const isActive = activeTab === tabId;
    if (isActive) {
      return 'w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white shadow-md';
    }
    return `w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
      darkMode 
        ? 'text-pink-100 hover:bg-slate-800 hover:text-pink-300' 
        : 'text-purple-950 hover:bg-pink-100 hover:text-fuchsia-700'
    }`;
  };

  return (
    <div className={`min-h-screen font-sans flex flex-col transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-white' : 'bg-[#FFF2F5] text-slate-900'}`}>
      
      {/* --- HEADER --- */}
      <header className={`border-b sticky top-0 z-40 shadow-sm transition-colors ${darkMode ? 'bg-slate-900 border-purple-950 text-white' : 'bg-white border-pink-100 text-slate-900'}`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-tr from-pink-500 to-fuchsia-600 p-2 rounded-xl text-white shadow-md"><GraduationCap size={24} /></div>
            <div>
              <span className={`font-black text-base block leading-tight ${darkMode ? 'text-pink-300' : 'text-purple-950'}`}>Beauty English</span>
              <span className="text-[11px] text-fuchsia-600 dark:text-pink-400 font-black tracking-wide block">Course System 💇‍♀️✨</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-xl transition-all ${darkMode ? 'bg-slate-800 text-amber-400' : 'bg-pink-50 text-fuchsia-600 border border-pink-200 hover:bg-pink-100'}`}>
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="flex items-center space-x-2">
              <div className="text-right hidden sm:block">
                <p className={`text-xs font-black ${darkMode ? 'text-pink-300' : 'text-purple-950'}`}>{currentUser.name}</p>
                <p className="text-[9px] text-fuchsia-500 font-bold uppercase">{currentUser.role}</p>
              </div>
              <button onClick={handleLogout} className="text-[10px] font-black text-purple-950 bg-pink-100/70 hover:bg-pink-200/80 border border-pink-200 px-2.5 py-1.5 rounded-lg transition-all">Salir</button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        
        {/* --- MENÚ LATERAL --- */}
        <aside className={`w-full md:w-56 p-4 flex flex-col gap-1.5 md:min-h-[calc(100vh-4rem)] md:sticky md:top-16 z-30 shadow-sm ${darkMode ? 'bg-slate-900 text-pink-100 border-r border-purple-950' : 'bg-[#FFF9FB] text-purple-950 border-r border-pink-100'}`}>
          <p className={`text-[10px] uppercase font-black tracking-wider mb-2 px-2 hidden md:block ${darkMode ? 'text-pink-300' : 'text-purple-500'}`}>Menú Principal</p>
          
          <button onClick={() => setActiveTab('dashboard')} className={getSidebarBtnClass('dashboard')}><span>🏠</span> Inicio</button>
          <button onClick={() => setActiveTab('unit1')} className={getSidebarBtnClass('unit1')}><span>📦</span> Unit 1</button>
          <button onClick={() => setActiveTab('unit2')} className={getSidebarBtnClass('unit2')}><span>🛍️</span> Unit 2</button>
          <button onClick={() => setActiveTab('unit3')} className={getSidebarBtnClass('unit3')}><span>💬</span> Unit 3</button>
          <button onClick={() => setActiveTab('activities')} className={getSidebarBtnClass('activities')}><span>🎒</span> Mochila de Tareas</button>
          <button onClick={() => setActiveTab('gradesTab')} className={getSidebarBtnClass('gradesTab')}><span>⭐</span> Calificaciones</button>
          <button onClick={() => setActiveTab('vocabulary')} className={getSidebarBtnClass('vocabulary')}><span>🔊</span> Vocabulario</button>
          
          <div className="border-t border-pink-200 dark:border-slate-800 my-2 pt-2">
            <button onClick={() => setActiveTab('games')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'games' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' : 'bg-purple-100/60 text-purple-950 hover:bg-purple-200/80 border border-purple-200 dark:border-none'}`}><span>🕹️</span> Área de Juegos</button>
          </div>
        </aside>

        {/* --- CONTENEDOR CENTRAL --- */}
        <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-6">
          
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-700 rounded-3xl p-6 text-white shadow-xl text-center">
                <h1 className="text-2xl font-black">¡Hola, {currentUser.name}! ✨</h1>
                <p className="font-bold text-xs mt-1.5 bg-white/20 inline-block px-4 py-1.5 rounded-full">
                  Bienvenido al panel interactivo de aprendizaje
                </p>
              </div>

              {!esProfesora && (
                <div className={`border rounded-3xl p-5 shadow-md space-y-3 transition-colors ${darkMode ? 'bg-slate-900 border-purple-900' : 'bg-white border-pink-100'}`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs font-black flex items-center gap-1 ${darkMode ? 'text-slate-300' : 'text-purple-950'}`}>📊 Progreso de tus Tareas</span>
                    <span className="text-xs font-black text-fuchsia-700 bg-pink-50 dark:bg-purple-950 px-2 py-0.5 rounded-md border border-pink-100 dark:border-none">{progresoActual}%</span>
                  </div>
                  <div className="w-full bg-pink-50/50 dark:bg-slate-800 rounded-full h-3.5 overflow-hidden p-0.5 border border-pink-100 dark:border-slate-700">
                    <div 
                      className="bg-gradient-to-r from-pink-500 to-fuchsia-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progresoActual}%` }}
                    />
                  </div>
                </div>
              )}

              <div className={`border rounded-3xl p-6 shadow-md text-center space-y-4 transition-colors ${darkMode ? 'bg-slate-900 border-purple-900' : 'bg-white border-pink-100'}`}>
                <div className="flex flex-col items-center justify-center">
                  <Video className="text-fuchsia-600 mb-2" size={32} />
                  <h3 className={`text-sm font-black ${darkMode ? 'text-pink-300' : 'text-purple-950'}`}>📺 Welcoming video</h3>
                </div>
                {!videoUrl ? (
                  <label className="mx-auto max-w-xs flex flex-col items-center justify-center border-2 border-dashed p-4 rounded-xl cursor-pointer bg-pink-50/20 dark:bg-slate-800 border-pink-300 dark:border-slate-700 hover:bg-pink-50 transition-all">
                    <Upload size={24} className="text-fuchsia-500 mb-1" />
                    <span className="text-xs font-black text-purple-950 dark:text-slate-400">Seleccionar mi video</span>
                    <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                  </label>
                ) : (
                  <div className="space-y-2">
                    <video src={videoUrl} controls className="w-full max-w-md mx-auto rounded-xl border border-pink-100 dark:border-slate-800 bg-black" />
                    <button onClick={() => { setVideoUrl(null); localStorage.removeItem('beauty_salon_video_url'); }} className="text-[10px] font-black text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded-lg">❌ Quitar video</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {['unit1', 'unit2', 'unit3'].includes(activeTab) && (
            <div className="space-y-4">
              {esProfesora && (
                <div className="p-4 bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white rounded-2xl flex flex-col gap-2 shadow-md mb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black">Revisando las unidades del alumno:</span>
                    <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} className="text-xs font-bold p-1.5 rounded border text-slate-900 bg-white outline-none">
                      {estudiantesLista.map(est => <option key={est.id} value={est.id}>{est.name}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {modules.filter((_, idx) => (activeTab === 'unit1' && idx === 0) || (activeTab === 'unit2' && idx === 1) || (activeTab === 'unit3' && idx === 2)).map(mod => (
                <div key={mod.id} className="space-y-4">
                  <div className="bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-700 text-white p-4 rounded-2xl shadow-md">
                    <h2 className="text-xs font-black uppercase tracking-wider">{mod.title}</h2>
                  </div>

                  {mod.lessons.map((les, index) => {
                    const taskData = allStudentsTasks[targetStudent]?.[les.taskKey];
                    const recordCalificacion = grades[targetStudent]?.[les.taskKey];
                    return (
                      <div key={index} className={`border rounded-2xl p-5 shadow-lg space-y-4 transition-colors ${darkMode ? 'bg-slate-900 border-purple-900' : 'bg-white border-pink-100'}`}>
                        <h3 className={`text-base font-black ${darkMode ? 'text-white' : 'text-purple-950'}`}>{les.title}</h3>
                        
                        <p className={`text-xs font-bold p-3 rounded-lg italic border leading-relaxed ${darkMode ? 'bg-slate-800 text-slate-100 border-slate-700' : 'bg-purple-50 text-purple-950 border-purple-100'}`}>{les.objective}</p>

                        <div className="grid grid-cols-1 gap-2.5">
                          {les.content.map((item, i) => (
                            /* 🎨 RECUADROS MEJORADOS AQUÍ: Implementado fondo Rosa/Lavanda Pastel con interactividad Hover */
                            <div key={i} className={`p-3.5 rounded-xl flex justify-between items-center border shadow-sm transition-all duration-200 transform hover:scale-[1.01] ${darkMode ? 'border-purple-900 bg-slate-900 hover:border-pink-500 text-white' : 'border-pink-200 bg-[#FFF0F5] hover:bg-[#FFE4E1] hover:border-pink-400 text-slate-800'}`}>
                              <div className="flex items-center space-x-2">
                                <button onClick={() => escucharPalabra(item.en)} className="p-1.5 bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white rounded-lg hover:opacity-90 shadow-sm"><Volume2 size={14} /></button>
                                <span className={`text-xs font-black tracking-wide ${darkMode ? 'text-white' : 'text-slate-900'}`}>{item.en}</span>
                              </div>
                              <span className={`text-[12px] font-black px-3 py-1 rounded-md border ${darkMode ? 'text-pink-300 bg-purple-950 border-purple-900' : 'text-purple-950 bg-white border-pink-200 shadow-xs'}`}>🗣 {item.es}</span>
                            </div>
                          ))}
                        </div>

                        <div className={`p-4 rounded-xl border text-xs transition-all ${darkMode ? 'bg-slate-900 border-purple-950 text-amber-200' : 'bg-[#FFFDF5] border-amber-200 text-slate-800'}`}>
                          <p className={`font-black uppercase tracking-wide text-xs ${darkMode ? 'text-pink-400' : 'text-fuchsia-800'}`}>🎯 Actividad Obligatoria:</p>
                          <p className="my-2 font-bold text-xs leading-relaxed">{les.task}</p>
                          
                          {les.gameUrl && (
                            <div className="mt-2">
                              <a href={les.gameUrl} target="_blank" rel="noreferrer" className="inline-block text-[10px] font-black bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1.5 rounded-xl hover:opacity-95 transition-all shadow-sm">🕹️ Abrir Juego</a>
                            </div>
                          )}

                          {les.taskKey && (
                            <div className={`mt-3 pt-3 border-t space-y-2 ${darkMode ? 'border-purple-950' : 'border-pink-100'}`}>
                              <div className={`p-2 rounded-lg text-[10px] font-bold border ${darkMode ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-pink-50/50 text-purple-950 border-pink-100'}`}>
                                👀 Viendo la mochila de: <b className="font-black text-fuchsia-950 dark:text-white">{targetStudent.toUpperCase()}</b>
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-2">
                                {!esProfesora && (
                                  <label className="bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white text-[10px] font-black px-2.5 py-1.5 rounded-lg cursor-pointer inline-flex items-center gap-1 shadow-sm">
                                    <Upload size={12} /> {taskData ? "Cambiar mi PDF" : "Subir Tarea PDF"}
                                    <input type="file" accept=".pdf" onChange={(e) => handlePdfUpload(e, les.taskKey, currentUser.username)} className="hidden" />
                                  </label>
                                )}
                                {taskData && (
                                  <a href={taskData.url} download={taskData.name} target="_blank" rel="noreferrer" className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black px-2.5 py-1.5 rounded-lg inline-flex items-center gap-1 shadow-sm">
                                    <Eye size={12} /> Descargar / Ver PDF Real 👁️
                                  </a>
                                )}
                              </div>
                              <p className={`text-xs font-black mt-1 ${darkMode ? 'text-pink-400' : 'text-purple-900'}`}>⭐ Calificación: {recordCalificacion?.nota || '-'} / 10</p>
                              {recordCalificacion?.comentario && (
                                <p className={`text-[11px] font-bold p-2.5 rounded-md mt-1 border ${darkMode ? 'text-purple-200 bg-purple-950 border-purple-900' : 'text-slate-700 bg-pink-50/30 border-pink-100'}`}>💬 <b>Comentario Miss:</b> {recordCalificacion.comentario}</p>
                              )}
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
            <div className={`border rounded-3xl p-6 shadow-lg space-y-4 transition-colors ${darkMode ? 'bg-slate-900 border-purple-900' : 'bg-white border-pink-100'}`}>
              <div className={`flex items-center space-x-2 border-b pb-3 ${darkMode ? 'border-purple-950' : 'border-pink-100'}`}>
                <Activity className="text-fuchsia-600" size={24} />
                <h2 className="text-xl font-black text-purple-950 dark:text-white">CENTRO DE TAREAS GENERAL 🎒👁️</h2>
              </div>
              
              <div className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-purple-50/40 border-purple-100 text-purple-950'}`}>
                {esProfesora ? (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-black">Selecciona un alumno para revisar:</span>
                    <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} className="text-xs font-bold p-1.5 rounded border border-pink-200 bg-white text-slate-900 outline-none">
                      {estudiantesLista.map(est => <option key={est.id} value={est.id}>{est.name}</option>)}
                    </select>
                  </div>
                ) : (
                  <span className="text-xs font-black block">Tu Progreso de Entregas:</span>
                )}
              </div>

              <div className="space-y-4 mt-2">
                {['clase2', 'clase3', 'clase5', 'clase6'].map((key) => {
                  const currentTask = allStudentsTasks[targetStudent]?.[key];

                  return (
                    <div key={key} className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md transition-all ${darkMode ? 'border-purple-950 bg-purple-950/20 text-white' : 'border-pink-100 bg-pink-50/30 text-slate-800'}`}>
                      <div className="text-xs max-w-md space-y-1">
                        <span className={`font-black block leading-relaxed text-xs ${darkMode ? 'text-pink-300' : 'text-purple-950'}`}>{infoTareas[key]}</span>
                        <span className="font-bold block text-[11px] text-slate-500">Mochila de: <b className="text-fuchsia-950 dark:text-slate-300 font-black">{targetStudent.toUpperCase()}</b></span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {!esProfesora && (
                          <label className="bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white text-[10px] font-black px-3 py-1.5 rounded-xl cursor-pointer hover:opacity-95 shadow-sm">
                            📄 {currentTask ? "Cambiar" : "Elegir PDF"}
                            <input type="file" accept=".pdf" onChange={(e) => handlePdfUpload(e, key, currentUser.username)} className="hidden" />
                          </label>
                        )}
                        {currentTask ? (
                          <a href={currentTask.url} download={currentTask.name} target="_blank" rel="noreferrer" className="bg-emerald-600 text-white text-[10px] font-black px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm">
                            <Eye size={12} /> Ver PDF 👁️
                          </a>
                        ) : (
                          <span className={`text-[10px] px-2.5 py-1.5 rounded-lg font-bold border ${darkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-purple-100 text-purple-900 border-purple-200'}`}>Sin entregar todavía 🎒</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'gradesTab' && (
            <div className={`border rounded-3xl p-6 shadow-lg space-y-4 transition-colors ${darkMode ? 'bg-slate-900 border-purple-900' : 'bg-white border-pink-100'}`}>
              <div className={`flex items-center space-x-2 border-b pb-3 ${darkMode ? 'border-purple-950' : 'border-pink-100'}`}>
                <Star className="text-amber-500 fill-amber-500" size={24} />
                <h2 className="text-xl font-black text-purple-950 dark:text-white">SISTEMA DE CALIFICACIONES ⭐</h2>
              </div>
              
              {esProfesora ? (
                <div className="space-y-4">
                  {['clase2', 'clase3', 'clase5', 'clase6'].map(key => {
                    const currentRecord = grades[selectedStudent]?.[key] || { nota: '-', comentario: '' };
                    return (
                      <div key={key} className={`p-4 border rounded-2xl flex flex-col gap-3 text-xs font-bold shadow-md ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-pink-50/40 border-pink-100 text-purple-950'}`}>
                        <span className="font-black block text-xs leading-relaxed">{infoTareas[key]}</span>
                        
                        <div className="flex items-center space-x-2">
                          <label className="text-xs font-black">Asignar Nota:</label>
                          <select 
                            value={currentRecord.nota} 
                            onChange={(e) => asignarNota(selectedStudent, key, e.target.value)}
                            className="bg-white text-slate-900 px-3 py-1.5 rounded-xl text-xs font-black border border-pink-500 outline-none cursor-pointer"
                          >
                            <option value="-">Sin Calificar (-)</option>
                            {[1,2,3,4,5,6,7,8,9,10].map(num => (
                              <option key={num} value={String(num)}>{num} Puntos</option>
                            ))}
                          </select>
                        </div>

                        <div className="flex flex-col gap-1 mt-1">
                          <textarea 
                            value={currentRecord.comentario || ''} 
                            onChange={(e) => asignarComentario(selectedStudent, key, e.target.value)}
                            placeholder="Añade un comentario sobre el desempeño..." 
                            className="w-full p-3 text-xs text-slate-900 font-bold border border-pink-200 rounded-xl bg-white outline-none focus:border-pink-500"
                            rows={2}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-3">
                  {['clase2', 'clase3', 'clase5', 'clase6'].map(key => {
                    const studentRecord = grades[currentUser.username]?.[key] || { nota: '-', comentario: '' };
                    return (
                      <div key={key} className={`p-4 rounded-2xl text-xs font-bold flex flex-col gap-2 border shadow-md ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-[#FFF9FB] border-pink-100 text-slate-800'}`}>
                        <div className="flex justify-between items-start gap-4">
                          <span className={`font-black leading-relaxed ${darkMode ? 'text-pink-300' : 'text-purple-950'}`}>{infoTareas[key]}</span>
                          <span className="bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white font-black px-2.5 py-1 rounded-lg text-xs shrink-0 shadow-sm">Nota: {studentRecord.nota} / 10</span>
                        </div>
                        {studentRecord.comentario && (
                          <div className={`p-2.5 rounded-xl border text-[11px] mt-1 leading-relaxed ${darkMode ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-white border-pink-100 text-purple-950'}`}>
                            📢 <b>Comentario de la Miss:</b> {studentRecord.comentario}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'vocabulary' && (
            <div className={`border rounded-3xl p-6 shadow-lg space-y-4 transition-colors ${darkMode ? 'bg-slate-900 border-purple-900' : 'bg-white border-pink-100'}`}>
              <div className={`flex items-center space-x-2 border-b pb-3 ${darkMode ? 'border-purple-950' : 'border-pink-100'}`}>
                <Volume2 className="text-fuchsia-600" size={24} />
                <h2 className="text-xl font-black text-purple-950 dark:text-white">DICCIONARIO PARLANTE COMPLETO 🔊✨</h2>
              </div>
              
              <div className="space-y-6 pt-2">
                {modules.map(mod => (
                  <div key={mod.id} className={`border-l-4 border-fuchsia-500 pl-3 py-1 rounded-r-xl p-2 ${darkMode ? 'bg-transparent' : 'bg-[#FFF5F7]'}`}>
                    <h3 className={`text-xs font-black uppercase mb-3 tracking-wider ${darkMode ? 'text-pink-400' : 'text-fuchsia-900'}`}>{mod.title}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {mod.lessons.flatMap(l => l.content).map((item, idx) => (
                        <div key={idx} className={`p-3 rounded-xl flex justify-between items-center border shadow-sm transition-all duration-200 transform hover:scale-[1.01] ${darkMode ? 'border-purple-900 bg-slate-900 hover:border-pink-500 text-white' : 'border-pink-200 bg-[#FFF0F5] hover:bg-[#FFE4E1] hover:border-pink-400 text-slate-800'}`}>
                          <div className="flex items-center space-x-2">
                            <button onClick={() => escucharPalabra(item.en)} className="p-1.5 bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white rounded-lg hover:opacity-90 shrink-0"><Volume2 size={12} /></button>
                            <span className={`text-[12px] font-black leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>{item.en}</span>
                          </div>
                          <span className={`text-[11px] font-black px-2.5 py-1 rounded border shrink-0 text-right ${darkMode ? 'text-pink-300 bg-purple-950 border-purple-900' : 'text-purple-950 bg-white border-pink-200'}`}>🗣️ {item.es}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'games' && (
            <div className={`border rounded-3xl p-6 shadow-lg space-y-4 transition-colors ${darkMode ? 'bg-slate-900 border-purple-900' : 'bg-white border-pink-100'}`}>
              <h2 className="text-xl font-black text-center text-fuchsia-600 dark:text-pink-400">🎡 LA FERIA DE JUEGOS DE VOCABULARIO 🕹️</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <div className="border border-pink-100 dark:border-slate-800 p-4 rounded-2xl bg-[#FFF9FB] dark:bg-slate-800 text-center space-y-2 shadow-sm">
                  <span className="text-2xl">🎯</span>
                  <h4 className="text-xs font-black text-purple-950 dark:text-white">Saludos (Clase 1)</h4>
                  <a href="https://wordwall.net/es/resource/115823970" target="_blank" rel="noreferrer" className="w-full block text-[11px] font-black bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white py-1.5 rounded-xl hover:opacity-95">¡Jugar Wordwall!</a>
                </div>
                <div className="border border-pink-100 dark:border-slate-800 p-4 rounded-2xl bg-[#FFF9FB] dark:bg-slate-800 text-center space-y-2 shadow-sm">
                  <span className="text-2xl">🧪</span>
                  <h4 className="text-xs font-black text-purple-950 dark:text-white">Proceso (Clase 2)</h4>
                  <a href="https://interacty.me/projects/e502cc8626a13026" target="_blank" rel="noreferrer" className="w-full block text-[11px] font-black bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white py-1.5 rounded-xl hover:opacity-95">¡Jugar Interacty!</a>
                </div>
                <div className="border border-pink-100 dark:border-slate-800 p-4 rounded-2xl bg-[#FFF9FB] dark:bg-slate-800 text-center space-y-2 shadow-sm">
                  <span className="text-2xl">🧴</span>
                  <h4 className="text-xs font-black text-purple-950 dark:text-white">Cuidado (Clase 3)</h4>
                  <a href="https://wordwall.net/resource/116065664" target="_blank" rel="noreferrer" className="w-full block text-[11px] font-black bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white py-1.5 rounded-xl hover:opacity-95">¡Jugar Wordwall!</a>
                </div>
                <div className="border border-pink-100 dark:border-slate-800 p-4 rounded-2xl bg-[#FFF9FB] dark:bg-slate-800 text-center space-y-2 shadow-sm">
                  <span className="text-2xl">💰</span>
                  <h4 className="text-xs font-black text-purple-950 dark:text-white">Precios (Clase 4)</h4>
                  <a href="https://create.kahoot.it/share/class-5/16e72ba0-e8fc-4910-9400-b7a3c94c3586" target="_blank" rel="noreferrer" className="w-full block text-[11px] font-black bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white py-1.5 rounded-xl hover:opacity-95">¡Jugar Kahoot!</a>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
