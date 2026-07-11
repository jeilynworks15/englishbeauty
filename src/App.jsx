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
  // --- 🔐 HECHIZO DE MEMORIA PARA EL INICIO DE SESIÓN ---
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
  const [videoUrl, setVideoUrl] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // --- 📄 BASE DE DATOS PARA LAS TAREAS DE LOS ESTUDIANTES ---
  const [allStudentsTasks, setAllStudentsTasks] = useState({
    jean: { clase2: null, clase3: null, clase5: null, clase6: null },
    ricardo: { clase2: null, clase3: null, clase5: null, clase6: null },
    victoria: { clase2: null, clase3: null, clase5: null, clase6: null },
    yaritza: { clase2: null, clase3: null, clase5: null, clase6: null },
    annelys: { clase2: null, clase3: null, clase5: null, clase6: null },
    melany: { clase2: null, clase3: null, clase5: null, clase6: null }
  });

  // --- 📊 BASE DE DATOS MÁGICA DE CALIFICACIONES ---
  const [grades, setGrades] = useState(() => {
    try {
      const savedGrades = localStorage.getItem('beauty_salon_grades_v3');
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

  // Guardar calificaciones automáticamente
  useEffect(() => {
    localStorage.setItem('beauty_salon_grades_v3', JSON.stringify(grades));
  }, [grades]);

  const [selectedStudent, setSelectedStudent] = useState('jean');

  // --- ESCUCHAR AUDIO ---
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
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  // --- 🌟 NUEVO MÉTODO SEGURO PARA SUBIR TU PDF REAL 🌟 ---
  const handlePdfUpload = (e, claseKey, studentUser) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "application/pdf") {
        // Creamos un enlace temporal que lee tu archivo real directamente
        const blobUrl = URL.createObjectURL(file);
        
        setAllStudentsTasks(prev => ({
          ...prev,
          [studentUser]: {
            ...prev[studentUser],
            [claseKey]: {
              name: file.name,
              url: blobUrl // ¡Tu PDF real listo para visualizarse!
            }
          }
        }));
        alert(`¡Súper! Tu tarea real "${file.name}" se subió con éxito. Ahora puedes pulsar el botón del ojito para verla. 📄✨`);
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

  // --- CONTENIDO EDUCATIVO ---
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
            { en: "How are you?", es: "¿Cómo está?" },
            { en: "My name is...", es: "Mi nombre es..." }
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
            { en: "Finally, we use the flat iron.", es: "Finalmente, usamos la plancha." }
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
      lessons: [
        { 
          title: "CLASE 3: Aftercare Instructions (Instrucciones de cuidado) 🧴", 
          objective: "Objetivo: Al finalizar la clase, podrás dar instrucciones sencillas en inglés a un cliente después de un tratamiento de keratina.",
          content: [
            { en: "Don't wash your hair for 3 days.", es: "No lave su cabello durante 3 días." },
            { en: "Use sulfate-free shampoo.", es: "Use un shampoo sin sulfatos." }
          ],
          gameUrl: "https://wordwall.net/resource/116065664",
          task: "Grabar un audio dando las instrucciones de cuidado después del tratamiento de keratina.",
          taskKey: "clase3"
        },
        { 
          title: "CLASE 4: Price and Time (Hablar sobre Precio y Tiempo) 💰", 
          objective: "Objetivo: Al finalizar la clase, podrás informar el precio, la duración del tratamiento y las formas de pago.",
          content: [
            { en: "The price is $40.", es: "El precio es $40." },
            { en: "You can pay by cash.", es: "Puede pagar en efectivo." }
          ],
          gameUrl: "https://wordwall.net/resource/116065924",
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
          objective: "Objetivo: Hacer preguntas sencillas a un cliente antes de realizar un tratamiento de keratina.",
          content: [
            { en: "Is this your first keratin treatment?", es: "¿Es este su primer tratamiento de keratina?" },
            { en: "Do you have any allergies?", es: "¿Tiene alguna alergia?" }
          ],
          gameUrl: "Dinámica de preguntas rápidas en el salón",
          task: "Grabar un audio practicando las expresiones y preguntas que aprendieron en esta clase.",
          taskKey: "clase5"
        },
        {
          title: "CLASE 6: Despedir al Cliente de manera amable 👋💖",
          objective: "Objetivo: Los estudiantes podrán despedir a un cliente de manera cortés.",
          content: [
            { en: "Thank you for coming.", es: "Gracias por venir." },
            { en: "Have a nice day.", es: "Que tenga un buen día." }
          ],
          gameUrl: "Evaluación del Gran Salón de Belleza",
          task: "EVALUACIÓN FINAL (ROLE-PLAY): Hacer un juego completo con un compañero. ¡Se calificará sobre 10 puntos!",
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
        // Guardamos en la memoria para que no se borre al recargar
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
            <span className="text-4xl">💇‍♀️✨</span>
            <h2 className="text-xl font-black text-purple-950 mt-2">Beauty English Salón</h2>
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
  const targetStudent = esProfesora ? selectedStudent : currentUser.username;

  return (
    <div className={`min-h-screen font-sans flex flex-col transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* --- ENCABEZADO --- */}
      <header className={`border-b sticky top-0 z-40 shadow-sm transition-colors ${darkMode ? 'bg-slate-900 border-purple-950' : 'bg-white border-purple-100'}`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-purple-600 p-2 rounded-xl text-white"><GraduationCap size={24} /></div>
            <div>
              <span className={`font-black text-base block leading-tight ${darkMode ? 'text-purple-300' : 'text-purple-900'}`}>Beauty English</span>
              <span className="text-[10px] text-pink-500 font-bold tracking-wide uppercase">¡Memoria Activada! 🧠✨</span>
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
          <button onClick={() => setActiveTab('dashboard')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-pink-500 text-white' : 'hover:bg-purple-900/50'}`}><span>🏠</span> Inicio</button>
          <button onClick={() => setActiveTab('unit1')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'unit1' ? 'bg-pink-500 text-white' : 'hover:bg-purple-900/50'}`}><span>📦</span> Unit 1</button>
          <button onClick={() => setActiveTab('unit2')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'unit2' ? 'bg-pink-500 text-white' : 'hover:bg-purple-900/50'}`}><span>🛍️</span> Unit 2</button>
          <button onClick={() => setActiveTab('unit3')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'unit3' ? 'bg-pink-500 text-white' : 'hover:bg-purple-900/50'}`}><span>💬</span> Unit 3</button>
          <button onClick={() => setActiveTab('activities')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'activities' ? 'bg-pink-500 text-white' : 'hover:bg-purple-900/50'}`}><span>🎒</span> Mochila de Tareas</button>
          <button onClick={() => setActiveTab('gradesTab')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'gradesTab' ? 'bg-pink-500 text-white' : 'hover:bg-purple-900/50'}`}><span>⭐</span> Calificaciones</button>
          
          <div className="border-t border-purple-900 my-2 pt-2">
            <button onClick={() => setActiveTab('games')} className="w-full text-left px-4 py-3 rounded-xl text-xs font-black bg-purple-900 text-amber-300 hover:bg-purple-800"><span>🕹️</span> Área de Juegos</button>
          </div>
        </aside>

        {/* --- CONTENIDO --- */}
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6">
          
          {activeTab === 'dashboard' && (
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-6 text-white shadow-xl text-center">
              <h1 className="text-2xl font-black">¡Hola, {currentUser.name}! ✨</h1>
              <p className="text-purple-100 text-xs mt-1">¡Ahora la app te recordará siempre aunque recargues la página!</p>
            </div>
          )}

          {['unit1', 'unit2', 'unit3'].includes(activeTab) && (
            <div className="space-y-4">
              {modules.filter((_, idx) => (activeTab === 'unit1' && idx === 0) || (activeTab === 'unit2' && idx === 1) || (activeTab === 'unit3' && idx === 2)).map(mod => (
                <div key={mod.id} className="space-y-4">
                  {mod.lessons.map((les, index) => {
                    const taskData = allStudentsTasks[targetStudent]?.[les.taskKey];
                    return (
                      <div key={index} className={`border-2 rounded-2xl p-5 shadow-sm space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                        <h3 className="text-base font-black">{les.title}</h3>
                        <p className="text-xs p-2 bg-purple-50 text-purple-700 font-bold rounded-lg">{les.objective}</p>

                        <div className="grid grid-cols-1 gap-1.5">
                          {les.content.map((item, i) => (
                            <div key={i} className="p-2.5 rounded-xl flex justify-between items-center border bg-slate-50">
                              <div className="flex items-center space-x-2">
                                <button onClick={() => escucharPalabra(item.en)} className="p-1.5 bg-purple-600 text-white rounded-lg"><Volume2 size={14} /></button>
                                <span className="text-xs font-black text-slate-900">{item.en}</span>
                              </div>
                              <span className="text-[11px] font-bold text-slate-500">🗣️ {item.es}</span>
                            </div>
                          ))}
                        </div>

                        {les.taskKey && (
                          <div className="p-3 bg-amber-50 rounded-xl border text-xs text-amber-950 font-bold">
                            <p className="font-black text-amber-600">📥 TU TAREA REAL:</p>
                            <div className="flex items-center gap-2 mt-2">
                              {!esProfesora && (
                                <label className="bg-purple-600 text-white text-[10px] font-black px-2.5 py-1.5 rounded-lg cursor-pointer">
                                  {taskData ? "Cambiar mi PDF" : "Subir PDF Real"}
                                  <input type="file" accept=".pdf" onChange={(e) => handlePdfUpload(e, les.taskKey, currentUser.username)} className="hidden" />
                                </label>
                              )}
                              {taskData && (
                                <a href={taskData.url} target="_blank" rel="noreferrer" className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1.5 rounded-lg flex items-center gap-1">
                                  <Eye size={12} /> Ver Mi PDF Real 👁️
                                </a>
                              )}
                            </div>
                            {taskData && <p className="text-[10px] text-emerald-600 mt-1">Archivo: {taskData.name}</p>}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="bg-white border-2 border-purple-200 rounded-3xl p-6 space-y-4">
              <h2 className="text-xl font-black text-purple-950">CENTRO DE TAREAS GENERAL 🎒</h2>
              
              {esProfesora && (
                <div className="p-3 bg-purple-100 rounded-xl">
                  <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} className="text-xs font-bold p-1 rounded border bg-white text-slate-900">
                    {estudiantesLista.map(est => <option key={est.id} value={est.id}>{est.name}</option>)}
                  </select>
                </div>
              )}

              <div className="space-y-3">
                {['clase2', 'clase3', 'clase5', 'clase6'].map((key) => {
                  const currentTask = allStudentsTasks[targetStudent]?.[key];
                  return (
                    <div key={key} className="p-4 rounded-2xl border bg-slate-50 flex items-center justify-between text-slate-900">
                      <div>
                        <span className="font-black text-purple-600 block text-xs">{key.toUpperCase()}</span>
                        <span className="text-[11px] text-slate-500 font-bold">Estudiante: {targetStudent}</span>
                      </div>
                      <div className="flex gap-2">
                        {!esProfesora && (
                          <label className="bg-purple-600 text-white text-[10px] font-black px-3 py-1.5 rounded-xl cursor-pointer">
                            Subir
                            <input type="file" accept=".pdf" onChange={(e) => handlePdfUpload(e, key, currentUser.username)} className="hidden" />
                          </label>
                        )}
                        {currentTask ? (
                          <a href={currentTask.url} target="_blank" rel="noreferrer" className="bg-emerald-600 text-white text-[10px] font-black px-3 py-1.5 rounded-xl flex items-center gap-1">
                            <Eye size={12} /> Ver Real
                          </a>
                        ) : (
                          <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-1 rounded font-bold">Vacío</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'gradesTab' && (
            <div className="bg-white border-2 border-purple-200 rounded-3xl p-6">
              <h2 className="text-xl font-black text-purple-950">CALIFICACIONES ⭐</h2>
              {esProfesora ? (
                <div className="mt-4 space-y-2">
                  <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} className="text-xs p-1 rounded border text-slate-900 font-bold mb-4">
                    {estudiantesLista.map(est => <option key={est.id} value={est.id}>{est.name}</option>)}
                  </select>
                  {['clase2', 'clase3', 'clase5', 'clase6'].map(key => (
                    <div key={key} className="flex justify-between items-center p-2 border-b text-slate-950 text-xs font-bold">
                      <span>{key}</span>
                      <select value={grades[selectedStudent]?.[key] || '-'} onChange={(e) => asignarNota(selectedStudent, key, e.target.value)} className="border p-1 rounded bg-white">
                        <option value="-">-</option>
                        {[10,9,8,7,6,5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 space-y-2 text-slate-950">
                  {['clase2', 'clase3', 'clase5', 'clase6'].map(key => (
                    <div key={key} className="flex justify-between p-3 bg-purple-50 rounded-xl text-xs font-bold">
                      <span>{key.toUpperCase()}</span>
                      <span className="bg-purple-600 text-white px-2 py-0.5 rounded-md">{grades[currentUser.username]?.[key] || '-'} / 10</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'games' && (
            <div className="bg-white border-2 border-amber-300 rounded-3xl p-6 text-center text-slate-950">
              <h2 className="text-xl font-black text-amber-600">🎮 ZONA DE JUEGOS</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <a href="https://wordwall.net/es/resource/115823970" target="_blank" rel="noreferrer" className="p-4 bg-purple-50 rounded-2xl font-black text-xs block">🎯 Saludos (Clase 1)</a>
                <a href="https://interacty.me/projects/e502cc8626a13026" target="_blank" rel="noreferrer" className="p-4 bg-pink-50 rounded-2xl font-black text-xs block">🧪 Keratina (Clase 2)</a>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
