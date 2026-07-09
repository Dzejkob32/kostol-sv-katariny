# Kostol sv. Kataríny Alexandrijskej · Banská Štiavnica

Viacjazyčný webový sprievodca interiérom Kostola sv. Kataríny Alexandrijskej
v Banskej Štiavnici. Návštevník naskenuje QR kód pri zastávke v kostole
a otvorí sa mu lektorský text o danom mieste v jazyku podľa vlastného výberu.

**Živá stránka:** https://dzejkob32.github.io/kostol-sv-katariny/

## Štruktúra

- `docs/` — samotná stránka (GitHub Pages sa publikuje z tohto priečinka)
  - `index.html` — úvodná stránka
  - `zastavka1/` … `zastavka11/` — jednotlivé zastávky prehliadky
  - `svata-katarina/`, `historia/` — dodatky (patrónka kostola, história mesta)
  - `assets/stops/stopN.js` — **texty zastávok** (tu sa upravuje obsah)
  - `assets/tour-data.js` — spoločné popisky rozhrania + texty úvodnej stránky

## Jazyky

Slovenčina, angličtina, nemčina, poľština, maďarčina, taliančina,
francúzština, španielčina, ukrajinčina. Preklady boli vytvorené strojovo
a odporúča sa ich kontrola rodenými hovorcami.

## Úprava obsahu

Text zastávky N sa upravuje v súbore `docs/assets/stops/stopN.js` —
pole `text` obsahuje odseky pre každý jazyk. Otváracie hodiny a kontakt
na úvodnej stránke sa upravujú v `docs/assets/tour-data.js`
(kľúče `hoursValue` a `contactValue`).

## QR kódy

Každá zastávka má stabilnú adresu, napr.
`https://dzejkob32.github.io/kostol-sv-katariny/zastavka1/`.
Adresa s parametrom `?lang=en` otvorí zastávku priamo v danom jazyku.
