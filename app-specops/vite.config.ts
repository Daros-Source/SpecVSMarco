import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuración mínima: plugin de React. Sin alias ni proxys porque la app
// habla directamente con Supabase (ver project-spec/20-architecture/00-architecture.md).
export default defineConfig({
  plugins: [react()],
});
