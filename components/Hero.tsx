import Image from "next/image";
import { nightGlows, site } from "@/lib/content";
import { Arrow } from "./Icons";
import Stars from "./Stars";
import dayImg from "@/public/images/hero-day.jpg";
import nightImg from "@/public/images/hero-night.jpg";

/* The house by day (light theme) or by night (dark theme). Both photos are layered and
   crossfade through the --is-night token when the theme changes. */
export default function Hero() {
  return (
    <div className="hero" id="domov">
      <div className="scene" aria-hidden="true">
        <Image className="day-only" src={dayImg} alt="" fill priority sizes="100vw" placeholder="blur" />
        <Image className="night-only" src={nightImg} alt="" fill priority sizes="100vw" placeholder="blur" />
        <div className="layer night-only">
          <div className="dim" />
          <svg viewBox="0 0 1920 1566" preserveAspectRatio="xMidYMax slice">
            <defs>
              <filter id="soft" x="-1" y="-1" width="3" height="3">
                <feGaussianBlur stdDeviation="18" />
              </filter>
            </defs>
            {nightGlows.map(([cx, cy, rx, ry, delay]) => (
              <ellipse
                key={`${cx}-${cy}`}
                className="glow"
                cx={cx}
                cy={cy}
                rx={rx}
                ry={ry}
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </svg>
        </div>
        <Stars />
        <div className="orb orb-sun day-only" />
        <div className="orb orb-moon night-only" />
      </div>

      <div className="wrap hero-copy">
        <span className="label status rise">
          <i aria-hidden="true" />
          Pametna hiša · KNX
        </span>
        <h1 className="rise d1">Pametna inštalacija za vaš dom</h1>
        <p className="lead rise d2">
          KNX je vodilni svetovni standard za avtomatizacijo. Razsvetljava, ogrevanje, hlajenje, senčila, varnost in
          multimedija delujejo v enem sistemu, brez centralne enote.
        </p>
        <div className="btns rise d3">
          <a className="btn" href="#kontakt">
            Kontakt <Arrow />
          </a>
          <a className="link" href="#reference">
            Poglej referenco <Arrow />
          </a>
        </div>
      </div>

      <span className="place">{site.place}</span>
      <div className="chip day-only">
        <i aria-hidden="true" />
        <span>1/0/4</span>
        <b>Scena · Dan</b>
        <span>AKTIVNA</span>
      </div>
      <div className="chip night-only">
        <i aria-hidden="true" />
        <span>1/0/5</span>
        <b>Scena · Večer</b>
        <span>AKTIVNA</span>
      </div>
    </div>
  );
}
