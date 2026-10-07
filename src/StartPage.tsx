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
  type ReactNode,
  useState,
} from "react";
import "./StartPage.css";

/* ---------- Core types for chat messages and course content ---------- */
type Kind = "h" | "b" | "t" | "me" | "calc";

interface Msg {
  kind: Kind;
  text: string;
  content?: ReactNode;
}

interface Topic {
  emoji: string;
  title: string;
  question?: string; // optional typed-answer question asked first
  lines: string[];
  tip?: string;
  calculator?: boolean;
}

interface Stone {
  emoji: string;
  name: string;
  topics: Topic[];
}

/* ---------- Course data: four stepping stones, each with topic cards ---------- */
const STONES: Stone[] = [
  {
    emoji: "🌱",
    name: "Basics",
    topics: [
      {
        emoji: "💭",
        title: "Why does everyone want money?",
        lines: [
          "Because money can provide freedom, independence, safety, and comfort.",
          "However, it can also give you a quick buzz of happy.",
          "A cute toy, a fun night, a cool gadget.",
          "The buzz fades fast. But the freedom lasts.",
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
          "That's a wonderful start.",
          "Continue learning and keep in mind your end goal!",
        ],
        tip: "Write your financial goal somewhere you can see it everyday. Maybe the bathroom mirror or the wall next to your desk!",
      },
    ],
  },
  {
    emoji: "🔍",
    name: "Spending",
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
    name: "Free Money??",
    topics: [
      {
        emoji: "🌰",
        title: "Loans",
        lines: [
          "Lemme tell you something, feel free to write this down.",
          "There is no such thing as free money in the real world. Only loaned money",
          "Loan = debt + interest",
          "Interest is the rate at which the debt increases until it's paid off.",
          "Many harmful companies loan money at high interest rates making it hard to pay off.",
        ],
        tip: "If an interest is higher than 10%, think carefully about other options.",
      },
      {
        emoji: "🛟",
        title: "Credit Cards",
        lines: [
          "Credit cards are one of the most sneakiest loans in existence.",
          "Credit cards are loaned money that must be paid off end of month.",
          "If it is not paid off, credit card interest often are more than 30%.",
          "Cash back and rewards are used as ways to blind people from the downsides.",
          "But the highest credit card rewards only go up to 5%.",
          "Let's do the math. Spend $100 on a card. You get free $5 as reward. You accidentally forget to pay off your card end of month and get a $30 interest fee. That's 6 months of rewards!!"
          
        ],
        tip: "ALWAYS pay off your card. Set up card autopay to avoid mistakes.",
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
    name: "Face the World",
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
        calculator: true,
        tip: "Try a compound interest calculator with your own numbers.",
      },
      {
        emoji: "🚀",
        title: "Next steps",
        lines: [
          "Wow! You've already completed the basics!",
          "If you feel like you're ready to take the next step, go on ahead.",
          "I'll take you step by step through opening a brokerage account, retirement account, and more!",
          "Click \"Next Chapter\" found on the bottom right of the screen. Secret code: Im ready"
        ],
      },
     //  {
     //    emoji: "🚀",
     //    title: "Your first $5",
     //    lines: [
     //      "Ready for a first step? Let’s open a Roth IRA 🚀",
     //      "It’s a retirement account you open at a brokerage.",
     //      "Check that you have earned income and are under the income limit first. irs.gov has the details.",
     //      "Then put in just $5 right now. Skip the coffee for one day if you need to ☕",
     //      "The account is only the container. You still buy an ETF inside it, which is a basket of lots of companies.",
     //      "It’s built for retirement, so taking money out early can mean taxes or penalties.",
     //    ],
     //    tip: "Open it, add $5, then buy one ETF inside it.",
     //  },
    ],
  },
];

/* ---------- Idle media for each stone ---------- */
const GOAL_KEY = "mm-goal";
const IDLE_CONTENT = [
  {
    video: catTexting,
    bubble:
      "Heyy i'm a certified Dr.FinCat. I'm here to help you build a why behind your money.",
  },
  {
    video: catTexting,
    bubble:
      "Smart spending is less about missing out and more about choosing what actually matters.",
  },
  {
    video: catTexting,
    bubble:
      "Money moves fast, but your habits can protect you from the traps.",
  },
  {
    video: catTexting,
    bubble:
      "Investing is a long game. Start small, stay curious, and build your future step by step.",
  },
];

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
/* ---------- Text Script ---------- */
function buildScript(t: Topic): Msg[] {
  const messages: Msg[] = [
    { kind: "h", text: `${t.emoji} ${t.title}` },
    ...(t.question ? [{ kind: "b" as const, text: t.question }] : []),
    ...t.lines.map((text) => ({ kind: "b" as const, text })),
    ...(t.tip ? [{ kind: "t" as const, text: `💡 Try this: ${t.tip}` }] : []),
  ];

  if (t.calculator) {
    messages.push({ kind: "calc", text: "", content: <CompoundCalc /> });
  }

  return messages;
}
/* ---------- Compound Interest Slider ---------- */
const ANNUAL_RETURN = 0.07;

function CompoundCalc() {
  const [monthly, setMonthly] = useState(25);
  const [years, setYears] = useState(30);

  const monthlyRate = ANNUAL_RETURN / 12;
  const months = years * 12;
  const futureValue =
    monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  return (
    <div className="calc">
      <label htmlFor="monthly-contribution">
        Monthly contribution: <b>${monthly}</b>
      </label>
      <input
        id="monthly-contribution"
        type="range"
        min={5}
        max={500}
        step={5}
        value={monthly}
        onChange={(event) => setMonthly(Number(event.target.value))}
      />
      <label htmlFor="investment-years">
        Years invested: <b>{years}</b>
      </label>
      <input
        id="investment-years"
        type="range"
        min={1}
        max={40}
        value={years}
        onChange={(event) => setYears(Number(event.target.value))}
      />
      <p className="calc-result">
        You would contribute <b>${(monthly * months).toLocaleString()}</b> and
        could have around <b>${Math.round(futureValue).toLocaleString()}</b>.
      </p>
      <p className="calc-disclaimer">
        Example assumes a 7% average yearly return. This is not a promise.
      </p>
    </div>
  );
}

/* ---------- App ---------- */
export default function StartPage() {
  const [stone, setStone] = useState(0); // which stepping stone
  const [cur, setCur] = useState<number | null>(null); // open topic inside that stone
  const [shown, setShown] = useState(0); // how many scripted messages are visible
  const [answer, setAnswer] = useState<string | null>(null); // user's typed answer
  const [asking, setAsking] = useState(false); // waiting for a typed answer
  const [typing, setTyping] = useState(false); // Fern is "typing"
  const [draft, setDraft] = useState("");
  const [isScrollHovered, setIsScrollHovered] = useState(false);
  const [isScrollOpen, setIsScrollOpen] = useState(false);
  const [modalOrigin, setModalOrigin] = useState({ x: "50%", y: "50%" });
  const [accountGoal, setAccountGoal] = useState(() => loadGoal());
  const [goalDraft, setGoalDraft] = useState("");
  const [isEditingGoal, setIsEditingGoal] = useState(false);
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

  useEffect(() => {
    if (!isAccountButtonOpen) return;
    const nextGoal = loadGoal();
    setAccountGoal(nextGoal);
    setGoalDraft(nextGoal);
    setIsEditingGoal(false);
  }, [isAccountButtonOpen]);

  const timer = useRef<number>(0);
  const msgsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const goRef = useRef<HTMLButtonElement>(null);

  const topics = STONES[stone].topics;
  const topic = cur !== null ? topics[cur] : null;
  const script = useMemo(() => (topic ? buildScript(topic) : []), [topic]);
  const hasQuestion = !!topic?.question;
  const idleVideo = IDLE_CONTENT[stone]?.video ?? catTexting;
  const idleBubble = IDLE_CONTENT[stone]?.bubble ?? "";

  // visible messages, with the user's answer slotted in right after the question
  const visible: Msg[] = [];
  script.slice(0, shown).forEach((m, i) => {
    visible.push(m);
    if (hasQuestion && i === 1 && answer)
      visible.push({ kind: "me", text: answer });
  });

  // Cancel any pending "Fern is typing" timeout before changing the topic or closing the chat.
  const stopTimer = () => window.clearTimeout(timer.current);

  const openTopic = (s: number, i: number) => {
    stopTimer();
    const q = STONES[s].topics[i].question;
    setStone(s);
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

  const goStone = (i: number) => {
    closeChat();
    setStone(i);
  };

  const reveal = () => {
    setTyping(true);
    timer.current = window.setTimeout(() => {
      setShown((s) => s + 1);
      setTyping(false);
    }, 350);
  };

  const next = () => {
    if (typing || cur === null) return;
    if (shown < script.length) return reveal();
    if (cur < topics.length - 1) openTopic(stone, cur + 1);
    else if (stone < STONES.length - 1) openTopic(stone + 1, 0);
    else closeChat();
  };

  const submit = (skip: boolean) => {
    const v = draft.trim();
    if (!asking || typing || (!skip && !v)) return;
    if (!skip) {
      saveGoal(v);
      setAccountGoal(v);
      setGoalDraft(v);
      setAnswer(v);
    }
    setAsking(false);
    reveal();
  };

  // Keep the newest message in view as the chat grows.
  useEffect(() => {
    msgsRef.current?.scrollTo({
      top: msgsRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [shown, typing, answer, cur]);

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
        : stone < STONES.length - 1
          ? "Next stone →"
          : "Back to start ↺";

  //  ------ HTML Element  ---------------
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

              <h2 id="button-one-modal-title">Account</h2>
              <p>Here’s your saved financial goal.</p>

              {isEditingGoal ? (
                <textarea
                  value={goalDraft}
                  rows={4}
                  maxLength={500}
                  onChange={(event) => setGoalDraft(event.target.value)}
                  style={{ width: "100%", resize: "vertical" }}
                />
              ) : (
                <p>{accountGoal || "No financial goal saved yet."}</p>
              )}

              <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                {isEditingGoal ? (
                  <button
                    type="button"
                    onClick={() => {
                      const nextGoal = goalDraft.trim();
                      saveGoal(nextGoal);
                      setAccountGoal(nextGoal);
                      setIsEditingGoal(false);
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setGoalDraft(accountGoal);
                      setIsEditingGoal(true);
                    }}
                  >
                    Edit
                  </button>
                )}

                <button type="button" onClick={() => (window.location.href = "/")}>
                  Log Out
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
      <div className="wrap">
        <div className={`app${cur !== null ? " chatting" : ""}`}>
          <div>
            <div className="trail" role="tablist" aria-label="Stepping stones">
              {STONES.map((s, i) => (
                <button
                  key={s.name}
                  type="button"
                  className="stone"
                  role="tab"
                  aria-selected={stone === i}
                  onClick={() => goStone(i)}
                >
                  <span className="d">{s.emoji}</span>
                  <span className="l">
                    {i + 1}. {s.name}
                  </span>
                </button>
              ))}
            </div>
            <div className="list">
              {topics.map((t, i) => (
                <button
                  key={t.title}
                  type="button"
                  className={`card${cur === i ? " on" : ""}`}
                  aria-pressed={cur === i}
                  onClick={() => i !== cur && openTopic(stone, i)}
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
                  src={idleVideo ?? catTexting}
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-hidden="true"
                />
                <p className="video-bubble">{idleBubble}</p>
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
                    m.kind === "calc" ? (
                      <div key={`${stone}-${cur}-${i}`} className="calc-message">
                        {m.content}
                      </div>
                    ) : (
                      <div key={`${stone}-${cur}-${i}`} className={`b ${m.kind}`}>
                        {m.text}
                      </div>
                    )
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
                    <textarea
                      ref={inputRef}
                      rows={1}
                      maxLength={500}
                      placeholder="Type your answer…"
                      aria-label="Your answer"
                      value={draft}
                      onChange={(e) => {
                        setDraft(e.target.value);
                        e.target.style.height = "auto";
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          submit(false);
                        }
                      }}
                      style={{ resize: "none", overflow: "hidden" }}
                    />
                    <div className="ask-actions">
                      <button
                        type="button"
                        className="skip"
                        onClick={() => submit(true)}
                      >
                        Skip
                      </button>
                      <button
                        type="button"
                        className="pill"
                        onClick={() => submit(false)}
                      >
                        Send
                      </button>
                    </div>
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
