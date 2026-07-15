/* ============================================================
   PLÁN KOSTOLA
   -> Zdieľaný medzi úvodnou stránkou a všetkými zastávkami.
   -> Orientácia: hore východ (presbytérium), vľavo sever (vchod).
      Súradnice zodpovedajú architektonickému pôdorysu kostola.
   -> Použitie:  renderPlan(el, lang, { active: 6, base: "../" })
      active = číslo zvýraznenej zastávky (alebo null)
      base   = predpona odkazov ("" na úvodnej stránke, "../" na zastávkach)
   ============================================================ */

/* Poloha zastávok v súradniciach pôdorysu (viewBox 0 0 340 584, posun +16). */
const PLAN_POS = {
  1:  { x:170, y:300 },   // stred lode
  2:  { x:105, y:471 },   // severný vchod — v západnom trávé, naľavo od chórusu
  3:  { x:81,  y:353 },   // kaplnka Piety
  4:  { x:81,  y:278 },   // sv. Ján Evanjelista
  5:  { x:81,  y:203 },   // Božské srdce a krstiteľnica
  6:  { x:170, y:112 },   // presbytérium
  7:  { x:259, y:278 },   // sv. Ignác z Loyoly
  8:  { x:259, y:353 },   // sv. Ján Nepomucký
  9:  { x:259, y:428 },   // P. Mária Lurdská (bývalý vchod)
  10: { x:170, y:526 },   // renesančná predsieň
  11: { x:170, y:471 }    // chórus (na poschodí nad západným trávé)
};

const PLAN_NS = "http://www.w3.org/2000/svg";

function planMarkup(lang){
  const t = k => (PLAN_I18N[k][lang] || PLAN_I18N[k].sk);
  return '' +
'<svg class="plan-svg" viewBox="0 0 340 584" xmlns="http://www.w3.org/2000/svg"' +
'     role="img" aria-label="' + t("title") + '">' +
'  <defs>' +
'    <marker id="planAr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">' +
'      <path d="M0,0 L7,3.5 L0,7 Z" fill="#2F7DBF"/>' +
'    </marker>' +
'  </defs>' +
'  <text class="plan-dir" x="170" y="14">' + t("east") + '</text>' +
'  <g transform="translate(0,16)">' +
     /* prístavba na východnej strane — nie je zastávkou prehliadky */
'    <rect class="plan-aux" x="145" y="18" width="50" height="34" rx="2"/>' +
'    <path class="plan-aux" d="M148,52 Q170,74 192,52"/>' +
     /* presbytérium (východ) */
'    <path class="plan-presb" d="M105,150 L105,104 L134,72 L206,72 L235,104 L235,150 Z"/>' +
     /* loď + západné trávé (pod chórusom) */
'    <rect class="plan-nave" x="105" y="150" width="130" height="292"/>' +
'    <rect class="plan-nave" x="105" y="442" width="130" height="58"/>' +
     /* renesančná predsieň (západ) */
'    <rect class="plan-room" x="122" y="500" width="96" height="52"/>' +
     /* severné kaplnky */
'    <rect class="plan-room" x="57" y="170" width="48" height="66"/>' +
'    <rect class="plan-room" x="57" y="245" width="48" height="66"/>' +
'    <rect class="plan-room" x="57" y="320" width="48" height="66"/>' +
     /* sakristia */
'    <rect class="plan-aux" x="235" y="170" width="58" height="66"/>' +
'    <text class="plan-room-lbl" x="264" y="207">' + t("sacristy") + '</text>' +
     /* južné kaplnky (posledná = bývalý vchod, dnes P. Mária Lurdská) */
'    <rect class="plan-room" x="235" y="245" width="48" height="66"/>' +
'    <rect class="plan-room" x="235" y="320" width="48" height="66"/>' +
'    <rect class="plan-room" x="235" y="395" width="48" height="66"/>' +
     /* vchod */
'    <text class="plan-entry-lbl" x="42" y="461">' + t("entrance") + '</text>' +
'    <line class="plan-entry" x1="42" y1="471" x2="88" y2="471" marker-end="url(#planAr)"/>' +
'    <g class="plan-dots"></g>' +
'  </g>' +
'</svg>';
}

function renderPlan(el, lang, opts){
  opts = opts || {};
  const active = opts.active || null;
  const base = opts.base || "";
  if (!el) return;

  el.innerHTML = planMarkup(lang);
  const dots = el.querySelector(".plan-dots");

  Object.keys(PLAN_POS).forEach(key => {
    const n = Number(key);
    const p = PLAN_POS[n];
    const on = (n === active);

    /* Každá zastávka je odkaz — z plánu sa dá preskočiť kamkoľvek. */
    const a = document.createElementNS(PLAN_NS, "a");
    a.setAttribute("href", base + "zastavka" + n + "/");
    a.setAttribute("class", "plan-dot" + (on ? " on" : ""));

    /* Stránka zastávky načítava len dáta susedných zastávok, takže názov nemusí byť
       po ruke — vtedy padneme späť na „Zastávka N“. */
    const name = (STOPS[n] && STOPS[n].title[lang])
      ? n + " · " + STOPS[n].title[lang]
      : EYEBROW[lang] + " " + n;
    const tip = document.createElementNS(PLAN_NS, "title");
    tip.textContent = on ? name + " — " + (PLAN_I18N.youAreHere[lang] || PLAN_I18N.youAreHere.sk)
                         : name;
    a.appendChild(tip);

    /* Neviditeľná väčšia plocha — samotné koliesko (r=12) je na prst primalý cieľ. */
    const hit = document.createElementNS(PLAN_NS, "circle");
    hit.setAttribute("class", "dot-hit");
    hit.setAttribute("cx", p.x); hit.setAttribute("cy", p.y); hit.setAttribute("r", 20);
    a.appendChild(hit);

    const c = document.createElementNS(PLAN_NS, "circle");
    c.setAttribute("class", "dot-face");
    c.setAttribute("cx", p.x); c.setAttribute("cy", p.y); c.setAttribute("r", 12);
    a.appendChild(c);

    const txt = document.createElementNS(PLAN_NS, "text");
    txt.setAttribute("x", p.x); txt.setAttribute("y", p.y + 4);
    txt.textContent = n;
    a.appendChild(txt);

    dots.appendChild(a);
  });
}
