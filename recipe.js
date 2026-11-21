// Leser ingredienser ut av teksten fra et bilde av en oppskrift.
// parseRecipe(text) -> [{name, qty, checked, catalog}]
// Krever products.js (CATALOG_BY_KEY) og guessCat() fra siden.

const RECIPE_NUM_WORDS = {
  "en":1,"ei":1,"ett":1,"én":1,"to":2,"tre":3,"fire":4,"fem":5,"seks":6,"sju":7,"syv":7,"åtte":8,"ni":9,"ti":10,
  "en halv":0.5,"et halvt":0.5,"halv":0.5,"halvt":0.5
};
const RECIPE_FRACTIONS = {"½":0.5,"¼":0.25,"¾":0.75,"⅓":1/3,"⅔":2/3,"⅛":0.125};
// Enheter som gir mening på en handleliste – resten (ss, ts, klype …) tas bort
const SHOP_UNITS = {g:"g",gram:"g",gr:"g",kg:"kg",kilo:"kg",dl:"dl",l:"l",liter:"l",stk:"stk",boks:"boks",bokser:"boks",
  pk:"pk",pakke:"pk",pakker:"pk",pose:"pose",poser:"pose",beger:"beger",flaske:"flaske",flasker:"flaske",
  fedd:"fedd",bunt:"bunt",potte:"potte",skive:"skiver",skiver:"skiver",glass:"glass"};
const COOK_UNITS = ["ss","ts","msk","tsk","krm","cl","ml","klype","klyper","neve","never","dråper","dråpe","kopp","kopper","cup","cups","stilk","stilker","blad","porsjon"];
const PANTRY = ["salt","pepper","sort pepper","vann","olje","olivenolje","rapsolje","smør til steking","matolje","sukker","mel","hvetemel","isbiter"];
const SKIP_WORDS = ["vann","kokende vann","varmt vann","kaldt vann","is"];
const NOT_INGREDIENT = /^(slik gj[øo]r du|fremgangsm[åa]te|framgangsm[åa]te|dette trenger du|du trenger|ingredienser|tilbehør|til servering|servering|porsjoner|ca\.? \d+ min|steketid|tips|oppskrift|næringsinnhold|per porsjon|instruksjoner|metode|pynt)/i;

function recipeNumber(s){
  s = s.trim().toLowerCase();
  if (RECIPE_FRACTIONS[s] != null) return RECIPE_FRACTIONS[s];
  if (RECIPE_NUM_WORDS[s] != null) return RECIPE_NUM_WORDS[s];
  let m = s.match(/^(\d+)\s*([½¼¾⅓⅔⅛])$/); if (m) return +m[1] + RECIPE_FRACTIONS[m[2]];
  m = s.match(/^(\d+)\s*\/\s*(\d+)$/); if (m && +m[2]) return +m[1] / +m[2];
  m = s.match(/^(\d+(?:[.,]\d+)?)\s*-\s*(\d+(?:[.,]\d+)?)$/); if (m) return parseFloat(m[2].replace(",", "."));
  m = s.match(/^\d+(?:[.,]\d+)?$/); if (m) return parseFloat(s.replace(",", "."));
  return null;
}

function cleanOcrLine(line){
  return line
    .replace(/[|•●▪■□◦·*–—]+/g, " ")
    .replace(/^\s*[-–o>]\s+/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanName(name){
  let n = name
    .replace(/\(.*?\)/g, " ")               // (ca. 400 g)
    .replace(/\s+(eller|evt\.?|alternativt)\s+.*$/i, "")
    .split(/[,:;]/)[0]                      // "løk, finhakket" -> "løk"
    .replace(/\b(finhakket|hakket|grovhakket|revet|i skiver|i biter|i terninger|skåret|delt|pillet|presset|smeltet|myknet|romtemperert|kald|kaldt|varm|frisk|friske|ferske?|tørket|tørkede|økologisk|store?|små|liten|lite|middels|til steking|til pensling|til servering|etter smak|etter ønske|ca\.?|à|av)\b/gi, " ")
    .replace(/[^a-zæøåéèüöäA-ZÆØÅÉ0-9\- ']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return n;
}

// Tekstgjenkjenning bommer ofte på æ, ø og å – sammenlign uten dem
function ocrFold(s){
  return s.toLowerCase().replace(/æ/g,"e").replace(/[øö]/g,"o").replace(/[åä]/g,"a").replace(/[éè]/g,"e")
    .replace(/[^a-z0-9 ]/g,"").replace(/\s+/g," ").trim();
}
let FOLD_INDEX = null;
function foldIndex(){
  if (FOLD_INDEX) return FOLD_INDEX;
  FOLD_INDEX = new Map();
  if (typeof CATALOG !== "undefined") for (const p of CATALOG) { const f = ocrFold(p.name); if (!FOLD_INDEX.has(f)) FOLD_INDEX.set(f, p); }
  return FOLD_INDEX;
}
function editDist(a, b, max){
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({length: b.length + 1}, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i]; let best = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j-1] + 1, prev[j-1] + (a[i-1] === b[j-1] ? 0 : 1));
      if (cur[j] < best) best = cur[j];
    }
    if (best > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}
function matchCatalog(name){
  const key = name.toLowerCase().trim();
  if (typeof CATALOG_BY_KEY === "undefined" || !key) return null;
  if (CATALOG_BY_KEY[key]) return CATALOG_BY_KEY[key];
  // flertall/entall: "tomat" -> "Tomater", "avokadoer" -> "Avokado" ...
  const forms = k => [k, k + "er", k + "r", k + "e", k.replace(/er$/, ""), k.replace(/r$/, ""), k.replace(/e$/, "")];
  for (const v of forms(key)) if (CATALOG_BY_KEY[v]) return CATALOG_BY_KEY[v];
  // samme uten æøå ("lok" -> "Løk", "red paprika" -> "Rød paprika")
  const idx = foldIndex(), f = ocrFold(key);
  for (const v of forms(f)) if (idx.has(v)) return idx.get(v);
  // nesten likt – én eller to feilleste bokstaver
  if (f.length >= 5) {
    const max = f.length >= 9 ? 2 : 1;
    let best = null, bestD = max + 1;
    for (const [k, p] of idx) { const d = editDist(f, k, max); if (d < bestD) { best = p; bestD = d; } }
    if (best) return best;
  }
  return null;
}

function fixOcrUnits(line){
  return line
    .replace(/^(\d+(?:[.,]\d+)?)\s*(?:di|d1|dI|dL)\b/, "$1 dl")
    .replace(/^(\d+(?:[.,]\d+)?)\s*(?:9|q)\s+(?=[a-zæøå])/i, "$1 g ")
    .replace(/^[lI](\s+(?:dl|g|kg|ss|ts|boks|pk|stk|fedd)\b)/, "1$1")
    .replace(/^([lI])\s+(?=[a-zæøå]{3,})/, "1 ");
}
function parseRecipe(text){
  const out = [];
  const seen = new Map();
  const lines = String(text || "").split(/\r?\n/).map(cleanOcrLine).map(fixOcrUnits).filter(Boolean);
  const numRe = "(?:\\d+\\s*[½¼¾⅓⅔⅛]|\\d+\\s*\\/\\s*\\d+|\\d+(?:[.,]\\d+)?(?:\\s*-\\s*\\d+(?:[.,]\\d+)?)?|[½¼¾⅓⅔⅛]|en halv|et halvt|halvt?|ett|en|ei|én|to|tre|fire|fem|seks|sju|syv|åtte|ni|ti)";
  const unitRe = "([a-zæøå]+\\.?)";
  const re = new RegExp("^" + numRe + "\\s*" + unitRe + "?\\s+(.+)$", "i");
  const reNum = new RegExp("^(" + numRe + ")", "i");

  for (const raw of lines) {
    if (raw.length < 2 || raw.length > 70) continue;
    if (NOT_INGREDIENT.test(raw)) continue;
    let qtyNum = null, unit = "", rest = raw, hadQty = false;

    const numM = raw.match(reNum);
    const m = raw.match(re);
    if (numM && m) {
      hadQty = true;
      qtyNum = recipeNumber(numM[1]);
      rest = raw.slice(numM[0].length).trim();
      const u = (rest.match(/^([a-zæøå]+)\.?\s+/i) || [])[1];
      if (u) {
        const ul = u.toLowerCase();
        if (SHOP_UNITS[ul]) { unit = SHOP_UNITS[ul]; rest = rest.slice(rest.indexOf(u) + u.length).replace(/^\.?\s*/, ""); }
        else if (COOK_UNITS.includes(ul)) { unit = "__cook"; rest = rest.slice(rest.indexOf(u) + u.length).replace(/^\.?\s*/, ""); }
      }
    }
    // Lange setninger uten mengde er nesten alltid fremgangsmåte
    const words = rest.split(" ").length;
    if (!hadQty && (words > 4 || /[.!?]$/.test(rest))) continue;
    if (hadQty && words > 8) continue;
    if (/^\d/.test(rest)) continue;
    if (/^(porsjoner|personer|pers\.?|porsj\.?|biter|minutter|min\.?|timer)$/i.test(rest)) continue;

    // "Salt og pepper" -> to varer når begge delene er kjente
    const parts = rest.split(/\s+og\s+/i);
    if (parts.length === 2 && parts.every(p => matchCatalog(cleanName(p)))) {
      for (const p of parts) addOne(matchCatalog(cleanName(p)).name, "", false, true);
      continue;
    }
    // Prøv først uten å fjerne beskrivende ord ("revet ost"), så med
    const light = rest.replace(/\(.*?\)/g, " ").split(/[,:;]/)[0].replace(/\s+/g, " ").trim();
    let cat = matchCatalog(light);
    let name = cat ? cat.name : cleanName(rest);
    if (name.length < 2 || /^\d+$/.test(name)) continue;
    if (!cat) cat = matchCatalog(name);
    if (!hadQty) {
      // Uten mengde må det være en kjent vare, eller et kort navn appen kan sortere
      const known = cat || (name.split(" ").length <= 2 && typeof guessCat === "function" && guessCat(name) !== "annet");
      if (!known) continue;
    }
    if (cat) name = cat.name; else name = name.charAt(0).toUpperCase() + name.slice(1);

    let qty = "";
    if (qtyNum && unit !== "__cook") {
      const num = String(Math.round(qtyNum * 100) / 100).replace(".", ",");
      qty = unit ? `${num} ${unit}` : (qtyNum > 1 ? num : "");
    }
    addOne(name, qty, null, !!cat);
  }
  return out;

  function addOne(name, qty, checked, isCat){
    const key = name.toLowerCase();
    if (SKIP_WORDS.includes(key)) return;
    if (seen.has(key)) {
      const prev = out[seen.get(key)];
      if (!prev.qty && qty) prev.qty = qty;
      return;
    }
    seen.set(key, out.length);
    out.push({ name, qty, checked: checked == null ? !PANTRY.includes(key) : checked, catalog: isCat });
  }
}

if (typeof module !== "undefined") module.exports = { parseRecipe, cleanName, recipeNumber };
