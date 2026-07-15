/* ============================================================
   SPOLOČNÉ DÁTA SPRIEVODCU
   -> Texty jednotlivých zastávok sú v assets/stops/stopN.js
      (každá zastávka = jeden súbor, upravuj tam).
   -> Tu sú len spoločné popisky rozhrania vo všetkých jazykoch
      a texty úvodnej stránky.
   ============================================================ */

const STOPS = {};          // zastávky sa registrujú zo súborov assets/stops/*.js
const STOP_COUNT = 11;     // počet zastávok prehliadky

/* Poradie kľúčov určuje poradie jazykov v prepínači — slovenčina, čeština, potom ostatné. */
const LANG_LABELS = {
  sk:"Slovenčina", cs:"Čeština", en:"English", de:"Deutsch", pl:"Polski", hu:"Magyar",
  it:"Italiano", fr:"Français", es:"Español", uk:"Українська"
};
/* Vlajky a skratky pre prepínač jazykov (chips) */
const LANG_FLAGS = {
  sk:"🇸🇰", cs:"🇨🇿", en:"🇬🇧", de:"🇩🇪", pl:"🇵🇱", hu:"🇭🇺",
  it:"🇮🇹", fr:"🇫🇷", es:"🇪🇸", uk:"🇺🇦"
};
const LANG_SHORT = {
  sk:"SK", cs:"CS", en:"EN", de:"DE", pl:"PL", hu:"HU",
  it:"IT", fr:"FR", es:"ES", uk:"UK"
};
const EYEBROW = {
  sk:"Zastávka", cs:"Zastávka", en:"Stop", de:"Station", pl:"Przystanek", hu:"Állomás",
  it:"Tappa", fr:"Étape", es:"Parada", uk:"Зупинка"
};

/* Zoskupenie zastávok podľa častí kostola — poradie zodpovedá trase prehliadky. */
const GROUPS = [
  { stops:[1,2], label:{
    sk:"Loď kostola", cs:"Loď kostela", en:"The Nave", de:"Das Kirchenschiff",
    pl:"Nawa kościoła", hu:"A templomhajó", it:"La navata", fr:"La nef", es:"La nave",
    uk:"Нава церкви" } },
  { stops:[3,4,5], label:{
    sk:"Severná strana", cs:"Severní strana", en:"North Side", de:"Nordseite",
    pl:"Strona północna", hu:"Északi oldal", it:"Lato nord", fr:"Côté nord",
    es:"Lado norte", uk:"Північний бік" } },
  { stops:[6], label:{
    sk:"Presbytérium", cs:"Presbytář", en:"The Presbytery", de:"Der Chorraum",
    pl:"Prezbiterium", hu:"A szentély", it:"Il presbiterio", fr:"Le chœur",
    es:"El presbiterio", uk:"Пресвітерій" } },
  { stops:[7,8,9], label:{
    sk:"Južná strana", cs:"Jižní strana", en:"South Side", de:"Südseite",
    pl:"Strona południowa", hu:"Déli oldal", it:"Lato sud", fr:"Côté sud",
    es:"Lado sur", uk:"Південний бік" } },
  { stops:[10,11], label:{
    sk:"Západná časť", cs:"Západní část", en:"West End", de:"Westteil",
    pl:"Część zachodnia", hu:"Nyugati rész", it:"Parte occidentale", fr:"Partie ouest",
    es:"Parte occidental", uk:"Західна частина" } }
];

const NAV_PREV = {
  sk:"Predchádzajúca", cs:"Předchozí", en:"Previous", de:"Vorherige", pl:"Poprzednia",
  hu:"Előző", it:"Precedente", fr:"Précédente", es:"Anterior", uk:"Попередня"
};
const NAV_NEXT = {
  sk:"Ďalšia", cs:"Další", en:"Next", de:"Nächste", pl:"Następna", hu:"Következő",
  it:"Successiva", fr:"Suivante", es:"Siguiente", uk:"Наступна"
};
const NAV_HINT = {
  sk:"Naskenujte ďalší QR kód pri postupe po trase, alebo použite šípky.",
  cs:"Naskenujte další QR kód při postupu po trase, nebo použijte šipky.",
  en:"Scan the next QR code as you continue along the route, or use the arrows.",
  de:"Scannen Sie den nächsten QR-Code auf dem Weg, oder nutzen Sie die Pfeile.",
  pl:"Zeskanuj kolejny kod QR na trasie lub skorzystaj ze strzałek.",
  hu:"Olvassa be a következő QR-kódot az útvonalon, vagy használja a nyilakat.",
  it:"Scansiona il prossimo codice QR lungo il percorso, oppure usa le frecce.",
  fr:"Scannez le prochain code QR le long du parcours, ou utilisez les flèches.",
  es:"Escanee el siguiente código QR en el recorrido o use las flechas.",
  uk:"Відскануйте наступний QR-код на маршруті або скористайтеся стрілками."
};
const BACK_HOME = {
  sk:"späť na úvodnú stránku", cs:"zpět na úvodní stránku",
  en:"back to the main page", de:"zurück zur Startseite",
  pl:"powrót do strony głównej", hu:"vissza a főoldalra", it:"torna alla pagina iniziale",
  fr:"retour à la page d'accueil", es:"volver a la página principal", uk:"на головну сторінку"
};
const FOOTER_LABEL = {
  sk:"Sprievodca Kostolom sv. Kataríny · Banská Štiavnica",
  cs:"Průvodce Kostelem sv. Kateřiny · Banská Štiavnica",
  en:"Guide to St Catherine's Church · Banská Štiavnica",
  de:"Führer durch die Katharinenkirche · Banská Štiavnica",
  pl:"Przewodnik po kościele św. Katarzyny · Bańska Szczawnica",
  hu:"Kalauz a Szent Katalin-templomhoz · Selmecbánya",
  it:"Guida alla chiesa di Santa Caterina · Banská Štiavnica",
  fr:"Guide de l'église Sainte-Catherine · Banská Štiavnica",
  es:"Guía de la iglesia de Santa Catalina · Banská Štiavnica",
  uk:"Путівник церквою св. Катерини · Банська Штявниця"
};

/* ---------- Úvodná stránka ---------- */
const INDEX_I18N = {
  eyebrow: {
    sk:"Vitajte", cs:"Vítejte", en:"Welcome", de:"Willkommen", pl:"Witamy",
    hu:"Üdvözöljük", it:"Benvenuti", fr:"Bienvenue", es:"Bienvenidos", uk:"Вітаємо"
  },
  /* {rok} sa nahradí aktuálnym rokom — „1488 – dodnes“ sa tak nikdy nezastará. */
  heroSub: {
    sk:"Banská Štiavnica · 1488 – {rok}",
    cs:"Banská Štiavnica · 1488 – {rok}",
    en:"Banská Štiavnica · 1488 – {rok}",
    de:"Banská Štiavnica · 1488 – {rok}",
    pl:"Bańska Szczawnica · 1488 – {rok}",
    hu:"Selmecbánya · 1488 – {rok}",
    it:"Banská Štiavnica · 1488 – {rok}",
    fr:"Banská Štiavnica · 1488 – {rok}",
    es:"Banská Štiavnica · 1488 – {rok}",
    uk:"Банська Штявниця · 1488 – {rok}"
  },
  churchName: {
    sk:"Kostol sv. Kataríny Alexandrijskej",
    cs:"Kostel sv. Kateřiny Alexandrijské",
    en:"Church of St Catherine of Alexandria",
    de:"Kirche der hl. Katharina von Alexandrien",
    pl:"Kościół św. Katarzyny Aleksandryjskiej",
    hu:"Alexandriai Szent Katalin-templom",
    it:"Chiesa di Santa Caterina d'Alessandria",
    fr:"Église Sainte-Catherine-d'Alexandrie",
    es:"Iglesia de Santa Catalina de Alejandría",
    uk:"Церква св. Катерини Александрійської"
  },
  intro: {
    sk:"Vitajte v Kostole svätej Kataríny Alexandrijskej v Banskej Štiavnici — neskorogotickom klenote z rokov 1488 – 1491, nazývanom aj „slovenský kostol“. Táto stránka vás prevedie interiérom kostola: pri každej zastávke v kostole nájdete QR kód, ktorý vás privedie k textu o danom mieste v jazyku podľa vlastného výberu. Prehliadku si však môžete prejsť aj priamo tu na stránke.",
    cs:"Vítejte v Kostele svaté Kateřiny Alexandrijské v Banské Štiavnici — pozdně gotickém klenotu z let 1488 – 1491, nazývaném také „slovenský kostel“. Tato stránka vás provede interiérem kostela: u každé zastávky v kostele najdete QR kód, který vás přivede k textu o daném místě v jazyce podle vlastního výběru. Prohlídku si však můžete projít i přímo zde na stránce.",
    en:"Welcome to the Church of St Catherine of Alexandria in Banská Štiavnica — a late-Gothic jewel built in 1488–1491, also known as the “Slovak church”. This site guides you through the church interior: at each stop inside the church you will find a QR code leading to a text about that place in the language of your choice. You can also browse the whole tour right here.",
    de:"Willkommen in der Kirche der hl. Katharina von Alexandrien in Banská Štiavnica — einem spätgotischen Juwel aus den Jahren 1488–1491, auch „slowakische Kirche“ genannt. Diese Seite führt Sie durch das Innere der Kirche: An jeder Station finden Sie einen QR-Code, der Sie zu einem Text über den jeweiligen Ort in Ihrer Sprache führt. Sie können den Rundgang auch direkt hier durchblättern.",
    pl:"Witamy w kościele św. Katarzyny Aleksandryjskiej w Bańskiej Szczawnicy — późnogotyckim klejnocie z lat 1488–1491, zwanym też „słowackim kościołem”. Ta strona oprowadzi Cię po wnętrzu kościoła: przy każdym przystanku znajdziesz kod QR prowadzący do tekstu o danym miejscu w wybranym języku. Całą trasę możesz też przejrzeć bezpośrednio tutaj.",
    hu:"Üdvözöljük a selmecbányai Alexandriai Szent Katalin-templomban — az 1488–1491 között épült késő gótikus ékszerben, amelyet „szlovák templomnak” is neveznek. Ez az oldal végigvezeti Önt a templom belsején: minden állomásnál QR-kód található, amely az adott helyről szóló szöveghez vezet az Ön által választott nyelven. A teljes túrát itt is végiglapozhatja.",
    it:"Benvenuti nella chiesa di Santa Caterina d'Alessandria a Banská Štiavnica — un gioiello tardogotico costruito nel 1488–1491, detto anche la “chiesa slovacca”. Questo sito vi guida all'interno della chiesa: a ogni tappa troverete un codice QR che conduce a un testo sul luogo, nella lingua che preferite. Potete anche sfogliare l'intero percorso direttamente qui.",
    fr:"Bienvenue dans l'église Sainte-Catherine-d'Alexandrie de Banská Štiavnica — un joyau du gothique tardif construit en 1488–1491, appelé aussi « l'église slovaque ». Ce site vous guide à travers l'intérieur de l'église : à chaque étape, un code QR mène à un texte sur le lieu, dans la langue de votre choix. Vous pouvez aussi parcourir toute la visite directement ici.",
    es:"Bienvenidos a la iglesia de Santa Catalina de Alejandría en Banská Štiavnica — una joya del gótico tardío construida en 1488–1491, llamada también la «iglesia eslovaca». Este sitio le guía por el interior de la iglesia: en cada parada encontrará un código QR que lleva a un texto sobre ese lugar en el idioma que elija. También puede recorrer toda la visita directamente aquí.",
    uk:"Вітаємо в церкві святої Катерини Александрійської в Банській Штявниці — пізньоготичній перлині 1488–1491 років, яку називають також «словацькою церквою». Цей сайт проведе вас інтер'єром церкви: біля кожної зупинки ви знайдете QR-код, що веде до тексту про це місце обраною вами мовою. Весь маршрут можна переглянути й просто тут."
  },
  stopsHeading: {
    sk:"Zastávky prehliadky", cs:"Zastávky prohlídky", en:"Tour stops",
    de:"Stationen des Rundgangs", pl:"Przystanki trasy", hu:"A túra állomásai",
    it:"Tappe della visita", fr:"Étapes de la visite", es:"Paradas del recorrido",
    uk:"Зупинки маршруту"
  },
  extrasHeading: {
    sk:"Ďalšie čítanie", cs:"Další čtení", en:"Further reading", de:"Weiterführendes",
    pl:"Więcej informacji", hu:"További olvasnivaló", it:"Approfondimenti",
    fr:"Pour aller plus loin", es:"Lecturas adicionales", uk:"Додаткові матеріали"
  },
  addressLabel: {
    sk:"Adresa", cs:"Adresa", en:"Address", de:"Adresse", pl:"Adres", hu:"Cím",
    it:"Indirizzo", fr:"Adresse", es:"Dirección", uk:"Адреса"
  },
  addressValue: {
    sk:"Radničné námestie, 969 01 Banská Štiavnica, Slovensko",
    cs:"Radničné námestie, 969 01 Banská Štiavnica, Slovensko",
    en:"Radničné námestie, 969 01 Banská Štiavnica, Slovakia",
    de:"Radničné námestie, 969 01 Banská Štiavnica, Slowakei",
    pl:"Radničné námestie, 969 01 Bańska Szczawnica, Słowacja",
    hu:"Radničné námestie, 969 01 Selmecbánya, Szlovákia",
    it:"Radničné námestie, 969 01 Banská Štiavnica, Slovacchia",
    fr:"Radničné námestie, 969 01 Banská Štiavnica, Slovaquie",
    es:"Radničné námestie, 969 01 Banská Štiavnica, Eslovaquia",
    uk:"Radničné námestie, 969 01 Банська Штявниця, Словаччина"
  },
  hoursLabel: {
    sk:"Otváracie hodiny", cs:"Otevírací doba", en:"Opening hours", de:"Öffnungszeiten",
    pl:"Godziny otwarcia", hu:"Nyitvatartás", it:"Orari di apertura",
    fr:"Horaires d'ouverture", es:"Horario de apertura", uk:"Години відвідування"
  },
  /* Otváracie hodiny — sezónny rozvrh.
     Každé obdobie má názov (season) a riadky s časmi (rows).
     Časy sú rovnaké vo všetkých jazykoch, menia sa len názvy mesiacov a dní. */
  hoursValue: {
    sk:[
      { season:"Júl – august", rows:["Po – So · 9:00 – 17:00", "Nedeľa · 13:00 – 17:00"] },
      { season:"Jún a september", rows:["Sobota · 9:00 – 17:00", "Nedeľa · 13:00 – 17:00"] },
      { season:"Ostatné mesiace", rows:["Zatvorené"] }
    ],
    cs:[
      { season:"Červenec – srpen", rows:["Po – So · 9:00 – 17:00", "Neděle · 13:00 – 17:00"] },
      { season:"Červen a září", rows:["Sobota · 9:00 – 17:00", "Neděle · 13:00 – 17:00"] },
      { season:"Ostatní měsíce", rows:["Zavřeno"] }
    ],
    en:[
      { season:"July – August", rows:["Mon – Sat · 9:00 – 17:00", "Sunday · 13:00 – 17:00"] },
      { season:"June & September", rows:["Saturday · 9:00 – 17:00", "Sunday · 13:00 – 17:00"] },
      { season:"Other months", rows:["Closed"] }
    ],
    de:[
      { season:"Juli – August", rows:["Mo – Sa · 9:00 – 17:00 Uhr", "Sonntag · 13:00 – 17:00 Uhr"] },
      { season:"Juni & September", rows:["Samstag · 9:00 – 17:00 Uhr", "Sonntag · 13:00 – 17:00 Uhr"] },
      { season:"Übrige Monate", rows:["Geschlossen"] }
    ],
    pl:[
      { season:"Lipiec – sierpień", rows:["Pon – sob · 9:00 – 17:00", "Niedziela · 13:00 – 17:00"] },
      { season:"Czerwiec i wrzesień", rows:["Sobota · 9:00 – 17:00", "Niedziela · 13:00 – 17:00"] },
      { season:"Pozostałe miesiące", rows:["Nieczynne"] }
    ],
    hu:[
      { season:"Július – augusztus", rows:["Hétfő – szombat · 9:00 – 17:00", "Vasárnap · 13:00 – 17:00"] },
      { season:"Június és szeptember", rows:["Szombat · 9:00 – 17:00", "Vasárnap · 13:00 – 17:00"] },
      { season:"A többi hónapban", rows:["Zárva"] }
    ],
    it:[
      { season:"Luglio – agosto", rows:["Lun – sab · 9:00 – 17:00", "Domenica · 13:00 – 17:00"] },
      { season:"Giugno e settembre", rows:["Sabato · 9:00 – 17:00", "Domenica · 13:00 – 17:00"] },
      { season:"Altri mesi", rows:["Chiuso"] }
    ],
    fr:[
      { season:"Juillet – août", rows:["Lun – sam · 9h00 – 17h00", "Dimanche · 13h00 – 17h00"] },
      { season:"Juin et septembre", rows:["Samedi · 9h00 – 17h00", "Dimanche · 13h00 – 17h00"] },
      { season:"Autres mois", rows:["Fermé"] }
    ],
    es:[
      { season:"Julio – agosto", rows:["Lun – sáb · 9:00 – 17:00", "Domingo · 13:00 – 17:00"] },
      { season:"Junio y septiembre", rows:["Sábado · 9:00 – 17:00", "Domingo · 13:00 – 17:00"] },
      { season:"Resto del año", rows:["Cerrado"] }
    ],
    uk:[
      { season:"Липень – серпень", rows:["Пн – Сб · 9:00 – 17:00", "Неділя · 13:00 – 17:00"] },
      { season:"Червень і вересень", rows:["Субота · 9:00 – 17:00", "Неділя · 13:00 – 17:00"] },
      { season:"Інші місяці", rows:["Зачинено"] }
    ]
  },
  contactLabel: {
    sk:"Kontakt", cs:"Kontakt", en:"Contact", de:"Kontakt", pl:"Kontakt",
    hu:"Kapcsolat", it:"Contatti", fr:"Contact", es:"Contacto", uk:"Контакти"
  },
  /* TODO: doplňte telefón / e-mail farského úradu */
  contactValue: {
    sk:"Rímskokatolícka cirkev, farnosť Banská Štiavnica",
    cs:"Římskokatolická církev, farnost Banská Štiavnica",
    en:"Roman Catholic parish of Banská Štiavnica",
    de:"Römisch-katholische Pfarrei Banská Štiavnica",
    pl:"Parafia rzymskokatolicka w Bańskiej Szczawnicy",
    hu:"Selmecbányai római katolikus plébánia",
    it:"Parrocchia cattolica romana di Banská Štiavnica",
    fr:"Paroisse catholique romaine de Banská Štiavnica",
    es:"Parroquia católica romana de Banská Štiavnica",
    uk:"Римо-католицька парафія Банської Штявниці"
  }
};
