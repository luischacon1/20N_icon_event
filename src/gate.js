/* Puerta de acceso. Comprueba la contraseña contra CONFIG.passwordHash y solo entonces carga el cuaderno. */
import {CONFIG} from './content.js?v=1795181168';

const KEY='icon-cuaderno-acceso';
const gate=document.getElementById('gate'),app=document.getElementById('app');

async function sha256(t){
  const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t));
  return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('');
}
const norm=t=>t.trim().toLowerCase().replace(/\s+/g,'');

async function open(){
  gate.hidden=true;app.hidden=false;
  await import('./app.js?v=1795181168');
}

let ok=false;
try{ok=localStorage.getItem(KEY)===CONFIG.passwordHash}catch(e){}
if(ok)open();
else{
  gate.hidden=false;
  document.getElementById('gatePass').focus();
  document.getElementById('gateForm').addEventListener('submit',async e=>{
    e.preventDefault();
    const err=document.getElementById('gateErr'),inp=document.getElementById('gatePass');
    let h='';
    try{h=await sha256(norm(inp.value))}catch(x){err.textContent='Abre esta página por https para poder entrar.';return}
    if(h===CONFIG.passwordHash){try{localStorage.setItem(KEY,h)}catch(x){}open()}
    else{err.textContent='Contraseña incorrecta.';inp.select()}
  });
}
