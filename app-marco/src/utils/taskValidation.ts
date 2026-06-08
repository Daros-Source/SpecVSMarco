import { MAX_TITLE_LENGTH } from "../config/supabaseConfig";

/**
 * Validación pura de título (stack/frontend-react-ts.md §/utils: funciones puras,
 * sin efectos, testeables en aislamiento). Lanzar es responsabilidad del caller;
 * acá solo se decide validez y se normaliza.
 */
export interface TitleValidation {
  valid: boolean;
  value: string;
  error: string | null;
}

export function validateTitle(raw: string): TitleValidation {
  const value = raw.trim();
  if (value.length === 0) {
    return { valid: false, value, error: "El título no puede estar vacío." };
  }
  if (value.length > MAX_TITLE_LENGTH) {
    return {
      valid: false,
      value,
      error: `El título no puede superar ${MAX_TITLE_LENGTH} caracteres.`,
    };
  }
  return { valid: true, value, error: null };
}
