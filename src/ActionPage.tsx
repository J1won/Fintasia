import { useEffect, useRef, useState, type CSSProperties} from "react";
import './LandingPage.css'
import landingPageImage from './assets/landingPageImage.png'
import logo from './assets/logo.png'
import "./VersionOnePage.css";
import "./ActionPage.css";


/* ---------- Types ---------- */
interface Media {
  type: "image" | "video";
  src: string; // e.g. "/congrats/emergency.jpg" or "/congrats/emergency.mp4"
  alt?: string; // describe photos for screen readers
}
 
interface Item {
  id: string;
  emoji: string;
  title: string;
  why: string; // one short sentence on why it matters
  actions: string[]; // any number of action items, can be empty
  media?: Media; // optional congrats photo or video, shown when every action is checked
}
 
type Done = Record<string, boolean>;
 
/* ---------- Data ----------
   Add a new circle by adding one more object to this array. */
const ITEMS: Item[] = [
  {
    "id": "emergency",
    "emoji": "🛟",
    "title": "Emergency fund",
    "why": "A cushion of 3 to 6 months of living costs keeps a surprise bill from turning into debt.",
    "actions": [
      "Add up your monthly must-pay costs",
      "Open a high-yield savings account",
      "Set up a small automatic transfer"
    ]
  },
  {
    "id": "spending",
    "emoji": "👀",
    "title": "Track spending",
    "why": "You can’t change what you can’t see. Knowing where your money goes is the first step to keeping more of it.",
    "actions": [
      "List every bank account you have",
      "Connect them all to a spending tracker",
      "Look over last month’s spending",
      "Spot one purchase you regret"
    ]
  },
  {
    "id": "invest",
    "emoji": "📈",
    "title": "Investment account",
    "why": "Investing lets money grow over many years instead of sitting still while prices creep up.",
    "actions": [
      "Pick a brokerage",
      "Open an individual account",
      "Link your bank"
    ]
  },
  {
    "id": "roth",
    "emoji": "🧓",
    "title": "Set up Roth IRA",
    "why": "A Roth IRA is a retirement account built for long-term growth, and you can start with a tiny amount.",
    "actions": [
      "Check that you have earned income",
      "Check the income limit at irs.gov",
      "Open the account",
      "Put in your first $5"
    ]
  },
  {
    "id": "401k",
    "emoji": "🏢",
    "title": "Set up 401(k)",
    "why": "A 401(k) saves for retirement straight from your paycheck, and some employers add matching money.",
    "actions": [
      "Ask HR if your job offers one",
      "Find out if there’s an employer match",
      "Sign up and pick an amount"
    ]
  },
  {
    "id": "credit",
    "emoji": "🔎",
    "title": "Check your credit score",
    "why": "Your credit score affects loan rates and even renting. Checking it lets you catch mistakes early.",
    "actions": [
      "Get your free credit report",
      "Look for mistakes or accounts you don’t recognize"
    ]
  }
];
 
/* ---------- Helpers ---------- */
const STORAGE_KEY = "mm-actions";
 
const loadDone = (): Done => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as Done;
  } catch {
    return {};
  }
};
 
const actionKey = (item: Item, index: number) => `${item.id}:${index}`;
 
function CongratsMedia({ media }: { media?: Media }) {
  if (!media) return <div className="ph">🖼️ Your congrats photo or video goes here</div>;
  if (media.type === "video") return <video src={media.src} controls autoPlay muted loop playsInline />;
  return <img src={media.src} alt={media.alt ?? "Congratulations!"} />;
}
 
/* ---------- App ---------- */
function ActionPage() {
  const [done, setDone] = useState<Done>(loadDone);
  const [activeId, setActiveId] = useState<string | null>(null); // last opened item (kept so the modal can animate out)
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"tasks" | "celebrate">("tasks");
 
  const lastFocus = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
 
  const active = ITEMS.find((it) => it.id === activeId) ?? null;
 
  const isComplete = (item: Item) =>
    item.actions.length > 0 && item.actions.every((_, j) => done[actionKey(item, j)]);
 
  const openItem = (item: Item, trigger: HTMLElement) => {
    lastFocus.current = trigger;
    setActiveId(item.id);
    setView("tasks");
    setOpen(true);
  };
 
  const closeModal = () => {
    setOpen(false);
    lastFocus.current?.focus();
  };
 
  const toggle = (item: Item, index: number, checked: boolean) =>
    setDone((d) => ({ ...d, [actionKey(item, index)]: checked }));
 
  // remember checked boxes in this browser
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
    } catch {
      /* storage unavailable: ignore */
    }
  }, [done]);
 
  // while open: lock page scroll, focus the close button, handle Escape and Tab
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 50);
 
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
        return;
      }
      if (e.key !== "Tab" || !modalRef.current) return;
      const f = Array.from(modalRef.current.querySelectorAll<HTMLElement>("button, input"));
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
 
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
 
  // keep keyboard focus inside the modal when it switches to the congrats view
  useEffect(() => {
    if (open && view === "celebrate") closeRef.current?.focus();
  }, [open, view]);
 
  return (
    <>
    <div className="landing-page" style={{ "--landing-image": `url(${landingPageImage})` } as CSSProperties}>
      <div className='nav-bar'>
            <button className="logo-button" onClick={() => window.location.href='/start'}>
                <img src={logo} alt="Home reroute logo" />
            </button>

            <button className="profile-button" >
                Account
            </button>
      </div>
      <div className="wrap">
        <p className="sub">Click on your preferred action item and check boxes as you go!</p>
 
        <div className="circles">
          {ITEMS.map((item) => {
            const complete = isComplete(item);
            return (
              <button
                key={item.id}
                type="button"
                className={`circle${complete ? " done" : ""}`}
                aria-label={`${item.title}${complete ? " (all done)" : ""}`}
                onClick={(e) => openItem(item, e.currentTarget)}
              >
                <span className="e">{item.emoji}</span>
                <span className="l">{item.title}</span>
                <span className="bd" aria-hidden="true">✓</span>
              </button>
            );
          })}
        </div>
      </div>
 
      <div
        className={`scrim${open ? " open" : ""}`}
        aria-hidden={!open}
        onClick={(e) => e.target === e.currentTarget && closeModal()}
      >
        <div className="modal" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          {active && (
            <>
              <button type="button" className="x-modal" ref={closeRef} aria-label="Close" onClick={closeModal}>✕</button>
 
              {view === "tasks" ? (
                <>
                  <div className="mh">
                    <span className="me">{active.emoji}</span>
                    <h2 id="modal-title">{active.title}</h2>
                  </div>
 
                  <p>{active.why}</p>
 
                  {active.actions.length > 0 ? (
                    <ul className="chk">
                      {active.actions.map((action, j) => (
                        <li key={action}>
                          <label>
                            <input
                              type="checkbox"
                              checked={!!done[actionKey(active, j)]}
                              onChange={(e) => toggle(active, j, e.target.checked)}
                            />
                            <span>{action}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="empty">Action items coming soon 🌱</p>
                  )}
 
                  {isComplete(active) && (
                    <button type="button" className="pill go" onClick={() => setView("celebrate")}>
                      Complete 🎉
                    </button>
                  )}
                </>
              ) : (
                <div className="cel">
                  <div className="big">🎉</div>
                  <h2 id="modal-title">Congrats!</h2>
                  <p>You finished <b>{active.title}</b>.</p>
                  <div className="media">
                    <CongratsMedia media={active.media} />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

// function ActionPage() {
     

//      return(
//           <>
//                <div className="landing-page" style={{ "--landing-image": `url(${landingPageImage})` } as CSSProperties}>
//                     <div className='nav-bar'>
//                          <button className="logo-button" onClick={() => navigate('/landing')}>
//                               <img src={logo} alt="Home reroute logo" />
//                          </button>

//                          <button className="profile-button" onClick={(event) => openFromButton(event, () => setIsButtonOneOpen(true))}>
//                               Account
//                          </button>
//                     </div>
                    
//                     <h1></h1>

//                     <div className="button-stack">
//                          <button className="big-btn" onClick={() => window.location.href='/action'}>
//                               All About Saving!
//                          </button>
//                          <button className="big-btn" onClick={() => window.location.href='/start'}>
//                               All About Starting!
//                          </button>
//                          <button className="big-btn" onClick={() => window.location.href='/versionOne'}>
//                               under construction
//                          </button>
//                     </div>
//                </div>
//           </>
//      )
// }
export default ActionPage