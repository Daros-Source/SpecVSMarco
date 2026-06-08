import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuración mínima de Vite + React. La app habla con Supabase vía la capa
// /services; la config de entorno se centraliza en src/config (stack/frontend-react-ts.md).
export default defineConfig({
  plugins: [react()],
});
