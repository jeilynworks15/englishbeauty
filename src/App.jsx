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
  // --- ESTADOS DE ACCESO Y PANTALLAS ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  // --- ESTADO MÁGICO PARA EL VIDEO ---
  const [videoUrl, setVideoUrl] = useState(null);

  // --- ESTADO: MODO OSCURO ---
  const [darkMode, setDarkMode] = useState(false);

  // --- 🌟 BASE DE DATOS MÁGICA DE TAREAS (LOCALSTORAGE) 🌟 ---
  // Estructura: { jean: { clase2: { name, url }, clase3: null ... }, ricardo: { ... } }
  const [allStudentsTasks, setAllStudentsTasks] = useState(() => {
    const savedTasks = localStorage.getItem('beauty_salon_tasks');
    return savedTasks ? JSON.parse(savedTasks) : {
      jean: { clase2: null, clase3: null, clase5: null, clase6: null },
      ricardo: { clase2: null, clase3: null, clase5: null, clase6: null },
      victoria: { clase2: null, clase3: null, clase5: null, clase6: null },
      yaritza: { clase2: null, clase3: null, clase5: null, clase6: null },
      annelys: { clase2: null, clase3: null, clase5: null, clase6: null },
      melany: { clase2: null, clase3: null, clase5: null, clase6: null }
    };
  });

  // --- 🌟 BASE DE DATOS MÁGICA DE CALIFICACIONES (LOCALSTORAGE) 🌟 ---
  const [grades, setGrades] = useState(() => {
    const savedGrades = localStorage.getItem('beauty_salon_grades');
    return savedGrades ? JSON.parse(savedGrades) : {
      jean: { clase2: '-', clase3: '-', clase5: '-', clase6: '-' },
      ricardo: { clase2: '-', clase3: '-', clase5: '-', clase6: '-' },
      victoria: { clase2: '-', clase3: '-', clase5: '-', clase6: '-' },
      yaritza: { clase2: '-', clase3: '-', clase5: '-', clase6: '-' },
      annelys: { clase2: '-', clase3: '-', clase5: '-', clase6: '-' },
      melany: { clase2: '-', clase3: '-', clase5: '-', clase6: '-' }
    };
  });

  // Guardar en la memoria cada vez que cambien las tareas o notas
  useEffect(() => {
    localStorage.setItem('beauty_salon_tasks', JSON.stringify(allStudentsTasks));
  }, [allStudentsTasks]);

  useEffect(() => {
    localStorage.setItem('beauty_salon_grades', JSON.stringify(grades));
  }, [grades]);

  // Estado temporal para la revisión de las Misses
  const [selectedStudent, setSelectedStudent] = useState('jean');

  // --- FUNCIÓN DE PRONUNCIACIÓN ---
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

  // --- 🌟 FUNCIÓN PARA SUBIR EL PDF CORREGIDA 🌟 ---
  const handlePdfUpload = (e, claseKey, studentUser) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "application/pdf") {
        // En un entorno real se subiría a la nube, aquí usamos Base64 para simularlo en localStorage
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64Url = event.target.result;
          setAllStudentsTasks(prev => ({
            ...prev,
            [studentUser]: {
              ...prev[studentUser],
              [claseKey]: {
                name: file.name,
                url: base64Url // ¡Guardado completo para que todos lo vean!
              }
            }
          }));
          alert(`¡Súper! La tarea de ${studentUser} ("${file.name}") se guardó en la memoria del salón. ¡Las Misses ya pueden verla! 📄✨`);
        };
        reader.readAsDataURL(file);
      } else {
        alert("¡Upps! Recuerda que solo puedes subir archivos en formato PDF. 📄");
      }
    }
  };

  // --- FUNCIÓN PARA ASIGNAR NOTAS ---
  const asignarNota = (estudiante, claseKey, nota) => {
    setGrades(prev => ({
      ...prev,
      [estudiante]: {
        ...prev[estudiante],
        [claseKey]: nota
      }
    }));
  };

  // --- CUENTAS DE MAESTRAS Y ESTUDIANTES ---
  const accounts = {
    'daniela': { username: 'daniela', name: "Miss Manzaba Daniela", role: "Profesora", avatar: "MD" },
    'josselyne': { username: 'josselyne', name: "Miss Lucas Josselyne", role: "Profesora", avatar: "MJ" },
    'jeilyn': { username: 'jeilyn', name: "Miss Gómez Jeilyn", role: "Profesora", avatar: "MG" },
    'jean': { username: 'jean', name: "Jean", role: "Estudiante", avatar: "JN" },
    'ricardo': { username: 'ricardo', name: "Ricardo", role: "Estudiante", avatar: "RC" },
    'victoria': { username: 'victoria', name: "Victoria", role: "Estudiante", avatar: "VC" },
    'yaritza': { username: 'yaritza', name: "Yaritza", role: "Estudiante", avatar: "YR" },
    'annelys': { username: 'annelys', name: "Annelys", role: "Estudiante", avatar: "AN" },
    'melany': { username: 'melany', name: "Melany", role: "Estudiante", avatar: "ML" }
  };

  const estudiantesLista = [
    { id: 'jean', name: 'Jean' },
    { id: 'ricardo', name: 'Ricardo' },
    { id: 'victoria', name: 'Victoria' },
    { id: 'yaritza', name: 'Yaritza' },
    { id: 'annelys', name: 'Annelys' },
    { id: 'melany', name: 'Melany' }
  ];

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

  const esProfesora = currentUser ? currentUser.role === "Profesora" : false;
  // Saber a quién le pertenece la vista actual de las tareas
  const targetStudent = esProfesora ? selectedStudent : (currentUser ? currentUser.username : 'jean');

  return (
    <div className={`min-h-screen font-sans flex flex-col transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      <header className={`border-b sticky top-0 z-40 shadow-sm transition-colors ${darkMode ? 'bg-slate-900 border-purple-950' : 'bg-white border-purple-100'}`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-purple-600 p-2 rounded-xl text-white"><GraduationCap size={24} /></div>
            <div>
              <span className={`font-black text-base block leading-tight ${darkMode ? 'text-purple-300' : 'text-purple-900'}`}>Beauty English</span>
              <span className="text-[10px] text-pink-500 font-bold tracking-wide uppercase">¡Memoria Compartida! 🧠✨</span>
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
              <button onClick={() => setIsLoggedIn(false)} className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-lg">Salir</button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        
        <aside className={`w-full md:w-56 p-4 flex flex-col gap-1.5 md:min-h-[calc(100vh-4rem)] md:sticky md:top-16 z-30 shadow-inner ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-purple-950 text-white'}`}>
          <p className={`text-[10px] uppercase font-black tracking-wider mb-2 px-2 hidden md:block ${darkMode ? 'text-purple-400' : 'text-purple-300'}`}>Navegación Salón</p>
          
          <button onClick={() => setActiveTab('dashboard')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-pink-500 text-white shadow-md' : 'hover:bg-purple-900/50'}`}><span>🏠</span> Inicio</button>
          <button onClick={() => setActiveTab('syllabus')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'syllabus' ? 'bg-pink-500 text-white shadow-md' : 'hover:bg-purple-900/50'}`}><span>📋</span> Syllabus</button>
          <button onClick={() => setActiveTab('unit1')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'unit1' ? 'bg-pink-500 text-white shadow-md' : 'hover:bg-purple-900/50'}`}><span>📦</span> Unit 1</button>
          <button onClick={() => setActiveTab('unit2')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'unit2' ? 'bg-pink-500 text-white shadow-md' : 'hover:bg-purple-900/50'}`}><span>🛍️</span> Unit 2</button>
          <button onClick={() => setActiveTab('unit3')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'unit3' ? 'bg-pink-500 text-white shadow-md' : 'hover:bg-purple-900/50'}`}><span>💬</span> Unit 3</button>
          <button onClick={() => setActiveTab('activities')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'activities' ? 'bg-pink-500 text-white shadow-md' : 'hover:bg-purple-900/50'}`}><span>🎒</span> Mochila de Tareas</button>
          <button onClick={() => setActiveTab('gradesTab')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'gradesTab' ? 'bg-pink-500 text-white shadow-md' : 'hover:bg-purple-900/50'}`}><span>⭐</span> Calificaciones</button>
          <button onClick={() => setActiveTab('vocabulary')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'vocabulary' ? 'bg-pink-500 text-white shadow-md' : 'hover:bg-purple-900/50'}`}><span>🔊</span> Vocabulario</button>
          
          <div className="border-t border-purple-900 my-2 pt-2">
            <button onClick={() => setActiveTab('games')} className={`w-full text-left px-4 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'games' ? 'bg-amber-500 text-purple-950 shadow-md scale-102' : 'bg-purple-900 text-amber-300 hover:bg-purple-800'}`}><span>🕹️</span> Área de Juegos</button>
          </div>
        </aside>

        <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6">
          
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-6 text-white shadow-xl text-center">
                <h1 className="text-2xl font-black">¡Hola, {currentUser.name}! ✨</h1>
                <p className="text-purple-100 text-xs mt-1">¡Ahora el salón tiene súper memoria! Las tareas que subas las podrán ver tus Misses.</p>
              </div>

              <div className={`border-2 rounded-3xl p-6 shadow-sm text-center space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-200'}`}>
                <div className="flex flex-col items-center justify-center">
                  <Video className="text-pink-500 mb-2 animate-pulse" size={32} />
                  <h3 className={`text-sm font-black ${darkMode ? 'text-purple-300' : 'text-purple-950'}`}>📺 El Televisor de Práctica</h3>
                </div>

                {!videoUrl ? (
                  <label className={`mx-auto max-w-xs flex flex-col items-center justify-center border-2 border-dashed p-4 rounded-xl cursor-pointer transition-all group ${darkMode ? 'border-purple-800 bg-slate-800/50 hover:border-purple-600' : 'border-purple-300 bg-purple-50/50 hover:border-purple-500'}`}>
                    <Upload size={24} className="text-purple-500 group-hover:scale-110 mb-1" />
                    <span className="text-xs font-black">Seleccionar mi video</span>
                    <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                  </label>
                ) : (
                  <div className="space-y-2">
                    <div className="rounded-xl overflow-hidden border-4 border-purple-900 max-w-md mx-auto bg-black">
                      <video src={videoUrl} controls className="w-full h-auto" />
                    </div>
                    <button onClick={() => setVideoUrl(null)} className="text-[10px] font-black text-rose-600 bg-rose-50 px-3 py-1 rounded-lg">❌ Quitar este video</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'syllabus' && (
            <div className={`border-2 rounded-3xl p-6 shadow-sm space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-200'}`}>
              <div className="flex items-center space-x-2 border-b-2 border-purple-100 pb-3">
                <FileText className="text-purple-600" size={24} />
                <h2 className={`text-xl font-black ${darkMode ? 'text-purple-300' : 'text-purple-950'}`}>SYLLABUS OFICIAL DEL CURSO 📋</h2>
              </div>
              <div className="space-y-3 pt-2">
                <div className={`p-3 rounded-xl border ${darkMode ? 'bg-slate-800 border-purple-950' : 'bg-purple-50 border-purple-100'}`}>
                  <h3 className="text-xs font-black text-purple-400">📦 UNIDAD 1: Welcome to the Client</h3>
                  <p className="text-[11px] font-semibold mt-0.5">• Clase 1: Saludos 👋</p>
                  <p className="text-[11px] font-semibold">• Clase 2: Explicar el proceso 🧪 📝 (Lleva Tarea)</p>
                </div>
                <div className={`p-3 rounded-xl border ${darkMode ? 'bg-slate-800 border-pink-950' : 'bg-pink-50 border-pink-100'}`}>
                  <h3 className="text-xs font-black text-pink-400">🛍️ UNIDAD 2: Giving Information</h3>
                  <p className="text-[11px] font-semibold mt-0.5">• Clase 3: Instrucciones de cuidado 🧴 📝 (Lleva Tarea)</p>
                  <p className="text-[11px] font-semibold">• Clase 4: Precio y tiempo 💰</p>
                </div>
                <div className={`p-3 rounded-xl border ${darkMode ? 'bg-slate-800 border-amber-950' : 'bg-amber-50 border-amber-100'}`}>
                  <h3 className="text-xs font-black text-amber-400">💬 UNIDAD 3: Customer Interaction</h3>
                  <p className="text-[11px] font-semibold mt-0.5">• Clase 5: Preguntas previas 💇‍♂️ 📝 (Lleva Tarea)</p>
                  <p className="text-[11px] font-semibold">• Clase 6: Despedida y Evaluación 🏆 📝 (Lleva Tarea)</p>
                </div>
              </div>
            </div>
          )}

          {['unit1', 'unit2', 'unit3'].includes(activeTab) && (
            <div className="space-y-4">
              {modules.filter((_, idx) => (activeTab === 'unit1' && idx === 0) || (activeTab === 'unit2' && idx === 1) || (activeTab === 'unit3' && idx === 2)).map(mod => (
                <div key={mod.id} className="space-y-4">
                  <div className="bg-purple-900 text-white p-4 rounded-2xl shadow-sm">
                    <h2 className="text-xs font-black uppercase tracking-wider">{mod.title}</h2>
                  </div>

                  {mod.lessons.map((les, index) => {
                    const taskData = allStudentsTasks[targetStudent]?.[les.taskKey];
                    return (
                      <div key={index} className={`border-2 rounded-2xl p-5 shadow-sm space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                        <div>
                          <h3 className="text-base font-black">{les.title}</h3>
                          <p className={`text-xs font-bold p-2 rounded-lg mt-2 italic ${darkMode ? 'bg-slate-800 text-purple-300' : 'bg-purple-50 text-purple-700'}`}>{les.objective}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="grid grid-cols-1 gap-1.5">
                            {les.content.map((item, i) => (
                              <div key={i} className={`p-2.5 rounded-xl flex justify-between items-center border ${darkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                                <div className="flex items-center space-x-2">
                                  <button onClick={() => escucharPalabra(item.en)} className="p-1.5 bg-purple-600 text-white rounded-lg"><Volume2 size={14} /></button>
                                  <span className="text-xs font-black">{item.en}</span>
                                </div>
                                <span className="text-[11px] font-bold text-slate-400">🗣️ {item.es}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className={`p-3 rounded-xl border text-xs font-bold ${darkMode ? 'bg-slate-800/80 border-amber-900 text-amber-200' : 'bg-amber-50 border-amber-100 text-amber-950'}`}>
                          <p className="font-black text-amber-600 uppercase tracking-wider mb-1">🎯 Actividad Obligatoria:</p>
                          {les.task}
                          
                          {les.gameUrl && les.gameUrl.startsWith("http") && (
                            <div className="mt-2"><a href={les.gameUrl} target="_blank" rel="noreferrer" className="inline-block text-[10px] font-black bg-purple-600 text-white px-2 py-1 rounded">🕹️ Abrir Juego</a></div>
                          )}

                          {les.taskKey && (
                            <div className="mt-3 pt-3 border-t border-amber-200/40 space-y-2">
                              {esProfesora && (
                                <div className="p-1.5 bg-purple-900 text-white rounded-lg text-[10px] mb-2">
                                  👀 Viendo la tarea de: <b>{targetStudent.toUpperCase()}</b>
                                </div>
                              )}
                              <p className="text-[10px] font-black uppercase text-purple-400">📥 Archivo PDF del Estudiante:</p>
                              <div className="flex flex-wrap items-center gap-2">
                                {!esProfesora && (
                                  <label className="inline-flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-black px-2.5 py-1.5 rounded-lg cursor-pointer">
                                    <Upload size={12} />
                                    {taskData ? "Cambiar mi PDF" : "Subir Tarea PDF"}
                                    <input type="file" accept=".pdf" onChange={(e) => handlePdfUpload(e, les.taskKey, currentUser.username)} className="hidden" />
                                  </label>
                                )}

                                {taskData && (
                                  <a href={taskData.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black px-2.5 py-1.5 rounded-lg shadow-sm">
                                    <Eye size={12} />
                                    Revisar Tarea PDF 👁️
                                  </a>
                                )}
                              </div>
                              {taskData ? (
                                <p className="text-[10px] text-emerald-500 font-bold mt-1">✅ Guardado: {taskData.name}</p>
                              ) : (
                                <p className="text-[10px] text-rose-500 font-bold mt-1">❌ No se ha subido ningún documento todavía.</p>
                              )}

                              <p className="text-[11px] font-black text-purple-600 mt-2 bg-purple-50 p-1.5 rounded-md inline-block">
                                ⭐ Calificación de {targetStudent}: {grades[targetStudent]?.[les.taskKey] || '-'} / 10
                              </p>
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
                <h2 className={`text-xl font-black ${darkMode ? 'text-purple-300' : 'text-purple-950'}`}>CENTRO DE TAREAS GENERAL 🎒👁️</h2>
              </div>
              
              {esProfesora ? (
                <div className="p-3 bg-purple-100 rounded-xl border border-purple-200 flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-xs font-black text-purple-950">Maestra, selecciona un alumno para ver su mochila:</span>
                  <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} className="text-xs font-bold p-1 rounded border bg-white text-slate-900">
                    {estudiantesLista.map(est => (
                      <option key={est.id} value={est.id}>{est.name}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <p className="text-xs text-slate-400 font-bold">¡Sube tus tareas aquí y tu Miss podrá verlas de inmediato en su cuenta!</p>
              )}

              <div className="space-y-4 pt-2">
                {['clase2', 'clase3', 'clase5', 'clase6'].map((key) => {
                  const names = {
                    clase2: "🔹 Clase 2: Explicación del Proceso (Keratina)",
                    clase3: "🔹 Clase 3: Instrucciones de Cuidado Posterior",
                    clase5: "🔹 Clase 5: Cuestionario de Alergias",
                    clase6: "🏆 Clase 6: Rúbrica y Evaluación Final"
                  };
                  const currentTask = allStudentsTasks[targetStudent]?.[key];

                  return (
                    <div key={key} className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${darkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="text-xs">
                        <span className="font-black text-purple-500 block">{names[key]}</span>
                        <span className="text-slate-400 font-bold">Mochila de: <b className="text-pink-500">{targetStudent.toUpperCase()}</b></span>
                        <span className="block mt-1 font-bold text-amber-600">⭐ Nota: {grades[targetStudent]?.[key] || '-'} / 10</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                        {!esProfesora && (
                          <label className="bg-purple-600 text-white text-[10px] font-black px-3 py-1.5 rounded-xl cursor-pointer hover:bg-purple-700">
                            📄 {currentTask ? "Cambiar" : "Elegir PDF"}
                            <input type="file" accept=".pdf" onChange={(e) => handlePdfUpload(e, key, currentUser.username)} className="hidden" />
                          </label>
                        )}
                        
                        {currentTask ? (
                          <a href={currentTask.url} target="_blank" rel="noreferrer" className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-md">
                            <Eye size={12} /> Revisar PDF
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
                <h2 className="text-xl font-black">SISTEMA DE CALIFICACIONES (ESCALA 1-10) ⭐</h2>
              </div>

              {esProfesora ? (
                <div className="space-y-4">
                  <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-black text-purple-950">Seleccionar Estudiante a Calificar:</span>
                    <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} className="text-xs font-bold p-1 rounded border bg-white text-slate-900">
                      {estudiantesLista.map(est => (
                        <option key={est.id} value={est.id}>{est.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-3">
                    {[
                      { key: 'clase2', label: 'Clase 2: Proceso Keratina' },
                      { key: 'clase3', label: 'Clase 3: Instrucciones de Cuidado' },
                      { key: 'clase5', label: 'Clase 5: Preguntas previas' },
                      { key: 'clase6', label: 'Clase 6: Evaluación Final' }
                    ].map(item => (
                      <div key={item.key} className="p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/50 dark:bg-slate-800/40">
                        <span className="text-xs font-black text-slate-700 dark:text-slate-300">{item.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold">Nota actual: <b className="text-purple-600">{grades[selectedStudent]?.[item.key] || '-'}</b></span>
                          <select 
                            value={grades[selectedStudent]?.[item.key] === '-' ? '' : grades[selectedStudent]?.[item.key]} 
                            onChange={(e) => asignarNota(selectedStudent, item.key, e.target.value)}
                            className="text-xs p-1 rounded border bg-white text-slate-900 font-bold"
                          >
                            <option value="">Colocar Nota</option>
                            {[10,9,8,7,6,5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs font-bold">Aquí están tus notas asignadas por las Misses Daniela, Josselyne y Jeilyn:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { key: 'clase2', label: 'Clase 2: Proceso Keratina' },
                      { key: 'clase3', label: 'Clase 3: Cuidado Posterior' },
                      { key: 'clase5', label: 'Clase 5: Preguntas Previas' },
                      { key: 'clase6', label: 'Clase 6: Evaluación Final' }
                    ].map(item => (
                      <div key={item.key} className="p-3 rounded-xl border bg-purple-50/40 flex justify-between items-center">
                        <span className="text-xs font-bold">{item.label}</span>
                        <span className="text-xs font-black bg-purple-600 text-white px-2.5 py-1 rounded-lg">
                          {grades[currentUser.username]?.[item.key] || '-'} / 10
                        </span>
                      </div>
                    ))}
                  </div>
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

          {activeTab === 'games' && (
            <div className={`border-2 rounded-3xl p-6 shadow-md space-y-6 ${darkMode ? 'bg-slate-900 border-amber-500/30' : 'bg-white border-amber-300'}`}>
              <div className="flex items-center space-x-2 border-b-2 border-amber-100 pb-3 text-center justify-center">
                <Gamepad2 className="text-amber-500 animate-bounce" size={28} />
                <h2 className="text-xl font-black">¡LA FERIA DE JUEGOS DE VOCABULARIO! 🎡🕹️</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={`border-2 p-4 rounded-2xl flex flex-col justify-between items-center text-center space-y-2 ${darkMode ? 'bg-slate-800 border-purple-900' : 'bg-purple-50 border-purple-200'}`}>
                  <span className="text-3xl">🎯</span>
                  <h3 className="text-xs font-black">El Gran Laberinto de Saludos (Clase 1)</h3>
                  <a href="https://wordwall.net/es/resource/115823970" target="_blank" rel="noreferrer" className="w-full text-center text-xs font-black bg-purple-600 text-white py-2 rounded-xl shadow-sm">🕹️ ¡Jugar!</a>
                </div>
                <div className={`border-2 p-4 rounded-2xl flex flex-col justify-between items-center text-center space-y-2 ${darkMode ? 'bg-slate-800 border-pink-900' : 'bg-pink-50 border-pink-200'}`}>
                  <span className="text-3xl">🧪</span>
                  <h3 className="text-xs font-black">El Proceso de la Keratina (Clase 2)</h3>
                  <a href="https://interacty.me/projects/e502cc8626a13026" target="_blank" rel="noreferrer" className="w-full text-center text-xs font-black bg-pink-500 text-white py-2 rounded-xl shadow-sm">🕹️ ¡Jugar!</a>
                </div>
                <div className={`border-2 p-4 rounded-2xl flex flex-col justify-between items-center text-center space-y-2 ${darkMode ? 'bg-slate-800 border-amber-900' : 'bg-amber-50 border-amber-200'}`}>
                  <span className="text-3xl">🧴</span>
                  <h3 className="text-xs font-black">Instrucciones de Cuidado (Clase 3)</h3>
                  <a href="https://wordwall.net/resource/116065664" target="_blank" rel="noreferrer" className="w-full text-center text-xs font-black bg-amber-500 text-white py-2 rounded-xl shadow-sm">🕹️ ¡Jugar!</a>
                </div>
                <div className={`border-2 p-4 rounded-2xl flex flex-col justify-between items-center text-center space-y-2 ${darkMode ? 'bg-slate-800 border-emerald-900' : 'bg-emerald-50 border-emerald-200'}`}>
                  <span className="text-3xl">💰</span>
                  <h3 className="text-xs font-black">Precio y Tiempo en el Salón (Clase 4)</h3>
                  <a href="https://wordwall.net/resource/116065924" target="_blank" rel="noreferrer" className="w-full text-center text-xs font-black bg-emerald-600 text-white py-2 rounded-xl shadow-sm">🕹️ ¡Jugar!</a>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
