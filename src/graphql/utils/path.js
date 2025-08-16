// src/utils/path.js
import path from 'path';
import { fileURLToPath } from 'url';

export function getDirname(metaUrl) {
  const __filename = fileURLToPath(metaUrl);
  return path.dirname(__filename);
}
