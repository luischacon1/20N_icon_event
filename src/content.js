/* ============================================================
   EDITA AQUÍ · datos del evento
   draft:true muestra en amarillo los huecos pendientes. Ponlo en false antes de enviarlo:
   entonces los huecos vacíos desaparecen y la página queda limpia.
   ============================================================ */
export const CONFIG = {
  draft: false,
  eventName: 'Marca personal y redes',
  eventDate: '20 · 11 · 2026',
  venue: 'Universidad Nebrija',
  logos: {teal:'assets/logo-teal.png', light:'assets/logo-light.png', dark:'assets/logo-dark.png'},
  fotos: {portada:'assets/fotos/portada.jpg', mesa:'assets/fotos/mesa.jpg'},

  /* ACCESO · la contraseña no se guarda en claro: aquí va su SHA-256 (en minúsculas y sin espacios).
     Contraseña actual: ICONREDES. Para cambiarla: npm run hash -- "NuevaClave" y pega aquí el resultado. */
  passwordHash: '43e98cc6d57fd6aa865063196cf48cd7002ef260d40f810a5685bd9599c60547',

  /* RETO · un mes; gana diagnóstico de carrera + asesoría 1:1 quien más alcance consiga etiquetando a la cuenta */
  reto: {
    cuenta: '@iconmbs',
    cuentaUrl: 'https://www.instagram.com/iconmbs/',
    fin: '2026-12-20T23:59:59+01:00',
    finTexto: '20 de diciembre'
  },

  /* CTA final: hablar con el equipo */
  equipo: {
    url: 'https://wa.link/sncxr2',   // WhatsApp con un comercial; lleva el mensaje «Desde el evento quiero formarme con vosotros»
    boton: 'Habla con nuestro equipo',
    email: 'hello@iconmbs.com'
  },
  /* Página de profesores: se enlaza siempre que se habla del claustro */
  profesoresUrl: 'https://iconmbs.com/profesores/',

  /* Se añade a todos los enlaces a iconmbs.com; utm_content lleva el paso desde el que se hizo clic */
  utm: {utm_source:'cuaderno', utm_medium:'recurso-evento', utm_campaign:'marca-personal-20nov26'},

  /* Si true, en Mito o realidad solo salen las frases que tengan algo en "dijeron" */
  soloDebatidas: false,
  courseName: 'Curso Superior en Music Business',
  ctaUrl: 'https://iconmbs.com/',
  courseName2: 'Curso Superior en Producción y Composición',
  ctaUrl2: 'https://iconmbs.com/produccion-y-composicion/',
  hashtag: '#RetoICON',
  footer: 'Tus respuestas se guardan solo en este navegador. Las opiniones de los ponentes son suyas: sirven para pensar, no son reglas.'
};

/* ============================================================
   MITO O REALIDAD · las frases del debate (máximo 10; si en el evento se debaten otras, cámbialas aquí)
   dijeron: [{q:'Nombre del ponente', v:'mito'|'realidad'|'depende', f:'Frase o idea que dijo'}]
   ============================================================ */
/* Quién es cada ponente. Se muestra allí donde se cita a alguien, para quien no estuvo en el evento. */
export const PONENTES = {
  'Anna Pavlyuk':{rol:'Estratega de contenido y crecimiento en redes', bio:'Hace crecer cuentas sin publicidad: millones de visualizaciones orgánicas para artistas, sellos y marcas.'},
  'César Manzanera':{rol:'Fundador de Witis', bio:'Dirige Witis, agencia de comunicación especializada en música, tras más de diez años en agencias.'},
  'Álvaro Rebollo':{rol:'Fundador de Los Amigos Digitales', bio:'Más de 15 años al frente del marketing digital y el streaming en BMG y Sony Music. Hoy dirige su propia agencia digital para música.'},
  'María Muñoz':{rol:'Digital Marketing Manager en The Orchard', bio:'Ha trabajado en más de 150 lanzamientos de artistas y sellos.'},
  'Ro Sánchez':{rol:'Brand & Product Manager en BASE85', bio:'Empezó como periodista musical y hoy desarrolla la carrera de artistas desde el management.'},
  'Jorge Platero':{rol:'Comunicación y contenido digital en Movistar Arena', bio:'Forma parte del equipo de El Podcast del Movistar Arena, por donde pasan los artistas que actúan en el recinto.'}
};

/* Las frases que se debatieron en el evento. «dijeron» resume en nuestras palabras la postura de cada ponente. */
export const MITOS = [
 {g:'', items:[
  {id:'e1',t:'Hay una hora mágica para publicar.',
   w:'Las estadísticas de cada red te dicen cuándo está conectada tu audiencia, y de ahí sale la idea de una hora perfecta.',
   x:'Publica el mismo tipo de pieza a tres horas distintas durante tres semanas y compara. Mira si manda la hora o la pieza.',
   dijeron:[{q:'César Manzanera',v:'mito',f:'Si todo el mundo publicara a la hora «buena», las redes se colapsarían. Es prueba y error: el mismo vídeo funciona un domingo y pincha al siguiente.'},
     {q:'Anna Pavlyuk',v:'mito',f:'Las redes van como un péndulo: cuando todos publican a las ocho, gana quien no lo hace. Un contenido bueno puede subirse de madrugada y despegar por la mañana.'}]},
  {id:'e2',t:'Si un vídeo no funciona en la primera hora, está muerto.',
   w:'Un buen arranque ayuda a que la plataforma lo enseñe más, así que parece que todo se decide al principio.',
   x:'Vuelve a mirar a los 7 y a los 30 días una pieza que dabas por muerta.',
   dijeron:[{q:'Álvaro Rebollo',v:'mito',f:'Arrancar fuerte ayuda, pero para quien no lo ha visto el vídeo es nuevo: puede empezar a conectar mucho después.'},
     {q:'César Manzanera',v:'mito',f:'Instagram era más cronológico; TikTok enseña vídeos sin importar cuándo se publicaron.'}]},
  {id:'e3',t:'Cada red necesita un contenido distinto.',
   w:'Cada plataforma nació con un formato y un público, y se sigue repitiendo que lo que vale en una no vale en otra.',
   x:'Sube la misma pieza a dos redes y compara retención y compartidos, no visualizaciones.',
   dijeron:[{q:'Anna Pavlyuk',v:'mito',f:'Un vídeo bueno le ha funcionado en las dos, con cifras parecidas. El algoritmo no es un ente aparte: es cómo consumimos.'},
     {q:'Álvaro Rebollo',v:'depende',f:'Las redes se parecen cada vez más (reels, shorts, TikTok), aunque el «Para ti» de TikTok sigue siendo distinto.'}]},
  {id:'e4',t:'Archivar las publicaciones que no funcionaron mejora tu cuenta.',
   w:'Un perfil con piezas de pocas cifras da peor impresión, y se asume que también pesa en el alcance.',
   x:'Antes de archivar nada, apunta qué tenían en común las piezas que no funcionaron.',
   dijeron:[{q:'César Manzanera',v:'mito',f:'Sirve para la imagen (una nueva etapa, o que un promotor vea mejores cifras), pero no cree que mejore el rendimiento del perfil.'}]},
  {id:'e5',t:'Las fotos y los carruseles ya no sirven: solo funcionan los reels.',
   w:'El vídeo es lo que más crece, y parece que todo lo demás ha dejado de contar.',
   x:'Mira en tus estadísticas qué porcentaje de no seguidores vio tu último reel y tu último carrusel.',
   dijeron:[{q:'Anna Pavlyuk',v:'depende',f:'El reel es lo que te lleva a gente que no te sigue; el carrusel se queda casi todo entre tus seguidores. Uno hace alcance, el otro comunidad.'},
     {q:'César Manzanera',v:'depende',f:'Fotos para dentro, para tu comunidad. Vídeos para llegar fuera.'},
     {q:'Álvaro Rebollo',v:'depende',f:'Conviene tener de todo: cada formato cumple una función.'}]},
  {id:'e6',t:'Las plataformas penalizan el contenido hecho con inteligencia artificial.',
   w:'Las plataformas marcan el contenido hecho con IA, y eso se interpreta como un castigo.',
   x:'Si usas IA, publica una pieza con ella y otra sin ella, y compara comentarios y compartidos.',
   dijeron:[{q:'Álvaro Rebollo',v:'realidad',f:'Se ha penalizado y se marca, pero cree que cambiará si al público deja de importarle.'},
     {q:'César Manzanera',v:'depende',f:'En música y derechos queda mucho por resolver. En contenido, si está bien hecho, no han visto penalización.'},
     {q:'Anna Pavlyuk',v:'realidad',f:'Cuando se nota, funciona peor, sobre todo en Instagram. Lo que se puede producir en masa se percibe menos auténtico: hoy lo orgánico vale más.'}]},
  {id:'e7',t:'TikTok es imprescindible para lanzar una carrera musical.',
   w:'Muchos éxitos recientes han nacido ahí, y parece que no hay otro camino.',
   x:'Elige un canal principal en el que puedas ser constante y otro de apoyo, y mide cada uno por separado.',
   dijeron:[{q:'Álvaro Rebollo',v:'depende',f:'Tiene sentido estar donde esté tu audiencia, y eso depende del proyecto.'},
     {q:'Anna Pavlyuk',v:'mito',f:'Hay artistas que no hacen nada en TikTok. No es para todo el mundo.'},
     {q:'César Manzanera',v:'depende',f:'Si ya tienes el contenido, no pierdas esa oportunidad de alcance por pereza.'}]},
  {id:'e8',t:'Los números en redes valen más que la calidad de la música.',
   w:'Las cifras son fáciles de comparar, y muchos profesionales las miran antes de escuchar.',
   x:'Prepara un dosier de una página con tus cifras reales, tu comunidad y tu plan, y pon la música lo primero.',
   dijeron:[{q:'César Manzanera',v:'depende',f:'Muchos promotores miran el número antes de escuchar. Aun así, lo que sostiene un proyecto es que dure: tres, cuatro, cinco años.'},
     {q:'Anna Pavlyuk',v:'mito',f:'El talento sigue primando: da igual quién te ponga delante, si a la gente no le gusta no se queda.'},
     {q:'Álvaro Rebollo',v:'depende',f:'No son comparables: las cifras son cifras, y qué es buena música es muy relativo.'}]},
  {id:'e9',t:'Si dejas de publicar unas semanas, la plataforma te penaliza.',
   w:'Cuando vuelves tras un parón las primeras piezas suelen ir flojas, y se achaca a un castigo.',
   x:'Si necesitas parar, para. Al volver, compara tu primera pieza con tu media anterior.',
   dijeron:[{q:'Anna Pavlyuk',v:'mito',f:'La plataforma quiere vídeos que retengan a la gente. Si vuelves con uno bueno, lo volverá a mostrar.'}]},
  {id:'e10',t:'Si pagas publicidad, pierdes alcance orgánico.',
   w:'Corre la idea de que, en cuanto pagas, la plataforma te obliga a seguir pagando.',
   x:'Promociona solo una pieza que ya haya funcionado sin pagar y compara el coste por seguidor nuevo.',
   dijeron:[{q:'Álvaro Rebollo',v:'mito',f:'Las plataformas dicen que una cosa apoya a la otra. La publicidad acelera lo que ya funciona; no arregla lo que no funciona.'},
     {q:'César Manzanera',v:'depende',f:'El contenido orgánico es el que te posiciona. Pagar tiene sentido en el lanzamiento de un single, que es donde el público lo ve lógico.'}]},
  {id:'e11',t:'Un viral te puede hacer más daño que bien.',
   w:'Parece imposible que algo tan bueno perjudique. Puede pasar si la gente conoce la canción y no a ti.',
   x:'Escribe qué harías en las dos semanas siguientes a un viral: cómo te presentas y a dónde llevas a la gente.',
   dijeron:[{q:'Anna Pavlyuk',v:'depende',f:'Un viral hace que te vean; la marca, que te recuerden. En la industria se habla del «artista TikTok»: cae bien, pero le cuesta vender entradas.'},
     {q:'Álvaro Rebollo',v:'depende',f:'Hubo sellos que pagaron grandes adelantos por artistas virales que luego no funcionaron. El salto del vídeo corto al concierto es difícil.'}]},
  {id:'e12',t:'Un manager o un productor no necesita marca personal.',
   w:'El foco debe estar en el artista, y quien trabaja detrás suele preferir no exponerse.',
   x:'Escribe en una frase a quién ayudas y cómo. Si no te sale en 15 segundos, tu perfil tampoco lo dice.',
   dijeron:[{q:'Anna Pavlyuk',v:'mito',f:'Quien construya su marca dentro de la industria parte con ventaja: es más fácil que un artista te escuche. No hace falta salir en cámara; puedes entrevistar a otros.'},
     {q:'Ro Sánchez',v:'depende',f:'No hace falta ser influencer. Tu red profesional es tu plataforma: salas, eventos y un LinkedIn al día.'},
     {q:'María Muñoz',v:'realidad',f:'Prefiere a un manager en segundo plano: que te conozcan dentro de la industria importa más que publicar.'}]},
  {id:'e13',t:'Pagar por entrar en playlists ayuda a arrancar.',
   w:'Una cifra alta de oyentes da sensación de éxito y parece un atajo.',
   x:'Compara tus oyentes mensuales con tus seguidores y tus guardados en Spotify for Artists.',
   dijeron:[{q:'Álvaro Rebollo',v:'mito',f:'Va contra las normas de Spotify, puede haber bots detrás y te puede penalizar. Si ves escuchas raras, avisa desde Spotify for Artists.'},
     {q:'María Muñoz',v:'mito',f:'Son escuchas vacías: se van cuando sales de la playlist. No puedes basar tu estrategia en eso.'}]}]}
];

/* ============================================================
   CASOS DE LA MESA REDONDA
   propuestas: [{q:'Nombre del ponente', f:'Lo que propuso en una o dos frases'}]
   ============================================================ */
export const CASOS = {
  lucia:{n:'Lucía', m:'22 años · cantautora pop · Madrid',
    d:'600 seguidores en Instagram (casi todos amigos). Dos canciones con 3.000 escuchas entre las dos y una tercera lista para sacar. Presupuesto: 1.000 €. Plazo: tres meses.',
    reto:'¿Qué harías con ese presupuesto y ese plazo para que la tercera canción llegue a más gente que las dos primeras?',
    tabla:{punto:'Empieza de cero',aud:'Amigos y conocidos',freno:'No la conoce nadie',rec:'1.000 € y tres meses'},
    propuestas:[
      {q:'María Muñoz',f:'Con dos o tres canciones no retienes a quien llega a tu perfil: antes de gastar, ten cinco o seis. Si pones dinero en anuncios (unos 200 €), que sea para volver a llegar a quien ya te ha escuchado. Y graba un videoclip barato con tus amigos para que lo compartan.'},
      {q:'Ro Sánchez',f:'Pondría los 1.000 € en la música: canciones bien producidas. El contenido no necesita gran producción, sino frecuencia y contar el proceso. Y trabajaría el proyecto fuera de redes: playlists independientes de tu género, concursos de bandas y prescriptores que descubren artistas nuevos.'},
      {q:'Jorge Platero',f:'Lo dedicaría a crear contenido de calidad y a rodearme de equipo, sin esperar milagros. Presentarse a concursos da visibilidad ante promotores. Y preguntaría a su comunidad: hasta artistas que llenan recintos dejan que sus fans elijan canciones.'}]},
  dani:{n:'Dani', m:'26 años · productor y artista urbano',
    d:'Un tema viral en TikTok hace seis meses (150.000 seguidores, 2 millones de reproducciones). Los siguientes lanzamientos no pasan de 20.000 escuchas. La gente conoce la canción, no a él. Tiene ofertas de un sello y de una marca de ropa.',
    reto:'¿Qué decisiones tomarías en los próximos meses para que la gente le siga a él y no solo a una canción?',
    tabla:{punto:'Tiene números, no marca',aud:'Grande pero de paso',freno:'El interés no se mantiene',rec:'Dos ofertas encima de la mesa'},
    propuestas:[
      {q:'María Muñoz',f:'Usaría esos números para ir a lo pequeño: colaborar con artistas de nicho que tengan un público comprometido, en vez de perseguir a uno grande. Sello sí, pero proyecto a proyecto, sin atarse varios años.'},
      {q:'Ro Sánchez',f:'20.000 escuchas en alguien que acaba de empezar es un buen dato: es la temperatura real de su audiencia. Trabajaría esos temas con microcreadores. Y solo firmaría con un sello o una marca que encajen con quien es.'},
      {q:'Jorge Platero',f:'Que celebre el éxito y use ese dinero para construirse como artista. Tener oyentes no es vender entradas, y el directo no engaña. Mucho cuidado con lo que firma.'}]},
  marta:{n:'Marta', m:'30 años · manager y tour manager',
    d:'Cinco años trabajando en la sombra. Quiere montar su propia oficina y captar artistas, pero en redes no existe: un LinkedIn desactualizado y un Instagram privado. No quiere convertirse en influencer.',
    reto:'¿Cómo construirías su presencia para que le lleguen sus primeros artistas sin que tenga que exponerse más de lo que quiere?',
    tabla:{punto:'Experiencia sin visibilidad',aud:'Red profesional, no público',freno:'No quiere exponerse',rec:'Cinco años de trabajo que contar'},
    propuestas:[
      {q:'Ro Sánchez',f:'No necesita ser influencer. Lleva cinco años en salas y giras: su red profesional es su plataforma. Que actualice LinkedIn, vaya a eventos y escuche a muchos artistas nuevos.'},
      {q:'Jorge Platero',f:'La industria es más pequeña de lo que parece y todos se conocen. Lo importante es dejarse ver en conciertos y encuentros del sector.'},
      {q:'María Muñoz',f:'Mejor en segundo plano que de cara al público. Las oportunidades salen de que te conozcan dentro; y con algo de cara: escribir directamente al artista con el que quieres trabajar.'}]}
};

/* ============================================================
   CHARLAS
   {q:'Ponente', t:'Título de la charla', ideas:['Idea 1','Idea 2','Idea 3'], p:'Pregunta para el alumno'}
   ============================================================ */
export const CHARLAS = [
  {img:'assets/fotos/ana.jpg', q:'Anna Pavlyuk · Estratega de contenido y crecimiento en redes', t:'El talento no es suficiente',
   ideas:['La música también es un negocio. El talento te hace bueno, pero no garantiza que te conozcan.',
     'No tienes 80.000 balas: cuida cada vídeo como cuidas cada canción. Mejor dos buenos a la semana que ocho flojos.',
     'Tu perfil no es un catálogo. Nadie entra en redes a que le vendan algo: que sea un sitio donde quedarse.',
     'No comuniques como una superestrella si aún no te conoce nadie. La gente conecta con quien siente que ha descubierto.',
     'Un viral hace que te vean; la marca, que te recuerden.',
     'Una canción no caduca a los 15 días: puedes seguir empujándola meses después.',
     'Esto vale también para managers, A&R y productores.'],
   p:'¿Cuál de estos errores estás cometiendo ahora y qué vas a cambiar esta semana?'},
  {img:'assets/fotos/alvaro.jpg', q:'Álvaro Rebollo · Fundador de Los Amigos Digitales', t:'Qué mirar de verdad en los datos',
   ideas:['Las redes no son tuyas: cambian las reglas, o desaparecen, de un día para otro.',
     'En redes, mira comentarios y compartidos antes que seguidores y me gusta.',
     'En YouTube, la retención: ¿se quedan hasta el final?',
     'En Spotify, compara oyentes con seguidores y guardados. Muchos oyentes y muy pocos seguidores es escucha pasiva.',
     'No es lo mismo que te suenen en una playlist que que te busquen y te guarden.',
     'Pagar por entrar en playlists va contra las normas de Spotify y te puede penalizar.',
     'Está donde esté tu audiencia, no en todas las redes.'],
   p:'¿Qué dato mirabas antes que no te ayuda a decidir, y cuál vas a mirar ahora?'},
  {img:'assets/fotos/maria.jpg', q:'María Muñoz · Digital Marketing Manager en The Orchard', t:'De seguidores a comunidad',
   ideas:['Tener oyentes no es tener fans: de miles de seguidores, muy pocos compran una entrada.',
     'Tu proyecto no es un centro comercial; es un club al que apetece pertenecer.',
     'La pregunta clave: ¿pasa algo entre tus fans cuando tú no publicas?',
     'Cuatro vínculos: qué defendemos, contra qué vamos, cómo nos reconocemos y qué hacemos juntos.',
     'Crea una cita fija: el mismo día, el mismo tipo de pieza.',
     'Involucra a tus fans en decisiones y dales material con el que crear.',
     'Sácalos del algoritmo: un canal o una lista de correo, siempre dando algo a cambio.'],
   p:'¿Qué vas a hacer esta semana para que alguien de tu audiencia pase de mirar a participar?'}
];

/* El consejo con el que cerró cada ponente */
export const CONSEJOS = [
  {q:'Anna Pavlyuk',f:'Deja de vivir las redes como una queja. Hoy tienes miles de oportunidades al año de que alguien te escuche, y gratis.'},
  {q:'César Manzanera',f:'No llores, rodéate de gente que sea sincera con tu proyecto y échale morro: el «no» ya lo tienes.'},
  {q:'Álvaro Rebollo',f:'Sé tú. No estés en todas las redes porque sí, y recuerda que van y vienen.'},
  {q:'María Muñoz',f:'Primero, la música. Si la estrategia funciona y la canción no gusta, el problema no es la estrategia.'},
  {q:'Jorge Platero',f:'Pásalo bien y sé fiel a ti. Es una industria dura, pero merece la pena.'},
  {q:'Ro Sánchez',f:'Persevera. No busques el éxito rápido: el camino se hace piedra a piedra.'}
];

/* ============================================================
   RECURSOS (paso Herramientas)
   ============================================================ */
export const RESOURCES = [
  {g:'Dónde ver tus datos', s:'Los paneles oficiales de cada plataforma y guías para entenderlos.', l:[
    {t:'Spotify for Artists', u:'https://artists.spotify.com', d:'Oyentes, reproducciones, guardados, ciudades y segmentos de audiencia. Gratis al reclamar tu perfil de artista.'},
    {t:'Segmentos de audiencia en Spotify for Artists', u:'https://artists.spotify.com/es/blog/introducing-new-audience-segmentation-on-spotify-for-artists', d:'Artículo oficial sobre cómo se divide tu audiencia y qué hacer con cada grupo.'},
    {t:'YouTube Studio', u:'https://studio.youtube.com', d:'Retención, fuentes de tráfico y qué vídeos te traen suscriptores.'},
    {t:'Instagram para creadores', u:'https://creators.instagram.com', d:'Guía oficial de formatos, estadísticas y buenas prácticas.'},
    {t:'Instagram Analytics para músicos explicado', u:'https://routenote.com/es/blog/instagram-analytics-para-musicos-explicado/', d:'Guía de RouteNote para entender las estadísticas de Instagram aplicadas a la música.'},
    {t:'Las mejores herramientas de analítica musical', u:'https://soundcharts.com/es/blog/music-analytics-tools', d:'Comparativa de Soundcharts de herramientas de analítica para artistas y managers.'}]},
  {g:'Para seguir aprendiendo', s:'Lecturas para ampliar lo que se habló en el evento.', l:[
    {t:'Social Media 101 (OneRPM, PDF)', u:'https://dashboard.onerpm.com/assets/files/ES_Social_Media_101_Guide.pdf', d:'Guía de redes sociales para artistas, en español.'},
    {t:'10 consejos de redes para músicos y bandas', u:'https://dittomusic.com/es/blog/10-essential-social-media-tips-for-musicians-and-bands', d:'Artículo de Ditto Music con consejos básicos de redes.'},
    {t:'20 herramientas gratuitas para artistas independientes', u:'https://imusician.pro/es/recursos-practicos/blog/20-herramientas-gratuitas-para-artistas-independientes', d:'Recopilación de iMusician con herramientas para crear, distribuir y promocionar.'}]},
  {g:'Para crear contenido', s:'Gratis o con versión gratuita.', l:[
    {t:'Canva', u:'https://www.canva.com', d:'Portadas, carruseles y plantillas de story sin saber diseño.'},
    {t:'CapCut', u:'https://www.capcut.com', d:'Edición de vídeo corto con plantillas y subtítulos automáticos.'}]}
];
/* Contenido propio de ICON para ampliar: {t:'Título', u:'https://…', d:'Descripción'} */
export const LECTURAS_ICON = [];

/* ============================================================
   GENERADOR DE CALENDARIO: ideas por perfil y semana
   ============================================================ */
export const CAL_WEEKS = {
  artista:[
    {n:'Semana 1 · Quién eres', i:[
      {f:'Reel / TikTok', t:'Presentación en 15 segundos: quién eres y qué música haces', h:'Soy [tu nombre] y hago [género] para [a quién]'},
      {f:'Reel / TikTok', t:'Un fragmento de tu mejor canción con la letra en pantalla', h:'Esto lo escribí cuando…', cta:1},
      {f:'Story', t:'Encuesta: ¿qué canción te define más?', h:'Ayúdame a elegir'},
      {f:'Carrusel', t:'3 referencias que explican tu sonido', h:'Si te gusta X, esto te va a gustar'},
      {f:'Foto / Post', t:'Una imagen que resuma tu identidad con un pie de foto personal'}]},
    {n:'Semana 2 · Cómo lo haces', i:[
      {f:'Reel / TikTok', t:'Cómo nació una canción: de la maqueta al resultado', h:'Así empezó esta canción'},
      {f:'Reel / TikTok', t:'Antes y después de una producción', h:'Escucha cómo cambió', cta:1},
      {f:'Story', t:'Caja de preguntas sobre tu proceso creativo', h:'Pregúntame lo que quieras'},
      {f:'Carrusel', t:'5 cosas que aprendiste haciendo tu última canción'},
      {f:'Foto / Post', t:'Tu estudio o local de ensayo con una anécdota'}]},
    {n:'Semana 3 · Tu gente', i:[
      {f:'Reel / TikTok', t:'Responde con un vídeo a un comentario de tu audiencia', h:'Me preguntaron esto…'},
      {f:'Story', t:'Invita a tu lista de difusión o comunidad', h:'Esto se lo cuento primero a quienes estáis dentro', cta:1},
      {f:'Directo corto', t:'Tres canciones en acústico y preguntas en directo'},
      {f:'Carrusel', t:'Lo que ha hecho tu audiencia con tu música (con su permiso)'},
      {f:'Story', t:'Pregunta del día para abrir conversación'}]},
    {n:'Semana 4 · Lanzar y mover', i:[
      {f:'Reel / TikTok', t:'Teaser de lo próximo con cuenta atrás', h:'En unos días os enseño algo'},
      {f:'Reel / TikTok', t:'Anuncio claro con enlace y fecha', h:'Ya está aquí', cta:1},
      {f:'Story', t:'Cuenta atrás y recordatorio de la fecha'},
      {f:'Carrusel', t:'Balance del mes: qué funcionó y qué aprendiste, con datos'},
      {f:'Directo', t:'Sesión en directo para celebrar el lanzamiento'}]}
  ],
  profesional:[
    {n:'Semana 1 · Quién eres', i:[
      {f:'Post (LinkedIn)', t:'Tu historia en cinco líneas: qué haces, para quién y desde cuándo', h:'Hace [X] años empecé…'},
      {f:'Post (LinkedIn)', t:'El servicio que ofreces y a quién ayuda', h:'Ayudo a [perfil] a [resultado]', cta:1},
      {f:'Story / carrusel', t:'3 cosas que aprendiste en gira o estudio'},
      {f:'Foto / Post', t:'Tu espacio de trabajo o tu rutina en un día de bolo'},
      {f:'Comentarios', t:'Aporta valor en publicaciones de otros profesionales del sector'}]},
    {n:'Semana 2 · Tu criterio', i:[
      {f:'Carrusel', t:'5 errores que ves al lanzar música', h:'Lo veo a diario'},
      {f:'Post (LinkedIn)', t:'Tu opinión sobre un mito del sector', h:'Lo que más se dice y menos se cumple', cta:1},
      {f:'Story', t:'Responde la pregunta de un artista'},
      {f:'Post (LinkedIn)', t:'Checklist para preparar un lanzamiento o una gira'},
      {f:'Comentarios', t:'Responde con experiencia propia en posts de colegas'}]},
    {n:'Semana 3 · Tu trabajo', i:[
      {f:'Caso (LinkedIn)', t:'Qué hicisteis y qué resultado tuvo (con permiso del artista)', h:'El reto era…'},
      {f:'Post', t:'Mención o testimonio de un artista con quien trabajas', cta:1},
      {f:'Story', t:'Detrás de cámaras de un proyecto, sin datos sensibles'},
      {f:'Post (LinkedIn)', t:'Un error y qué cambiaste después', h:'Me equivoqué en…'},
      {f:'Story', t:'Un día de bolo o de estudio'}]},
    {n:'Semana 4 · Tu oferta', i:[
      {f:'Post (LinkedIn)', t:'Cómo trabajas, paso a paso', h:'Así es mi proceso'},
      {f:'Post (LinkedIn)', t:'Llamada a los artistas con los que quieres trabajar', h:'Busco proyectos que…', cta:1},
      {f:'Story / encuesta', t:'¿Qué es lo más difícil de lanzar música?'},
      {f:'Post', t:'Recursos que usas: plantillas o listas'},
      {f:'Post (LinkedIn)', t:'Resumen del mes con aprendizajes'}]}
  ]
};
export const CAL_CTA = {
  cancion:'Enlace a la canción en la bio y pide que la guarden.',
  comunidad:'Invita a unirse a tu lista de difusión o newsletter.',
  directo:'Enlace a entradas y recordatorio de la fecha.',
  profesional:'Invita a escribirte por mensaje directo.'
};
export const CAL_DAYS = {1:[2],2:[1,4],3:[0,2,4],4:[0,1,3,5],5:[0,1,2,3,4]};

/* Plan de cuatro semanas por área y perfil */
export const AREAS = {
  identidad:{l:'Identidad', plan:{
    artista:['Pon tu frase (quién eres, qué música haces y para quién) en tu bio.','Revisa tus 9 últimas publicaciones: ¿se reconoce que son tuyas sin ver el nombre?','Escribe qué partes de tu vida son públicas y cuáles no, y cúmplelo toda la semana.','Haz la prueba de los 10 segundos con tres personas y ajusta tu perfil.'],
    profesional:['Pon tu frase (a quién ayudas y cómo) en tu titular de LinkedIn y en tu bio.','Revisa tu perfil: ¿se entiende a qué te dedicas en diez segundos?','Escribe qué partes de tu vida son públicas y cuáles no, y cúmplelo toda la semana.','Haz la prueba de los 10 segundos con tres personas y ajusta tu perfil.']}},
  contenido:{l:'Contenido', plan:{
    artista:['Elige tus 3 temas fijos y un ritmo que puedas mantener tres meses.','Apunta 12 ideas: cuatro por cada tema.','Graba en un solo día el contenido de toda la semana.','Enseña cómo haces una canción, no solo el resultado.'],
    profesional:['Elige tus 3 temas de trabajo y un ritmo que puedas mantener (una publicación a la semana vale).','Apunta 12 ideas: cuatro casos, cuatro aprendizajes y cuatro opiniones.','Escribe un caso de trabajo: qué pasaba, qué hiciste y qué resultado tuvo.','Publica tu opinión sobre uno de los mitos del paso 2.']}},
  datos:{l:'Datos', plan:{
    artista:['Apunta cada semana tres cifras: visitas al perfil, guardados y compartidos.','Busca tus 3 mejores piezas del mes y qué tienen en común.','Prueba un solo cambio a la vez (arranque, duración o formato) y compara.','Mira en Spotify for Artists de qué ciudades y de qué fuentes llega tu audiencia.'],
    profesional:['Apunta cada semana cuántas conversaciones de trabajo has tenido y de dónde vinieron.','Mira qué publicaciones te trajeron visitas al perfil o mensajes.','Pregunta a tus tres últimos clientes o artistas cómo te encontraron.','Decide en qué canal pones más tiempo según lo que has visto.']}},
  comunidad:{l:'Comunidad', plan:{
    artista:['Responde a todos los comentarios y mensajes en menos de 24 horas.','Haz una pregunta abierta a tu audiencia y publica lo que respondan.','Localiza a tus 10 seguidores más activos y escríbeles a mano.','Propón algo concreto a tu audiencia: votar, compartir o venir a un directo.'],
    profesional:['Responde en menos de 24 horas a todos los mensajes de trabajo.','Escribe a cinco personas del sector con las que hace tiempo que no hablas.','Comenta con criterio en publicaciones de colegas tres veces a la semana.','Ve a un evento del sector y escribe después a dos personas que conociste.']}},
  conversion:{l:'Conversión', plan:{
    artista:['Cambia tu bio para que diga qué hacer: escucharte, seguirte o venir a verte.','Crea un canal propio (lista de difusión, newsletter o grupo) y enlázalo.','Añade una llamada a la acción clara a cada publicación de la semana.','Haz un directo o un concierto pequeño y cuenta cuánta gente de tu audiencia acude.'],
    profesional:['Cambia tu perfil para que diga cómo contratarte o escribirte.','Prepara un dosier de una página con lo que haces y dos o tres casos.','Termina cada publicación de la semana con una invitación a escribirte.','Pide a dos artistas o clientes una recomendación por escrito.']}}
};
/* Diagnóstico: t = igual para los dos perfiles · a/p = versión artista / profesional */
export const TEST = {
  identidad:[
    {a:'Puedo explicar en una frase quién soy, qué música hago y para quién.', p:'Puedo explicar en una frase a quién ayudo y cómo.'},
    {a:'Quien ve mis últimas 9 publicaciones entiende qué música hago sin leer la bio.', p:'Quien mira mi perfil entiende a qué me dedico sin tener que preguntarme.'},
    {t:'Tengo claro qué parte de mi vida comparto y cuál no.'}],
  contenido:[
    {a:'Tengo 2 o 3 temas fijos sobre los que publico.', p:'Tengo 2 o 3 temas de mi trabajo sobre los que puedo hablar con criterio.'},
    {t:'Publico a un ritmo que puedo mantener, aunque sea una vez por semana.'},
    {t:'Tengo ideas apuntadas para las próximas semanas y no improviso cada día.'},
    {a:'Enseño cómo hago mi música, no solo el resultado.', p:'Enseño mi trabajo con casos concretos, no solo con frases genéricas.'}],
  datos:[
    {a:'Sé cuáles fueron mis 3 mejores publicaciones del último mes y por qué.', p:'Sé qué publicaciones o contactos me han traído conversaciones de trabajo.'},
    {a:'Miro guardados, compartidos y oyentes que repiten, no solo likes y reproducciones.', p:'Sé de dónde me llegan los proyectos: recomendaciones, redes o eventos.'},
    {t:'Alguna vez he cambiado algo por lo que me decían mis datos.'}],
  comunidad:[
    {a:'Respondo comentarios y mensajes en menos de 24 horas.', p:'Respondo a los mensajes de artistas y colegas en menos de 24 horas.'},
    {a:'Conozco por su nombre a personas que me apoyan a menudo.', p:'Hablo de forma regular con un grupo de personas del sector.'},
    {a:'Colaboro o me relaciono con otros artistas de mi escena.', p:'Voy a eventos del sector y escribo después a la gente que conozco.'}],
  conversion:[
    {a:'Mi bio dice qué hacer: escucharme, seguirme o venir a verme.', p:'Mi perfil dice claramente cómo contratarme o escribirme.'},
    {a:'Tengo un canal propio fuera de las redes (lista de difusión, newsletter o grupo).', p:'Tengo un sitio donde se ve mi trabajo: web, dosier o LinkedIn actualizado.'},
    {a:'He conseguido que mi audiencia haga algo fuera de la pantalla: venir a un concierto, comprar o guardar mi música.', p:'Alguna vez me ha llegado un proyecto gracias a lo que publico.'}]
};
export const AREA_INTRO = {
  identidad:'Si la gente entiende quién eres.',
  contenido:'Qué publicas y si lo puedes mantener.',
  datos:'Si miras lo que funciona y decides con ello.',
  comunidad:'La relación con quien ya te sigue o te conoce.',
  conversion:'Si consigues que la gente dé el siguiente paso.'
};
export const LIK = [['No',0],['A medias',1],['Sí',2]];
export const LEVELS = [
  [0,'Arrancando','Estás al principio y eso es una ventaja: todo lo que hagas a partir de hoy se nota. Céntrate en una sola área.'],
  [35,'Construyendo','Tienes base. Ahora toca ser constante y mirar qué funciona antes de añadir cosas nuevas.'],
  [70,'Afinando','Lo básico está hecho. El salto está en los detalles: datos, comunidad y llevar a la gente al siguiente paso.']
];
export const MAPA = [
  {q:'¿Desde dónde empiezas?', o:['Soy artista y estoy empezando','Soy artista y ya tengo algo de público','Trabajo en la industria, no soy artista']},
  {q:'¿Cómo es tu audiencia hoy?', o:['Sobre todo amigos y conocidos','Me conocen por algo concreto, pero no me siguen a mí','Mi red es profesional, no un público']},
  {q:'¿Qué es lo que más te frena?', o:['No me conoce nadie','No consigo que el interés se mantenga','No quiero exponerme demasiado']},
  {q:'¿Cuál es tu próxima decisión importante?', o:['Cómo lanzar lo siguiente','Qué propuestas o socios aceptar','Cómo conseguir mis primeros clientes o proyectos']}
];
export const CKEYS = ['lucia','dani','marta'];
export const LUCIA_CATS = [
  {id:'contenido',l:'Contenido',d:'Grabar y editar vídeo corto, fotos y avances de la canción.'},
  {id:'anuncios',l:'Anuncios',d:'Publicidad pagada en Instagram, TikTok o Spotify.'},
  {id:'playlists',l:'Playlists y prensa',d:'Promoción en listas y medios.'},
  {id:'directos',l:'Directos y colaboraciones',d:'Tocar en salas pequeñas y hacer temas con artistas de tu escala.'},
  {id:'imagen',l:'Imagen y portada',d:'Portada, fotos e identidad visual.'},
  {id:'reserva',l:'Reserva',d:'Dinero guardado para empujar lo que funcione.'}
];
export const DANI_OPTS = [
  {t:'Contar cómo hace sus temas: estudio, sesiones y producción', n:'Le da razones para seguirle a él y no solo a una canción.'},
  {t:'Llevar a su audiencia a un espacio propio (lista de difusión, newsletter o comunidad)', n:'Depende menos del algoritmo y tiene línea directa con quien ya le conoce.'},
  {t:'Pedir al sello por escrito derechos, plazos y plan de marketing antes de decidir', n:'Una oferta se valora con condiciones, no solo con el nombre del sello.'},
  {t:'Aceptar la marca de ropa si encaja con su estética', n:'Suma visibilidad y dinero, pero puede diluir su identidad si no encaja.'},
  {t:'Sacar otra canción parecida a la viral', n:'Puede recuperar atención rápida, pero refuerza la idea de artista de una sola canción.'},
  {t:'Firmar con el sello cuanto antes para aprovechar el momento', n:'Aprovecha la inercia, pero las prisas negocian mal.'}
];
export const MARTA_OPTS = [
  'Actualizar LinkedIn con casos y resultados de giras',
  'Publicar casos de trabajo con permiso de los artistas',
  'Dar charlas o participar en mesas del sector',
  'Escribir una newsletter con aprendizajes de gira',
  'Abrir su Instagram y enseñar su día a día',
  'Grabar vídeos hablando a cámara sobre la industria'
];
/* Objetivos sugeridos según perfil y área más baja */
export const METAS = {
  artista:{identidad:'Que 3 de cada 3 personas entiendan mi proyecto en la prueba de los 10 segundos',contenido:'Publicar 2 piezas a la semana durante 12 semanas',datos:'Saber cada mes cuáles son mis 3 mejores piezas y por qué',comunidad:'Conocer por su nombre a 20 personas que me apoyan',conversion:'Llegar a 100 personas en mi lista de difusión',extra:['Que 300 personas guarden mi próxima canción','Tocar en 3 salas pequeñas']},
  profesional:{identidad:'Tener mi frase en LinkedIn y en todas mis bios',contenido:'Publicar 6 casos de trabajo con permiso',datos:'Saber de dónde me llega cada proyecto nuevo',comunidad:'Tener 5 conversaciones con artistas que me interesan',conversion:'Cerrar mi primer proyecto o artista propio',extra:['Participar en una charla o mesa del sector','Tener un dosier de una página listo para enviar']}
};
export const STEPS = [
  ['inicio','Inicio'],['diagnostico','Dónde estás'],['mitos','Mito o realidad'],['casos','Los casos'],
  ['charlas','Ideas clave'],['plan','Tu plan'],['hoja','Tu hoja de ruta'],['herramientas','Herramientas']
];
export const HORAS = ['','1','2','3','5','8','10'];
