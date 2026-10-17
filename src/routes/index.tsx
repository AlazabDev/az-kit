import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Link2 } from "lucide-react";
import { IngestionPanel } from "@/components/ingestion-panel";
import { RecentKits } from "@/components/recent-kits";
import { StartHereButton } from "@/components/start-here-button";
import { useLang, LanguageToggle } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brand DNA — extract any brand's design system" },
      {
        name: "description",
        content:
          "Paste a URL or drop assets. Get the palette, type, voice, and tokens — ready for your next pitch deck or build.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { t } = useLang();
  return (
    <>
      <style>{css}</style>

      <div className="page">
        <nav className="nav">
          <Link to="/" className="brand">{t("brand")}</Link>
          <div className="nav-center">
            <StartHereButton />
          </div>
          <div className="nav-links">
            <Link to="/library">
              <BookOpen aria-hidden /> {t("library")}
            </Link>
            <Link to="/shorten">
              <Link2 aria-hidden /> {t("shorten")}
            </Link>
            <LanguageToggle className="lang-toggle" />
          </div>
        </nav>

        <main className="hero">
          <h1 className="headline">
            {t("headlineA")} <em>{t("headlineB")}</em>
          </h1>

          <div className="panel-mount">
            <IngestionPanel />
          </div>
        </main>

        <RecentKits />
      </div>
    </>
  );
}

const css = `
  :root {
    --washi: #f8f8f8;
    --sumi: #030957;
    --hairline: rgba(3,9,87,0.20);
    --hanko: #ffb900;
  }

  html, body {
    background: var(--washi);
    color: var(--sumi);
    font-family: 'IBM Plex Sans Arabic', Georgia, serif;
    -webkit-font-smoothing: antialiased;
  }
  *::selection { background: var(--sumi); color: var(--washi); }

  .page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* ---------- Nav ---------- */
  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 22px 40px;
    border-bottom: 1px solid var(--hairline);
  }
  .nav-center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .nav { position: relative; }
  .brand {
    font-family: 'IBM Plex Mono', 'IBM Plex Sans Arabic', monospace;
    font-size: 11px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--sumi);
    text-decoration: none;
  }
  .nav-links {
    display: flex;
    gap: 28px;
    font-family: 'IBM Plex Mono', 'IBM Plex Sans Arabic', monospace;
    font-size: 11px;
    letter-spacing: 0.20em;
    text-transform: uppercase;
    align-items: center;
  }
  .nav-links a {
    color: var(--sumi);
    text-decoration: none;
    opacity: 0.75;
    transition: opacity 150ms ease, color 150ms ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .lang-toggle { background: none; border: 1px solid var(--hairline); border-radius: 999px; padding: 4px 12px; font: inherit; color: var(--sumi); cursor: pointer; }
  .lang-toggle:hover { background: var(--hanko); }
  .nav-links a:hover { opacity: 1; color: var(--hanko); }
  .nav-links a svg { width: 13px; height: 13px; stroke-width: 1.5; }

  /* ---------- Hero ---------- */
  .hero {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 96px 40px 64px;
    max-width: 760px;
    margin: 0 auto;
    width: 100%;
  }

  .eyebrow {
    font-family: 'IBM Plex Mono', 'IBM Plex Sans Arabic', monospace;
    font-size: 11px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(3,9,87,0.55);
    margin-bottom: 36px;
  }

  .headline {
    font-family: 'IBM Plex Sans Arabic', 'Times New Roman', serif;
    font-weight: 300;
    font-style: normal;
    font-size: clamp(56px, 9vw, 112px);
    line-height: 0.98;
    letter-spacing: -0.01em;
    margin: 0 0 28px;
  }
  .headline em {
    font-style: normal;
    font-weight: 600;
    color: var(--hanko);
  }

  .lede {
    font-family: 'IBM Plex Sans Arabic', Georgia, serif;
    font-style: italic;
    font-size: 16px;
    line-height: 1.55;
    color: rgba(3,9,87,0.72);
    max-width: 480px;
    margin: 0 0 48px;
  }

  .panel-mount {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .foot-meta {
    margin-top: 28px;
    font-family: 'IBM Plex Mono', 'IBM Plex Sans Arabic', monospace;
    font-size: 10px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: rgba(3,9,87,0.45);
  }

  /* ---------- How ---------- */
  .how {
    border-top: 1px solid var(--hairline);
    padding: 64px 40px 96px;
    max-width: 760px;
    margin: 0 auto;
    width: 100%;
  }
  .how-eyebrow {
    font-family: 'IBM Plex Mono', 'IBM Plex Sans Arabic', monospace;
    font-size: 11px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(3,9,87,0.55);
    margin-bottom: 28px;
  }
  .how-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .how-list li {
    display: grid;
    grid-template-columns: 56px 1fr 2fr;
    align-items: baseline;
    gap: 24px;
    padding: 22px 0;
    border-bottom: 1px solid var(--hairline);
    font-family: 'IBM Plex Sans Arabic', serif;
    font-size: 22px;
  }
  .how-list .num {
    font-family: 'IBM Plex Mono', 'IBM Plex Sans Arabic', monospace;
    font-size: 11px;
    letter-spacing: 0.18em;
    color: rgba(3,9,87,0.55);
  }
  .how-list .dim {
    font-family: 'IBM Plex Sans Arabic', serif;
    font-style: italic;
    font-size: 14px;
    color: rgba(3,9,87,0.65);
  }

  @media (max-width: 640px) {
    .nav { padding: 18px 20px; }
    .nav-links { gap: 18px; }
    .hero { padding: 56px 20px 48px; }
    .how { padding: 48px 20px 72px; }
    .how-list li { grid-template-columns: 40px 1fr; }
    .how-list .dim { grid-column: 2; }
  }
`;
