import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ label, error, icon, className = '', ...props }) => {
  return (
    <div className="w-full mb-4">
      <label className="block mb-1.5 text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="relative">
        <input
          className={`w-full px-4 py-2.5 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-700'
          } ${icon ? 'pl-10' : ''} ${className}`}
          {...props}
        />
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-400 animate-fade-in">{error}</p>
      )}
    </div>
  );
};

export default Input;