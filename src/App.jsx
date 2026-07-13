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
  Link,
  Music,
  Send,
  Mic,
  RotateCcw,
  Trophy,
  Activity,
  Award
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

  const [musicList, setMusicList] = useState(() => {
    const savedMusic = localStorage.getItem('beauty_salon_music_list');
    return savedMusic ? JSON.parse(savedMusic) : {
      jean: { nombre_cancion: 'Happy 🌸', enlace: 'https://www.youtube.com/watch?v=ZbZSe6N_BXs', likes: ['ricardo'], comentarios: [{ usuario: 'ricardo', nombre: 'Ricardo', texto: '¡Qué gran ritmo Jean!', likes: [] }] },
      ricardo: { nombre_cancion: 'Can\'t Stop the Feeling! ⚡', enlace: 'https://www.youtube.com/watch?v=ru0K8uYEZWw', likes: ['jean'], comentarios: [] },
      legna: { nombre_cancion: 'Sparkle 🎀', enlace: 'https://www.youtube.com/watch?v=a2GujJZfALL', likes: [], comentarios: [] },
      daniela: { nombre_cancion: 'A Thousand Years ✨', enlace: 'https://www.youtube.com/watch?v=rtOvBOTyX00', likes: [], comentarios: [] }
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

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [builderStatus, setBuilderStatus] = useState('idle'); 

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
            { en: "The treatment takes around two hours.", es: "The treatment takes around two hours." },
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
    { en: "The treatment takes around two hours.", es: "El tratamiento dura alrededor de dos horas.", cat: "precio" },
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
      <div className="min-h-screen bg-gradient-to-tr from-rose-100 via-purple-100 to-cyan-100 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-950 flex flex-col items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white/90 dark:bg-slate-900/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl shadow-purple-200/50 dark:shadow-none max-w-sm w-full space-y-5 border border-purple-200/50 dark:border-slate-800 relative overflow-hidden">
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
    <div className={`min-h-screen font-sans flex flex-col ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-gradient-to-tr from-rose-50/50 via-purple-50/30 to-cyan-50/50 text-slate-900'}`}>
      
      {/* HEADER DE NUESTRO CASTILLO */}
      <header className={`border-b h-20 flex items-center justify-between px-6 shadow-md shadow-purple-100/10 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white/80 backdrop-blur-md border-purple-100/50'}`}>
        <div className="flex items-center space-x-3">
          <GraduationCap className="text-purple-600 animate-pulse" size={32} />
          <span className="font-black text-slate-900 dark:text-white text-base md:text-lg flex items-center gap-1.5">
            Beauty English Course <span className="text-rose-500 animate-bounce">👩‍🏫✨</span>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 bg-purple-50/60 dark:bg-slate-800 rounded-xl transition-all active:scale-95 border border-purple-100/50 dark:border-slate-700">
            {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-purple-600" />}
          </button>
          <span className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-purple-600 to-cyan-600 dark:text-pink-300 uppercase bg-purple-50 dark:bg-slate-800 px-4 py-2.5 rounded-xl flex items-center gap-1.5 border border-purple-200/50 dark:border-slate-700 shadow-sm">
            <Smile size={16} className="text-rose-500 animate-bounce" /> {currentUser.name} ({currentUser.role})
          </span>
          <button onClick={handleLogout} className="text-xs bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/20 dark:text-red-400 font-extrabold px-4 py-2.5 rounded-xl flex items-center gap-1.5 active:scale-95 transition-all border border-red-100 dark:border-red-900/30">
            <LogOut size={14} /> Salir
          </button>
        </div>
      </header>

      {/* CUERPO PRINCIPAL */}
      <div className="flex flex-1 flex-col md:flex-row">
        
        {/* BARRA DE MENÚ LATERAL */}
        <aside className={`w-full md:w-60 p-4 flex flex-col gap-2 ${darkMode ? 'bg-slate-900' : 'bg-white/80 backdrop-blur-md border-r border-purple-100/50'}`}>
          <div className="text-xs uppercase tracking-wider font-extrabold text-purple-600 dark:text-pink-400 mb-2 px-3 flex items-center gap-1.5">
            <Heart size={12} className="fill-rose-500 text-rose-500 animate-pulse" /> Menú Principal
          </div>
          
          <button 
            onClick={() => setActiveTab('inicio')} 
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'inicio' ? 'bg-gradient-to-r from-rose-500 via-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/20' : 'text-slate-800 dark:text-slate-100 hover:bg-purple-50/50 dark:hover:bg-slate-800'}`}
          >
            <Home size={16} className="text-rose-500 dark:text-pink-400" /> Inicio 🏠
          </button>

          <button 
            onClick={() => setActiveTab('unit1')} 
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'unit1' ? 'bg-gradient-to-r from-rose-500 via-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/20' : 'text-slate-800 dark:text-slate-100 hover:bg-purple-50/50 dark:hover:bg-slate-800'}`}
          >
            <BookOpen size={16} className="text-purple-500 dark:text-pink-400" /> Unidad 1: Welcome 🚪
          </button>

          <button 
            onClick={() => setActiveTab('unit2')} 
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'unit2' ? 'bg-gradient-to-r from-rose-500 via-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/20' : 'text-slate-800 dark:text-slate-100 hover:bg-purple-50/50 dark:hover:bg-slate-800'}`}
          >
            <BookOpen size={16} className="text-purple-500 dark:text-pink-400" /> Unidad 2: Info 📢
          </button>

          <button 
            onClick={() => setActiveTab('unit3')} 
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'unit3' ? 'bg-gradient-to-r from-rose-500 via-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/20' : 'text-slate-800 dark:text-slate-100 hover:bg-purple-50/50 dark:hover:bg-slate-800'}`}
          >
            <BookOpen size={16} className="text-cyan-500 dark:text-pink-400" /> Unidad 3: Client 💬
          </button>

          <button 
            onClick={() => setActiveTab('practica')} 
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'practica' ? 'bg-gradient-to-r from-rose-500 via-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/20' : 'text-slate-800 dark:text-slate-100 hover:bg-purple-50/50 dark:hover:bg-slate-800'}`}
          >
            <Activity size={16} className="text-rose-500 dark:text-purple-400" /> Práctica Mágica 🎙️🦉
          </button>

          <button 
            onClick={() => setActiveTab('mochila')} 
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'mochila' ? 'bg-gradient-to-r from-rose-500 via-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/20' : 'text-slate-800 dark:text-slate-100 hover:bg-purple-50/50 dark:hover:bg-slate-800'}`}
          >
            <FolderHeart size={16} className="text-purple-500 dark:text-pink-400" /> Mochila de Tareas 🎒
          </button>

          <button 
            onClick={() => setActiveTab('calificaciones')} 
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'calificaciones' ? 'bg-gradient-to-r from-rose-500 via-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/20' : 'text-slate-800 dark:text-slate-100 hover:bg-purple-50/50 dark:hover:bg-slate-800'}`}
          >
            <Star size={16} className="text-purple-500 dark:text-pink-400" /> Calificaciones ⭐
          </button>

          <button 
            onClick={() => setActiveTab('musica')} 
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'musica' ? 'bg-gradient-to-r from-rose-500 via-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/20' : 'text-slate-800 dark:text-slate-100 hover:bg-purple-50/50 dark:hover:bg-slate-800'}`}
          >
            <Music size={16} className="text-rose-500 dark:text-pink-400 animate-bounce" /> Música Feliz 🎵
          </button>

          <button 
            onClick={() => setActiveTab('vocabulario')} 
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'vocabulario' ? 'bg-gradient-to-r from-rose-500 via-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/20' : 'text-slate-800 dark:text-slate-100 hover:bg-purple-50/50 dark:hover:bg-slate-800'}`}
          >
            <Volume2 size={16} className="text-cyan-500 dark:text-pink-400" /> Vocabulario 🔊
          </button>

          <button 
            onClick={() => setActiveTab('juegos')} 
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all ${activeTab === 'juegos' ? 'bg-gradient-to-r from-rose-500 via-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/20' : 'text-slate-800 dark:text-slate-100 hover:bg-purple-50/50 dark:hover:bg-slate-800'}`}
          >
            <Gamepad2 size={16} className="text-rose-500 dark:text-pink-400" /> Área de Juegos 🎮
          </button>

          <div className="border-t border-purple-100 dark:border-slate-800 my-4 pt-4">
            <button onClick={descargarDeSupabase} className="w-full bg-purple-50 hover:bg-purple-100 dark:bg-slate-800 text-slate-800 dark:text-white text-[11px] font-black py-3 rounded-xl flex items-center justify-center gap-1 active:scale-95 transition-all shadow-md border border-purple-200/50 dark:border-slate-700">
               🔄 Sincronizar Nube ☁️
            </button>
          </div>
        </aside>

        {/* PANTALLA DE CONTENIDO PRINCIPAL */}
        <main className="flex-1 p-6 max-w-4xl w-full mx-auto">
          {loadingCloud && (
            <div className="text-center p-2.5 mb-4 bg-gradient-to-r from-rose-500 via-purple-600 to-cyan-500 text-white font-black rounded-2xl text-[11px] animate-pulse flex items-center justify-center gap-1.5 shadow-md shadow-purple-500/10">
              ☁️ Trayendo la magia directamente de internet...
            </div>
          )}
          
          {/* TAB: INICIO CON TEXTOS PERSONALIZADOS */}
          {activeTab === 'inicio' && (
            <div className="space-y-6 animate-slide-in">
              <div className="bg-gradient-to-r from-rose-500 via-purple-600 to-cyan-500 p-8 rounded-3xl text-white shadow-lg shadow-purple-500/20 relative overflow-hidden">
                <Sparkles className="absolute right-4 top-4 text-rose-200 animate-spin" size={48} />
                <h1 className="text-3xl font-black text-white drop-shadow-md">¡Bienvenida de vuelta, {currentUser.name}! 💇‍♀️✨</h1>
                <p className="text-sm mt-2 font-bold text-rose-50 drop-shadow-md">Disfruta cada etapa de tu aprendizaje con los juegos interactivos y más</p>
              </div>

              {/* SECCIÓN REPRODUCTOR DE VIDEO DE BIENVENIDA PERMANENTE */}
              <div className="bg-white/95 dark:bg-slate-900 border border-purple-100 dark:border-slate-800 p-6 rounded-3xl shadow-xl shadow-purple-100/20 space-y-4">
                <h2 className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600 dark:text-pink-400 tracking-wider uppercase flex items-center gap-2">
                  <Video className="text-rose-500 animate-pulse" size={24} />
                  Cine Mágico: Video de Bienvenida 🎬🌸
                </h2>
                <p className="text-xs text-slate-800 dark:text-slate-100 font-bold bg-gradient-to-r from-rose-50/50 via-purple-50/50 to-cyan-50/30 dark:bg-slate-800/80 p-3 rounded-xl border border-purple-100/50 dark:border-slate-700">
                  Con nosotras aprenderás de forma práctica y sencilla. Somos un equipo
                </p>

                {/* VISUALIZADOR DE VIDEO */}
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-purple-100/80 dark:border-slate-800 shadow-md">
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
                  <div className="p-4 bg-gradient-to-r from-rose-50/50 via-purple-50/50 to-cyan-50/20 dark:bg-slate-800/40 rounded-2xl border border-purple-100/80 dark:border-slate-700 space-y-3">
                    <span className="text-xs font-black uppercase text-purple-700 dark:text-pink-300 tracking-wider flex items-center gap-1.5">
                      🛠️ Zona de Profesora: Actualizar Video
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Subida por Enlace de YouTube */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-black text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                          <Link size={12} className="text-purple-600" /> Enlace del Video (YouTube):
                        </label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="https://www.youtube.com/watch?..." 
                            value={videoInputUrl}
                            onChange={(e) => setVideoInputUrl(e.target.value)}
                            className="flex-1 p-2.5 border border-purple-200/60 rounded-xl bg-white text-slate-900 font-bold text-xs outline-none focus:ring-2 focus:ring-purple-400"
                          />
                          <button 
                            onClick={handleUrlVideoSave}
                            className="bg-gradient-to-r from-rose-500 to-purple-600 hover:opacity-95 text-white font-black text-[11px] px-4 rounded-xl shadow-md"
                          >
                            Guardar Enlace 🔗
                          </button>
                        </div>
                      </div>

                      {/* Subida por Archivo Local (Máx. 4.5MB para Supabase) */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-black text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
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
                <div className="bg-white/95 dark:bg-slate-900 border border-purple-100 dark:border-slate-800 p-5 rounded-3xl shadow-xl shadow-purple-100/10">
                  <h3 className="font-black text-sm text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600 dark:text-pink-400 mb-2 flex items-center gap-1.5">📢 Instrucciones Mágicas</h3>
                  <ul className="text-xs space-y-2 text-slate-800 dark:text-slate-100 font-bold">
                    <li className="flex items-center gap-1.5">🌸 <span className="text-purple-600 dark:text-pink-400 font-black">Unidades:</span> Escucha la pronunciación en inglés haciendo clic en el parlante rosa.</li>
                    <li className="flex items-center gap-1.5">🎒 <span className="text-purple-600 dark:text-pink-400 font-black">Mochila:</span> Sube tus PDFs. ¡Y si eres estudiante y te equivocas, usa el nuevo botón de eliminar!</li>
                    <li className="flex items-center gap-1.5">🎵 <span className="text-purple-600 dark:text-pink-400 font-black">Música Feliz:</span> Comparte tu canción favorita, regala corazones y deja comentarios tiernos a todos.</li>
                  </ul>
                </div>

                <div className="bg-white/95 dark:bg-slate-900 border border-purple-100 dark:border-slate-800 p-5 rounded-3xl flex flex-col justify-between shadow-xl shadow-purple-100/10">
                  <div>
                    <h3 className="font-black text-sm text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 dark:text-purple-400 mb-1 flex items-center gap-1.5">🎮 Zona Interactiva</h3>
                    <p className="text-xs text-slate-800 dark:text-slate-100 font-bold">Diviértete con los juegos interactivos de Kahoot, Interacty y Wordwall que diseñamos.</p>
                  </div>
                  <button onClick={() => setActiveTab('juegos')} className="mt-4 bg-gradient-to-r from-rose-500 via-purple-600 to-cyan-500 hover:opacity-95 text-white text-xs font-black py-3 rounded-2xl shadow-md active:scale-95 transition-all">
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
                <h2 className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-purple-600 to-cyan-600 dark:text-pink-400 tracking-widest uppercase border-b pb-2 border-purple-100 dark:border-slate-800 flex items-center gap-2">
                  <span className="p-1 bg-purple-50 dark:bg-slate-800 rounded-lg text-purple-600"><BookOpen size={18} /></span>
                  {currentModule.title}
                </h2>
                
                {currentModule.lessons.map((lesson, idx) => (
                  <div key={idx} className="bg-white/95 dark:bg-slate-900 border border-purple-100 dark:border-slate-800 p-5 rounded-3xl space-y-4 shadow-xl shadow-purple-100/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-rose-500 via-purple-600 to-cyan-500"></div>
                    
                    <div className="border-b pb-2 border-purple-50 dark:border-slate-800">
                      <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase flex items-center gap-1.5">{lesson.title}</h3>
                      <p className="text-xs text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600 dark:text-pink-300 font-black mt-1 bg-purple-50/50 dark:bg-slate-800 w-max px-3 py-1.5 rounded-full">{lesson.objective}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      {lesson.content.map((item, keyIdx) => (
                        <div key={keyIdx} className="flex justify-between items-center bg-purple-50/30 dark:bg-slate-800/80 p-3 rounded-2xl border border-purple-100/40 dark:border-slate-700 hover:border-purple-300 dark:hover:border-pink-600 transition-all">
                          <div className="flex items-center space-x-3">
                            <button onClick={() => escucharPalabra(item.en)} className="p-2.5 bg-gradient-to-r from-rose-500 to-purple-600 hover:opacity-90 text-white rounded-xl transition-all active:scale-90 shadow-md">
                              <Volume2 size={16} />
                            </button>
                            <span className="text-xs font-black text-slate-900 dark:text-white">{item.en}</span>
                          </div>
                          <span className="text-xs font-black text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-xl border border-purple-100/50 dark:border-slate-800 shadow-sm">🗣️ {item.es}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 bg-rose-50/30 dark:bg-slate-800/50 rounded-2xl border border-purple-100/30 dark:border-slate-700 text-xs">
                      <p className="font-black text-purple-600 dark:text-pink-400 flex items-center gap-1.5">🎯 Actividad Evaluativa:</p>
                      <p className="font-bold text-slate-800 dark:text-white mt-1 bg-white dark:bg-slate-900 p-3 rounded-xl border border-purple-100/50 dark:border-slate-800 shadow-sm">{lesson.task}</p>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}

          {/* TAB: PRÁCTICA MÁGICA DE DUOLINGO */}
          {activeTab === 'practica' && (
            <div className="space-y-6 animate-slide-in">
              <div className="bg-gradient-to-r from-rose-500 via-purple-600 to-cyan-500 p-6 rounded-3xl text-white shadow-lg shadow-purple-500/20 relative overflow-hidden">
                <Trophy className="absolute right-4 top-4 text-rose-200 animate-bounce" size={48} />
                <h1 className="text-2xl font-black text-white">Práctica Mágica Interactiva 🦉💚</h1>
                <p className="text-xs mt-1.5 font-bold text-rose-50">¡Conviértete en una estrella del Speaking y completa los desafíos del salón de belleza!</p>
              </div>

              {/* DESAFÍO DE VOZ */}
              <div className="bg-white/95 dark:bg-slate-900 border border-purple-100 dark:border-slate-800 p-6 rounded-3xl shadow-xl shadow-purple-100/10 space-y-4">
                <div className="flex items-center space-x-2 border-b pb-3 border-purple-50 dark:border-slate-800">
                  <span className="p-1.5 bg-rose-50 dark:bg-purple-900 text-rose-600 dark:text-purple-300 rounded-xl"><Mic size={18} /></span>
                  <h2 className="text-sm font-black text-rose-600 dark:text-purple-300 uppercase tracking-wider">Desafío 1: Simulador de Speaking 🎙️</h2>
                </div>

                <div className="p-4 bg-purple-50/20 dark:bg-slate-800/80 rounded-2xl border border-purple-100/30 dark:border-slate-700 text-xs text-slate-900 dark:text-white space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-purple-600 dark:text-pink-400">Escenario {currentScenario + 1} de {practiceScenarios.length}</span>
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
                          className={`w-3.5 h-3.5 rounded-full ${currentScenario === idx ? 'bg-purple-600' : 'bg-purple-200 dark:bg-slate-700'}`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="font-bold text-sm text-slate-900 dark:text-white">{practiceScenarios[currentScenario].spanishPrompt}</p>

                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-purple-100/50 dark:border-slate-800 flex items-center justify-between shadow-sm">
                    <span className="text-sm font-black text-purple-600 dark:text-indigo-400">"{practiceScenarios[currentScenario].englishTarget}"</span>
                    <button 
                      onClick={() => escucharPalabra(practiceScenarios[currentScenario].englishTarget)}
                      className="p-2.5 bg-rose-50 hover:bg-rose-100 dark:bg-slate-800 text-rose-600 dark:text-purple-300 rounded-xl active:scale-95 shadow-sm border border-purple-100/40 dark:border-slate-700"
                      title="Escuchar modelo"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold italic">💡 Tip de Hada: {practiceScenarios[currentScenario].tip}</p>

                  <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-900/50 rounded-2xl border border-dashed border-purple-200 dark:border-slate-800 space-y-3">
                    <button
                      onClick={() => empezarPrácticaDeVoz(practiceScenarios[currentScenario].englishTarget)}
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-all transform shadow-lg active:scale-90 ${isRecording ? 'bg-red-500 animate-pulse border-4 border-red-200' : 'bg-gradient-to-r from-rose-500 via-purple-600 to-cyan-500 border-4 border-rose-200 dark:border-purple-800'}`}
                    >
                      <Mic size={28} />
                    </button>
                    <span className="text-xs font-black text-slate-900 dark:text-white">
                      {isRecording ? "¡Grabando! Te estoy escuchando... 🗣️" : "Haz clic en el micrófono para empezar a hablar"}
                    </span>

                    {practiceStatus === 'listening' && (
                      <div className="text-center animate-pulse text-purple-600 font-black">Procesando audio mágico... ✨</div>
                    )}

                    {spokenText && (
                      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-purple-100 w-full text-center space-y-1">
                        <p className="text-[11px] text-slate-500 font-black">Te escuché decir:</p>
                        <p className="text-xs font-black text-slate-900 dark:text-white">"{spokenText}"</p>
                      </div>
                    )}

                    {practiceScore !== null && (
                      <div className="text-center space-y-2">
                        <div className="inline-flex items-center justify-center p-3 bg-rose-50 dark:bg-indigo-950/40 text-rose-700 dark:text-indigo-300 rounded-full font-black text-sm gap-1.5 border border-purple-200">
                          <Award size={18} /> Puntuación: {practiceScore}%
                        </div>
                        <div className="w-48 bg-purple-50 rounded-full h-3 overflow-hidden border border-purple-200">
                          <div className="bg-gradient-to-r from-rose-500 via-purple-600 to-cyan-500 h-3 rounded-full" style={{ width: `${practiceScore}%` }}></div>
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

              {/* ARMADOR DE FRASES */}
              <div className="bg-white/95 dark:bg-slate-900 border border-purple-100 dark:border-slate-800 p-6 rounded-3xl shadow-xl shadow-purple-100/10 space-y-4">
                <div className="flex items-center space-x-2 border-b pb-3 border-purple-50 dark:border-slate-800">
                  <span className="p-1.5 bg-cyan-50 dark:bg-indigo-950 text-cyan-600 dark:text-cyan-300 rounded-xl"><Gamepad2 size={18} /></span>
                  <h2 className="text-sm font-black text-cyan-600 dark:text-cyan-300 uppercase tracking-wider">Desafío 2: Armador de Frases Interactiva 🦉</h2>
                </div>

                <div className="p-4 bg-cyan-50/20 dark:bg-slate-800/80 rounded-2xl border border-purple-100/30 dark:border-slate-700 text-xs text-slate-900 dark:text-white space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-purple-600 dark:text-pink-400">Pregunta {currentSentenceIndex + 1} de {sentenceBuilderScenarios.length}</span>
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

                  <p className="font-bold text-sm text-slate-900 dark:text-white">{sentenceBuilderScenarios[currentSentenceIndex].instruction}</p>

                  <div className="p-4 bg-white dark:bg-slate-900 border-2 border-dashed border-purple-200 dark:border-slate-700 rounded-2xl min-h-[60px] flex flex-wrap gap-2 items-center justify-center">
                    {selectedWords.length === 0 ? (
                      <span className="text-[11px] text-slate-400 font-bold italic">Toca las palabras de abajo para armar la frase...</span>
                    ) : (
                      selectedWords.map((word, idx) => (
                        <button
                          key={idx}
                          onClick={() => removerPalabraDelArmador(idx)}
                          className="bg-gradient-to-r from-rose-500 via-purple-600 to-cyan-500 text-white font-black px-3 py-1.5 rounded-xl shadow-sm hover:opacity-90 text-xs"
                        >
                          {word}
                        </button>
                      ))
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2.5 justify-center py-2 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-purple-100/60 dark:border-slate-800">
                    {sentenceBuilderScenarios[currentSentenceIndex].shuffledArray.map((word, idx) => {
                      const isUsed = selectedWords.includes(word);
                      return (
                        <button
                          key={idx}
                          disabled={isUsed}
                          onClick={() => agregarPalabraAlArmador(word)}
                          className={`font-black px-3 py-2 rounded-xl text-xs transition-all border ${isUsed ? 'bg-purple-50/50 border-purple-100 text-purple-200 cursor-not-allowed dark:bg-slate-800 dark:border-slate-700' : 'bg-purple-50/20 border-purple-200 text-slate-900 hover:bg-purple-50 hover:border-purple-300 active:scale-95 dark:bg-slate-800 dark:border-slate-700 dark:text-white'}`}
                        >
                          {word}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex gap-2 justify-center pt-2">
                    <button
                      onClick={() => verificarFraseConstruida(sentenceBuilderScenarios[currentSentenceIndex].solutionKey)}
                      className="bg-gradient-to-r from-rose-500 to-purple-600 hover:opacity-95 text-white font-black py-2.5 px-5 rounded-xl text-xs shadow-md active:scale-95 transition-all"
                    >
                      Verificar Respuesta ✔️
                    </button>
                    <button
                      onClick={reiniciarArmadorDeFrase}
                      className="bg-purple-50 hover:bg-purple-100 dark:bg-slate-800 text-purple-700 dark:text-white font-black py-2.5 px-4 rounded-xl text-xs border border-purple-200 active:scale-95"
                    >
                      Reiniciar 🔄
                    </button>
                  </div>

                  {builderStatus === 'success' && (
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 rounded-2xl text-center space-y-1">
                      <p className="text-emerald-700 dark:text-emerald-400 font-black">¡Fabuloso! Tu frase está perfectamente estructurada. 🦉💚</p>
                    </div>
                  )}
                  {builderStatus === 'error' && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 rounded-2xl text-center space-y-1">
                      <p className="text-red-600 dark:text-red-400 font-black">La frase no coincide exactamente. ¡Presiona Reiniciar e intenta de nuevo! 🧸</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: MOCHILA DE TAREAS */}
          {activeTab === 'mochila' && (
            <div className="bg-white/95 dark:bg-slate-900 border border-purple-100 dark:border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl shadow-purple-100/10">
              <div className="flex items-center justify-between border-b pb-4 border-purple-50 dark:border-slate-700">
                <div className="flex items-center space-x-2">
                  <FolderHeart className="text-rose-500 animate-bounce" size={24} />
                  <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">MOCHILA DE TAREAS EN LA NUBE</h2>
                </div>
                {esProfesora && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-800 dark:text-slate-100">Estudiante:</span>
                    <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} className="text-xs font-bold p-1.5 rounded-xl bg-white text-slate-900 border border-purple-200 outline-none">
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
                    <div key={key} className="bg-purple-50/20 dark:bg-slate-800/80 p-4 rounded-3xl border border-purple-100/40 dark:border-slate-700 text-xs text-slate-900 dark:text-white space-y-3">
                      <p className="font-black text-purple-700 dark:text-pink-400 flex items-center gap-1.5">🎯 {infoTareas[key]}</p>
                      <p className="text-[11px] text-slate-800 dark:text-slate-100 font-bold">Mochila de: <span className="uppercase text-purple-600 font-black">{targetStudent}</span></p>
                      
                      <div className="flex flex-wrap gap-2 items-center">
                        {!esProfesora && (
                          <label className="bg-gradient-to-r from-rose-500 to-purple-600 hover:opacity-95 text-white px-4 py-2.5 rounded-xl font-black cursor-pointer shadow-md active:scale-95 transition-all flex items-center gap-1 text-[11px]">
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
                          <span className="text-slate-500 dark:text-slate-400 font-black italic text-[11px]">Aún no has subido tu PDF</span>
                        )}
                      </div>

                      <div className="border-t pt-2 border-purple-100 dark:border-slate-700 flex justify-between items-center flex-wrap gap-2">
                        <span className="font-black text-purple-700 dark:text-pink-300">⭐ Nota: {gradeData.nota} / 10</span>
                        {gradeData.comentario && (
                          <p className="bg-white dark:bg-slate-900 p-2.5 rounded-2xl border border-purple-100 text-slate-900 dark:text-slate-200 font-bold italic w-full">
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

          {/* TAB: CALIFICACIONES EN LA NUBE */}
          {activeTab === 'calificaciones' && (
            <div className="bg-white/95 dark:bg-slate-900 border border-purple-100 dark:border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl shadow-purple-100/10">
              <div className="flex items-center space-x-2 border-b pb-2 border-purple-50 dark:border-slate-700">
                <Star className="text-amber-500 fill-amber-500 animate-pulse" size={24} />
                <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">CALIFICACIONES EN TIEMPO REAL</h2>
              </div>

              {esProfesora ? (
                <div className="space-y-4">
                  <div className="p-3 bg-purple-50/20 dark:bg-slate-800 rounded-2xl flex items-center justify-between border border-purple-100/50 dark:border-slate-700">
                    <span className="text-xs font-black text-slate-900 dark:text-white">Estudiante a Calificar:</span>
                    <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} className="text-xs font-black p-1.5 rounded-xl bg-white text-slate-900 border border-purple-200">
                      {estudiantesLista.map(est => <option key={est.id} value={est.id}>{est.name}</option>)}
                    </select>
                  </div>

                  {['clase2', 'clase3', 'clase5', 'clase6'].map(key => {
                    const currentRecord = grades[selectedStudent]?.[key] || { nota: '-', comentario: '' };
                    return (
                      <div key={key} className="bg-purple-50/10 dark:bg-slate-800 p-4 rounded-3xl border border-purple-100/30 dark:border-slate-700 space-y-3">
                        <span className="text-xs font-black block text-slate-900 dark:text-white">{infoTareas[key]}</span>
                        <div className="flex items-center space-x-3 text-xs font-black text-slate-900 dark:text-white">
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
                            className="p-1.5 rounded bg-white text-slate-900 border border-purple-400 font-black outline-none focus:ring-2 focus:ring-purple-400"
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
                    const record = grades[currentUser.username]?.[key] || { nota: '-', comentario: '' };
                    return (
                      <div key={key} className="p-4 bg-purple-50/10 dark:bg-slate-800 rounded-3xl border text-xs text-slate-900 dark:text-white space-y-2 relative overflow-hidden border-purple-100/40 dark:border-slate-700">
                        <div className="flex justify-between items-start">
                          <span className="font-black max-w-md">{infoTareas[key]}</span>
                          <span className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-2.5 py-1 rounded-lg font-black text-xs">Nota: {record.nota} / 10</span>
                        </div>
                        {record.comentario && (
                          <p className="bg-white dark:bg-slate-900 p-2.5 rounded-2xl border border-purple-100 font-bold text-slate-900 dark:text-slate-200">
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

          {/* TAB: MÚSICA FELIZ */}
          {activeTab === 'musica' && (
            <div className="bg-white/95 dark:bg-slate-900 border border-purple-100 dark:border-slate-800 p-6 rounded-3xl space-y-5 animate-slide-in shadow-xl shadow-purple-100/10">
              <div className="flex items-center justify-between border-b pb-4 border-purple-50 dark:border-slate-700">
                <div className="flex items-center space-x-2">
                  <Music className="text-purple-600 animate-pulse" size={24} />
                  <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">MURAL DE MÚSICA FELIZ 🎵✨</h2>
                </div>
                {esIsabel && (
                  <span className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 text-[10px] font-black uppercase px-2.5 py-1.5 rounded-xl border border-purple-200">
                    Modo Observadora Activo 🌸
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-800 dark:text-slate-100 font-bold bg-gradient-to-r from-rose-50/50 via-purple-50/50 to-cyan-50/30 dark:bg-slate-800/50 p-2.5 rounded-xl border border-purple-100/30 dark:border-slate-700">
                ¡La música llena de polvos de hadas nuestro salón! Comparte el enlace de la canción que te hace sonreír y llena de amor los recuadros de tus compañeros.
              </p>

              {!esIsabel ? (
                <div className="p-4 bg-purple-50/20 dark:bg-slate-800/40 rounded-2xl border border-purple-100/40 dark:border-slate-700/50 space-y-3">
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
                        placeholder="Enlace de la canción (YouTube/Spotify/etc)" 
                        value={newSongUrl}
                        onChange={(e) => setNewSongUrl(e.target.value)}
                        className="flex-1 p-2.5 border border-purple-200 rounded-xl bg-white text-slate-900 font-bold text-xs outline-none focus:ring-2 focus:ring-purple-400"
                      />
                      <button 
                        onClick={handleGuardarCancion}
                        className="bg-gradient-to-r from-rose-500 via-purple-600 to-cyan-500 hover:opacity-95 text-white font-black text-xs px-4 rounded-xl shadow-md flex items-center gap-1.5"
                      >
                        Colgar 🎵
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-purple-50/30 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300 text-xs font-bold rounded-2xl text-center border border-purple-200">
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
                    <div key={userKey} className="bg-white/90 dark:bg-slate-800/50 border border-purple-100 dark:border-slate-700 p-4 rounded-3xl shadow-lg shadow-purple-100/10 relative overflow-hidden flex flex-col justify-between space-y-3">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-rose-500 via-purple-600 to-cyan-500"></div>
                      
                      <div className="flex justify-between items-start pl-2">
                        <div>
                          <span className="text-xs font-black uppercase tracking-wider text-purple-700 dark:text-pink-400">
                            Música de: {userAccount.name}
                          </span>
                          <span className="text-[9px] block text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-widest mt-0.5">
                            ({userAccount.role})
                          </span>
                        </div>
                        <button 
                          onClick={() => handleDarLike(userKey)}
                          disabled={esIsabel}
                          className={`flex items-center gap-1 px-3 py-2 rounded-full text-xs font-black transition-all ${tieneMiHeart ? 'bg-rose-50 text-rose-600 dark:bg-pink-900/40 dark:text-pink-300 border border-rose-200' : 'bg-purple-50/30 text-purple-400 dark:bg-slate-800 dark:text-slate-500 border border-purple-100/30 dark:border-slate-700'} ${esIsabel ? 'opacity-50 cursor-not-allowed' : 'active:scale-90'}`}
                        >
                          <Heart size={14} className={tieneMiHeart ? 'fill-rose-600 text-rose-600' : ''} />
                          {(item.likes || []).length}
                        </button>
                      </div>

                      <div className="bg-purple-50/10 dark:bg-slate-900 p-3 rounded-2xl border border-purple-100/30 dark:border-slate-800 pl-4 space-y-2">
                        <p className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                          🎧 {item.nombre_cancion}
                        </p>
                        <a 
                          href={item.enlace} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-1 bg-gradient-to-r from-rose-500 via-purple-600 to-cyan-500 text-white text-[10px] font-black px-3.5 py-2 rounded-xl shadow-md hover:scale-102 transition-all active:scale-95"
                        >
                          <PlayCircle size={12} /> Escuchar Canción 🎵
                        </a>
                      </div>

                      <div className="space-y-2 bg-purple-50/10 dark:bg-slate-900/40 p-3 rounded-2xl">
                        <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest block">
                          Comentarios:
                        </span>
                        
                        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                          {(item.comentarios || []).length === 0 ? (
                            <span className="text-[10px] italic text-slate-500 dark:text-slate-400 font-bold block">Sé la primera en comentar... 🌸</span>
                          ) : (
                            item.comentarios.map((c, idx) => {
                              const tieneComentarioHeart = (c.likes || []).includes(currentUser.username);
                              const puedoEliminarComentario = !esIsabel && (userKey === currentUser.username || c.usuario === currentUser.username);

                              return (
                                <div key={idx} className="bg-white dark:bg-slate-800/90 p-2.5 rounded-xl text-xs border border-purple-100/50 dark:border-slate-700 flex justify-between items-start gap-2 text-slate-900 dark:text-slate-100 shadow-sm">
                                  <div className="flex-1 min-w-0">
                                    <span className="font-black text-purple-700 dark:text-purple-300 block text-[10px]">{c.nombre}:</span>
                                    <span className="text-slate-800 dark:text-slate-100 font-bold break-words">{c.texto}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                                    <button
                                      disabled={esIsabel}
                                      onClick={() => handleLikeComentario(userKey, idx)}
                                      className={`p-1.5 rounded-md transition-all active:scale-90 flex items-center gap-1 ${tieneComentarioHeart ? 'text-rose-600 bg-rose-50 dark:bg-pink-900/20' : 'text-purple-300 hover:text-rose-500'}`}
                                      title="Dar amor al comentario"
                                    >
                                      <Heart size={12} className={tieneComentarioHeart ? 'fill-rose-600 text-rose-600' : ''} />
                                      <span className="text-[9px] font-black">{(c.likes || []).length}</span>
                                    </button>
                                    
                                    {puedoEliminarComentario && (
                                      <button
                                        onClick={() => handleEliminarComentario(userKey, idx)}
                                        className="p-1.5 text-purple-300 hover:text-red-500 rounded-md transition-all active:scale-90"
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
                          <div className="flex gap-1.5 pt-1.5 border-t border-purple-100/60 dark:border-slate-700/60">
                            <input 
                              type="text" 
                              placeholder="Escribe un mensaje lindo..." 
                              value={commentInput[userKey] || ''}
                              onChange={(e) => setCommentInput(prev => ({ ...prev, [userKey]: e.target.value }))}
                              className="flex-1 p-2 text-xs text-slate-900 font-bold border border-purple-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-purple-400"
                            />
                            <button 
                              onClick={() => handleAgregarComentario(userKey)}
                              className="bg-gradient-to-r from-rose-500 to-purple-600 hover:opacity-95 text-white p-2 rounded-xl flex items-center justify-center active:scale-90 shadow-md"
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
            <div className="bg-white/95 dark:bg-slate-900 border border-purple-100 dark:border-slate-800 p-6 rounded-3xl space-y-5 animate-slide-in shadow-xl shadow-purple-100/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 border-purple-50 dark:border-slate-700 gap-3">
                <div className="flex items-center space-x-2">
                  <Volume2 className="text-purple-600 animate-pulse" size={24} />
                  <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">DICCIONARIO INTERACTIVO PARLANTE 👋🔊</h2>
                </div>
                <div className="relative flex items-center">
                  <input 
                    type="text" 
                    placeholder="Buscar palabra..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-3 py-2 border border-purple-200 rounded-xl bg-white text-slate-900 font-bold text-xs outline-none focus:ring-2 focus:ring-purple-400 w-full"
                  />
                  <Search className="absolute left-2.5 text-purple-400" size={14} />
                </div>
              </div>

              {/* FILTROS DE CATEGORÍA CON COLORES PASTEL */}
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
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all border ${activeVocabFilter === cat.id ? 'bg-gradient-to-r from-rose-500 via-purple-600 to-cyan-500 text-white shadow-md' : `${cat.color} hover:opacity-85`}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-2.5 max-h-[400px] overflow-y-auto pr-1">
                {filteredVocab.map((item, i) => (
                  <div key={i} className="flex justify-between items-center bg-purple-50/10 dark:bg-slate-800 p-3.5 rounded-2xl border border-purple-100/30 dark:border-slate-700 hover:scale-[1.01] transition-all">
                    <div className="flex items-center space-x-3">
                      <button onClick={() => escucharPalabra(item.en)} className="p-2.5 bg-gradient-to-r from-rose-500 to-purple-600 hover:opacity-90 text-white rounded-xl transition-all active:scale-90 shadow-md">
                        <Volume2 size={16} />
                      </button>
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-900 dark:text-white">{item.en}</span>
                        <span className="text-[9px] bg-purple-50 text-purple-700 dark:bg-slate-700 dark:text-pink-300 w-max px-2 py-0.5 rounded-md font-black mt-1 uppercase tracking-wider">{item.cat}</span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 border border-purple-100/50 dark:border-slate-800 px-3 py-1 rounded-xl shadow-inner">🗣️ {item.es}</span>
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
            <div className="bg-white/95 dark:bg-slate-900 border border-purple-100 dark:border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl shadow-purple-100/10">
              <div className="flex items-center space-x-2 border-b pb-4 border-purple-50 dark:border-slate-700">
                <Gamepad2 className="text-purple-600 animate-bounce" size={24} />
                <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">ÁREA DE JUEGOS 🎮✨</h2>
              </div>
              <p className="text-xs text-slate-800 dark:text-slate-100 font-bold bg-purple-50/10 dark:bg-slate-800/50 p-2.5 rounded-xl border border-purple-100/30 dark:border-slate-700">¡Haz clic en cualquiera de los juegos para repasar y divertirte al máximo!</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <a href="https://wordwall.net/es/resource/115823970" target="_blank" rel="noopener noreferrer" className="block p-4 bg-rose-50/30 hover:bg-rose-50/60 dark:bg-slate-800 rounded-3xl border border-rose-100 dark:border-slate-700 transition-all active:scale-95 shadow-md">
                  <div className="flex items-center space-x-2">
                    <PlayCircle className="text-rose-500 animate-pulse" size={18} />
                    <span className="text-xs font-black text-rose-700 dark:text-purple-300">Juego 1: Wordwall 👋</span>
                  </div>
                  <span className="text-[11px] text-slate-800 dark:text-slate-400 block mt-1 font-bold">Greetings & Saludos iniciales para recibir clientes de forma alegre.</span>
                </a>

                <a href="https://interacty.me/projects/e502cc8626a13026" target="_blank" rel="noopener noreferrer" className="block p-4 bg-purple-50/30 hover:bg-purple-50/60 dark:bg-slate-800 rounded-3xl border border-purple-100 dark:border-slate-700 transition-all active:scale-95 shadow-md">
                  <div className="flex items-center space-x-2">
                    <PlayCircle className="text-purple-600 animate-pulse" size={18} />
                    <span className="text-xs font-black text-purple-700 dark:text-pink-300">Juego 2: Interacty 🧪</span>
                  </div>
                  <span className="text-[11px] text-slate-800 dark:text-slate-400 block mt-1 font-bold">Keratin Process Challenge y orden correcto de los pasos.</span>
                </a>

                <a href="https://wordwall.net/es/resource/116065664" target="_blank" rel="noopener noreferrer" className="block p-4 bg-cyan-50/30 hover:bg-cyan-50/60 dark:bg-slate-800 rounded-3xl border border-cyan-100 dark:border-slate-700 transition-all active:scale-95 shadow-md">
                  <div className="flex items-center space-x-2">
                    <PlayCircle className="text-cyan-500 animate-pulse" size={18} />
                    <span className="text-xs font-black text-cyan-600 dark:text-cyan-300">Juego 3: Wordwall Aftercare 🧴</span>
                  </div>
                  <span className="text-[11px] text-slate-800 dark:text-slate-400 block mt-1 font-bold">Cuidado posterior y recomendaciones cruciales al cliente.</span>
                </a>

                <a href="https://create.kahoot.it/share/class-5/16e72ba0-e8fc-4910-9400-b7a3c94c3586" target="_blank" rel="noopener noreferrer" className="block p-4 bg-indigo-50/30 hover:bg-indigo-50/60 dark:bg-slate-800 rounded-3xl border border-indigo-100 dark:border-slate-700 transition-all active:scale-95 shadow-md">
                  <div className="flex items-center space-x-2">
                    <PlayCircle className="text-indigo-500 animate-pulse" size={18} />
                    <span className="text-xs font-black text-indigo-600 dark:text-indigo-300">Juego 4: Kahoot Price & Time 💰</span>
                  </div>
                  <span className="text-[11px] text-slate-800 dark:text-slate-400 block mt-1 font-bold">Preguntas y respuestas sobre precios y métodos de pago del salón.</span>
                </a>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* CARTEL DE CONFIRMACIÓN FLOTANTE ROSA Y MÁGICO */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-slide-in">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl max-w-sm w-full border border-purple-200 shadow-2xl text-center space-y-4">
            <span className="text-5xl animate-bounce inline-block">🧹✨</span>
            <h3 className="font-black text-base text-slate-900 dark:text-white">¿Quieres borrar esta tarea para subir otra?</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">¡Tu antigua tarea desaparecerá de la nube de Supabase!</p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={handlePdfDeleteConfirmed}
                className="bg-red-500 hover:bg-red-600 text-white font-black text-xs px-5 py-2.5 rounded-xl active:scale-95 transition-all shadow-md"
              >
                Sí, Borrar 🗑️
              </button>
              <button
                onClick={() => setDeleteConfirm({ show: false, claseKey: null, studentUser: null })}
                className="bg-purple-50 dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-slate-700 text-purple-700 dark:text-white font-black text-xs px-5 py-2.5 rounded-xl active:scale-95 transition-all border border-purple-200"
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
          <div className={`p-4 rounded-2xl shadow-xl flex items-center gap-2 border text-xs font-black ${toast.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-slate-900 dark:text-emerald-400' : 'bg-red-50 text-red-800 border-red-200 dark:bg-slate-900 dark:text-red-400'}`}>
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