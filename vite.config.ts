import { defineConfig, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "node:fs";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    {
      name: "static-portfolio-preview",
      configureServer(server: ViteDevServer) {
        server.middlewares.use((req, res, next) => {
          const url = (req.url || "/").split("?")[0];
          const local = url === "/cv" ? "/" : url.startsWith("/cv/") ? url.slice(3) : url;
          const route = local.replace(/^\/+|\/+$/g, "");
          const pages = ["career", "services", "research", "projects", "contact", "services/contact", "support"];
          if (pages.includes(route)) {
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(fs.readFileSync(path.resolve("public", route, "index.html"), "utf8"));
            return;
          }
          if (url.startsWith("/cv")) req.url = local;
          next();
        });
      },
    },
    react(), mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
}));
