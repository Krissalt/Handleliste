// Versjonslogg for Loadout. Nyeste først. Øverste versjon er den appen viser.
const CHANGELOG = [
  { v: "14", date: "2026-11-21", items: [
    "Versjonslogg: trykk på versjonsnummeret nederst for å se hva som er endret",
    "Etter en oppdatering vises det kort hva som er nytt"
  ]},
  { v: "13", date: "2026-11-21", items: [
    "Skriver du en vare som allerede står på lista, legges antallet til (melk 3 + 3 = 6 stk)",
    "Regner om enheter: 1 kg + 500 g = 1,5 kg, 1 l + 5 dl = 1,5 l",
    "Forslagene viser «På lista» for varer som allerede er der",
    "Fiks: «2 melk» ble ikke lest som antall i versjon 12"
  ]},
  { v: "12", date: "2026-11-21", items: [
    "Kameraknapp: les ingredienser fra bilde av en oppskrift",
    "Se over, rett og velg ingredienser før de legges på lista"
  ]},
  { v: "11", date: "2026-11-20", items: [
    "Nytt navn: Loadout",
    "Nytt ikon og mørk stil med oransje farge"
  ]},
  { v: "10", date: "2026-11-07", items: [
    "Fiks: toppen og bunnen ble kuttet av på Samsung/Android",
    "Flere varer i varelista (nakkekoteletter, kebablefse, restitusjonsdrikk …)"
  ]},
  { v: "9", date: "2026-11-07", items: [
    "Appen henter alltid nyeste versjon når du er på nett",
    "Versjonsnummer vises nederst i lista"
  ]},
  { v: "8", date: "2026-11-07", items: [
    "Hold inne på en vare for å endre navnet (rett skrivefeil)"
  ]},
  { v: "7", date: "2026-11-07", items: [
    "Del-knapp: send lista på e-post, del til andre apper eller kopier"
  ]},
  { v: "6", date: "2026-11-07", items: [
    "+ og − lukkes når du trykker utenfor",
    "Antallet vises tydelig på varen (f.eks. «3 stk»)"
  ]},
  { v: "5", date: "2026-11-07", items: [
    "Bruker appens egen mørke modus i stedet for telefonens tvungne mørklegging"
  ]},
  { v: "4", date: "2026-11-07", items: [
    "Fiks: appen ble kuttet av i topp og bunn på Android"
  ]},
  { v: "3", date: "2026-11-07", items: [
    "Trykk på navnet for + og − på antall",
    "«Sorter»: varer i «Annet» samles, velg kategori én gang så huskes den"
  ]},
  { v: "2", date: "2026-11-07", items: [
    "Autofyll fra en innebygd vareliste med nesten 600 dagligvarer",
    "15 kategorier i rekkefølgen du går gjennom butikken"
  ]},
  { v: "1", date: "2026-11-07", items: [
    "Første versjon: handleliste som virker uten nett og uten innlogging",
    "Kategorier, avkrysning, hurtigknapper og angre"
  ]}
];
