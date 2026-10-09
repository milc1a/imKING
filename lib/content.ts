export const site = {
  name: "imKING",
  email: "milan.kralj@siol.com",
  linkedin: "https://www.linkedin.com/in/milan-kralj-83221317b/",
  place: "Črešnjevci, Gornja Radgona",
};

export const nav = [
  { href: "#kako", label: "KNX", hideOn: "sm" },
  { href: "#reference", label: "Reference" },
  { href: "#o-meni", label: "O meni", hideOn: "xs" },
  { href: "#kontakt", label: "Kontakt" },
] as const;

export const sectionIds = ["kako", "prednosti", "reference", "vprasanja", "o-meni", "kontakt"];

export type IconName = "globe" | "sliders" | "shield" | "bolt" | "lock" | "phone";

export const benefits: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "globe",
    title: "Svetovni standard in združljivost",
    text: "Sistem ni vezan na enega proizvajalca. Več kot 500 proizvajalcev izdeluje opremo, ki med seboj popolnoma sodeluje.",
  },
  {
    icon: "sliders",
    title: "Neskončna prilagodljivost",
    text: "Za spremembo delovanja ni treba posegati v stene. Funkcije se spremenijo s ponovnim programiranjem.",
  },
  {
    icon: "shield",
    title: "Visoka zanesljivost",
    text: "Sistem nima centralne enote. Če odpove posamezna naprava, preostala inštalacija deluje naprej.",
  },
  {
    icon: "bolt",
    title: "Prihranek energije",
    text: "Ogrevanje, hlajenje in senčila delujejo usklajeno. Senzorji zaznajo prisotnost in porabo prilagodijo potrebam.",
  },
  {
    icon: "lock",
    title: "Večja varnost in udobje",
    text: "Simulacija prisotnosti, javljanje napak, povezava z alarmom in scene, kot je »odhod od doma«.",
  },
  {
    icon: "phone",
    title: "Upravljanje kjerkoli",
    text: "Stikala na steni ali aplikacija na telefonu. Vsak prostor in sistem na enem mestu.",
  },
];

export const reference = {
  title: "Stanovanjska hiša Črešnjevci",
  lead: "Celotna KNX inštalacija v novogradnji, od električnega načrta do programiranja in aplikacije za upravljanje.",
  facts: [
    ["Lokacija", "Gornja Radgona"],
    ["Objekt", "Novogradnja"],
    ["Upravljanje", "ComfortClick Home Server"],
    ["Zaključeno", "2023"],
  ],
  steps: [
    ["Električni načrt", "Pred izvedbo KNX inštalacij je potrebno narisati električni načrt."],
    ["Utori in cevi v stenah", "Rezkanje utorov ter vgradnja inštalacijskih cevi v stene."],
    ["Razvod po tleh", "Razpeljava inštalacijskih cevi in njihova pritrditev na hidroizolacijo."],
    ["Oprema in omara", "Stikala, aktivna oprema ter glavna električna omara."],
  ],
  rooms: [
    "Tloris",
    "Dnevna soba",
    "Kuhinja",
    "Jedilnica",
    "Kopalnica",
    "Spalnica",
    "Senčila",
    "Ogrevanje",
    "Hlajenje",
    "Alarm",
  ],
};

export const faq = [
  {
    q: "Je vgradnja KNX pametne inštalacije smiselna?",
    a: "Najbolj smiselna je pri novogradnji ali celoviti prenovi, ko se vodilo KNX položi skupaj z ostalo elektro inštalacijo. Ker gre za odprt svetovni standard, inštalacija ni vezana na enega proizvajalca in jo lahko kasneje dopolnjujete.",
  },
  {
    q: "Kaj vse lahko nadziram in krmilim preko KNX inštalacije?",
    a: "Razsvetljavo, ogrevanje, hlajenje, senčila, varnostne sisteme in multimedijo. Vse deluje v enem sistemu, upravljate pa lahko s stikali na steni ali prek aplikacije.",
  },
];

export const about = {
  name: "Milan Kralj",
  role: "Inženir elektrotehnike, razvojnik strojne opreme",
  timeline: [
    ["FERI, Univerza v Mariboru", "Elektrotehnika"],
    ["ELTi", "Razvojnik, RF tehnika"],
    ["Elrad International", "Razvojnik HW"],
    ["EMSISO-POCLEIN", "Senior HW inženir"],
  ],
  bio: [
    "Po študiju elektrotehnike (FERI – Univerza v MB) sem se zaposlil na ELTi-ju (kot razvojnik in aktivni tehnolog), kjer sem pridobil izkušnje iz področja RF tehnike.",
    "Svojo pot sem nadaljeval na uveljavljenem podjetju Elrad International (kot razvojnik HW). Sedaj sem zaposlen v visokotehnološkem podjetju EMSISO-POCLEIN (kot senior HW inženir) in se v sklopu podjetja ukvarjam z razvojem inverterjev za električna vozila.",
    "Življenjska izkušnja me je popeljala tudi v svet KNX pametnih inštalacij, s katerimi sem se začel ukvarjati v sklopu novogradnje. Projekt sem uspešno zaključil leta 2023.",
  ],
};

/* KNX bus diagram */
export type DeviceKey = "luci" | "ogr" | "sen" | "sti" | "alm" | "srv";
export type Device = { x: number; top: boolean; name: string; sub: string; pa: string; w?: number };

export const devices: Record<DeviceKey, Device> = {
  luci: { x: 150, top: true, name: "Luči", sub: "aktuator", pa: "1.1.1" },
  ogr: { x: 290, top: true, name: "Ogrevanje", sub: "termostat", pa: "1.1.6" },
  sen: { x: 430, top: true, name: "Senčila", sub: "aktuator", pa: "1.1.2" },
  sti: { x: 220, top: false, name: "Stikala", sub: "tipkalo", pa: "1.1.4" },
  alm: { x: 360, top: false, name: "Alarm", sub: "senzor", pa: "1.1.7" },
  srv: { x: 466, top: false, name: "Strežnik", sub: "aplikacija", pa: "1.1.5", w: 84 },
};

export type Telegram = { f: DeviceKey; t: DeviceKey; ga: string; txt: string; v: string; room: string };

export const telegrams: Telegram[] = [
  { f: "sti", t: "luci", ga: "1/1/1", txt: "Luči · dnevna soba", v: "VKLOP", room: "Dnevna soba" },
  { f: "ogr", t: "srv", ga: "3/1/2", txt: "Temperatura · dnevna", v: "21,5 °C", room: "Ogrevanje" },
  { f: "srv", t: "sen", ga: "2/1/0", txt: "Senčila · jug", v: "DOL 80 %", room: "Senčila" },
  { f: "alm", t: "srv", ga: "4/0/1", txt: "Prisotnost · predprostor", v: "ZAZNANO", room: "Alarm" },
  { f: "sti", t: "luci", ga: "1/1/1", txt: "Luči · dnevna soba", v: "IZKLOP", room: "Dnevna soba" },
  { f: "srv", t: "ogr", ga: "3/1/0", txt: "Ogrevanje · nastavitev", v: "22,0 °C", room: "Ogrevanje" },
];

export const initialLog = [
  { pa: "1.1.6", ga: "3/1/2", txt: "Temperatura · dnevna", v: "21,4 °C" },
  { pa: "1.1.5", ga: "2/1/0", txt: "Senčila · jug", v: "GOR" },
  { pa: "1.1.7", ga: "4/0/1", txt: "Prisotnost · predprostor", v: "ZAZNANO" },
];

/* Light spots on the night photo (image coordinates, 1920 × 1566) that bloom when the "evening" scene runs */
export const nightGlows: [number, number, number, number, number][] = [
  [915, 974, 37, 24, 0.7],
  [990, 976, 37, 24, 0.8],
  [1071, 987, 32, 22, 0.9],
  [1007, 1039, 48, 61, 1.0],
  [936, 1015, 26, 22, 1.1],
  [601, 1061, 43, 54, 1.2],
  [812, 1050, 48, 52, 1.3],
  [887, 1050, 26, 52, 1.35],
  [1320, 1028, 65, 56, 1.5],
  [1007, 1212, 65, 97, 1.65],
  [43, 1061, 65, 76, 1.8],
  [1618, 1066, 43, 43, 1.9],
  [1710, 1066, 32, 32, 1.95],
];
