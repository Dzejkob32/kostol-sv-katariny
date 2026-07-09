/* Vykresľovacia logika zdieľaná všetkými zastávkami a dodatkami.
   Každá stránka nastaví pred načítaním tohto súboru:
     window.STOP_ID = N;            // číslo zastávky, alebo "katarina"/"stiavnica"
   Jazyk sa dá vynútiť aj v URL: ?lang=en (hodí sa pre QR kódy v konkrétnom jazyku). */

const stopId = window.STOP_ID || 1;
const stop = STOPS[stopId];

const urlLang = new URLSearchParams(location.search).get("lang");
let currentLang = urlLang || localStorage.getItem("guideLang") || "sk";
if (!stop.title[currentLang]) currentLang = "sk";
if (urlLang && stop.title[urlLang]) localStorage.setItem("guideLang", urlLang);

const isNumbered = typeof stopId === "number";

function render(){
  document.documentElement.lang = currentLang;
  document.getElementById("stopNumber").textContent = isNumbered ? stopId : "✠";
  document.getElementById("eyebrow").textContent =
    (stop.eyebrow && stop.eyebrow[currentLang]) || EYEBROW[currentLang];
  document.getElementById("title").textContent = stop.title[currentLang];
  document.title = (isNumbered ? EYEBROW[currentLang] + " " + stopId + " · " : "") +
    stop.title[currentLang];
  document.getElementById("langsLabel").textContent = LANGS_LABEL[currentLang];
  document.getElementById("backHome").textContent = BACK_HOME[currentLang];
  document.getElementById("footerLabel").textContent = FOOTER_LABEL[currentLang];

  const bodyEl = document.getElementById("bodyText");
  bodyEl.innerHTML = "";
  stop.text[currentLang].forEach((para, i) => {
    const p = document.createElement("p");
    if (i === 0) p.className = "dropcap";
    p.textContent = para;
    bodyEl.appendChild(p);
  });

  renderNav();
  renderLangSwitcher();
}

function renderNav(){
  const nav = document.getElementById("stopNav");
  nav.innerHTML = "";
  if (!isNumbered) return;

  const prev = document.createElement("span");
  if (stopId > 1){
    const a = document.createElement("a");
    a.href = "../zastavka" + (stopId - 1) + "/";
    a.textContent = "← " + EYEBROW[currentLang] + " " + (stopId - 1);
    prev.appendChild(a);
  }
  const next = document.createElement("span");
  if (stopId < STOP_COUNT){
    const a = document.createElement("a");
    a.href = "../zastavka" + (stopId + 1) + "/";
    a.textContent = EYEBROW[currentLang] + " " + (stopId + 1) + " →";
    next.appendChild(a);
  }
  nav.appendChild(prev);
  nav.appendChild(next);

  const hint = document.getElementById("navHint");
  if (hint) hint.textContent = NAV_HINT[currentLang];
}

function renderLangSwitcher(){
  const select = document.getElementById("langSwitcher");
  select.innerHTML = "";
  Object.keys(stop.title).forEach(code => {
    const opt = document.createElement("option");
    opt.value = code;
    opt.textContent = LANG_LABELS[code] || code;
    if (code === currentLang) opt.selected = true;
    select.appendChild(opt);
  });
  select.onchange = () => {
    currentLang = select.value;
    localStorage.setItem("guideLang", currentLang);
    history.replaceState(null, "", location.pathname);
    render();
  };
}

render();
