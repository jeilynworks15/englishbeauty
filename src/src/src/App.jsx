import React, { useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  User, 
  Clock, 
  CheckCircle, 
  Award, 
  MessageSquare, 
  Play, 
  FileText,
  ChevronRight,
  Menu,
  X,
  LogOut,
  Calendar
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Datos simulados del curso Keratin Talk
  const user = {
    name: "Jeilyn",
    role: "Estudiante",
    progress: 65,
    points: 320
  };

  const modules = [
    {
      id: 1,
      title: "Módulo 1: Introduction to Hair Structure",
      duration: "2 horas",
      lessons: [
        { title: "1.1 Basic Anatomy of Hair", type: "video", duration: "15 min", completed: true },
        { title: "1.2 What is Keratin?", type: "video", duration: "20 min", completed: true },
        { title: "1.3 Vocabulary: Hair Types & Textures", type: "quiz", duration: "10 min", completed: true }
      ]
    },
    {
      id: 2,
      title: "Módulo 2: The Chemical Process",
      duration: "3 horas",
      lessons: [
        { title: "2.1 PH Scale and Hair Reactions", type: "video", duration: "25 min", completed: true },
        { title: "2.2 Formaldehyde vs. Glyoxylic Acid", type: "reading", duration: "15 min", completed: false },
        { title: "2.3 Listening Practice: Client Consultation", type: "video", duration: "12 min", completed: false }
      ]
    },
    {
      id: 3,
      title: "Módulo 3: Step-by-Step Application",
      duration: "4 horas",
      lessons: [
        { title: "3.1 Pre-Treatment Shampoo Protocol", type: "video", duration: "18 min", completed: false },
        { title: "3.2 Product Application Techniques", type: "video", duration: "30 min", completed: false },
        { title: "3.3 Speaking: Explaining Aftercare to Clients", type: "quiz", duration: "15 min", completed: false }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      
      {/* BARRA DE NAVEGACIÓN SUPERIOR */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-purple-600 p-2 rounded-xl text-white">
              <GraduationCap size={24} />
            </div>
            <div>
              <span className="font-bold text-lg text-slate-800 block leading-tight">Beauty English</span>
              <span className="text-xs text-purple-600 font-medium tracking-wide">KERATIN TALK LMS</span>
            </div>
          </div>

          {/* Menú de Escritorio */}
          <nav className="hidden md:flex space-x-1">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-purple-50 text-purple-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
            >
              Inicio
            </button>
            <button 
              onClick={() => setActiveTab('lessons')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'lessons' ? 'bg-purple-50 text-purple-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
            >
              Clases
            </button>
            <button 
              onClick={() => setActiveTab('grades')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'grades' ? 'bg-purple-50 text-purple-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
            >
              Calificaciones
            </button>
          </nav>

          {/* Perfil del Usuario */}
          <div className="hidden md:flex items-center space-x-4 border-l border-slate-200 pl-4">
            <div className="text-right">
              <span className="block text-sm font-semibold text-slate-700">{user.name}</span>
              <span className="block text-xs text-slate-500">{user.role}</span>
            </div>
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold border border-purple-200">
              {user.name[0]}
            </div>
          </div>

          {/* Botón de Menú Móvil */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          <button 
            onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-base font-medium ${activeTab === 'dashboard' ? 'bg-purple-50 text-purple-700' : 'text-slate-600'}`}
          >
            Inicio
          </button>
          <button 
            onClick={() => { setActiveTab('lessons'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-base font-medium ${activeTab === 'lessons' ? 'bg-purple-50 text-purple-700' : 'text-slate-600'}`}
          >
            Clases
          </button>
          <button 
            onClick={() => { setActiveTab('grades'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-base font-medium ${activeTab === 'grades' ? 'bg-purple-50 text-purple-700' : 'text-slate-600'}`}
          >
            Calificaciones
          </button>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* PESTAÑA: INICIO (DASHBOARD) */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Bienvenida */}
            <div className="bg-gradient-to-r from-purple-700 to-indigo-800 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
              <div className="relative z-10 max-w-md">
                <span className="bg-purple-500/30 text-purple-200 text-xs px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider">Welcome back</span>
                <h1 className="text-2xl sm:text-3xl font-bold mt-2">¡Hola, {user.name}!</h1>
                <p className="text-purple-100 text-sm mt-2">Lista para dominar el inglés técnico para estilistas profesionales hoy?</p>
                <button 
                  onClick={() => setActiveTab('lessons')}
                  className="mt-5 bg-white text-purple-700 px-5 py-2 rounded-xl text-sm font-semibold shadow hover:bg-purple-50 transition-colors inline-flex items-center space-x-2"
                >
                  <span>Continuar curso</span>
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-purple-500/10 rounded-l-full hidden md:block" />
            </div>

            {/* Tarjetas de Estado */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
                <div className="p-3 bg-purple-50 rounded-xl text-purple-600"><Clock size={24} /></div>
                <div>
                  <span className="block text-sm text-slate-500 font-medium">Progreso general</span>
                  <span className="text-xl font-bold text-slate-800">{user.progress}%</span>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
                <div className="p-3 bg-amber-50 rounded-xl text-amber-600"><Award size={24} /></div>
                <div>
                  <span className="block text-sm text-slate-500 font-medium">Puntos ganados</span>
                  <span className="text-xl font-bold text-slate-800">{user.points} XP</span>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
                <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600"><CheckCircle size={24} /></div>
                <div>
                  <span className="block text-sm text-slate-500 font-medium">Tareas completadas</span>
                  <span className="text-xl font-bold text-slate-800">4 / 9</span>
                </div>
              </div>
            </div>

            {/* Vista Rápida del Próximo Módulo */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center space-x-2">
                <BookOpen size={20} className="text-purple-600" />
                <span>Tu plan de estudio actual</span>
              </h2>
              <div className="divide-y divide-slate-100">
                {modules.slice(0, 2).map((mod) => (
                  <div key={mod.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-slate-700 text-sm sm:text-base">{mod.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{mod.duration} • {mod.lessons.length} lecciones</p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('lessons')}
                      className="text-purple-600 hover:text-purple-700 text-sm font-semibold flex items-center space-x-1 self-start sm:self-center"
                    >
                      <span>Ver lecciones</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA: CLASES (LESSONS) */}
        {activeTab === 'lessons' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de Módulos (Izquierda) */}
            <div className="lg:col-span-2 space-y-6">
              <h1 className="text-2xl font-bold text-slate-800">Contenido del Curso</h1>
              {modules.map((mod) => (
                <div key={mod.id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                  <div className="bg-slate-50 px-5 py-4 border-b border-slate-200 flex justify-between items-center">
                    <div>
                      <h2 className="font-bold text-slate-800 text-sm sm:text-base">{mod.title}</h2>
                      <span className="text-xs text-slate-500 font-medium">{mod.duration} en total</span>
                    </div>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {mod.lessons.map((lesson, idx) => (
                      <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                        <div className="flex items-center space-x-3 min-w-0">
                          {lesson.completed ? (
                            <div className="text-emerald-500 bg-emerald-50 p-1.5 rounded-full shrink-0"><CheckCircle size={18} /></div>
                          ) : (
                            <div className="text-slate-400 bg-slate-100 p-1.5 rounded-full shrink-0">
                              {lesson.type === 'video' ? <Play size={18} /> : <FileText size={18} />}
                            </div>
                          )}
                          <span className={`text-sm font-medium truncate ${lesson.completed ? 'text-slate-500 line-through' : 'text-slate-700'}`}>
                            {lesson.title}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 font-medium shrink-0 ml-2">{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Panel de Práctica Adicional (Derecha) */}
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-slate-800 text-base mb-3 flex items-center space-x-2">
                  <MessageSquare size={18} className="text-purple-600" />
                  <span>Glosario Técnico Rápido</span>
                </h3>
                <p className="text-xs text-slate-500 mb-4">Palabras clave indispensables para aplicar la Keratina explicando el proceso en inglés.</p>
                <div className="space-y-2.5">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="block text-sm font-bold text-purple-700">Strand Test</span>
                    <span className="text-xs text-slate-600">Prueba de mechón (esencial para evaluar la resistencia antes de aplicar químico).</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="block text-sm font-bold text-purple-700">To rinse out</span>
                    <span className="text-xs text-slate-600">Enjuagar completamente el exceso de producto del cabello.</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="block text-sm font-bold text-purple-700">Flat iron / Straightener</span>
                    <span className="text-xs text-slate-600">Plancha para el cabello (la herramienta para sellar la cutícula).</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA: CALIFICACIONES (GRADES) */}
        {activeTab === 'grades' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-800">Tus Calificaciones y Notas</h1>
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <th className="p-4 sm:p-5">Evaluación</th>
                    <th className="p-4 sm:p-5">Estado</th>
                    <th className="p-4 sm:p-5 text-right">Nota</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  <tr className="hover:bg-slate-50/40">
                    <td className="p-4 sm:p-5 font-semibold text-slate-700">Quiz 1: Hair Types Vocabulary</td>
                    <td className="p-4 sm:p-5"><span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Aprobado</span></td>
                    <td className="p-4 sm:p-5 text-right font-bold text-slate-800">95 / 100</td>
                  </tr>
                  <tr className="hover:bg-slate-50/40">
                    <td className="p-4 sm:p-5 font-semibold text-slate-700">Listening: Professional Consultation</td>
                    <td className="p-4 sm:p-5"><span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Aprobado</span></td>
                    <td className="p-4 sm:p-5 text-right font-bold text-slate-800">88 / 100</td>
                  </tr>
                  <tr className="hover:bg-slate-50/40">
                    <td className="p-4 sm:p-5 font-semibold text-slate-700">Exam: Chemical Principles & Safety</td>
                    <td className="p-4 sm:p-5"><span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Pendiente</span></td>
                    <td className="p-4 sm:p-5 text-right font-bold text-slate-400">--</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* PIE DE PÁGINA */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-400 font-medium">
          &copy; 2026 Beauty English LMS. Todos los derechos reservados.
        </div>
      </footer>

    </div>
  );
}
