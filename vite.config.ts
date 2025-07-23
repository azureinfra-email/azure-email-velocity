import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';
import { execSync } from 'child_process';

// Plugin to generate release.json with build information
const releaseInfoPlugin = (): Plugin => {
  const generateReleaseInfo = () => {
    return {
      BUILDTIME: new Date().toISOString(),
      VERSION: process.env.GITHUB_REF_NAME || process.env.BRANCH_NAME || 'local',
      REVISION: (() => {
        try {
          return execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
        } catch {
          return 'unknown';
        }
      })()
    };
  };

  return {
    name: 'release-info',
    buildStart() {
      // Generate release.json for both development and build
      const releaseInfo = generateReleaseInfo();
      const releaseJsonContent = JSON.stringify(releaseInfo, null, 2);
      
      // Write to public folder so it's accessible during development
      const publicPath = path.resolve(__dirname, 'public', 'release.json');
      fs.writeFileSync(publicPath, releaseJsonContent);
      
      console.log(`✨ Generated release.json: ${releaseInfo.VERSION} (${releaseInfo.REVISION.substring(0, 8)})`);
    },
    generateBundle() {
      // Also emit for production build
      const releaseInfo = generateReleaseInfo();
      
      this.emitFile({
        type: 'asset',
        fileName: 'release.json',
        source: JSON.stringify(releaseInfo, null, 2)
      });
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    releaseInfoPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
