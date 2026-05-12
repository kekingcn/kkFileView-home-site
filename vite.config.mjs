import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const generatedRoots = ['index.html', '404.html', 'en-us', 'zh-cn'];

function collectHtmlInputs(target) {
  const targetPath = path.join(rootDir, target);
  if (!fs.existsSync(targetPath)) return [];
  const stat = fs.statSync(targetPath);
  if (stat.isFile()) return target.endsWith('.html') ? [targetPath] : [];

  return fs.readdirSync(targetPath).flatMap((name) => {
    const child = path.join(target, name);
    return collectHtmlInputs(child);
  });
}

const input = Object.fromEntries(
  generatedRoots
    .flatMap(collectHtmlInputs)
    .map((filePath) => [
      path.relative(rootDir, filePath).replace(/\.html$/, '').replace(/[\\/]/g, '_') || 'index',
      filePath,
    ])
);

export default {
  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-transform-class-properties', { loose: true }],
        ],
      },
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 8082,
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 8082,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      input,
    },
  },
};
