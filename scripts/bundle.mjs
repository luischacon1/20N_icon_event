/* Uso: npm run bundle → dist/cuaderno.html, un único archivo que se abre con doble clic (sin servidor). */
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const r=f=>readFileSync(new URL('../'+f,import.meta.url),'utf8');
const uri=f=>'data:'+(f.endsWith('.pdf')?'application/pdf':'image/png')+';base64,'+readFileSync(new URL('../'+f,import.meta.url)).toString('base64');
const logos={'assets/logo-teal.png':uri('assets/logo-teal.png'),'assets/logo-light.png':uri('assets/logo-light.png'),'assets/logo-dark.png':uri('assets/logo-dark.png'),'assets/descargas/checklist-lanzamiento.pdf':uri('assets/descargas/checklist-lanzamiento.pdf'),'assets/descargas/plantilla-dosier.pdf':uri('assets/descargas/plantilla-dosier.pdf')};
const inl=s=>Object.entries(logos).reduce((a,[k,v])=>a.split(k).join(v),s);
const content=r('src/content.js').replace(/^export const /gm,'const ');
const app=r('src/app.js').replace(/^import .*\n/m,'');
const gate=r('src/gate.js').replace(/^import .*\n/m,'').replace("await import('./app.js');",'startApp();');
const js=inl(`${content}\nfunction startApp(){\n${app}\n}\n(async()=>{\n${gate}\n})();`);
const html=inl(r('index.html'))
  .replace('<link rel="stylesheet" href="src/styles.css">',()=>`<style>\n${r('src/styles.css')}</style>`)
  .replace('<script type="module" src="src/gate.js"></script>',()=>`<script>\n${js}\n</script>`);
mkdirSync(new URL('../dist/',import.meta.url),{recursive:true});
writeFileSync(new URL('../dist/cuaderno.html',import.meta.url),html);
console.log('dist/cuaderno.html',Math.round(html.length/1024)+' KB');
