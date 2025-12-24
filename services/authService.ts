import { User } from '../types';

/**
 * NOTE: This is a mock service to demonstrate UI functionality.
 * In a real application, you would import 'firebase/auth' here.
 *
 * Example real implementation:
 * import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
 * import { getFunctions, httpsCallable } from "firebase/functions";
 * const auth = getAuth();
 */

const MOCK_DELAY = 1500;

export const mockLoginWithEmail = async (email: string, password: string, recaptchaToken?: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    console.log(`[AuthService] Processing login for ${email}`);
    if (recaptchaToken) {
        console.log(`[AuthService] Verifying reCAPTCHA token: ${recaptchaToken.substring(0, 10)}...`);
        // In a real app, you would send this token to your backend (e.g. Firebase Cloud Functions)
        // to verify it against the Google reCAPTCHA API.
    } else {
        console.warn('[AuthService] No reCAPTCHA token provided.');
    }

    setTimeout(() => {
      if (password === 'error') {
        reject(new Error('Credenciais inválidas.'));
      } else {
        resolve({
          id: 'uid_123',
          email: email,
          displayName: email.split('@')[0],
        });
      }
    }, MOCK_DELAY);
  });
};

export const mockRegisterWithEmail = async (email: string, password: string, recaptchaToken?: string): Promise<User> => {
  return new Promise((resolve) => {
    console.log(`[AuthService] Registering new user ${email}`);
    if (recaptchaToken) {
        console.log(`[AuthService] Verifying reCAPTCHA token: ${recaptchaToken.substring(0, 10)}...`);
    }

    setTimeout(() => {
      resolve({
        id: 'uid_new_456',
        email: email,
        displayName: 'Novo Usuário',
      });
    }, MOCK_DELAY);
  });
};

export const mockResetPassword = async (email: string, recaptchaToken?: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    console.log(`[AuthService] Requesting password reset for ${email}`);
    if (recaptchaToken) {
        console.log(`[AuthService] Verifying reCAPTCHA token: ${recaptchaToken.substring(0, 10)}...`);
    }

    setTimeout(() => {
      if (!email.includes('@')) {
        reject(new Error('Por favor, insira um endereço de e-mail válido.'));
      } else {
        // In a real app: await sendPasswordResetEmail(auth, email);
        resolve();
      }
    }, MOCK_DELAY);
  });
};

export const mockLoginWithGoogle = async (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'uid_google_789',
        email: 'user@example.com',
        displayName: 'Usuário Google',
        photoURL: 'https://picsum.photos/100/100', // Placeholder
      });
    }, MOCK_DELAY);
  });
};