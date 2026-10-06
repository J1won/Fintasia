import "./LandingPage.css";
import landingPageImage from "./assets/landingPageImage.png";
import logo from "./assets/logo.png";
import shGrandpa from "./assets/shakygp.png";
import chGrandpa from "./assets/chillgp.png";
import scroll from "./assets/scroll.png";
import catTexting from "./assets/cat-texting.mp4";
import {
useEffect,
  useMemo,
  useRef,
  type CSSProperties,
  useState,
} from "react";
import "./InvestPage.css";

/* ---------- Types ---------- */
type Kind = "h" | "b" | "t" | "me";

interface Msg {
  kind: Kind;
  text: string;
}

interface Topic {
  emoji: string;
  title: string;
  question?: string; // optional typed-answer question asked first
  lines: string[];
  tip: string;
}

interface Stop {
  emoji: string;
  name: string;
  topics: Topic[];
}

/* ---------- Data: four stepping stones, three circle topics each ---------- */
const STOPS: Stop[] = [
  {
    emoji: "🌱",
    name: "Basics",
    topics: [
      {
        emoji: "💭",
        title: "Why does everyone want money?",
        lines: [
          "Why do you think? 🙄",
          "Just kidding.",
          "Money can give you freedom, independence and comfort.",
          "It can also give you a quick buzz of happy.",
          "The buzz fades fast. The freedom lasts.",
          "Picking the long game is hard for everyone, so go easy on yourself. 💛",
          "I'll show you small, simple things you can do. No jargon, no pressure.",
        ],
        tip: "Write down one money goal. The more detail, the better: “In 5 years I want ___ so I can ___.”",
      },
      {
        emoji: "🪙",
        title: "What is your financial goal?",
        question: "More detailed the better! (View the answer in your profile)",
        lines: [
          "Let’s start at the very beginning: what even is money? 🪙",
          "It’s a tool we trade for the things we need and want.",
          "It’s also a way to store your work for later. The hours you work today can become something you use next year.",
          "Money isn’t good or bad. What matters is what you point it at.",
        ],
        tip: "Notice one thing you spent on today. Did it match what you care about?",
      },
    ],
  },
  {
    emoji: "🔍",
    name: "Wise up",
    topics: [
      {
        emoji: "🪤",
        title: "Understand the traps",
        lines: [
          "Here’s a secret: companies spend millions on ads because ads work.",
          "Researchers have studied for decades how to get people to spend.",
          "Think of something you want but don’t need. Picture the logo, the colors, the packaging.",
          "Someone worked really hard to make you feel that pull.",
          "Apps even remember what you looked at and show it to you again. That’s called targeted marketing.",
          "It’s not your fault. It was designed 🙂",
        ],
        tip: "Next time you want something, wait 24 hours and see if the pull fades.",
      },
      {
        emoji: "🕵️",
        title: "Spot the sales tricks",
        lines: [
          "Stores know some magic words 🪄",
          "“Almost sold out!” and “Back in stock!” make things feel rare, so you rush.",
          "“Ends tonight” is a countdown so you can’t think.",
          "“Was $99, now $49” makes $49 feel like a win, even if you never needed it.",
        ],
        tip: "When you spot one, name it out loud: “that’s just a rush trick.”",
      },
      {
        emoji: "🧘",
        title: "Simplicity is your friend",
        lines: [
          "You don’t need 10 credit cards.",
          "Or 10 bank accounts. Or a pile of subscriptions.",
          "The fewer places your money lives, the easier it is to see where it goes.",
          "And when you can see it, your shoulders relax 😌",
        ],
        tip: "Count your accounts and subscriptions. Keep the ones you actually use.",
      },
    ],
  },
  {
    emoji: "🛟",
    name: "Stay safe",
    topics: [
      {
        emoji: "🌰",
        title: "Why save?",
        lines: [
          "Saving is just keeping some money instead of spending all of it.",
          "It buys you options: a surprise bill, a job you can leave, a purchase without debt.",
          "Future you will be so thankful 🌰",
        ],
        tip: "Set up a small automatic transfer, even $5 a week.",
      },
      {
        emoji: "🛟",
        title: "Your safety cushion",
        lines: [
          "The best way to avoid loans is to have a cushion.",
          "That’s emergency savings: 3 to 6 months of living costs.",
          "Keep it in a high-yield savings account so it grows a little while it waits.",
          "It’s for needs only. Never wants, never investing.",
          "Then a car repair is just an annoying Tuesday, not a debt.",
        ],
        tip: "Start tiny. Even $5 is a start.",
      },
      {
        emoji: "🦔",
        title: "Let’s talk loans",
        lines: [
          "Gentle but honest: money is never free.",
          "Payday loans, private loans, car loans, credit cards… they can feel like help today.",
          "But they cost interest, and interest can snowball because debt grows on top of itself.",
          "My rule of thumb: borrow only as a last resort.",
          "If the interest is over 10%, stop and look closer.",
          "Payday loans especially. Be super careful with those.",
        ],
        tip: "Before any loan, ask: what’s the total I’ll pay back?",
      },
    ],
  },
  {
    emoji: "🌳",
    name: "Grow",
    topics: [
      {
        emoji: "🌳",
        title: "Why invest?",
        lines: [
          "Prices tend to creep up over time, so cash sitting still slowly buys less.",
          "Investing means putting money into things that can grow over many years, like a basket of companies.",
          "It goes up and down though, so it’s only for money you won’t need for years.",
          "That’s why invested money is forgotten money, not emergency money.",
        ],
        tip: "Build your emergency cushion first, then invest what you can forget.",
      },
      {
        emoji: "🌲",
        title: "Compound interest",
        lines: [
          "Here’s the cool part: growth can grow.",
          "With compound interest, your earnings start earning too.",
          "Pretend $25 a month at a 7% yearly average for 30 years: you’d put in $9,000 and it could grow to around $30,000. Just an example, not a promise.",
          "Starting early matters most. A tree needs time 🌳",
        ],
        tip: "Try a compound interest calculator with your own numbers.",
      },
      {
        emoji: "🚀",
        title: "Your first $5",
        lines: [
          "Ready for a first step? Let’s open a Roth IRA 🚀",
          "It’s a retirement account you open at a brokerage.",
          "Check that you have earned income and are under the income limit first. irs.gov has the details.",
          "Then put in just $5 right now. Skip the coffee for one day if you need to ☕",
          "The account is only the container. You still buy an ETF inside it, which is a basket of lots of companies.",
          "It’s built for retirement, so taking money out early can mean taxes or penalties.",
        ],
        tip: "Open it, add $5, then buy one ETF inside it.",
      },
    ],
  },
];

/* ---------- Helpers ---------- */
const GOAL_KEY = "mm-goal";
const loadGoal = (): string => {
  try {
    return localStorage.getItem(GOAL_KEY) ?? "";
  } catch {
    return "";
  }
};
const saveGoal = (v: string) => {
  try {
    localStorage.setItem(GOAL_KEY, v);
  } catch {
    /* storage unavailable: ignore */
  }
};

function buildScript(t: Topic): Msg[] {
  return [
    { kind: "h", text: `${t.emoji} ${t.title}` },
    ...(t.question ? [{ kind: "b" as const, text: t.question }] : []),
    ...t.lines.map((text) => ({ kind: "b" as const, text })),
    { kind: "t", text: `💡 Try this: ${t.tip}` },
  ];
}

/* ---------- Cat illustration ---------- */
function Cat() {
  return (
    <svg
      viewBox="0 0 300 270"
      role="img"
      aria-label="Cartoon cat texting on a phone"
    >
      <circle cx="150" cy="140" r="118" fill="#ffd54a" opacity=".35" />
      <path
        d="M205 232q55-6 50-56q-3-18-18-14"
        fill="none"
        stroke="#f4a259"
        strokeWidth="16"
        strokeLinecap="round"
      />
      <ellipse cx="150" cy="234" rx="70" ry="36" fill="#f4a259" />
      <polygon points="98,92 104,36 142,70" fill="#f4a259" />
      <polygon points="202,92 196,36 158,70" fill="#f4a259" />
      <polygon points="108,80 110,52 130,70" fill="#ffb3c7" />
      <polygon points="192,80 190,52 170,70" fill="#ffb3c7" />
      <circle cx="150" cy="122" r="58" fill="#f4a259" />
      <path
        d="M150 66v14M138 68l2 12M162 68l-2 12"
        stroke="#d9822b"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <ellipse cx="127" cy="122" rx="8" ry="10" fill="#23402f" />
      <ellipse cx="173" cy="122" rx="8" ry="10" fill="#23402f" />
      <circle cx="130" cy="126" r="3" fill="#fff" />
      <circle cx="176" cy="126" r="3" fill="#fff" />
      <circle cx="112" cy="138" r="9" fill="#ff8fa8" opacity=".5" />
      <circle cx="188" cy="138" r="9" fill="#ff8fa8" opacity=".5" />
      <polygon points="144,136 156,136 150,144" fill="#ff7aa2" />
      <path
        d="M150 144q-6 8-13 3M150 144q6 8 13 3"
        fill="none"
        stroke="#23402f"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M104 142l-26-4M104 148l-26 4M196 142l26-4M196 148l26 4"
        stroke="#23402f"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <rect x="112" y="170" width="76" height="84" rx="12" fill="#2b3a33" />
      <rect x="118" y="178" width="64" height="68" rx="7" fill="#e8fff0" />
      <rect
        x="123"
        y="184"
        width="38"
        height="13"
        rx="6"
        fill="#fff"
        stroke="#b9e2c0"
      />
      <rect x="141" y="202" width="36" height="13" rx="6" fill="#3f9d5b" />
      <rect
        x="123"
        y="220"
        width="24"
        height="13"
        rx="6"
        fill="#fff"
        stroke="#b9e2c0"
      />
      <circle cx="130" cy="226.5" r="2" fill="#4d6b58" />
      <circle cx="135" cy="226.5" r="2" fill="#4d6b58" />
      <circle cx="140" cy="226.5" r="2" fill="#4d6b58" />
      <circle
        cx="110"
        cy="214"
        r="14"
        fill="#f4a259"
        stroke="#d9822b"
        strokeWidth="2"
      />
      <circle
        cx="190"
        cy="214"
        r="14"
        fill="#f4a259"
        stroke="#d9822b"
        strokeWidth="2"
      />
      <rect x="196" y="22" width="88" height="38" rx="16" fill="#fff" />
      <polygon points="208,58 218,58 206,72" fill="#fff" />
      <text
        x="240"
        y="47"
        textAnchor="middle"
        fontSize="17"
        fill="#23402f"
        fontFamily="Fredoka, sans-serif"
      >
        meow? 💬
      </text>
      <rect x="14" y="76" width="76" height="34" rx="15" fill="#3f9d5b" />
      <text
        x="52"
        y="98"
        textAnchor="middle"
        fontSize="15"
        fill="#fff"
        fontFamily="Fredoka, sans-serif"
      >
        save $5!
      </text>
    </svg>
  );
}

/* ---------- App ---------- */
export default function InvestPage() {
  const [stop, setStop] = useState(0); // which stepping stone
  const [cur, setCur] = useState<number | null>(null); // open topic inside that stone
  const [shown, setShown] = useState(0); // how many scripted messages are visible
  const [answer, setAnswer] = useState<string | null>(null); // user's typed answer
  const [asking, setAsking] = useState(false); // waiting for a typed answer
  const [typing, setTyping] = useState(false); // Fern is "typing"
  const [draft, setDraft] = useState("");
  const [isScrollHovered, setIsScrollHovered] = useState(false);
  const [isScrollOpen, setIsScrollOpen] = useState(false);
  const [modalOrigin, setModalOrigin] = useState({ x: "50%", y: "50%" });
  const openFromButton = (
    event: React.MouseEvent<HTMLButtonElement>,
    openModal: () => void,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
    setModalOrigin({ x: `${x}%`, y: `${y}%` });
    openModal();
  };
  const [isAccountButtonOpen, setIsAccountButtonOpen] = useState(false);

  const timer = useRef<number>(0);
  const msgsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const goRef = useRef<HTMLButtonElement>(null);

  const topics = STOPS[stop].topics;
  const topic = cur !== null ? topics[cur] : null;
  const script = useMemo(() => (topic ? buildScript(topic) : []), [topic]);
  const hasQuestion = !!topic?.question;

  // visible messages, with the user's answer slotted in right after the question
  const visible: Msg[] = [];
  script.slice(0, shown).forEach((m, i) => {
    visible.push(m);
    if (hasQuestion && i === 1 && answer)
      visible.push({ kind: "me", text: answer });
  });

  const stopTimer = () => window.clearTimeout(timer.current);

  const openTopic = (s: number, i: number) => {
    stopTimer();
    const q = STOPS[s].topics[i].question;
    setStop(s);
    setCur(i);
    setShown(2);
    setAnswer(null);
    setTyping(false);
    setAsking(!!q);
    setDraft(q ? loadGoal() : "");
  };

  const closeChat = () => {
    stopTimer();
    setCur(null);
    setAsking(false);
    setTyping(false);
  };

  const goStop = (i: number) => {
    closeChat();
    setStop(i);
  };

  const reveal = () => {
    setTyping(true);
    timer.current = window.setTimeout(() => {
      setShown((s) => s + 1);
      setTyping(false);
    }, 650);
  };

  const next = () => {
    if (typing || cur === null) return;
    if (shown < script.length) return reveal();
    if (cur < topics.length - 1) openTopic(stop, cur + 1);
    else if (stop < STOPS.length - 1) openTopic(stop + 1, 0);
    else closeChat();
  };

  const submit = (skip: boolean) => {
    const v = draft.trim();
    if (!asking || typing || (!skip && !v)) return;
    if (!skip) {
      saveGoal(v);
      setAnswer(v);
    }
    setAsking(false);
    reveal();
  };

  // keep the newest message in view
  useEffect(() => {
    msgsRef.current?.scrollTo({
      top: msgsRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [shown, typing, answer, cur]);

  // focus the input when asked, or the button when a normal topic opens
  useEffect(() => {
    if (cur === null) return;
    if (asking) inputRef.current?.focus({ preventScroll: true });
    else if (shown === 2) goRef.current?.focus({ preventScroll: true });
  }, [cur, asking, shown]);

  // Escape closes the chat
  useEffect(() => {
    if (cur === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeChat();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [cur]);

  // clean up any pending timer on unmount
  useEffect(() => stopTimer, []);

  const buttonLabel =
    shown < script.length
      ? "Keep going 👉"
      : cur !== null && cur < topics.length - 1
        ? "Next topic →"
        : stop < STOPS.length - 1
          ? "Next stone →"
          : "Back to start ↺";

  return (
    <div
      className="landing-page"
      style={{ "--landing-image": `url(${landingPageImage})` } as CSSProperties}
    >
      <div className="nav-bar">
        <button className="logo-button">
          <img src={logo} alt="Home reroute logo" />
        </button>

        <button
          className="profile-button"
          onClick={(event) =>
            openFromButton(event, () => setIsAccountButtonOpen(true))
          }
        >
          Account
        </button>
        {isAccountButtonOpen && (
          <div
            className="scroll-modal-backdrop"
            role="presentation"
            onClick={() => setIsAccountButtonOpen(false)}
          >
            <section
              className="scroll-modal"
              style={{
                ["--modal-origin-x" as any]: modalOrigin.x,
                ["--modal-origin-y" as any]: modalOrigin.y,
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="button-one-modal-title"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="scroll-modal-close"
                type="button"
                aria-label="Close button one window"
                onClick={() => setIsAccountButtonOpen(false)}
              >
                <span aria-hidden="true">&#215;</span>
              </button>

              <h2 id="button-one-modal-title">Button One</h2>
              <p>Explore your next financial move with confidence.</p>
              <button onClick={() => (window.location.href = "/")}>
                Log Out
              </button>
            </section>
          </div>
        )}
      </div>
      <div className="wrap">
        <div className={`app${cur !== null ? " chatting" : ""}`}>
          <div>
            <div className="trail" role="tablist" aria-label="Stepping stones">
              {STOPS.map((s, i) => (
                <button
                  key={s.name}
                  type="button"
                  className="stop"
                  role="tab"
                  aria-selected={stop === i}
                  onClick={() => goStop(i)}
                >
                  <span className="d">{s.emoji}</span>
                  <span className="l">
                    {i + 1}. {s.name}
                  </span>
                </button>
              ))}
            </div>
            <div className="hero">
              <Cat />
            </div>
            <div className="list">
              {topics.map((t, i) => (
                <button
                  key={t.title}
                  type="button"
                  className={`card${cur === i ? " on" : ""}`}
                  aria-pressed={cur === i}
                  onClick={() => i !== cur && openTopic(stop, i)}
                >
                  <span className="em">{t.emoji}</span>
                  <h3>{t.title}</h3>
                </button>
              ))}
            </div>
            <div id="scroll-gp-group">
              {/* scroll grandpa */}
              <button
                type="button"
                onClick={(event) =>
                  openFromButton(event, () => setIsScrollOpen(true))
                }
                onMouseEnter={() => setIsScrollHovered(true)}
                onMouseLeave={() => setIsScrollHovered(false)}
              >
                <img src={scroll} alt="Financial Literacy Scroll" />
              </button>
              <img
                className={isScrollHovered ? "grandpa-shaking" : ""}
                src={isScrollHovered ? shGrandpa : chGrandpa}
                alt={
                  isScrollHovered ? "shaky reaction grandpa" : "chill grandpa"
                }
              />
            </div>
            {isScrollOpen && (
              <div
                className="scroll-modal-backdrop"
                role="presentation"
                onClick={() => setIsScrollOpen(false)}
              >
                <section
                  className="scroll-modal"
                  style={{
                    ["--modal-origin-x" as any]: modalOrigin.x,
                    ["--modal-origin-y" as any]: modalOrigin.y,
                  }}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="scroll-modal-title"
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    className="scroll-modal-close"
                    type="button"
                    aria-label="Close financial literacy window"
                    onClick={() => setIsScrollOpen(false)}
                  >
                    <span aria-hidden="true">&#215;</span>
                  </button>
                  <h2 id="scroll-modal-title">Financial Literacy</h2>
                  <p>
                    Me and all the whimsy creatures here are so glad you're here
                    at Fintasia!
                  </p>
                  <p>
                    In order to stay here, you must follow the three most
                    important rules of Fintasia. 1. Love yourself. and Respect
                    yourself.
                  </p>
                  <p>
                    In everything we teach here, loving yourself lies at the
                    center of it all.
                  </p>
                </section>
              </div>
            )}
          </div>

          <aside className="detail" aria-live="polite">
            <div className="screen">
              <div className="idle">
                <video
                  src={catTexting}
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-hidden="true"
                />
                <p className="video-bubble">
                  Heyy i'm a certified Dr.FinCat. I've been asked to help you
                  but make it quick cuz im busy.
                </p>
              </div>

              <div
                className="chatbox"
                role="dialog"
                aria-label="Chat with Fern"
              >
                <div className="head">
                  <span className="av">🐱</span>
                  <div>
                    {/* <b>Fern</b>
                    <small>your money friend</small> */}
                  </div>
                  <button type="button" className="x" onClick={closeChat}>
                    ✕ Close
                  </button>
                </div>

                <div className="msgs" ref={msgsRef}>
                  {visible.map((m, i) => (
                    <div key={`${stop}-${cur}-${i}`} className={`b ${m.kind}`}>
                      {m.text}
                    </div>
                  ))}
                  {typing && (
                    <div className="b">
                      <span className="dots">
                        <span />
                        <span />
                        <span />
                      </span>
                    </div>
                  )}
                </div>

                <div className="foot">
                  <div className="ask" hidden={!asking}>
                    <input
                      ref={inputRef}
                      type="text"
                      maxLength={200}
                      placeholder="Type your answer…"
                      aria-label="Your answer"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && submit(false)}
                    />
                    <button
                      type="button"
                      className="pill"
                      onClick={() => submit(false)}
                    >
                      Send
                    </button>
                    <button
                      type="button"
                      className="skip"
                      onClick={() => submit(true)}
                    >
                      Skip
                    </button>
                  </div>
                  <button
                    type="button"
                    className="pill"
                    ref={goRef}
                    hidden={asking}
                    onClick={next}
                  >
                    {buttonLabel}
                  </button>
                </div>
              </div>

              <i className="home" />
            </div>
          </aside>
        </div>

        <p className="note">Educational only, not financial advice.</p>
      </div>
    </div>
  );
}
