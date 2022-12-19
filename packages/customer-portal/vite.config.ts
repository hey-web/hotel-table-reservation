import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readdirSync, statSync } from 'fs';
import path from 'path';

export function isDir(file: string) {
  const stats = statSync(file)
  return stats.isDirectory()
}

const absolutePathAliases: { [key: string]: string } = {};
// Root resources folder
const srcPath = path.resolve('./src');
// Ajust the regex here to include .vue, .js, .jsx, etc.. files from the resources/ folder
const srcRootContent = readdirSync(srcPath, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map((dirent) => dirent.name.replace(/(\.ts){1}(x?)/, ''));

srcRootContent.forEach((directory) => {
  absolutePathAliases[directory] = path.join(srcPath, directory);
});

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: parseInt(process.env.CUSTOMER_PORTAL_PORT) || 8081
  },
  plugins: [react({
    babel: {
      plugins: ["styled-components"],
    }
  })],
  resolve: {
    alias: {
      ...absolutePathAliases
    }
  },
})
