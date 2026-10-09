# imKING – spletna stran (Next.js)

Spletna stran za imKING, pametne KNX inštalacije. Zgrajena z Next.js (App Router), React in TypeScript.

## Zagon

```bash
npm install
npm run dev      # razvoj na http://localhost:3000
npm run build    # produkcijska različica
npm start        # zažene produkcijsko različico
```

Potrebujete Node.js 20 ali novejši.

## Struktura

```
app/
  layout.tsx       pisave (Inter, Manrope, JetBrains Mono), metapodatki, nastavitev teme pred izrisom
  page.tsx         vse sekcije strani
  globals.css      barve, tipografija, razmiki, animacije (svetla in temna tema)
components/
  Header.tsx       meni; prozoren nad naslovno sliko, podčrtana aktivna sekcija
  ThemeToggle.tsx  preklop svetlo/temno (shrani se v brskalnik)
  Hero.tsx         naslovna slika: dan v svetli, noč v temni temi
  Stars.tsx        utripajoče zvezde na nočnem nebu
  KnxBus.tsx       animirana shema vodila KNX in dnevnik sporočil
  Rooms.tsx        zasloni aplikacije; osvetli prostor, ki ga je naslovila shema
  CountUp.tsx      štetje številke ob prikazu
  Reveal.tsx       nežen prikaz sekcij ob pomikanju
  CopyEmail.tsx    gumb za kopiranje e-naslova
  Icons.tsx        ikone
lib/content.ts     vsa besedila, reference, vprašanja, podatki za shemo KNX
public/images/     naslovni sliki (hero-day.jpg, hero-night.jpg)
```

Besedila spreminjate v `lib/content.ts`, barve in razmike pa v `app/globals.css` (spremenljivke v `:root`).

## Objava

Najlažje na [Vercel](https://vercel.com/new): uvozite GitHub repozitorij in kliknite Deploy, nastavitve niso potrebne.
