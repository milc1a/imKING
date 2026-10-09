import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"], weight: ["400", "500"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin", "latin-ext"], weight: ["500", "600", "700"], variable: "--font-manrope" });
const mono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], weight: ["400", "500"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  metadataBase: new URL("https://imking.si"),
  title: "imKING – Pametne KNX inštalacije",
  description:
    "imKING – načrtovanje, integracija in programiranje pametnih KNX inštalacij za stanovanjske in poslovne objekte.",
  openGraph: {
    title: "imKING – Pametne KNX inštalacije",
    description: "Pametna inštalacija za vaš dom. Razsvetljava, ogrevanje, senčila in varnost v enem sistemu.",
    images: ["/images/hero-day.jpg"],
    locale: "sl_SI",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1d5bd8",
};

/* Applies the saved light/dark choice before the first paint, so the page never flashes the wrong theme. */
const themeScript = `try{var t=localStorage.getItem('imking-theme');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t)}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sl" className={`${inter.variable} ${manrope.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
