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

/* Nájde skupinu (časť kostola), do ktorej zastávka patrí. */
function groupOf(n){
  return GROUPS.find(g => g.stops.indexOf(n) !== -1);
}

function render(){
  document.documentElement.lang = currentLang;
  document.getElementById("stopNumber").textContent = isNumbered ? stopId : "✠";
  document.getElementById("eyebrow").textContent =
    (stop.eyebrow && stop.eyebrow[currentLang]) || EYEBROW[currentLang];
  document.getElementById("title").textContent = stop.title[currentLang];
  document.title = (isNumbered ? EYEBROW[currentLang] + " " + stopId + " · " : "") +
    stop.title[currentLang];
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

  renderProgress();
  renderNav();
  renderLangSwitcher();
}

function renderProgress(){
  const box = document.getElementById("progTop");
  if (!isNumbered){ box.style.display = "none"; return; }
  const g = groupOf(stopId);
  document.getElementById("progGroup").textContent = g ? g.label[currentLang] : "";
  document.getElementById("progCount").textContent = stopId + " / " + STOP_COUNT;
  document.getElementById("progBar").style.width = (stopId / STOP_COUNT * 100) + "%";
}

/* Odkaz na susednú zastávku aj s jej názvom — „← Kaplnka Božského srdca“
   hovorí viac než „← Zastávka 5“. */
function navLink(n, dir){
  const a = document.createElement("a");
  a.href = "../zastavka" + n + "/";
  const d = document.createElement("span");
  d.className = "nav-dir";
  d.textContent = dir === "prev" ? "← " + NAV_PREV[currentLang] : NAV_NEXT[currentLang] + " →";
  const t = document.createElement("span");
  t.className = "nav-title";
  t.textContent = STOPS[n] ? STOPS[n].title[currentLang] : EYEBROW[currentLang] + " " + n;
  a.appendChild(d);
  a.appendChild(t);
  return a;
}

function renderNav(){
  const nav = document.getElementById("stopNav");
  nav.innerHTML = "";
  const hint = document.getElementById("navHint");
  if (!isNumbered){ if (hint) hint.textContent = ""; return; }

  const prev = document.createElement("span");
  if (stopId > 1) prev.appendChild(navLink(stopId - 1, "prev"));
  const next = document.createElement("span");
  if (stopId < STOP_COUNT) next.appendChild(navLink(stopId + 1, "next"));
  nav.appendChild(prev);
  nav.appendChild(next);

  if (hint) hint.textContent = NAV_HINT[currentLang];
}

function renderLangSwitcher(){
  const box = document.getElementById("langSwitcher");
  box.innerHTML = "";
  Object.keys(stop.title).forEach(code => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip" + (code === currentLang ? " on" : "");
    b.setAttribute("lang", code);
    b.setAttribute("aria-label", LANG_LABELS[code] || code);
    b.innerHTML = '<span class="flag"></span><span class="code"></span>';
    b.querySelector(".flag").textContent = LANG_FLAGS[code] || "";
    b.querySelector(".code").textContent = LANG_SHORT[code] || code;
    b.onclick = () => {
      currentLang = code;
      localStorage.setItem("guideLang", currentLang);
      history.replaceState(null, "", location.pathname);
      render();
    };
    box.appendChild(b);
  });
}

render();
