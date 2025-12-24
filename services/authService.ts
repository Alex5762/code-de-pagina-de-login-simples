import { User } from '../types';

/**
 * MOCK SERVICE (Simulação)
 * 
 * Para tornar funcional com Firebase real:
 * 1. Instale firebase: npm install firebase
 * 2. Crie um arquivo firebaseConfig.ts com suas chaves.
 * 3. Substitua este arquivo pela implementação real.
 */

const MOCK_DELAY = 1500;

export const mockLoginWithEmail = async (email: string, password: string, recaptchaToken?: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    console.log(`[Firebase Mock] Tentando logar: ${email}`);
    
    setTimeout(() => {
      // Simulação de erro de senha para teste (digite 'erro' na senha)
      if (password === 'erro' || password === 'error') {
        reject(new Error('A senha é inválida ou o usuário não tem senha.'));
        return;
      }
      
      // Simulação de email não encontrado (digite um email começando com 404)
      if (email.startsWith('404')) {
        reject(new Error('Não há registro de usuário correspondente a este identificador.'));
        return;
      }

      resolve({
        id: 'uid_' + Math.random().toString(36).substr(2, 9),
        email: email,
        displayName: email.split('@')[0],
        photoURL: undefined
      });
    }, MOCK_DELAY);
  });
};

export const mockRegisterWithEmail = async (email: string, password: string, recaptchaToken?: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    console.log(`[Firebase Mock] Criando conta: ${email}`);

    setTimeout(() => {
        if (email.startsWith('existe')) {
            reject(new Error('O endereço de e-mail já está sendo usado por outra conta.'));
            return;
        }

      resolve({
        id: 'uid_' + Math.random().toString(36).substr(2, 9),
        email: email,
        displayName: email.split('@')[0],
      });
    }, MOCK_DELAY);
  });
};

export const mockResetPassword = async (email: string, recaptchaToken?: string): Promise<void> => {
  return new Promise((resolve) => {
    console.log(`[Firebase Mock] Reset de senha para: ${email}`);
    setTimeout(() => {
      resolve();
    }, MOCK_DELAY);
  });
};

export const mockLoginWithGoogle = async (): Promise<User> => {
  return new Promise((resolve) => {
    console.log(`[Firebase Mock] Abrindo popup do Google...`);
    setTimeout(() => {
      resolve({
        id: 'uid_google_' + Math.random().toString(36).substr(2, 9),
        email: 'usuario.google@exemplo.com',
        displayName: 'Usuário Google',
        photoURL: 'https://lh3.googleusercontent.com/a/ACg8ocIq8j_j_k_k_k=s96-c',
      });
    }, MOCK_DELAY);
  });
};