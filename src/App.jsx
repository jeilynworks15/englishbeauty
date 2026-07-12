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
  DownloadCloud,
  Trash2,
  PlayCircle,
  Search,
  CheckCircle2,
  Heart,
  UploadCloud,
  Video,
  Link
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
  const [searchTerm, setSearchTerm] = useState('');
  const [activeVocabFilter, setActiveVocabFilter] = useState('todos');

  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    claseKey: null,
    studentUser: null
  });

  // Alerta mágica personalizada
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success' // 'success' o 'error'
  });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4000);
  };

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

  // Video de Bienvenida
  const [welcomingVideo, setWelcomingVideo] = useState(() => {
    const saved = localStorage.getItem('beauty_salon_welcoming_video');
    return saved ? JSON.parse(saved) : { type: 'url', source: 'https://www.youtube.com/embed/dQw4w9WgXcQ' };
  });
  const [videoInputUrl, setVideoInputUrl] = useState('');
  const [uploadingVideo, setUploadingVideo] = useState(false);

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
      // 1. Traer tareas
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

      // 2. Traer notas
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

      // 3. Traer video de bienvenida desde tabla configuraciones
      const { data: videoDB, error: err3 } = await supabase.from('configuracion').select('*').eq('clave', 'welcoming_video');
      if (!err3 && videoDB && videoDB.length > 0) {
        const videoData = JSON.parse(videoDB[0].valor);
        setWelcomingVideo(videoData);
        localStorage.setItem('beauty_salon_welcoming_video', JSON.stringify(videoData));
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
            showToast("Ocurrió un error al subir tu tarea. 😢", "error");
          } else {
            showToast("¡Qué felicidad! Tu tarea PDF voló con éxito a Supabase. ☁️✨", "success");
            descargarDeSupabase();
          }
        };
        reader.readAsDataURL(file);
      } else {
        showToast("Por favor, sube únicamente un archivo PDF. 📂", "error");
      }
    }
  };

  const openDeleteConfirmModal = (claseKey, studentUser) => {
    setDeleteConfirm({
      show: true,
      claseKey,
      studentUser
    });
  };

  const handlePdfDeleteConfirmed = async () => {
    if (!supabase || !deleteConfirm.claseKey || !deleteConfirm.studentUser) return;

    setLoadingCloud(true);
    const { error } = await supabase
      .from('tareas')
      .delete()
      .match({ estudiante: deleteConfirm.studentUser, clase: deleteConfirm.claseKey });
    setLoadingCloud(false);

    setDeleteConfirm({ show: false, claseKey: null, studentUser: null });

    if (error) {
      console.error("Error al borrar el archivo:", error);
      showToast("No pudimos borrar el archivo de Supabase. 😿", "error");
    } else {
      showToast("¡La maleta está limpia! Tarea borrada de la nube. 🗑️🌸", "success");
      descargarDeSupabase();
    }
  };

  const enviarNotaASupabase = async (estudiante, claseKey, notaSeleccionada, comentarioEscrito) => {
    if (!supabase) return;
    const { error } = await supabase.from('calificaciones').upsert(
      { estudiante: estudiante, clase: claseKey, nota: notaSeleccionada, comentario: comentarioEscrito },
      { onConflict: 'estudiante,clase' }
    );
    if (!error) {
      showToast("¡Calificación guardada y sincronizada! ⭐", "success");
      descargarDeSupabase();
    } else {
      showToast("Error al guardar la calificación. 😢", "error");
    }
  };

  const handleUrlVideoSave = async () => {
    if (!videoInputUrl.trim()) {
      showToast("Escribe una dirección URL válida para el video. 🎬", "error");
      return;
    }

    let processedUrl = videoInputUrl.trim();
    // Convertir enlaces normales de youtube a formato embed
    if (processedUrl.includes('youtube.com/watch?v=')) {
      const videoId = processedUrl.split('v=')[1]?.split('&')[0];
      processedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (processedUrl.includes('youtu.be/')) {
      const videoId = processedUrl.split('youtu.be/')[1]?.split('?')[0];
      processedUrl = `https://www.youtube.com/embed/${videoId}`;
    }

    const videoData = { type: 'url', source: processedUrl };
    setWelcomingVideo(videoData);
    localStorage.setItem('beauty_salon_welcoming_video', JSON.stringify(videoData));

    if (supabase) {
      setLoadingCloud(true);
      const { error } = await supabase.from('configuracion').upsert(
        { clave: 'welcoming_video', valor: JSON.stringify(videoData) },
        { onConflict: 'clave' }
      );
      setLoadingCloud(false);
      if (!error) {
        showToast("¡Cine Mágico actualizado! El video ahora es visible para todos. 🎬🍿", "success");
      } else {
        showToast("Video guardado localmente, error de nube.", "success");
      }
    } else {
      showToast("Video guardado de forma local en tu navegador.", "success");
    }
    setVideoInputUrl('');
  };

  const handleVideoFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) { // límite de 15MB para base64
        showToast("Este video es muy gigante. Para videos grandes usa un enlace de YouTube. 🦕", "error");
        return;
      }

      setUploadingVideo(true);
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64String = event.target.result;
        const videoData = { type: 'base64', source: base64String };
        
        setWelcomingVideo(videoData);
        localStorage.setItem('beauty_salon_welcoming_video', JSON.stringify(videoData));

        if (supabase) {
          const { error } = await supabase.from('configuracion').upsert(
            { clave: 'welcoming_video', valor: JSON.stringify(videoData) },
            { onConflict: 'clave' }
          );
          if (!error) {
            showToast("¡Video de bienvenida subido y guardado de forma permanente! 📺🎀", "success");
          } else {
            showToast("Subido localmente. ¡Nube ocupada!", "success");
          }
        } else {
          showToast("Subido localmente con éxito.", "success");
        }
        setUploadingVideo(false);
      };
      reader.readAsDataURL(file);
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
      title: "UNIDAD 1: WELCOME TO THE CLIENT (BIENVENIDA) 🚪✨",
      color: "from-pink-400 to-rose-400",
      lessons: [
        { 
          title: "CLASE 1: Greetings (Saludos para recibir al cliente) 👋🎀", 
          objective: "Objetivo: Al finalizar la clase, podrás saludar y recibir a un cliente en inglés utilizando expresiones básicas de nuestro salón.",
          content: [
            { en: "Hello! / Hi!", es: "Hola" },
            { en: "Good morning.", es: "Buenos días" },
            { en: "Good afternoon.", es: "Buenas tardes" },
            { en: "Welcome!", es: "¡Bienvenido(a)!" },
            { en: "How are you?", es: "¿Cómo está?" },
            { en: "My name is...", es: "Mi nombre es..." },
            { en: "Nice to meet you.", es: "Mucho gusto." },
            { en: "Please, have a seat.", es: "Por favor, tome asiento." }
          ],
          gameUrl: "https://wordwall.net/es/resource/115823970",
          task: "Role-Play en Parejas: Estilista da la bienvenida y el Cliente responde amablemente."
        },
        { 
          title: "CLASE 2: Explain the Keratin Process (Explicar el proceso) 🧪🧬", 
          objective: "Objetivo: Al finalizar la clase, podrás explicar de forma sencilla el proceso de un tratamiento de keratina utilizando conectores básicos de secuencia.",
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
      title: "UNIDAD 2: GIVING INFORMATION (BRINDAR INFORMACIÓN) 📢🌸",
      color: "from-purple-400 to-pink-400",
      lessons: [
        { 
          title: "CLASE 3: Aftercare Instructions (Instrucciones de cuidado) 🧴💧", 
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
          title: "CLASE 4: Price and Time (Hablar sobre Precio y Tiempo) 💰⏳", 
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
      title: "UNIDAD 3: CUSTOMER INTERACTION (INTERACTUAR CON EL CLIENTE) 💬🧸",
      color: "from-fuchsia-400 to-purple-400",
      lessons: [
        {
          title: "CLASE 5: Conversar con el Cliente (Preguntas previas) 💇‍♂️🔍",
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
          title: "CLASE 6: Despedir al Cliente de manera amable 👋💖✨",
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

  const fullVocabList = [
    { en: "Hello! / Hi!", es: "Hola", cat: "saludos" },
    { en: "Good morning.", es: "Buenos días", cat: "saludos" },
    { en: "Good afternoon.", es: "Buenas tardes", cat: "saludos" },
    { en: "Welcome!", es: "¡Bienvenido(a)!", cat: "saludos" },
    { en: "How are you?", es: "¿Cómo está?", cat: "saludos" },
    { en: "My name is...", es: "Mi nombre es...", cat: "saludos" },
    { en: "Nice to meet you.", es: "Mucho gusto.", cat: "saludos" },
    { en: "Please, have a seat.", es: "Por favor, tome asiento.", cat: "saludos" },
    { en: "Today, we will do a keratin treatment.", es: "Hoy, haremos un tratamiento de keratina.", cat: "proceso" },
    { en: "First, we wash your hair.", es: "Primero, lavamos tu cabello.", cat: "proceso" },
    { en: "Then, we dry your hair.", es: "Luego, secamos tu cabello.", cat: "proceso" },
    { en: "Next, we apply the keratin.", es: "Después, aplicamos la keratina.", cat: "proceso" },
    { en: "Finally, we use the flat iron.", es: "Finalmente, usamos la plancha.", cat: "proceso" },
    { en: "Please, don't move.", es: "Por favor, no se mueva.", cat: "cuidados" },
    { en: "Please, wait a moment.", es: "Espere un momento.", cat: "cuidados" },
    { en: "Don't wash your hair for 3 days.", es: "No lave su cabello durante 3 días.", cat: "cuidados" },
    { en: "Don't tie your hair.", es: "No se recoja el cabello.", cat: "cuidados" },
    { en: "The price is $40.", es: "El precio es $40.", cat: "precio" },
    { en: "The treatment takes around two hours.", es: "The treatment takes around two hours.", cat: "precio" },
    { en: "You can pay by cash.", es: "Puede pagar en efectivo.", cat: "precio" },
    { en: "Is this your first keratin treatment?", es: "¿Es este su primer tratamiento de keratina?", cat: "interaccion" },
    { en: "Do you have any allergies?", es: "¿Tiene alguna alergia?", cat: "interaccion" },
    { en: "Is your hair colored?", es: "¿Su cabello está teñido?", cat: "interaccion" },
    { en: "Thank you for coming.", es: "Gracias por venir.", cat: "despedida" },
    { en: "Have a nice day.", es: "Que tenga un buen día.", cat: "despedida" },
    { en: "We hope to see you again.", es: "Esperamos verla nuevamente.", cat: "despedida" }
  ];

  const filteredVocab = fullVocabList.filter(item => {
    const matchesSearch = item.en.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.es.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeVocabFilter === 'todos' || item.cat === activeVocabFilter;
    return matchesSearch && matchesCategory;
  });

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
      showToast(`¡Bienvenida de vuelta al aula mágica, ${account.name}! ✨`, "success");
      return;
    }
    setError('Credenciales incorrectas o usuario no registrado.');
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  if (!isLoggedIn || !currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-tr from-pink-200 via-purple-100 to-pink-300 flex flex-col items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-sm w-full space-y-5 border border-pink-200 relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-pink-300/30 rounded-full blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-purple-300/30 rounded-full blur-xl"></div>

          <div className="text-center">
            <span className="text-5xl animate-bounce inline-block">💇‍♀️✨</span>
            <h2 className="text-3xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mt-2">Beauty English</h2>
            <p className="text-xs font-black text-pink-500 tracking-widest uppercase">Aula Virtual Mágica 🌸</p>
          </div>
          <div className="space-y-3">
            <input 
              type="text" 
              placeholder="Tu Nombre de Usuario" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              className="w-full p-3.5 border border-pink-200 rounded-2xl text-slate-950 font-bold bg-white outline-none focus:ring-2 focus:ring-pink-400 transition-all text-xs" 
            />
            <input 
              type="password" 
              placeholder="Tu Contraseña Secreta" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full p-3.5 border border-pink-200 rounded-2xl text-slate-950 font-bold bg-white outline-none focus:ring-2 focus:ring-pink-400 transition-all text-xs" 
            />
          </div>
          {error && <p className="text-red-500 text-[10px] font-black text-center bg-red-50 p-2 rounded-xl border border-red-100">{error}</p>}
          <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-black py-4 rounded-2xl text-xs shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
            ¡Ingresar al Aula Mágica! 🚀🌸
          </button>
        </form>
      </div>
    );
  }

  const esProfesora = currentUser.role === "Profesora";
  const targetStudent = esProfesora ? selectedStudent : currentUser.username;

  return (
    <div className={`min-h-screen font-sans flex flex-col ${darkMode ? 'bg-slate-950 text-white' : 'bg-pink-50/20 text-slate-900'}`}>
      
      {/* HEADER DE PRINCESAS */}
      <header className={`border-b h-16 flex items-center justify-between px-6 shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-pink-100'}`}>
        <div className="flex items-center space-x-2">
          <GraduationCap className="text-pink-600 animate-pulse" size={24} />
          <span className="font-black text-slate-950 dark:text-white text-sm flex items-center gap-1">
            Beauty English Course <span className="text-pink-500">👩‍🏫✨</span>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl transition-all active:scale-95">
            {darkMode ? <Sun size={15} className="text-yellow-400" /> : <Moon size={15} className="text-slate-700" />}
          </button>
          <span className="text-[10px] font-black text-slate-950 dark:text-pink-300 uppercase bg-pink-100 dark:bg-slate-800 px-3 py-2 rounded-xl flex items-center gap-1 border border-pink-200 dark:border-slate-700 shadow-sm">
            <Smile size={12} className="text-pink-600 animate-bounce" /> {currentUser.name} ({currentUser.role})
          </span>
          <button onClick={handleLogout} className="text-[10px] bg-red-100 hover:bg-red-200 text-red-700 font-bold px-3 py-2 rounded-xl flex items-center gap-1 active:scale-95 transition-all">
            <LogOut size={12} /> Salir
          </button>
        </div>
      </header>

      {/* CUERPO DEL CASTILLO */}
      <div className="flex flex-1 flex-col md:flex-row">
        
        {/* MENÚ DE ACCIONES */}
        <aside className={`w-full md:w-56 p-4 flex flex-col gap-1.5 ${darkMode ? 'bg-slate-900' : 'bg-white border-r border-pink-100'}`}>
          <div className="text-[10px] uppercase tracking-wider font-black text-pink-500 mb-2 px-3 flex items-center gap-1">
            <Heart size={10} className="fill-pink-500 text-pink-500" /> Menú Principal
          </div>
          
          <button 
            onClick={() => setActiveTab('inicio')} 
            className={`w-full text-left px-3.5 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'inicio' ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md transform scale-102' : 'text-slate-950 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-800'}`}
          >
            <Home size={14} /> Inicio 🏠
          </button>

          <button 
            onClick={() => setActiveTab('unit1')} 
            className={`w-full text-left px-3.5 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'unit1' ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md transform scale-102' : 'text-slate-950 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-800'}`}
          >
            <BookOpen size={14} /> Unidad 1: Welcome 🚪
          </button>

          <button 
            onClick={() => setActiveTab('unit2')} 
            className={`w-full text-left px-3.5 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'unit2' ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md transform scale-102' : 'text-slate-950 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-800'}`}
          >
            <BookOpen size={14} /> Unidad 2: Info 📢
          </button>

          <button 
            onClick={() => setActiveTab('unit3')} 
            className={`w-full text-left px-3.5 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'unit3' ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md transform scale-102' : 'text-slate-950 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-800'}`}
          >
            <BookOpen size={14} /> Unidad 3: Client 💬
          </button>

          <button 
            onClick={() => setActiveTab('mochila')} 
            className={`w-full text-left px-3.5 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'mochila' ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md transform scale-102' : 'text-slate-950 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-800'}`}
          >
            <FolderHeart size={14} /> Mochila de Tareas 🎒
          </button>

          <button 
            onClick={() => setActiveTab('calificaciones')} 
            className={`w-full text-left px-3.5 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'calificaciones' ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md transform scale-102' : 'text-slate-950 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-800'}`}
          >
            <Star size={14} /> Calificaciones ⭐
          </button>

          <button 
            onClick={() => setActiveTab('vocabulario')} 
            className={`w-full text-left px-3.5 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'vocabulario' ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md transform scale-102' : 'text-slate-950 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-800'}`}
          >
            <Volume2 size={14} /> Vocabulario 🔊
          </button>

          <button 
            onClick={() => setActiveTab('juegos')} 
            className={`w-full text-left px-3.5 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'juegos' ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md transform scale-102' : 'text-slate-950 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-800'}`}
          >
            <Gamepad2 size={14} /> Área de Juegos 🎮
          </button>

          <div className="border-t border-slate-200 dark:border-slate-800 my-4 pt-4">
            <button onClick={descargarDeSupabase} className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-950 dark:text-white text-[10px] font-black py-2.5 rounded-xl flex items-center justify-center gap-1 active:scale-95 transition-all shadow-sm">
               🔄 Sincronizar Nube ☁️
            </button>
          </div>
        </aside>

        {/* PANTALLA PRINCIPAL */}
        <main className="flex-1 p-6 max-w-4xl w-full mx-auto">
          {loadingCloud && (
            <div className="text-center p-2 mb-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black rounded-2xl text-[10px] animate-pulse flex items-center justify-center gap-1 shadow-md">
              ☁️ Trayendo la magia directamente de internet...
            </div>
          )}
          
          {/* TAB: INICIO */}
          {activeTab === 'inicio' && (
            <div className="space-y-5 animate-slide-in">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 rounded-3xl text-white shadow-lg relative overflow-hidden">
                <Sparkles className="absolute right-4 top-4 text-pink-200 animate-spin" size={48} />
                <h1 className="text-2xl font-black">¡Bienvenida de vuelta, {currentUser.name}! 💇‍♀️✨</h1>
                <p className="text-xs mt-1.5 font-bold">¡Toda la magia del diseño, del vocabulario y tus juegos ha regresado! Aquí tienes tus carpetas de clases, tu mochila conectada a la nube, y tu reproductor de cine.</p>
              </div>

              {/* SECCIÓN REPRODUCTOR DE VIDEO DE BIENVENIDA */}
              <div className="bg-white dark:bg-slate-900 border border-pink-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-4">
                <h2 className="text-sm font-black text-pink-600 tracking-wider uppercase flex items-center gap-2">
                  <Video className="text-pink-600 animate-pulse" size={18} />
                  Cine Mágico: Video de Bienvenida 🎬🌸
                </h2>
                <p className="text-[11px] text-slate-500 font-bold">¡Mira este súper video para aprender con alegría todo lo que tenemos hoy!</p>

                {/* VISUALIZADOR DE VIDEO */}
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border-4 border-pink-100 dark:border-slate-800 shadow-md">
                  {welcomingVideo.type === 'url' ? (
                    processedVideoUrl(welcomingVideo.source) ? (
                      <iframe 
                        className="w-full h-full" 
                        src={processedVideoUrl(welcomingVideo.source)} 
                        title="Welcome Video" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <video className="w-full h-full" src={welcomingVideo.source} controls></video>
                    )
                  ) : (
                    <video className="w-full h-full" src={welcomingVideo.source} controls></video>
                  )}
                </div>

                {/* CONTROLES PARA PROFESORAS */}
                {esProfesora && (
                  <div className="p-4 bg-pink-50/50 dark:bg-slate-800/40 rounded-2xl border border-pink-100 dark:border-slate-700/50 space-y-3">
                    <span className="text-[10px] font-black uppercase text-pink-600 tracking-wider flex items-center gap-1">
                      🛠️ Zona de Profesora: Actualizar Video
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Subida por Enlace */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                          <Link size={10} /> Enlace del Video (YouTube):
                        </label>
                        <div className="flex gap-1.5">
                          <input 
                            type="text" 
                            placeholder="https://www.youtube.com/watch?..." 
                            value={videoInputUrl}
                            onChange={(e) => setVideoInputUrl(e.target.value)}
                            className="flex-1 p-2 border border-pink-200 rounded-xl bg-white text-slate-950 font-bold text-xs outline-none"
                          />
                          <button 
                            onClick={handleUrlVideoSave}
                            className="bg-pink-600 hover:bg-pink-700 text-white font-black text-[10px] px-3 rounded-xl shadow-sm"
                          >
                            Guardar Enlace 🔗
                          </button>
                        </div>
                      </div>

                      {/* Subida por Archivo */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                          <UploadCloud size={10} /> Subir Video (.mp4 max 15MB):
                        </label>
                        <label className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded-xl font-black cursor-pointer shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1 text-[10px]">
                          {uploadingVideo ? "Subiendo video... ☁️" : "Buscar Video de mi Computadora 🖥️"}
                          <input 
                            type="file" 
                            accept="video/mp4" 
                            disabled={uploadingVideo}
                            onChange={handleVideoFileChange} 
                            className="hidden" 
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-900 border border-pink-100 dark:border-slate-800 p-5 rounded-3xl shadow-sm">
                  <h3 className="font-black text-xs text-pink-600 mb-2 flex items-center gap-1">📢 Instrucciones Mágicas</h3>
                  <ul className="text-[11px] space-y-2 text-slate-600 dark:text-slate-300 font-bold">
                    <li className="flex items-center gap-1.5">🌸 <span className="text-pink-500">Unidades:</span> Escucha la pronunciación en inglés haciendo clic en el parlante rosa.</li>
                    <li className="flex items-center gap-1.5">🎒 <span className="text-pink-500">Mochila:</span> Sube tus PDFs. ¡Y si eres estudiante y te equivocas, usa el nuevo botón de eliminar!</li>
                    <li className="flex items-center gap-1.5">🎮 <span className="text-pink-500">Juegos:</span> Juega en los 4 tableros interactivos para ganar estrellitas.</li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-pink-100 dark:border-slate-800 p-5 rounded-3xl flex flex-col justify-between shadow-sm">
                  <div>
                    <h3 className="font-black text-xs text-purple-600 mb-1 flex items-center gap-1">🎮 Zona Interactiva</h3>
                    <p className="text-[11px] text-slate-500 font-bold">Diviértete con los juegos interactivos de Kahoot, Interacty y Wordwall que diseñamos.</p>
                  </div>
                  <button onClick={() => setActiveTab('juegos')} className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs font-black py-2.5 rounded-2xl shadow-md active:scale-95 transition-all">
                    ¡Ir a los Juegos ahora! 🎮✨
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB DE UNIDADES DE CLASE */}
          {['unit1', 'unit2', 'unit3'].map((tabKey, tabIdx) => {
            if (activeTab !== tabKey) return null;
            const currentModule = modules[tabIdx];

            return (
              <div key={tabKey} className="space-y-5 animate-slide-in">
                <h2 className="text-sm font-black text-pink-600 tracking-widest uppercase border-b pb-2 border-pink-100 dark:border-slate-800 flex items-center gap-2">
                  <span className="p-1 bg-pink-100 rounded-lg text-pink-600"><BookOpen size={14} /></span>
                  {currentModule.title}
                </h2>
                
                {currentModule.lessons.map((lesson, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 border border-pink-100 dark:border-slate-800 p-5 rounded-3xl space-y-4 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-pink-500 to-purple-500"></div>
                    
                    <div className="border-b pb-2 dark:border-slate-800">
                      <h3 className="text-xs font-black text-slate-950 dark:text-white uppercase flex items-center gap-1">{lesson.title}</h3>
                      <p className="text-[10px] text-pink-600 font-black mt-1 bg-pink-50 dark:bg-slate-800/50 w-max px-2.5 py-1 rounded-full">{lesson.objective}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {lesson.content.map((item, keyIdx) => (
                        <div key={keyIdx} className="flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-700/50 hover:border-pink-200 transition-all">
                          <div className="flex items-center space-x-2">
                            <button onClick={() => escucharPalabra(item.en)} className="p-2 bg-pink-100 hover:bg-pink-200 text-pink-700 dark:bg-slate-700 dark:text-pink-300 rounded-xl transition-all active:scale-90 shadow-sm">
                              <Volume2 size={12} />
                            </button>
                            <span className="text-xs font-black text-slate-950 dark:text-white">{item.en}</span>
                          </div>
                          <span className="text-[10px] font-black text-slate-500">{item.es}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 bg-pink-50/30 dark:bg-slate-800/30 rounded-2xl border border-pink-100/50 dark:border-slate-700 text-[10px]">
                      <p className="font-black text-pink-600 flex items-center gap-1">🎯 Actividad Evaluativa:</p>
                      <p className="font-bold text-slate-600 dark:text-slate-300 mt-1 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-pink-50 shadow-sm">{lesson.task}</p>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}

          {/* TAB: MOCHILA DE TAREAS */}
          {activeTab === 'mochila' && (
            <div className="bg-white dark:bg-slate-900 border border-pink-200 dark:border-slate-800 p-6 rounded-3xl space-y-4 animate-slide-in shadow-sm">
              <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-2">
                  <FolderHeart className="text-pink-600 animate-bounce" size={20} />
                  <h2 className="text-xs font-black text-slate-950 dark:text-white uppercase tracking-wider">MOCHILA DE TAREAS EN LA NUBE</h2>
                </div>
                {esProfesora && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-500">Estudiante:</span>
                    <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} className="text-xs font-bold p-1.5 rounded-xl bg-white text-slate-950 border border-pink-300 outline-none">
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
                    <div key={key} className="bg-pink-50/50 dark:bg-slate-800/80 p-4 rounded-3xl border border-pink-100 dark:border-slate-700 text-xs text-slate-950 dark:text-white space-y-3">
                      <p className="font-black text-pink-700 dark:text-pink-400 flex items-center gap-1">🎯 {infoTareas[key]}</p>
                      <p className="text-[10px] text-slate-500 font-bold">Mochila de: <span className="uppercase text-pink-600 font-black">{targetStudent}</span></p>
                      
                      <div className="flex flex-wrap gap-2 items-center">
                        {!esProfesora && (
                          <label className="bg-pink-600 hover:bg-pink-700 text-white px-3.5 py-2 rounded-xl font-black cursor-pointer shadow-sm active:scale-95 transition-all flex items-center gap-1 text-[10px]">
                            Subir PDF de Tarea ☁️
                            <input type="file" accept=".pdf" onChange={(e) => handlePdfUpload(e, key, currentUser.username)} className="hidden" />
                          </label>
                        )}
                        {taskData ? (
                          <>
                            <a href={taskData.url} download={taskData.name} className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl font-black shadow-sm transition-all flex items-center gap-1 text-[10px]">
                              <DownloadCloud size={12} /> Descargar PDF enviado 👁️
                            </a>
                            
                            {/* BOTÓN MAGICO DE BORRAR PDF TAREA - ¡SÓLO PARA ESTUDIANTES! */}
                            {!esProfesora && (
                              <button 
                                onClick={() => openDeleteConfirmModal(key, targetStudent)} 
                                className="bg-red-500 hover:bg-red-600 text-white px-3.5 py-2 rounded-xl font-black shadow-sm transition-all flex items-center gap-1 text-[10px] active:scale-95"
                              >
                                <Trash2 size={12} /> Eliminar PDF 🗑️
                              </button>
                            )}
                          </>
                        ) : (
                          <span className="text-slate-400 font-bold italic text-[10px]">Aún no has subido tu PDF</span>
                        )}
                      </div>

                      <div className="border-t pt-2 border-pink-200 dark:border-slate-700 flex justify-between items-center flex-wrap gap-2">
                        <span className="font-black text-pink-700 dark:text-pink-300">⭐ Nota: {gradeData.nota} / 10</span>
                        {gradeData.comentario && (
                          <p className="bg-white dark:bg-slate-900 p-2.5 rounded-2xl border text-slate-950 dark:text-slate-200 font-bold italic w-full">
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

          {/* TAB: CALIFICACIONES */}
          {activeTab === 'calificaciones' && (
            <div className="bg-white dark:bg-slate-900 border border-pink-200 dark:border-slate-800 p-6 rounded-3xl space-y-4 shadow-sm animate-slide-in">
              <div className="flex items-center space-x-2 border-b pb-2 border-slate-200 dark:border-slate-700">
                <Star className="text-amber-500 fill-amber-500 animate-spin" size={20} />
                <h2 className="text-xs font-black text-slate-950 dark:text-white uppercase tracking-wider">CALIFICACIONES EN TIEMPO REAL</h2>
              </div>

              {esProfesora ? (
                <div className="space-y-4">
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-between">
                    <span className="text-xs font-black text-slate-950 dark:text-white">Estudiante a Calificar:</span>
                    <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} className="text-xs font-bold p-1.5 rounded-xl bg-white text-slate-950 border">
                      {estudiantesLista.map(est => <option key={est.id} value={est.id}>{est.name}</option>)}
                    </select>
                  </div>

                  {['clase2', 'clase3', 'clase5', 'clase6'].map(key => {
                    const currentRecord = grades[selectedStudent]?.[key] || { nota: '-', comentario: '' };
                    return (
                      <div key={key} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3">
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
                          placeholder="Escribe un comentario que el estudiante pueda ver en su cuenta..." 
                          className="w-full p-2.5 text-xs text-slate-950 font-bold border rounded-2xl bg-white outline-none"
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
                      <div key={key} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-3xl border text-xs text-slate-950 dark:text-white space-y-2 relative overflow-hidden">
                        <div className="flex justify-between items-start">
                          <span className="font-black max-w-md">{infoTareas[key]}</span>
                          <span className="bg-pink-600 text-white px-2.5 py-1 rounded-lg font-black text-[10px]">Nota: {record.nota} / 10</span>
                        </div>
                        {record.comentario && (
                          <p className="bg-white dark:bg-slate-900 p-2.5 rounded-2xl border border-pink-100 font-bold italic text-slate-950 dark:text-slate-200">
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
            <div className="bg-white dark:bg-slate-900 border border-pink-200 dark:border-slate-800 p-6 rounded-3xl space-y-5 animate-slide-in shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-700 gap-3">
                <div className="flex items-center space-x-2">
                  <Volume2 className="text-pink-600 animate-pulse" size={20} />
                  <h2 className="text-xs font-black text-slate-950 dark:text-white uppercase tracking-wider">DICCIONARIO INTERACTIVO PARLANTE 👋🔊</h2>
                </div>
                {/* BARRA DE BÚSQUEDA INTERACTIVA */}
                <div className="relative flex items-center">
                  <input 
                    type="text" 
                    placeholder="Buscar palabra..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-3 py-1.5 border border-pink-200 rounded-xl bg-white text-slate-950 font-bold text-xs outline-none focus:ring-1 focus:ring-pink-400 w-full"
                  />
                  <Search className="absolute left-2.5 text-slate-400" size={13} />
                </div>
              </div>

              {/* FILTROS DE CATEGORÍA CON COLORES PASTEL */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'todos', name: 'Todos ✨', color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300' },
                  { id: 'saludos', name: 'Saludos 👋', color: 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300' },
                  { id: 'proceso', name: 'Proceso 🧪', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' },
                  { id: 'cuidados', name: 'Cuidados 🧴', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' },
                  { id: 'precio', name: 'Precio 💰', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' },
                  { id: 'interaccion', name: 'Preguntas 💇‍♂️', color: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300' },
                  { id: 'despedida', name: 'Despedida 💖', color: 'bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveVocabFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition-all ${activeVocabFilter === cat.id ? 'bg-pink-600 text-white shadow-sm' : `${cat.color} hover:opacity-80`}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto pr-1">
                {filteredVocab.map((item, i) => (
                  <div key={i} className="flex justify-between items-center bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700/80 hover:scale-[1.01] transition-all">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => escucharPalabra(item.en)} className="p-2 bg-pink-600 hover:bg-pink-700 text-white rounded-xl transition-all active:scale-90 shadow-sm">
                        <Volume2 size={13} />
                      </button>
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-950 dark:text-white">{item.en}</span>
                        <span className="text-[8px] bg-pink-100 dark:bg-slate-700 text-pink-700 dark:text-pink-300 w-max px-1.5 rounded-md font-bold mt-0.5 uppercase">{item.cat}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-500">🗣️ {item.es}</span>
                  </div>
                ))}
                {filteredVocab.length === 0 && (
                  <p className="text-center text-xs font-bold text-slate-400 py-4">No se encontraron palabras 🌸</p>
                )}
              </div>
            </div>
          )}

          {/* TAB: JUEGOS */}
          {activeTab === 'juegos' && (
            <div className="bg-white dark:bg-slate-900 border border-pink-200 dark:border-slate-800 p-6 rounded-3xl space-y-4 animate-slide-in shadow-sm">
              <div className="flex items-center space-x-2 border-b pb-4 border-slate-200 dark:border-slate-700">
                <Gamepad2 className="text-purple-600 animate-bounce" size={20} />
                <h2 className="text-xs font-black text-slate-950 dark:text-white uppercase tracking-wider">ÁREA DE JUEGOS 🎮✨</h2>
              </div>
              <p className="text-[11px] text-slate-500 font-bold">¡Haz clic en cualquiera de los juegos para repasar y divertirte al máximo!</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <a href="https://wordwall.net/es/resource/115823970" target="_blank" rel="noopener noreferrer" className="block p-4 bg-purple-50 hover:bg-purple-100 dark:bg-slate-800 rounded-3xl border border-purple-200 dark:border-slate-700 transition-all active:scale-95 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <PlayCircle className="text-purple-600 animate-pulse" size={16} />
                    <span className="text-xs font-black text-purple-700 dark:text-purple-300">Juego 1: Wordwall 👋</span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-1">Greetings & Saludos iniciales para recibir clientes de forma alegre.</span>
                </a>

                <a href="https://interacty.me/projects/e502cc8626a13026" target="_blank" rel="noopener noreferrer" className="block p-4 bg-pink-50 hover:bg-pink-100 dark:bg-slate-800 rounded-3xl border border-pink-200 dark:border-slate-700 transition-all active:scale-95 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <PlayCircle className="text-pink-600 animate-pulse" size={16} />
                    <span className="text-xs font-black text-pink-700 dark:text-pink-300">Juego 2: Interacty 🧪</span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-1">Keratin Process Challenge y orden correcto de los pasos.</span>
                </a>

                <a href="https://wordwall.net/es/resource/116065664" target="_blank" rel="noopener noreferrer" className="block p-4 bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 rounded-3xl border border-blue-200 dark:border-slate-700 transition-all active:scale-95 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <PlayCircle className="text-blue-600 animate-pulse" size={16} />
                    <span className="text-xs font-black text-blue-700 dark:text-blue-300">Juego 3: Wordwall Aftercare 🧴</span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-1">Cuidado posterior y recomendaciones cruciales al cliente.</span>
                </a>

                <a href="https://create.kahoot.it/share/class-5/16e72ba0-e8fc-4910-9400-b7a3c94c3586" target="_blank" rel="noopener noreferrer" className="block p-4 bg-amber-50 hover:bg-amber-100 dark:bg-slate-800 rounded-3xl border border-amber-200 dark:border-slate-700 transition-all active:scale-95 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <PlayCircle className="text-amber-600 animate-pulse" size={16} />
                    <span className="text-xs font-black text-amber-700 dark:text-amber-300">Juego 4: Kahoot Price & Time 💰</span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-1">Preguntas y respuestas sobre precios y métodos de pago del salón.</span>
                </a>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* MODAL DE CONFIRMACIÓN DE BORRADO DE PDF (PERSONALIZADO DE HADAS) */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-slide-in">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl max-w-sm w-full border border-pink-300 dark:border-pink-800 shadow-2xl text-center space-y-4">
            <span className="text-4xl animate-bounce inline-block">🧹✨</span>
            <h3 className="font-black text-sm text-slate-950 dark:text-white">¿Quieres borrar esta tarea para subir otra?</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold">¡Tu antigua tarea desaparecerá de la nube de Supabase!</p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={handlePdfDeleteConfirmed}
                className="bg-red-500 hover:bg-red-600 text-white font-black text-xs px-4 py-2 rounded-xl active:scale-95 transition-all shadow-md"
              >
                Sí, Borrar 🗑️
              </button>
              <button
                onClick={() => setDeleteConfirm({ show: false, claseKey: null, studentUser: null })}
                className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-white font-black text-xs px-4 py-2 rounded-xl active:scale-95 transition-all"
              >
                No, Dejarla 🌸
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICACIÓN MÁGICA */}
      {toast.show && (
        <div className="fixed bottom-5 right-5 z-50 animate-slide-in">
          <div className={`p-4 rounded-2xl shadow-xl flex items-center gap-2 border text-xs font-black ${toast.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-slate-900 dark:text-emerald-400' : 'bg-red-50 text-red-800 border-red-200 dark:bg-slate-900 dark:text-red-400'}`}>
            <Sparkles className={toast.type === 'success' ? 'text-emerald-600 animate-spin' : 'text-red-500'} size={15} />
            {toast.message}
          </div>
        </div>
      )}

    </div>
  );
}

// Función auxiliar para procesar URLs de video de YouTube
function processedVideoUrl(url) {
  if (!url) return null;
  if (url.includes('youtube.com/embed/')) return url;
  if (url.includes('youtube.com/watch?v=')) {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return null;
}