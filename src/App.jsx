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
      duration: "Clase 5 y Clase 6 • Profesoras del Curso",
      lessons: [
        {
          title: "CLASE 5: Conversar con el Cliente (Preguntas previas) 💇‍♂️",
          objective: "Objetivo: Al finalizar la clase, los estudiantes podrán hacer preguntas sencillas a un cliente antes de realizar un tratamiento de keratina y responder de forma cortés.",
          content: [
            { en: "Is this your first keratin treatment?", es: "---" },
            { en: "Do you have any allergies?", es: "---" },
            { en: "Is your hair colored?", es: "---" },
            { en: "No problem.", es: "---" },
            { en: "Of course.", es: "---" }
          ],
          gameUrl: "https://wordwall.net/es/resource/115823970",
          task: "Grabar un audio practicando las expresiones y preguntas que aprendieron en esta clase.",
          taskKey: "clase5"
        },
        {
          title: "CLASE 6: Despedir al Cliente de manera amable 👋💖",
          objective: "Objetivo: Al finalizar la clase, los estudiantes podrán despedir a un cliente de manera cortés y participar en una conversación completa de atención al cliente.",
          content: [
            { en: "Thank you for coming.", es: "---" },
            { en: "Thank you for your visit.", es: "---" },
            { en: "Have a nice day.", es: "---" },
            { en: "See you next time.", es: "---" },
            { en: "Take care.", es: "---" },
            { en: "Goodbye!", es: "---" },
            { en: "We hope to see you again.", es: "---" }
          ],
          gameUrl: "https://interacty.me/projects/e502cc8626a13026",
          task: "EVALUACIÓN FINAL (ROLE-PLAY): Hacer un juego completo con un compañero que incluya todo lo aprendido. ¡Se calificará sobre 10 puntos!",
          taskKey: "clase6"
        }
      ]
    }
  ];

  // Inyectar traducciones reales de Clases 5 y 6 para asegurar consistencia
  modules[2].lessons[0].content[0].es = "¿Es este su primer tratamiento de keratina?";
  modules[2].lessons[0].content[1].es = "¿Tiene alguna alergia?";
  modules[2].lessons[0].content[2].es = "¿Su cabello está teñido?";
  modules[2].lessons[0].content[3].es = "No hay problema.";
  modules[2].lessons[0].content[4].es = "Por supuesto.";

  modules[2].lessons[1].content[0].es = "Gracias por venir.";
  modules[2].lessons[1].content[1].es = "Gracias por su visita.";
  modules[2].lessons[1].content[2].es = "Que tenga un buen día.";
  modules[2].lessons[1].content[3].es = "Hasta la próxima.";
  modules[2].lessons[1].content[4].es = "Cuídese.";
  modules[2].lessons[1].content[5].es = "¡Adiós!";
  modules[2].lessons[1].content[6].es = "Esperamos verla nuevamente.";

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
      <div className="min-h-screen bg-slate-300 flex flex-col items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full space-y-4 border-4 border-indigo-600">
          <div className="text-center">
            <span className="text-5xl">💇‍♀️✨</span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">Beauty English Salón</h2>
            <p className="text-xs text-slate-700 font-bold">¡Pon tu nombre y tu código mágico!</p>
          </div>
          <div className="space-y-2">
            <input type="text" placeholder="Tu nombre (ej. isabel)" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-3 border-2 border-slate-400 rounded-xl text-xs text-slate-900 font-black bg-slate-50 outline-none focus:border-indigo-500" />
            <input type="password" placeholder="Tu Clave Mágica" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border-2 border-slate-400 rounded-xl text-xs text-slate-900 font-black bg-slate-50 outline-none focus:border-indigo-500" />
          </div>
          {error && <p className="text-red-700 text-xs font-black text-center bg-red-50 p-2 rounded-xl border border-red-200">❌ {error}</p>}
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-black p-3.5 rounded-xl text-xs shadow-md transition-all">¡Entrar al Salón! 🚀</button>
        </form>
      </div>
    );
  }

  const esProfesora = currentUser.role === "Profesora";
  const targetStudent = esProfesora ? selectedStudent : currentUser.username;
  const progresoActual = calcularProgreso(targetStudent);

  return (
    <div className={`min-h-screen font-sans flex flex-col transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-900'}`}>
      
      <header className={`border-b sticky top-0 z-40 shadow-sm transition-colors ${darkMode ? 'bg-slate-900 border-purple-950 text-white' : 'bg-white border-slate-300 text-slate-900'}`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-2 rounded-xl text-white"><GraduationCap size={24} /></div>
            <div>
              <span className={`font-black text-base block leading-tight ${darkMode ? 'text-purple-300' : 'text-slate-900'}`}>Beauty English</span>
              <span className="text-[11px] text-indigo-700 dark:text-purple-400 font-black tracking-wide block">Course System 💬✨</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-xl transition-all ${darkMode ? 'bg-slate-800 text-amber-400' : 'bg-slate-200 text-slate-900 border border-slate-300'}`}>
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="flex items-center space-x-2">
              <div className="text-right hidden sm:block">
                <p className={`text-xs font-black ${darkMode ? 'text-cyan-300' : 'text-slate-900'}`}>{currentUser.name}</p>
                <p className="text-[9px] text-slate-700 dark:text-slate-500 font-bold uppercase">{currentUser.role}</p>
              </div>
              <button onClick={handleLogout} className="text-[10px] font-black text-slate-900 bg-slate-200 hover:bg-slate-300 border border-slate-300 px-2.5 py-1.5 rounded-lg transition-all">Salir</button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        
        <aside className={`w-full md:w-56 p-4 flex flex-col gap-1.5 md:min-h-[calc(100vh-4rem)] md:sticky md:top-16 z-30 shadow-sm ${darkMode ? 'bg-slate-900 text-cyan-100' : 'bg-white text-slate-900 border-r border-slate-300'}`}>
          <p className={`text-[10px] uppercase font-black tracking-wider mb-2 px-2 hidden md:block ${darkMode ? 'text-purple-300' : 'text-slate-500'}`}>Menú Principal</p>
          <button onClick={() => setActiveTab('dashboard')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 text-slate-900 dark:hover:bg-slate-800 dark:text-slate-200'}`}><span>🏠</span> Inicio</button>
          <button onClick={() => setActiveTab('unit1')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'unit1' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 text-slate-900 dark:hover:bg-slate-800 dark:text-slate-200'}`}><span>📦</span> Unit 1</button>
          <button onClick={() => setActiveTab('unit2')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'unit2' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 text-slate-900 dark:hover:bg-slate-800 dark:text-slate-200'}`}><span>🛍️</span> Unit 2</button>
          <button onClick={() => setActiveTab('unit3')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'unit3' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 text-slate-900 dark:hover:bg-slate-800 dark:text-slate-200'}`}><span>💬</span> Unit 3</button>
          <button onClick={() => setActiveTab('activities')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'activities' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 text-slate-900 dark:hover:bg-slate-800 dark:text-slate-200'}`}><span>🎒</span> Mochila de Tareas</button>
          <button onClick={() => setActiveTab('gradesTab')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'gradesTab' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 text-slate-900 dark:hover:bg-slate-800 dark:text-slate-200'}`}><span>⭐</span> Calificaciones</button>
          <button onClick={() => setActiveTab('vocabulary')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'vocabulary' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 text-slate-900 dark:hover:bg-slate-800 dark:text-slate-200'}`}><span>🔊</span> Vocabulario</button>
          
          <div className="border-t border-slate-300 dark:border-slate-800 my-2 pt-2">
            <button onClick={() => setActiveTab('games')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'games' ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-950 hover:bg-emerald-200 border border-emerald-300 dark:border-none dark:bg-emerald-950/40 dark:text-emerald-400'}`}><span>🕹️</span> Área de Juegos</button>
          </div>
        </aside>

        <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6">
          
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 text-white shadow-md text-center">
                <h1 className="text-2xl font-black">¡Hola, {currentUser.name}! ✨</h1>
                <p className="font-bold text-xs mt-1.5 bg-white/20 inline-block px-4 py-1.5 rounded-full">
                  Bienvenido al panel interactivo de aprendizaje
                </p>
              </div>

              {!esProfesora && (
                <div className={`border rounded-3xl p-5 shadow-sm space-y-3 transition-colors ${darkMode ? 'bg-slate-900 border-purple-900' : 'bg-white border-slate-300'}`}>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black flex items-center gap-1 text-slate-900 dark:text-slate-300">📊 Progreso de tus Tareas</span>
                    <span className="text-xs font-black text-indigo-700 bg-indigo-50 dark:bg-purple-950 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-none">{progresoActual}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-300 dark:border-slate-700">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progresoActual}%` }}
                    />
                  </div>
                </div>
              )}

              <div className={`border rounded-3xl p-6 shadow-sm text-center space-y-4 transition-colors ${darkMode ? 'bg-slate-900 border-purple-900' : 'bg-white border-slate-300'}`}>
                <div className="flex flex-col items-center justify-center">
                  <Video className="text-indigo-600 mb-2" size={32} />
                  <h3 className={`text-sm font-black ${darkMode ? 'text-purple-300' : 'text-slate-900'}`}>📺 Welcoming video</h3>
                </div>
                {!videoUrl ? (
                  <label className="mx-auto max-w-xs flex flex-col items-center justify-center border-2 border-dashed p-4 rounded-xl cursor-pointer bg-slate-50 dark:bg-slate-800 border-slate-400 dark:border-slate-700">
                    <Upload size={24} className="text-slate-500 mb-1" />
                    <span className="text-xs font-black text-slate-900 dark:text-slate-400">Seleccionar mi video</span>
                    <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                  </label>
                ) : (
                  <div className="space-y-2">
                    <video src={videoUrl} controls className="w-full max-w-md mx-auto rounded-xl border border-slate-300 dark:border-slate-800 bg-black" />
                    <button onClick={() => { setVideoUrl(null); localStorage.removeItem('beauty_salon_video_url'); }} className="text-[10px] font-black text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded-lg">❌ Quitar video</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {['unit1', 'unit2', 'unit3'].includes(activeTab) && (
            <div className="space-y-4">
              {esProfesora && (
                <div className="p-4 bg-indigo-600 text-white rounded-2xl flex flex-col gap-2 shadow-md mb-2">
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
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-2xl shadow-sm">
                    <h2 className="text-xs font-black uppercase tracking-wider">{mod.title}</h2>
                  </div>

                  {mod.lessons.map((les, index) => {
                    const taskData = allStudentsTasks[targetStudent]?.[les.taskKey];
                    const recordCalificacion = grades[targetStudent]?.[les.taskKey];
                    return (
                      <div key={index} className={`border rounded-2xl p-5 shadow-sm space-y-4 transition-colors ${darkMode ? 'bg-slate-900 border-purple-900' : 'bg-white border-slate-300'}`}>
                        <h3 className="text-base font-black text-slate-900 dark:text-white">{les.title}</h3>
                        
                        {/* --- OBJETIVO REFORZADO EN MODO CLARO --- */}
                        <p className="text-xs font-black p-3 bg-slate-50 dark:bg-slate-800 text-indigo-950 dark:text-slate-100 rounded-lg italic border border-slate-300 dark:border-slate-700 leading-relaxed">{les.objective}</p>

                        <div className="grid grid-cols-1 gap-1.5">
                          {les.content.map((item, i) => (
                            <div key={i} className={`p-2.5 rounded-xl flex justify-between items-center border shadow-sm transition-colors ${darkMode ? 'border-purple-950 bg-purple-950/40' : 'border-slate-400 bg-white'}`}>
                              <div className="flex items-center space-x-2">
                                <button onClick={() => escucharPalabra(item.en)} className="p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"><Volume2 size={14} /></button>
                                <span className="text-xs font-black text-slate-900 dark:text-white">{item.en}</span>
                              </div>
                              {/* --- CUADRO DE TRADUCCIÓN SÓLIDO Y OSCURO --- */}
                              <span className="text-[12px] font-black text-slate-900 dark:text-purple-300 bg-slate-100 dark:bg-purple-950 px-2 py-0.5 rounded border border-slate-300 dark:border-purple-900">🗣 {item.es}</span>
                            </div>
                          ))}
                        </div>

                        {/* --- CONTENEDOR DE ACTIVIDADES TOTALMENTE LEIBLE --- */}
                        <div className={`p-4 rounded-xl border text-xs font-bold transition-colors ${darkMode ? 'bg-purple-950/40 border-purple-950 text-amber-200' : 'bg-slate-50 border-slate-350 text-slate-900'}`}>
                          <p className="font-black text-indigo-700 dark:text-purple-400 uppercase tracking-wide">🎯 Actividad Obligatoria:</p>
                          <p className="my-1.5 text-slate-900 dark:text-purple-100 font-black leading-relaxed">{les.task}</p>
                          
                          {les.gameUrl && (
                            <div className="mt-2">
                              <a href={les.gameUrl} target="_blank" rel="noreferrer" className="inline-block text-[10px] font-black bg-indigo-600 text-white px-3 py-1.5 rounded-xl hover:bg-indigo-700 transition-all">🕹️ Abrir Juego</a>
                            </div>
                          )}

                          {les.taskKey && (
                            <div className="mt-3 pt-3 border-t border-slate-300 dark:border-purple-900 space-y-2">
                              <div className="p-1.5 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-200 rounded-lg text-[10px] font-black border border-slate-300 dark:border-none">
                                👀 Viendo la mochila de: <b className="text-indigo-950 dark:text-white">{targetStudent.toUpperCase()}</b>
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-2">
                                {!esProfesora && (
                                  <label className="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-black px-2.5 py-1.5 rounded-lg cursor-pointer inline-flex items-center gap-1">
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
                              <p className="text-[11px] font-black text-indigo-700 dark:text-purple-400 mt-1">⭐ Calificación: {recordCalificacion?.nota || '-'} / 10</p>
                              {recordCalificacion?.comentario && (
                                <p className="text-[10px] text-slate-900 dark:text-purple-200 bg-white dark:bg-purple-950 p-2 rounded-md mt-1 border border-slate-300 dark:border-purple-900 leading-relaxed">💬 <b>Comentario Miss:</b> {recordCalificacion.comentario}</p>
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
            <div className={`border rounded-3xl p-6 shadow-sm space-y-4 transition-colors ${darkMode ? 'bg-slate-900 border-purple-900' : 'bg-white border-slate-300'}`}>
              <div className="flex items-center space-x-2 border-b border-slate-300 dark:border-purple-900 pb-3">
                <Activity className="text-indigo-600" size={24} />
                <h2 className="text-xl font-black text-slate-900 dark:text-white">CENTRO DE TAREAS GENERAL 🎒👁️</h2>
              </div>
              
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 space-y-3">
                {esProfesora ? (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-black text-slate-900 dark:text-slate-300">Selecciona un alumno para revisar:</span>
                    <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} className="text-xs font-bold p-1.5 rounded border border-slate-400 bg-white text-slate-900 outline-none">
                      {estudiantesLista.map(est => <option key={est.id} value={est.id}>{est.name}</option>)}
                    </select>
                  </div>
                ) : (
                  <span className="text-xs font-black text-slate-900 dark:text-slate-300 block">Tu Progreso de Entregas:</span>
                )}
              </div>

              <div className="space-y-4 mt-2">
                {['clase2', 'clase3', 'clase5', 'clase6'].map((key) => {
                  const currentTask = allStudentsTasks[targetStudent]?.[key];

                  return (
                    <div key={key} className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm transition-colors ${darkMode ? 'border-purple-950 bg-purple-950/20 text-white' : 'border-slate-400 bg-white text-slate-900'}`}>
                      <div className="text-xs max-w-md">
                        <span className="font-black text-slate-900 dark:text-purple-400 block leading-relaxed">{infoTareas[key]}</span>
                        <span className="text-slate-800 dark:text-slate-400 font-bold block mt-1">Mochila de: <b className="text-indigo-950 dark:text-slate-300 font-black">{targetStudent.toUpperCase()}</b></span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {!esProfesora && (
                          <label className="bg-indigo-600 text-white text-[10px] font-black px-3 py-1.5 rounded-xl cursor-pointer hover:bg-indigo-700">
                            📄 {currentTask ? "Cambiar" : "Elegir PDF"}
                            <input type="file" accept=".pdf" onChange={(e) => handlePdfUpload(e, key, currentUser.username)} className="hidden" />
                          </label>
                        )}
                        {currentTask ? (
                          <a href={currentTask.url} download={currentTask.name} target="_blank" rel="noreferrer" className="bg-emerald-600 text-white text-[10px] font-black px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm">
                            <Eye size={12} /> Ver PDF 👁️
                          </a>
                        ) : (
                          <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 px-2 py-1 rounded-lg font-black border border-slate-300 dark:border-slate-700">Sin entregar todavía 🎒</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'gradesTab' && (
            <div className={`border rounded-3xl p-6 shadow-sm space-y-4 transition-colors ${darkMode ? 'bg-slate-900 border-purple-900' : 'bg-white border-slate-300'}`}>
              <div className="flex items-center space-x-2 border-b border-slate-300 dark:border-purple-900 pb-3">
                <Star className="text-amber-500 fill-amber-500" size={24} />
                <h2 className="text-xl font-black text-slate-900 dark:text-white">SISTEMA DE CALIFICACIONES ⭐</h2>
              </div>
              
              {esProfesora ? (
                <div className="space-y-4">
                  {['clase2', 'clase3', 'clase5', 'clase6'].map(key => {
                    const currentRecord = grades[selectedStudent]?.[key] || { nota: '-', comentario: '' };
                    return (
                      <div key={key} className="p-4 border border-slate-300 dark:border-slate-800 rounded-2xl flex flex-col gap-3 text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-sm">
                        <span className="text-slate-900 dark:text-purple-400 font-black block text-sm leading-relaxed">{infoTareas[key]}</span>
                        
                        <div className="flex items-center space-x-2">
                          <label className="text-xs font-black text-slate-900 dark:text-slate-300">Asignar Nota:</label>
                          <select 
                            value={currentRecord.nota} 
                            onChange={(e) => asignarNota(selectedStudent, key, e.target.value)}
                            className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-1.5 rounded-xl text-xs font-black border-2 border-indigo-600 outline-none shadow-sm cursor-pointer transition-all focus:ring-2 focus:ring-indigo-400"
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
                            className="w-full p-3 text-xs text-slate-900 dark:text-white font-black border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 outline-none focus:border-indigo-500 leading-relaxed"
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
                      <div key={key} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-xs font-bold flex flex-col gap-2 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 shadow-sm">
                        <div className="flex justify-between items-start gap-4">
                          <span className="text-slate-900 dark:text-slate-300 font-black leading-relaxed">{infoTareas[key]}</span>
                          <span className="bg-indigo-600 text-white font-black px-2.5 py-1 rounded-lg text-xs shrink-0 shadow-sm">Nota: {studentRecord.nota} / 10</span>
                        </div>
                        {studentRecord.comentario && (
                          <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-[11px] text-slate-900 dark:text-slate-300 mt-1 leading-relaxed">
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
            <div className={`border rounded-3xl p-6 shadow-sm space-y-4 transition-colors ${darkMode ? 'bg-slate-900 border-purple-900' : 'bg-white border-slate-300'}`}>
              <div className="flex items-center space-x-2 border-b border-slate-300 dark:border-purple-900 pb-3">
                <Volume2 className="text-indigo-600" size={24} />
                <h2 className="text-xl font-black text-slate-900 dark:text-white">DICCIONARIO PARLANTE COMPLETO 🔊✨</h2>
              </div>
              <div className="space-y-4 pt-2">
                {modules.map(mod => (
                  <div key={mod.id} className="border-l-4 border-indigo-500 pl-3 py-1">
                    <h3 className="text-xs font-black text-indigo-700 dark:text-purple-400 uppercase mb-2">{mod.title.split(":")[0]}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {mod.lessons.flatMap(l => l.content).map((item, idx) => (
                        <div key={idx} className={`p-2 rounded-xl flex justify-between items-center border shadow-sm transition-colors ${darkMode ? 'border-purple-950 bg-purple-950/40 text-white' : 'border-slate-400 bg-white text-slate-900'}`}>
                          <div className="flex items-center space-x-2">
                            <button onClick={() => escucharPalabra(item.en)} className="p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"><Volume2 size={12} /></button>
                            <span className="text-[12px] font-black">{item.en}</span>
                          </div>
                          <span className="text-[11px] font-black text-slate-900 dark:text-purple-300 bg-slate-100 dark:bg-purple-950 px-2 py-0.5 rounded border border-slate-300 dark:border-purple-900">🗣️ {item.es}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'games' && (
            <div className={`border rounded-3xl p-6 shadow-sm space-y-4 transition-colors ${darkMode ? 'bg-slate-900 border-purple-900' : 'bg-white border-slate-300'}`}>
              <h2 className="text-xl font-black text-center text-indigo-700 dark:text-purple-400">🎡 LA FERIA DE JUEGOS DE VOCABULARIO 🕹️</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <div className="border border-slate-300 dark:border-slate-800 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-center space-y-2 shadow-sm">
                  <span className="text-2xl">🎯</span>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white">Saludos (Clase 1)</h4>
                  <a href="https://wordwall.net/es/resource/115823970" target="_blank" rel="noreferrer" className="w-full block text-[11px] font-black bg-indigo-600 text-white py-1.5 rounded-xl hover:bg-indigo-700">¡Jugar Wordwall!</a>
                </div>
                <div className="border border-slate-300 dark:border-slate-800 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-center space-y-2 shadow-sm">
                  <span className="text-2xl">🧪</span>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white">Proceso (Clase 2)</h4>
                  <a href="https://interacty.me/projects/e502cc8626a13026" target="_blank" rel="noreferrer" className="w-full block text-[11px] font-black bg-indigo-600 text-white py-1.5 rounded-xl hover:bg-indigo-700">¡Jugar Interacty!</a>
                </div>
                <div className="border border-slate-300 dark:border-slate-800 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-center space-y-2 shadow-sm">
                  <span className="text-2xl">🧴</span>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white">Cuidado (Clase 3)</h4>
                  <a href="https://wordwall.net/resource/116065664" target="_blank" rel="noreferrer" className="w-full block text-[11px] font-black bg-indigo-600 text-white py-1.5 rounded-xl hover:bg-indigo-700">¡Jugar Wordwall!</a>
                </div>
                <div className="border border-slate-300 dark:border-slate-800 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-center space-y-2 shadow-sm">
                  <span className="text-2xl">💰</span>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white">Precios (Clase 4)</h4>
                  <a href="https://create.kahoot.it/share/class-5/16e72ba0-e8fc-4910-9400-b7a3c94c3586" target="_blank" rel="noreferrer" className="w-full block text-[11px] font-black bg-indigo-600 text-white py-1.5 rounded-xl hover:bg-indigo-700">¡Jugar Kahoot!</a>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
