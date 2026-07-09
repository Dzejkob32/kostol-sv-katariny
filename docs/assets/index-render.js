/* Vykresľovanie úvodnej stránky vo zvolenom jazyku.
   Texty úvodnej stránky sú v tour-data.js (INDEX_I18N),
   názvy zastávok sa preberajú zo súborov assets/stops/*.js. */

const urlLang = new URLSearchParams(location.search).get("lang");
let currentLang = urlLang || localStorage.getItem("guideLang") || "sk";
if (!INDEX_I18N.intro[currentLang]) currentLang = "sk";
if (urlLang && INDEX_I18N.intro[urlLang]) localStorage.setItem("guideLang", urlLang);

function render(){
  document.documentElement.lang = currentLang;
  const t = key => INDEX_I18N[key][currentLang];

  document.getElementById("eyebrow").textContent = t("eyebrow");
  document.getElementById("title").textContent = t("churchName");
  document.title = t("churchName") + " · Banská Štiavnica";
  document.getElementById("intro").textContent = t("intro");
  document.getElementById("langsLabel").textContent = LANGS_LABEL[currentLang];
  document.getElementById("addressLabel").textContent = t("addressLabel");
  document.getElementById("addressValue").textContent = t("addressValue");
  document.getElementById("hoursLabel").textContent = t("hoursLabel");
  renderHours(t("hoursValue"));
  document.getElementById("contactLabel").textContent = t("contactLabel");
  document.getElementById("contactValue").textContent = t("contactValue");
  document.getElementById("stopsHeading").textContent = t("stopsHeading");
  document.getElementById("extrasHeading").textContent = t("extrasHeading");
  document.getElementById("footerLabel").textContent = FOOTER_LABEL[currentLang];

  const list = document.getElementById("stopList");
  list.innerHTML = "";
  for (let i = 1; i <= STOP_COUNT; i++){
    if (!STOPS[i]) continue;
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "zastavka" + i + "/";
    a.textContent = i + " · " + STOPS[i].title[currentLang];
    li.appendChild(a);
    list.appendChild(li);
  }

  const extras = document.getElementById("extraList");
  extras.innerHTML = "";
  [["katarina", "svata-katarina/"], ["stiavnica", "historia/"]].forEach(([key, href]) => {
    if (!STOPS[key]) return;
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = href;
    a.textContent = "✠ " + STOPS[key].title[currentLang];
    li.appendChild(a);
    extras.appendChild(li);
  });

  renderLangSwitcher();
}

function renderHours(periods){
  const box = document.getElementById("hoursValue");
  box.innerHTML = "";
  box.className = "hours";
  periods.forEach(p => {
    const block = document.createElement("div");
    block.className = "hours-period";
    const season = document.createElement("p");
    season.className = "hours-season";
    season.textContent = p.season;
    block.appendChild(season);
    p.rows.forEach(row => {
      const line = document.createElement("p");
      line.className = "hours-time";
      line.textContent = row;
      block.appendChild(line);
    });
    box.appendChild(block);
  });
}

function renderLangSwitcher(){
  const select = document.getElementById("langSwitcher");
  select.innerHTML = "";
  Object.keys(LANG_LABELS).forEach(code => {
    const opt = document.createElement("option");
    opt.value = code;
    opt.textContent = LANG_LABELS[code];
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
