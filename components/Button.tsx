import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  fullWidth = false,
  className = '',
  disabled,
  ...props 
}) => {
  // Base styles: Removido 'disabled:opacity-50' daqui para gerenciar condicionalmente
  const baseStyles = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 shadow-lg shadow-indigo-500/30 border border-transparent",
    secondary: "bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500 shadow-lg shadow-purple-500/30 border border-transparent",
    outline: "bg-transparent hover:bg-white/10 text-gray-300 border border-gray-600 hover:border-gray-400 focus:ring-gray-500",
    ghost: "bg-transparent hover:bg-white/5 text-gray-400 hover:text-white border border-transparent",
  };

  const widthClass = fullWidth ? "w-full" : "";

  // Se estiver carregando, aplica pulso e mantem opacidade alta (o pulso já reduz visualmente).
  // Se estiver apenas desabilitado (sem carregar), aplica a opacidade de 50%.
  const stateStyles = isLoading 
    ? "animate-pulse cursor-wait opacity-90" 
    : "disabled:opacity-50";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${stateStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Processando...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;