import { createClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase único de la app (invariante de arquitectura: una sola
 * instancia). Lee la configuración de variables de entorno Vite. Solo se usa la
 * anon key, pública por diseño.
 *
 * Ver: project-spec/20-architecture/00-architecture.md
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!url || !anonKey) {
  // Falla temprano y con un mensaje claro: sin configuración no hay datos.
  throw new Error(
    "Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY. Copiá .env.example a .env.local."
  );
}

export const supabase = createClient(url, anonKey);
