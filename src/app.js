import {CONFIG,MITOS,CASOS,CHARLAS,CONSEJOS,PONENTES,RESOURCES,LECTURAS_ICON,CAL_WEEKS,CAL_CTA,CAL_DAYS,AREAS,TEST,AREA_INTRO,LIK,LEVELS,MAPA,CKEYS,LUCIA_CATS,DANI_OPTS,MARTA_OPTS,METAS,STEPS} from './content.js?v=1795217746';

/* ---------- Estado ---------- */
const KEY='icon-cuaderno-v2';
let S={};
try{S=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){S={}}
['diag','mito','prueba','mapa','lucia','marta','plan','visto'].forEach(k=>{if(typeof S[k]!=='object'||!S[k]||Array.isArray(S[k]))S[k]={}});
if(!Array.isArray(S.dani))S.dani=[];
if(!Array.isArray(S.hist))S.hist=[];
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const val=k=>(S[k]||'').trim();
const D=CONFIG.draft;
const pend=t=>D?`<div class="pend">Pendiente tras el evento: ${t}</div>`:'';
const inp=(k,ph,cls='')=>`<input class="w ${cls}" id="f-${k}" data-k="${k}" placeholder="${esc(ph)}" value="${esc(S[k]||'')}" autocomplete="off">`;
const ta=(k,ph,rows=3)=>`<textarea class="w" id="f-${k}" data-k="${k}" rows="${rows}" placeholder="${esc(ph)}">${esc(S[k]||'')}</textarea>`;
const sel=(k,opts,ph)=>`<select class="w" id="f-${k}" data-k="${k}">${opts.map(o=>`<option value="${o}" ${S[k]===o?'selected':''}>${o||ph}</option>`).join('')}</select>`;
const segK=(k,opts,cls='')=>`<div class="seg ${cls}" role="group">${opts.map(o=>{const [v,l]=Array.isArray(o)?o:[o,o];return `<button data-setk="${k}" data-v="${esc(v)}" aria-pressed="${S[k]===v}">${l}</button>`}).join('')}</div>`;
const FREQ=['1','2','3','4','5','7'];const HRS=[['1','1 h'],['2','2 h'],['3','3 h'],['5','5 h'],['8','8 h'],['10','10+ h']];
const DIAS=[['Lunes','L'],['Martes','M'],['Miércoles','X'],['Jueves','J'],['Viernes','V'],['Sábado','S'],['Domingo','D']];
const exHead=(n,t,how,hoja)=>`<div class="exn">Ejercicio ${n}${hoja?'<span class="tohoja">Va a tu hoja de ruta</span>':''}</div><h3>${t}</h3>${how?`<p class="how">${how}</p>`:''}`;
const vLabel={mito:'Mito',realidad:'Realidad',depende:'Depende'};
const pf=()=>S.perfil||(S.mapa[0]===2?'profesional':'artista');
const qText=q=>q.t||(pf()==='profesional'?q.p:q.a);

/* ---------- Ponentes ---------- */
const rolDe=n=>(PONENTES[n]||{}).rol||'';
const quien=n=>`<b>${esc(n)}</b>${rolDe(n)?`<span class="rol">${esc(rolDe(n))}</span>`:''}`;
const ponentes=(titulo,ns)=>`<div class="pons"><div class="k">${titulo}</div>${ns.map(n=>`<div class="pon"><b>${esc(n)}</b><span class="rol">${esc(rolDe(n))}</span><p>${esc(PONENTES[n].bio)}</p></div>`).join('')}</div>`;

/* ---------- Acompañamiento: frases que aparecen antes de cada ejercicio ---------- */
const GUIA={
  1:['Ya tienes tu diagnóstico.','Ahora, lo más básico y lo más difícil: decir quién eres en una frase.','Ana Pavlyuk lo planteó así: ¿por qué alguien debería quedarse a escucharte?'],
  2:['Bien. Ya sabes cómo presentarte.','Ahora decide qué enseñas y qué no. Nadie tiene que hacer nada que no quiera.'],
  3:['Lo último de este paso.','Sé realista con tu tiempo: mejor dos piezas buenas a la semana que ocho flojas.'],
  4:['Ya has votado.','Ahora quédate con una sola: la frase que más te ha hecho dudar.'],
  5:['Antes de leer los casos, veamos a cuál te pareces tú.'],
  6:['Ahora ponte en su lugar.','No hay respuesta correcta: importa por qué eliges lo que eliges.'],
  7:['Ahora ponte en su lugar.','Tiene dos ofertas y poco tiempo. ¿Qué harías primero?'],
  8:['Ahora ponte en su lugar.','No todo el mundo quiere exponerse igual. ¿Y tú?'],
  9:['Ya has resuelto el caso de otra persona.','Ahora, el tuyo. Escríbelo en tercera persona: se ve más claro.'],
  10:['Hasta aquí, las ideas del evento.','Ahora llévalas a tu terreno. Empezamos por quién lo hace bien.'],
  11:['Seguimos.','¿De qué puedes hablar siempre sin quedarte sin ideas?'],
  12:['Y para cerrar este paso, lo más importante.','Si mañana solo recordaras una cosa de todo esto…'],
  13:['Empezamos tu plan.','Tres objetivos, con una forma de medir cada uno.'],
  14:['Antes de seguir, una prueba rápida.','Quien llega a tu perfil decide en segundos si se queda.'],
  15:['Ya sabes a dónde vas.','Ahora, lo primero que vas a hacer. Pequeño y con día.'],
  16:['El último ejercicio.','Escríbete a ti dentro de tres meses. Te lo vas a agradecer.']
};
const guiaHtml=(lines,cls)=>`<div class="guia ${cls||''}" aria-live="polite">${lines.filter(Boolean).map(t=>`<p>${t}</p>`).join('')}</div>`;
let guiaObs=null;
function acompana(){
  $$q('#main .card.ex .exn').forEach(el=>{const card=el.closest('.card');if(card.dataset.g)return;card.dataset.g=1;
    const m=el.textContent.match(/Ejercicio (\d+)/);if(m&&GUIA[m[1]])card.insertAdjacentHTML('beforebegin',guiaHtml(GUIA[m[1]]))});
  const still=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!('IntersectionObserver' in window)||still){$$q('#main .guia p').forEach(p=>p.classList.add('on'));return}
  if(!guiaObs)guiaObs=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;guiaObs.unobserve(e.target);
    [...e.target.children].forEach((p,i)=>setTimeout(()=>p.classList.add('on'),250+i*900))}),{threshold:.6});
  $$q('#main .guia:not([data-o])').forEach(g=>{g.dataset.o=1;guiaObs.observe(g)});
}
const $$q=s=>[...document.querySelectorAll(s)];

/* ---------- Tiempo ---------- */
const MIN={diagnostico:10,mitos:10,casos:15,charlas:10,plan:10,hoja:5};
const TOTAL_MIN=Object.values(MIN).reduce((x,y)=>x+y,0);
function minQuedan(){return Object.entries(MIN).reduce((t,[id,m])=>t+(isDone(id)?0:m),0)}
function rStamp(){const q=minQuedan();
  $('#stamp').innerHTML=`<span class="timechip" title="Tiempo que te queda para completar el cuaderno"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><circle cx="12" cy="13" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 9v4l2.5 2M9 2h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>${q===0?'Completado':q===TOTAL_MIN?`${q} min`:`Te quedan ${q} min`}</span><button class="retochip" data-go="inicio" data-reto="1"><b>Reto 1:1</b> · ${retoQueda()}</button>`}

/* ---------- Reto ---------- */
const RETO=CONFIG.reto;
function retoDias(){const ms=new Date(RETO.fin)-new Date();return ms<=0?0:Math.ceil(ms/864e5)}
function retoQueda(){const d=retoDias();return d===0?'Reto cerrado':d===1?'Último día':`Quedan ${d} días`}

/* Enlaces a ICON con UTM para medir qué paso del cuaderno trae cada visita */
function iconUrl(url,paso){try{const u=new URL(url);Object.entries(CONFIG.utm||{}).forEach(([k,v])=>u.searchParams.set(k,v));u.searchParams.set('utm_content',paso);return u.toString()}catch(e){return url}}
const AREA_ICON={
  identidad:'definir tu propuesta y tu posicionamiento',
  contenido:'planificar contenido y lanzamientos',
  datos:'leer los datos de streaming y redes para decidir',
  comunidad:'convertir audiencia en comunidad',
  conversion:'llevar a tu audiencia a escuchar, comprar y venir a verte'
};

/* ---------- Cabecera ---------- */
(function(){
  const L=CONFIG.logos;
  $('#logo').innerHTML=(L.teal&&!L.teal.startsWith('__'))?`<img class="lg-a" src="${L.teal}" alt="ICON Music Business School"><img class="lg-b" src="${L.light}" alt="">`:'<b>ICON</b>';
  
  $('#foot').textContent=CONFIG.footer;
})();

/* ---------- Diagnóstico ---------- */
const AKEYS=Object.keys(TEST);
const QTOTAL=AKEYS.reduce((a,k)=>a+TEST[k].length,0);
function diagScores(){
  const sc={},pc={};let n=0,pts=0;
  AKEYS.forEach(a=>{sc[a]=0;TEST[a].forEach((q,i)=>{const v=S.diag[a+i];if(v!==undefined){sc[a]+=v;n++;pts+=v}});pc[a]=Math.round(sc[a]/(TEST[a].length*2)*100)});
  const total=Math.round(pts/(QTOTAL*2)*100);
  const weak=[...AKEYS].sort((a,b)=>pc[a]-pc[b])[0];
  const lv=[...LEVELS].reverse().find(l=>total>=l[0]);
  return {sc,pc,n,total,weak,lv,done:n===QTOTAL};
}
function rDiag(){
  return `<div class="kick">Paso 1 · 10 minutos</div><h1 class="ph">¿Dónde estás?</h1>
  <p class="lead">Cinco áreas y unas pocas preguntas sobre cómo llevas hoy tu ${pf()==='profesional'?'marca profesional':'marca y tus redes'}. Contesta con lo que haces, no con lo que te gustaría hacer. Nadie más lo ve.</p>
  ${AKEYS.map((a,ai)=>`<div class="card acard" id="ac-${a}"><div class="ahead"><div><div class="exn">Área ${ai+1} de ${AKEYS.length}</div><h3>${AREAS[a].l}</h3><p class="how" style="margin:2px 0 0">${AREA_INTRO[a]}</p></div><span class="aprog num" id="ap-${a}"></span></div>
    ${TEST[a].map((q,i)=>`<div class="q"><p>${qText(q)}</p><div class="seg" role="group">${LIK.map(([l,v])=>`<button data-diag="${a+i}" data-v="${v}" aria-pressed="${S.diag[a+i]===v}">${l}</button>`).join('')}</div></div>`).join('')}</div>`).join('')}
  <div id="diagRes"></div>
  <div class="block gap"><h2>Tu punto de partida</h2><div class="card ex">${exHead(1,'Tu frase','Quién eres, qué haces y para quién. Si no cabe en una bio, todavía no está clara. La usarás en el resto del cuaderno.',true)}
    <div class="gap"><div><label class="l" for="f-nombre">Soy</label>${inp('nombre','Tu nombre o el de tu proyecto')}</div>
    <div><label class="l" for="f-bioQue">y hago</label>${inp('bioQue',pf()==='profesional'?'Ej.: management y giras':'Ej.: pop electrónico en castellano')}</div>
    <div><label class="l" for="f-bioPara">para</label>${inp('bioPara',pf()==='profesional'?'Ej.: artistas que empiezan a girar':'Ej.: quien escucha a Rigoberta Bandini')}</div></div>
    <div class="callout" id="bioPrev"></div></div>
  <div class="card ex">${exHead(2,'Lo que sí y lo que no','Decide hoy qué parte de ti es pública. Así no lo decides cada vez que vas a publicar.',true)}
    <div class="two"><div><label class="l">Tres cosas que sí comparto</label>${inp('si1','1')}${inp('si2','2')}${inp('si3','3')}</div>
    <div><label class="l">Tres cosas que no comparto</label>${inp('no1','1')}${inp('no2','2')}${inp('no3','3')}</div></div></div>
  <div class="card ex">${exHead(3,'Tu ritmo real','Sin pensar en lo ideal: ¿cuánto puedes publicar y cuánto tiempo tienes de verdad cada semana?',true)}
    <label class="l">Publicaciones a la semana</label>${segK('pilFreq',FREQ,'nums')}
    <label class="l" style="margin-top:14px">Horas que tienes a la semana para esto</label>${segK('pilHoras',HRS,'nums')}
    <div id="pilRes"></div></div></div>`;
}
function updAreaProg(){
  AKEYS.forEach(a=>{const el=$('#ap-'+a);if(!el)return;const n=TEST[a].filter((q,i)=>S.diag[a+i]!==undefined).length;el.textContent=`${n}/${TEST[a].length}`;el.classList.toggle('full',n===TEST[a].length)});
}
function recordHist(){
  const r=diagScores();if(!r.done)return;
  const today=new Date().toISOString().slice(0,10);
  const last=S.hist[S.hist.length-1];
  const e={d:today,t:r.total,pc:r.pc};
  if(last&&last.d===today)S.hist[S.hist.length-1]=e;else S.hist.push(e);
  save();
}
const fmtD=iso=>new Date(iso+'T12:00:00').toLocaleDateString('es-ES',{day:'numeric',month:'long'});
function rDiagRes(){
  updAreaProg();
  const r=diagScores(),el=$('#diagRes');if(!el)return;
  if(!r.done){el.innerHTML=`<p class="count" style="margin-top:14px">Llevas ${r.n} de ${QTOTAL} preguntas.</p>`;return}
  const today=new Date().toISOString().slice(0,10);
  const prev=[...S.hist].reverse().find(h=>h.d!==today);
  el.innerHTML=`<div class="block"><div class="card ex">
    <div class="exn">Tu resultado</div><div class="big">${r.lv[1]}</div><p class="num" style="color:var(--muted);margin-top:4px">${r.total} sobre 100</p>
    <p>${r.lv[2]}</p>
    <div class="bars">${AKEYS.map(a=>`<div class="bar ${a===r.weak?'low':''}"><b>${AREAS[a].l}</b><div class="tr"><div class="fi" style="width:${r.pc[a]}%"></div></div><span class="num">${r.pc[a]}%</span></div>`).join('')}</div>
    ${prev?`<div class="callout"><p><b>El ${fmtD(prev.d)} sacaste ${prev.t}.</b> ${r.total>prev.t?`Has subido ${r.total-prev.t} puntos.`:r.total<prev.t?'Has bajado un poco: mira qué área ha cambiado.':'Estás igual que entonces.'}</p></div>`:''}
    <div class="callout"><p><b>Tu área para el próximo mes: ${AREAS[r.weak].l}.</b> Es la que menos puntúa. Tu plan de cuatro semanas se centrará en ella.</p></div>
    <aside class="soft" style="margin-top:14px"><div><b>${AREAS[r.weak].l} se entrena</b><span>Este cuaderno es la punta del iceberg. En el ${esc(CONFIG.courseName)} aprendes a ${AREA_ICON[r.weak]} con profesionales en activo.</span></div><a href="${esc(iconUrl(CONFIG.ctaUrl,'diagnostico-'+r.weak))}" target="_blank" rel="noopener">Ver el curso →</a></aside>
    <div style="margin-top:16px"><label class="l" for="f-diagSorpresa">¿Qué te ha sorprendido de tu resultado?</label>${ta('diagSorpresa','Escríbelo aquí',2)}</div>
    <div class="row" style="margin-top:12px"><button class="btn alt" id="redo">Volver a hacer el diagnóstico</button></div>
  </div></div>`;
}

/* ---------- Mitos ---------- */
function mitoItems(){return MITOS.map(g=>({g:g.g,items:g.items.filter(m=>!CONFIG.soloDebatidas||m.dijeron.length)})).filter(g=>g.items.length)}
function rMitos(){
  const all=mitoItems().flatMap(g=>g.items);
  return `<div class="kick">Paso 2 · 10 minutos</div><h1 class="ph">Mito o realidad</h1>
  <p class="lead">Las frases que se debatieron en el evento. Decide tú primero: al elegir verás qué dijo cada ponente y una prueba para hacer en tu cuenta.</p>
  ${ponentes('Quién las debatió',['Ana Pavlyuk','César Manzanera','Álvaro Rebollo'])}
  <p class="count" id="mitoCount"></p>
  ${all.map((m,i)=>`<div class="card myth" id="c-${m.id}"><div class="num">${i+1} de ${all.length}</div><button class="t tbtn" data-open="${m.id}" aria-expanded="${!!S.mito[m.id]}">${m.t}</button>
    <div class="seg" role="group" aria-label="Tu opinión">${['mito','realidad','depende'].map(v=>`<button data-mito="${m.id}" data-v="${v}" aria-pressed="${S.mito[m.id]===v}">${vLabel[v]}</button>`).join('')}</div>
    <div class="reveal" id="r-${m.id}" ${S.mito[m.id]?'':'hidden'}>${rMitoReveal(m)}</div></div>`).join('')}
  <div class="block"><div class="card ex">${exHead(4,'¿Cuál te ha hecho cambiar de idea?','Elige la frase que más te ha hecho dudar y escribe por qué.')}
    ${ta('mitoCambio','La frase que más me ha hecho pensar es… porque…',3)}</div></div>`;
}
function rMitoReveal(m){
  const said=m.dijeron.length?`<div class="said">${m.dijeron.map(d=>`<div class="q2"><p>${esc(d.f)}</p><div class="who">${quien(d.q)}<span class="tag">${vLabel[d.v]||''}</span></div></div>`).join('')}</div>`:pend('lo que dijo cada ponente sobre esta frase.');
  return `<div><h4>Por qué se dice tanto</h4><p>${m.w}</p></div>
    ${(m.dijeron.length||D)?`<div><h4>Lo que dijeron los ponentes</h4>${said}</div>`:''}
    <div><h4>Ponlo a prueba en tu cuenta</h4><p>${m.x}</p></div>
    <label class="try"><input type="checkbox" data-prueba="${m.id}" ${S.prueba[m.id]?'checked':''}> Lo pruebo este mes (irá a mi hoja de ruta)</label>`;
}
function updMitoCount(){
  const el=$('#mitoCount');if(!el)return;
  const all=mitoItems().flatMap(g=>g.items);const n=all.filter(m=>S.mito[m.id]).length;const p=all.filter(m=>S.prueba[m.id]).length;
  el.textContent=`Has opinado sobre ${n} de ${all.length} frases · ${p} apuntadas para probar`;
}

/* ---------- Casos ---------- */
function mapaResult(){
  const cnt=[0,0,0];let n=0;MAPA.forEach((q,i)=>{if(S.mapa[i]!==undefined){cnt[S.mapa[i]]++;n++}});
  if(n<MAPA.length)return null;
  return CKEYS[cnt.indexOf(Math.max(...cnt))];
}
function bioText(){return [val('nombre'),val('bioQue')&&('· '+val('bioQue')),val('bioPara')&&('para '+val('bioPara'))].filter(Boolean).join(' ')}
function rCasos(){
  if(!S.casoTab)S.casoTab='lucia';
  return `<div class="kick">Paso 3 · 15 minutos</div><h1 class="ph">Los tres casos</h1>
  <p class="lead">Tres casos que María Muñoz, Ro Sánchez y Jorge Platero resolvieron en directo. Mira a cuál te pareces, ponte en su lugar y escribe tu propio caso.</p>
  <img class="cimg solo" src="${CONFIG.fotos.mesa}" alt="La mesa de debate del evento" loading="lazy">
  ${ponentes('Quién los resolvió',['María Muñoz','Ro Sánchez','Jorge Platero'])}
  <div class="card ex">${exHead(5,'¿A quién te pareces?','Cuatro preguntas para ver qué caso se acerca más a tu punto de partida.')}
    ${MAPA.map((q,i)=>`<div class="q"><p><b>${q.q}</b></p><div class="mx">${q.o.map((o,j)=>`<button class="opt ${S.mapa[i]===j?'on':''}" data-mapa="${i}" data-v="${j}"><span class="o">${'ABC'[j]}</span><span>${o}</span></button>`).join('')}</div></div>`).join('')}
    <div id="mapaRes"></div></div>
  <div class="block"><h2>Ponte en su lugar</h2><p class="sub">Elige un caso, lee lo que propusieron y haz el ejercicio. Si te da tiempo, haz los tres.</p>
    <div class="ctabs" role="tablist">${CKEYS.map(k=>`<button class="ctab" role="tab" data-ctab="${k}" aria-selected="${S.casoTab===k}">${CASOS[k].n}</button>`).join('')}</div>
    <div id="casoPanel">${rCaso(S.casoTab)}</div></div>
  <div class="block"><div class="card ex">${exHead(9,'Ahora, tu caso','Escríbelo como si fuera un caso más. Ponerlo en tercera persona ayuda a verlo con distancia.',true)}
    ${bioText()?`<div class="have"><div class="k">Lo que ya sabemos</div><p>${esc(bioText())}${diagScores().done?` · Nivel: ${diagScores().lv[1]}`:''}</p></div>`:''}
    <div class="gap">
      <div><label class="l" for="f-tcDatos">Dónde está hoy (datos reales)</label>${ta('tcDatos',pf()==='profesional'?'Años de experiencia, con quién ha trabajado, cómo le llegan los proyectos…':'Seguidores, escuchas, lanzamientos, con quién trabaja…',2)}</div>
      <div><label class="l" for="f-tcDinero">Dinero disponible</label>${inp('tcDinero','Ej.: 300 €')}</div>
      <div><label class="l">Horas a la semana</label>${segK('pilHoras',HRS,'nums')}</div>
      <div><label class="l" for="f-tcReto">Su reto</label>${ta('tcReto','¿Qué tiene que conseguir y en cuánto tiempo?',2)}</div>
      <div><label class="l" for="f-tcConsejo">Si un profesional le diera un consejo, ¿cuál sería?</label>${ta('tcConsejo','Escríbelo como se lo dirías tú',2)}</div>
    </div></div></div>`;
}
function rMapaRes(){
  const el=$('#mapaRes');if(!el)return;const k=mapaResult();
  if(!k){el.innerHTML='';return}
  const c=CASOS[k];
  const rec=[val('tcDinero'),S.pilHoras?S.pilHoras+' h a la semana':''].filter(Boolean).join(' · ')||'Lo escribes en el ejercicio 9';
  const you={punto:['Empiezas de cero','Tienes algo de público','Experiencia sin visibilidad'][S.mapa[0]],aud:MAPA[1].o[S.mapa[1]],freno:MAPA[2].o[S.mapa[2]],rec};
  const rows=[['Punto de partida','punto'],['Audiencia','aud'],['Freno principal','freno'],['Con qué cuenta','rec']];
  el.innerHTML=`<div class="callout"><p><b>Tu punto de partida se parece al de ${c.n}.</b> Empieza por su caso, pero mira también los otros dos: a veces lo que más sirve está en el caso que menos se parece al tuyo.</p></div>
  <div class="cmp"><table><thead><tr><th></th><th>${esc(val('nombre')||'Tú')}</th>${CKEYS.map(x=>`<th class="${x===k?'match':''}">${CASOS[x].n}${x===k?' · tu caso':''}</th>`).join('')}</tr></thead><tbody>
  ${rows.map(([l,f])=>`<tr><th scope="row">${l}</th><td class="you">${esc(you[f])}</td>${CKEYS.map(x=>`<td class="${x===k?'match':''}">${CASOS[x].tabla[f]}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function rCaso(k){
  const c=CASOS[k];
  const props=c.propuestas.length?`<div class="said">${c.propuestas.map(p=>`<div class="q2"><p>${esc(p.f)}</p><div class="who">${quien(p.q)}</div></div>`).join('')}</div>`:pend(`la propuesta de cada ponente para ${c.n}.`);
  let exer='';
  if(k==='lucia'){
    exer=`<div class="card ex" id="luciaCard">${exHead(6,'Reparte tú los 1.000 €','No hay reparto correcto. Muévelos como lo harías tú y responde a las preguntas que te haría un profesional.')}
      <div class="left" id="lLeftBox">Te quedan <span id="lLeft" class="num">1.000 €</span></div>
      <div class="lockmsg" id="lLock" hidden><b>Has repartido los 1.000 €.</b> Ya no puedes subir ninguna partida: para dar más a una, baja otra primero. La parte gris de cada barra es la que ya no está disponible.</div>
      ${LUCIA_CATS.map(x=>`<div class="sl"><label for="ls-${x.id}">${x.l}</label><output id="lo-${x.id}" class="num">${S.lucia[x.id]||0} €</output><input type="range" id="ls-${x.id}" data-lucia="${x.id}" min="0" max="1000" step="50" value="${S.lucia[x.id]||0}"><small>${x.d}</small></div>`).join('')}
      <div class="callout"><h4 class="mini">Preguntas que te haría un profesional</h4><ul class="asks" id="lAsks"></ul></div>
      <div style="margin-top:14px"><label class="l" for="f-luciaPorque">¿Por qué lo has repartido así?</label>${ta('luciaPorque','Escribe tu razonamiento',2)}</div></div>`;
  }
  if(k==='dani'){
    exer=`<div class="card ex">${exHead(7,'Elige sus tres prioridades','Toca tres decisiones en el orden en el que las harías. Al elegir verás qué hay en juego en cada una.')}
      <div id="daniOpts">${rDaniOpts()}</div>
      <div style="margin-top:10px"><label class="l" for="f-daniDescarte">¿Qué decisión has dejado fuera que otra persona pondría la primera? ¿Por qué?</label>${ta('daniDescarte','Escribe tu razonamiento',2)}</div></div>`;
  }
  if(k==='marta'){
    exer=`<div class="card ex">${exHead(8,'¿Hasta dónde te expondrías tú?','Marta no quiere ser influencer. ¿Y tú? Marca qué harías en su lugar.')}
      <div class="mx">${MARTA_OPTS.map((o,i)=>`<div class="it"><p>${o}</p><div class="seg">${[['si','Lo haría'],['quiza','Quizá'],['no','Nunca']].map(([v,l])=>`<button data-marta="${i}" data-v="${v}" aria-pressed="${S.marta[i]===v}">${l}</button>`).join('')}</div></div>`).join('')}</div>
      <div id="martaRes"></div>
      <div style="margin-top:14px"><label class="l" for="f-martaLimite">¿Dónde está tu límite y qué te estás perdiendo por él?</label>${ta('martaLimite','Escribe tu respuesta',2)}</div></div>`;
  }
  return `<div class="card persona"><h3>${c.n}</h3><div class="m">${c.m}</div><p>${c.d}</p><p class="reto">${c.reto}</p></div>
  ${(c.propuestas.length||D)?`<div class="card"><h4 class="mini">Lo que propusieron los ponentes</h4>${props}
    <div style="margin-top:14px"><label class="l" for="f-conv_${k}">¿Qué propuesta te ha convencido más y por qué?</label>${ta('conv_'+k,'La de… porque…',2)}</div></div>`:''}
  ${exer}`;
}
function rDaniOpts(){
  return DANI_OPTS.map((o,i)=>{const p=S.dani.indexOf(i);return `<button class="opt ${p>=0?'on':''}" data-dani="${i}"><span class="o">${p>=0?p+1:''}</span><span>${o.t}${p>=0?`<span class="nt">${o.n}</span>`:''}</span></button>`}).join('')
    +`<p class="count">${S.dani.length<3?`Elige ${3-S.dani.length} más.`:'Tienes tus tres. Toca una para quitarla.'}</p>`;
}
const luciaSum=()=>LUCIA_CATS.reduce((a,x)=>a+(+S.lucia[x.id]||0),0);
function updLucia(){
  const sum=luciaSum();
  const L=$('#lLeft');if(!L)return;
  const full=sum>=1000;
  L.textContent=(1000-sum).toLocaleString('es-ES')+' €';
  $('#lLeftBox').hidden=full;$('#lLock').hidden=!full;$('#luciaCard').classList.toggle('full',full);
  LUCIA_CATS.forEach(x=>{const o=$('#lo-'+x.id);if(o)o.textContent=(S.lucia[x.id]||0)+' €';
    const r=$('#ls-'+x.id);if(r){const cap=(+S.lucia[x.id]||0)+(1000-sum);r.style.setProperty('--cap',(cap/10)+'%');r.style.setProperty('--val',((+S.lucia[x.id]||0)/10)+'%')}});
  const v=id=>+S.lucia[id]||0,q=[];
  if(sum===0){q.push('Empieza moviendo el dinero a donde creas que más rinde.')}
  else{
    if(v('contenido')<150)q.push('¿Con qué piezas vas a probar qué funciona si apenas hay dinero para contenido?');
    if(v('anuncios')>=500)q.push('Con 600 seguidores, ¿a dónde llevarán los anuncios a la gente? ¿Qué verán al llegar?');
    if(v('anuncios')===0)q.push('Si un vídeo funciona solo, ¿cómo lo amplificarías sin nada para anuncios?');
    if(v('directos')===0)q.push('¿Cómo vas a llegar a gente que no te conoce sin directos ni colaboraciones?');
    if(v('reserva')===0)q.push('¿Qué harás si algo despega en el segundo mes y ya te has gastado todo?');
    if(v('playlists')>=300)q.push('¿Cómo vas a comprobar que esa promoción en listas trae oyentes reales?');
    if(v('imagen')>=300)q.push('¿Necesitas tanto en imagen para la tercera canción o podrías reutilizar parte?');
    if(sum<1000)q.push(`Te quedan ${1000-sum} € sin asignar. ¿Es a propósito?`);
    if(!q.length)q.push('Reparto equilibrado. ¿Qué harías distinto si en vez de 1.000 € fueran 300 €?');
  }
  $('#lAsks').innerHTML=q.map(t=>`<li>${t}</li>`).join('');
}
function updMarta(){
  const el=$('#martaRes');if(!el)return;
  const g=v=>MARTA_OPTS.filter((o,i)=>S.marta[i]===v);
  if(Object.keys(S.marta).length<MARTA_OPTS.length){el.innerHTML='';return}
  el.innerHTML=`<div class="callout"><p><b>Tu zona cómoda:</b> ${g('si').join(' · ')||'ninguna de estas'}.</p><p><b>Tu línea roja:</b> ${g('no').join(' · ')||'ninguna'}.</p>${g('quiza').length?`<p><b>Para pensarlo:</b> ${g('quiza').join(' · ')}.</p>`:''}</div>`;
}

/* ---------- Charlas ---------- */
function rCharlas(){
  const list=CHARLAS.length?CHARLAS:(D?[1,2,3].map(n=>({q:'Charla '+n,t:'Título de la charla',ideas:[],p:''})):[]);
  return `<div class="kick">Paso 4 · 10 minutos</div><h1 class="ph">Ideas clave</h1>
  <p class="lead">Las tres charlas del evento, resumidas, con una pregunta para llevar cada una a tu caso.</p>
  ${list.map((c,i)=>`<div class="card ex">${c.img?`<img class="cimg" src="${c.img}" alt="${esc(c.q)} durante su charla" loading="lazy">`:''}<div class="exn">${esc(c.q)}</div><h3>${esc(c.t)}</h3>${PONENTES[c.q.split(' · ')[0]]?`<p class="how" style="margin:2px 0 10px">${esc(PONENTES[c.q.split(' · ')[0]].bio)}</p>`:''}
    ${c.ideas.length?`<ul>${c.ideas.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:pend('tres ideas clave de la charla y una pregunta para el alumno.')}
    ${c.p?`<div style="margin-top:12px"><label class="l" for="f-charla${i}">${esc(c.p)}</label>${ta('charla'+i,'Tu respuesta',2)}</div>`:''}</div>`).join('')}
  <div class="block"><h2>Un consejo de cada ponente</h2><div class="said">${CONSEJOS.map(x=>`<div class="q2"><p>${esc(x.f)}</p><div class="who">${quien(x.q)}</div></div>`).join('')}</div></div>
  <div class="block gap">
  <div class="card ex">${exHead(10,'Tus referentes','Tres perfiles que lo hacen bien. No para copiarlos enteros: para tomar una sola cosa de cada uno.',true)}
    ${[1,2,3].map(i=>`<div class="two" style="margin-bottom:6px"><div>${inp('ref'+i,'Referente '+i)}</div><div>${inp('refQ'+i,'Le tomaría…')}</div></div>`).join('')}</div>
  <div class="card ex">${exHead(11,'Tus tres temas','¿De qué podrías hablar siempre, sin quedarte sin ideas? Si se te ocurren cuatro ideas de cada tema, sirven.',true)}
    <div class="gap">${inp('pil1',pf()==='profesional'?'Tema 1 · ej.: cómo se prepara una gira':'Tema 1 · ej.: cómo hago mis canciones')}${inp('pil2','Tema 2')}${inp('pil3','Tema 3')}</div></div>
  <div class="card ex">${exHead(12,'Lo que te llevas','Una sola frase. Si mañana solo pudieras recordar una cosa de todo esto, ¿cuál sería?',true)}
    ${inp('meLlevo','Lo que me llevo es…')}</div></div>`;
}

/* ---------- Tu plan ---------- */
function haveBox(){
  const r=diagScores(),mc=mapaResult();
  const pr=mitoItems().flatMap(g=>g.items).filter(m=>S.prueba[m.id]);
  const rows=[
    ['Tu frase',bioText(),'diagnostico'],
    ['Tu nivel',r.done?`${r.lv[1]} · área a trabajar: ${AREAS[r.weak].l}`:'','diagnostico'],
    ['Lo que compartes',[val('si1'),val('si2'),val('si3')].filter(Boolean).join(', '),'diagnostico'],
    ['Tu ritmo',[S.pilFreq?S.pilFreq+' publicaciones a la semana':'',S.pilHoras?S.pilHoras+' h':''].filter(Boolean).join(' · '),'diagnostico'],
    ['Tus temas',[val('pil1'),val('pil2'),val('pil3')].filter(Boolean).join(' · '),'charlas'],
    ['Pruebas apuntadas',pr.length?pr.length+(pr.length===1?' experimento':' experimentos'):'','mitos'],
    ['Te pareces a',mc?CASOS[mc].n:'','casos'],
    ['Lo que te llevas',val('meLlevo'),'charlas']
  ];
  return `<div class="have"><div class="k">Lo que ya tienes de los pasos anteriores</div>
    <dl>${rows.map(([k,v,go])=>`<div><dt>${k}</dt><dd>${v?esc(v):`<button class="linkbtn" data-go="${go}">Completar</button>`}</dd></div>`).join('')}</dl></div>`;
}
function pasoSug(){
  const r=diagScores();const area=r.done?r.weak:'identidad';
  const pr=mitoItems().flatMap(g=>g.items).filter(m=>S.prueba[m.id]).map(m=>m.x);
  return [AREAS[area].plan[pf()][0],...pr.slice(0,2),bioText()?'Poner mi frase en la bio':null].filter(Boolean).slice(0,4);
}
function rPlan(){
  const p=pf(),r=diagScores();
  const sug=[...new Set([r.done?METAS[p][r.weak]:null,...AKEYS.map(a=>METAS[p][a]),...METAS[p].extra].filter(Boolean))].slice(0,5);
  return `<div class="kick">Paso 5 · 10 minutos</div><h1 class="ph">Tu plan</h1>
  <p class="lead">Ya tienes casi todo. Solo falta decidir qué quieres conseguir y por dónde empiezas.</p>
  ${haveBox()}
  <div class="dls" style="margin-top:14px">${dlCard('plan')}</div>
  <div class="gap" style="margin-top:14px">
  <div class="card ex">${exHead(13,'Tus tres objetivos a 90 días','Cada uno con una cifra y una forma de medirlo. Si no se puede medir, todavía es un deseo.',true)}
    ${r.done?`<p class="how">Te proponemos empezar por tu área más baja, <b>${AREAS[r.weak].l}</b>. Toca una sugerencia para usarla o escribe la tuya.</p>`:''}
    <div class="chips" style="margin-bottom:12px">${sug.map(m=>`<button class="chip" data-meta="${esc(m)}">+ ${m}</button>`).join('')}</div>
    ${[1,2,3].map(i=>`<div style="margin-bottom:14px"><label class="l" for="f-obj${i}">Objetivo ${i}</label>${inp('obj'+i,'Qué quieres conseguir, con cifra')}${inp('objM'+i,'Cómo lo vas a medir')}</div>`).join('')}</div>

  <div class="card ex">${exHead(14,'La prueba de los 10 segundos','Enseña tu perfil durante diez segundos a tres personas que no te conozcan bien. Apunta qué creen que haces.')}
    ${bioText()?`<div class="have" style="margin-bottom:10px"><div class="k">Tu frase</div><p>${esc(bioText())}</p></div>`:''}
    ${[1,2,3].map(i=>inp('diez'+i,'Persona '+i+' dijo…')).join('')}
    <p class="how" style="margin-top:10px">Si lo que dicen no se parece a tu frase, ya sabes qué cambiar primero.</p></div>

  <div class="card ex">${exHead(15,'Tus tres siguientes pasos','Lo que vas a hacer esta semana. Pequeño, concreto y con día. Puedes partir de lo que ya has apuntado.',true)}
    <div class="chips left">${pasoSug().map(t=>`<button class="chip" data-paso="${esc(t)}">+ ${esc(t.length>70?t.slice(0,68)+'…':t)}</button>`).join('')}</div>
    ${[1,2,3].map(i=>`<div style="margin-bottom:14px">${inp('paso'+i,'Paso '+i)}<div style="margin-top:8px">${segK('pasoD'+i,DIAS,'days')}</div></div>`).join('')}</div>

  <div class="card ex">${exHead(16,'Una nota para dentro de tres meses','Imagina que han pasado 90 días y todo sigue igual.',true)}
    <div class="gap"><div><label class="l" for="f-futuro">¿Qué habrá pasado para que no cambie nada?</label>${ta('futuro','Sé sincero contigo',2)}</div>
    <div><label class="l" for="f-teDirias">¿Qué te dirías hoy para que no ocurra?</label>${ta('teDirias','Escríbete a ti',2)}</div></div></div>
  </div>`;
}
function updBio(){
  const el=$('#bioPrev');if(!el)return;const t=bioText();
  el.innerHTML=t?`<p style="color:var(--ink);font-weight:500">${esc(t)}</p><p class="count num" style="margin:0">${t.length} de 150 caracteres (lo que cabe en una bio de Instagram)${t.length>150?' · recórtala':''}</p>`:'<p class="count" style="margin:0">Aquí verás tu frase completa.</p>';
}
function updPil(){
  const el=$('#pilRes');if(!el)return;const f=+S.pilFreq||0,h=+S.pilHoras||0;
  if(!f||!h){el.innerHTML='';return}
  const per=h/f;
  el.innerHTML=`<div class="callout"><p>Son <b class="num">${f*4} publicaciones al mes</b> con unos ${per>=1?Math.round(per*10)/10+' horas':Math.round(per*60)+' minutos'} para cada una.</p><p>${per<0.75?'Es muy poco tiempo por pieza. ¿Qué quitarías para que el ritmo se pueda mantener tres meses?':per>3?'Tienes margen. ¿Usarías parte del tiempo en responder a tu comunidad o en mirar tus datos?':'Es un ritmo razonable si grabas por bloques.'}</p></div>`;
}

/* ---------- Hoja de ruta ---------- */
function list(arr){const a=arr.filter(Boolean);return a.length?`<ul>${a.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:'<p class="empty">Sin completar</p>'}
function kv(k,v,go){return `<div class="kv"><div class="k">${k}</div><div class="v">${v?esc(v):`<span class="empty">Sin completar</span>${go?` <button class="linkbtn" data-go="${go}">Ir al paso</button>`:''}`}</div></div>`}
function planWeeks(){
  const r=diagScores();const area=r.done?r.weak:'identidad';
  const pruebas=mitoItems().flatMap(g=>g.items).filter(m=>S.prueba[m.id]);
  const pasos=[1,2,3].map(i=>val('paso'+i)&&(val('paso'+i)+(S['pasoD'+i]?` (${S['pasoD'+i]})`:''))).filter(Boolean);
  return [0,1,2,3].map(w=>{
    const it=[];if(w===0)it.push(...pasos);
    it.push(AREAS[area].plan[pf()][w]);
    if(pruebas[w])it.push('Experimento: '+pruebas[w].x);
    return it;
  });
}
function calLink(){
  const d=new Date();d.setDate(d.getDate()+30);const e=new Date(d);e.setDate(e.getDate()+1);
  const f=x=>x.toISOString().slice(0,10).replace(/-/g,'');
  const det='Abre el Cuaderno ICON desde el mismo móvil u ordenador y repite el paso 1 (Dónde estás) para comparar tu resultado con el de hoy.';
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Repetir el diagnóstico del Cuaderno ICON')}&dates=${f(d)}/${f(e)}&details=${encodeURIComponent(det)}`;
}
function rHoja(){
  const D=hojaDoc(),r=D.r;const weeks=D.weeks;const mc=D.mc;
  const back=new Date();back.setDate(back.getDate()+30);
  return `<div class="kick">Paso 6 · 5 minutos</div><h1 class="ph">Tu hoja de ruta</h1>
  ${guiaHtml([val('nombre')?`<b>${esc(val('nombre'))}</b>, esta es tu hoja de ruta.`:'Esta es tu hoja de ruta.','La hemos montado con todo lo que nos has contado, y es solo tuya.',r.done?`Partes de un nivel <b>${r.lv[1]}</b> y tu prioridad es <b>${AREAS[r.weak].l}</b>.`:null,'Recoge lo que deberías llevarte en tu caso y lo que te toca aplicar este mes.','Descárgala, léela entera y pon la primera tarea en tu agenda.'],'gbig')}
  ${r.done?'':'<p class="warn">Te falta el diagnóstico del paso 1. Sin él, tu hoja de ruta sale incompleta. <button class="linkbtn" data-go="diagnostico">Hacerlo ahora</button></p>'}
  <div class="row" style="margin:14px 0 18px"><button class="btn xl" id="dlHoja">Descargar mi hoja de ruta en PDF</button><button class="btn alt" id="copyAll">Copiar como texto</button></div>
  <div id="copyHost"></div>
  <div class="hgrid">
  <div class="sheet" id="sheet">
    <div class="k" style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);font-weight:700">${esc(val('nombre')||'Mi hoja de ruta')} · ${esc(CONFIG.eventName)} · ${esc(CONFIG.eventDate)}</div>
    <h2>Quién soy</h2>${kv('Mi frase',bioText(),'diagnostico')}
    <div class="two"><div><div class="k">Comparto</div>${list([val('si1'),val('si2'),val('si3')])}</div><div><div class="k">No comparto</div>${list([val('no1'),val('no2'),val('no3')])}</div></div>
    ${kv('Mis temas',[[val('pil1'),val('pil2'),val('pil3')].filter(Boolean).join(' · '),S.pilFreq?`${S.pilFreq} publicaciones a la semana`:''].filter(Boolean).join(' · '),'plan')}
    ${[1,2,3].some(i=>val('ref'+i))?`<div class="k" style="margin-top:6px">Mis referentes</div>${list([1,2,3].map(i=>val('ref'+i)&&(val('ref'+i)+(val('refQ'+i)?': '+val('refQ'+i):''))))}`:''}
    <h2>Dónde estoy</h2>
    ${r.done?`<p><b>${r.lv[1]}</b> · <span class="num">${r.total} sobre 100</span>. Área a trabajar: <b>${AREAS[r.weak].l}</b>.</p>`:'<p class="empty">Haz el diagnóstico del paso 1 para ver tu nivel.</p>'}
    ${mc?`<p>Mi punto de partida se parece al de <b>${CASOS[mc].n}</b>.</p>`:''}
    ${val('meLlevo')?kv('Lo que me llevo',val('meLlevo')):''}
    ${D.ins.length?`<h2>Lo que te llevas en tu caso</h2>${D.ins.map(([k,v])=>`<div class="kv"><div class="k">${k}</div><div class="v">${esc(v)}</div></div>`).join('')}`:''}
    <h2>Mis objetivos a 90 días</h2>${list([1,2,3].map(i=>val('obj'+i)&&(val('obj'+i)+(val('objM'+i)?` (lo mido con: ${val('objM'+i)})`:''))))}
    <h2>Mis próximas cuatro semanas</h2>
    <div class="wk">${weeks.map((w,i)=>`<div class="w4"><div class="h">Semana ${i+1}</div>${w.map((t,j)=>`<label><input type="checkbox" data-plan="${i}-${j}" ${S.plan[i+'-'+j]?'checked':''}><span>${esc(t)}</span></label>`).join('')}</div>`).join('')}</div>
    <h2>Lo que te toca aplicar: tus retos del mes</h2>
    <ol class="retos">${D.retos.map((x,i)=>`<li><b>Semana ${i+1} · ${x.t}</b>${x.d.map(t=>`<span>${esc(t)}</span>`).join('')}</li>`).join('')}</ol>
    ${val('teDirias')?`<h2>Lo que me digo hoy</h2><p style="color:var(--ink)">${esc(val('teDirias'))}</p>`:''}
  </div>
  <aside class="hres"><h2>Tus recursos</h2><p class="sub">Descárgalos ahora. Los usarás durante el mes.</p>
    <div class="dls">${['hoja','informe','cal','plan','dosier'].map(k=>dlCard(k,true)).join('')}</div></aside>
  </div>

  <div class="block"><h2>Tus imágenes para stories</h2><p class="sub">Tres imágenes hechas con tus respuestas. Súbelas etiquetando a ${esc(RETO.cuenta)}: es tu primera acción del reto.</p>
    <div id="cardHost"><p class="count">Creando tus imágenes…</p></div>
    <div class="row" style="margin-top:6px"><button class="btn alt" id="mkCard">Actualizar las imágenes</button>${Object.keys(S.mito).length>1?'<button class="btn alt" id="nextMito">Otra frase en la de opinión</button>':''}</div>
    <p class="count" style="margin-top:8px">En el móvil, mantén pulsada una imagen para guardarla. En el ordenador, clic derecho y "Guardar imagen".</p></div>

  <div class="block"><div class="card ex savebox"><div class="exn">Importante</div><h3>Guarda una copia de tu cuaderno</h3>
    <p>Todo lo que escribes se guarda en este navegador. Si cambias de móvil, borras el historial o lo abres en modo incógnito, se pierde.</p>
    <ol class="how" style="margin:8px 0 0;padding-left:20px"><li>Pulsa el botón: se copia un texto largo que empieza por ICON1: y que contiene todas tus respuestas.</li><li>Pégalo en tus notas o mándatelo a ti por WhatsApp o por correo.</li><li>Para recuperarlo, abre el cuaderno en cualquier móvil u ordenador, ve al Inicio, toca "¿Ya empezaste en otro dispositivo?", pega el texto y pulsa Recuperar.</li></ol>
    <div class="row" style="margin-top:12px"><button class="btn" id="copyCode">Copiar mi código de guardado</button></div><div id="codeHost"></div></div></div>

  <div class="block"><div class="card ex"><div class="exn">Dentro de un mes</div><h3>Vuelve y compara</h3>
    <p>Tu resultado de hoy queda guardado en tu cuaderno. Si el ${back.toLocaleDateString('es-ES',{day:'numeric',month:'long'})} abres este mismo enlace (o pegas tu código de guardado) y repites el paso 1, verás tu puntuación de hoy al lado de la nueva y sabrás cuánto has avanzado.</p>
    
    <div class="row"><a class="btn alt" href="${calLink()}" target="_blank" rel="noopener">Ponerme un recordatorio en Google Calendar</a></div></div></div>

  <div class="block"><div class="card tocard"><div><h3 style="font-size:20px;margin-bottom:4px">Llévalo al día a día</h3><p style="margin:0">Calendario de contenidos, panel de métricas y lecturas para seguir aprendiendo.</p></div><button class="btn" data-go="herramientas">Ir a herramientas →</button></div></div>`;
}
const INS_AREA={
  identidad:'Ana Pavlyuk lo resumió en tres preguntas: qué cuentas, a quién quieres llegar y por qué alguien debería quedarse.',
  contenido:'Como dijo Ana Pavlyuk, no tienes 80.000 balas: dos piezas buenas a la semana valen más que ocho flojas.',
  datos:'Lo que recomendó Álvaro Rebollo: mira comentarios, compartidos, guardados y retención antes que seguidores y visualizaciones.',
  comunidad:'La pregunta de María Muñoz: ¿pasa algo entre tus fans cuando tú no publicas?',
  conversion:'Como explicó María Muñoz, tus seguidores son de la plataforma hasta que tienes su contacto.'
};
const RETO_AREA={
  identidad:'Fija en tu perfil una publicación que te presente tal como estás hoy, sin aparentar más.',
  contenido:'Graba en una sola sesión el contenido de toda la semana.',
  datos:'Apunta cada lunes comentarios, compartidos y guardados, no solo seguidores.',
  comunidad:'Responde a todos los comentarios y pregunta algo a tu audiencia que cambie una decisión tuya.',
  conversion:'Abre un canal de difusión o una lista de correo y ofrece algo a cambio de apuntarse.'
};
/* Todo lo que sale en la hoja de ruta (pantalla y PDF) se calcula aquí a partir de las respuestas */
function hojaDoc(){
  const r=diagScores(),prof=pf()==='profesional',mc=mapaResult(),tag=RETO.cuenta;
  const strong=[...AKEYS].sort((x,y)=>r.pc[y]-r.pc[x])[0];
  const temas=[val('pil1'),val('pil2'),val('pil3')].filter(Boolean),n=Math.min(5,Math.max(1,+S.pilFreq||3));
  const all=mitoItems().flatMap(g=>g.items),ops=all.filter(m=>S.mito[m.id]),pruebas=all.filter(m=>S.prueba[m.id]);
  const cnt=v=>ops.filter(m=>S.mito[m.id]===v).length;
  const ins=[];
  if(r.done){
    ins.push(['Tu punto fuerte',`${AREAS[strong].l} (${r.pc[strong]} sobre 100). Apóyate en ella para mejorar el resto.`]);
    ins.push(['Tu prioridad',`${AREAS[r.weak].l} (${r.pc[r.weak]} sobre 100). ${INS_AREA[r.weak]}`]);
  }
  if(mc)ins.push(['Tu situación',`Se parece a la de ${CASOS[mc].n}: ${CASOS[mc].tabla.punto.toLowerCase()}. El freno habitual: ${CASOS[mc].tabla.freno.toLowerCase()}.`]);
  if(ops.length)ins.push(['Lo que piensas',`De ${ops.length} frases de la industria, ves ${cnt('mito')} como mito, ${cnt('realidad')} como realidad y ${cnt('depende')} como «depende». Lo que marcaste «depende» es lo que te toca probar en tu cuenta.`]);
  if(temas.length)ins.push(['De qué hablas',`${temas.join(', ')}. Con ${n} ${n===1?'publicación':'publicaciones'} a la semana.`]);
  const no=[val('no1'),val('no2'),val('no3')].filter(Boolean);if(no.length)ins.push(['Tu límite',`No compartes: ${no.join(', ')}. Tenerlo decidido te ahorra dudas cada vez que publicas.`]);
  if(val('meLlevo'))ins.push(['Lo que te llevas',val('meLlevo')]);
  const retos=[
    {t:'Preséntate',d:[`Publica tu presentación en 15 segundos${bioText()?` con tu frase («${bioText()}»)`:''} y etiqueta a ${tag}. Muéstrate como estás hoy.`,'Apunta tus cifras de hoy en el informe de audiencia: son tu punto de partida.']},
    {t:'Coge ritmo',d:[`Publica ${n} ${n===1?'pieza':'piezas'}${temas.length?` sobre tus temas (${temas.join(', ')})`:''}. Etiqueta a ${tag} en todas.`,'Crea una cita fija: el mismo día, el mismo tipo de pieza.',r.done?RETO_AREA[r.weak]:RETO_AREA.identidad]},
    {t:'Prueba algo',d:[pruebas[0]?`Haz este experimento: ${pruebas[0].x}`:'Publica el mismo contenido con tres arranques distintos y compara cuál retiene más.','Mira en tu informe qué pieza ha tenido más comentarios, compartidos y guardados, y repite el formato.']},
    {t:'Saca a tu gente del algoritmo',d:[prof?'Publica un caso de trabajo (qué pasaba, qué hiciste, qué resultado tuvo) y escribe directamente a una persona con la que quieras trabajar.':'Abre un canal de difusión o una lista de correo y ofrece algo a cambio: un adelanto, una versión, un fondo de pantalla.',`Cierra tu informe y ten a mano tu alcance total etiquetando a ${tag}: es la cifra del reto.`]}
  ];

  return {r,strong,mc,ins,retos,weeks:planWeeks(),objs:[1,2,3].map(i=>val('obj'+i)&&(val('obj'+i)+(val('objM'+i)?` (lo mido con: ${val('objM'+i)})`:''))).filter(Boolean),
    recursos:['informe','cal','plan','dosier'].map(k=>DL[k]),consejos:CONSEJOS};
}
function hojaText(){
  const r=diagScores(),w=planWeeks();
  const L=[`MI HOJA DE RUTA · ${CONFIG.eventName} (${CONFIG.eventDate})`,''];
  if(bioText())L.push('Mi frase: '+bioText());
  const si=[val('si1'),val('si2'),val('si3')].filter(Boolean),no=[val('no1'),val('no2'),val('no3')].filter(Boolean);
  if(si.length)L.push('Comparto: '+si.join(', '));if(no.length)L.push('No comparto: '+no.join(', '));
  const p=[val('pil1'),val('pil2'),val('pil3')].filter(Boolean);if(p.length)L.push('Mis temas: '+p.join(', '));
  if(r.done)L.push(`Nivel: ${r.lv[1]} (${r.total} sobre 100). Área a trabajar: ${AREAS[r.weak].l}`);
  const o=[1,2,3].map(i=>val('obj'+i)).filter(Boolean);if(o.length){L.push('','OBJETIVOS A 90 DÍAS');o.forEach(x=>L.push('- '+x))}
  L.push('','PRÓXIMAS CUATRO SEMANAS');w.forEach((x,i)=>{L.push('Semana '+(i+1));x.forEach(t=>L.push('- '+t))});
  if(val('teDirias'))L.push('','Lo que me digo hoy: '+val('teDirias'));
  return L.join('\n');
}

/* ---------- Imagen para stories (personal) ---------- */
function loadImg(src){return new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=src})}
function wrap(x,t,max){const w=t.split(' '),l=[];let c='';for(const s of w){const n=c?c+' '+s:s;if(x.measureText(n).width>max&&c){l.push(c);c=s}else c=n}l.push(c);return l}
function cnv(){const c=document.createElement('canvas');c.width=1080;c.height=1920;return [c,c.getContext('2d')]}
const TF='"Archivo Black","Arial Black",sans-serif',FF='"Space Grotesk",system-ui,sans-serif';
async function fontsReady(){try{await Promise.all([document.fonts.load('400 100px "Archivo Black"'),document.fonts.load('500 40px "Space Grotesk"'),document.fonts.load('700 40px "Space Grotesk"')])}catch(e){}}
async function logo(x,src,y){try{const li=await loadImg(src);const h=100;x.drawImage(li,90,y,h*li.width/li.height,h)}catch(e){}}
function foot(x,col){x.fillStyle=col;x.font=`700 40px ${FF}`;x.fillText([RETO.cuenta,CONFIG.hashtag].filter(Boolean).join(' · '),90,1790);x.globalAlpha=.8;x.font=`400 30px ${FF}`;x.fillText(`${CONFIG.eventName} · ${CONFIG.eventDate}`,90,1840);x.globalAlpha=1}
async function cardNivel(){
  const [c,x]=cnv();const r=diagScores();
  x.fillStyle='#00A099';x.fillRect(0,0,1080,1920);await logo(x,CONFIG.logos.dark,130);
  let y=360;if(val('nombre')){x.fillStyle='#ffffff';x.font=`500 48px ${FF}`;x.fillText(val('nombre').slice(0,32),90,y);y+=70}
  x.fillStyle='#03211f';x.font=`700 30px ${FF}`;x.fillText('MI NIVEL',90,y+20);y+=40;
  x.fillStyle='#ffffff';let size=118;const big=r.done?r.lv[1]:'En marcha';x.font=`400 ${size}px ${TF}`;
  while(x.measureText(big).width>900&&size>70){size-=6;x.font=`400 ${size}px ${TF}`}
  x.fillText(big,90,y+size);y+=size+30;
  if(r.done){x.fillStyle='#03211f';x.font=`700 30px ${FF}`;x.fillText('MIS ÁREAS',90,y+40);y+=70;
    AKEYS.forEach(a=>{x.fillStyle='#03211f';x.font=`500 32px ${FF}`;x.fillText(AREAS[a].l,90,y+30);
      x.fillStyle='rgba(255,255,255,.28)';x.fillRect(380,y+8,600,22);x.fillStyle=a===r.weak?'#03211f':'#ffffff';x.fillRect(380,y+8,Math.max(8,6*r.pc[a]),22);y+=54});}
  y=Math.max(y+60,1260);
  x.fillStyle='#03211f';x.font=`700 30px ${FF}`;x.fillText('MI SIGUIENTE PASO',90,y);
  x.fillStyle='#ffffff';x.font=`500 52px ${FF}`;wrap(x,val('paso1')||val('obj1')||'Escribirlo hoy mismo',900).slice(0,5).forEach((l,i)=>x.fillText(l,90,y+80+i*68));
  foot(x,'#ffffff');return c.toDataURL('image/png');
}
function mitoCard(){const ids=Object.keys(S.mito);if(!ids.length)return null;const id=ids.includes(S.cardMito)?S.cardMito:ids[0];return mitoItems().flatMap(g=>g.items).find(m=>m.id===id)}
async function cardOpinion(){
  const [c,x]=cnv();const m=mitoCard();
  x.fillStyle='#141615';x.fillRect(0,0,1080,1920);await logo(x,CONFIG.logos.light,130);
  x.fillStyle='#00A099';x.font=`700 30px ${FF}`;x.fillText('MITO O REALIDAD',90,400);
  const q=m?m.t:'Hay una hora mágica para publicar.';
  x.fillStyle='#ffffff';let size=74;x.font=`400 ${size}px ${TF}`;let ln=wrap(x,'"'+q+'"',900);
  while(ln.length>7&&size>50){size-=4;x.font=`400 ${size}px ${TF}`;ln=wrap(x,'"'+q+'"',900)}
  ln.forEach((l,i)=>x.fillText(l,90,500+i*size*1.18));
  const yv=Math.max(1180,500+ln.length*size*1.18+120);
  x.fillStyle='#9aaba8';x.font=`700 30px ${FF}`;x.fillText('YO DIGO',90,yv);
  const v=m?S.mito[m.id]:'depende';const col={mito:'#a893ff',realidad:'#3fd2c7',depende:'#f0b04a'}[v];
  x.fillStyle=col;x.font=`400 150px ${TF}`;x.fillText(vLabel[v].toUpperCase(),84,yv+160);
  x.fillStyle='#ffffff';x.font=`500 46px ${FF}`;x.fillText('¿Y tú qué opinas?',90,yv+260);
  foot(x,'#00A099');return c.toDataURL('image/png');
}
async function cardCompromiso(){
  const [c,x]=cnv();
  x.fillStyle='#ffffff';x.fillRect(0,0,1080,1920);await logo(x,CONFIG.logos.teal,130);
  x.fillStyle='#00A099';x.fillRect(90,330,120,10);
  x.fillStyle='#141615';x.font=`400 96px ${TF}`;x.fillText('En 90 días',90,470);x.fillText('voy a…',90,580);
  const obs=[1,2,3].map(i=>val('obj'+i)).filter(Boolean);const list=obs.length?obs:[1,2,3].map(i=>val('paso'+i)).filter(Boolean);
  let y=720;(list.length?list:['Escribir mis objetivos en el cuaderno']).slice(0,3).forEach((o,i)=>{
    x.fillStyle='#00A099';x.font=`400 70px ${TF}`;x.fillText(String(i+1),90,y+56);
    x.fillStyle='#3C3C3B';x.font=`500 50px ${FF}`;const ln=wrap(x,o,800).slice(0,4);ln.forEach((l,j)=>x.fillText(l,190,y+48+j*64));y+=Math.max(130,ln.length*64+70)});
  const d=new Date();d.setDate(d.getDate()+90);
  x.fillStyle='#141615';x.font=`700 40px ${FF}`;x.fillText(`Pregúntame el ${d.toLocaleDateString('es-ES',{day:'numeric',month:'long'})}`,90,Math.max(y+60,1560));
  foot(x,'#00A099');return c.toDataURL('image/png');
}
async function showCard(){
  const h=$('#cardHost');if(!h)return;await fontsReady();
  const cards=[['Mi nivel','Tu resultado y tu siguiente paso',await cardNivel()],['Mi opinión','Una frase del debate y tu postura',await cardOpinion()],['Mi compromiso','Tus objetivos a 90 días',await cardCompromiso()]];
  h.innerHTML=`<div class="cards">${cards.map(([t,d,u])=>`<figure><img src="${u}" alt="Imagen para stories: ${t}"><figcaption>${t}<span>${d}</span><a href="${u}" download="ICON-${t.toLowerCase().replace(/ /g,'-')}.png">Descargar</a></figcaption></figure>`).join('')}</div>`;
}

/* ---------- Descargables ---------- */
function dl(name,data,type){const b=data instanceof Blob?data:new Blob([data],{type});const u=URL.createObjectURL(b);const x=document.createElement('a');x.href=u;x.download=name;document.body.appendChild(x);x.click();x.remove();setTimeout(()=>URL.revokeObjectURL(u),3000)}
const _lib={};
function lib(src){return _lib[src]||(_lib[src]=new Promise((ok,ko)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=ko;document.head.appendChild(s)}))}
function logoPng(){return new Promise((ok,ko)=>{const i=new Image();i.onload=()=>{const c=document.createElement('canvas');c.width=i.naturalWidth;c.height=i.naturalHeight;c.getContext('2d').drawImage(i,0,0);ok({url:c.toDataURL('image/png'),w:i.naturalWidth,h:i.naturalHeight})};i.onerror=ko;i.src=CONFIG.logos.teal})}
const TEAL_HEX='00A099';
async function dlCalXlsx(){
  await lib('assets/vendor/exceljs.min.js');const lg=await logoPng(),rows=calRows();
  const wb=new ExcelJS.Workbook(),ws=wb.addWorksheet('Calendario',{views:[{showGridLines:false,state:'frozen',ySplit:5}],pageSetup:{orientation:'landscape',fitToPage:true,fitToWidth:1,fitToHeight:0}});
  ws.columns=[{width:12},{width:26},{width:16},{width:52},{width:44},{width:34},{width:9}];
  ws.addImage(wb.addImage({base64:lg.url,extension:'png'}),{tl:{col:0,row:0},ext:{width:Math.round(40*lg.w/lg.h),height:40}});
  ws.getRow(1).height=36;
  ws.getCell('A3').value='Calendario de contenidos · 4 semanas';ws.getCell('A3').font={name:'Arial',size:16,bold:true};
  ws.getCell('A4').value=`${val('nombre')?val('nombre')+' · ':''}Etiqueta a ${RETO.cuenta} en cada pieza. Lo que va entre corchetes es para completarlo con lo tuyo.`;ws.getCell('A4').font={name:'Arial',size:10,color:{argb:'FF5F6664'}};
  const line={style:'thin',color:{argb:'FFD5DFDC'}},box={top:line,left:line,bottom:line,right:line};
  rows.forEach((r,i)=>{const row=ws.getRow(5+i);r.forEach((v,j)=>{const c=row.getCell(j+1);c.value=v;c.border=box;c.alignment={wrapText:true,vertical:'top'};
    if(i===0){c.font={name:'Arial',size:10,bold:true,color:{argb:'FFFFFFFF'}};c.fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF'+TEAL_HEX}};c.alignment={vertical:'middle',horizontal:'center',wrapText:true}}
    else{c.font={name:'Arial',size:10,bold:j===1};if(j===6){c.fill={type:'pattern',pattern:'solid',fgColor:{argb:'FFFFF9DB'}};c.dataValidation={type:'list',allowBlank:true,formulae:['"Sí,No"']}}}});
    row.height=i===0?24:undefined});
  ws.getCell(`A${6+rows.length}`).value='ICON Music Business School · iconmbs.com · @iconmbs';ws.getCell(`A${6+rows.length}`).font={name:'Arial',size:9,color:{argb:'FF5F6664'}};
  dl('ICON-calendario-contenidos.xlsx',new Blob([await wb.xlsx.writeBuffer()],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));
}
function imgData(src){return new Promise((ok,ko)=>{const i=new Image();i.onload=()=>{const c=document.createElement('canvas');c.width=i.naturalWidth;c.height=i.naturalHeight;c.getContext('2d').drawImage(i,0,0);ok({url:c.toDataURL('image/png'),w:i.naturalWidth,h:i.naturalHeight})};i.onerror=ko;i.src=src})}
async function dlHojaPdf(){
  await lib('assets/vendor/jspdf.umd.min.js');
  const [lgD,lgT]=await Promise.all([imgData(CONFIG.logos.dark),imgData(CONFIG.logos.teal)]);
  const D=hojaDoc(),r=D.r,doc=new jspdf.jsPDF({unit:'mm',format:'a4'}),M=18,W=210-2*M;let y=0;
  const T=[0,160,153],TT=[0,117,111],K=[20,22,21],G=[95,102,100],TINT=[225,243,241];
  const clean=t=>String(t??'').replace(/→/g,'>').replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/…/g,'...').replace(/[–—]/g,'-').replace(/[^\x00-\xFF]/g,'').trim();
  const font=(b,s,c)=>{doc.setFont('helvetica',b?'bold':'normal');doc.setFontSize(s);doc.setTextColor(...c)};
  const foot=()=>{font(0,8.5,G);doc.text('ICON Music Business School · iconmbs.com · '+RETO.cuenta,M,288);doc.addImage(lgT.url,'PNG',210-M-7*lgT.w/lgT.h,282,7*lgT.w/lgT.h,7)};
  const need=h=>{if(y+h>274){foot();doc.addPage();y=20}};
  const P=(t,o={})=>{const x=M+(o.in||0),w=W-(o.in||0);font(o.b,o.s||10.5,o.c||K);doc.splitTextToSize(clean(t),w).forEach(l=>{need(6);doc.text(l,x,y);y+=(o.s||10.5)*.5});y+=o.gap??1.5};
  const H=t=>{need(22);y+=7;font(1,15,K);doc.text(clean(t),M,y);doc.setDrawColor(...T);doc.setLineWidth(.7);doc.line(M,y+2.5,M+W,y+2.5);y+=10};
  const KV=(k,v)=>{need(12);font(1,8.5,TT);doc.text(clean(k).toUpperCase(),M,y);y+=4.6;P(v,{gap:3.5})};
  const B=(t,o={})=>{const lines=doc.splitTextToSize(clean(t),W-8-(o.in||0));font(0,10.5,K);lines.forEach((l,i)=>{need(6);if(i===0){if(o.box){doc.setDrawColor(...T);doc.setLineWidth(.35);doc.rect(M+(o.in||0),y-3.2,3.4,3.4)}else{doc.setFillColor(...T);doc.circle(M+(o.in||0)+1.4,y-1.3,.8,'F')}}doc.text(l,M+(o.in||0)+6.5,y);y+=5.3});y+=1};
  // Portada
  doc.setFillColor(...T);doc.rect(0,0,210,74,'F');doc.addImage(lgD.url,'PNG',M,14,12*lgD.w/lgD.h,12);
  font(1,9,[3,33,31]);doc.text('MI HOJA DE RUTA · RETO ICON · UN MES',M,42);
  font(1,26,[255,255,255]);doc.text(clean(val('nombre')||'Tu plan de marca personal').slice(0,36),M,54);
  font(0,11,[255,255,255]);doc.text(clean([pf()==='profesional'?'Profesional de la industria':'Artista o productor',new Date().toLocaleDateString('es-ES',{day:'numeric',month:'long',year:'numeric'})].join(' · ')),M,63);
  y=86;
  if(bioText()){font(1,8.5,TT);doc.text('MI FRASE',M,y);y+=6;P(bioText(),{s:14,b:1,gap:4})}
  P(`${val('nombre')?clean(val('nombre'))+': hemos':'Hemos'} montado esta hoja de ruta con lo que nos has contado en el cuaderno. Recoge lo que deberías llevarte en tu caso y lo que te toca aplicar durante el próximo mes. Léela entera y pon la primera tarea en tu agenda.`,{gap:1.5});P('El equipo de ICON',{b:1,c:TT,gap:5});
  // Punto de partida
  H('1 · Dónde estás');
  if(r.done){P(`${r.lv[1]} · ${r.total} sobre 100`,{b:1,s:12,gap:1});P(r.lv[2],{c:G,gap:4});
    AKEYS.forEach(k=>{need(8);font(k===r.weak,10,K);doc.text(AREAS[k].l,M,y);doc.setFillColor(...TINT);doc.rect(M+38,y-3.2,100,3.6,'F');doc.setFillColor(...(k===r.weak?K:T));doc.rect(M+38,y-3.2,Math.max(1,r.pc[k]),3.6,'F');font(0,9.5,G);doc.text(String(r.pc[k]),M+142,y);if(k===r.weak){font(1,8.5,K);doc.text('PRIORIDAD',M+152,y)}y+=7});y+=2}
  else P('Haz el diagnóstico del paso 1 para ver aquí tu nivel y tu área prioritaria.',{c:G});
  // Aprendizajes
  if(D.ins.length){H('2 · Lo que te llevas en tu caso');D.ins.forEach(([k,v])=>KV(k,v))}
  // Plan
  H('3 · Qué hacer las próximas cuatro semanas');
  if(D.objs.length){font(1,8.5,TT);need(8);doc.text('TUS OBJETIVOS A 90 DÍAS',M,y);y+=5.5;D.objs.forEach(o=>B(o));y+=2}
  D.weeks.forEach((w,i)=>{need(14);P('Semana '+(i+1),{b:1,s:11,gap:1.5});w.forEach(t=>B(t,{box:1}));y+=2});
  // Retos
  H('4 · Lo que te toca aplicar: tus retos del mes');
  P(`Cuenta el alcance de todo lo que publiques etiquetando a ${RETO.cuenta} hasta el ${RETO.finTexto}. Quien más consiga gana un diagnóstico de carrera y una asesoría 1:1.`,{c:G,gap:4});
  D.retos.forEach((x,i)=>{need(20);doc.setFillColor(...T);doc.circle(M+3.5,y-1.5,3.5,'F');font(1,10,[255,255,255]);doc.text(String(i+1),M+3.5,y-.2,{align:'center'});font(1,11,K);doc.text(clean(`Semana ${i+1} · ${x.t}`),M+10,y);y+=6.5;x.d.forEach(t=>B(t,{box:1,in:10}));y+=2.5});
  // Recursos
  H('5 · Tus recursos y cómo usarlos');
  D.recursos.forEach(x=>{need(14);P(`${x.t} (${x.f})`,{b:1,gap:.5});P(x.uso,{c:G,gap:3.5})});
  P('Descárgalos en el paso «Tu hoja de ruta» del cuaderno.',{c:G,s:9.5,gap:4});
  // Consejos
  H('6 · Lo que dijeron los ponentes');D.consejos.forEach(x=>{need(14);P(x.f,{gap:.8});P(x.q+(rolDe(x.q)?' · '+rolDe(x.q):''),{c:TT,b:1,s:9,gap:4})});
  // Cierre
  need(38);y+=4;doc.setFillColor(...K);doc.roundedRect(M,y,W,30,3,3,'F');font(1,13,[255,255,255]);doc.text('Esto es la punta del iceberg',M+7,y+10);
  font(0,10,[211,220,218]);doc.text('Cuéntanos tu caso y vemos cómo llevarlo más lejos.',M+7,y+16.5);
  font(1,10.5,[63,210,199]);doc.textWithLink(clean(CONFIG.equipo.boton)+' >',M+7,y+24,{url:CONFIG.equipo.url});
  foot();dl('ICON-mi-hoja-de-ruta.pdf',doc.output('blob'));
}

const csv=rows=>'\ufeff'+rows.map(r=>r.map(c=>'"'+String(c??'').replace(/"/g,'""')+'"').join(';')).join('\r\n');
function calRows(){
  const prof=S.calProf||pf(),obj=S.calObj||(prof==='profesional'?'profesional':'cancion'),n=+S.calNum||Math.min(5,Math.max(1,+S.pilFreq||3));
  let start=new Date((S.calDate||'')+'T12:00:00');if(isNaN(start)){start=new Date();start.setDate(start.getDate()+7)}
  start.setDate(start.getDate()-(start.getDay()+6)%7);
  const rows=[['Fecha','Semana','Formato','Idea','Gancho','Llamada a la acción','Hecho']];
  CAL_WEEKS[prof].forEach((w,wi)=>w.i.slice(0,n).forEach((it,k)=>{const d=new Date(start);d.setDate(start.getDate()+wi*7+CAL_DAYS[n][k]);
    rows.push([d.toLocaleDateString('es-ES'),w.n,it.f,it.t,it.h||'',it.cta?CAL_CTA[obj]:'','']) }));
  return rows;
}
const DL={
  plan:{t:'Plan de lanzamiento de un single',f:'XLSX',href:'assets/descargas/plan-lanzamiento-single.xlsx',name:'ICON-plan-lanzamiento-single.xlsx',
    d:()=>pf()==='profesional'?'Lleva el control del lanzamiento de un artista: tareas con fechas, responsables y contactos.':'Tu lanzamiento semana a semana: tareas con fechas, responsables y contactos.',
    uso:'Cuando tengas fecha de salida: ponla en la hoja «Plan» y las fechas límite se calculan solas.',
    aviso:'Si estás empezando, no pagues por entrar en playlists: invierte antes en tu contenido orgánico. Escribe gratis a curadores independientes, y pide a creadores y microinfluencers que usen tu canción en sus vídeos.'},
  informe:{t:'Informe semanal de audiencia',f:'XLSX',href:'assets/descargas/informe-semanal-audiencia.xlsx',name:'ICON-informe-semanal-audiencia.xlsx',
    d:()=>`Seguidores, oyentes y alcance semana a semana. Suma solo el alcance de lo que publiques etiquetando a ${RETO.cuenta}.`,
    uso:'Cada lunes, diez minutos: apunta tus cifras y cada pieza publicada. Es tu marcador del reto.'},
  dosier:{t:'Plantilla de dosier en una página',d:()=>'Lo que un sello, un programador o un artista necesita saber de ti, en una hoja.',f:'PDF',href:'assets/descargas/plantilla-dosier.pdf',name:'ICON-plantilla-dosier.pdf',uso:'Antes de escribir a un sello, una sala o un medio: rellénala y pásala a limpio con tu imagen.'},
  cal:{t:'Calendario de contenidos · 4 semanas',d:()=>'Ideas, ganchos y fechas según tu perfil.',f:'XLSX',id:'dlCal',uso:'Cada domingo: elige las piezas de la semana y marca «Hecho» según publiques.'},
  hoja:{t:'Tu hoja de ruta',d:()=>'Tu plan del mes, tus retos y lo que has aprendido.',f:'PDF',id:'dlHoja2',uso:'Hoy: léela entera y pon la primera tarea en tu agenda.'}
};
const dlCard=(k,uso)=>{const x=DL[k];return `<div class="dlc"><span class="dlf">${x.f}</span><div><b>${x.t}</b><span>${x.d()}</span>${uso&&x.uso?`<span class="uso"><b>Cómo usarlo.</b> ${x.uso}</span>`:''}${x.aviso?`<span class="uso aviso"><b>Ojo con las playlists.</b> ${x.aviso}</span>`:''}</div>${x.href?`<a class="btn sm" href="${x.href}" download="${x.name}">Descargar</a>`:`<button class="btn sm" id="${x.id}">Descargar</button>`}</div>`};

/* ---------- Herramientas: calendario, métricas y recursos ---------- */
const MET_DEF={
  contenido:{
    cols:[['n','Pieza','text'],['v','Views'],['p','Visitas al perfil'],['s','Seguidores nuevos'],['g','Guardados'],['c','Compartidos']],
    ratios:[{k:'vp',l:'Visitas / views',f:r=>r.p/r.v,pct:1},{k:'sp',l:'Seguidores / visitas',f:r=>r.s/r.p,pct:1},{k:'gv',l:'Guardados / views',f:r=>r.g/r.v,pct:1},{k:'cv',l:'Compartidos / views',f:r=>r.c/r.v,pct:1}],
    ex:[{n:'Reel proceso en estudio (ejemplo)',v:48000,p:1900,s:210,g:640,c:310},{n:'Reel con tendencia (ejemplo)',v:180000,p:2100,s:40,g:300,c:180},{n:'Carrusel 3 referencias (ejemplo)',v:6200,p:520,s:95,g:410,c:130}],
    blank:{n:'',v:0,p:0,s:0,g:0,c:0}},
  musica:{
    cols:[['n','Canción','text'],['o','Oyentes'],['r','Reproducciones'],['g','Guardados'],['l','Añadidos a listas']],
    ratios:[{k:'ro',l:'Reproducciones por oyente',f:r=>r.r/r.o},{k:'go',l:'Guardados / oyentes',f:r=>r.g/r.o,pct:1},{k:'lo',l:'Listas / oyentes',f:r=>r.l/r.o,pct:1}],
    ex:[{n:'Canción A (ejemplo)',o:3200,r:9800,g:260,l:120},{n:'Canción B (ejemplo)',o:41000,r:52000,g:300,l:35}],
    blank:{n:'',o:0,r:0,g:0,l:0}}
};
if(!S.met||typeof S.met!=='object')S.met={};
Object.keys(MET_DEF).forEach(k=>{if(!Array.isArray(S.met[k]))S.met[k]=JSON.parse(JSON.stringify(MET_DEF[k].ex))});
const numIn=x=>Number(String(x).replace(/[^\d.,-]/g,'').replace(/\./g,'').replace(',','.'))||0;
const fmtR=(x,pct)=>x==null||!isFinite(x)?'–':pct?(x*100).toLocaleString('es-ES',{maximumFractionDigits:1})+' %':x.toLocaleString('es-ES',{maximumFractionDigits:2});

function rHerramientas(){
  if(!S.toolTab||S.toolTab==='descargas')S.toolTab='calendario';
  const T=[['calendario','Calendario de contenidos'],['metricas','Panel de métricas'],['recursos','Recursos para aprender']];
  return `<div class="kick">Paso 7 · Para usar cuando quieras</div><h1 class="ph">Herramientas</h1>
  <p class="lead">Para aplicar tu plan en el día a día. Las plantillas descargables están en tu hoja de ruta.</p>
  <div class="ctabs" role="tablist">${T.map(([k,l])=>`<button class="ctab" role="tab" data-tool="${k}" aria-selected="${S.toolTab===k}">${l}</button>`).join('')}</div>
  <div id="toolPanel">${rTool(S.toolTab)}</div>
  <section class="cta"><img src="${CONFIG.logos.dark}" alt="ICON Music Business School"><h2>Esto es la punta del iceberg</h2>
    <p>Lo que has trabajado aquí cabe en una tarde. Cuéntanos tu caso y vemos cómo llevarlo más lejos con más de 80 profesionales en activo de la industria.</p>
    <a class="ctabtn" href="${esc(CONFIG.equipo.url)}" target="_blank" rel="noopener">${esc(CONFIG.equipo.boton)} →</a>
    <p class="ctasub">O escríbenos a ${esc(CONFIG.equipo.email)}</p></section>`;
}
function rTool(k){
  if(k==='descargas')return `<div class="dls">${['hoja','informe','cal','plan','dosier'].map(k=>dlCard(k,true)).join('')}</div>`;
  if(k==='calendario'){
    const d=new Date();const dow=(d.getDay()+6)%7;d.setDate(d.getDate()+(dow===0?0:7-dow));
    const iso=d.toISOString().slice(0,10);
    if(!S.calProf)S.calProf=pf();if(!S.calNum)S.calNum=String(Math.min(5,Math.max(1,+S.pilFreq||2)));if(!S.calObj)S.calObj=pf()==='profesional'?'profesional':'cancion';if(!S.calDate)S.calDate=iso;
    return `<div class="card ex"><div class="exn">Calendario de contenidos</div><h3>Tus próximas cuatro semanas de publicaciones</h3>
      <p class="how">Hemos rellenado lo que ya sabemos de ti. Cámbialo si hace falta y genera el calendario.</p>
      <div class="gap">
        <div><label class="l">Tu perfil</label>${segK('calProf',[['artista','Artista'],['profesional','Trabajo en la industria']])}</div>
        <div><label class="l">Tu objetivo</label>${segK('calObj',[['cancion','Dar a conocer una canción'],['comunidad','Crear comunidad'],['directo','Llenar un directo'],['profesional','Conseguir clientes o artistas']])}</div>
        <div><label class="l">Publicaciones por semana</label>${segK('calNum',['1','2','3','4','5'],'nums')}</div>
        <div><label class="l" for="f-calDate">Empiezas la semana del</label><input class="w" type="date" id="f-calDate" data-k="calDate" value="${esc(S.calDate)}"></div>
      </div>
      ${val('pil1')?`<p class="how" style="margin-top:12px">Tus temas: <b>${esc([val('pil1'),val('pil2'),val('pil3')].filter(Boolean).join(' · '))}</b>. Úsalos para dar tu toque a cada idea.</p>`:''}
      <div class="row" style="margin-top:14px"><button class="btn" id="cgen">Generar calendario</button></div></div>
      <div id="cout"></div>`;
  }
  if(k==='metricas'){
    if(!S.metTab)S.metTab='contenido';
    return `<div class="card ex"><div class="exn">Panel de métricas</div><h3>¿Qué funciona de verdad?</h3>
      <p class="how">Mete las cifras de tus publicaciones o canciones. Con "Copiar tabla" te la llevas a Excel o Google Sheets. El panel calcula las ratios, marca la mejor de cada columna y te dice dónde mirar. Las filas de ejemplo son inventadas: bórralas o escribe encima. Estas ratios sirven para comparar tus piezas entre sí, no con las de otras cuentas.</p>
      <div class="ctabs" role="tablist">${[['contenido','Contenido en redes'],['musica','Canciones']].map(([v,l])=>`<button class="ctab" role="tab" data-mtab="${v}" aria-selected="${S.metTab===v}">${l}</button>`).join('')}</div>
      <div id="mbody"></div></div>`;
  }
  return `${RESOURCES.map(g=>`<div class="block"><h2>${g.g}</h2>${g.s?`<p class="sub">${g.s}</p>`:''}<div class="links">${g.l.map(x=>`<a href="${esc(x.u)}" target="_blank" rel="noopener"><b>${x.t}</b><span>${x.d}</span></a>`).join('')}</div></div>`).join('')}
    ${LECTURAS_ICON.length?`<div class="block"><h2>De ICON</h2><div class="links">${LECTURAS_ICON.map(x=>`<a href="${esc(x.u)}" target="_blank" rel="noopener"><b>${esc(x.t)}</b><span>${esc(x.d)}</span></a>`).join('')}</div></div>`:(D?`<div class="block"><h2>De ICON</h2>${pend('artículos, vídeos o clases de ICON para ampliar cada tema (rellena LECTURAS_ICON).')}</div>`:'')}
    <p class="count" style="margin-top:20px">Son enlaces externos y su contenido puede cambiar.</p>`;
}
function buildMet(){
  const host=$('#mbody');if(!host)return;const tab=S.metTab,Dm=MET_DEF[tab],rows=S.met[tab];
  host.innerHTML=`<div class="tw"><table class="met"><thead><tr>${Dm.cols.map(c=>`<th>${c[1]}</th>`).join('')}${Dm.ratios.map(x=>`<th class="num">${x.l}</th>`).join('')}<th></th></tr></thead>
  <tbody>${rows.map((row,i)=>`<tr data-i="${i}">${Dm.cols.map(c=>`<td><input class="mi ${c[2]==='text'?'n':'v'}" data-met="${i}" data-f="${c[0]}" type="text" ${c[2]==='text'?`maxlength="60" placeholder="Nombre" value="${esc(row[c[0]])}"`:`inputmode="numeric" value="${row[c[0]]||''}"`} aria-label="${c[1]}"></td>`).join('')}
  ${Dm.ratios.map(x=>`<td class="num" data-r="${x.k}"></td>`).join('')}<td><button class="btn alt sm" data-mdel="${i}" aria-label="Eliminar fila">✕</button></td></tr>`).join('')}</tbody></table></div>
  <div class="row"><button class="btn sm" id="maddr">Añadir fila</button><button class="btn alt sm" id="mcopy">Copiar tabla</button><button class="btn alt sm" id="mclr">Vaciar tabla</button></div><div id="mcopyHost"></div>
  <div class="callout" id="mins" style="margin-top:14px"></div>`;
  calcMet();
}
function calcMet(){
  const tab=S.metTab,Dm=MET_DEF[tab],rows=S.met[tab];
  const vals=Dm.ratios.map(x=>rows.map(row=>{const v=x.f(row);return isFinite(v)?v:null}));
  const bests=vals.map(col=>{const nn=col.filter(v=>v!=null);return nn.length>1?Math.max(...nn):null});
  Dm.ratios.forEach((x,ci)=>{document.querySelectorAll('#mbody tr[data-i]').forEach((tr,ri)=>{
    const v=vals[ci][ri],cell=tr.querySelector(`[data-r="${x.k}"]`);const w=v!=null&&bests[ci]?Math.max(2,v/bests[ci]*100):0;
    cell.className='num'+(v!=null&&bests[ci]!=null&&v===bests[ci]?' best':'');
    cell.innerHTML=`<span class="rv">${fmtR(v,x.pct)}</span><i class="rb" style="width:${w}%"></i>`})});
  const out=[],nm=i=>`<b>${esc(rows[i].n||'Fila '+(i+1))}</b>`;
  if(rows.length<2)out.push('Añade al menos dos filas con datos para poder compararlas.');
  else{
    Dm.ratios.forEach((x,ci)=>{if(bests[ci]!=null)out.push(`Mejor ${x.l.toLowerCase()}: ${nm(vals[ci].indexOf(bests[ci]))} (${fmtR(bests[ci],x.pct)}).`)});
    const key=tab==='contenido'?'v':'o';const mx=rows.reduce((a,row,i)=>row[key]>rows[a][key]?i:a,0);
    if(tab==='contenido'){const c=vals[1];if(c[mx]!=null&&bests[1]!=null&&c[mx]<bests[1]&&rows[mx].v>0)out.push(`${nm(mx)} es la pieza con más views, pero no es la que más gente convierte en seguidores. Atención no es lo mismo que relación: mira qué hace distinta a la mejor.`)}
    else{const c=vals[0];if(c[mx]!=null&&Math.min(...c.filter(v=>v!=null))===c[mx])out.push(`${nm(mx)} tiene más oyentes pero menos reproducciones por oyente: mucha gente la oyó una vez y pocos volvieron.`)}
  }
  out.push('Haz un solo cambio por semana (arranque, formato o enlace) y vuelve a comparar.');
  const el=$('#mins');if(el)el.innerHTML=out.map(t=>`<p>${t}</p>`).join('');
}
function genCal(){
  const prof=S.calProf||pf(),obj=S.calObj||'cancion',n=+S.calNum||2;
  let start=new Date((S.calDate||'')+'T12:00:00');if(isNaN(start))start=new Date();
  const dow=(start.getDay()+6)%7;start.setDate(start.getDate()-dow);
  const days=CAL_DAYS[n],lines=[];const fmtd=d=>d.toLocaleDateString('es-ES',{weekday:'short',day:'numeric',month:'short'});
  const objL={cancion:'Dar a conocer una canción',comunidad:'Crear comunidad',directo:'Llenar un directo',profesional:'Conseguir clientes o artistas'}[obj];
  let html=`<div class="callout" style="margin-top:16px"><p><b>Objetivo:</b> ${objL} · <b>${n}</b> ${n===1?'publicación':'publicaciones'} a la semana. Lo que va entre corchetes es para que lo completes con lo tuyo.</p>${retoDias()>0?`<p>Etiqueta a <b>${esc(RETO.cuenta)}</b> en cada pieza: hasta el ${esc(RETO.finTexto)} cuenta para el reto.</p>`:''}</div>`;
  CAL_WEEKS[prof].forEach((w,wi)=>{
    html+=`<h3 class="weekh">${w.n}</h3><ul class="cal">`;lines.push('',w.n.toUpperCase());
    w.i.slice(0,n).forEach((it,k)=>{
      const dt=new Date(start);dt.setDate(start.getDate()+wi*7+days[k]);const cta=it.cta?CAL_CTA[obj]:'';
      html+=`<li><div class="d">${fmtd(dt)}<span class="f">${it.f}</span></div><p class="t">${it.t}</p>${it.h?`<p class="h"><b>Gancho:</b> ${it.h}</p>`:''}${cta?`<p class="h"><b>Llamada a la acción:</b> ${cta}</p>`:''}</li>`;
      lines.push(`- ${fmtd(dt)} · ${it.f}: ${it.t}${it.h?' | Gancho: '+it.h:''}${cta?' | Llamada a la acción: '+cta:''}`);
    });
    html+='</ul>';
  });
  html+=`<div class="row" id="cph" style="margin-top:18px"><button class="btn" id="ccopy">Copiar calendario</button></div><p class="count" style="margin-top:8px">Pégalo en tus notas, en Notion o en una hoja de cálculo. También queda guardado en tu código de guardado.</p>`;
  S.calText=('CALENDARIO DE CONTENIDOS · 4 SEMANAS'+lines.join('\n')).trim();save();
  $('#cout').innerHTML=html;$('#cout').scrollIntoView({block:'start'});
}
function afterTool(){if(S.toolTab==='metricas')buildMet()}

/* ---------- Navegación ---------- */
const R={inicio:rInicio,diagnostico:rDiag,mitos:rMitos,casos:rCasos,charlas:rCharlas,plan:rPlan,hoja:rHoja,herramientas:rHerramientas};
/* Inicio: una carta que aparece frase a frase. Los textos están aquí; <b> marca lo que se resalta. */
const INTRO=()=>[
  'Gracias por registrarte en el evento.',
  'Tanto si viniste como si al final no pudiste.',
  'No queríamos que se quedara en una tarde sin más.',
  '<i>(Aunque, entre nosotros, fue la leche.)</i>',
  'Así que hemos montado esto: <b>todo lo que se dijo</b>, las conclusiones y los aprendizajes, listos para ponerlos en práctica.',
  'Primero, un <b>diagnóstico</b> de tu marca.',
  'Después, lo que dijeron los ponentes, llevado a tu caso.',
  'Y al final, <b>tu hoja de ruta</b> para un mes. Con plantillas y todo.',
  `Luego te toca a ti: sacar tu contenido a la calle y etiquetar a <a href="${esc(RETO.cuentaUrl)}" target="_blank" rel="noopener">${esc(RETO.cuenta)}</a>.`,
  'Quien más alcance consiga se lleva una <b>sesión 1:1</b>: analizamos su caso con el equipo de ICON y otros profesionales de la industria.',
  `Tienes hasta el ${esc(RETO.finTexto)}. Y unos ${TOTAL_MIN} minutos por delante.`,
  'Ah, y esto es solo la punta del iceberg de lo que hacemos en ICON.'
];
let introI=S.perfil?1:0,introT=null;
function introPlay(seen,onSeen){
  seen=seen===undefined?!!S.introVisto:seen;onSeen=onSeen||(()=>{S.introVisto=1;save()});
  clearTimeout(introT);const box=$('#intro');if(!box||!box.classList.contains('carta'))return;
  const L=[...box.querySelectorAll('.il')],end=box.querySelector('.iend');let k=0;
  const still=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const done=()=>{clearTimeout(introT);L.forEach(x=>{x.classList.add('on');x.classList.remove('now')});end.classList.add('on');onSeen()};
  const step=()=>{clearTimeout(introT);if(k>=L.length){L.forEach(x=>x.classList.remove('now'));end.classList.add('on');onSeen();end.scrollIntoView({block:'nearest',behavior:'smooth'});return}
    L.forEach(x=>x.classList.remove('now'));const el=L[k++];el.classList.add('on','now');el.scrollIntoView({block:'nearest',behavior:'smooth'});
    introT=setTimeout(step,850+el.textContent.length*26)};
  if(seen||still){done();return}
  box.onclick=e=>{if(e.target.closest('a,button'))return;step()};
  const sk=box.querySelector('.iskip');if(sk)sk.onclick=done;
  introT=setTimeout(step,500);
}
/* Puentes: al pasar de un paso al siguiente, por qué has hecho eso y a dónde vamos */
const PUENTE={
  diagnostico(){const r=diagScores();return [
    r.done?`Ya sabes dónde estás: <b>${r.lv[1]}</b>.`:'Has empezado por mirarte con honestidad. Es el paso que casi todo el mundo se salta.',
    r.done?`Tu prioridad es <b>${AREAS[r.weak].l}</b>. La tendremos en cuenta en tu hoja de ruta.`:null,
    'Antes de darte ningún consejo, queremos saber qué piensas tú.',
    'Ahora vienen las frases que se debatieron en el evento.',
    'Vota primero. Después verás qué dijo cada ponente.']},
  mitos(){const all=mitoItems().flatMap(g=>g.items),n=all.filter(m=>S.mito[m.id]).length,k=all.filter(m=>S.mito[m.id]==='depende').length;return [
    n?`Has opinado sobre <b>${n} ${n===1?'frase':'frases'}</b>.`:'Has visto qué se discute de verdad en la industria.',
    k?`En ${k} has dicho «depende». Bien: ahí es donde se aprende.`:null,
    'Casi nada en redes es blanco o negro. Depende del caso.',
    'Por eso ahora bajamos a <b>tres casos concretos</b>.',
    'Uno se parece a ti más de lo que crees.']},
  casos(){const mc=mapaResult();return [
    mc?`Tu punto de partida se parece al de <b>${CASOS[mc].n}</b>.`:'Has visto tres puntos de partida muy distintos.',
    'Has leído cómo lo resolverían tres profesionales. Y has pensado cómo lo harías tú.',
    'Ahora, las ideas de fondo: <b>las tres charlas</b> del evento.',
    'Quédate con una. Solo una.']},
  charlas(){return [
    'Hasta aquí, entender.',
    'A partir de aquí, <b>hacer</b>.',
    'Vamos a convertir todo lo anterior en tres objetivos y un primer paso.',
    'Pequeño. Que puedas empezar mañana.']},
  plan(){return [
    'Ya está todo.',
    'Tu diagnóstico, tus opiniones, tu caso y tu plan.',
    'Lo hemos juntado en <b>una hoja de ruta para un mes</b>, con un reto por semana.',
    `Descárgala. Y sal a la calle: cada pieza que etiquetes con ${esc(RETO.cuenta)} cuenta.`]}
};
function puente(from,to){
  const i=STEPS.findIndex(s=>s[0]===to);S.puente=S.puente||{};S.puente[from]=1;save();
  document.body.classList.add('isintro');document.body.classList.remove('iswide');clearTimeout(introT);
  $('#main').innerHTML=`<section class="intro carta puente" id="intro"><div class="kick">Siguiente · ${esc(STEPS[i][1])}</div>
    ${PUENTE[from]().filter(Boolean).map(t=>`<p class="il">${t}</p>`).join('')}
    <div class="iend"><button class="btn xl" data-go="${to}">Vamos →</button></div></section>`;
  window.scrollTo(0,0);introPlay(false,()=>{});
}
function rInicio(){
  clearTimeout(introT);
  if(introI===0){setTimeout(introPlay,0);
    return `<section class="intro carta" id="intro"><img class="cimg ihero" src="${CONFIG.fotos.portada}" alt="Jornada ICON × Nebrija, 20 de noviembre de 2026">
    ${INTRO().map(t=>`<p class="il">${t}</p>`).join('')}
    <div class="iend"><button class="btn xl" data-intro="1">Empezar →</button></div>
    ${S.introVisto?'':'<button class="linkbtn iskip">Saltar</button>'}</section>`}
  return `<section class="intro" id="intro"><div class="kick">Empezamos por tu diagnóstico</div><h1>¿Desde dónde lo vas a hacer?</h1>
    <div class="seg">${[['artista','Soy artista o productor'],['profesional','Soy otro profesional de la industria']].map(([v,l])=>`<button data-perfil="${v}" aria-pressed="${S.perfil===v}">${l}</button>`).join('')}</div>
    <div style="margin-top:22px;width:100%">${inp('nombre','Tu nombre o el de tu proyecto')}</div>
    <div class="row" style="margin-top:26px"><button class="btn" data-go="diagnostico">Empezar el diagnóstico →</button><button class="linkbtn" data-intro="0">Volver a leer la intro</button></div>
    <details class="irec"><summary>¿Ya empezaste en otro dispositivo?</summary>
      <textarea id="codeIn" placeholder="Pega tu código ICON1:…"></textarea>
      <div class="row" style="margin-top:10px"><button class="btn alt sm" id="restore">Recuperar</button></div><p class="count" id="restoreMsg"></p></details></section>`;
}
function isDone(id){
  if(id==='diagnostico')return diagScores().done;
  if(id==='mitos')return Object.keys(S.mito).length>=5;
  if(id==='casos')return !!mapaResult();
  if(id==='charlas')return !!val('meLlevo');
  if(id==='plan')return !!(val('paso1')&&val('obj1'));
  if(id==='inicio')return !!S.perfil;
  return !!S.visto[id];
}
function rSteps(cur){
  rStamp();
  $('#steps').innerHTML=STEPS.map(([id,l],i)=>`<button class="st ${id!==cur&&isDone(id)?'ok':''}" data-go="${id}" ${id===cur?'aria-current="step"':''}><span class="n"><span>${i||'·'}</span></span>${l}</button>`).join('');
  const a=$('#steps [aria-current]');if(a)a.scrollIntoView({block:'nearest',inline:'center'});
}
let cur='inicio';
const SOFT={
  casos:['¿Lo tuyo es crear música?','En ICON también te formas en producción y composición con nivel profesional.','p'],
  charlas:['Tres charlas de un programa entero','En ICON das clase todo el curso con más de 80 profesionales en activo de la industria.','m'],
  plan:['Un plan funciona mejor con alguien al lado','En ICON lo trabajas con mentores que lo hacen cada día con artistas reales.','m'],
  hoja:['Ya tienes tu hoja de ruta','Si quieres ir más lejos y más rápido, cuéntanos tu caso.','e']
};
function softCta(id){
  const c=SOFT[id];if(!c)return '';
  const url=c[2]==='e'?CONFIG.equipo.url:iconUrl(c[2]==='p'?CONFIG.ctaUrl2:CONFIG.ctaUrl,id);
  return `<aside class="soft"><div><b>${c[0]}</b><span>${c[1]}</span></div><a href="${esc(url)}" target="_blank" rel="noopener">${c[2]==='e'?'Hablar con el equipo':'Ver el curso'} →</a></aside>`;
}
function go(id,push){
  if(!R[id])id='inicio';clearTimeout(introT);cur=id;S.visto[id]=true;save();
  const i=STEPS.findIndex(s=>s[0]===id),prev=STEPS[i-1],next=STEPS[i+1];
  document.body.classList.toggle('isintro',id==='inicio');document.body.classList.toggle('iswide',id==='hoja');
  $('#main').innerHTML=id==='inicio'?R[id]():R[id]()+softCta(id)+`<div class="nav">${prev?`<button class="btn alt" data-go="${prev[0]}">← ${prev[1]}</button>`:'<span></span>'}${next?`<button class="btn" data-go="${next[0]}" data-next="1">${i===0?'Empezar':next[1]} →</button>`:''}</div>`;
  rSteps(id);
  if(id==='diagnostico'){rDiagRes();updBio();updPil()}
  if(id==='mitos')updMitoCount();
  if(id==='casos'){rMapaRes();afterCaso()}
  if(id==='hoja')showCard();
  if(id==='herramientas')afterTool();
  if(push!==false&&location.hash!=='#'+id){try{history.replaceState(null,'','#'+id)}catch(e){location.hash=id}}
  window.scrollTo(0,0);acompana();
}
function afterCaso(){if(S.casoTab==='lucia')updLucia();if(S.casoTab==='marta')updMarta()}

/* ---------- Eventos ---------- */
document.addEventListener('input',e=>{
  const t=e.target;
  if(t.dataset.k){S[t.dataset.k]=t.value;save();
    if(/^(nombre|bio)/.test(t.dataset.k))updBio();
    if(/^pil(Freq|Horas)$/.test(t.dataset.k))updPil();
    if(t.dataset.k==='tcDinero')rMapaRes();
    return}
  if(t.dataset.met!==undefined){const row=S.met[S.metTab][+t.dataset.met],f=t.dataset.f;row[f]=f==='n'?t.value:numIn(t.value);save();calcMet();return}
  if(t.dataset.lucia){
    const id=t.dataset.lucia;let v=+t.value;
    const other=LUCIA_CATS.reduce((a,x)=>a+(x.id===id?0:(+S.lucia[x.id]||0)),0);
    if(other+v>1000){v=1000-other;t.value=v}
    S.lucia[id]=v;save();updLucia();
  }
});
document.addEventListener('change',e=>{
  const t=e.target;
  if(t.dataset.k){S[t.dataset.k]=t.value;save();if(/^pil/.test(t.dataset.k)){updPil();rMapaRes()}}
  if(t.dataset.prueba){S.prueba[t.dataset.prueba]=t.checked;save();updMitoCount()}
  if(t.dataset.plan!==undefined){S.plan[t.dataset.plan]=t.checked;save()}
});
document.addEventListener('click',()=>setTimeout(acompana,60));
document.addEventListener('click',async e=>{
  const b=e.target.closest('button');if(!b)return;const d=b.dataset;
  if(d.intro!==undefined){introI=+d.intro;go('inicio');return}
  if(d.go){if(d.reto)introI=0;if(d.next&&PUENTE[cur]&&!(S.puente||{})[cur]){puente(cur,d.go);return}go(d.go);return}
  if(d.setk){S[d.setk]=d.v;save();b.parentElement.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));if(/^pil/.test(d.setk)){updPil();rMapaRes()}return}
  if(d.paso){const i=[1,2,3].find(n=>!val('paso'+n));if(!i)return;S['paso'+i]=d.paso;save();const f=$('#f-paso'+i);if(f)f.value=d.paso;b.disabled=true;return}
  if(b.id==='nextMito'){const ids=Object.keys(S.mito);const m=mitoCard();S.cardMito=ids[(ids.indexOf(m.id)+1)%ids.length];save();showCard();return}
  if(b.id==='copyCode'){const code='ICON1:'+btoa(unescape(encodeURIComponent(JSON.stringify(S))));try{await navigator.clipboard.writeText(code);b.textContent='Código copiado';setTimeout(()=>b.textContent='Copiar mi código de guardado',2000)}catch(err){const h=$('#codeHost');h.innerHTML='<p class="count" style="margin-top:10px">Selecciona el código y cópialo:</p><textarea readonly></textarea>';const t=h.querySelector('textarea');t.value=code;t.focus();t.select()}return}
  if(b.id==='restore'){const raw=($('#codeIn').value||'').trim();const msg=$('#restoreMsg');try{if(!raw.startsWith('ICON1:'))throw 0;const o=JSON.parse(decodeURIComponent(escape(atob(raw.slice(6)))));if(!o||typeof o!=='object')throw 0;S=o;['diag','mito','prueba','mapa','lucia','marta','plan','visto','met'].forEach(k=>{if(typeof S[k]!=='object'||!S[k]||Array.isArray(S[k]))S[k]={}});if(!Array.isArray(S.dani))S.dani=[];if(!Array.isArray(S.hist))S.hist=[];Object.keys(MET_DEF).forEach(k=>{if(!Array.isArray(S.met[k]))S.met[k]=JSON.parse(JSON.stringify(MET_DEF[k].ex))});save();introI=1;go('inicio');const m2=$('#restoreMsg');if(m2)m2.textContent='Cuaderno recuperado.'}catch(err){msg.textContent='Ese código no es válido. Cópialo completo, empezando por ICON1:'}return}
  if(b.id==='mcopy'){const Dm=MET_DEF[S.metTab];const t=[Dm.cols.map(c=>c[1]).join('\t'),...S.met[S.metTab].map(r=>Dm.cols.map(c=>r[c[0]]??'').join('\t'))].join('\n');try{await navigator.clipboard.writeText(t);b.textContent='Copiada';setTimeout(()=>b.textContent='Copiar tabla',1800)}catch(err){const h=$('#mcopyHost');h.innerHTML='<textarea class="copyfb" readonly></textarea>';const ta=h.querySelector('textarea');ta.value=t;ta.focus();ta.select()}return}
  if(d.perfil){S.perfil=d.perfil;save();b.parentElement.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));rSteps(cur);return}
  if(d.diag!==undefined){S.diag[d.diag]=+d.v;save();b.parentElement.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));const was=$('#diagRes .big');recordHist();rDiagRes();rSteps(cur);if(!was&&diagScores().done)$('#diagRes').scrollIntoView({behavior:'smooth',block:'start'});return}
  if(b.id==='redo'){S.diag={};save();go('diagnostico');return}
  if(d.open){const r=$('#r-'+d.open);if(r){r.hidden=!r.hidden;b.setAttribute('aria-expanded',!r.hidden)}return}
  if(d.mito){S.mito[d.mito]=d.v;save();b.parentElement.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));const r=$('#r-'+d.mito);if(r&&r.hidden){r.hidden=false;r.scrollIntoView({behavior:'smooth',block:'nearest'})}updMitoCount();rSteps(cur);return}
  if(d.mapa!==undefined){S.mapa[d.mapa]=+d.v;if(+d.mapa===0&&!S.perfil)S.perfil=+d.v===2?'profesional':'artista';save();b.parentElement.querySelectorAll('.opt').forEach(x=>x.classList.toggle('on',x===b));rMapaRes();rSteps(cur);return}
  if(d.ctab){S.casoTab=d.ctab;save();document.querySelectorAll('.ctab').forEach(x=>x.setAttribute('aria-selected',x===b));$('#casoPanel').innerHTML=rCaso(d.ctab);afterCaso();return}
  if(d.dani!==undefined){const i=+d.dani,p=S.dani.indexOf(i);if(p>=0)S.dani.splice(p,1);else if(S.dani.length<3)S.dani.push(i);save();$('#daniOpts').innerHTML=rDaniOpts();return}
  if(d.marta!==undefined){S.marta[d.marta]=d.v;save();b.parentElement.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));updMarta();return}
  if(d.meta){const i=[1,2,3].find(n=>!val('obj'+n));if(!i)return;S['obj'+i]=d.meta;save();const f=$('#f-obj'+i);if(f)f.value=d.meta;b.disabled=true;return}
  if(d.tool){S.toolTab=d.tool;save();document.querySelectorAll('[data-tool]').forEach(x=>x.setAttribute('aria-selected',x===b));$('#toolPanel').innerHTML=rTool(d.tool);afterTool();return}
  if(d.mtab){S.metTab=d.mtab;save();document.querySelectorAll('[data-mtab]').forEach(x=>x.setAttribute('aria-selected',x===b));buildMet();return}
  if(d.mdel!==undefined){S.met[S.metTab].splice(+d.mdel,1);save();buildMet();return}
  if(b.id==='maddr'){S.met[S.metTab].push(JSON.parse(JSON.stringify(MET_DEF[S.metTab].blank)));save();buildMet();return}
  if(b.id==='mclr'){S.met[S.metTab]=[JSON.parse(JSON.stringify(MET_DEF[S.metTab].blank))];save();buildMet();return}
  if(b.id==='cgen'){genCal();return}
  if(b.id==='dlCal'||b.id==='dlHoja'||b.id==='dlHoja2'){const t=b.textContent;b.disabled=true;b.textContent='Preparando…';(b.id==='dlCal'?dlCalXlsx():dlHojaPdf()).catch(()=>{b.textContent='No se pudo crear';}).then(()=>{b.disabled=false;if(b.textContent==='Preparando…')b.textContent=t});return}
  if(b.id==='ccopy'){try{await navigator.clipboard.writeText(S.calText);b.textContent='Copiado';setTimeout(()=>b.textContent='Copiar calendario',1800)}catch(err){const h=$('#cph');let t=h.querySelector('textarea');if(!t){t=document.createElement('textarea');t.className='copyfb';t.readOnly=true;h.after(t)}t.value=S.calText;t.focus();t.select()}return}
  if(b.id==='copyAll'){const t=hojaText();try{await navigator.clipboard.writeText(t);b.textContent='Copiada';setTimeout(()=>b.textContent='Copiar mi hoja de ruta',1800)}catch(err){const h=$('#copyHost');h.innerHTML='<p class="count" style="margin-top:10px">Selecciona el texto y cópialo:</p><textarea class="copyfb" readonly></textarea>';const ta=h.querySelector('textarea');ta.value=t;ta.focus();ta.select()}return}
  if(b.id==='mkCard'){b.disabled=true;await showCard();b.disabled=false;return}
});
window.addEventListener('hashchange',()=>{const h=location.hash.slice(1);if(h&&h!==cur)go(h,false)});
go(location.hash.slice(1)||'inicio',false);
