import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Volume2, 
  Sun, 
  Moon, 
  Star,
  BookOpen,
  FolderHeart,
  Gamepad2,
  Home,
  LogOut,
  Sparkles,
  Smile,
  FileCheck2,
  DownloadCloud
} from 'lucide-react';

const SUPABASE_URL = 'https://fiuphtskrnwdftsrspip.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpdXBodHNrcm53ZGZ0c3JzcGlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4MDQ4MTAsImV4cCI6MjA5OTM4MDgxMH0.EORFoOj4ssM9z5Q7xGQdbzFUMTldXqI9LyQ-Kvcgj5I';

export default function App() {
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
  const [activeTab, setActiveTab] = useState('inicio');

  const [allStudentsTasks, setAllStudentsTasks] = useState({
    jean: { clase2: null, clase3: null, clase5: null, clase6: null },
    ricardo: { clase2: null, clase3: null, clase5: null, clase6: null },
    victoria: { clase2: null, clase3: null, clase5: null, clase6: null },
    yaritza: { clase2: null, clase3: null, clase5: null, clase6: null },
    annelys: { clase2: null, clase3: null, clase5: null, clase6: null },
    melany: { clase2: null, clase3: null, clase5: null, clase6: null },
  });

  const [grades, setGrades] = useState({
    jean: { clase2: { nota: '-', comentario: '' }, clase3: { nota: '-', comentario: '' }, clase5: { nota: '-', comentario: '' }, clase6: { nota: '-', comentario: '' } },
    ricardo: { clase2: { nota: '-', comentario: '' }, clase3: { nota: '-', comentario: '' }, clase5: { nota: '-', comentario: '' }, clase6: { nota: '-', comentario: '' } },
    victoria: { clase2: { nota: '-', comentario: '' }, clase3: { nota: '-', comentario: '' }, clase5: { nota: '-', comentario: '' }, clase6: { nota: '-', comentario: '' } },
    yaritza: { clase2: { nota: '-', comentario: '' }, clase3: { nota: '-', comentario: '' }, clase5: { nota: '-', comentario: '' }, clase6: { nota: '-', comentario: '' } },
    annelys: { clase2: { nota: '-', comentario: '' }, clase3: { nota: '-', comentario: '' }, clase5: { nota: '-', comentario: '' }, clase6: { nota: '-', comentario: '' } },
    melany: { clase2: { nota: '-', comentario: '' }, clase3: { nota: '-', comentario: '' }, clase5: { nota: '-', comentario: '' }, clase6: { nota: '-', comentario: '' } }
  });

  const [selectedStudent, setSelectedStudent] = useState('jean');
  const [loadingCloud, setLoadingCloud] = useState(false);
  const [supabase, setSupabase] = useState(null);

  useEffect(() => {
    const initSupabase = () => {
      if (window.supabase) {
        const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        setSupabase(client);
      }
    };

    if (window.supabase) {
      initSupabase();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      script.async = true;
      script.onload = initSupabase;
      document.body.appendChild(script);
    }
  }, []);

  const descargarDeSupabase = async () => {
    if (!supabase) return;
    setLoadingCloud(true);
    try {
      const { data: tareasDB, error: err1 } = await supabase.from('tareas').select('*');
      if (!err1 && tareasDB) {
        const clonTareas = {
          jean: {}, ricardo: {}, victoria: {}, yaritza: {}, annelys: {}, melany: {}
        };
        tareasDB.forEach(t => {
          if (clonTareas[t.estudiante]) {
            clonTareas[t.estudiante][t.clase] = { name: t.nombre_archivo, url: t.archivo_base64 };
          }
        });
        setAllStudentsTasks(prev => ({ ...prev, ...clonTareas }));
      }

      const { data: notasDB, error: err2 } = await supabase.from('calificaciones').select('*');
      if (!err2 && notasDB) {
        const clonNotas = {
          jean: {}, ricardo: {}, victoria: {}, yaritza: {}, annelys: {}, melany: {}
        };
        ['jean', 'ricardo', 'victoria', 'yaritza', 'annelys', 'melany'].forEach(est => {
          clonNotas[est] = {};
          ['clase2', 'clase3', 'clase5', 'clase6'].forEach(cl => {
            clonNotas[est][cl] = { nota: '-', comentario: '' };
          });
        });
        notasDB.forEach(n => {
          if (clonNotas[n.estudiante]) {
            clonNotas[n.estudiante][n.clase] = { nota: n.nota, comentario: n.comentario };
          }
        });
        setGrades(clonNotas);
      }
    } catch (e) {
      console.log("Error al traer datos de la nube:", e);
    }
    setLoadingCloud(false);
  };

  useEffect(() => {
    if (isLoggedIn && supabase) {
      descargarDeSupabase();
    }
  }, [isLoggedIn, supabase]);

  const escucharPalabra = (textoEnIngles) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(textoEnIngles);
      u.lang = 'en-US';
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  };

  const handlePdfUpload = async (e, claseKey, studentUser) => {
    if (!supabase) return;
    const file = e.target.files[0];
    if (file) {
      if (file.type === "application/pdf") {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const base64String = event.target.result;
          
          setLoadingCloud(true);
          const { error } = await supabase.from('tareas').upsert(
            { estudiante: studentUser, clase: claseKey, nombre_archivo: file.name, archivo_base64: base64String },
            { onConflict: 'estudiante,clase' }
          );
          setLoadingCloud(false);

          if (error) {
            console.error("Error al subir archivo:", error);
          } else {
            descargarDeSupabase();
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const enviarNotaASupabase = async (estudiante, claseKey, notaSeleccionada, comentarioEscrito) => {
    if (!supabase) return;
    const { error } = await supabase.from('calificaciones').upsert(
      { estudiante: estudiante, clase: claseKey, nota: notaSeleccionada, comentario: comentarioEscrito },
      { onConflict: 'estudiante,clase' }
    );
    if (!error) {
      descargarDeSupabase();
    }
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
      lessons: [
        { 
          title: "CLASE 1: Greetings (Saludos para recibir al cliente) 👋", 
          objective: "Objetivo: Al finalizar la clase, podrás saludar y recibir a un cliente en inglés utilizando expresiones básicas.",
          content: [
            { en: "Hello! / Hi!", es: "Hola" },
            { en: "Good morning.", es: "Buenos días" },
            { en: "Good afternoon.", es: "Buenos tardes" },
            { en: "Welcome!", es: "¡Bienvenido(a)!" },
            { en: "How are you?", es: "How are you?" },
            { en: "My name is...", es: "Mi nombre es..." },
            { en: "Nice to meet you.", es: "Mucho gusto." },
            { en: "Please, have a seat.", es: "Por favor, tome asiento." }
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
            { en: "Finally, we use the flat iron.", es: "Finalmente, usamos la plancha." }
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
      lessons: [
        { 
          title: "CLASE 3: Aftercare Instructions (Instrucciones de cuidado) 🧴", 
          objective: "Objetivo: Al finalizar la clase, podrás dar instrucciones sencillas en inglés a un cliente después de un tratamiento de keratina.",
          content: [
            { en: "Please, don't move.", es: "Por favor, no se mueva." },
            { en: "Please, wait a moment.", es: "Espere un momento." },
            { en: "Don't wash your hair for 3 days.", es: "No lave su cabello durante 3 días." },
            { en: "Don't tie your hair.", es: "No se recoja el cabello." }
          ],
          gameUrl: "https://wordwall.net/es/resource/116065664",
          task: "Grabar un audio dando las instrucciones de cuidado después del tratamiento de keratina.",
          taskKey: "clase3"
        },
        { 
          title: "CLASE 4: Price and Time (Hablar sobre Precio y Tiempo) 💰", 
          objective: "Objetivo: Al finalizar la clase, podrás informar el precio, la duración del tratamiento y las formas de pago en una conversación sencilla.",
          content: [
            { en: "The price is $40.", es: "El precio es $40." },
            { en: "The treatment takes around two hours.", es: "El tratamiento dura aproximadamente dos horas." },
            { en: "You can pay by cash.", es: "Puede pagar en efectivo." }
          ],
          gameUrl: "https://create.kahoot.it/share/class-5/16e72ba0-e8fc-4910-9400-b7a3c94c3586",
          task: "ROLE-PLAY: Jugar con un compañero a preguntar precios, tiempos y formas de pago."
        }
      ]
    },
    {
      id: 3,
      title: "UNIDAD 3: CUSTOMER INTERACTION (INTERACTUAR CON EL CLIENTE) 💬",
      lessons: [
        {
          title: "CLASE 5: Conversar con el Cliente (Preguntas previas) 💇‍♂️",
          objective: "Objetivo: Al finalizar la clase, los estudiantes podrán hacer preguntas sencillas a un cliente antes de realizar un tratamiento de keratina y responder de forma cortés.",
          content: [
            { en: "Is this your first keratin treatment?", es: "¿Es este su primer tratamiento de keratina?" },
            { en: "Do you have any allergies?", es: "¿Tiene alguna alergia?" },
            { en: "Is your hair colored?", es: "¿Su cabello está teñido?" }
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
            { en: "Have a nice day.", es: "Que tenga un buen día." },
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
    if (account && (password === "1234" || password === "prome")) {
      localStorage.setItem('beauty_salon_logged', 'true');
      localStorage.setItem('beauty_salon_current_user', JSON.stringify(account));
      setCurrentUser(account);
      setIsLoggedIn(true);
      setError('');
      return;
    }
    setError('Credenciales inválidas.');
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  if (!isLoggedIn || !currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-tr from-pink-200 to-purple-200 flex flex-col items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full space-y-4 border border-pink-300">
          <div className="text-center">
            <span className="text-4xl">💇‍♀️</span>
            <h2 className="text-xl font-black text-slate-950 mt-1">Beauty English Salón</h2>
          </div>
          <div className="space-y-2">
            <input type="text" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-3 border border-slate-300 rounded-xl text-slate-950 font-bold bg-white outline-none" />
            <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border border-slate-300 rounded-xl text-slate-950 font-bold bg-white outline-none" />
          </div>
          {error && <p className="text-red-600 text-xs font-bold text-center">{error}</p>}
          <button type="submit" className="w-full bg-pink-600 text-white font-black p-3 rounded-xl text-xs shadow-md">Ingresar</button>
        </form>
      </div>
    );
  }

  const esProfesora = currentUser.role === "Profesora";
  const targetStudent = esProfesora ? selectedStudent : currentUser.username;

  return (
    <div className={`min-h-screen font-sans flex flex-col ${darkMode ? 'bg-slate-950 text-white' : 'bg-pink-50/40 text-slate-900'}`}>
      
      {}
      <header className={`border-b h-16 flex items-center justify-between px-6 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-pink-100'}`}>
        <div className="flex items-center space-x-2">
          <GraduationCap className="text-pink-600 animate-pulse" size={24} />
          <span className="font-black text-slate-950 dark:text-white text-sm">Beauty English Course System 👩‍🏫✨</span>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
            {darkMode ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} className="text-slate-700" />}
          </button>
          <span className="text-xs font-black text-slate-950 dark:text-pink-300 uppercase bg-pink-100 dark:bg-slate-800 px-3 py-1 rounded-full flex items-center gap-1">
            <Smile size={12} className="text-pink-600" /> {currentUser.name} ({currentUser.role})
          </span>
          <button onClick={handleLogout} className="text-[11px] bg-red-100 hover:bg-red-200 text-red-700 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1">
            <LogOut size={12} /> Salir
          </button>
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        
        {}
        <aside className={`w-full md:w-56 p-4 flex flex-col gap-1 ${darkMode ? 'bg-slate-900' : 'bg-white border-r border-pink-100'}`}>
          <div className="text-[10px] uppercase tracking-wider font-black text-pink-500 mb-2 px-3">Menú Principal</div>
          
          <button 
            onClick={() => setActiveTab('inicio')} 
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 ${activeTab === 'inicio' ? 'bg-pink-600 text-white shadow-md' : 'text-slate-950 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-800'}`}
          >
            <Home size={14} /> Inicio
          </button>

          <button 
            onClick={() => setActiveTab('unit1')} 
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 ${activeTab === 'unit1' ? 'bg-pink-600 text-white shadow-md' : 'text-slate-950 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-800'}`}
          >
            <BookOpen size={14} /> Unit 1
          </button>

          <button 
            onClick={() => setActiveTab('unit2')} 
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 ${activeTab === 'unit2' ? 'bg-pink-600 text-white shadow-md' : 'text-slate-950 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-800'}`}
          >
            <BookOpen size={14} /> Unit 2
          </button>

          <button 
            onClick={() => setActiveTab('unit3')} 
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 ${activeTab === 'unit3' ? 'bg-pink-600 text-white shadow-md' : 'text-slate-950 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-800'}`}
          >
            <BookOpen size={14} /> Unit 3
          </button>

          <button 
            onClick={() => setActiveTab('mochila')} 
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 ${activeTab === 'mochila' ? 'bg-pink-600 text-white shadow-md' : 'text-slate-950 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-800'}`}
          >
            <FolderHeart size={14} /> Mochila de Tareas
          </button>

          <button 
            onClick={() => setActiveTab('calificaciones')} 
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 ${activeTab === 'calificaciones' ? 'bg-pink-600 text-white shadow-md' : 'text-slate-950 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-800'}`}
          >
            <Star size={14} /> Calificaciones
          </button>

          <button 
            onClick={() => setActiveTab('vocabulario')} 
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 ${activeTab === 'vocabulario' ? 'bg-pink-600 text-white shadow-md' : 'text-slate-950 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-800'}`}
          >
            <Volume2 size={14} /> Vocabulario
          </button>

          <button 
            onClick={() => setActiveTab('juegos')} 
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 ${activeTab === 'juegos' ? 'bg-pink-600 text-white shadow-md' : 'text-slate-950 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-800'}`}
          >
            <Gamepad2 size={14} /> Área de Juegos
          </button>

          <div className="border-t border-slate-200 dark:border-slate-800 my-4 pt-4">
            <button onClick={descargarDeSupabase} className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-950 dark:text-white text-[10px] font-black py-2 rounded-lg flex items-center justify-center gap-1 active:scale-95 transition-all">
               🔄 Sincronizar Nube ☁️
            </button>
          </div>
        </aside>

        {}
        <main className="flex-1 p-6 max-w-4xl w-full mx-auto">
          {loadingCloud && (
            <div className="text-center p-2 mb-4 bg-pink-100 text-pink-700 font-black rounded-lg text-xs animate-pulse flex items-center justify-center gap-1">
              ☁️ Conectando con Supabase...
            </div>
          )}
          
          {/* TAB: INICIO */}
          {activeTab === 'inicio' && (
            <div className="space-y-4">
              <div className="bg-pink-600 p-6 rounded-3xl text-white shadow-md relative overflow-hidden">
                <Sparkles className="absolute right-4 top-4 text-pink-300 animate-spin" size={48} />
                <h1 className="text-xl font-black">¡Bienvenido, {currentUser.name}! 💇‍♀️✨</h1>
                <p className="text-xs mt-1 font-bold">¡La maleta está limpia de juguetes pesados y lista para conectarse directamente con Supabase!</p>
              </div>
            </div>
          )}

          {/* TAB: MOCHILA DE TAREAS */}
          {activeTab === 'mochila' && (
            <div className="bg-white dark:bg-slate-900 border border-pink-200 dark:border-slate-800 p-6 rounded-3xl space-y-4">
              <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-2">
                  <FolderHeart className="text-pink-600 animate-bounce" size={20} />
                  <h2 className="text-sm font-black text-slate-950 dark:text-white">MOCHILA DE TAREAS EN LA NUBE</h2>
                </div>
                {esProfesora && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-500">Estudiante:</span>
                    <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} className="text-xs font-bold p-1.5 rounded bg-white text-slate-950 border border-pink-300 outline-none">
                      {estudiantesLista.map(est => <option key={est.id} value={est.id}>{est.name}</option>)}
                    </select>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {['clase2', 'clase3', 'clase5', 'clase6'].map((key) => {
                  const taskData = allStudentsTasks[targetStudent]?.[key];
                  const gradeData = grades[targetStudent]?.[key] || { nota: '-', comentario: '' };

                  return (
                    <div key={key} className="bg-pink-50/50 dark:bg-slate-800/80 p-4 rounded-xl border border-pink-100 dark:border-slate-700 text-xs text-slate-950 dark:text-white space-y-3">
                      <p className="font-black text-pink-700 dark:text-pink-400">🎯 {infoTareas[key]}</p>
                      <p className="text-[11px] text-slate-500 font-bold">Mochila de: <span className="uppercase text-pink-600">{targetStudent}</span></p>
                      
                      <div className="flex flex-wrap gap-2 items-center">
                        {!esProfesora && (
                          <label className="bg-pink-600 hover:bg-pink-700 text-white px-3 py-1.5 rounded-lg font-black cursor-pointer shadow-sm active:scale-95 transition-all flex items-center gap-1 text-[11px]">
                            Subir PDF de Tarea ☁️
                            <input type="file" accept=".pdf" onChange={(e) => handlePdfUpload(e, key, currentUser.username)} className="hidden" />
                          </label>
                        )}
                        {taskData ? (
                          <a href={taskData.url} download={taskData.name} className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-black shadow-sm transition-all flex items-center gap-1 text-[11px]">
                            <DownloadCloud size={12} /> Descargar PDF enviado 👁️
                          </a>
                        ) : (
                          <span className="text-slate-400 font-bold italic text-[11px]">Aún no has subido tu PDF</span>
                        )}
                      </div>

                      <div className="border-t pt-2 border-pink-200 dark:border-slate-700 flex justify-between items-center flex-wrap gap-2">
                        <span className="font-black text-pink-700 dark:text-pink-300">⭐ Nota: {gradeData.nota} / 10</span>
                        {gradeData.comentario && (
                          <p className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border text-slate-950 dark:text-slate-200 font-bold italic w-full">
                            💬 Comentario de Miss: {gradeData.comentario}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {}
          {activeTab === 'calificaciones' && (
            <div className="bg-white dark:bg-slate-900 border border-pink-200 dark:border-slate-800 p-6 rounded-3xl space-y-4">
              <div className="flex items-center space-x-2 border-b pb-2 border-slate-200 dark:border-slate-700">
                <Star className="text-amber-500 fill-amber-500" size={20} />
                <h2 className="text-sm font-black text-slate-950 dark:text-white">CALIFICACIONES DE LA NUBE</h2>
              </div>

              {esProfesora ? (
                <div className="space-y-4">
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-between">
                    <span className="text-xs font-black text-slate-950 dark:text-white">Estudiante:</span>
                    <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} className="text-xs font-bold p-1.5 rounded bg-white text-slate-950 border">
                      {estudiantesLista.map(est => <option key={est.id} value={est.id}>{est.name}</option>)}
                    </select>
                  </div>

                  {['clase2', 'clase3', 'clase5', 'clase6'].map(key => {
                    const currentRecord = grades[selectedStudent]?.[key] || { nota: '-', comentario: '' };
                    return (
                      <div key={key} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                        <span className="text-xs font-black block text-slate-950 dark:text-white">{infoTareas[key]}</span>
                        <div className="flex items-center space-x-3 text-xs font-black text-slate-950 dark:text-white">
                          <label>Calificación:</label>
                          <select 
                            value={currentRecord.nota} 
                            onChange={(e) => {
                              const v = e.target.value;
                              setGrades(prev => {
                                const actualizado = { ...prev, [selectedStudent]: { ...prev[selectedStudent], [key]: { ...currentRecord, nota: v } } };
                                enviarNotaASupabase(selectedStudent, key, v, currentRecord.comentario);
                                return actualizado;
                              });
                            }}
                            className="p-1.5 rounded bg-white text-slate-950 border border-pink-500 font-black outline-none"
                          >
                            <option value="-">Sin Evaluar</option>
                            {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={String(n)}>{n} Puntos</option>)}
                          </select>
                        </div>
                        <textarea 
                          value={currentRecord.comentario || ''} 
                          onChange={(e) => {
                            const val = e.target.value;
                            setGrades(prev => ({
                              ...prev,
                              [selectedStudent]: {
                                ...prev[selectedStudent],
                                [key]: { ...prev[selectedStudent]?.[key], comentario: val }
                              }
                            }));
                          }}
                          onBlur={(e) => enviarNotaASupabase(selectedStudent, key, currentRecord.nota, e.target.value)}
                          placeholder="Escribe un comentario..." 
                          className="w-full p-2.5 text-xs text-slate-950 font-bold border rounded-lg bg-white outline-none"
                          rows={2}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-3">
                  {['clase2', 'clase3', 'clase5', 'clase6'].map(key => {
                    const record = grades[currentUser.username]?.[key] || { nota: '-', comentario: '' };
                    return (
                      <div key={key} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border text-xs text-slate-950 dark:text-white space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="font-black max-w-md">{infoTareas[key]}</span>
                          <span className="bg-pink-600 text-white px-2.5 py-1 rounded-md font-black">Nota: {record.nota} / 10</span>
                        </div>
                        {record.comentario && (
                          <p className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-pink-100 font-bold italic text-slate-950 dark:text-slate-200">
                            📢 Miss comentó: {record.comentario}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB: VOCABULARIO */}
          {activeTab === 'vocabulario' && (
            <div className="bg-white dark:bg-slate-900 border border-pink-200 dark:border-slate-800 p-6 rounded-3xl space-y-4">
              <div className="flex items-center space-x-2 border-b pb-4 border-slate-200 dark:border-slate-700">
                <Volume2 className="text-pink-600" size={20} />
                <h2 className="text-sm font-black text-slate-950 dark:text-white">DICCIONARIO INTERACTIVO 👋✨</h2>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { en: "Hello! Welcome to our salon.", es: "¡Hola! Bienvenido a nuestro salón." },
                  { en: "Today, we will do a keratin treatment.", es: "Hoy, haremos un tratamiento de keratina." },
                  { en: "First, we wash your hair.", es: "Primero, lavamos tu cabello." },
                  { en: "Then, we apply the keratin.", es: "Luego, aplicamos la keratina." },
                  { en: "Finally, we use the flat iron.", es: "Finalmente, usamos la plancha." }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => escucharPalabra(item.en)} className="p-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-all">
                        <Volume2 size={14} />
                      </button>
                      <span className="text-xs font-black text-slate-950 dark:text-white">{item.en}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-500">🗣️ {item.es}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: JUEGOS */}
          {activeTab === 'juegos' && (
            <div className="bg-white dark:bg-slate-900 border border-pink-200 dark:border-slate-800 p-6 rounded-3xl space-y-4">
              <div className="flex items-center space-x-2 border-b pb-4 border-slate-200 dark:border-slate-700">
                <Gamepad2 className="text-purple-600" size={20} />
                <h2 className="text-sm font-black text-slate-950 dark:text-white">ÁREA DE JUEGOS 🎮✨</h2>
              </div>
              <div className="space-y-3">
                <a href="https://wordwall.net/es/resource/115823970" target="_blank" rel="noopener noreferrer" className="block p-4 bg-purple-50 hover:bg-purple-100 dark:bg-slate-800 rounded-2xl border border-purple-200 dark:border-slate-700 transition-all">
                  <span className="text-xs font-black block text-purple-700">🎮 Wordwall: Greetings & Saludos 👋</span>
                </a>
                <a href="https://interacty.me/projects/e502cc8626a13026" target="_blank" rel="noopener noreferrer" className="block p-4 bg-pink-50 hover:bg-pink-100 dark:bg-slate-800 rounded-2xl border border-pink-200 dark:border-slate-700 transition-all">
                  <span className="text-xs font-black block text-pink-700">🎮 Interacty: Keratin Challenge 🧪</span>
                </a>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}