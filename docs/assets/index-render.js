/* Vykresľovanie úvodnej stránky vo zvolenom jazyku.
   Texty úvodnej stránky sú v tour-data.js (INDEX_I18N),
   názvy zastávok sa preberajú zo súborov assets/stops/*.js,
   zoskupenie podľa častí kostola je v GROUPS. */

const urlLang = new URLSearchParams(location.search).get("lang");
let currentLang = urlLang || localStorage.getItem("guideLang") || "sk";
if (!INDEX_I18N.intro[currentLang]) currentLang = "sk";
if (urlLang && INDEX_I18N.intro[urlLang]) localStorage.setItem("guideLang", urlLang);

function render(){
  document.documentElement.lang = currentLang;
  const t = key => INDEX_I18N[key][currentLang];

  document.getElementById("eyebrow").textContent = t("eyebrow");
  document.getElementById("title").textContent = t("churchName");
  document.getElementById("heroSub").textContent =
    t("heroSub").replace("{rok}", new Date().getFullYear());
  document.title = t("churchName") + " · Banská Štiavnica";
  document.getElementById("intro").textContent = t("intro");
  document.getElementById("addressLabel").textContent = t("addressLabel");
  document.getElementById("addressValue").textContent = t("addressValue");
  document.getElementById("hoursLabel").textContent = t("hoursLabel");
  renderHours(t("hoursValue"));
  document.getElementById("contactLabel").textContent = t("contactLabel");
  document.getElementById("contactValue").textContent = t("contactValue");
  document.getElementById("stopsHeading").textContent = t("stopsHeading");
  document.getElementById("extrasHeading").textContent = t("extrasHeading");
  document.getElementById("footerLabel").textContent = FOOTER_LABEL[currentLang];

  document.getElementById("planTitle").textContent = PLAN_I18N.title[currentLang];
  renderPlan(document.getElementById("planHolder"), currentLang, { base: "" });

  renderGroups();
  renderExtras();
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

/* Zastávky zoskupené podľa častí kostola — namiesto jedného dlhého zoznamu. */
function renderGroups(){
  const wrap = document.getElementById("groups");
  wrap.innerHTML = "";
  GROUPS.forEach(g => {
    const sec = document.createElement("div");
    sec.className = "group";

    const lbl = document.createElement("p");
    lbl.className = "group-label";
    lbl.textContent = g.label[currentLang];
    sec.appendChild(lbl);

    const ul = document.createElement("ul");
    ul.className = "stop-list";
    g.stops.forEach(n => {
      if (!STOPS[n]) return;
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "zastavka" + n + "/";
      const no = document.createElement("span");
      no.className = "stop-no";
      no.textContent = n;
      const tx = document.createElement("span");
      tx.textContent = STOPS[n].title[currentLang];
      a.appendChild(no);
      a.appendChild(tx);
      li.appendChild(a);
      ul.appendChild(li);
    });
    sec.appendChild(ul);
    wrap.appendChild(sec);
  });
}

function renderExtras(){
  const ul = document.getElementById("extraList");
  ul.innerHTML = "";
  [["katarina", "svata-katarina/"], ["stiavnica", "historia/"]].forEach(([key, href]) => {
    if (!STOPS[key]) return;
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = href;
    const no = document.createElement("span");
    no.className = "stop-no";
    no.textContent = "✠";
    const tx = document.createElement("span");
    tx.textContent = STOPS[key].title[currentLang];
    a.appendChild(no);
    a.appendChild(tx);
    li.appendChild(a);
    ul.appendChild(li);
  });
}

function renderLangSwitcher(){
  const box = document.getElementById("langSwitcher");
  box.innerHTML = "";
  Object.keys(LANG_LABELS).forEach(code => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip" + (code === currentLang ? " on" : "");
    b.setAttribute("lang", code);
    b.setAttribute("aria-label", LANG_LABELS[code]);
    /* Skratka (SK) sa zobrazí na úzkych displejoch, celý názov na širokých —
       rieši to CSS, aby sa všetkých 9 jazykov zmestilo naraz bez posúvania. */
    b.innerHTML = '<span class="flag"></span><span class="code"></span><span class="name"></span>';
    b.querySelector(".flag").textContent = LANG_FLAGS[code] || "";
    b.querySelector(".code").textContent = LANG_SHORT[code] || code;
    b.querySelector(".name").textContent = LANG_LABELS[code];
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
