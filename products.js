// Vareliste for autofyll. Rekkefølgen på kategoriene følger en typisk butikkrunde.
// Legg gjerne til flere varer: skriv dem inn i riktig kategori, skilt med |
const CATEGORIES = [
  ["frukt",  "🥦 Frukt og grønt"],
  ["bakeri", "🍞 Brød og bakst"],
  ["meieri", "🧀 Meieri og egg"],
  ["palegg", "🥪 Pålegg"],
  ["kjott",  "🥩 Kjøtt og kylling"],
  ["fisk",   "🐟 Fisk og sjømat"],
  ["middag", "🍝 Middag og tørrvarer"],
  ["bake",   "🧁 Baking og frokost"],
  ["frys",   "🧊 Frys"],
  ["snacks", "🍫 Snacks og godteri"],
  ["drikke", "🥤 Drikke"],
  ["baby",   "🍼 Baby og barn"],
  ["dyr",    "🐾 Dyr"],
  ["hus",    "🧻 Hus og hjem"],
  ["hygiene","🧴 Hygiene"],
  ["annet",  "🛒 Annet"]
];

const PRODUCTS = {
  frukt: "Epler|Bananer|Appelsiner|Klementiner|Sitron|Lime|Pærer|Kiwi|Mango|Ananas|Avokado|Druer|Grønne druer|Røde druer|Jordbær|Blåbær|Bringebær|Bjørnebær|Vannmelon|Honningmelon|Plommer|Nektariner|Fersken|Granateple|Grapefrukt|Dadler|Fiken|Tomater|Cherrytomater|Plommetomater|Agurk|Isbergsalat|Hjertesalat|Ruccola|Salatmiks|Babyspinat|Spinat|Grønnkål|Paprika|Rød paprika|Gul paprika|Grønn paprika|Chili|Løk|Gul løk|Rødløk|Vårløk|Sjalottløk|Hvitløk|Purre|Gulrøtter|Poteter|Mandelpoteter|Søtpotet|Kålrot|Pastinakk|Rødbeter|Selleri|Stangselleri|Brokkoli|Blomkål|Rosenkål|Hodekål|Rødkål|Squash|Aubergine|Sopp|Champignon|Sjampinjong|Ingefær|Mais|Maiskolber|Sukkererter|Asparges|Aspargesbønner|Edamamebønner|Reddik|Fennikel|Persille|Basilikum|Koriander|Dill|Gressløk|Mynte|Rosmarin|Timian|Bladpersille|Spirer|Erteskudd",
  bakeri: "Kebablefse|Kebabbrød|Wraps|Brød|Grovbrød|Kneippbrød|Loff|Fint brød|Rugbrød|Surdeigsbrød|Ciabatta|Baguette|Rundstykker|Grove rundstykker|Polarbrød|Knekkebrød|Flatbrød|Lomper|Lefser|Tortillalefser|Tortilla|Pitabrød|Naanbrød|Pølsebrød|Hamburgerbrød|Toastbrød|Boller|Skoleboller|Kanelboller|Croissant|Horn|Wienerbrød|Muffins|Vafler|Kavring|Skorper|Glutenfritt brød",
  meieri: "Melk|Lettmelk|Helmelk|Ekstra lett melk|Skummet melk|Laktosefri melk|Havremelk|Soyamelk|Mandelmelk|Kulturmelk|Kefir|Biola|Yoghurt|Gresk yoghurt|Vaniljeyoghurt|Yoghurt naturell|Skyr|Kesam|Cottage cheese|Rømme|Lettrømme|Crème fraîche|Matfløte|Kremfløte|Fløte|Smør|Meierismør|Margarin|Bremykt|Brelett|Egg|Frittgående egg|Økologiske egg|Ost|Norvegia|Jarlsberg|Gulost|Brunost|Gudbrandsdalsost|Geitost|Mozzarella|Revet ost|Pizzaost|Parmesan|Fetaost|Halloumi|Brie|Camembert|Kremost|Philadelphia|Smøreost|Prim|Mascarpone|Ricotta|Cheddar|Blåmuggost|Pudding|Sjokoladepudding|Riskrem",
  palegg: "Pålegg|Skinke|Kokt skinke|Røkt skinke|Kalkunpålegg|Kyllingpålegg|Salami|Servelat|Fårepølse|Spekeskinke|Leverpostei|Makrell i tomat|Kaviar|Rekesalat|Italiensk salat|Hummus|Peanøttsmør|Nugatti|Syltetøy|Jordbærsyltetøy|Bringebærsyltetøy|Honning|Sjokoladepålegg|Prim|Banan- og sjokoladepålegg|Sardiner|Røkelaks|Gravlaks|Eggesalat|Tunfisksalat|Pesto|Agurksalat",
  kjott: "Nakkekoteletter|Kebabkjøtt|Pulled pork|Svinekjøtt|Kjøttdeig|Karbonadedeig|Svinedeig|Kyllingkjøttdeig|Kylling|Kyllingfilet|Kyllinglår|Kyllingvinger|Hel kylling|Kyllingbryst|Kalkun|Kalkunfilet|Bacon|Baconterninger|Pølser|Grillpølser|Wienerpølser|Middagspølser|Chorizo|Kjøttboller|Kjøttkaker|Medisterkaker|Medisterdeig|Svinekoteletter|Svinefilet|Svinenakke|Ribbe|Pinnekjøtt|Indrefilet|Ytrefilet|Entrecote|Biff|Mørbrad|Lammekoteletter|Lammelår|Lammestek|Fenalår|Strimlet storfe|Gryterett kjøtt|Høyrygg|Vegetardeig|Vegetarpølser|Tofu",
  fisk: "Laks|Laksefilet|Torsk|Torskefilet|Sei|Seifilet|Hyse|Ørret|Makrell|Fiskeboller|Fiskekaker|Fiskepudding|Fiskegrateng|Reker|Pillede reker|Scampi|Krabbe|Blåskjell|Kamskjell|Tunfisk|Tunfisk på boks|Ansjos|Sild|Kaviar|Plukkfisk|Lutefisk|Klippfisk",
  middag: "Pasta|Spaghetti|Makaroni|Penne|Fusilli|Tagliatelle|Lasagneplater|Tortellini|Ris|Jasminris|Basmatiris|Fullkornsris|Risottoris|Couscous|Bulgur|Quinoa|Nudler|Eggnudler|Risnudler|Taco|Tacoskjell|Tacokrydder|Tacosaus|Salsa|Guacamole|Nachochips|Hakkede tomater|Tomatpuré|Passata|Kokosmelk|Kidneybønner|Kikerter|Linser|Røde linser|Hvite bønner|Bakte bønner|Mais på boks|Erter|Buljong|Kyllingbuljong|Grønnsaksbuljong|Kjøttbuljong|Fond|Soyasaus|Sweet chili|Ketchup|Sennep|Majones|Remulade|Grillsaus|Pastasaus|Pizzasaus|Karripasta|Pizzadeig|Potetmos|Lapskaus|Tomatsuppe|Posesuppe|Olivenolje|Rapsolje|Matolje|Eddik|Balsamico|Salt|Pepper|Krydder|Paprikapulver|Karri|Kanel|Oregano|Hvitløkspulver|Chiliflak|Spisskummen|Gurkemeie|Laurbærblad",
  bake: "Mel|Hvetemel|Sammalt hvete|Grovt mel|Rugmel|Speltmel|Sukker|Melis|Brunt sukker|Vaniljesukker|Bakepulver|Natron|Gjær|Tørrgjær|Kakao|Bakesjokolade|Sjokoladebiter|Kokesjokolade|Mandler|Hakkede nøtter|Valnøtter|Rosiner|Kokosmasse|Havregryn|Lettkokte havregryn|Müsli|Granola|Cornflakes|Frokostblanding|Havrefras|Cheerios|Pannekakemiks|Vaffelmiks|Kakemiks|Gelé|Sirup|Lønnesirup|Strøssel|Marsipan|Kremfløte til baking",
  frys: "Frossen pizza|Pizza|Grandiosa|Fiskepinner|Frosne grønnsaker|Wokgrønnsaker|Frosne erter|Frossen brokkoli|Frossen spinat|Frosne bær|Frosne blåbær|Frosne bringebær|Frossen mango|Pommes frites|Potetbåter|Is|Iskrem|Pinneis|Sorbet|Frossen laks|Frossen torsk|Frosne reker|Kyllingnuggets|Vårruller|Frosne boller|Frossen hamburger|Kjøttkaker frosne|Isbiter",
  snacks: "Chips|Potetgull|Popcorn|Nøtter|Peanøtter|Cashewnøtter|Saltstenger|Maarud|Smågodt|Godteri|Sjokolade|Melkesjokolade|Mørk sjokolade|Kvikk Lunsj|Kjeks|Digestive|Kakao kjeks|Havrekjeks|Riskaker|Tyggegummi|Lakris|Seigmenn|Pastiller|Dip|Dipmiks|Snacks",
  drikke: "Restitusjonsdrikk|Proteindrikk|YT restitusjonsdrikk|Sjokolademelk|Vann|Kullsyrevann|Farris|Imsdal|Mineralvann|Brus|Cola|Pepsi Max|Coca-Cola Zero|Solo|Fanta|Sprite|Juice|Appelsinjuice|Eplejuice|Smoothie|Saft|Husholdningssaft|Iste|Energidrikk|Kaffe|Filterkaffe|Kaffebønner|Kapsler|Pulverkaffe|Te|Grønn te|Kakao drikke|O'boy|Øl|Alkoholfritt øl|Cider|Tonic|Sportsdrikk",
  baby: "Bleier|Våtservietter|Barnemat|Grøt|Barnegrøt|Morsmelkerstatning|Klemmepose|Smokk|Babyshampoo|Bleiekrem|Barnetannkrem|Fruktpuré",
  dyr: "Kattemat|Tørrfôr katt|Våtfôr katt|Kattesand|Hundemat|Tørrfôr hund|Hundegodbiter|Godbiter|Fuglefrø|Fiskefôr",
  hus: "Toalettpapir|Dopapir|Tørkepapir|Tørkerull|Servietter|Oppvaskmiddel|Oppvasktabletter|Maskinoppvask|Zalo|Klesvask|Vaskemiddel|Tøymykner|Flekkfjerner|Vaskepulver|Grønnsåpe|Allrengjøring|Klorin|Glassrens|Kalkfjerner|Oppvaskbørste|Svamper|Klut|Mikrofiberklut|Søppelposer|Bioposer|Fryseposer|Plastfolie|Aluminiumsfolie|Bakepapir|Matpapir|Lyspærer|Batterier|Stearinlys|Telys|Fyrstikker|Lighter|Hansker|Matbokser|Zip-poser|Kaffefilter|Støvsugerposer",
  hygiene: "Tannkrem|Tannbørste|Tanntråd|Munnskyll|Sjampo|Balsam|Dusjsåpe|Såpe|Håndsåpe|Deodorant|Barberhøvel|Barberskum|Bodylotion|Håndkrem|Leppepomade|Solkrem|Bomullspads|Bomullspinner|Bind|Tamponger|Truseinnlegg|Plaster|Paracet|Ibux|Nesespray|Halstabletter|Vitaminer|Tran|Omega-3|Kondomer|Hårstrikk|Våtservietter"
};

// Bygg en flat oppslagsliste: [{name, cat, key}]
const CATALOG = [];
const CATALOG_BY_KEY = {};
for (const [cat] of CATEGORIES) {
  if (!PRODUCTS[cat]) continue;
  for (const name of PRODUCTS[cat].split("|")) {
    const key = name.toLowerCase();
    if (CATALOG_BY_KEY[key]) continue;
    const p = { name, cat, key };
    CATALOG.push(p);
    CATALOG_BY_KEY[key] = p;
  }
}
