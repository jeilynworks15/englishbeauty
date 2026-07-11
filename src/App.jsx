import React, { useState, useEffect } from 'react';

export default function App() {
  // --- ESTADOS DE ACCESO Y PANTALLAS ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [videoUrl, setVideoUrl] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // --- BASE DE DATOS MÁGICA ---
  const [allStudentsTasks, setAllStudentsTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('beauty_salon_tasks');
      return savedTasks ? JSON.parse(savedTasks) : {
        jean: { clase2: null, clase3: null, clase5: null, clase6: null },
        ricardo: { clase2: null, clase3: null, clase5: null, clase6: null },
        victoria: { clase2: null, clase3: null, clase5: null, clase6: null },
        yaritza: { clase2: null, clase3: null, clase5: null, clase6: null },
        annelys: { clase2: null, clase3: null, clase5: null, clase6: null },
        melany: { clase2: null, clase3: null, clase5: null, clase6: null }
      };
    } catch (e) {
      return { jean: {}, ricardo: {}, victoria: {}, yaritza: {}, annelys: {}, melany: {} };
    }
  });

  const [grades, setGrades] = useState(() => {
    try {
      const savedGrades = localStorage.getItem('beauty_salon_grades');
      return savedGrades ? JSON.parse(savedGrades) : {
        jean: { clase2: '-', clase3: '-', clase5: '-', clase6: '-' },
        ricardo: { clase2: '-', clase3: '-', clase5: '-', clase6: '-' },
        victoria: { clase2: '-', clase3: '-', clase5: '-', clase6: '-' },
        yaritza: { clase2: '-', clase3: '-', clase5: '-', clase6: '-' },
        annelys: { clase2: '-', clase3: '-', clase5: '-', clase6: '-' },
        melany: { clase2: '-', clase3: '-', clase5: '-', clase6: '-' }
      };
    } catch (e) {
      return { jean: {}, ricardo: {}, victoria: {}, yaritza: {}, annelys: {}, melany: {} };
    }
  });

  useEffect(() => {
    localStorage.setItem('beauty_salon_tasks', JSON.stringify(allStudentsTasks));
  }, [allStudentsTasks]);

  useEffect(() => {
    localStorage.setItem('beauty_salon_grades', JSON.stringify(grades));
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
    if (file) setVideoUrl(URL.createObjectURL(file));
  };

  const handlePdfUpload = (e, claseKey, studentUser) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAllStudentsTasks(prev => ({
          ...prev,
          [studentUser]: { ...prev[studentUser], [claseKey]: { name: file.name, url: event.target.result } }
        }));
        alert(`¡Logrado! Tarea de ${studentUser} guardada. ✨`);
      };
      reader.readAsDataURL(file);
    } else {
      alert("¡Por favor sube un archivo PDF! 📄");
    }
  };

  const asignarNota = (estudiante, claseKey, nota) => {
    setGrades(prev => ({ ...prev, [estudiante]: { ...prev[estudiante], [claseKey]: nota } }));
  };

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
    { id: 'jean', name: 'Jean' }, { id: 'ricardo', name: 'Ricardo' }, { id: 'victoria', name: 'Victoria' },
    { id: 'yaritza', name: 'Yaritza' }, { id: 'annelys', name: 'Annelys' }, { id: 'melany', name: 'Melany' }
  ];

  const modules = [
    {
      id: 1,
      title: "UNIDAD 1: WELCOME TO THE CLIENT 🚪",
      lessons: [
        { 
          title: "CLASE 1: Greetings 👋", 
          objective: "Objetivo: Saludar al cliente en inglés.",
          content: [
            { en: "Hello! / Hi!", es: "Hola" }, { en: "Good morning.", es: "Buenos días" }, { en: "Welcome!", es: "¡Bienvenido!" }
          ],
          gameUrl: "https://wordwall.net/es/resource/115823970"
        },
        { 
          title: "CLASE 2: Explain the Keratin Process 🧪", 
          objective: "Objetivo: Explicar el proceso de keratina.",
          content: [
            { en: "First, we wash your hair.", es: "Primero, lavamos tu cabello." }, { en: "Finally, we use the flat iron.", es: "Finalmente, usamos la plancha." }
          ],
          gameUrl: "https://interacty.me/projects/e502cc8626a13026",
          task: "Grabar audio explicando el proceso.",
          taskKey: "clase2"
        }
      ]
    },
    {
      id: 2,
      title: "UNIDAD 2: GIVING INFORMATION 📢",
      lessons: [
        { 
          title: "CLASE 3: Aftercare Instructions 🧴", 
          objective: "Objetivo: Dar instrucciones de cuidado posterior.",
          content: [
            { en: "Don't wash your hair for 3 days.", es: "No lave su cabello por 3 días." }, { en: "Use sulfate-free shampoo.", es: "Use shampoo sin sulfatos." }
          ],
          gameUrl: "https://wordwall.net/resource/116065664",
          task: "Subir PDF con las instrucciones escritas.",
          taskKey: "clase3"
        },
        { 
          title: "CLASE 4: Price and Time 💰", 
          objective: "Objetivo: Informar precios.",
          content: [
            { en: "The price is $40.", es: "El precio es $40." }
          ],
          gameUrl: "https://wordwall.net/resource/116065924"
        }
      ]
    },
    {
      id: 3,
      title: "UNIDAD 3: CUSTOMER INTERACTION 💬",
      lessons: [
        {
          title: "CLASE 5: Conversar con el Cliente 💇‍♂️",
          objective: "Objetivo: Hacer preguntas previas.",
          content: [
            { en: "Do you have any allergies?", es: "¿Tiene alguna alergia?" }
          ],
          task: "Subir reporte de alergias.",
          taskKey: "clase5"
        },
        {
          title: "CLASE 6: Despedir al Cliente 👋💖",
          objective: "Objetivo: Despedir amablemente.",
          content: [
            { en: "Thank you for coming.", es: "Gracias por venir." }
          ],
          task: "Evaluación Final en Parejas.",
          taskKey: "clase6"
        }
      ]
    }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const account = accounts[username.toLowerCase().trim()];
    if (account && (password === "1234" || password === "prome")) {
      setCurrentUser(account);
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Nombre o clave incorrectos.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-purple-950 flex flex-col items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-6 rounded-3xl shadow-xl max-w-sm w-full space-y-4">
          <h2 className="text-xl font-black text-center text-purple-950">¡Salón de Belleza English! 💇‍♀️✨</h2>
          <p className="text-center text-xs text-slate-500">Pon tu nombre y la clave "1234" para entrar</p>
          <input type="text" placeholder="Tu nombre" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs text-slate-900" />
          <input type="password" placeholder="Clave (1234)" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs text-slate-900" />
          {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}
          <button type="submit" className="w-full bg-pink-500 text-white font-black p-3 rounded-xl text-xs">¡Entrar a Clase! 🚀</button>
        </form>
      </div>
    );
  }

  const esProfesora = currentUser.role === "Profesora";
  const targetStudent = esProfesora ? selectedStudent : currentUser.username;

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <header className="bg-purple-900 text-white p-4 flex justify-between items-center shadow-md">
        <div>
          <h1 className="font-black text-sm">Beauty English Salón 🏫</h1>
          <p className="text-[10px] text-pink-300 font-bold">¡Hola, {currentUser.name}! ({currentUser.role})</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setDarkMode(!darkMode)} className="text-xs bg-purple-800 p-1.5 rounded-lg">🌓 Modo</button>
          <button onClick={() => setIsLoggedIn(false)} className="text-xs bg-rose-600 px-2 py-1 rounded-lg">Salir</button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-1">
        <aside className="bg-purple-950 text-white p-4 flex md:flex-col gap-2 overflow-x-auto">
          <button onClick={() => setActiveTab('dashboard')} className={`text-xs font-bold p-2 rounded-xl text-left min-w-[90px] ${activeTab === 'dashboard' ? 'bg-pink-500' : ''}`}>🏠 Inicio</button>
          <button onClick={() => setActiveTab('unit1')} className={`text-xs font-bold p-2 rounded-xl text-left min-w-[90px] ${activeTab === 'unit1' ? 'bg-pink-500' : ''}`}>📦 Unidad 1</button>
          <button onClick={() => setActiveTab('unit2')} className={`text-xs font-bold p-2 rounded-xl text-left min-w-[90px] ${activeTab === 'unit2' ? 'bg-pink-500' : ''}`}>🛍️ Unidad 2</button>
          <button onClick={() => setActiveTab('unit3')} className={`text-xs font-bold p-2 rounded-xl text-left min-w-[90px] ${activeTab === 'unit3' ? 'bg-pink-500' : ''}`}>💬 Unidad 3</button>
          <button onClick={() => setActiveTab('activities')} className={`text-xs font-bold p-2 rounded-xl text-left min-w-[90px] ${activeTab === 'activities' ? 'bg-pink-500' : ''}`}>🎒 Mochila</button>
          <button onClick={() => setActiveTab('gradesTab')} className={`text-xs font-bold p-2 rounded-xl text-left min-w-[90px] ${activeTab === 'gradesTab' ? 'bg-pink-500' : ''}`}>⭐ Notas</button>
          <button onClick={() => setActiveTab('games')} className={`text-xs font-bold p-2 rounded-xl text-left min-w-[90px] bg-amber-500 text-purple-950 ${activeTab === 'games' ? 'ring-2 ring-white' : ''}`}>🕹️ Juegos</button>
        </aside>

        <main className="flex-1 p-4 max-w-3xl mx-auto w-full">
          {activeTab === 'dashboard' && (
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 rounded-2xl text-center space-y-4 shadow-lg">
              <h2 className="text-xl font-black">¡El Salón de la Memoria Compartida funciona! 🧠✨</h2>
              <p className="text-xs">Usa el menú lateral para ver tus clases, jugar o entregar tus PDF.</p>
              <div className="bg-white/10 p-3 rounded-xl max-w-xs mx-auto">
                <p className="text-xs font-bold mb-1">📺 Cámara de video de práctica:</p>
                <input type="file" accept="video/*" onChange={handleVideoUpload} className="text-[10px]" />
                {videoUrl && <video src={videoUrl} controls className="mt-2 w-full rounded" />}
              </div>
            </div>
          )}

          {['unit1', 'unit2', 'unit3'].includes(activeTab) && (
            <div className="space-y-4">
              {modules.filter((_, i) => (activeTab === 'unit1' && i === 0) || (activeTab === 'unit2' && i === 1) || (activeTab === 'unit3' && i === 2)).map(mod => (
                <div key={mod.id} className="space-y-4">
                  <h2 className="text-sm font-black text-purple-600 bg-purple-100 p-2 rounded-lg">{mod.title}</h2>
                  {mod.lessons.map((les, index) => {
                    const taskData = allStudentsTasks[targetStudent]?.[les.taskKey];
                    return (
                      <div key={index} className="border p-4 rounded-xl bg-white dark:bg-slate-900 space-y-2 shadow-sm">
                        <h3 className="text-xs font-black">{les.title}</h3>
                        <p className="text-[11px] italic text-slate-500">{les.objective}</p>
                        <div className="space-y-1">
                          {les.content.map((item, idx) => (
                            <div key={idx} className="text-xs flex items-center justify-between p-1.5 bg-slate-50 dark:bg-slate-800 rounded">
                              <span><b>{item.en}</b></span>
                              <button onClick={() => escucharPalabra(item.en)} className="text-[10px] bg-purple-600 text-white px-1 rounded">🔊</button>
                              <span className="text-slate-400 text-[11px]">{item.es}</span>
                            </div>
                          ))}
                        </div>
                        {les.taskKey && (
                          <div className="p-2 bg-amber-50 dark:bg-slate-800 rounded text-xs">
                            <p className="font-bold text-amber-700">📝 Tarea: {les.task}</p>
                            {esProfesora && <p className="text-[10px] text-purple-600 font-bold">Viendo a: {targetStudent.toUpperCase()}</p>}
                            <div className="mt-2 flex items-center gap-2">
                              {!esProfesora && (
                                <input type="file" accept=".pdf" onChange={(e) => handlePdfUpload(e, les.taskKey, currentUser.username)} className="text-[10px]" />
                              )}
                              {taskData ? (
                                <a href={taskData.url} target="_blank" rel="noreferrer" className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded">👁️ Ver PDF</a>
                              ) : <span className="text-[10px] text-red-500">No entregado</span>}
                            </div>
                            <p className="mt-1 text-[11px] font-bold">Nota actual: {grades[targetStudent]?.[les.taskKey] || '-'} / 10</p>
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
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border space-y-4">
              <h2 className="text-sm font-black">🎒 Centro Global de Tareas</h2>
              {esProfesora && (
                <div className="p-2 bg-purple-100 rounded text-xs text-slate-900">
                  <span>Seleccionar Alumno: </span>
                  <select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)}>
                    {estudiantesLista.map(est => <option key={est.id} value={est.id}>{est.name}</option>)}
                  </select>
                </div>
              )}
              {['clase2', 'clase3', 'clase5', 'clase6'].map(key => {
                const currentTask = allStudentsTasks[targetStudent]?.[key];
                return (
                  <div key={key} className="p-2 bg-slate-50 dark:bg-slate-800 text-xs rounded flex justify-between items-center">
                    <div>
                      <p className="font-bold text-purple-600">Tarea: {key.toUpperCase()}</p>
                      <p className="text-[10px] text-slate-400">Mochila de: {targetStudent}</p>
                    </div>
                    {currentTask ? (
                      <a href={currentTask.url} target="_blank" rel="noreferrer" className="bg-emerald-600 text-white text-[10px] px-2 py-1 rounded">Revisar PDF</a>
                    ) : <span className="text-[10px] text-rose-500">Vacío</span>}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'gradesTab' && (
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border space-y-4">
              <h2 className="text-sm font-black">⭐ Libreta de Calificaciones</h2>
              {esProfesora ? (
                <div className="space-y-2">
                  <select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)} className="text-xs p-1 text-slate-900">
                    {estudiantesLista.map(est => <option key={est.id} value={est.id}>{est.name}</option>)}
                  </select>
                  {['clase2', 'clase3', 'clase5', 'clase6'].map(key => (
                    <div key={key} className="flex justify-between items-center text-xs p-1 border-b">
                      <span>{key.toUpperCase()}</span>
                      <select value={grades[selectedStudent]?.[key] || '-'} onChange={e => asignarNota(selectedStudent, key, e.target.value)} className="text-xs text-slate-900">
                        <option value="-">-</option>
                        {[10,9,8,7,6,5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2 text-xs">
                  {['clase2', 'clase3', 'clase5', 'clase6'].map(key => (
                    <div key={key} className="flex justify-between p-2 bg-purple-50 dark:bg-slate-800 rounded">
                      <span>Tarea {key.toUpperCase()}</span>
                      <span className="font-black text-purple-600">{grades[currentUser.username]?.[key] || '-'} / 10</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'games' && (
            <div className="grid grid-cols-2 gap-2">
              <div className="border p-3 rounded-xl text-center bg-purple-50 dark:bg-slate-800">
                <p className="text-xs font-black">🎯 Laberinto Saludos</p>
                <a href="https://wordwall.net/es/resource/115823970" target="_blank" rel="noreferrer" className="inline-block mt-2 text-[10px] bg-purple-600 text-white px-2 py-1 rounded">¡Jugar!</a>
              </div>
              <div className="border p-3 rounded-xl text-center bg-pink-50 dark:bg-slate-800">
                <p className="text-xs font-black">🧪 Keratina Game</p>
                <a href="https://interacty.me/projects/e502cc8626a13026" target="_blank" rel="noreferrer" className="inline-block mt-2 text-[10px] bg-pink-500 text-white px-2 py-1 rounded">¡Jugar!</a>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
