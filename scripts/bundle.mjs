/* Uso: npm run bundle → dist/cuaderno.html, un único archivo que se abre con doble clic (sin servidor). */
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const r=f=>readFileSync(new URL('../'+f,import.meta.url),'utf8');
const MIME={pdf:'application/pdf',png:'image/png',xlsx:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',js:'text/javascript'};
const uri=f=>'data:'+MIME[f.split('.').pop()]+';base64,'+readFileSync(new URL('../'+f,import.meta.url)).toString('base64');
const FILES=['assets/logo-teal.png','assets/logo-light.png','assets/logo-dark.png','assets/descargas/plantilla-dosier.pdf','assets/descargas/plan-lanzamiento-single.xlsx','assets/descargas/informe-semanal-audiencia.xlsx','assets/vendor/exceljs.min.js','assets/vendor/jspdf.umd.min.js'];
const logos=Object.fromEntries(FILES.map(f=>[f,uri(f)]));
const inl=s=>Object.entries(logos).reduce((a,[k,v])=>a.split(k).join(v),s);
const content=r('src/content.js').replace(/^export const /gm,'const ');
const app=r('src/app.js').replace(/^import .*\n/m,'');
const gate=r('src/gate.js').replace(/^import .*\n/m,'').replace(/await import\('\.\/app\.js[^']*'\);/,'startApp();');
const js=inl(`${content}\nfunction startApp(){\n${app}\n}\n(async()=>{\n${gate}\n})();`);
const html=inl(r('index.html'))
  .replace(/<link rel="stylesheet" href="src\/styles\.css[^"]*">/,()=>`<style>\n${r('src/styles.css')}</style>`)
  .replace(/<script type="module" src="src\/gate\.js[^"]*"><\/script>/,()=>`<script>\n${js}\n</script>`);
mkdirSync(new URL('../dist/',import.meta.url),{recursive:true});
writeFileSync(new URL('../dist/cuaderno.html',import.meta.url),html);
console.log('dist/cuaderno.html',Math.round(html.length/1024)+' KB');
