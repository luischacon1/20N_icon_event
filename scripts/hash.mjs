/* Uso: npm run hash -- "NuevaClave"  → pega el resultado en CONFIG.passwordHash (src/content.js) */
import {createHash} from 'node:crypto';
const p=(process.argv[2]||'').trim().toLowerCase().replace(/\s+/g,'');
if(!p){console.error('Falta la contraseña.');process.exit(1)}
console.log(createHash('sha256').update(p).digest('hex'));
