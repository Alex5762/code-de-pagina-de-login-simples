/**
 * Utilitários de Segurança Frontend
 * Focam em validação de entrada e prevenção de XSS básico antes do envio.
 */

// Regex rigoroso para e-mail (RFC 5322 compliant basics)
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// Política de senha: Mínimo 8 chars, 1 maiúscula, 1 número, 1 caractere especial
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

/**
 * Remove tags HTML básicas para prevenir XSS armazenado se o backend falhar em limpar.
 */
export const sanitizeInput = (input: string): string => {
  return input.replace(/[<>]/g, "");
};

export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const validatePasswordStrength = (password: string): { isValid: boolean; message?: string } => {
  if (password.length < 8) {
    return { isValid: false, message: "A senha deve ter pelo menos 8 caracteres." };
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: "A senha deve conter pelo menos uma letra maiúscula." };
  }
  if (!/\d/.test(password)) {
    return { isValid: false, message: "A senha deve conter pelo menos um número." };
  }
  if (!/[@$!%*?&]/.test(password)) {
    return { isValid: false, message: "A senha deve conter pelo menos um caractere especial (@$!%*?&)." };
  }
  return { isValid: true };
};

/**
 * Verifica se a entrada parece segura (sem injeção de script óbvia)
 */
export const isSafeInput = (text: string): boolean => {
  const dangerousPatterns = [
    /<script>/i,
    /javascript:/i,
    /onload=/i,
    /onclick=/i
  ];
  return !dangerousPatterns.some(pattern => pattern.test(text));
};