import React, { useEffect, useState } from 'react';
import { User } from '../types';
import Button from './Button';
import { generateWelcomeMessage } from '../services/geminiService';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [welcomeMessage, setWelcomeMessage] = useState<string>('Carregando insight da IA...');

  useEffect(() => {
    let mounted = true;
    
    const fetchGreeting = async () => {
      try {
        const msg = await generateWelcomeMessage(user.displayName || 'Usuário');
        if (mounted) {
          setWelcomeMessage(msg);
        }
      } catch (e) {
        if (mounted) {
          setWelcomeMessage(`Olá, ${user.displayName || 'Usuário'}!`);
        }
      }
    };

    fetchGreeting();

    return () => {
      mounted = false;
    };
  }, [user.displayName]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
      </div>

      {/* Navbar Responsive */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-gray-900/80 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="relative">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="Avatar" 
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-indigo-500 shadow-sm object-cover" 
                  />
                ) : (
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-sm shadow-sm border-2 border-transparent">
                    {user.email.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-gray-900 rounded-full"></span>
              </div>
              <div className="hidden sm:block animate-fade-in">
                <h1 className="text-sm font-bold text-white leading-none">Painel de Controle</h1>
                <p className="text-xs text-gray-400 leading-none mt-1 max-w-[150px] truncate">{user.email}</p>
              </div>
            </div>
            
            <Button variant="outline" onClick={onLogout} className="text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2">
              Sair
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 animate-fade-in space-y-6 sm:space-y-8">
        
        {/* Hero / Welcome Section */}
        <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-6 sm:p-8 md:p-10 shadow-2xl group">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/30 transition-colors duration-500"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                ✨ Gemini Insight
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light italic leading-relaxed text-gray-100 max-w-4xl tracking-tight">
              "{welcomeMessage}"
            </h2>
          </div>
        </section>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { title: 'Análises de Dados', desc: 'Visualize métricas em tempo real', icon: '📊', color: 'bg-blue-500/10 text-blue-400' }, 
              { title: 'Meus Projetos', desc: 'Gerencie tarefas e colaboradores', icon: '🚀', color: 'bg-purple-500/10 text-purple-400' }, 
              { title: 'Configurações', desc: 'Ajuste preferências da conta', icon: '⚙️', color: 'bg-gray-500/10 text-gray-400' },
              { title: 'Segurança', desc: 'Logs de acesso e permissões', icon: '🛡️', color: 'bg-green-500/10 text-green-400' },
              { title: 'Notificações', desc: '3 novas mensagens não lidas', icon: '🔔', color: 'bg-yellow-500/10 text-yellow-400' },
              { title: 'Suporte IA', desc: 'Converse com o assistente', icon: '🤖', color: 'bg-pink-500/10 text-pink-400' }
            ].map((item, index) => (
                <div 
                  key={index} 
                  className="group relative overflow-hidden bg-gray-800/40 hover:bg-gray-800/60 border border-gray-700/50 hover:border-indigo-500/50 rounded-xl p-5 sm:p-6 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer"
                >
                    <div className={`w-12 h-12 rounded-lg mb-4 ${item.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                        {item.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">{item.title}</h3>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">{item.desc}</p>
                    
                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-indigo-500 group-hover:w-full transition-all duration-500 ease-out" />
                </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;