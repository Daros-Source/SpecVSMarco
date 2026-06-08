import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Única puerta a las variables de entorno (stack/frontend-react-ts.md §/config:
 * "Variables de entorno accedidas solo desde aquí — nunca import.meta.env directo
 * en componentes"). Expone un único cliente Supabase ya configurado.
 */
const url: string | undefined = import.meta.env.VITE_SUPABASE_URL;
const anonKey: string | undefined = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // Fail loudly (safety-policy: sin fallos silenciosos).
  throw new Error(
    "Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY. Copiá .env.example a .env.local."
  );
}

export const supabase: SupabaseClient = createClient(url, anonKey);

export const TASKS_TABLE = "tasks" as const;
export const MAX_TITLE_LENGTH = 255 as const;
