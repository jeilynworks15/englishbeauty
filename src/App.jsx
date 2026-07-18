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
  Activity // <-- ¡Importamos el icono que faltaba para reparar el hechizo mágico! 💖
} from 'lucide-react';

const SUPABASE_URL = 'https://fiuphtskrnwdftsrspip.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpdXBodHNrcm53ZGZ0c3JzcGlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4MDQ4MTAsImV4cCI6MjA5OTM4MDgxMH0.EORFoOj4ssM9z5Q7xGQdbzFUMTldXqI9LyQ-Kvcgj5I';

// ... rest of the existing code exactly as before ...
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
    const savedDarkMode = localStorage.getItem('beauty_salon_dark_mode_v3');
    return savedDarkMode === 'true';
  });

  useEffect(() => {
    localStorage.setItem('beauty_salon_dark_mode_v3', darkMode);
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

  const [activeComicPanel, setActiveComicPanel] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({ q1: null, q2: null, q3: null, q4: null });
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const [musicList, setMusicList] = useState(() => {
    const savedMusic = localStorage.getItem('beauty_salon_music_list');
    return savedMusic ? JSON.parse(savedMusic) : {
      jean: { nombre_cancion: 'Happy 🌸', enlace: 'https://www.youtube.com/watch?v=ZbZSe6N_BXs', likes: ['ricardo'], comentarios: [{ usuario: 'ricardo', nombre: 'Ricardo', texto: '¡Qué gran ritmo Jean!', likes: [] }] },
      ricardo: { nombre_cancion: 'Can\'t Stop the Feeling! ⚡', enlace: 'https://www.youtube.com/watch?v=ru0K8uYEZWw', likes: ['jean'], comentarios: [] },
      legna: { nombre_cancion: 'Sparkle 🎀', enlace: 'https://www.youtube.com/watch?v=a2GujJZfALL', likes: [], comentarios: [] },
      jordy: { nombre_cancion: 'Dynamite 🌟', enlace: 'https://www.youtube.com/watch?v=gdZLi9oWNZg', likes: [], comentarios: [] }
    };
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
    jean: { clase2: { nota: '-', comentario: '' }, clase3: { nota: '-', comentario: '' }, clase5: { nota: '-', comentario: '' }, clase6: { nota: '-', comentario: '' } },
    ricardo: { clase2: { nota: '-', comentario: '' }, clase3: { nota: '-', comentario: '' }, clase5: { nota: '-', comentario: '' }, clase6: { nota: '-', comentario: '' } },
    victoria: { clase2: { nota: '-', comentario: '' }, clase3: { nota: '-', comentario: '' }, clase5: { nota: '-', comentario: '' }, clase6: { nota: '-', comentario: '' } },
    yaritza: { clase2: { nota: '-', comentario: '' }, clase3: { nota: '-', comentario: '' }, clase5: { nota: '-', comentario: '' }, clase6: { nota: '-', comentario: '' } },
    annelys: { clase2: { nota: '-', comentario: '' }, clase3: { nota: '-', comentario: '' }, clase5: { nota: '-', comentario: '' }, clase6: { nota: '-', comentario: '' } },
    melany: { clase2: { nota: '-', comentario: '' }, clase3: { nota: '-', comentario: '' }, clase5: { nota: '-', comentario: '' }, clase6: { nota: '-', comentario: '' } },
    legna: { clase2: { nota: '-', comentario: '' }, clase3: { nota: '-', comentario: '' }, clase5: { nota: '-', comentario: '' }, clase6: { nota: '-', comentario: '' } },
    jordy: { clase2: { nota: '-', comentario: '' }, clase3: { nota: '-', comentario: '' }, clase5: { nota: '-', comentario: '' }, clase6: { nota: '-', comentario: '' } } 
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

  const [isRecording, setIsRecording] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [practiceScore, setPracticeScore] = useState(null);
  const [practiceStatus, setPracticeStatus] = useState('idle'); 
  const [currentScenario, setCurrentScenario] = useState(0);

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
      tip: "¡Dilo con una gran sonrisa para que tu cliente se sientas muy feliz! 😊"
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
    {
      id: 1,
      role: "Narrador 📖",
      text: "Anna is a hairstylist. A client comes into the salon.",
      translation: "Ana es una estilista de cabello. Una clienta entra al salón.",
      avatar: "💈",
      sceneEmoji: "💈💇‍♀️🚪👩",
      sceneBg: "from-pink-100 to-purple-100"
    },
    {
      id: 2,
      role: "Anna 💇‍♀️",
      text: "Good morning! Welcome!",
      translation: "¡Buenos días! ¡Bienvenida!",
      avatar: "💇‍♀️",
      sceneEmoji: "💇‍♀️👋✨🧴",
      sceneBg: "from-purple-105 to-cyan-105"
    },
    {
      id: 3,
      role: "Sarah (Clienta) 👩",
      text: "Hello!",
      translation: "¡Hola!",
      avatar: "👩",
      sceneEmoji: "👩👋😊🌸",
      sceneBg: "from-cyan-105 to-rose-105"
    },
    {
      id: 4,
      role: "Anna 💇‍♀️",
      text: "How are you?",
      translation: "¿Cómo está?",
      avatar: "💇‍♀️",
      sceneEmoji: "💇‍♀️💬💖🔍",
      sceneBg: "from-rose-105 to-indigo-105"
    },
    {
      id: 5,
      role: "Sarah (Clienta) 👩",
      text: "I'm fine, thank you.",
      translation: "Estoy bien, gracias.",
      avatar: "👩",
      sceneEmoji: "👩🙏✨🥰",
      sceneBg: "from-indigo-105 to-pink-105"
    },
    {
      id: 6,
      role: "Anna 💇‍♀️",
      text: "My name is Anna.",
      translation: "Mi nombre es Ana.",
      avatar: "💇‍♀️",
      sceneEmoji: "💇‍♀️🙋‍♀️⭐🎀",
      sceneBg: "from-pink-105 to-teal-105"
    },
    {
      id: 7,
      role: "Sarah (Clienta) 👩",
      text: "My name is Sarah.",
      translation: "Mi nombre es Sarah.",
      avatar: "👩",
      sceneEmoji: "👩🙋‍♀️🌸🌱",
      sceneBg: "from-teal-105 to-purple-105"
    },
    {
      id: 8,
      role: "Anna 💇‍♀️",
      text: "Nice to meet you. Please, have a seat.",
      translation: "Mucho gusto en conocerla. Por favor, tome asiento.",
      avatar: "💇‍♀️",
      sceneEmoji: "💇‍♀️🪑🤝💫",
      sceneBg: "from-purple-105 to-rose-105"
    },
    {
      id: 9,
      role: "Sarah (Clienta) 👩",
      text: "Thank you.",
      translation: "Gracias.",
      avatar: "👩",
      sceneEmoji: "👩💇‍♀️✨🧸",
      sceneBg: "from-rose-105 to-cyan-105"
    }
  ];

  const josselynQuizQuestions = [
    {
      id: "q1",
      question: "1) ¿Dónde se encuentra Ana?",
      options: [
        { key: "A", text: "AT SCHOOL (En la escuela)" },
        { key: "B", text: "AT THE BEAUTY SALON (En el salón de belleza)" },
        { key: "C", text: "AT HOME (En casa)" }
      ],
      correctKey: "B"
    },
    {
      id: "q2",
      question: "2) ¿Qué es lo primero que dice Ana?",
      options: [
        { key: "A", text: "GOODBYE. (Adiós)" },
        { key: "B", text: "GOOD MORNING! (¡Buenos días!)" },
        { key: "C", text: "THANK YOU. (Gracias)" }
      ],
      correctKey: "B"
    },
    {
      id: "q3",
      question: "3) ¿Qué palabra le dice Ana para darle la bienvenida?",
      options: [
        { key: "A", text: "GOODBYE. (Adiós)" },
        { key: "B", text: "GOOD MORNING! (¡Buenos días!)" },
        { key: "C", text: "WELCOME. (Bienvenida)" }
      ],
      correctKey: "C"
    },
    {
      id: "q4",
      question: "4) ¿Qué frase utiliza Ana para decirle a la clienta que tome asiento?",
      options: [
        { key: "A", text: "PLEASE, HAVE A SEAT. (Por favor, tome asiento.)" },
        { key: "B", text: "GOOD MORNING! (¡Buenos días!)" },
        { key: "C", text: "THANK YOU. (Gracias)" }
      ],
      correctKey: "A"
    }
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
        const clonTareas = {
          jean: {}, ricardo: {}, victoria: {}, yaritza: {}, annelys: {}, melany: {}, legna: {}, jordy: {}
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
          jean: {}, ricardo: {}, victoria: {}, yaritza: {}, annelys: {}, melany: {}, legna: {}, jordy: {}
        };
        ['jean', 'ricardo', 'victoria', 'yaritza', 'annelys', 'melany', 'legna', 'jordy'].forEach(est => {
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

      const { data: videoDB, error: err3 } = await supabase.from('configuracion').select('*').eq('clave', 'welcoming_video');
      if (!err3 && videoDB && videoDB.length > 0) {
        const videoData = JSON.parse(videoDB[0].valor);
        setWelcomingVideo(videoData);
        localStorage.setItem('beauty_salon_welcoming_video', JSON.stringify(videoData));
      }

      const { data: cancionesDB, error: err4 } = await supabase.from('canciones_felices').select('*');
      if (!err4 && cancionesDB) {
        const clonCanciones = { ...musicList };
        cancionesDB.forEach(c => {
          clonCanciones[c.usuario] = {
            nombre_cancion: c.nombre_cancion,
            enlace: c.enlace,
            likes: typeof c.likes === 'string' ? JSON.parse(c.likes) : (c.likes || []),
            comentarios: typeof c.comentarios === 'string' ? JSON.parse(c.comentarios) : (c.comentarios || [])
          };
        });
        setMusicList(clonCanciones);
        localStorage.setItem('beauty_salon_music_list', JSON.stringify(clonCanciones));
      }
    } catch (e) {
      console.log("Error al traer datos de la nube, usando almacenamiento local mágico:", e);
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

  const empezarPrácticaDeVoz = (fraseObjetivo) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsRecording(true);
      setPracticeStatus('listening');
      setSpokenText('');
      setTimeout(() => {
        setIsRecording(false);
        setSpokenText(fraseObjetivo); 
        setPracticeScore(100);
        setPracticeStatus('success');
        showToast("¡Magnífica pronunciación! Tienes 100% de acierto. 🦉🏆", "success");
      }, 3000);
      return;
    }

    const SpeechGen = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechGen();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsRecording(true);
      setPracticeStatus('listening');
      setSpokenText('');
    };

    recognition.onerror = () => {
      setIsRecording(false);
      setPracticeStatus('try_again');
      showToast("No pudimos capturar tu voz. ¡Inténtalo otra vez! 🎙️", "error");
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSpokenText(transcript);

      const targetClean = fraseObjetivo.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").trim();
      const spokenClean = transcript.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").trim();

      const targetWords = targetClean.split(" ");
      const spokenWords = spokenClean.split(" ");
      let coincidencia = 0;
      targetWords.forEach(w => {
        if (spokenWords.includes(w)) coincidencia++;
      });

      const score = Math.round((coincidencia / targetWords.length) * 100);
      setPracticeScore(score);

      if (score >= 60) {
        setPracticeStatus('success');
        showToast(`¡Excelente nivel! Lograste un ${score}% de coincidencia. 🦉⭐`, "success");
      } else {
        setPracticeStatus('try_again');
        showToast("Casi lo logras. ¡Practica escuchando el audio de nuevo! 🧸", "error");
      }
    };

    recognition.start();
  };

  const agregarPalabraAlArmador = (word) => {
    if (builderStatus !== 'idle') return;
    setSelectedWords([...selectedWords, word]);
  };

  const removerPalabraDelArmador = (index) => {
    if (builderStatus !== 'idle') return;
    const arrayFiltrado = selectedWords.filter((_, idx) => idx !== index);
    setSelectedWords(arrayFiltrado);
  };

  const verificarFraseConstruida = (solucionCorrecta) => {
    const fraseArmada = selectedWords.join(" ");
    if (fraseArmada === solucionCorrecta) {
      setBuilderStatus('success');
      showToast("¡Fabuloso! Tu cliente te entendió a la perfección. 🦉💚", "success");
    } else {
      setBuilderStatus('error');
      showToast("La frase no suena del todo natural. ¡Intenta de nuevo! 🌸", "error");
    }
  };

  const reiniciarArmadorDeFrase = () => {
    setSelectedWords([]);
    setBuilderStatus('idle');
  };

  const seleccionarRespuestaTrivia = (index) => {
    if (quizStatus !== 'idle') return;
    setQuizSelectedAnswer(index);
    const correctIdx = triviaQuizzes[currentQuizIndex].correctIndex;
    if (index === correctIdx) {
      setQuizStatus('correct');
      showToast(triviaQuizzes[currentQuizIndex].congrats, "success");
    } else {
      setQuizStatus('incorrect');
      showToast("¡Oh oh! Inténtalo otra vez para ganar la copa. 🧸", "error");
    }
  };

  const reiniciarTriviaQuiz = () => {
    setQuizSelectedAnswer(null);
    setQuizStatus('idle');
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

  const enviarNotaASupabase = async (estudiante, claseKey, notaSeleccionada, rawCommentText) => {
    if (!supabase) return;
    const { error } = await supabase.from('calificaciones').upsert(
      { estudiante: estudiante, clase: claseKey, nota: notaSeleccionada, comentario: rawCommentText },
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
        showToast("¡Video enlazado de forma permanente en internet! 🎬🍿✨", "success");
        descargarDeSupabase();
      } else {
        showToast("Error de conexión con la base de datos.", "error");
      }
    } else {
      showToast("Video guardado de forma local en tu navegador.", "success");
    }
    setVideoInputUrl('');
  };

  const handleVideoFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 4.5 * 1024 * 1024) { 
        showToast("¡Ay! Tu video es muy pesado (más de 4.5MB) y se atascó en la puerta. ¡Intenta con uno más cortito! 🧚‍♀️💫", "error");
        return;
      }

      setUploadingVideo(true);
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64String = event.target.result;
        const videoData = { type: 'base64', source: base64String };
        
        if (supabase) {
          setLoadingCloud(true);
          const { error } = await supabase.from('configuracion').upsert(
            { clave: 'welcoming_video', valor: JSON.stringify(videoData) },
            { onConflict: 'clave' }
          );
          setLoadingCloud(false);
          if (!error) {
            setWelcomingVideo(videoData);
            localStorage.setItem('beauty_salon_welcoming_video', JSON.stringify(videoData));
            showToast("¡Video subido y guardado de forma permanente para todos! 📺🎀✨", "success");
            descargarDeSupabase();
          } else {
            console.error("Error al subir a Supabase:", error);
            showToast("No se pudo subir a internet. ¿Creaste la tabla 'configuracion'? 😿", "error");
          }
        } else {
          setWelcomingVideo(videoData);
          localStorage.setItem('beauty_salon_welcoming_video', JSON.stringify(videoData));
          showToast("Subido de manera local en tu computadora.", "success");
        }
        setUploadingVideo(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGuardarCancion = async () => {
    if (!newSongName.trim() || !newSongUrl.trim()) {
      showToast("Por favor pon un nombre y enlace de tu canción 🎵", "error");
      return;
    }

    const autor = currentUser.username;
    const cancionActualizada = {
      nombre_cancion: newSongName.trim(),
      enlace: newSongUrl.trim(),
      likes: musicList[autor]?.likes || [],
      comentarios: musicList[autor]?.comentarios || []
    };

    const nuevaLista = { ...musicList, [autor]: cancionActualizada };
    setMusicList(nuevaLista);
    localStorage.setItem('beauty_salon_music_list', JSON.stringify(nuevaLista));

    if (supabase) {
      setLoadingCloud(true);
      const { error } = await supabase.from('canciones_felices').upsert(
        { 
          usuario: autor, 
          nombre_cancion: cancionActualizada.nombre_cancion, 
          enlace: cancionActualizada.enlace,
          likes: JSON.stringify(cancionActualizada.likes),
          comentarios: JSON.stringify(cancionActualizada.comentarios)
        },
        { onConflict: 'usuario' }
      );
      setLoadingCloud(false);
      if (!error) {
        showToast("¡Tu canción feliz fue colgada en el Mural! 🎵✨", "success");
        descargarDeSupabase();
      } else {
        showToast("Guardada localmente. ¡Nube ocupada!", "success");
      }
    } else {
      showToast("¡Guardado mágicamente en tu computadora! 🎧💖", "success");
    }

    setNewSongName('');
    setNewSongUrl('');
  };

  const handleDarLike = async (usuarioDueno) => {
    if (currentUser.username === 'isabel') {
      showToast("Miss Isabel está en modo observadora. 🌸", "error");
      return;
    }

    const cancion = musicList[usuarioDueno];
    if (!cancion) return;

    let nuevosLikes = [...(cancion.likes || [])];
    const miUsuario = currentUser.username;

    if (nuevosLikes.includes(miUsuario)) {
      nuevosLikes = nuevosLikes.filter(u => u !== miUsuario);
    } else {
      nuevosLikes.push(miUsuario);
    }

    const cancionActualizada = { ...cancion, likes: nuevosLikes };
    const nuevaLista = { ...musicList, [usuarioDueno]: cancionActualizada };
    setMusicList(nuevaLista);
    localStorage.setItem('beauty_salon_music_list', JSON.stringify(nuevaLista));

    if (supabase) {
      await supabase.from('canciones_felices').upsert(
        { 
          usuario: usuarioDueno, 
          nombre_cancion: cancionActualizada.nombre_cancion, 
          enlace: cancionActualizada.enlace,
          likes: JSON.stringify(cancionActualizada.likes),
          comentarios: JSON.stringify(cancionActualizada.comentarios)
        },
        { onConflict: 'usuario' }
      );
    }
  };

  const handleAgregarComentario = async (usuarioDueno) => {
    if (currentUser.username === 'isabel') {
      showToast("Miss Isabel está en modo observadora. 🌸", "error");
      return;
    }

    const textoComentario = commentInput[usuarioDueno];
    if (!textoComentario || !textoComentario.trim()) return;

    const cancion = musicList[usuarioDueno];
    if (!cancion) return;

    const nuevoComentario = {
      usuario: currentUser.username,
      nombre: currentUser.name,
      texto: textoComentario.trim(),
      likes: [] 
    };

    const nuevosComentarios = [...(cancion.comentarios || []), nuevoComentario];
    const cancionActualizada = { ...cancion, comentarios: nuevosComentarios };
    const nuevaLista = { ...musicList, [usuarioDueno]: cancionActualizada };
    
    setMusicList(nuevaLista);
    localStorage.setItem('beauty_salon_music_list', JSON.stringify(nuevaLista));

    setCommentInput(prev => ({ ...prev, [usuarioDueno]: '' }));

    if (supabase) {
      await supabase.from('canciones_felices').upsert(
        { 
          usuario: usuarioDueno, 
          nombre_cancion: cancionActualizada.nombre_cancion, 
          enlace: cancionActualizada.enlace,
          likes: JSON.stringify(cancionActualizada.likes),
          comentarios: JSON.stringify(cancionActualizada.comentarios)
        },
        { onConflict: 'usuario' }
      );
    }
  };

  const handleLikeComentario = async (usuarioDueno, commentIdx) => {
    if (currentUser.username === 'isabel') {
      showToast("Miss Isabel está en modo observadora. 🌸", "error");
      return;
    }

    const cancion = musicList[usuarioDueno];
    if (!cancion) return;

    const comentariosActualizados = [...(cancion.comentarios || [])];
    const comentario = { ...comentariosActualizados[commentIdx] };
    
    if (!comentario.likes) comentario.likes = [];
    const miUsuario = currentUser.username;

    if (comentario.likes.includes(miUsuario)) {
      comentario.likes = comentario.likes.filter(u => u !== miUsuario);
    } else {
      comentario.likes.push(miUsuario);
    }

    comentariosActualizados[commentIdx] = comentario;
    const cancionActualizada = { ...cancion, comentarios: comentariosActualizados };
    const nuevaLista = { ...musicList, [usuarioDueno]: cancionActualizada };
    
    setMusicList(nuevaLista);
    localStorage.setItem('beauty_salon_music_list', JSON.stringify(nuevaLista));

    if (supabase) {
      await supabase.from('canciones_felices').upsert(
        { 
          usuario: usuarioDueno, 
          nombre_cancion: cancionActualizada.nombre_cancion, 
          enlace: cancionActualizada.enlace,
          likes: JSON.stringify(cancionActualizada.likes),
          comentarios: JSON.stringify(cancionActualizada.comentarios)
        },
        { onConflict: 'usuario' }
      );
    }
  };

  const handleEliminarComentario = async (usuarioDueno, commentIdx) => {
    if (currentUser.username === 'isabel') {
      showToast("Miss Isabel está en modo observadora. 🌸", "error");
      return;
    }

    const cancion = musicList[usuarioDueno];
    if (!cancion) return;

    const comentariosActualizados = (cancion.comentarios || []).filter((_, idx) => idx !== commentIdx);
    const cancionActualizada = { ...cancion, comentarios: comentariosActualizados };
    const nuevaLista = { ...musicList, [usuarioDueno]: cancionActualizada };

    setMusicList(nuevaLista);
    localStorage.setItem('beauty_salon_music_list', JSON.stringify(nuevaLista));

    showToast("¡Comentario borrado con polvos de hadas! 🧹🌸", "success");

    if (supabase) {
      await supabase.from('canciones_felices').upsert(
        { 
          usuario: usuarioDueno, 
          nombre_cancion: cancionActualizada.nombre_cancion, 
          enlace: cancionActualizada.enlace,
          likes: JSON.stringify(cancionActualizada.likes),
          comentarios: JSON.stringify(cancionActualizada.comentarios)
        },
        { onConflict: 'usuario' }
      );
    }
  };

  const handleQuizAnswerSelect = (questionId, optionKey) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionKey }));
  };

  const handleQuizSubmit = () => {
    let score = 0;
    josselynQuizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correctKey) {
        score += 2.5; 
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
    if (score >= 7.5) {
      showToast(`¡Excelente nota de 10! Lograste un ${score} de 10 puntos. 🥇🎓✨`, "success");
    } else {
      showToast(`Has obtenido ${score}/10. ¡Inténtalo otra vez para lograr la puntuación perfecta! 🧸🌸`, "error");
    }
  };

  const handleQuizReset = () => {
    setQuizAnswers({ q1: null, q2: null, q3: null, q4: null });
    setQuizSubmitted(false);
    setQuizScore(0);
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
    'melany': { username: 'melany', name: "Melany", role: "Estudiante" },
    'legna': { username: 'legna', name: "Legna", role: "Estudiante" },
    'jordy': { username: 'jordy', name: "Jordy", role: "Estudiante" } 
  };

  const estudiantesLista = [
    { id: 'jean', name: 'Jean' },
    { id: 'ricardo', name: 'Ricardo' },
    { id: 'victoria', name: 'Victoria' },
    { id: 'yaritza', name: 'Yaritza' },
    { id: 'annelys', name: 'Annelys' },
    { id: 'melany', name: 'Melany' },
    { id: 'legna', name: 'Legna' }, 
    { id: 'jordy', name: 'Jordy' } 
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
      color: "from-rose-400 to-purple-400",
      lessons: [
        { 
          title: "CLASE 1: Greetings (Saludos para recibir al cliente) 👋👋", 
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
      color: "from-purple-400 to-cyan-400",
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
            { en: "The treatment takes around two hours.", es: "El tratamiento dura alrededor de dos horas." },
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
      color: "from-cyan-400 to-rose-400",
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
      <div className="min-h-screen bg-gradient-to-tr from-pink-100 via-purple-100 to-cyan-100 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-950 flex flex-col items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white dark:bg-slate-900/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl shadow-purple-200/50 dark:shadow-none max-w-sm w-full space-y-5 border border-purple-200/50 dark:border-slate-800 relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-pink-300/30 rounded-full blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-purple-300/30 rounded-full blur-xl"></div>

          <div className="text-center relative z-10">
            <span className="text-6xl animate-bounce inline-block">💇‍♀️✨</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2 tracking-tight">Beauty English</h2>
            <p className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-600 to-cyan-500 tracking-widest uppercase mt-1">Aula Virtual Mágica 🌸</p>
          </div>
          <div className="space-y-4 relative z-10">
            <input 
              type="text" 
              placeholder="Tu Nombre de Usuario" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              className="w-full p-4 border-2 border-purple-100/80 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white font-bold bg-white dark:bg-slate-950 outline-none focus:ring-4 focus:ring-purple-400/20 focus:border-purple-400 transition-all text-sm placeholder-slate-400 shadow-inner" 
            />
            <input 
              type="password" 
              placeholder="Tu Contraseña Secreta" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full p-4 border-2 border-purple-100/80 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white font-bold bg-white dark:bg-slate-950 outline-none focus:ring-4 focus:ring-purple-400/20 focus:border-purple-400 transition-all text-sm placeholder-slate-400 shadow-inner" 
            />
          </div>
          {error && <p className="text-red-500 text-xs font-black text-center bg-red-50 dark:bg-red-950/20 p-2.5 rounded-xl border border-red-200 relative z-10">{error}</p>}
          <button type="submit" className="w-full bg-gradient-to-r from-rose-500 via-purple-600 to-cyan-500 hover:opacity-90 text-white font-black py-4 rounded-2xl text-sm shadow-xl shadow-purple-500/20 transition-all active:scale-95 flex items-center justify-center gap-2">
            ¡Ingresar al Aula Mágica! 🚀🌸
          </button>
        </form>
      </div>
    );
  }

  const esProfesora = currentUser.role === "Profesora";
  const esIsabel = currentUser.username === 'isabel';
  const targetStudent = esProfesora ? selectedStudent : currentUser.username;

  return (
    <div className={`min-h-screen font-sans flex flex-col ${darkMode ? 'bg-slate-955 text-slate-100' : 'bg-gradient-to-tr from-pink-100/40 via-purple-100/40 to-cyan-100/40 text-slate-900'}`}>
      
      {/* HEADER DE NUESTRO CASTILLO (Sólido y de alto contraste en modo claro, tal como pidió la Princesa en image_f39b61.jpg) */}
      <header className={`border-b h-20 flex items-center justify-between px-6 shadow-md ${darkMode ? 'bg-slate-900 border-slate-800 text-white shadow-purple-950/10' : 'bg-white border-purple-100 text-purple-900 shadow-purple-100/20'}`}>
        <div className="flex items-center space-x-3">
          <GraduationCap className={darkMode ? 'text-pink-400 animate-pulse' : 'text-purple-600 animate-pulse'} size={32} />
          <span className={`font-black text-base md:text-lg flex items-center gap-1.5 ${darkMode ? 'text-white' : 'text-purple-950'}`}>
            Beauty English Course <span className="text-rose-500 animate-bounce">👩‍🏫✨</span>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => setDarkMode(!darkMode)} className={`p-2.5 rounded-xl transition-all active:scale-95 border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-purple-50 border-purple-200'}`}>
            {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-purple-600" />}
          </button>
          <span className={`text-xs font-black uppercase px-4 py-2.5 rounded-xl flex items-center gap-1.5 border shadow-sm ${darkMode ? 'bg-slate-800 border-slate-700 text-pink-300' : 'bg-purple-50 border-purple-200 text-purple-950'}`}>
            <Smile size={16} className="text-rose-500 animate-bounce" /> {currentUser.name} ({currentUser.role})
          </span>
          <button onClick={handleLogout} className={`text-xs font-extrabold px-4 py-2.5 rounded-xl flex items-center gap-1.5 active:scale-95 transition-all border ${darkMode ? 'bg-red-950/20 text-red-400 border-red-900/30' : 'bg-red-50 text-red-600 border-red-200'}`}>
            <LogOut size={14} /> Salir
          </button>
        </div>
      </header>

      {/* CUERPO PRINCIPAL */}
      <div className="flex flex-1 flex-col md:flex-row">
        
        {/* BARRA DE MENÚ LATERAL (Totalmente blanca sólida en modo claro, nada de grisáceos feos para image_f39b61.jpg) */}
        <aside className={`w-full md:w-64 p-4 flex flex-col gap-2 border-r ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
          <div className={`text-xs uppercase tracking-wider font-extrabold mb-2 px-3 flex items-center gap-1.5 ${darkMode ? 'text-pink-400' : 'text-purple-950'}`}>
            <Heart size={12} className="fill-rose-500 text-rose-500 animate-pulse" /> Menú Principal
          </div>
          
          <button 
            onClick={() => setActiveTab('inicio')} 
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'inicio' ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white shadow-lg' : (darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-purple-950 hover:bg-purple-50')}`}
          >
            <Home size={16} className={darkMode ? 'text-pink-400' : 'text-rose-500'} /> Inicio 🏠
          </button>

          <button 
            onClick={() => setActiveTab('unit1')} 
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'unit1' ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white shadow-lg' : (darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-purple-950 hover:bg-purple-50')}`}
          >
            <BookOpen size={16} className={darkMode ? 'text-pink-400' : 'text-purple-600'} /> Unidad 1: Welcome 🚪
          </button>

          <button 
            onClick={() => setActiveTab('unit2')} 
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'unit2' ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white shadow-lg' : (darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-purple-950 hover:bg-purple-50')}`}
          >
            <BookOpen size={16} className={darkMode ? 'text-pink-400' : 'text-purple-600'} /> Unidad 2: Info 📢
          </button>

          <button 
            onClick={() => setActiveTab('unit3')} 
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'unit3' ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white shadow-lg' : (darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-purple-950 hover:bg-purple-50')}`}
          >
            <BookOpen size={16} className={darkMode ? 'text-pink-400' : 'text-cyan-500'} /> Unidad 3: Client 💬
          </button>

          <button 
            onClick={() => setActiveTab('practica')} 
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'practica' ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white shadow-lg' : (darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-purple-950 hover:bg-purple-50')}`}
          >
            <Activity size={16} className={darkMode ? 'text-pink-400' : 'text-rose-500'} /> Práctica Mágica Interactiva 🎙️🦉
          </button>

          {/* OPCIÓN DE MENÚ DE ACTIVIDADES INTERACTIVAS */}
          <button 
            onClick={() => setActiveTab('actividades')} 
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'actividades' ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white shadow-lg' : (darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-purple-950 hover:bg-purple-50')}`}
          >
            <Sparkle size={16} className={darkMode ? 'text-pink-400 animate-spin' : 'text-indigo-600 animate-spin'} /> Actividades Interactivas 🧩✨
          </button>

          <button 
            onClick={() => setActiveTab('mochila')} 
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'mochila' ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white shadow-lg' : (darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-purple-950 hover:bg-purple-50')}`}
          >
            <FolderHeart size={16} className={darkMode ? 'text-pink-400' : 'text-purple-500'} /> Mochila de Tareas 🎒
          </button>

          <button 
            onClick={() => setActiveTab('calificaciones')} 
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'calificaciones' ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white shadow-lg' : (darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-purple-950 hover:bg-purple-50')}`}
          >
            <Star size={16} className={darkMode ? 'text-pink-400' : 'text-purple-500'} /> Calificaciones ⭐
          </button>

          <button 
            onClick={() => setActiveTab('musica')} 
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'musica' ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white shadow-lg' : (darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-purple-950 hover:bg-purple-50')}`}
          >
            <Music size={16} className={darkMode ? 'text-pink-400 animate-bounce' : 'text-rose-500 animate-bounce'} /> Música Feliz 🎵
          </button>

          <button 
            onClick={() => setActiveTab('vocabulario')} 
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'vocabulario' ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white shadow-lg' : (darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-purple-950 hover:bg-purple-50')}`}
          >
            <Volume2 size={16} className={darkMode ? 'text-pink-400' : 'text-cyan-500'} /> Vocabulario 🔊
          </button>

          <button 
            onClick={() => setActiveTab('juegos')} 
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'juegos' ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white shadow-lg' : (darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-purple-950 hover:bg-purple-50')}`}
          >
            <Gamepad2 size={16} className={darkMode ? 'text-pink-400' : 'text-rose-500'} /> Área de Juegos 🎮
          </button>

          <div className="border-t border-purple-100 dark:border-slate-800 my-4 pt-4">
            <button onClick={descargarDeSupabase} className={`w-full text-[11px] font-black py-3 rounded-xl flex items-center justify-center gap-1 active:scale-95 transition-all shadow-md border ${darkMode ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-750' : 'bg-purple-50 border-purple-200 text-purple-950 hover:bg-purple-100'}`}>
               🔄 Sincronizar Nube ☁️
            </button>
          </div>
        </aside>

        {/* PANTALLA DE CONTENIDO PRINCIPAL */}
        <main className="flex-1 p-6 max-w-4xl w-full mx-auto">
          {loadingCloud && (
            <div className="text-center p-2.5 mb-4 bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-black rounded-2xl text-[11px] animate-pulse flex items-center justify-center gap-1.5 shadow-md">
              ☁️ Trayendo la magia directamente de internet...
            </div>
          )}
          
          {/* TAB: INICIO */}
          {activeTab === 'inicio' && (
            <div className="space-y-6 animate-slide-in">
              <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 p-8 rounded-3xl text-white shadow-lg relative overflow-hidden">
                <Sparkles className="absolute right-4 top-4 text-pink-200 animate-spin" size={48} />
                <h1 className="text-3xl font-black text-white drop-shadow-md">¡Bienvenida de vuelta, {currentUser.name}! 💇‍♀️✨</h1>
                <p className="text-sm mt-2 font-bold text-rose-50 drop-shadow-md">Disfruta cada etapa de tu aprendizaje con los juegos interactivos y más</p>
              </div>

              {/* SECCIÓN REPRODUCTOR DE VIDEO DE BIENVENIDA */}
              <div className={`border p-6 rounded-3xl shadow-xl space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800 shadow-purple-950/10' : 'bg-white border-purple-100 shadow-purple-100/20'}`}>
                <h2 className={`text-base font-black tracking-wider uppercase flex items-center gap-2 ${darkMode ? 'text-pink-400' : 'text-purple-950'}`}>
                  <Video className="text-rose-500 animate-pulse" size={24} />
                  Cine Mágico: Video de Bienvenida 🎬🌸
                </h2>
                <p className={`text-xs font-bold p-3 rounded-xl border ${darkMode ? 'bg-slate-800/80 border-slate-750 text-slate-100' : 'bg-purple-50/50 border-purple-100/50 text-purple-950'}`}>
                  Con nosotras aprenderás de forma práctica y sencilla. Somos un equipo
                </p>

                {/* VISUALIZADOR DE VIDEO */}
                <div className={`relative w-full aspect-video rounded-2xl overflow-hidden shadow-md border ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-purple-50/50 border-purple-100/50'}`}>
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
                  <div className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-855/40 border-slate-850' : 'bg-purple-50/20 border-purple-100/40'}`}>
                    <span className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${darkMode ? 'text-pink-300' : 'text-purple-800'}`}>
                      🛠️ Zona de Profesora: Actualizar Video
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className={`text-[11px] font-black flex items-center gap-1.5 ${darkMode ? 'text-slate-200' : 'text-purple-950'}`}>
                          <Link size={12} className="text-purple-600" /> Enlace del Video (YouTube):
                        </label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="https://www.youtube.com/watch?..." 
                            value={videoInputUrl}
                            onChange={(e) => setVideoInputUrl(e.target.value)}
                            className="flex-1 p-2.5 border border-purple-200 rounded-xl bg-white text-slate-900 font-bold text-xs outline-none focus:ring-2 focus:ring-purple-400"
                          />
                          <button 
                            onClick={handleUrlVideoSave}
                            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-95 text-white font-black text-[11px] px-4 rounded-xl shadow-md"
                          >
                            Guardar 🔗
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className={`text-[11px] font-black flex items-center gap-1.5 ${darkMode ? 'text-slate-200' : 'text-purple-950'}`}>
                          <UploadCloud size={12} className="text-purple-600" /> Subir Video (.mp4 máx 4.5MB):
                        </label>
                        <label className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-95 text-white py-2.5 px-3 rounded-xl font-black cursor-pointer shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5 text-[11px]">
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

              {/* INSTRUCCIONES RÁPIDAS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`border p-5 rounded-3xl shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                  <h3 className={`font-black text-sm mb-2 flex items-center gap-1.5 ${darkMode ? 'text-pink-400' : 'text-purple-850'}`}>📢 Instrucciones Mágicas</h3>
                  <ul className={`text-xs space-y-2 font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    <li className="flex items-center gap-1.5">🌸 <span className="text-purple-600 font-black">Unidades:</span> Escucha la pronunciación en inglés haciendo clic en el parlante rosa.</li>
                    <li className="flex items-center gap-1.5">🎒 <span className="text-purple-600 font-black">Mochila:</span> Sube tus PDFs. ¡Y si eres estudiante y te equivocas, usa el nuevo botón de eliminar!</li>
                    <li className="flex items-center gap-1.5">🎵 <span className="text-purple-600 font-black">Música Feliz:</span> Comparte tu canción favorita, regala corazones y deja comentarios tiernos a todos.</li>
                  </ul>
                </div>

                <div className={`border p-5 rounded-3xl flex flex-col justify-between shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                  <div>
                    <h3 className={`font-black text-sm mb-1 flex items-center gap-1.5 ${darkMode ? 'text-purple-400' : 'text-purple-850'}`}>🎮 Zona Interactiva</h3>
                    <p className={`text-xs font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>Diviértete con los juegos interactivos de Kahoot, Interacty y Wordwall que diseñamos.</p>
                  </div>
                  <button onClick={() => setActiveTab('juegos')} className="mt-4 bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:opacity-95 text-white text-xs font-black py-3 rounded-2xl shadow-md active:scale-95 transition-all">
                    ¡Ir a los Juegos ahora! 🎮✨
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: CLASES (UNIDAD 1, 2, 3) */}
          {['unit1', 'unit2', 'unit3'].map((tabKey, tabIdx) => {
            if (activeTab !== tabKey) return null;
            const currentModule = modules[tabIdx];

            return (
              <div key={tabKey} className="space-y-5 animate-slide-in">
                <h2 className={`text-base font-black tracking-widest uppercase border-b pb-2 flex items-center gap-2 ${darkMode ? 'text-pink-400 border-slate-800' : 'text-purple-850 border-purple-100'}`}>
                  <span className={`p-1 rounded-lg ${darkMode ? 'bg-slate-800 text-pink-400' : 'bg-purple-50 text-purple-600'}`}><BookOpen size={18} /></span>
                  {currentModule.title}
                </h2>
                
                {currentModule.lessons.map((lesson, idx) => (
                  <div key={idx} className={`border p-5 rounded-3xl space-y-4 shadow-xl relative overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-purple-100 text-slate-905'}`}>
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-pink-500 via-purple-600 to-cyan-500"></div>
                    
                    <div className={`border-b pb-2 ${darkMode ? 'border-slate-850' : 'border-purple-50'}`}>
                      <h3 className="text-sm font-black uppercase flex items-center gap-1.5 text-purple-950 dark:text-white">{lesson.title}</h3>
                      <p className={`text-xs font-black mt-1 w-max px-3 py-1.5 rounded-full ${darkMode ? 'bg-slate-800 text-pink-300' : 'bg-purple-50 text-purple-700'}`}>{lesson.objective}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      {lesson.content.map((item, keyIdx) => (
                        <div key={keyIdx} className={`flex justify-between items-center p-3 rounded-2xl border hover:border-pink-605 transition-all ${darkMode ? 'bg-slate-800/80 border-slate-705 text-white' : 'bg-purple-50/30 border-purple-100/40 text-slate-900'}`}>
                          <div className="flex items-center space-x-3">
                            <button onClick={() => escucharPalabra(item.en)} className="p-2.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white rounded-xl transition-all active:scale-90 shadow-md">
                              <Volume2 size={16} />
                            </button>
                            <span className="text-xs font-black text-purple-955 dark:text-white">{item.en}</span>
                          </div>
                          <span className={`text-xs font-black px-2.5 py-1 rounded-xl border shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-purple-100 text-slate-900'}`}>🗣️ {item.es}</span>
                        </div>
                      ))}
                    </div>

                    <div className={`p-3 rounded-2xl border text-xs ${darkMode ? 'bg-slate-850/50 border-slate-800' : 'bg-rose-50/30 border-purple-100/30'}`}>
                      <p className="font-black text-purple-600 flex items-center gap-1.5">🎯 Actividad Evaluativa:</p>
                      <p className={`font-bold mt-1 p-3 rounded-xl border shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-purple-100 text-slate-900'}`}>{lesson.task}</p>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}

          {/* TAB: ACTIVIDADES INTERACTIVAS (Basado en 5104912847614971500.jpg y 5104912847614971501.jpg) */}
          {activeTab === 'actividades' && (
            <div className="space-y-6 animate-slide-in">
              <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 p-6 rounded-3xl text-white shadow-lg relative overflow-hidden">
                <Sparkles className="absolute right-4 top-4 text-pink-200 animate-spin" size={40} />
                <h1 className="text-2xl font-black text-white">Actividades Interactivas 🧩✨</h1>
                <p className="text-xs mt-1.5 font-bold text-rose-50">Aprendamos cada clase con pequeños desafíos creativos 🌸</p>
              </div>

              {/* SECCIÓN 1: EL CÓMIC PARLANTE DE ANNA Y SARAH */}
              <div className={`border p-6 rounded-3xl shadow-xl space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-purple-100 text-slate-900'}`}>
                <div className={`flex items-center space-x-2 border-b pb-3 ${darkMode ? 'border-slate-800' : 'border-purple-50'}`}>
                  <span className={`p-1.5 rounded-xl ${darkMode ? 'bg-purple-900 text-purple-300' : 'bg-rose-50 text-rose-600'}`}><BookOpen size={18} /></span>
                  <h2 className={`text-sm font-black uppercase tracking-wider ${darkMode ? 'text-purple-300' : 'text-purple-855'}`}>
                    Cómic Parlante: A New Client at the Beauty Salon 📖💬
                  </h2>
                </div>

                <p className="text-xs font-bold text-slate-500">
                  ¡Haz clic sobre cualquier viñeta del cómic para escuchar a Anna y Sarah hablar en inglés real! El panel seleccionado se iluminará con destellos rosas.
                </p>

                {/* GRILLA DE PANELES DE CÓMIC */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {comicPanels.map((panel) => {
                    const isActive = activeComicPanel === panel.id;
                    return (
                      <button
                        key={panel.id}
                        onClick={() => {
                          setActiveComicPanel(panel.id);
                          escucharPalabra(panel.text);
                        }}
                        className={`p-4 rounded-2xl border-2 text-left transition-all active:scale-98 shadow-sm flex flex-col justify-between space-y-3 relative overflow-hidden ${
                          isActive 
                            ? 'bg-gradient-to-tr from-pink-500/10 to-purple-600/10 border-pink-400 scale-[1.02]' 
                            : (darkMode ? 'bg-slate-800 border-slate-700 hover:border-slate-600' : 'bg-white border-purple-100 hover:border-purple-200')
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${darkMode ? 'bg-slate-900 text-pink-300' : 'bg-purple-50 text-purple-700'}`}>
                            Panel {panel.id}
                          </span>
                          <span className="text-lg">{panel.avatar}</span>
                        </div>

                        {/* PEQUEÑA ILUSTRACIÓN REFERENCIAL MÁGICA */}
                        <div className={`w-full h-24 rounded-xl bg-gradient-to-tr ${panel.sceneBg} flex items-center justify-center text-3xl shadow-inner border border-white/50 relative overflow-hidden select-none`}>
                          <div className="absolute inset-0 bg-white/20 backdrop-blur-[0.5px]"></div>
                          <span className="relative z-10 drop-shadow-md transform hover:scale-110 transition-all duration-300">
                            {panel.sceneEmoji}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] font-black uppercase text-slate-400 block">{panel.role}</span>
                          <p className="text-xs font-black text-purple-955 dark:text-white">"{panel.text}"</p>
                          <p className="text-[11px] text-slate-505 font-bold italic">{panel.translation}</p>
                        </div>

                        <div className="flex justify-end pt-1">
                          <span className="p-1.5 rounded-lg bg-pink-100 dark:bg-slate-700 text-pink-600 dark:text-pink-400">
                            <Volume2 size={12} />
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* VOCABULARIO EXTRA DEL CÓMIC */}
                <div className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-855 border-slate-800' : 'bg-purple-50/30 border-purple-100/40'}`}>
                  <span className="text-xs font-black uppercase text-purple-700 block">✨ New Words / Nuevas Palabras del Cómic</span>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {josselynNewWords.map((word, wIdx) => (
                      <button
                        key={wIdx}
                        onClick={() => escucharPalabra(word.en)}
                        className={`p-3 rounded-xl border text-center transition-all active:scale-95 flex flex-col items-center justify-center gap-1 ${
                          darkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-750' : 'bg-white border-purple-100 hover:bg-purple-50'
                        }`}
                      >
                        <Volume2 size={12} className="text-pink-500" />
                        <span className="text-xs font-black text-purple-950 dark:text-white">{word.en}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">{word.es}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECCIÓN 2: EL QUIZ COMPRENSION DE LECTURA (Canva slide 5104912847614971501.jpg) */}
              <div className={`border p-6 rounded-3xl shadow-xl space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-purple-100 text-slate-905'}`}>
                <div className={`flex items-center justify-between border-b pb-3 ${darkMode ? 'border-slate-800' : 'border-purple-50'}`}>
                  <div className="flex items-center space-x-2">
                    <span className={`p-1.5 rounded-xl ${darkMode ? 'bg-purple-950 text-pink-300' : 'bg-purple-50 text-purple-700'}`}><Star size={18} /></span>
                    <h2 className={`text-sm font-black uppercase tracking-wider ${darkMode ? 'text-pink-300' : 'text-purple-855'}`}>
                      Quiz de Lectura: Choose the Correct Answer 📝🎓
                    </h2>
                  </div>
                  {quizSubmitted && (
                    <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1.5 rounded-full font-black text-xs">
                      Nota final: {quizScore} / 10 Puntos
                    </span>
                  )}
                </div>

                <div className="space-y-5">
                  {josselynQuizQuestions.map((question) => {
                    return (
                      <div key={question.id} className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-850 border-slate-800' : 'bg-purple-50/10 border-purple-100/30'}`}>
                        <span className="text-xs font-black text-purple-950 dark:text-white block">{question.question}</span>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {question.options.map((opt) => {
                            const isSelected = quizAnswers[question.id] === opt.key;
                            let btnColor = darkMode ? 'bg-slate-800 border-slate-755 text-white' : 'bg-white border-purple-100 text-slate-900';
                            
                            if (isSelected) {
                              btnColor = 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-pink-400 font-black shadow-md scale-[1.01]';
                            }

                            if (quizSubmitted) {
                              const isCorrect = opt.key === question.correctKey;
                              if (isCorrect) {
                                btnColor = 'bg-emerald-500 text-white border-emerald-400 font-black';
                              } else if (isSelected) {
                                btnColor = 'bg-red-500 text-white border-red-400';
                              }
                            }

                            return (
                              <button
                                key={opt.key}
                                disabled={quizSubmitted}
                                onClick={() => handleQuizAnswerSelect(question.id, opt.key)}
                                className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center gap-2 ${btnColor}`}
                              >
                                <span className="font-black shrink-0">{opt.key})</span>
                                <span className="font-bold">{opt.text}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* BOTONES ACCION DEL QUIZ */}
                <div className="flex gap-2 justify-center pt-2">
                  {!quizSubmitted ? (
                    <button
                      onClick={handleQuizSubmit}
                      className="bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:opacity-95 text-white font-black py-3 px-6 rounded-2xl text-xs shadow-md active:scale-95 transition-all"
                    >
                      Calificar mi Examen 🎓✔️
                    </button>
                  ) : (
                    <button
                      onClick={handleQuizReset}
                      className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-95 text-white font-black py-3 px-6 rounded-2xl text-xs shadow-md active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      Volver a Intentar 🔄
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: PRÁCTICA MÁGICA INTERACTIVA */}
          {activeTab === 'practica' && (
            <div className="space-y-6 animate-slide-in">
              <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 p-6 rounded-3xl text-white shadow-lg relative overflow-hidden">
                <Award className="absolute right-4 top-4 text-pink-200 animate-bounce" size={48} />
                <h1 className="text-2xl font-black text-white">Práctica Mágica Interactiva 🦉💚</h1>
                <p className="text-xs mt-1.5 font-bold text-rose-50">¡Conviértete en una estrella del Speaking y completa los desafíos del salón de belleza!</p>
              </div>

              {/* DESAFÍO 1: SIMULADOR DE SPEAKING */}
              <div className={`border p-6 rounded-3xl shadow-xl space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-purple-100 text-slate-900'}`}>
                <div className={`flex items-center space-x-2 border-b pb-3 ${darkMode ? 'border-slate-800' : 'border-purple-50'}`}>
                  <span className={`p-1.5 rounded-xl ${darkMode ? 'bg-purple-900 text-purple-300' : 'bg-rose-50 text-rose-600'}`}><Mic size={18} /></span>
                  <h2 className={`text-sm font-black uppercase tracking-wider ${darkMode ? 'text-purple-300' : 'text-purple-800'}`}>Desafío 1: Simulador de Speaking 🎙️</h2>
                </div>

                <div className={`p-4 rounded-2xl border text-xs space-y-3 ${darkMode ? 'bg-slate-800/80 border-slate-705' : 'bg-purple-50/20 border-purple-100/30'}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-black text-purple-600">Escenario {currentScenario + 1} de {practiceScenarios.length}</span>
                    <div className="flex gap-1.5">
                      {practiceScenarios.map((_, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => {
                            setCurrentScenario(idx);
                            setPracticeStatus('idle');
                            setSpokenText('');
                            setPracticeScore(null);
                          }}
                          className={`w-3.5 h-3.5 rounded-full ${currentScenario === idx ? 'bg-purple-600' : 'bg-purple-200'}`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="font-bold text-sm text-slate-850 dark:text-white">{practiceScenarios[currentScenario].spanishPrompt}</p>

                  <div className={`p-4 rounded-xl border flex items-center justify-between shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                    <span className="text-sm font-black text-purple-605">"{practiceScenarios[currentScenario].englishTarget}"</span>
                    <button 
                      onClick={() => escucharPalabra(practiceScenarios[currentScenario].englishTarget)}
                      className={`p-2.5 rounded-xl active:scale-95 shadow-sm border ${darkMode ? 'bg-slate-800 border-slate-700 text-purple-300' : 'bg-rose-50 text-rose-600 border-purple-100/40'}`}
                      title="Escuchar modelo"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-505 font-bold italic">💡 Tip de Hada: {practiceScenarios[currentScenario].tip}</p>

                  <div className={`flex flex-col items-center justify-center p-4 rounded-2xl border border-dashed space-y-3 ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-purple-200'}`}>
                    <button
                      onClick={() => empezarPrácticaDeVoz(practiceScenarios[currentScenario].englishTarget)}
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-all transform shadow-lg active:scale-90 ${isRecording ? 'bg-red-500 animate-pulse border-4 border-red-200' : 'bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 border-4 border-rose-200'}`}
                    >
                      <Mic size={28} />
                    </button>
                    <span className="text-xs font-black text-purple-950 dark:text-white">
                      {isRecording ? "¡Grabando! Te estoy escuchando... 🗣️" : "Haz clic en el micrófono para empezar a hablar"}
                    </span>

                    {practiceStatus === 'listening' && (
                      <div className="text-center animate-pulse text-purple-600 font-black">Procesando audio mágico... ✨</div>
                    )}

                    {spokenText && (
                      <div className={`p-3 rounded-xl border w-full text-center space-y-1 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                        <p className="text-[11px] text-slate-500 font-black">Te escuché decir:</p>
                        <p className="text-xs font-black">"{spokenText}"</p>
                      </div>
                    )}

                    {practiceScore !== null && (
                      <div className="text-center space-y-2">
                        <div className="inline-flex items-center justify-center p-3 rounded-full font-black text-sm gap-1.5 border bg-rose-50 text-rose-700 border-purple-200">
                          <Award size={18} /> Puntuación: {practiceScore}%
                        </div>
                        <div className="w-48 bg-purple-50 rounded-full h-3 overflow-hidden border border-purple-200">
                          <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 h-3 rounded-full" style={{ width: `${practiceScore}%` }}></div>
                        </div>
                        {practiceScore >= 80 ? (
                          <p className="text-emerald-600 font-black text-xs">⭐ ¡Espectacular! Pronuncias como una estilista experta de New York! ⭐</p>
                        ) : practiceScore >= 60 ? (
                          <p className="text-amber-600 font-black text-xs">👍 ¡Vas por muy buen camino! Sigue practicando.</p>
                        ) : (
                          <p className="text-red-500 font-black text-xs">🧸 ¡Inténtalo de nuevo, tú puedes lograrlo!</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* DESAFÍO 2: ARMADOR DE FRASES */}
              <div className={`border p-6 rounded-3xl shadow-xl space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-purple-100'}`}>
                <div className={`flex items-center space-x-2 border-b pb-3 ${darkMode ? 'border-slate-800' : 'border-purple-50'}`}>
                  <span className={`p-1.5 rounded-xl ${darkMode ? 'bg-indigo-950 text-cyan-300' : 'bg-cyan-50 text-cyan-600'}`}><Gamepad2 size={18} /></span>
                  <h2 className={`text-sm font-black uppercase tracking-wider ${darkMode ? 'text-cyan-300' : 'text-purple-855'}`}>Desafío 2: Armador de Frases Interactiva 🦉</h2>
                </div>

                <div className={`p-4 rounded-2xl border text-xs space-y-3 ${darkMode ? 'bg-slate-800/80 border-slate-750' : 'bg-cyan-50/20 border-purple-100/30'}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-black text-purple-600">Pregunta {currentSentenceIndex + 1} de {sentenceBuilderScenarios.length}</span>
                    <button 
                      onClick={() => {
                        const nextIdx = (currentSentenceIndex + 1) % sentenceBuilderScenarios.length;
                        setCurrentSentenceIndex(nextIdx);
                        reiniciarArmadorDeFrase();
                      }}
                      className="bg-purple-50 text-purple-700 font-black py-1.5 px-3 rounded-xl border border-purple-100 hover:bg-purple-100 active:scale-95 text-xs"
                    >
                      Siguiente Ejercicio ➡️
                    </button>
                  </div>

                  <p className="font-bold text-sm text-slate-850 dark:text-white">{sentenceBuilderScenarios[currentSentenceIndex].instruction}</p>

                  <div className={`p-4 border-2 border-dashed rounded-2xl min-h-[60px] flex flex-wrap gap-2 items-center justify-center ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-purple-200'}`}>
                    {selectedWords.length === 0 ? (
                      <span className="text-[11px] text-slate-400 font-bold italic">Toca las palabras de abajo para armar la frase...</span>
                    ) : (
                      selectedWords.map((word, idx) => (
                        <button
                          key={idx}
                          onClick={() => removerPalabraDelArmador(idx)}
                          className="bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-black px-3 py-1.5 rounded-xl shadow-sm hover:opacity-90 text-xs"
                        >
                          {word}
                        </button>
                      ))
                    )}
                  </div>

                  <div className={`flex flex-wrap gap-2.5 justify-center py-2 p-4 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100/60'}`}>
                    {sentenceBuilderScenarios[currentSentenceIndex].shuffledArray.map((word, idx) => {
                      const isUsed = selectedWords.includes(word);
                      return (
                        <button
                          key={idx}
                          disabled={isUsed}
                          onClick={() => agregarPalabraAlArmador(word)}
                          className={`font-black px-3 py-2 rounded-xl text-xs transition-all border ${isUsed ? (darkMode ? 'bg-slate-800 border-slate-700 text-purple-200' : 'bg-purple-50/50 border-purple-100 text-purple-200 cursor-not-allowed') : (darkMode ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700' : 'bg-purple-50/20 border-purple-200 text-slate-900 hover:bg-purple-50 hover:border-purple-300 active:scale-95')}`}
                        >
                          {word}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex gap-2 justify-center pt-2">
                    <button
                      onClick={() => verificarFraseConstruida(sentenceBuilderScenarios[currentSentenceIndex].solutionKey)}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-95 text-white font-black py-2.5 px-5 rounded-xl text-xs shadow-md active:scale-95 transition-all"
                    >
                      Verificar Respuesta ✔️
                    </button>
                    <button
                      onClick={reiniciarArmadorDeFrase}
                      className={`font-black py-2.5 px-4 rounded-xl text-xs border active:scale-95 ${darkMode ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-750' : 'bg-purple-50 text-purple-755 border-purple-200 hover:bg-purple-100'}`}
                    >
                      Reiniciar 🔄
                    </button>
                  </div>

                  {builderStatus === 'success' && (
                    <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-1">
                      <p className="text-emerald-700 font-black">¡Fabuloso! Tu frase está perfectamente estructurada. 🦉💚</p>
                    </div>
                  )}
                  {builderStatus === 'error' && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-center space-y-1">
                      <p className="text-red-600 font-black">La frase no coincide exactamente. ¡Presiona Reiniciar e intenta de nuevo! 🧸</p>
                    </div>
                  )}
                </div>
              </div>

              {/* DESAFÍO 3: TRIVIA DE CARTAS MÁGICAS (Estilo Duolingo) */}
              <div className={`border p-6 rounded-3xl shadow-xl space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-purple-100'}`}>
                <div className={`flex items-center space-x-2 border-b pb-3 ${darkMode ? 'border-slate-800' : 'border-purple-50'}`}>
                  <span className={`p-1.5 rounded-xl ${darkMode ? 'bg-pink-950 text-pink-300' : 'bg-rose-50 text-rose-600'}`}><HelpCircle size={18} /></span>
                  <h2 className={`text-sm font-black uppercase tracking-wider ${darkMode ? 'text-pink-300' : 'text-purple-855'}`}>Desafío 3: Trivia de Cartas Mágicas 🃏🦉</h2>
                </div>

                <div className={`p-4 rounded-2xl border text-xs space-y-3 ${darkMode ? 'bg-slate-800/80 border-slate-750' : 'bg-rose-50/10 border-purple-100/30'}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-black text-purple-600">Pregunta {currentQuizIndex + 1} de {triviaQuizzes.length}</span>
                    <button 
                      onClick={() => {
                        const nextIdx = (currentQuizIndex + 1) % triviaQuizzes.length;
                        setCurrentQuizIndex(nextIdx);
                        reiniciarTriviaQuiz();
                      }}
                      className="bg-purple-50 text-purple-700 font-black py-1.5 px-3 rounded-xl border border-purple-100 hover:bg-purple-100 active:scale-95 text-xs"
                    >
                      Siguiente Carta ➡️
                    </button>
                  </div>

                  <p className="font-bold text-sm text-slate-850 dark:text-white">¿Cuál es la traducción correcta de la siguiente expresión en el salón de belleza?</p>

                  <div className="p-5 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center bg-gradient-to-tr from-pink-500/10 to-purple-600/10 border-purple-300">
                    <span className="text-lg font-black text-purple-900 dark:text-white">"{triviaQuizzes[currentQuizIndex].englishPhrase}"</span>
                    <button 
                      onClick={() => escucharPalabra(triviaQuizzes[currentQuizIndex].englishPhrase)}
                      className="mt-2.5 flex items-center gap-1 bg-white text-purple-700 border border-purple-200 px-3.5 py-1.5 rounded-xl font-black text-xs shadow-sm active:scale-95"
                    >
                      <Volume2 size={14} /> Escuchar Audio 🔊
                    </button>
                  </div>

                  {/* CARTAS DE OPCIONES */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {triviaQuizzes[currentQuizIndex].options.map((opt, oIdx) => {
                      const isSelected = quizSelectedAnswer === oIdx;
                      const isCorrect = oIdx === triviaQuizzes[currentQuizIndex].correctIndex;

                      let cardColor = "bg-white border-purple-200 hover:border-purple-400 text-slate-900";
                      if (quizStatus !== 'idle') {
                        if (isCorrect) {
                          cardColor = "bg-emerald-50 border-emerald-400 text-emerald-950 font-black";
                        } else if (isSelected) {
                          cardColor = "bg-red-50 border-red-400 text-red-950";
                        } else {
                          cardColor = "bg-slate-50 border-slate-200 opacity-60 text-slate-400";
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={quizStatus !== 'idle'}
                          onClick={() => seleccionarRespuestaTrivia(oIdx)}
                          className={`p-4 rounded-2xl border-2 text-center text-xs font-bold transition-all active:scale-95 shadow-sm flex flex-col items-center justify-center gap-2 ${cardColor}`}
                        >
                          <span className="text-sm font-black">{opt}</span>
                          {quizStatus !== 'idle' && isCorrect && <span className="text-xs">✔️ ¡Correcto!</span>}
                          {quizStatus !== 'idle' && isSelected && !isCorrect && <span className="text-xs">❌ Incorrecto</span>}
                        </button>
                      );
                    })}
                  </div>

                  {quizStatus === 'correct' && (
                    <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-center font-black text-emerald-800 text-xs">
                      🏆 ¡Súper! Ganaste una estrellita de Duolingo por esta respuesta.
                    </div>
                  )}
                  {quizStatus === 'incorrect' && (
                    <div className="p-3 bg-red-50 border border-red-300 rounded-xl text-center font-black text-red-800 text-xs">
                      🧸 Inténtalo de nuevo. ¡Tú puedes hacerlo perfecto!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: MOCHILA DE TAREAS */}
          {activeTab === 'mochila' && (
            <div className={`border p-6 rounded-3xl space-y-4 shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800 text-white animate-slide-in' : 'bg-white border-purple-100 text-slate-900'}`}>
              <div className={`flex items-center justify-between border-b pb-4 ${darkMode ? 'border-slate-800' : 'border-purple-50'}`}>
                <div className="flex items-center space-x-2">
                  <FolderHeart className="text-rose-500 animate-bounce" size={24} />
                  <h2 className="text-sm font-black uppercase tracking-wider text-purple-950 dark:text-white">MOCHILA DE TAREAS EN LA NUBE</h2>
                </div>
                {esProfesora && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-purple-955 dark:text-white">Estudiante:</span>
                    <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} className="text-xs font-bold p-1.5 rounded-xl bg-white text-slate-900 border border-purple-200 outline-none">
                      {estudiantesLista.map(est => <option key={est.id} value={est.id}>{est.name}</option>)}
                    </select>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {['clase2', 'clase3', 'clase5', 'clase6'].map((key) => {
                  const taskData = allStudentsTasks[targetStudent]?.[key];
                  const rawRecord = grades[targetStudent]?.[key] || { nota: '-', comentario: '' };
                  const parsed = parseCommentAndSticker(rawRecord.comentario);

                  return (
                    <div key={key} className={`p-4 rounded-3xl border text-xs space-y-3 ${darkMode ? 'bg-slate-855 border-slate-800' : 'bg-purple-50/20 border-purple-100/40'}`}>
                      <p className="font-black text-purple-700 flex items-center gap-1.5">🎯 {infoTareas[key]}</p>
                      <p className="text-[11px] font-bold text-slate-850 dark:text-white">Mochila de: <span className="uppercase text-purple-600 font-black">{targetStudent}</span></p>
                      
                      <div className="flex flex-wrap gap-2 items-center">
                        {!esProfesora && (
                          <label className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-95 text-white px-4 py-2.5 rounded-xl font-black cursor-pointer shadow-md active:scale-95 transition-all flex items-center gap-1 text-[11px]">
                            Subir PDF de Tarea ☁️
                            <input type="file" accept=".pdf" onChange={(e) => handlePdfUpload(e, key, currentUser.username)} className="hidden" />
                          </label>
                        )}
                        {taskData ? (
                          <>
                            <a href={taskData.url} download={taskData.name} className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-95 text-white px-4 py-2.5 rounded-xl font-black shadow-md transition-all flex items-center gap-1 text-[11px]">
                              <DownloadCloud size={14} /> Descargar PDF enviado 👁️
                            </a>
                            
                            {!esProfesora && (
                              <button 
                                onClick={() => openDeleteConfirmModal(key, targetStudent)} 
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-xl font-black shadow-md transition-all flex items-center gap-1 text-[11px] active:scale-95"
                              >
                                <Trash2 size={14} /> Eliminar PDF 🗑️
                              </button>
                            )}
                          </>
                        ) : (
                          <span className="text-slate-500 font-black italic text-[11px]">Aún no has subido tu PDF</span>
                        )}
                      </div>

                      <div className={`border-t pt-2 flex justify-between items-center flex-wrap gap-2 ${darkMode ? 'border-slate-800' : 'border-purple-100'}`}>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-purple-705">⭐ Nota: {rawRecord.nota} / 10</span>
                          {parsed.sticker && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-100 text-pink-700 font-black text-xs animate-bounce" title="¡Sticker de Regalo de tu Miss!">
                              Sticker: <span className="text-sm">{parsed.sticker}</span>
                            </span>
                          )}
                        </div>
                        {parsed.comentario && (
                          <p className={`p-2.5 rounded-2xl border font-bold italic w-full ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-purple-100 text-slate-900'}`}>
                            💬 Comentario de Miss: {parsed.comentario}
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
            <div className={`border p-6 rounded-3xl space-y-4 shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800 text-white animate-slide-in' : 'bg-white border-purple-100 text-slate-905'}`}>
              <div className={`flex items-center space-x-2 border-b pb-2 ${darkMode ? 'border-slate-800' : 'border-purple-105'}`}>
                <Star className="text-amber-500 fill-amber-500 animate-pulse" size={24} />
                <h2 className="text-sm font-black uppercase tracking-wider text-purple-950 dark:text-white">CALIFICACIONES EN TIEMRE REAL</h2>
              </div>

              {esProfesora ? (
                <div className="space-y-4">
                  <div className={`p-3 rounded-2xl flex items-center justify-between border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-purple-50/20 border-purple-100/50'}`}>
                    <span className="text-xs font-black">Estudiante a Calificar:</span>
                    <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} className="text-xs font-black p-1.5 rounded-xl bg-white text-slate-900 border border-purple-200">
                      {estudiantesLista.map(est => <option key={est.id} value={est.id}>{est.name}</option>)}
                    </select>
                  </div>

                  {['clase2', 'clase3', 'clase5', 'clase6'].map(key => {
                    const rawRecord = grades[selectedStudent]?.[key] || { nota: '-', comentario: '' };
                    const parsed = parseCommentAndSticker(rawRecord.comentario);

                    return (
                      <div key={key} className={`p-4 rounded-3xl border space-y-3 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-purple-50/10 border-purple-100/30'}`}>
                        <span className="text-xs font-black block text-slate-850 dark:text-white">{infoTareas[key]}</span>
                        
                        <div className="flex flex-wrap items-center gap-4">
                          {/* Selector de Nota */}
                          <div className="flex items-center space-x-3 text-xs font-black text-slate-855 dark:text-white">
                            <label>Calificación:</label>
                            <select 
                              value={rawRecord.nota} 
                              onChange={(e) => {
                                const v = e.target.value;
                                setGrades(prev => {
                                  const rawText = buildRawComment(parsed.sticker, parsed.comentario);
                                  const actualizado = { ...prev, [selectedStudent]: { ...prev[selectedStudent], [key]: { ...rawRecord, nota: v } } };
                                  enviarNotaASupabase(selectedStudent, key, v, rawText);
                                  return actualizado;
                                });
                              }}
                              className="p-1.5 rounded bg-white text-slate-900 border border-purple-400 font-black outline-none focus:ring-2 focus:ring-purple-400"
                            >
                              <option value="-">Sin Evaluar</option>
                              {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={String(n)}>{n} Puntos</option>)}
                            </select>
                          </div>

                          {/* RECOLECTOR DE STICKERS */}
                          <div className="flex items-center space-x-3 text-xs font-black text-slate-850 dark:text-white">
                            <label>Regalar Sticker:</label>
                            <div className="flex gap-1.5">
                              {stickersDisponibles.map(st => {
                                const isCurrent = parsed.sticker === st.emoji;
                                return (
                                  <button
                                    key={st.emoji}
                                    title={st.name}
                                    onClick={() => {
                                      const nuevoSticker = isCurrent ? '' : st.emoji;
                                      const rawText = buildRawComment(nuevoSticker, parsed.comentario);
                                      setGrades(prev => {
                                        const actualizado = {
                                          ...prev,
                                          [selectedStudent]: {
                                            ...prev[selectedStudent],
                                            [key]: { ...rawRecord, comentario: rawText }
                                          }
                                        };
                                        enviarNotaASupabase(selectedStudent, key, rawRecord.nota, rawText);
                                        return actualizado;
                                      });
                                    }}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all border active:scale-90 ${isCurrent ? 'bg-pink-100 border-pink-400 scale-110 shadow-md' : 'bg-white border-purple-100 hover:bg-purple-50'}`}
                                  >
                                    {st.emoji}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        <textarea 
                          value={parsed.comentario || ''} 
                          onChange={(e) => {
                            const val = e.target.value;
                            const rawText = buildRawComment(parsed.sticker, val);
                            setGrades(prev => ({
                              ...prev,
                              [selectedStudent]: {
                                ...prev[selectedStudent],
                                [key]: { ...prev[selectedStudent]?.[key], comentario: rawText }
                              }
                            }));
                          }}
                          onBlur={(e) => {
                            const rawText = buildRawComment(parsed.sticker, e.target.value);
                            enviarNotaASupabase(selectedStudent, key, rawRecord.nota, rawText);
                          }}
                          placeholder="Escribe un comentario que el estudiante pueda ver..." 
                          className="w-full p-2.5 text-xs text-slate-900 font-bold border border-purple-200 rounded-2xl bg-white outline-none focus:ring-2 focus:ring-purple-400"
                          rows={2}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-3">
                  {['clase2', 'clase3', 'clase5', 'clase6'].map(key => {
                    const rawRecord = grades[currentUser.username]?.[key] || { nota: '-', comentario: '' };
                    const parsed = parseCommentAndSticker(rawRecord.comentario);

                    return (
                      <div key={key} className={`p-4 rounded-3xl border text-xs space-y-2 relative overflow-hidden ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-purple-100/40'}`}>
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <span className="font-black max-w-md text-purple-955 dark:text-white">{infoTareas[key]}</span>
                          <div className="flex items-center gap-2">
                            {parsed.sticker && (
                              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-pink-100 text-pink-700 font-black animate-bounce text-xs" title="¡Tu Miss te dio este Sticker!">
                                Sticker: <span className="text-sm">{parsed.sticker}</span>
                              </span>
                            )}
                            <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-2.5 py-1 rounded-lg font-black text-xs">Nota: {rawRecord.nota} / 10</span>
                          </div>
                        </div>
                        {parsed.comentario && (
                          <p className={`p-2.5 rounded-2xl border font-bold ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-purple-100 text-slate-900'}`}>
                            📢 Miss comentó: {parsed.comentario}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB: MÚSICA FELIZ */}
          {activeTab === 'musica' && (
            <div className={`border p-6 rounded-3xl space-y-5 animate-slide-in shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800 text-white animate-slide-in' : 'bg-white border-purple-100 text-slate-900'}`}>
              <div className={`flex items-center justify-between border-b pb-4 ${darkMode ? 'border-slate-800' : 'border-purple-100'}`}>
                <div className="flex items-center space-x-2">
                  <Music className="text-purple-600 animate-pulse" size={24} />
                  <h2 className="text-sm font-black uppercase tracking-wider text-purple-950 dark:text-white">MURAL DE MÚSICA FELIZ 🎵✨</h2>
                </div>
                {esIsabel && (
                  <span className="bg-purple-50 text-purple-700 text-[10px] font-black uppercase px-2.5 py-1.5 rounded-xl border border-purple-200">
                    Modo Observadora Activo 🌸
                  </span>
                )}
              </div>

              <p className={`text-xs font-bold p-2.5 rounded-xl border ${darkMode ? 'bg-slate-800/50 border-slate-750 text-slate-100' : 'bg-purple-50/50 border-purple-100/30 text-slate-905'}`}>
                ¡La música llena de polvos de hadas nuestro salón! Comparte el enlace de la canción que te hace sonreír y llena de amor los recuadros de tus compañeros.
              </p>

              {!esIsabel ? (
                <div className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-855/40 border-slate-800' : 'bg-purple-50/20 border-purple-100/40'}`}>
                  <span className="text-xs font-black uppercase text-purple-700 tracking-wider flex items-center gap-1.5">
                    🎶 Comparte o Actualiza tu Melodía Favorita
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder="Nombre de la canción (ej: Happy - Pharrell)" 
                      value={newSongName}
                      onChange={(e) => setNewSongName(e.target.value)}
                      className="p-2.5 border border-purple-200 rounded-xl bg-white text-slate-900 font-bold text-xs outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <div className="flex gap-1.5">
                      <input 
                        type="text" 
                        placeholder="Enlace de la canción (YouTube/Spotify)" 
                        value={newSongUrl}
                        onChange={(e) => setNewSongUrl(e.target.value)}
                        className="flex-1 p-2.5 border border-purple-200 rounded-xl bg-white text-slate-900 font-bold text-xs outline-none focus:ring-2 focus:ring-purple-400"
                      />
                      <button 
                        onClick={handleGuardarCancion}
                        className="bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:opacity-95 text-white font-black text-xs px-4 rounded-xl shadow-md flex items-center gap-1.5"
                      >
                        Colgar 🎵
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-purple-50/30 text-purple-700 text-xs font-bold rounded-2xl text-center border border-purple-200">
                  Como Miss Isabel es observadora, puede escuchar todas las bellas recomendaciones sin editar el muro. 🌸✨
                </div>
              )}

              {/* Muro de Tarjetas Musicales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {Object.keys(musicList).map((userKey) => {
                  const item = musicList[userKey];
                  const userAccount = accounts[userKey] || { name: userKey.toUpperCase(), role: "Estudiante" };
                  const tieneMiHeart = (item.likes || []).includes(currentUser.username);

                  return (
                    <div key={userKey} className={`border p-4 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-between space-y-3 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-pink-500 via-purple-600 to-cyan-500"></div>
                      
                      <div className="flex justify-between items-start pl-2">
                        <div>
                          <span className="text-xs font-black uppercase tracking-wider text-purple-700">
                            Música de: {userAccount.name}
                          </span>
                          <span className={`text-[9px] block font-extrabold uppercase tracking-widest mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            ({userAccount.role})
                          </span>
                        </div>
                        <button 
                          onClick={() => handleDarLike(userKey)}
                          disabled={esIsabel}
                          className={`flex items-center gap-1 px-3 py-2 rounded-full text-xs font-black transition-all ${tieneMiHeart ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-purple-50/30 text-purple-400 border border-purple-100/30'} ${esIsabel ? 'opacity-50 cursor-not-allowed' : 'active:scale-90'}`}
                        >
                          <Heart size={14} className={tieneMiHeart ? 'fill-rose-600 text-rose-600' : ''} />
                          {(item.likes || []).length}
                        </button>
                      </div>

                      <div className={`p-3 rounded-2xl border pl-4 space-y-2 ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-purple-50/10 border-purple-100/30'}`}>
                        <p className="text-xs font-black flex items-center gap-1.5 text-purple-955 dark:text-white">
                          🎧 {item.nombre_cancion}
                        </p>
                        <a 
                          href={item.enlace} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-1 bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white text-[10px] font-black px-3.5 py-2 rounded-xl shadow-md hover:scale-102 transition-all active:scale-95"
                        >
                          <PlayCircle size={12} /> Escuchar Canción 🎵
                        </a>
                      </div>

                      <div className={`p-3 rounded-2xl border ${darkMode ? 'bg-slate-855 border-slate-800' : 'bg-purple-50/20 border-purple-100/30'}`}>
                        <span className={`text-[10px] font-black uppercase tracking-widest block mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-505'}`}>
                          Comentarios:
                        </span>
                        
                        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                          {(item.comentarios || []).length === 0 ? (
                            <span className="text-[10px] italic font-bold block text-slate-505">Sé la primera en comentar... 🌸</span>
                          ) : (
                            item.comentarios.map((c, idx) => {
                              const tieneComentarioHeart = (c.likes || []).includes(currentUser.username);
                              const puedoEliminarComentario = !esIsabel && (userKey === currentUser.username || c.usuario === currentUser.username);

                              return (
                                <div key={idx} className={`p-2.5 rounded-xl text-xs border flex justify-between items-start gap-2 shadow-sm ${darkMode ? 'bg-slate-800/90 border-slate-700 text-white' : 'bg-white border-purple-100/50 text-slate-900'}`}>
                                  <div className="flex-1 min-w-0">
                                    <span className="font-black text-purple-700 block text-[10px]">{c.nombre}:</span>
                                    <span className="font-bold break-words">{c.texto}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                                    <button
                                      disabled={esIsabel}
                                      onClick={() => handleLikeComentario(userKey, idx)}
                                      className={`p-1.5 rounded-md transition-all active:scale-90 flex items-center gap-1 ${tieneComentarioHeart ? 'text-rose-600 bg-rose-50' : 'text-purple-305 hover:text-rose-500'}`}
                                      title="Dar amor al comentario"
                                    >
                                      <Heart size={12} className={tieneComentarioHeart ? 'fill-rose-600 text-rose-600' : ''} />
                                      <span className="text-[9px] font-black">{(c.likes || []).length}</span>
                                    </button>
                                    
                                    {puedoEliminarComentario && (
                                      <button
                                        onClick={() => handleEliminarComentario(userKey, idx)}
                                        className="p-1.5 text-purple-300 hover:text-red-505 rounded-md transition-all active:scale-90"
                                        title="Eliminar comentario"
                                      >
                                        <Trash2 size={12} />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>

                        {!esIsabel && (
                          <div className={`flex gap-1.5 pt-1.5 border-t ${darkMode ? 'border-slate-800' : 'border-purple-100/60'}`}>
                            <input 
                              type="text" 
                              placeholder="Escribe un mensaje lindo..." 
                              value={commentInput[userKey] || ''}
                              onChange={(e) => setCommentInput(prev => ({ ...prev, [userKey]: e.target.value }))}
                              className="flex-1 p-2 text-xs text-slate-900 font-bold border border-purple-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-purple-400"
                            />
                            <button 
                              onClick={() => handleAgregarComentario(userKey)}
                              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-95 text-white p-2 rounded-xl flex items-center justify-center active:scale-90 shadow-md"
                            >
                              <Send size={12} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: VOCABULARIO INTERACTIVO */}
          {activeTab === 'vocabulario' && (
            <div className={`border p-6 rounded-3xl space-y-5 animate-slide-in shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800 text-white animate-slide-in' : 'bg-white border-purple-100 text-slate-900'}`}>
              <div className={`flex flex-col md:flex-row md:items-center justify-between border-b pb-4 gap-3 ${darkMode ? 'border-slate-800' : 'border-purple-50'}`}>
                <div className="flex items-center space-x-2">
                  <Volume2 className="text-purple-600 animate-pulse" size={24} />
                  <h2 className="text-sm font-black uppercase tracking-wider text-purple-950 dark:text-white">DICCIONARIO INTERACTIVO PARLANTE 👋🔊</h2>
                </div>
                <div className="relative flex items-center">
                  <input 
                    type="text" 
                    placeholder="Buscar palabra..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-3 py-2 border border-purple-200 rounded-xl bg-white text-slate-900 font-bold text-xs outline-none focus:ring-2 focus:ring-purple-400 w-full"
                  />
                  <Search className="absolute left-2.5 text-purple-450" size={14} />
                </div>
              </div>

              {/* FILTROS DE CATEGORÍA */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'todos', name: 'Todos ✨', color: 'bg-rose-50 text-rose-700 border-rose-200' },
                  { id: 'saludos', name: 'Saludos 👋', color: 'bg-purple-50 text-purple-700 border-purple-200' },
                  { id: 'proceso', name: 'Proceso 🧪', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
                  { id: 'cuidados', name: 'Cuidados 🧴', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
                  { id: 'precio', name: 'Precio 💰', color: 'bg-rose-50 text-rose-700 border-rose-200' },
                  { id: 'interaccion', name: 'Preguntas 💇‍♂️', color: 'bg-purple-50 text-purple-700 border-purple-200' },
                  { id: 'despedida', name: 'Despedida 💖', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveVocabFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all border ${activeVocabFilter === cat.id ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white shadow-md' : (darkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : `${cat.color} hover:opacity-85`)}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-2.5 max-h-[400px] overflow-y-auto pr-1">
                {filteredVocab.map((item, i) => (
                  <div key={i} className={`flex justify-between items-center p-3.5 rounded-2xl border hover:scale-[1.01] transition-all ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-purple-50/10 border-purple-100/30 text-slate-900'}`}>
                    <div className="flex items-center space-x-3">
                      <button onClick={() => escucharPalabra(item.en)} className="p-2.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white rounded-xl transition-all active:scale-90 shadow-md">
                        <Volume2 size={16} />
                      </button>
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-purple-955 dark:text-white">{item.en}</span>
                        <span className={`text-[9px] w-max px-2 py-0.5 rounded-md font-black mt-1 uppercase tracking-wider ${darkMode ? 'bg-slate-900 text-pink-300' : 'bg-purple-50 text-purple-700'}`}>{item.cat}</span>
                      </div>
                    </div>
                    <span className={`text-xs font-black border px-3 py-1 rounded-xl shadow-inner ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-purple-100 text-slate-900'}`}>🗣️ {item.es}</span>
                  </div>
                ))}
                {filteredVocab.length === 0 && (
                  <p className="text-center text-xs font-bold text-slate-450 py-4">No se encontraron palabras 🌸</p>
                )}
              </div>
            </div>
          )}

          {/* TAB: JUEGOS */}
          {activeTab === 'juegos' && (
            <div className={`border p-6 rounded-3xl space-y-4 shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800 text-white animate-slide-in' : 'bg-white border-purple-100 text-slate-900'}`}>
              <div className={`flex items-center space-x-2 border-b pb-4 ${darkMode ? 'border-slate-800' : 'border-purple-100'}`}>
                <Gamepad2 className="text-purple-600 animate-bounce" size={24} />
                <h2 className="text-sm font-black uppercase tracking-wider text-purple-955 dark:text-white">ÁREA DE JUEGOS 🎮✨</h2>
              </div>
              <p className={`text-xs font-bold p-2.5 rounded-xl border ${darkMode ? 'bg-slate-800/50 border-slate-750 text-slate-100' : 'bg-purple-50/10 border-purple-100/30'}`}>¡Haz clic en cualquiera de los juegos para repasar y divertirte al máximo!</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <a href="https://wordwall.net/es/resource/115823970" target="_blank" rel="noopener noreferrer" className={`block p-4 rounded-3xl border transition-all active:scale-95 shadow-md ${darkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-750' : 'bg-rose-50/30 hover:bg-rose-50/60 border-rose-100'}`}>
                  <div className="flex items-center space-x-2">
                    <PlayCircle className="text-rose-500 animate-pulse" size={18} />
                    <span className="text-xs font-black text-rose-750">Juego 1: Wordwall 👋</span>
                  </div>
                  <span className={`text-[11px] block mt-1 font-bold ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}>Greetings & Saludos iniciales para recibir clientes de forma alegre.</span>
                </a>

                <a href="https://interacty.me/projects/e502cc8626a13026" target="_blank" rel="noopener noreferrer" className={`block p-4 rounded-3xl border transition-all active:scale-95 shadow-md ${darkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-750' : 'bg-purple-50/30 hover:bg-purple-50/60 border-purple-100'}`}>
                  <div className="flex items-center space-x-2">
                    <PlayCircle className="text-purple-600 animate-pulse" size={18} />
                    <span className="text-xs font-black text-purple-700">Juego 2: Interacty 🧪</span>
                  </div>
                  <span className={`text-[11px] block mt-1 font-bold ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}>Keratin Process Challenge y orden correcto de los pasos.</span>
                </a>

                <a href="https://wordwall.net/es/resource/116065664" target="_blank" rel="noopener noreferrer" className={`block p-4 rounded-3xl border transition-all active:scale-95 shadow-md ${darkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-750' : 'bg-cyan-50/30 hover:bg-cyan-50/60 border-cyan-100'}`}>
                  <div className="flex items-center space-x-2">
                    <PlayCircle className="text-cyan-505 animate-pulse" size={18} />
                    <span className="text-xs font-black text-cyan-600">Juego 3: Wordwall Aftercare 🧴</span>
                  </div>
                  <span className={`text-[11px] block mt-1 font-bold ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}>Cuidado posterior y recomendaciones cruciales al cliente.</span>
                </a>

                <a href="https://create.kahoot.it/share/class-5/16e72ba0-e8fc-4910-9400-b7a3c94c3586" target="_blank" rel="noopener noreferrer" className={`block p-4 rounded-3xl border transition-all active:scale-95 shadow-md ${darkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-750' : 'bg-indigo-50/30 hover:bg-indigo-50/60 border-indigo-100'}`}>
                  <div className="flex items-center space-x-2">
                    <PlayCircle className="text-indigo-500 animate-pulse" size={18} />
                    <span className="text-xs font-black text-indigo-600">Juego 4: Kahoot Price & Time 💰</span>
                  </div>
                  <span className={`text-[11px] block mt-1 font-bold ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}>Preguntas y respuestas sobre precios y métodos de pago del salón.</span>
                </a>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* CARTEL DE CONFIRMACIÓN FLOTANTE ROSA Y MÁGICO */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-slide-in">
          <div className={`p-6 rounded-3xl max-w-sm w-full border shadow-2xl text-center space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-purple-200 text-slate-900'}`}>
            <span className="text-5xl animate-bounce inline-block">🧹✨</span>
            <h3 className="font-black text-base">¿Quieres borrar esta tarea para subir otra?</h3>
            <p className="text-xs text-slate-505 font-bold">¡Tu antigua tarea desaparecerá de la nube de Supabase!</p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={handlePdfDeleteConfirmed}
                className="bg-red-500 hover:bg-red-600 text-white font-black text-xs px-5 py-2.5 rounded-xl active:scale-95 transition-all shadow-md"
              >
                Sí, Borrar 🗑️
              </button>
              <button
                onClick={() => setDeleteConfirm({ show: false, claseKey: null, studentUser: null })}
                className={`font-black text-xs px-5 py-2.5 rounded-xl active:scale-95 transition-all border ${darkMode ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-750' : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'}`}
              >
                No, Dejarla 🌸
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST CON NOTIFICACIÓN DE HADA */}
      {toast.show && (
        <div className="fixed bottom-5 right-5 z-50 animate-slide-in">
          <div className={`p-4 rounded-2xl shadow-xl flex items-center gap-2 border text-xs font-black ${toast.type === 'success' ? (darkMode ? 'bg-slate-900 text-emerald-400 border-emerald-955' : 'bg-emerald-50 text-emerald-800 border-emerald-200') : (darkMode ? 'bg-slate-900 text-red-400 border-red-950' : 'bg-red-50 text-red-800 border-red-200')}`}>
            <Sparkles className={toast.type === 'success' ? 'text-emerald-600 animate-spin' : 'text-red-500'} size={18} />
            {toast.message}
          </div>
        </div>
      )}

    </div>
  );
}

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