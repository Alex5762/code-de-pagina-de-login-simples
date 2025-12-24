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
      const msg = await generateWelcomeMessage(user.displayName || 'Usuário');
      if (mounted) {
        setWelcomeMessage(msg);
      }
    };

    fetchGreeting();

    return () => {
      mounted = false;
    };
  }, [user.displayName]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <header className="flex justify-between items-center py-6 border-b border-gray-700">
          <div className="flex items-center space-x-4">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-indigo-500" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold">
                {user.email.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold">Painel de Controle</h1>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout}>Sair</Button>
        </header>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-2">Saudação da IA Gemini</h2>
              <p className="text-2xl md:text-3xl font-light italic leading-relaxed text-gray-100">
                "{welcomeMessage}"
              </p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Análises', desc: 'analises' }, 
              { title: 'Projetos', desc: 'projetos' }, 
              { title: 'Configurações', desc: 'configuracoes' }
            ].map((item) => (
                <div key={item.title} className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-indigo-500/50 transition-colors group cursor-pointer">
                    <div className="w-12 h-12 bg-gray-700 rounded-lg mb-4 group-hover:bg-indigo-600 transition-colors flex items-center justify-center">
                        <span className="text-2xl">⚡</span>
                    </div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-400 mt-2">Acesse suas {item.desc} e gerencie preferências.</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;