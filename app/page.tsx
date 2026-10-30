import { DisplayControls } from "./display-controls";

const principles = [
  {
    number: "01",
    title: "Relief before performance",
    copy: "Lower the load first. Productivity is not the price of care.",
  },
  {
    number: "02",
    title: "Intention over excess",
    copy: "Every word and design choice earns its place.",
  },
  {
    number: "03",
    title: "Resonance over spectacle",
    copy: "Make something that stays without asking it to shout.",
  },
];

const pillars = [
  {
    name: "Nest",
    copy: "Home, family, stabilization, and safe landing.",
    status: "Active",
  },
  {
    name: "Academy",
    copy: "Learning tools and frameworks for non-linear thinkers.",
    status: "Active",
  },
  {
    name: "Wayfinder",
    copy: "Direction and support for moments of transition.",
    status: "Active",
  },
  {
    name: "Studio",
    copy: "A definition is being held open until Candan names it.",
    status: "In development",
    open: true,
  },
  {
    name: "Workshop",
    copy: "A definition is being held open until Candan names it.",
    status: "In development",
    open: true,
  },
];

export default function WillowHome() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <nav className="wrap site-nav" aria-label="Primary navigation">
          <a className="mark" href="#top" aria-label="Willow home">
            Willow
          </a>
          <DisplayControls />
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="wrap hero-grid">
            <div>
              <p className="eyebrow">Weeping Willow Whisperer LLC</p>
              <h1>The standard system was not built for us. So we build our own.</h1>
              <p className="hero-copy">
                Willow creates practical tools, thoughtful products, and stories for
                neurodivergent and invisibly disabled people who feel deeply and think
                differently.
              </p>
              <div className="actions">
                <a className="button primary" href="#ecosystem">
                  Explore Willow
                </a>
                <a className="button" href="#belief">
                  Our point of view
                </a>
              </div>
            </div>
            <div className="hero-object" aria-hidden="true">
              <p className="object-note">
                Recognition over reinvention. Conditions before correction.
              </p>
            </div>
          </div>
        </section>

        <section className="intro" id="belief">
          <div className="wrap intro-grid">
            <div>
              <p className="eyebrow">What Willow believes</p>
              <h2>Look at the conditions first.</h2>
            </div>
            <div>
              <p className="lead">
                People rarely need to become someone else. They need surroundings,
                routines, and tools that fit how they already work.
              </p>
              <p className="care">
                Willow supports daily life through design and practical resources. It
                is not diagnosis, therapy, or medical advice.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="principles-title">
          <div className="wrap">
            <p className="eyebrow">Working principles</p>
            <h2 id="principles-title">Quiet by design. Precise by choice.</h2>
            <div className="principles">
              {principles.map((principle) => (
                <article className="principle" key={principle.number}>
                  <span className="number">{principle.number}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="intro" id="ecosystem" aria-labelledby="ecosystem-title">
          <div className="wrap">
            <p className="eyebrow">The Willow ecosystem</p>
            <h2 id="ecosystem-title">Five places for different kinds of need.</h2>
            <div className="ecosystem">
              {pillars.map((pillar) => (
                <article className={`pillar${pillar.open ? " open" : ""}`} key={pillar.name}>
                  <h3>{pillar.name}</h3>
                  <p>{pillar.copy}</p>
                  <span className="status">{pillar.status}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="belief" aria-labelledby="belief-title">
          <div className="wrap split">
            <div>
              <p className="eyebrow">Recognition over reinvention</p>
            </div>
            <blockquote id="belief-title">
              Overwhelm is information, not a flaw in character.
            </blockquote>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap footer-row">
          <span>Willow</span>
          <span>Built with care. Held for human approval.</span>
        </div>
      </footer>
    </>
  );
}
