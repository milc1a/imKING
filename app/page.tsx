import CopyEmail from "@/components/CopyEmail";
import CountUp from "@/components/CountUp";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { ArrowOut, BenefitIcon } from "@/components/Icons";
import KnxBus from "@/components/KnxBus";
import Reveal from "@/components/Reveal";
import Rooms from "@/components/Rooms";
import { about, benefits, faq, reference, site } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        <section id="kako">
          <div className="wrap">
            <div className="how">
              <div data-reveal>
                <span className="label">Kako deluje KNX</span>
                <h2>Vse naprave na enem vodilu</h2>
                <p className="lead">
                  Stikala, senzorji in aktuatorji si sporočila pošiljajo neposredno po skupnem dvožilnem vodilu. Vsaka
                  naprava ima svojo logiko, zato ni centralne enote, ki bi lahko odpovedala.
                </p>
              </div>
              <KnxBus />
            </div>
            <div className="stats" data-reveal>
              <div>
                <b>
                  <CountUp to={500} />+
                </b>
                <span>proizvajalcev opreme KNX</span>
              </div>
              <div>
                <b>1</b>
                <span>vodilo za vse sisteme v hiši</span>
              </div>
              <div>
                <b>0</b>
                <span>centralnih enot, ki bi lahko odpovedale</span>
              </div>
            </div>
          </div>
        </section>

        <section id="prednosti">
          <div className="wrap">
            <div className="head" data-reveal>
              <span className="label">Zakaj KNX</span>
              <h2>Ena inštalacija, ki raste z vami</h2>
              <p className="lead">Inštalacijo se načrtuje enkrat, funkcije pa se lahko spreminjajo še leta po vselitvi.</p>
            </div>
            <ul className="benefits">
              {benefits.map((b) => (
                <li key={b.title} data-reveal>
                  <BenefitIcon name={b.icon} />
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="reference">
          <div className="wrap split">
            <div data-reveal>
              <span className="label">Referenca</span>
              <h2>{reference.title}</h2>
              <p className="lead" style={{ marginTop: "var(--space-6)" }}>
                {reference.lead}
              </p>
              <dl className="facts">
                {reference.facts.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <ol className="steps">
                {reference.steps.map(([title, text]) => (
                  <li key={title} data-reveal>
                    <div>
                      <strong>{title}</strong>
                      <span>{text}</span>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="app" data-reveal>
                <h3>Home Server aplikacija</h3>
                <p>
                  Hišo se upravlja prek aplikacije{" "}
                  <a href="https://www.comfortclick.com/" target="_blank" rel="noopener noreferrer">
                    ComfortClick
                  </a>
                  , z ločenim zaslonom za vsak prostor in sistem.
                </p>
                <Rooms rooms={reference.rooms} />
              </div>
            </div>
          </div>
        </section>

        <section id="vprasanja">
          <div className="wrap">
            <div className="head" data-reveal>
              <span className="label">Pogosta vprašanja</span>
              <h2>Preden se odločite</h2>
            </div>
            <div className="faq" data-reveal>
              {faq.map((item, i) => (
                <details key={item.q} open={i === 0}>
                  <summary>{item.q}</summary>
                  <div className="ans">
                    <div>
                      <p>{item.a}</p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="o-meni">
          <div className="wrap split">
            <div data-reveal>
              <span className="label">O meni</span>
              <h2>{about.name}</h2>
              <p className="muted" style={{ marginTop: "var(--space-4)" }}>
                {about.role}
              </p>
              <ol className="timeline">
                {about.timeline.map(([org, role], i) => (
                  <li key={org} className={i === about.timeline.length - 1 ? "now" : undefined}>
                    <b>{org}</b>
                    <span>{role}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="bio" data-reveal>
              {about.bio.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        <section id="kontakt">
          <div className="wrap contact" data-reveal>
            <span className="label">Kontakt</span>
            <h2>Načrtujete novogradnjo?</h2>
            <p className="lead">Pišite mi in skupaj preveriva, kaj bi KNX pomenil za vašo hišo.</p>
            <CopyEmail email={site.email} />
            <p>
              <a className="link" href={site.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <ArrowOut />
              </a>
            </p>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap foot">
          <span>© {new Date().getFullYear()} imKING</span>
          <nav aria-label="Povezave">
            <a href="https://www.knx.org/" target="_blank" rel="noopener noreferrer">
              KNX sistem
            </a>
            <a href="https://pisrs.si/" target="_blank" rel="noopener noreferrer">
              Elektro inštalacije
            </a>
          </nav>
        </div>
      </footer>

      <Reveal />
    </>
  );
}
