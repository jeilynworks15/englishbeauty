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
  Heart,
  UploadCloud,
  Video,
  Link,
  Music,
  Send,
  Mic,
  Award,
  HelpCircle,
  Sparkle,
  Activity
} from 'lucide-react';

const SUPABASE_URL = 'https://fiuphtskrnwdftsrspip.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpdXBodHNrcm53ZGZ0c3JzcGlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4MDQ4MTAsImV4cCI6MjA5OTM4MDgxMH0.EORFoOj4ssM9z5Q7xGQdbzFUMTldXqI9LyQ-Kvcgj5I';

const parseCommentAndSticker = (rawComment) => {
  if (rawComment && rawComment.startsWith('[STK:')) {
    const closeIdx = rawComment.indexOf(']');
    if (closeIdx > 5) {
      const sticker = rawComment.substring(5, closeIdx);
      const comentario = rawComment.substring(closeIdx + 1);
      return { sticker, comentario };
    }
  }
  return { sticker: '', comentario: rawComment || '' };
};

const buildRawComment = (sticker, commentText) => {
  if (sticker) {
    return `[STK:${sticker}]${commentText || ''}`;
  }
  return commentText || '';
};

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('beauty_salon_dark_mode_v5');
    return savedDarkMode === 'true';
  });

  useEffect(() => {
    localStorage.setItem('beauty_salon_dark_mode_v5', darkMode);
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

  const [comicImages, setComicImages] = useState(() => {
    const saved = localStorage.getItem('beauty_salon_comic_images');
    return saved ? JSON.parse(saved) : {};
  });

  const [musicList, setMusicList] = useState(() => {
    const savedMusic = localStorage.getItem('beauty_salon_music_list');
    return savedMusic ? JSON.parse(savedMusic) : {};
  });

  const [newSongName, setNewSongName] = useState('');
  const [newSongUrl, setNewSongUrl] = useState('');
  const [commentInput, setCommentInput] = useState({});

  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    claseKey: null,
    studentUser: null
  });

  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success' 
  });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4500);
  };

  const [allStudentsTasks, setAllStudentsTasks] = useState({
    jean: { clase2: null, clase3: null, clase5: null, clase6: null },
    ricardo: { clase2: null, clase3: null, clase5: null, clase6: null },
    victoria: { clase2: null, clase3: null, clase5: null, clase6: null },
    yaritza: { clase2: null, clase3: null, clase5: null, clase6: null },
    annelys: { clase2: null, clase3: null, clase5: null, clase6: null },
    melany: { clase2: null, clase3: null, clase5: null, clase6: null },
    legna: { clase2: null, clase3: null, clase5: null, clase6: null }, 
    jordy: { clase2: null, clase3: null, clase5: null, clase6: null }, 
  });

  const [grades, setGrades] = useState({
    jean: {}, ricardo: {}, victoria: {}, yaritza: {}, annelys: {}, melany: {}, legna: {}, jordy: {}
  });

  const [selectedStudent, setSelectedStudent] = useState('jean');
  const [loadingCloud, setLoadingCloud] = useState(false);
  const [supabase, setSupabase] = useState(null);

  const [welcomingVideo, setWelcomingVideo] = useState(() => {
    const saved = localStorage.getItem('beauty_salon_welcoming_video');
    return saved ? JSON.parse(saved) : { type: 'url', source: 'https://www.youtube.com/embed/dQw4w9WgXcQ' };
  });
  const [videoInputUrl, setVideoInputUrl] = useState('');
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const [currentScenario, setCurrentScenario] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [practiceScore, setPracticeScore] = useState(null);
  const [practiceStatus, setPracticeStatus] = useState('idle'); 

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [builderStatus, setBuilderStatus] = useState('idle'); 

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizSelectedAnswer, setQuizSelectedAnswer] = useState(null);
  const [quizStatus, setQuizStatus] = useState('idle');

  const practiceScenarios = [
    {
      spanishPrompt: "Imagina que entra un cliente nuevo. Dale la bienvenida en inglés amablemente y ofrécele asiento:",
      englishTarget: "Hello, welcome to our salon! Please, have a seat.",
      tip: "¡Dilo con una gran sonrisa para que tu cliente se sienta muy feliz! 😊"
    },
    {
      spanishPrompt: "Explícale al cliente de forma muy sencilla el primer paso del tratamiento de keratina:",
      englishTarget: "First, we wash your hair with special shampoo.",
      tip: "Recuerda preguntar la pronunciación de 'shampoo' de manera muy suave. 🧴"
    },
    {
      spanishPrompt: "Dile al cliente la instrucción más importante para cuidar su tratamiento:",
      englishTarget: "Don't wash your hair for three days, please.",
      tip: "En inglés, el número tres se pronuncia soplando un poquito de aire: 'th-ree' 💧"
    }
  ];

  const sentenceBuilderScenarios = [
    {
      instruction: "Ordena las palabras para decirle al cliente que esperará un momento:",
      correctArray: ["Please,", "wait", "a", "moment."],
      shuffledArray: ["wait", "moment.", "Please,", "a"],
      solutionKey: "Please, wait a moment."
    },
    {
      instruction: "Pregúntale al cliente si es su primer tratamiento de keratina:",
      correctArray: ["Is", "this", "your", "first", "keratin", "treatment?"],
      shuffledArray: ["first", "Is", "treatment?", "your", "this", "keratin"],
      solutionKey: "Is this your first keratin treatment?"
    }
  ];

  const triviaQuizzes = [
    {
      englishPhrase: "How are you?",
      options: ["¿Cómo está?", "¿Qué hora es?", "¿Cuánto cuesta?"],
      correctIndex: 0,
      congrats: "¡Fantástico! Saludaste muy educadamente. 🌸"
    },
    {
      englishPhrase: "Don't tie your hair.",
      options: ["No lave su cabello.", "No se recoja el cabello.", "Por favor no se mueva."],
      correctIndex: 1,
      congrats: "¡Extraordinario! Cuidaste el cabello de tu cliente. 🧴"
    },
    {
      englishPhrase: "You can pay by cash.",
      options: ["Puede pagar con tarjeta.", "No puede pagar hoy.", "Puede pagar en efectivo."],
      correctIndex: 2,
      congrats: "¡Maravilloso! El dinero está en la caja registradora. 💰"
    },
    {
      englishPhrase: "Thank you for coming.",
      options: ["Gracias por venir.", "Buenos días.", "Disculpe la espera."],
      correctIndex: 0,
      congrats: "¡Súper dulce! Tu cliente volverá muy pronto. 👋💖"
    }
  ];

  const stickersDisponibles = [
    { emoji: '🌟', name: 'Estrella de Oro' },
    { emoji: '🎙️', name: 'Super Voz' },
    { emoji: '💖', name: 'Amor y Brillo' },
    { emoji: '🏆', name: 'Gran Campeón' },
    { emoji: '🧠', name: 'Mente Brillante' }
  ];

  const comicPanels = [
    { id: 1, role: "Narrador 📖", text: "Anna is a hairstylist. A client comes into the salon.", translation: "Ana es una estilista de cabello. Una clienta entra al salón.", avatar: "💈", sceneEmoji: "💈💇‍♀️🚪👩", sceneBg: "from-pink-100 to-purple-100" },
    { id: 2, role: "Anna 💇‍♀️", text: "Good morning! Welcome!", translation: "¡Buenos días! ¡Bienvenida!", avatar: "💇‍♀️", sceneEmoji: "💇‍♀️👋✨🧴", sceneBg: "from-purple-100 to-cyan-100" },
    { id: 3, role: "Sarah (Clienta) 👩", text: "Hello!", translation: "¡Hola!", avatar: "👩", sceneEmoji: "👩👋😊🌸", sceneBg: "from-cyan-100 to-rose-100" },
    { id: 4, role: "Anna 💇‍♀️", text: "How are you?", translation: "¿Cómo está?", avatar: "💇‍♀️", sceneEmoji: "💇‍♀️💬💖🔍", sceneBg: "from-rose-100 to-indigo-100" },
    { id: 5, role: "Sarah (Clienta) 👩", text: "I'm fine, thank you.", translation: "Estoy bien, gracias.", avatar: "👩", sceneEmoji: "👩🙏✨🥰", sceneBg: "from-indigo-100 to-pink-100" },
    { id: 6, role: "Anna 💇‍♀️", text: "My name is Anna.", translation: "Mi nombre es Ana.", avatar: "💇‍♀️", sceneEmoji: "💇‍♀️🙋‍♀️⭐🎀", sceneBg: "from-pink-100 to-teal-100" },
    { id: 7, role: "Sarah (Clienta) 👩", text: "My name is Sarah.", translation: "Mi nombre es Sarah.", avatar: "👩", sceneEmoji: "👩🙋‍♀️🌸🌱", sceneBg: "from-teal-100 to-purple-100" },
    { id: 8, role: "Anna 💇‍♀️", text: "Nice to meet you. Please, have a seat.", translation: "Mucho gusto en conocerla. Por favor, tome asiento.", avatar: "💇‍♀️", sceneEmoji: "💇‍♀️🪑🤝💫", sceneBg: "from-purple-100 to-rose-100" },
    { id: 9, role: "Sarah (Clienta) 👩", text: "Thank you.", translation: "Gracias.", avatar: "👩", sceneEmoji: "👩💇‍♀️✨🧸", sceneBg: "from-rose-100 to-cyan-100" }
  ];

  const josselynQuizQuestions = [
    { id: "q1", question: "1) ¿Dónde se encuentra Ana?", options: [{ key: "A", text: "AT SCHOOL (En la escuela)" }, { key: "B", text: "AT THE BEAUTY SALON (En el salón de belleza)" }, { key: "C", text: "AT HOME (En casa)" }], correctKey: "B" },
    { id: "q2", question: "2) ¿Qué es lo primero que dice Ana?", options: [{ key: "A", text: "GOODBYE. (Adiós)" }, { key: "B", text: "GOOD MORNING! (¡Buenos días!)" }, { key: "C", text: "THANK YOU. (Gracias)" }], correctKey: "B" },
    { id: "q3", question: "3) ¿Qué palabra le dice Ana para darle la bienvenida?", options: [{ key: "A", text: "GOODBYE. (Adiós)" }, { key: "B", text: "GOOD MORNING! (¡Buenos días!)" }, { key: "C", text: "WELCOME. (Bienvenida)" }], correctKey: "C" },
    { id: "q4", question: "4) ¿Qué frase utiliza Ana para decirle a la clienta que tome asiento?", options: [{ key: "A", text: "PLEASE, HAVE A SEAT. (Por favor, tome asiento.)" }, { key: "B", text: "GOOD MORNING! (¡Buenos días!)" }, { key: "C", text: "THANK YOU. (Gracias)" }], correctKey: "A" }
  ];

  const josselynNewWords = [
    { en: "hairstylist", es: "estilista" },
    { en: "client", es: "cliente" },
    { en: "salon", es: "salón" },
    { en: "smile", es: "sonreír" },
    { en: "seat", es: "asiento" }
  ];

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
        const clonTareas = { jean: {}, ricardo: {}, victoria: {}, yaritza: {}, annelys: {}, melany: {}, legna: {}, jordy: {} };
        tareasDB.forEach(t => { if (clonTareas[t.estudiante]) clonTareas[t.estudiante][t.clase] = { name: t.nombre_archivo, url: t.archivo_base64 }; });
        setAllStudentsTasks(prev => ({ ...prev, ...clonTareas }));
      }

      const { data: notasDB, error: err2 } = await supabase.from('calificaciones').select('*');
      if (!err2 && notasDB) {
        const clonNotas = { jean: {}, ricardo: {}, victoria: {}, yaritza: {}, annelys: {}, melany: {}, legna: {}, jordy: {} };
        ['jean', 'ricardo', 'victoria', 'yaritza', 'annelys', 'melany', 'legna', 'jordy'].forEach(est => {
          clonNotas[est] = {};
          ['clase2', 'clase3', 'clase5', 'clase6'].forEach(cl => clonNotas[est][cl] = { nota: '-', comentario: '' });
        });
        notasDB.forEach(n => { if (clonNotas[n.estudiante]) clonNotas[n.estudiante][n.clase] = { nota: n.nota, comentario: n.comentario }; });
        setGrades(clonNotas);
      }

      const { data: configDB, error: errConfig } = await supabase.from('configuracion').select('*');
      if (!errConfig && configDB) {
        const loadedComicImages = {};
        let loadedVideo = null;
        configDB.forEach(row => {
          if (row.clave.startsWith('comic_panel_')) loadedComicImages[row.clave.replace('comic_panel_', '')] = row.valor;
          if (row.clave === 'welcoming_video') loadedVideo = JSON.parse(row.valor);
        });
        if (Object.keys(loadedComicImages).length > 0) {
          setComicImages(loadedComicImages);
          localStorage.setItem('beauty_salon_comic_images', JSON.stringify(loadedComicImages));
        }
        if (loadedVideo) {
          setWelcomingVideo(loadedVideo);
          localStorage.setItem('beauty_salon_welcoming_video', JSON.stringify(loadedVideo));
        }
      }

      const { data: cancionesDB, error: err4 } = await supabase.from('canciones_felices').select('*');
      if (!err4 && cancionesDB) {
        const clonCanciones = { ...musicList };
        cancionesDB.forEach(c => {
          clonCanciones[c.usuario] = {
            nombre_cancion: c.nombre_cancion, enlace: c.enlace,
            likes: typeof c.likes === 'string' ? JSON.parse(c.likes) : (c.likes || []),
            comentarios: typeof c.comentarios === 'string' ? JSON.parse(c.comentarios) : (c.comentarios || [])
          };
        });
        setMusicList(clonCanciones);
        localStorage.setItem('beauty_salon_music_list', JSON.stringify(clonCanciones));
      }
    } catch (e) { console.log("Error al traer datos de la nube:", e); }
    setLoadingCloud(false);
  };

  useEffect(() => {
    if (isLoggedIn && supabase) descargarDeSupabase();
  }, [isLoggedIn, supabase]);

  const escucharPalabra = (textoEnIngles) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(textoEnIngles);
      u.lang = 'en-US'; u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  };

  const [activeComicPanel, setActiveComicPanel] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({ q1: null, q2: null, q3: null, q4: null });
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const handleComicImageUpload = async (e, panelId) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2.2 * 1024 * 1024) {
        showToast("¡Ay! Esta foto está un poquito pesada (máx 2.2MB).🧚‍♀️📸", "error");
        return;
      }
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target.result;
        setComicImages(prev => ({ ...prev, [panelId]: base64 }));
        if (supabase) {
          const { error } = await supabase.from('configuracion').upsert({ clave: `comic_panel_${panelId}`, valor: base64 }, { onConflict: 'clave' });
          if (!error) showToast(`Panel ${panelId} guardado!🎨☁️✨`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleComicImageDelete = async (panelId) => {
    setComicImages(prev => { const updated = { ...prev }; delete updated[panelId]; return updated; });
    if (supabase) {
      const { error } = await supabase.from('configuracion').delete().eq('clave', `comic_panel_${panelId}`);
      if (!error) showToast(`¡Panel ${panelId} restaurado!🧹🌸`);
    }
  };

  const empezarPrácticaDeVoz = (fraseObjetivo) => {
    if (!('webkitSpeechRecognition' in window)) { showToast("Soporte de voz no disponible.", "error"); return; }
    const SpeechGen = window.webkitSpeechRecognition;
    const recognition = new SpeechGen();
    recognition.lang = 'en-US';
    recognition.onstart = () => { setIsRecording(true); setPracticeStatus('listening'); setSpokenText(''); };
    recognition.onerror = () => { setIsRecording(false); setPracticeStatus('try_again'); showToast("Error al capturar voz.", "error"); };
    recognition.onend = () => setIsRecording(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSpokenText(transcript);
      const targetClean = fraseObjetivo.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").trim();
      const spokenClean = transcript.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").trim();
      const targetWords = targetClean.split(" ");
      const spokenWords = spokenClean.split(" ");
      let coincidencia = 0;
      targetWords.forEach(w => { if (spokenWords.includes(w)) coincidencia++; });
      const score = Math.round((coincidencia / targetWords.length) * 100);
      setPracticeScore(score);
      setPracticeStatus(score >= 60 ? 'success' : 'try_again');
      if (score >= 60) showToast(`¡Excelente! Coincidencia: ${score}%🦉⭐`);
      else showToast("Inténtalo de nuevo. 🧸", "error");
    };
    recognition.start();
  };

  const agregarPalabraAlArmador = (word) => { if (builderStatus === 'idle') setSelectedWords([...selectedWords, word]); };
  const removerPalabraDelArmador = (index) => { if (builderStatus === 'idle') setSelectedWords(selectedWords.filter((_, idx) => idx !== index)); };
  const verificarFraseConstruida = (solucionCorrecta) => {
    if (selectedWords.join(" ") === solucionCorrecta) { setBuilderStatus('success'); showToast("¡Fabuloso! 🦉💚"); }
    else { setBuilderStatus('error'); showToast("Intenta de nuevo. 🌸", "error"); }
  };
  const reiniciarArmadorDeFrase = () => { setSelectedWords([]); setBuilderStatus('idle'); };

  const seleccionarRespuestaTrivia = (index) => {
    if (quizStatus !== 'idle') return;
    setQuizSelectedAnswer(index);
    if (index === triviaQuizzes[currentQuizIndex].correctIndex) { setQuizStatus('correct'); showToast(triviaQuizzes[currentQuizIndex].congrats); }
    else { setQuizStatus('incorrect'); showToast("¡Oh oh! Inténtalo otra vez. 🧸", "error"); }
  };
  const reiniciarTriviaQuiz = () => { setQuizSelectedAnswer(null); setQuizStatus('idle'); };

  const handlePdfUpload = async (e, claseKey, studentUser) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf" && supabase) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        setLoadingCloud(true);
        const { error } = await supabase.from('tareas').upsert({ estudiante: studentUser, clase: claseKey, nombre_archivo: file.name, archivo_base64: event.target.result }, { onConflict: 'estudiante,clase' });
        if (!error) { showToast("¡Tarea subida!☁️✨"); descargarDeSupabase(); }
        setLoadingCloud(false);
      }; reader.readAsDataURL(file);
    } else { showToast("Sube un archivo PDF.📂", "error"); }
  };

  const openDeleteConfirmModal = (claseKey, studentUser) => setDeleteConfirm({ show: true, claseKey, studentUser });
  const handlePdfDeleteConfirmed = async () => {
    if (!supabase || !deleteConfirm.claseKey) return;
    setLoadingCloud(true);
    const { error } = await supabase.from('tareas').delete().match({ estudiante: deleteConfirm.studentUser, clase: deleteConfirm.claseKey });
    if (!error) { showToast("Tarea borrada.🗑️🌸"); descargarDeSupabase(); }
    setLoadingCloud(false);
    setDeleteConfirm({ show: false, claseKey: null, studentUser: null });
  };

  const enviarNotaASupabase = async (estudiante, claseKey, nota, rawCommentText) => {
    if (supabase) {
      const { error } = await supabase.from('calificaciones').upsert({ estudiante, clase: claseKey, nota, comentario: rawCommentText }, { onConflict: 'estudiante,clase' });
      if (!error) { showToast("¡Calificación guardada!⭐"); descargarDeSupabase(); }
    }
  };

  const handleUrlVideoSave = async () => {
    let processedUrl = videoInputUrl.trim();
    if (processedUrl.includes('youtube.com/watch?v=')) processedUrl = `https://www.youtube.com/embed/${processedUrl.split('v=')[1]?.split('&')[0]}`;
    else if (processedUrl.includes('youtu.be/')) processedUrl = `https://www.youtube.com/embed/${processedUrl.split('youtu.be/')[1]?.split('?')[0]}`;
    if (!processedUrl) return;
    if (supabase) {
      const videoData = { type: 'url', source: processedUrl };
      const { error } = await supabase.from('configuracion').upsert({ clave: 'welcoming_video', valor: JSON.stringify(videoData) }, { onConflict: 'clave' });
      if (!error) { showToast("¡Video enlazado!🎬✨"); descargarDeSupabase(); }
    }
    setVideoInputUrl('');
  };

  const handleVideoFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 4.5 * 1024 * 1024 && supabase) {
      setUploadingVideo(true);
      const reader = new FileReader();
      reader.onload = async (event) => {
        const videoData = { type: 'base64', source: event.target.result };
        const { error } = await supabase.from('configuracion').upsert({ clave: 'welcoming_video', valor: JSON.stringify(videoData) }, { onConflict: 'clave' });
        if (!error) { setWelcomingVideo(videoData); showToast("¡Video subido!📺✨"); descargarDeSupabase(); }
        setUploadingVideo(false);
      }; reader.readAsDataURL(file);
    } else { showToast("Video máx 4.5MB.", "error"); }
  };

  const handleGuardarCancion = async () => {
    if (!newSongName.trim() || !newSongUrl.trim() || !supabase) return;
    const autor = currentUser.username;
    const cancionActualizada = { nombre_cancion: newSongName.trim(), enlace: newSongUrl.trim(), likes: musicList[autor]?.likes || [], comentarios: musicList[autor]?.comentarios || [] };
    const { error } = await supabase.from('canciones_felices').upsert({ usuario: autor, ...cancionActualizada, likes: JSON.stringify(cancionActualizada.likes), comentarios: JSON.stringify(cancionActualizada.comentarios) }, { onConflict: 'usuario' });
    if (!error) { showToast("¡Canción compartida!🎵✨"); descargarDeSupabase(); }
    setNewSongName(''); setNewSongUrl('');
  };

  const handleDarLike = async (usuarioDueno) => {
    if (currentUser.username === 'isabel' || !supabase) return;
    const cancion = musicList[usuarioDueno]; if (!cancion) return;
    let nuevosLikes = [...(cancion.likes || [])];
    if (nuevosLikes.includes(currentUser.username)) nuevosLikes = nuevosLikes.filter(u => u !== currentUser.username);
    else nuevosLikes.push(currentUser.username);
    await supabase.from('canciones_felices').upsert({ usuario: usuarioDueno, ...cancion, likes: JSON.stringify(nuevosLikes), comentarios: JSON.stringify(cancion.comentarios) }, { onConflict: 'usuario' });
    setMusicList(prev => ({ ...prev, [usuarioDueno]: { ...cancion, likes: nuevosLikes } }));
  };

  const handleAgregarComentario = async (usuarioDueno) => {
    if (currentUser.username === 'isabel' || !commentInput[usuarioDueno]?.trim() || !supabase) return;
    const cancion = musicList[usuarioDueno]; if (!cancion) return;
    const nuevosComentarios = [...(cancion.comentarios || []), { usuario: currentUser.username, nombre: currentUser.name, texto: commentInput[usuarioDueno].trim(), likes: [] }];
    await supabase.from('canciones_felices').upsert({ usuario: usuarioDueno, ...cancion, likes: JSON.stringify(cancion.likes), comentarios: JSON.stringify(nuevosComentarios) }, { onConflict: 'usuario' });
    setMusicList(prev => ({ ...prev, [usuarioDueno]: { ...cancion, comentarios: nuevosComentarios } }));
    setCommentInput(prev => ({ ...prev, [usuarioDueno]: '' }));
  };

  const handleLikeComentario = async (usuarioDueno, commentIdx) => {
    if (currentUser.username === 'isabel' || !supabase) return;
    const cancion = musicList[usuarioDueno]; if (!cancion) return;
    const comentariosActualizados = [...(cancion.comentarios || [])];
    const comment = { ...comentariosActualizados[commentIdx] };
    if (comment.likes?.includes(currentUser.username)) comment.likes = comment.likes.filter(u => u !== currentUser.username);
    else comment.likes = [...(comment.likes || []), currentUser.username];
    comentariosActualizados[commentIdx] = comment;
    await supabase.from('canciones_felices').upsert({ usuario: usuarioDueno, ...cancion, likes: JSON.stringify(cancion.likes), comentarios: JSON.stringify(comentariosActualizados) }, { onConflict: 'usuario' });
    setMusicList(prev => ({ ...prev, [usuarioDueno]: { ...cancion, comentarios: comentariosActualizados } }));
  };

  const handleEliminarComentario = async (usuarioDueno, commentIdx) => {
    if (currentUser.username === 'isabel' || !supabase) return;
    const cancion = musicList[usuarioDueno]; if (!cancion) return;
    const comentariosActualizados = (cancion.comentarios || []).filter((_, idx) => idx !== commentIdx);
    await supabase.from('canciones_felices').upsert({ usuario: usuarioDueno, ...cancion, likes: JSON.stringify(cancion.likes), comentarios: JSON.stringify(comentariosActualizados) }, { onConflict: 'usuario' });
    setMusicList(prev => ({ ...prev, [usuarioDueno]: { ...cancion, comentarios: comentariosActualizados } }));
    showToast("¡Comentario borrado!🧹🌸");
  };

  const handleQuizAnswerSelect = (questionId, optionKey) => { if (!quizSubmitted) setQuizAnswers(prev => ({ ...prev, [questionId]: optionKey })); };
  const handleQuizSubmit = () => {
    let score = 0; josselynQuizQuestions.forEach(q => { if (quizAnswers[q.id] === q.correctKey) score += 2.5; });
    setQuizScore(score); setQuizSubmitted(true);
    if (score >= 7.5) showToast(`¡Excelente nota de 10! 🥇🎓✨`); else showToast(`Has obtenido ${score}/10.🧸🌸`, "error");
  };
  const handleQuizReset = () => { setQuizAnswers({ q1: null, q2: null, q3: null, q4: null }); setQuizSubmitted(false); setQuizScore(0); };

  const accounts = {
    'daniela': { username: 'daniela', name: "Miss Daniela", role: "Profesora" },
    'josselyne': { username: 'josselyne', name: "Miss Josselyne", role: "Profesora" },
    'jeilyn': { username: 'jeilyn', name: "Miss Jeilyn", role: "Profesora" },
    'isabel': { username: 'isabel', name: "Miss Isabel", role: "Profesora" },
    'jean': { username: 'jean', name: "Jean", role: "Estudiante" },
    'legna': { username: 'legna', name: "Legna", role: "Estudiante" },
    'jordy': { username: 'jordy', name: "Jordy", role: "Estudiante" },
    'ricardo': { username: 'ricardo', name: "Ricardo", role: "Estudiante" },
    'victoria': { username: 'victoria', name: "Victoria", role: "Estudiante" },
    'yaritza': { username: 'yaritza', name: "Yaritza", role: "Estudiante" },
    'annelys': { username: 'annelys', name: "Annelys", role: "Estudiante" },
    'melany': { username: 'melany', name: "Melany", role: "Estudiante" }
  };
  const estudiantesLista = Object.values(accounts).filter(a => a.role === "Estudiante");
  const infoTareas = { clase2: "Tarea 1: Audio keratina.", clase3: "Tarea 2: Audio cuidado.", clase5: "Tarea 3: Audio alergias.", clase6: "Final: Role-Play." };

  const modules = [
    { id: 1, title: "UNIDAD 1: WELCOME TO THE CLIENT 🚪✨", lessons: [{ title: "CLASE 1: Greetings 👋👋", content: [{ en: "Hello!", es: "Hola" }, { en: "Welcome!", es: "Bienvenido" }] }] },
    { id: 2, title: "UNIDAD 2: GIVING INFORMATION 📢🌸", lessons: [{ title: "CLASE 3: Aftercare Instructions 🧴💧", content: [{ en: "Wait a moment.", es: "Espere un momento" }] }] },
    { id: 3, title: "UNIDAD 3: CUSTOMER INTERACTION 💬🧸", lessons: [{ title: "CLASE 6: Despedir 👋💖✨", content: [{ en: "Have a nice day.", es: "Que tenga buen día" }] }] }
  ];

  const fullVocabList = [
    { en: "Hello! / Hi!", es: "Hola", cat: "saludos" },
    { en: "Good morning.", es: "Buenos días", cat: "saludos" },
    { en: "Welcome!", es: "¡Bienvenido(a)!", cat: "saludos" },
    { en: "How are you?", es: "¿Cómo está?", cat: "saludos" },
    { en: "My name is Anna.", es: "Mi nombre es Ana.", cat: "saludos" },
    { en: "Please, have a seat.", es: "Por favor, tome asiento.", cat: "saludos" },
    { en: "First, we wash your hair.", es: "Primero, lavamos tu cabello.", cat: "proceso" },
    { en: "Finally, we use the flat iron.", es: "Finalmente, usamos la plancha.", cat: "proceso" },
    { en: "Don't wash your hair.", es: "No lave su cabello.", cat: "cuidados" },
    { en: "Don't tie your hair.", es: "No se recoja el cabello.", cat: "cuidados" },
    { en: "The price is $40.", es: "El precio es $40.", cat: "precio" },
    { en: "You can pay by cash.", es: "Puede pagar en efectivo.", cat: "precio" },
    { en: "Is this your first treatment?", es: "¿Es este su primer tratamiento?", cat: "interaccion" },
    { en: "Do you have allergies?", es: "¿Tiene alguna alergia?", cat: "interaccion" },
    { en: "Thank you for coming.", es: "Gracias por venir.", cat: "despedida" },
    { en: "Have a nice day.", es: "Que tenga un buen día.", cat: "despedida" }
  ];
  const filteredVocab = fullVocabList.filter(item => {
    const matchesSearch = item.en.toLowerCase().includes(searchTerm.toLowerCase()) || item.es.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeVocabFilter === 'todos' || item.cat === activeVocabFilter;
    return matchesSearch && matchesCategory;
  });

  const handleLogin = (e) => { e.preventDefault(); const account = accounts[username.toLowerCase().trim()]; if (account && (password === "1234" || password === "prome")) { setIsLoggedIn(true); setCurrentUser(account); setError(''); showToast(`¡Bienvenida, ${account.name}!✨`); } elsesetError('Credenciales incorrectas.'); };
  const handleLogout = () => { setIsLoggedIn(false); setCurrentUser(null); };
  const esProfesoraActiva = currentUser?.role === "Profesora" && ['daniela', 'josselyne', 'jeilyn'].includes(currentUser.username);
  const esIsabel = currentUser?.username === 'isabel';
  const targetStudent = currentUser?.role === "Profesora" ? selectedStudent : currentUser?.username;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-tr from-pink-100 via-purple-100 to-cyan-100 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-950 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white dark:bg-slate-900/95 p-8 rounded-3xl shadow-2xl space-y-5 border border-purple-200/50 max-w-sm w-full">
          <div className="text-center"> <span className="text-6xl">💇‍♀️✨</span> <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">Beauty English</h2> <p className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-600 to-cyan-500 tracking-widest uppercase mt-1">Aula Mágica 🌸</p> </div>
          <input type="text" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-4 border-2 border-purple-100/80 rounded-2xl text-slate-900 dark:text-white font-bold bg-white dark:bg-slate-950outline-none" />
          <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-4 border-2 border-purple-100/80 rounded-2xl text-slate-900 dark:text-white font-bold bg-white dark:bg-slate-950outline-none" />
          {error && <p className="text-red-500 text-xs font-black text-center">{error}</p>}
          <button type="submit" className="w-full bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-black py-4 rounded-2xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"> ¡Ingresar! 🚀🌸 </button>
        </form>
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-sans flex flex-col ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-gradient-to-tr from-pink-50 via-purple-50 to-cyan-50 text-slate-900'}`}>
      <header className={`border-b h-20 flex items-center justify-between px-6 shadow-md ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-purple-100 text-purple-950'}`}>
        <div className="flex items-center space-x-3"> <GraduationCap className={darkMode ? 'text-pink-400' : 'text-purple-600'} size={32} /> <span className={`font-black text-base md:text-lg flex items-center gap-1.5 ${darkMode ? 'text-white' : 'text-purple-950'}`}> Beauty English Course <span className="text-rose-500 animate-bounce">👩‍🏫✨</span> </span> </div>
        <div className="flex items-center space-x-4"> <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 rounded-xl border"> {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-purple-600" />} </button> <span className={`text-xs font-black uppercase px-4 py-2.5 rounded-xl border ${darkMode ? 'bg-slate-800 text-pink-300' : 'bg-purple-50 text-purple-950'}`}> <Smile size={16} className="text-rose-500" /> {currentUser.name} ({currentUser.role}) </span> <button onClick={handleLogout} className="text-xs font-extrabold px-4 py-2.5 rounded-xl flex items-center gap-1.5 border"> <LogOut size={14} /> Salir </button> </div>
      </header>
      <div className="flex flex-1 flex-col md:flex-row">
        <aside className={`w-full md:w-64 p-4 flex flex-col gap-2 border-r ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-200'}`}>
          <div className={`text-xs uppercase font-extrabold mb-2 px-3 ${darkMode ? 'text-pink-400' : 'text-purple-950'}`}> <Heart size={12} className="fill-rose-500 text-rose-500 animate-pulse" /> Menú Mágico </div>
          {['inicio', 'unit1', 'unit2', 'unit3', 'actividades', 'practica', 'mochila', 'calificaciones', 'musica', 'vocabulario', 'juegos'].map(tab => {
            const icons = { inicio: Home, unit1: BookOpen, unit2: BookOpen, unit3: BookOpen, actividades: Sparkle, practica: Activity, mochila: FolderHeart, calificaciones: Star, musica: Music, vocabulario: Volume2, juegos: Gamepad2 };
            const names = { inicio: 'Inicio', unit1: 'U1: Welcome', unit2: 'U2: Info', unit3: 'U3: Client', actividades: 'Actividades', practica: 'Práctica', mochila: 'Mochila', calificaciones: 'Calificaciones', musica: 'Música', vocabulario: 'Vocabulario', juegos: 'Juegos' };
            const Icon = icons[tab]; return ( <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === tab ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white shadow-lg' : (darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-purple-950 hover:bg-purple-50')}`}> <Icon size={16} /> {names[tab]} </button> );
          })}
          <div className="border-t border-purple-100 dark:border-slate-800 my-4 pt-4"> <button onClick={descargarDeSupabase} className="w-full text-[11px] font-black py-3 rounded-xl border flex items-center justify-center gap-1"> 🔄 Sincronizar Nube ☁️ </button> </div>
        </aside>
        <main className="flex-1 p-6 max-w-4xl w-full mx-auto">
          {loadingCloud && <div className="text-center p-2.5 mb-4 bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-black rounded-2xl text-[11px] animate-pulse"> ☁️ Traendo magia de internet... </div>}
          {activeTab === 'inicio' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 p-8 rounded-3xl text-white shadow-lg relative"> <Sparkles className="absolute right-4 top-4 text-pink-200 animate-spin" size={48} /> <h1 className="text-3xl font-black text-white">¡Bienvenida, {currentUser.name}! 💇‍♀️✨</h1> <p className="text-sm mt-2 font-bold text-rose-50">Disfruta cada etapa con juegos y más.</p> </div>
              <div className={`border p-6 rounded-3xl shadow-xl space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                <h2 className={`text-base font-black flex items-center gap-2 ${darkMode ? 'text-pink-400' : 'text-purple-950'}`}> <Video className="text-rose-500" size={24} /> Cine Mágico: Video de Bienvenida 🎬🌸 </h2>
                <p className={`text-xs font-bold p-3 rounded-xl border ${darkMode ? 'bg-slate-800 text-slate-100' : 'bg-purple-50 text-purple-950'}`}> Aprenderás de forma práctica. ¡A disfrutar! </p>
                <div className={`relative w-full aspect-video rounded-2xl overflow-hidden border ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-purple-50 border-purple-100'}`}> <iframe className="w-full h-full" src={welcomingVideo.type === 'url' ? welcomingVideo.source : welcomingVideo.source} title="Welcome Video" allowFullScreen></iframe> </div>
                {esProfesoraActiva && (
                  <div className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-purple-50 border-purple-100'}`}>
                    <span className={`text-xs font-black flex items-center gap-1.5 ${darkMode ? 'text-pink-300' : 'text-purple-900'}`}> 🛠️ Zona Profesora: Actualizar Video </span>
                    <input type="text" placeholder="URL YouTube..." value={videoInputUrl} onChange={e => setVideoInputUrl(e.target.value)} className="w-full p-2.5 border rounded-xl bg-white text-slate-900font-boldtext-xs" />
                    <button onClick={handleUrlVideoSave} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-blacktext-[11px]px-4py-2 rounded-xl"> Guardar 🔗 </button>
                    <label className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white py-2.5 px-3 rounded-xl font-black cursor-pointer shadow-md text-[11px]"> {uploadingVideo ? "Subiendo...☁️" : "Subir Video mi Computadora 🖥️"} <input type="file" accept="video/mp4" disabled={uploadingVideo} onChange={handleVideoFileChange} className="hidden" /> </label>
                  </div>
                )}
              </div>
            </div>
          )}
          {['unit1', 'unit2', 'unit3'].map((tab, idx) => activeTab === tab && (
            <div key={tab} className="space-y-5">
              <h2 className={`text-base font-black border-b pb-2 flex items-center gap-2 ${darkMode ? 'text-pink-400 border-slate-800' : 'text-purple-900 border-purple-100'}`}> <BookOpen size={18} /> {modules[idx].title} </h2>
              {modules[idx].lessons.map((lesson, lIdx) => (
                <div key={lIdx} className={`border p-5 rounded-3xl space-y-4 shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                  <h3 className="text-sm font-black uppercase text-purple-950 dark:text-white border-b pb-2">{lesson.title}</h3>
                  {lesson.content.map((item, cIdx) => (
                    <div key={cIdx} className={`flex justify-between items-center p-3 rounded-2xl border ${darkMode ? 'bg-slate-800 text-white' : 'bg-purple-50 border-purple-100'}`}>
                      <div className="flex items-center space-x-3"> <button onClick={() => escucharPalabra(item.en)} className="p-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl transition-all active:scale-90 shadow-md"> <Volume2 size={16} /> </button> <span className="text-xs font-black text-purple-950 dark:text-white">{item.en}</span> </div>
                      <span className={`text-xs font-black px-2.5 py-1 rounded-xl border shadow-sm ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-white border-purple-100 text-purple-950'}`}>🗣️ {item.es}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
          {activeTab === 'actividades' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 p-6 rounded-3xl text-white shadow-lg relative overflow-hidden"> <Sparkles className="absolute right-4 top-4 text-pink-200 animate-spin" size={40} /> <h1 className="text-2xl font-black text-white">Actividades Interactivas 🧩✨</h1> <p className="text-xs mt-1.5 font-bold text-rose-50">Aprendamos cada clase con pequeños desafíos 🌸</p> </div>
              <div className={`border p-6 rounded-3xl shadow-xl space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-purple-100 text-slate-900'}`}>
                <h2 className={`text-sm font-black uppercase ${darkMode ? 'text-purple-300' : 'text-purple-950'}`}>Cómic Parlante: A New Client 📖💬</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {comicPanels.map((panel) => {
                    const isActive = activeComicPanel === panel.id;
                    const hasCustomImg = !!comicImages[panel.id];
                    return (
                      <div key={panel.id} className={`p-4 rounded-2xl border-2 transition-all shadow-sm space-y-3 relative overflow-hidden ${isActive ? 'bg-gradient-to-tr from-pink-500/10 to-purple-600/10 border-pink-400' : (darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-purple-100')}`}>
                        <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${darkMode ? 'bg-slate-900 text-pink-300' : 'bg-purple-50 text-purple-700'}`}>Panel {panel.id}</span>
                        <div className={`relative w-full h-28 rounded-xl bg-gradient-to-tr ${panel.sceneBg} flex items-center justify-center text-3xl overflow-hidden`}>
                          {hasCustomImg ? <img src={comicImages[panel.id]} alt={`Panel ${panel.id}`} className="w-full h-full object-cover" /> : <span className="relative z-10">{panel.sceneEmoji}</span>}
                          {esProfesoraActiva && <label className="absolute bottom-1 right-1 bg-white/95 dark:bg-slate-900/95 p-1.5 rounded-full cursor-pointer opacity-80 hover:opacity-100"><UploadCloud size={14} className="text-purple-600 dark:text-pink-400"/><input type="file" accept="image/*" className="hidden" onChange={e => handleComicImageUpload(e, panel.id)} /></label>}
                          {hasCustomImg && esProfesoraActiva && <button onClick={e => { e.stopPropagation(); handleComicImageDelete(panel.id); }} className="absolute top-1 right-1 bg-red-100 dark:bg-red-900 p-1.5 rounded-full"><Trash2 size={12} className="text-red-650 dark:text-red-450"/></button>}
                        </div>
                        <div className="space-y-1"> <span className="text-[10px] font-black uppercase text-slate-400">{panel.role}</span> <p className="text-xs font-black text-purple-950 dark:text-white">"{panel.text}"</p> <p className="text-[11px] text-slate-500 italic font-bold">{panel.translation}</p> </div>
                        <button onClick={() => { setActiveComicPanel(panel.id); escucharPalabra(panel.text); }} className="text-[10px] font-black bg-purple-50 dark:bg-slate-700 text-purple-700 dark:text-pink-300 px-2.5 py-1.5 rounded-lg border border-purple-200 shadow-md">🔊 Escuchar</button>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={`border p-6 rounded-3xl shadow-xl space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-purple-100 text-slate-900'}`}>
                <h2 className={`text-sm font-black uppercase ${darkMode ? 'text-pink-300' : 'text-purple-950'}`}>Quiz de Lectura: Choose Correct Answer 📝🏆</h2>
                {josselynQuizQuestions.map((q) => (
                  <div key={q.id} className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-800 border-slate-800' : 'bg-purple-50 border-purple-100'}`}>
                    <span className="text-xs font-black text-purple-955 dark:text-white">{q.question}</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {q.options.map((opt) => {
                        const isSelected = quizAnswers[q.id] === opt.key; const isCorrect = opt.key === q.correctKey;
                        let btnColor = darkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900';
                        if (isSelected) btnColor = 'bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black';
                        if (quizSubmitted) { if (isCorrect) btnColor = 'bg-emerald-500 text-white font-black'; else if (isSelected) btnColor = 'bg-red-500 text-white'; }
                        return ( <button key={opt.key} disabled={quizSubmitted} onClick={() => handleQuizAnswerSelect(q.id, opt.key)} className={`p-3 rounded-xl border text-left text-xs ${btnColor}`}> <span className="font-black">{opt.key})</span> <span className="font-bold">{opt.text}</span> </button> );
                      })}
                    </div>
                  </div>
                ))}
                {!quizSubmitted ? <button onClick={handleQuizSubmit} className="w-full bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-black py-3 rounded-2xl text-xs shadow-md">Calificar Examen🎓✔️</button> : <div className="text-center"> <span className="font-black text-xs text-purple-600">Nota: {quizScore}/10</span> <button onClick={handleQuizReset} className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-black py-3 rounded-2xl text-xs mt-2">🔄 Reintentar</button> </div>}
              </div>
            </div>
          )}
          {activeTab === 'practica' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 p-6 rounded-3xl text-white shadow-lg relative"> <Award className="absolute right-4 top-4 text-pink-200" size={48} /> <h1 className="text-2xl font-black text-white">Práctica Mágica Interactiva 🦉💚</h1> <p className="text-xs mt-1.5 font-bold text-rose-50">¡Completa los desafíos de Duolingo!</p> </div>
              <div className={`border p-6 rounded-3xl shadow-xl space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                <h2 className="text-sm font-black uppercase text-purple-950 dark:text-white">Desafío 1: Simulador de Voz🎙️</h2>
                <div className={`p-4 rounded-2xl border text-xs space-y-3 ${darkMode ? 'bg-slate-800 text-white' : 'bg-purple-50'}`}>
                  <p className="font-bold text-slate-800 dark:text-white">{practiceScenarios[currentScenario].spanishPrompt}</p>
                  <div className={`p-4 rounded-xl border flex items-center justify-between ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
                    <span className="text-sm font-black text-purple-900 dark:text-white">"{practiceScenarios[currentScenario].englishTarget}"</span>
                    <button onClick={() => escucharPalabra(practiceScenarios[currentScenario].englishTarget)} className="p-2.5 rounded-xl bg-rose-50 text-rose-600 shadow-md"> <Volume2 size={16} /> </button>
                  </div>
                  <div className="text-center flex flex-col items-center justify-center p-4 border border-dashed rounded-2xl space-y-2 bg-white">
                    <button onClick={() => empezarPrácticaDeVoz(practiceScenarios[currentScenario].englishTarget)} className={`w-16 h-16 rounded-full flex items-center justify-center text-white ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gradient-to-r from-pink-500 to-cyan-500'} shadow-lg`}> <Mic size={28} /> </button>
                    {isRecording && <div className="text-purple-600 font-black">Escuchando... 🗣️</div>}
                    {practiceScore !== null && <div className="p-3 bg-rose-50 border border-purple-200 rounded-full font-black text-rose-700">Puntuación: {practiceScore}%</div>}
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'musica' && (
            <div className={`border p-6 rounded-3xl space-y-4 shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
              <h2 className="text-sm font-black uppercase text-purple-950 dark:text-white border-b pb-4">Mural de Música Feliz 🎵🎧</h2>
              {!esIsabel && (
                <div className={`p-4 rounded-3xl border space-y-3 ${darkMode ? 'bg-slate-800' : 'bg-purple-50'}`}>
                  <span className="text-xs font-black uppercase text-purple-700 block">Comparte tu Canción</span>
                  <input type="text" placeholder="Nombre (ej: Happy🌸)" value={newSongName} onChange={e => setNewSongName(e.target.value)} className="w-full p-2.5 border rounded-xl bg-white text-slate-900 font-bold text-xs outline-none" />
                  <input type="text" placeholder="YouTube Link" value={newSongUrl} onChange={e => setNewSongUrl(e.target.value)} className="w-full p-2.5 border rounded-xl bg-white text-slate-900 font-bold text-xs outline-none" />
                  <button onClick={handleGuardarCancion} className="w-full bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-black py-2.5 rounded-xl text-xs active:scale-95 shadow-md"> 🎉🎵 Compartir Canción 🎉🎵 </button>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(musicList).map(userKey => {
                  const song = musicList[userKey]; const hasLiked = song.likes?.includes(currentUser.username);
                  return (
                    <div key={userKey} className={`p-4 rounded-3xl border space-y-3 ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-md`}>
                      <div>
                        <span className="text-[10px] font-black uppercase text-slate-400 block">De: {accounts[userKey]?.name}</span>
                        <h4 className="text-xs font-black text-purple-950 dark:text-white mt-1 flex items-center gap-1.5">🎵 {song.nombre_cancion}</h4>
                        {song.enlace && <a href={song.enlace} target="_blank" rel="noopener noreferrer" className="text-[11px] text-pink-600 font-bold hover:underline flex items-center gap-1 mt-1"><PlayCircle size={12}/>Abrir Música🎧</a>}
                      </div>
                      <div className="flex items-center justify-between border-t border-b py-2 my-2">
                        <button onClick={() => handleDarLike(userKey)} disabled={esIsabel} className={`flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-xl border transition-all active:scale-90 ${hasLiked ? 'bg-pink-100 border-pink-300 text-pink-600' : 'bg-slate-50 border-slate-200'}`}><Heart size={14} className={hasLiked ? 'fill-pink-500 text-pink-600' : ''}/>{song.likes?.length || 0} Likes</button>
                        <span className="text-[11px] text-slate-400 font-bold">{song.comentarios?.length || 0} Comentarios</span>
                      </div>
                      {!esIsabel && <div className="flex gap-1.5 mt-2"><input type="text" placeholder="Comentario..." value={commentInput[userKey] || ''} onChange={e => setCommentInput(prev => ({ ...prev, [userKey]: e.target.value }))} className="flex-1 p-2 border rounded-xl bg-white text-slate-900 font-bold text-xs outline-none" /><button onClick={() => handleAgregarComentario(userKey)} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-2.5 rounded-xl active:scale-90 shadow-md"><Send size={12} /></button></div>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {activeTab === 'vocabulario' && (
            <div className={`border p-6 rounded-3xl space-y-4 shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
              <div className="flex items-center space-x-2 border-b pb-4"> <Volume2 className="text-pink-600" size={24} /> <h2 className="text-sm font-black uppercase text-purple-950 dark:text-white">DICCIONARIO INTERACTIVO 👋✨</h2> </div>
              <input type="text" placeholder="Buscar..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-9 p-3 border border-purple-200 rounded-2xl bg-white text-slate-900 font-boldtext-xs outline-none focus:ring-2 focus:ring-purple-400" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredVocab.map((item, i) => (
                  <div key={i} className={`flex justify-between items-center p-3.5 rounded-2xl border transition-all hover:border-pink-500 shadow-md ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-purple-200'}`}>
                    <div className="flex items-center space-x-2.5"> <button onClick={() => escucharPalabra(item.en)} className="p-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl transition-all active:scale-90 shadow-md"> <Volume2 size={14} /> </button> <span className="text-xs font-black text-purple-950 dark:text-white">{item.en}</span> </div>
                    <span className={`text-xs font-black px-2.5 py-1 rounded-xl border bg-purple-50 text-purple-950 border-purple-100 shadow-md`}>🗣️ {item.es}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'mochila' && (
            <div className={`border p-6 rounded-3xl space-y-4 shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
              <div className="flex items-center justify-between border-b pb-4"> <h2 className="text-sm font-black uppercase text-purple-950 dark:text-white flex gap-2"><FolderHeart className="text-rose-500" size={24}/>MOCHILA EN LA NUBE</h2> {currentUser.role === "Profesora" && <select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)} className="text-xs font-bold p-1.5 rounded-xl border bg-white outline-none">{estudiantesLista.map(est => <option key={est.id} value={est.id}>{est.name}</option>)}</select>} </div>
              <div className="space-y-4">
                {['clase2', 'clase3', 'clase5', 'clase6'].map(key => {
                  const task = allStudentsTasks[targetStudent]?.[key]; const gradeData = grades[targetStudent]?.[key] || { nota: '-', comentario: '' }; const { sticker, comentario } = parseCommentAndSticker(gradeData.comentario);
                  return (
                    <div key={key} className={`p-4 rounded-3xl border text-xs space-y-3 ${darkMode ? 'bg-slate-800' : 'bg-purple-50'} shadow-md`}>
                      <p className="font-black text-purple-700 flex items-center gap-1.5">🎯 {infoTareas[key]}</p>
                      <p className="text-[11px] font-bold text-slate-800 dark:text-white">Mochila: <span className="text-purple-600 font-black uppercase">{targetStudent}</span></p>
                      <div className="flex flex-wrap gap-2 items-center">
                        {currentUser.role !== "Profesora" && <label className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2.5 rounded-xl font-black cursor-pointer shadow-md text-[11px]">Subir PDF☁️<input type="file" accept=".pdf" onChange={e => handlePdfUpload(e, key, currentUser.username)} className="hidden"/></label>}
                        {task ? <><a href={task.url} download={task.name} className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-4 py-2.5 rounded-xl font-black shadow-md text-[11px]">⬇️ Descargar</a>{currentUser.role !== "Profesora" && <button onClick={() => openDeleteConfirmModal(key, targetStudent)} className="bg-red-500 text-white px-4 py-2.5 rounded-xl font-black shadow-md text-[11px]">🗑️ Borrar</button>}</> : <span className="text-slate-500 font-bolditalic text-[11px]">No hay PDF</span>}
                      </div>
                      <div className="border-t pt-2 space-y-2"> <p className="font-black text-purple-700 flex gap-2 items-center">⭐ Nota: {gradeData.nota}/10 {sticker && <span className="text-lg animate-bounce">{sticker}</span>}</p> {comentario && <p className="p-2.5 bg-white rounded-2xl border font-bold italic text-slate-900 shadow-md">💬 Miss comentó: {comentario}</p>} </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>
      {deleteConfirm.show && <div className="fixed inset-0 bg-slate-900/65 backdrop-blur-sm flex items-center justify-center p-4 z-50"><div className="bg-white p-6 rounded-3xl max-w-sm w-full text-center space-y-4 shadow-2xl border-2 border-red-200"> <Trash2 className="text-red-600 text-5xl animate-bounce mx-auto" /> <h3 className="text-lg font-black text-slate-900">¿Borrar tarea?</h3> <p className="text-xs font-bold text-slate-600">No podrás recuperarla.</p> <div className="flex gap-2"> <button onClick={handlePdfDeleteConfirmed} className="flex-1 bg-red-500 text-white font-black py-2.5 rounded-xl text-xs active:scale-95 shadow-md">Sí, borrar🗑️</button> <button onClick={() => setDeleteConfirm({ show: false, claseKey: null, studentUser: null })} className="flex-1 bg-purple-50 text-purple-700 font-black py-2.5 rounded-xl text-xs border">No, cancelar</button> </div> </div></div>}
      {toast.show && <div className="fixed bottom-6 right-6 z-50 animate-slide-in"><div className={`p-4 rounded-2xl font-black text-xs border flex items-center gap-2 shadow-xl ${toast.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-rose-50 text-rose-800 border-rose-300'}`}> <span>{toast.type === 'success' ? '⭐' : '🧸'}</span> <span>{toast.message}</span> </div></div>}
    </div>
  );
}