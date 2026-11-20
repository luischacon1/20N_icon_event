import datetime
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter as L
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.formatting.rule import FormulaRule
from openpyxl.drawing.image import Image
TEAL='00A099';DARK='141615';TINT='E1F3F1';GREY='5F6664';LINE='D5DFDC';INP='FFF9DB'
F=lambda **k:Font(name='Arial',**k)
fill=lambda c:PatternFill('solid',start_color=c,end_color=c)
thin=Side(style='thin',color=LINE);box=Border(left=thin,right=thin,top=thin,bottom=thin)
LOGO='/home/claude/icon-cuaderno/assets/logo-teal.png'
def base(ws,widths):
    ws.sheet_view.showGridLines=False
    ws.page_setup.orientation='landscape';ws.page_setup.fitToWidth=1;ws.page_setup.fitToHeight=0;ws.sheet_properties.pageSetUpPr.fitToPage=True
    for i,w in enumerate(widths,1): ws.column_dimensions[L(i)].width=w
def title(ws,t,sub,row=1):
    ws.cell(row,1,t).font=F(size=18,bold=True,color=DARK); ws.row_dimensions[row].height=30
    ws.cell(row+1,1,sub).font=F(size=10,color=GREY)
def head(ws,row,labels,c0=1):
    for i,l in enumerate(labels):
        c=ws.cell(row,c0+i,l);c.font=F(bold=True,color='FFFFFF',size=10);c.fill=fill(TEAL);c.alignment=Alignment(horizontal='center',vertical='center',wrap_text=True);c.border=box
    ws.row_dimensions[row].height=30
def guide(wb,name,lines):
    ws=wb.active;ws.title='Cómo usarlo';base(ws,[3,100])
    try:
        im=Image(LOGO);r=im.width/im.height;im.height=44;im.width=int(44*r);ws.add_image(im,'B1')
    except Exception as e: print('logo',e)
    ws.row_dimensions[1].height=42
    ws['B3']=name;ws['B3'].font=F(size=20,bold=True,color=DARK)
    r=5
    for kind,t in lines:
        c=ws.cell(r,2,t);c.alignment=Alignment(wrap_text=True,vertical='top')
        if kind=='h': c.font=F(bold=True,color=TEAL,size=11)
        elif kind=='i': c.font=F(size=10,color=DARK);c.fill=fill(INP)
        else: c.font=F(size=10,color=DARK)
        ws.row_dimensions[r].height=18 if len(t)<95 else 32
        r+=1
    ws.cell(r+1,2,'ICON Music Business School · iconmbs.com · @iconmbs').font=F(size=9,color=GREY)
    return ws
def inp(c,ex=False):
    c.fill=fill(INP);c.border=box;c.font=F(size=10,color='0000FF' if ex else DARK)

# ================= 1. INFORME SEMANAL DE AUDIENCIA =================
wb=Workbook()
guide(wb,'Informe semanal de audiencia',[
 ('h','Para qué sirve'),('p','Para saber, semana a semana, si lo que publicas está haciendo crecer tu proyecto. Diez minutos cada lunes.'),
 ('h','Cómo se rellena'),
 ('i','Solo escribes en las celdas amarillas. Todo lo demás se calcula solo.'),
 ('p','1 · Audiencia: apunta tus cifras de hoy en la columna «Inicio». Cada semana, el mismo día, rellena la siguiente columna.'),
 ('p','2 · Canciones: apunta las reproducciones acumuladas de cada canción y tus cinco ciudades principales (Spotify for Artists > Audiencia).'),
 ('p','3 · Publicaciones: una fila por cada pieza que publiques. Marca «Sí» si etiquetaste a @iconmbs: el alcance de esas piezas es el que cuenta para el Reto ICON.'),
 ('p','Las cifras en azul son un ejemplo para que veas el formato. Bórralas y pon las tuyas.'),
 ('h','Cómo leerlo'),
 ('p','Mira la variación semanal, no el total: una semana con +5 % te dice más que el número de seguidores.'),
 ('p','Si suben las visitas al perfil pero no los seguidores, revisa tu bio y tus publicaciones fijadas.'),
 ('p','Si una pieza tiene muchos guardados y compartidos, repite el formato antes de probar otro.')])
# Audiencia
ws=wb.create_sheet('Audiencia');base(ws,[30]+[12]*9+[14,14])
title(ws,'Audiencia','Rellena las celdas amarillas el mismo día de cada semana.')
head(ws,4,['Métrica','Inicio']+[f'Semana {i}' for i in range(1,9)]+['Cambio total','Cambio %'])
ws['A5']='Fecha';ws['A5'].font=F(size=10,color=GREY)
d0=datetime.date(2026,11,23)
for j in range(9):
    c=ws.cell(5,2+j);inp(c,ex=j<3);c.number_format='dd/mm';
    if j<3:c.value=d0+datetime.timedelta(days=7*j)
mets=[('Instagram · seguidores',[1715,1842,1856]),('TikTok · seguidores',[640,702,731]),('YouTube · suscriptores',[212,219,224]),('Spotify · seguidores',[852,861,878]),('Lista de difusión o correo',[96,104,118]),('Spotify · oyentes mensuales',[11590,10247,12031])]
for i,(m,ex) in enumerate(mets):
    r=6+i;ws.cell(r,1,m).font=F(size=10,bold=True);ws.cell(r,1).border=box
    for j in range(9):
        c=ws.cell(r,2+j);inp(c,ex=True);c.number_format='#,##0'
        if j<3:c.value=ex[j]
    last=f'LOOKUP(2,1/(B{r}:J{r}<>""),B{r}:J{r})'
    c=ws.cell(r,11,f'=IF(COUNT(B{r}:J{r})<2,"",{last}-B{r})');c.number_format='+#,##0;-#,##0;0'
    c=ws.cell(r,12,f'=IF(OR(COUNT(B{r}:J{r})<2,B{r}=0),"",({last}-B{r})/B{r})');c.number_format='+0.0%;-0.0%;0.0%'
    for k in(11,12):ws.cell(r,k).font=F(size=10,bold=True);ws.cell(r,k).border=box;ws.cell(r,k).fill=fill(TINT)
r=12;ws.cell(r,1,'Comunidad total (sin oyentes)').font=F(size=10,bold=True,color='FFFFFF');ws.cell(r,1).fill=fill(DARK)
for j in range(9):
    col=L(2+j);c=ws.cell(r,2+j,f'=IF(COUNT({col}6:{col}10)=0,"",SUM({col}6:{col}10))');c.number_format='#,##0';c.font=F(size=10,bold=True);c.fill=fill(TINT);c.border=box
head(ws,14,['Variación semanal','']+[f'Semana {i}' for i in range(1,9)])
for i,(m,_) in enumerate(mets+[('Comunidad total',None)]):
    r=15+i;src=6+i;ws.cell(r,1,m).font=F(size=10);ws.cell(r,1).border=box
    for j in range(1,9):
        p,cu=L(1+j),L(2+j);c=ws.cell(r,2+j,f'=IF(OR({p}{src}="",{cu}{src}="",{p}{src}=0),"",({cu}{src}-{p}{src})/{p}{src})');c.number_format='+0.0%;-0.0%;0.0%';c.font=F(size=10);c.border=box
ws.conditional_formatting.add('C15:J21',FormulaRule(formula=['AND(C15<>"",C15<0)'],font=Font(name='Arial',color='B3261E')))
ws.conditional_formatting.add('C15:J21',FormulaRule(formula=['AND(C15<>"",C15>0)'],font=Font(name='Arial',color='00756F')))
ws.freeze_panes='B5'
# Canciones
ws=wb.create_sheet('Canciones');base(ws,[30]+[12]*9+[14])
title(ws,'Canciones','Reproducciones acumuladas de cada canción (Spotify for Artists). Las nuevas de cada semana se calculan solas.')
head(ws,4,['Canción','Inicio']+[f'Semana {i}' for i in range(1,9)]+['Nuevas en total'])
exs=[('Nombre de la canción (ejemplo)',[97218,98848,102518])]+[('',[])]*4
for i,(n,ex) in enumerate(exs):
    r=5+i;c=ws.cell(r,1,n or None);inp(c,ex=True)
    for j in range(9):
        c=ws.cell(r,2+j);inp(c,ex=True);c.number_format='#,##0'
        if j<len(ex):c.value=ex[j]
    c=ws.cell(r,11,f'=IF(COUNT(B{r}:J{r})<2,"",LOOKUP(2,1/(B{r}:J{r}<>""),B{r}:J{r})-B{r})');c.number_format='#,##0';c.font=F(size=10,bold=True);c.fill=fill(TINT);c.border=box
head(ws,11,['Nuevas reproducciones','']+[f'Semana {i}' for i in range(1,9)])
for i in range(5):
    r=12+i;src=5+i;c=ws.cell(r,1,f'=IF(A{src}="","",A{src})');c.font=F(size=10);c.border=box
    for j in range(1,9):
        p,cu=L(1+j),L(2+j);c=ws.cell(r,2+j,f'=IF(OR({p}{src}="",{cu}{src}=""),"",{cu}{src}-{p}{src})');c.number_format='#,##0';c.font=F(size=10);c.border=box
r=17;ws.cell(r,1,'Total semanal').font=F(size=10,bold=True,color='FFFFFF');ws.cell(r,1).fill=fill(DARK)
for j in range(1,9):
    col=L(2+j);c=ws.cell(r,2+j,f'=IF(COUNT({col}12:{col}16)=0,"",SUM({col}12:{col}16))');c.number_format='#,##0';c.font=F(size=10,bold=True);c.fill=fill(TINT);c.border=box
head(ws,19,['Tus 5 ciudades principales','Inicio']+[f'Semana {i}' for i in range(1,9)])
exc=[['Madrid','Madrid','Madrid'],['Barcelona','Barcelona','Ciudad de México'],['Valencia','Ciudad de México','Barcelona'],['Sevilla','Valencia','Valencia'],['Ciudad de México','Sevilla','Bogotá']]
for i in range(5):
    r=20+i;ws.cell(r,1,f'{i+1}.ª').font=F(size=10,color=GREY)
    for j in range(9):
        c=ws.cell(r,2+j);inp(c,ex=True)
        if j<3:c.value=exc[i][j]
ws.cell(26,1,'Si una ciudad nueva entra en la lista, es una pista: ahí hay que tocar, colaborar o segmentar anuncios.').font=F(size=9,color=GREY,italic=True)
ws.freeze_panes='B5'
# Publicaciones
ws=wb.create_sheet('Publicaciones');base(ws,[11,14,34,12,12,12,12,12,13,13,30])
title(ws,'Publicaciones','Una fila por pieza. Apunta las cifras a los 7 días de publicar.')
ws['A3']='Alcance total';ws['A3'].font=F(size=10,bold=True);ws['C3']='=SUM(D7:D60)';ws['C3'].number_format='#,##0';ws['C3'].font=F(size=12,bold=True)
ws['A4']='Alcance etiquetando a @iconmbs (Reto ICON)';ws['A4'].font=F(size=10,bold=True,color=TEAL);ws['C4']='=SUMIF(I7:I60,"Sí",D7:D60)';ws['C4'].number_format='#,##0';ws['C4'].font=F(size=12,bold=True,color=TEAL)
head(ws,6,['Fecha','Formato','Idea o título','Alcance','Visitas al perfil','Seguidores nuevos','Guardados','Compartidos','¿Etiqueta @iconmbs?','Interés','Qué aprendí'])
ex=[(datetime.date(2026,11,24),'Reel','Presentación en 15 segundos',4800,310,42,96,58,'Sí'),(datetime.date(2026,11,26),'Carrusel','Cómo escribí el estribillo',2100,95,11,140,37,'Sí')]
for i in range(54):
    r=7+i
    for k in range(1,12):
        if k==10:continue
        c=ws.cell(r,k);inp(c,ex=i<2)
        if i<2 and k<=9:c.value=ex[i][k-1]
        if k==1:c.number_format='dd/mm'
        if 4<=k<=8:c.number_format='#,##0'
    c=ws.cell(r,10,f'=IF(OR(D{r}="",D{r}=0),"",(G{r}+H{r})/D{r})');c.number_format='0.0%';c.font=F(size=10,bold=True);c.fill=fill(TINT);c.border=box
dv=DataValidation(type='list',formula1='"Sí,No"',allow_blank=True);ws.add_data_validation(dv);dv.add('I7:I60')
dv2=DataValidation(type='list',formula1='"Reel,TikTok,Short,Carrusel,Stories,Directo,Otro"',allow_blank=True);ws.add_data_validation(dv2);dv2.add('B7:B60')
ws['J5']='(guardados + compartidos) ÷ alcance';ws['J5'].font=F(size=8,color=GREY,italic=True)
ws.freeze_panes='A7'
wb.save('ICON-informe-semanal-audiencia.xlsx')

# ================= 2. PLAN DE LANZAMIENTO =================
wb=Workbook()
guide(wb,'Plan de lanzamiento de un single',[
 ('h','Para qué sirve'),('p','Para llegar al día de salida con todo hecho: de ocho semanas antes a dos semanas después.'),
 ('h','Cómo se rellena'),
 ('i','Solo escribes en las celdas amarillas. Empieza por la fecha de lanzamiento, en la hoja «Plan».'),
 ('p','1 · Pon tu fecha de lanzamiento (mejor un viernes). Las fechas límite de cada tarea se calculan solas.'),
 ('p','2 · Asigna un responsable a cada tarea, aunque seas tú en todas.'),
 ('p','3 · Cambia el estado a «En curso» o «Hecho» según avances. Arriba verás el porcentaje completado.'),
 ('p','4 · Adapta las semanas: la columna «Semana» indica cuántas semanas antes (−) o después (+) de la salida va cada tarea.'),
 ('p','5 · En «Contactos» apunta playlists, medios, radios y salas a quienes vas a escribir, y cuándo lo hiciste.'),
 ('h','Tres cosas que no se pueden dejar para el final'),
 ('p','Subir la canción a la distribuidora con margen: sin eso no hay pitch editorial ni pre-save.'),
 ('p','Dejar por escrito el reparto de autoría antes de publicar.'),
 ('p','Grabar el contenido antes de la semana de salida: esa semana es para responder y mover la canción.'),
 ('p','Los plazos son orientativos. Comprueba los de tu distribuidora y tu entidad de gestión.')])
ws=wb.create_sheet('Plan');weeks=list(range(-8,3))
base(ws,[44,16,9,13,12,28]+[5.2]*len(weeks))
title(ws,'Plan de lanzamiento','Las fechas se calculan a partir de tu fecha de salida.')
ws['A3']='Fecha de lanzamiento';ws['A3'].font=F(size=11,bold=True);c=ws['B3'];c.value=datetime.date(2027,1,22);inp(c,ex=True);c.number_format='dd/mm/yyyy';c.font=F(size=11,bold=True,color='0000FF')
ws['D3']='Completado';ws['D3'].font=F(size=10,bold=True);ws['D3'].alignment=Alignment(horizontal='right')
head(ws,5,['Tarea','Responsable','Semana','Fecha límite','Estado','Notas']+[('S' if w else 'Salida') if w==0 else f'{w:+d}' for w in weeks])
for i,w in enumerate(weeks):
    ws.cell(4,7+i,w).font=F(size=1,color='FFFFFF')
ws.cell(5,7+weeks.index(0)).value='▼';ws.cell(5,7+weeks.index(0)).fill=fill(DARK)
blocks=[('Canción',[('Grabación final',-8),('Mezcla',-7),('Máster',-6)]),
('Imagen',[('Sesión de fotos',-7),('Portada del single',-6),('Fotos de prensa',-6),('Rodaje de videoclip o visualizer',-5),('Adaptaciones para redes y cabeceras',-5),('Edición final de vídeo',-3)]),
('Papeles',[('Reparto de autoría por escrito y firmado',-6),('Créditos, letra y metadatos revisados',-5),('Registro de la obra en tu entidad de gestión (p. ej. SGAE)',-5),('Bio actualizada',-4),('Dosier de una página',-4)]),
('Distribución',[('Subir canción, portada y metadatos a la distribuidora',-4),('Pitch editorial en Spotify for Artists',-4),('Enlace de pre-save',-3),('Perfiles de artista al día (Spotify, Apple Music, YouTube)',-3)]),
('Medios y playlists',[('Lista de contactos: playlists, medios, radios y salas',-5),('Envío a medios con enlace privado',-3),('Envío a curadores de playlists',-2),('Seguimiento a quien no ha contestado',-1)]),
('Contenido',[('Concepto de campaña y cuenta atrás',-4),('Grabar 8-10 piezas de vídeo corto',-3),('Primer avance con llamada a guardar',-2),('Anuncio de fecha',-2),('Cuenta atrás diaria',-1),('Día de salida: enlace en bio y pieza principal',0),('Una pieza diaria los tres primeros días',0),('Compartir reacciones de la comunidad',1)]),
('Medir',[('Revisar datos de la primera semana',1),('Amplificar solo lo que ha funcionado',1),('Apuntar tres aprendizajes',2)])]
r=6;first=6
for b,ts in blocks:
    for k in range(1,7+len(weeks)):ws.cell(r,k).fill=fill(DARK)
    ws.cell(r,1,b.upper()).font=F(size=10,bold=True,color='FFFFFF');r+=1
    for t,w in ts:
        ws.cell(r,1,t).font=F(size=10);ws.cell(r,1).border=box
        inp(ws.cell(r,2));c=ws.cell(r,3,w);inp(c);c.number_format='+0;-0;0';c.alignment=Alignment(horizontal='center')
        c=ws.cell(r,4,f'=IF(OR($B$3="",C{r}=""),"",$B$3+C{r}*7)');c.number_format='dd/mm/yyyy';c.font=F(size=10);c.border=box;c.alignment=Alignment(horizontal='center')
        c=ws.cell(r,5,'Pendiente');inp(c);c.alignment=Alignment(horizontal='center');inp(ws.cell(r,6))
        for i in range(len(weeks)):ws.cell(r,7+i).border=box
        r+=1
last=r-1
ws['E3']=f'=IF(COUNTA(E{first}:E{last})=0,0,COUNTIF(E{first}:E{last},"Hecho")/COUNTA(E{first}:E{last}))';ws['E3'].number_format='0%';ws['E3'].font=F(size=14,bold=True,color=TEAL)
dv=DataValidation(type='list',formula1='"Pendiente,En curso,Hecho"',allow_blank=True);ws.add_data_validation(dv);dv.add(f'E{first}:E{last}')
g=f'G{first}:{L(6+len(weeks))}{last}'
ws.conditional_formatting.add(g,FormulaRule(formula=[f'AND(ISNUMBER($C{first}),$E{first}="Hecho",$C{first}=G$4)'],fill=fill('9BB5B1')))
ws.conditional_formatting.add(g,FormulaRule(formula=[f'AND(ISNUMBER($C{first}),$C{first}=G$4)'],fill=fill(TEAL)))
ws.conditional_formatting.add(f'A{first}:F{last}',FormulaRule(formula=[f'$E{first}="Hecho"'],font=Font(name='Arial',color='9AA5A2',strike=True)))
ws.conditional_formatting.add(f'E{first}:E{last}',FormulaRule(formula=[f'$E{first}="En curso"'],fill=fill('FFE08A')))
ws.freeze_panes='B6'
ws=wb.create_sheet('Contactos');base(ws,[14,28,24,26,13,30,13,14,30])
title(ws,'Contactos','A quién vas a escribir y en qué punto está cada conversación.')
head(ws,4,['Tipo','Nombre','Persona de contacto','Correo o perfil','Seguidores u oyentes','Enlace','Contactado el','Estado','Notas'])
ex=['Playlist','Nombre de la playlist (ejemplo)','Nombre del curador','correo@ejemplo.com',12500,'https://…',datetime.date(2027,1,8),'Enviado','Le encajan temas de pop indie en español']
for i in range(40):
    r=5+i
    for k in range(1,10):
        c=ws.cell(r,k);inp(c,ex=i==0)
        if i==0:c.value=ex[k-1]
        if k==5:c.number_format='#,##0'
        if k==7:c.number_format='dd/mm/yyyy'
dv=DataValidation(type='list',formula1='"Playlist,Medio,Radio,Sala,Artista,Otro"',allow_blank=True);ws.add_data_validation(dv);dv.add('A5:A44')
dv=DataValidation(type='list',formula1='"Por enviar,Enviado,Seguimiento,Sí,No"',allow_blank=True);ws.add_data_validation(dv);dv.add('H5:H44')
ws.freeze_panes='A5'
wb.save('ICON-plan-lanzamiento-single.xlsx')
