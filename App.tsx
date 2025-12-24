import React, { useState } from 'react';
import { User, AuthStatus, ViewMode } from './types';
import { mockLoginWithEmail, mockLoginWithGoogle, mockRegisterWithEmail, mockResetPassword } from './services/authService';
import Input from './components/Input';
import Button from './components/Button';
import Dashboard from './components/Dashboard';

// Assets
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="currentColor"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="currentColor"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26z" 
    />
    <path
      fill="currentColor"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

// TODO: Replace with your actual key matching the one in index.html
const RECAPTCHA_SITE_KEY = 'YOUR_RECAPTCHA_SITE_KEY';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.LOGIN);
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.IDLE);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const executeRecaptcha = async (action: string): Promise<string> => {
    if (typeof (window as any).grecaptcha === 'undefined') {
      console.warn('reCAPTCHA not loaded. Check your internet connection or API Key in index.html.');
      return '';
    }
    
    try {
      return await (window as any).grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
    } catch (error) {
      console.error('reCAPTCHA execution failed:', error);
      return '';
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Differentiate logic based on view mode
    if (viewMode === ViewMode.FORGOT_PASSWORD) {
      await handleResetPassword();
      return;
    }

    if (!email || !password) {
      setErrorMsg("Por favor, preencha todos os campos");
      return;
    }

    setAuthStatus(AuthStatus.LOADING);

    try {
      const token = await executeRecaptcha('submit_form');
      
      let loggedUser: User;
      if (viewMode === ViewMode.LOGIN) {
        loggedUser = await mockLoginWithEmail(email, password, token);
      } else {
        loggedUser = await mockRegisterWithEmail(email, password, token);
      }
      setUser(loggedUser);
      setAuthStatus(AuthStatus.SUCCESS);
    } catch (err) {
      setAuthStatus(AuthStatus.ERROR);
      setErrorMsg(err instanceof Error ? err.message : "Ocorreu um erro inesperado");
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setErrorMsg("Por favor, insira seu endereço de email");
      return;
    }

    setAuthStatus(AuthStatus.LOADING);
    try {
      const token = await executeRecaptcha('reset_password');
      await mockResetPassword(email, token);
      setAuthStatus(AuthStatus.SUCCESS);
      setSuccessMsg(`Enviamos um link de redefinição para ${email}. Verifique sua caixa de entrada!`);
      // Optional: Clear email or redirect after a delay
    } catch (err) {
      setAuthStatus(AuthStatus.ERROR);
      setErrorMsg(err instanceof Error ? err.message : "Falha ao enviar e-mail de redefinição");
    }
  };

  const handleGoogleLogin = async () => {
    setAuthStatus(AuthStatus.LOADING);
    setErrorMsg(null);
    try {
      const loggedUser = await mockLoginWithGoogle();
      setUser(loggedUser);
      setAuthStatus(AuthStatus.SUCCESS);
    } catch (err) {
      setAuthStatus(AuthStatus.ERROR);
      setErrorMsg("Login com Google falhou");
    }
  };

  const toggleMode = (mode: ViewMode) => {
    setViewMode(mode);
    setErrorMsg(null);
    setSuccessMsg(null);
    setAuthStatus(AuthStatus.IDLE);
    // Keep email populated if switching modes, but maybe clear password
    setPassword('');
  };

  if (user) {
    return <Dashboard user={user} onLogout={() => setUser(null)} />;
  }

  // Dynamic Header Text
  let headerTitle = 'Bem-vindo de volta';
  let headerSubtitle = 'Insira suas credenciais para acessar o painel';
  
  if (viewMode === ViewMode.REGISTER) {
    headerTitle = 'Criar Conta';
    headerSubtitle = 'Junte-se a nós hoje e explore as possibilidades';
  } else if (viewMode === ViewMode.FORGOT_PASSWORD) {
    headerTitle = 'Recuperação de Conta';
    headerSubtitle = 'Insira seu e-mail para receber um link de redefinição';
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px]" />
            <div className="absolute top-[30%] -right-[10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[100px]" />
            <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] bg-blue-600/10 rounded-full blur-[80px]" />
        </div>

      <div className="relative z-10 w-full flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 animate-fade-in">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              {headerTitle}
            </h2>
            <p className="text-gray-400 mt-2 text-sm">
              {headerSubtitle}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            <Input 
              label="Endereço de Email" 
              type="email" 
              placeholder="voce@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              }
            />
            
            {viewMode !== ViewMode.FORGOT_PASSWORD && (
              <div className="space-y-1">
                <Input 
                  label="Senha" 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  }
                />
                
                {viewMode === ViewMode.LOGIN && (
                  <div className="flex justify-end">
                    <button 
                      type="button"
                      onClick={() => toggleMode(ViewMode.FORGOT_PASSWORD)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
                    >
                      Esqueceu a senha?
                    </button>
                  </div>
                )}
              </div>
            )}

            {errorMsg && (
              <div className="p-3 text-sm text-red-200 bg-red-900/30 border border-red-800 rounded-lg animate-fade-in">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="p-3 text-sm text-green-200 bg-green-900/30 border border-green-800 rounded-lg animate-fade-in">
                {successMsg}
              </div>
            )}

            <Button 
              type="submit" 
              fullWidth 
              variant="primary" 
              isLoading={authStatus === AuthStatus.LOADING}
            >
              {viewMode === ViewMode.LOGIN ? 'Entrar' : (viewMode === ViewMode.REGISTER ? 'Cadastrar' : 'Enviar Link de Redefinição')}
            </Button>
          </form>

          {viewMode !== ViewMode.FORGOT_PASSWORD ? (
            <>
              <div className="my-6 flex items-center justify-between">
                <span className="h-px w-full bg-gray-700"></span>
                <span className="px-3 text-sm text-gray-500 uppercase">Ou</span>
                <span className="h-px w-full bg-gray-700"></span>
              </div>

              <button
                onClick={handleGoogleLogin}
                disabled={authStatus === AuthStatus.LOADING}
                className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-600 rounded-lg text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500 transition-colors disabled:opacity-50"
              >
                <GoogleIcon />
                Continuar com Google
              </button>

              <div className="mt-8 text-center text-sm text-gray-400">
                {viewMode === ViewMode.LOGIN ? "Não tem uma conta? " : "Já tem uma conta? "}
                <button 
                  onClick={() => toggleMode(viewMode === ViewMode.LOGIN ? ViewMode.REGISTER : ViewMode.LOGIN)} 
                  className="font-medium text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
                >
                  {viewMode === ViewMode.LOGIN ? 'Cadastre-se' : 'Entre'}
                </button>
              </div>
            </>
          ) : (
            <div className="mt-6 text-center text-sm text-gray-400">
              <button 
                onClick={() => toggleMode(ViewMode.LOGIN)}
                className="font-medium text-gray-300 hover:text-white hover:underline transition-colors flex items-center justify-center w-full"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Voltar para Login
              </button>
            </div>
          )}
          
          <div className="mt-6 text-center text-xs text-gray-500">
            Este site é protegido pelo reCAPTCHA e a 
            <a href="https://policies.google.com/privacy" className="text-gray-400 hover:underline"> Política de Privacidade</a> e os 
            <a href="https://policies.google.com/terms" className="text-gray-400 hover:underline"> Termos de Serviço</a> do Google se aplicam.
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;