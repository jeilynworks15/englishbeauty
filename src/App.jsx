import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  GraduationCap, 
  Volume2, 
  Sun, 
  Moon, 
  Star
} from 'lucide-react';

// ========================================================
// 🔑 TUS LLAVES REALES DE SUPABASE INTEGRADAS CON ÉXITO
// ========================================================
const SUPABASE_URL = 'https://fiuphtskrnwdftsrspip.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpdXBodHNrcm53ZGZ0c3JzcGlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4MDQ4MTAsImV4cCI6MjA5OTM4MDgxMH0.EORFoOj4ssM9z5Q7xGQdbzFUMTldXqI9LyQ-Kvcgj5I';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
<<<<<<< HEAD

  // --- ☁️ REPOSITORIO NUBE (CONECTADO A SUPABASE) ---
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

=======
  const [videoUrl, setVideoUrl] = useState(() => {
    return localStorage.getItem('beauty_salon_video_url') || null;
  });

  // --- ☁️ REPOSITORIO NUBE (CONECTADO A SUPABASE) ---
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

>>>>>>> e6363d305c8903829c5cccc8d89ee44f4a5d8a84
  const [selectedStudent, setSelectedStudent] = useState('jean');
  const [loadingCloud, setLoadingCloud] = useState(false);

  // --- 📡 SISTEMA DE DESCARGA DESDE LA BASE DE DATOS DE INTERNET ---
  const descargarDeSupabase = async () => {
    setLoadingCloud(true);
    try {
      // 1. Descargar Tareas en Base64
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

      // 2. Descargar Calificaciones y Comentarios
      const { data: notasDB, error: err2 } = await supabase.from('calificaciones').select('*');
      if (!err2 && notasDB) {
        const clonNotas = {
          jean: {}, ricardo: {}, victoria: {}, yaritza: {}, annelys: {}, melany: {}
        };
        // Inicialización base limpia
        ['jean', 'ricardo', 'victoria', 'yaritza', 'annelys', 'melany'].forEach(est => {
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
      console.log("Error de sincronización pasiva:", e);
    }
    setLoadingCloud(false);
  };

  // Sincronizar automáticamente cada vez que entramos a la app o cambiamos de vista
  useEffect(() => {
    if (isLoggedIn) {
      descargarDeSupabase();
    }
  }, [isLoggedIn, activeTab]);

  const escucharPalabra = (textoEnIngles) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(textoEnIngles);
      u.lang = 'en-US';
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  };

<<<<<<< HEAD
=======
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setVideoUrl(event.target.result);
        localStorage.setItem('beauty_salon_video_url', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

>>>>>>> e6363d305c8903829c5cccc8d89ee44f4a5d8a84
  // --- 📤 PROCESADOR DE SUBIDA REAL PARA ESTUDIANTES ---
  const handlePdfUpload = async (e, claseKey, studentUser) => {
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
            alert("No se pudo conectar a internet para enviar tu tarea. Inténtalo de nuevo.");
          } else {
            alert(`¡Éxito total! Tu tarea "${file.name}" ha sido subida a la nube. Tus 4 profesoras ya pueden verla desde sus dispositivos. 📄✨`);
            descargarDeSupabase();
          }
        };
        reader.readAsDataURL(file);
      } else {
        alert("Por favor, sube únicamente archivos en formato PDF. 📄");
      }
    }
  };

  // --- ✍️ PROCESADOR DE NOTAS REAL PARA PROFESORAS ---
  const enviarNotaASupabase = async (estudiante, claseKey, notaSeleccionada, comentarioEscrito) => {
    const { error } = await supabase.from('calificaciones').upsert(
      { estudiante: estudiante, clase: claseKey, nota: notaSeleccionada, comentario: comentarioEscrito },
      { onConflict: 'estudiante,clase' }
    );
    if (error) {
      console.error("Error guardando nota:", error);
    } else {
      descargarDeSupabase(); // Refrescar instantáneo
    }
  };

  const calcularProgreso = (estudianteKey) => {
    const tareasEstudiante = allStudentsTasks[estudianteKey] || {};
    const llavesTareas = ['clase2', 'clase3', 'clase5', 'clase6'];
    let entregadas = 0;
    llavesTareas.forEach(key => {
      if (tareasEstudiante[key] && tareasEstudiante[key].url) entregadas++;
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
          gameUrl: "https://wordwall.resource/116065664",
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
  const progresoActual = calcularProgreso(targetStudent);

  return (
    <div className={`min-h-screen font-sans flex flex-col ${darkMode ? 'bg-slate-950 text-white' : 'bg-pink-50/40 text-slate-900'}`}>
      
      {/* HEADER */}
      <header className={`border-b h-16 flex items-center justify-between px-6 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-pink-100'}`}>
        <div className="flex items-center space-x-2">
          <GraduationCap className="text-pink-600" size={24} />
          <span className="font-black text-slate-950 dark:text-white text-sm">Beauty English Course</span>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
            {darkMode ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} className="text-slate-700" />}
          </button>
          <span className="text-xs font-black text-slate-950 dark:text-pink-300">{currentUser.name} ({currentUser.role})</span>
          <button onClick={handleLogout} className="text-[11px] bg-red-100 text-red-700 font-bold px-3 py-1.5 rounded-lg">Salir</button>
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        
        {/* SIDEBAR */}
        <aside className={`w-full md:w-52 p-4 flex flex-col gap-1 ${darkMode ? 'bg-slate-900' : 'bg-white border-r border-pink-100'}`}>
<<<<<<< HEAD
          {['dashboard', 'unit1', 'unit2', 'unit3', 'gradesTab'].map((tab) => (
=======
          {['dashboard', 'unit1', 'unit2', 'unit3', 'activities', 'gradesTab', 'vocabulary', 'games'].map((tab) => (
>>>>>>> e6363d305c8903829c5cccc8d89ee44f4a5d8a84
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-black capitalize ${activeTab === tab ? 'bg-pink-600 text-white' : 'text-slate-950 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-800'}`}
            >
              {tab === 'gradesTab' ? '⭐ Calificaciones' : tab === 'dashboard' ? '🏠 Dashboard' : tab === 'unit1' ? '📦 Unidad 1' : tab === 'unit2' ? '📦 Unidad 2' : tab === 'unit3' ? '📦 Unidad 3' : tab}
            </button>
          ))}
          <button onClick={descargarDeSupabase} className="mt-4 w-full bg-slate-200 dark:bg-slate-800 text-slate-950 dark:text-white text-[10px] font-black py-1.5 rounded-lg transition-all active:scale-95">
             🔄 Sincronizar Nube ☁️
          </button>
        </aside>

        {/* MAIN CONTAINER */}
        <main className="flex-1 p-6 max-w-4xl w-full mx-auto">
          {loadingCloud && (
            <div className="text-center p-2 mb-4 bg-pink-100 text-pink-700 font-black rounded-lg text-xs animate-pulse">
              ☁️ Conectando con la base de datos Supabase en tiempo real...
            </div>
          )}
          
          {activeTab === 'dashboard' && (
            <div className="space-y-4">
              <div className="bg-pink-600 p-6 rounded-3xl text-white shadow-md">
                <h1 className="text-xl font-black">¡Bienvenido, {currentUser.name}! 💇‍♀️✨</h1>
                <p className="text-xs mt-1 font-bold">Todo tu progreso y calificaciones se encuentran resguardados en Supabase.</p>
              </div>
              {!esProfesora && (
                <div className="bg-white dark:bg-slate-900 border border-pink-200 dark:border-slate-800 p-4 rounded-2xl">
                  <div className="flex justify-between text-xs font-black mb-1 text-slate-950 dark:text-white">
                    <span>Progreso Global del Alumno</span>
                    <span>{progresoActual}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-pink-600 h-full" style={{ width: `${progresoActual}%` }}></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* UNIDADES Y CONTENIDO */}
          {['unit1', 'unit2', 'unit3'].includes(activeTab) && (
            <div className="space-y-4">
              {esProfesora && (
                <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between border border-pink-500">
                  <span className="text-xs font-black text-white">⚙️ Selecciona Alumno para Revisar / Calificar:</span>
                  <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} className="text-xs font-bold p-2 rounded bg-white text-slate-950 outline-none border">
                    {estudiantesLista.map(est => <option key={est.id} value={est.id}>{est.name}</option>)}
                  </select>
                </div>
              )}

              {modules.filter((_, idx) => (activeTab === 'unit1' && idx === 0) || (activeTab === 'unit2' && idx === 1) || (activeTab === 'unit3' && idx === 2)).map(mod => (
                <div key={mod.id} className="space-y-4">
                  <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-4 rounded-xl font-black text-xs uppercase tracking-wide">
                    {mod.title}
                  </div>
                  {mod.lessons.map((les, index) => {
                    const taskData = allStudentsTasks[targetStudent]?.[les.taskKey];
                    const gradeData = grades[targetStudent]?.[les.taskKey] || { nota: '-', comentario: '' };
                    return (
                      <div key={index} className="bg-white dark:bg-slate-900 border border-pink-200 dark:border-slate-800 p-5 rounded-2xl space-y-4 shadow-sm">
                        <h3 className="text-sm font-black text-slate-950 dark:text-white">{les.title}</h3>
                        <p className="text-xs bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 italic text-slate-950 dark:text-slate-200">{les.objective}</p>
                        
                        {/* Vocabulario Interactivo */}
                        <div className="space-y-1.5">
                          {les.content.map((item, i) => (
                            <div key={i} className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                              <div className="flex items-center space-x-2">
                                <button onClick={() => escucharPalabra(item.en)} className="p-1.5 bg-pink-600 text-white rounded-lg"><Volume2 size={12} /></button>
                                <span className="text-xs font-black text-slate-950 dark:text-white">{item.en}</span>
                              </div>
                              <span className="text-xs font-bold text-slate-950 dark:text-slate-300">🗣️ {item.es}</span>
                            </div>
                          ))}
                        </div>

                        {/* Caja de Actividades */}
                        {les.taskKey && (
                          <div className="bg-pink-50/50 dark:bg-slate-800/80 p-4 rounded-xl border border-pink-200 dark:border-slate-700 text-xs text-slate-950 dark:text-white space-y-3">
                            <p className="font-black text-pink-700 dark:text-pink-400">🎯 Tarea para el estudiante: {targetStudent.toUpperCase()}</p>
                            <p className="font-bold">{les.task}</p>
                            <div className="flex flex-wrap gap-2 items-center">
                              {!esProfesora && (
                                <label className="bg-pink-600 text-white px-3 py-1.5 rounded-lg font-black cursor-pointer shadow-sm active:scale-95 transition-all">
                                  Subir PDF de Tarea ☁️
                                  <input type="file" accept=".pdf" onChange={(e) => handlePdfUpload(e, les.taskKey, currentUser.username)} className="hidden" />
                                </label>
                              )}
                              {taskData ? (
                                <a href={taskData.url} download={taskData.name} className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-black shadow-sm hover:bg-emerald-700 transition-all">Descargar / Ver PDF enviado</a>
                              ) : (
                                <span className="text-slate-500 font-bold italic">Sin archivo enviado todavía</span>
                              )}
                            </div>
                            <div className="border-t pt-2 border-pink-200 dark:border-slate-700">
                              <span className="font-black block text-pink-700 dark:text-pink-300">⭐ Nota: {gradeData?.nota || '-'} / 10</span>
                              {gradeData?.comentario && (
                                <p className="bg-white dark:bg-slate-900 p-2 rounded-lg mt-1 border text-slate-950 dark:text-slate-200 font-bold">💬 Retroalimentación de Miss: {gradeData.comentario}</p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {/* TABLA DE CALIFICACIONES COMPLETA MULTIUSUARIO */}
          {activeTab === 'gradesTab' && (
            <div className="bg-white dark:bg-slate-900 border border-pink-200 dark:border-slate-800 p-6 rounded-3xl space-y-4">
              <div className="flex items-center space-x-2 border-b pb-2 border-slate-200 dark:border-slate-700">
                <Star className="text-amber-500 fill-amber-500" size={20} />
                <h2 className="text-sm font-black text-slate-950 dark:text-white">SISTEMA DE CALIFICACIONES OFICIAL EN LA NUBE</h2>
              </div>

              {esProfesora ? (
                <div className="space-y-4">
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-between">
                    <span className="text-xs font-black text-slate-950 dark:text-white">Estudiante bajo revisión:</span>
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
                          placeholder="Escribe la retroalimentación aquí y haz clic fuera del recuadro para guardar..." 
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

<<<<<<< HEAD
=======
          {/* VISTAS EXTRAS SIMPLIFICADAS SIN CAMBIOS NEGATIVOS */}
          {activeTab === 'activities' && (
            <div className="bg-white dark:bg-slate-900 border p-6 rounded-3xl space-y-3">
              <h3 className="text-sm font-black text-slate-950 dark:text-white">Buzón consolidado 🎒</h3>
              <p className="text-xs font-bold text-slate-500">Aquí se unifican las entregas de tareas del curso.</p>
            </div>
          )}

          {activeTab === 'vocabulary' && (
            <div className="bg-white dark:bg-slate-900 border p-6 rounded-3xl space-y-2">
              <h3 className="text-sm font-black text-slate-950 dark:text-white">Diccionario de Salón de Belleza 📖</h3>
              <p className="text-xs font-bold text-slate-500">Repasa las palabras cuantas veces quieras presionando el parlante.</p>
            </div>
          )}

          {activeTab === 'games' && (
            <div className="bg-white dark:bg-slate-900 border p-6 rounded-3xl space-y-2">
              <h3 className="text-sm font-black text-slate-950 dark:text-white">Juegos Interactivos 🎮</h3>
              <p className="text-xs font-bold text-slate-500">Diviértete con los links de Wordwall e Interacty asignados en cada lección.</p>
            </div>
          )}

>>>>>>> e6363d305c8903829c5cccc8d89ee44f4a5d8a84
        </main>
      </div>
    </div>
  );
}