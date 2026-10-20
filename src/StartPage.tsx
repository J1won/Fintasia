import "./LandingPage.css";
import { supabase } from './lib/supabase';
import landingPageImage from "./assets/landingPageImage.png";
import shGrandpa from "./assets/shakygp.png";
import chGrandpa from "./assets/chillgp.png";
import scroll from "./assets/scroll.png";
import catTexting from "./assets/cat-texting.mp4";
import drCat from "./assets/drCertified.mp4";
import proudFace from "./assets/proudFace2.jpg";
import financiallyLiterateCat from "./assets/financial-dab-cat.mp4";
import battleCat from "./assets/battle-cat.mp4";
import burglarCat from "./assets/burglar-cat.mp4";
import dogParadise from "./assets/dogParadise.jpg";
import dogWarning from "./assets/dogWarning.jpg";
import happyDoggy from "./assets/happyDoggy.jpg";
import sad1 from "./assets/cryingWoman.jpg";
import sad2 from "./assets/cryingBarbie.jpg";
import sad3 from "./assets/sadParadise.jpg";
import poopPretty from "./assets/poopPretty.jpg";
import lifeFunds from "./assets/costsMoney.jpg";


import { useNavigate } from 'react-router-dom';
import {
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type ReactNode,
  useState,
} from "react";
import "./StartPage.css";
import Spanner from "./Spanner";

/* ---------- Core types for chat messages and course content ---------- */
type Kind =
  | "kHeading"
  | "kBubble"
  | "kQuestion"
  | "kTip"
  | "kResponse"
  | "kCalc"
  | "kImage";

interface Msg {
  kind: Kind;
  text: string;
  content?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
}

type ChatLine =
    string
  | {
      type: "heading";
      text: string;
    } 
  | {
      type: "image";
      src: string;
      alt?: string;
      text?: string;
    }
  | {
      type: "question";
      text: string;
    }
  | {
      type: "tip";
      text: string;
    };

interface Topic {
  lines: ChatLine[];
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
    name: "Money",
    topics: [
      {
        lines: [
          {
            type: "heading",
            text: "Why does everybody want money?",
          },
          {
            type: "image",
            src: dogParadise,
            alt: "dog in paradise",
            text: "Because money can provide freedom, independence, safety, and comfort.",
          },
          "But, it can also give you a quick buzz of happy.",
          "A cute toy, a fun night, a cool gadget, or a yummy snack.",
          "The buzz fades fast. But the freedom lasts.",
          {
            type: "image",
            src: dogWarning,
            alt: "dog warning",
            text: "Picking the long game is hard but feeling regret is harder so choose your battles.",
          },
          "Hey look on the bright side, you're here! And that's you choosing your future!",
          {
            type: "image",
            src: proudFace,
            alt: "Proud face",
          },
          "And I'm proud of you.",
        ],
      },
      {
        lines: [
          {
            type: "heading",
            text: "What is your financial goal?",
          },
          {
            type: "question",
            text: "More detailed the better! (View the answer in your profile)",
          },
          {
            type: "image",
            src: happyDoggy,
            alt: "dog happy",
            text: "Wonderful start.",
          },
          "Continue learning and keep in mind your end goal!",
          {
            type: "tip",
            text: "Write your financial goal somewhere you can see it everyday. Maybe the bathroom mirror or next to your desk!",
          }
        ],
      },
    ],
  },
  {
    emoji: "🔍",
    name: "Spending",
    topics: [
      {
        lines: [
          {
            type: "heading",
            text: "Mass Consumer Culture",
          },
          "Imagine this.",
          "Closets bulging. Drawers overflowing. Clothes forgotten.",
          "Toys piling up, collecting dust.",
          "Mass production. Smokestacks burning. Chemicals dumped.",
          "In 2018, the US made 292 million tons of trash. That’s about 4.9 pounds per person, every day. 146 million tons of it went to landfills.",
          {
            type: "image",
            src: sad1,
            alt: "crying woman",
          },
          {
            type: "image",
            src: sad2,
            alt: "crying barbie",
          },
          {
            type: "image",
            src: sad3,
            alt: "crying happy guy",
          },
          "The reality is, we impulsively buy things we don’t need. It hurts our planet, our wallet, and our peace of mind.",
          {
            type: "tip",
            text: "Next time you want to impulsively buy something, imagine it fully covered in human poop and decide if you would wash it off or leave it.",
          },
          {
            type: "image",
            src: poopPretty,
            alt: "poop is serving",
          },
        ],
      },
      {
        lines: [
          {
            type: "heading",
            text: "Marketing traps",
          },
          "Here’s a secret: Companies spend milllllions on ads. Because they work.",
          "Researchers have studied for decades how to get people to spend.",
          "Think of something you want but don’t need. Picture the logo, the colors, the packaging.",
          "Someone worked really hard to make you feel that urge to buy.",
          "Apps even remember what you looked at and show it to you again. That’s called targeted marketing.",
          "And hate to tell ya, marketing is only gonna get better.",
          {
            type: "image",
            src: happyDoggy,
            alt: "dog happy",
            text: "We gotta be strong, soldiers.",
          },
          {
            type: "tip",
            text: "Next time you want something, wait 24 hours and see if the pull fades.",
          }
        ],
      },
    ],
  },
  {
    emoji: "🛟",
    name: "Free Money",
    topics: [
      {
        lines: [
          {
            type: "heading",
            text: "Loans",
          },
          "Lemme tell you something, feel free to write this down.",
          "There is no such thing as free money in the real world. Only loaned money",
          "Loan = debt + interest",
          "Interest is the rate at which the debt increases until it's paid off.",
          "Many predatory companies loan money at high interest rates making it hard to pay off.",
          {
            type: "tip",
            text: "If an interest is higher than 10%, STOP and think *carefully* about other options.",
          },
        ],
      },
      {
        lines: [
          {
            type: "heading",
            text: "Credit Cards",
          },
          "Credit cards are one of the most sneakiest loans in existence.",
          "Credit cards are loaned money that must be paid off end of month.",
          "If it is not paid off, credit card interest often are more than 30%.",
          "Cash back and rewards are used as ways to blind people from the downsides.",
          "But the highest credit card rewards only go up to 5%.",
          "Let's do the math. Spend $100 on a card. You get free $5 as reward. You accidentally forget to pay off your card end of month and get a $30 interest fee. That's 6 months of rewards!!",
          {
            type: "tip",
            text: "ALWAYS pay off your card. Set up card AUTOPAY to avoid mistakes.",
          },
        ],
      },
    ],
  },
  {
    emoji: "🌳",
    name: "Protection",
    topics: [
      {
        lines: [
          {
            type: "heading",
            text: "Something called life",
          },
          {
            type: "image",
            src: lifeFunds,
            alt: "Life is expensive",
          },
          "Life can be scary and unpredictable. Losing some money along the way is normal.",
          "More than half of households get hit with a surprise expense or income loss every year.",
          "Car trouble is the top offender, then home repairs, hospital trips, and lost paychecks.",
          "About 4 in 10 adults can’t cover a surprise $400 with cash.",
          {
            type: "tip",
            text: "Setting aside money for life is a must.",
          },
        ],
      },
      {
        lines: [
          {
            type: "heading",
            text: "Emergency fund",
          },
          "Emergency savings protects you from life’s surprises and from predatory loan companies.",
          "It should be at least 3 months of your living expenses.",
          "Use a *high-yield savings account*, so your money grows while it waits.",
          "Only touch for for NEEDS. Never wants. Never investments.",
          "A sale is not an emergency.",
          "Hot stock tip” is not an emergency.",
          "New sneakers are definitely not an emergency.",
          {
            type: "tip",
            text: "Build your emergency cushion first, before anything else.",
          },
        ],
      },
      // {
      //   emoji: "",
      //   title: "Emergency fund",
      //   lines: [
      
      //     "Here’s the cool part: growth can grow.",
      //     "With compound interest, your earnings start earning too.",
      //     "Pretend $25 a month at a 7% yearly average for 30 years: you’d put in $9,000 and it could grow to around $30,000. Just an example, not a promise.",
      //     "Starting early matters most. A tree needs time 🌳",
      //   ],
      //   calculator: true,
      //   tip: "Try a compound interest calculator with your own numbers.",
      // },
      {
        lines: [
          {
            type: "heading",
            text: "Next steps",
          },
          "Wow! You've already completed the basics!",
          "If you feel like you're ready to take the next step, go on ahead.",
          "I'll take you step by step through opening a brokerage account, retirement account, and more!",
          "Click \"Next Chapter\" found on the bottom right of the screen."
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
    video: drCat,
    bubble:
      "Did I hear someone call me? Lol. Don't worry boo boo, I'll teach you everything you need to know about finance.",
  },
  {
    video: financiallyLiterateCat,
    bubble: "Let's be smart about spending.",
  },
  {
    video: burglarCat,
    bubble: "Somebody say free money??",
  },
  {
    video: battleCat,
    bubble: "Thy must protect thyself..."
  },
];

const loadGoal = (): string => {
  try {
    return localStorage.getItem(GOAL_KEY) ?? "";
  } catch {
    return "";
  }
};
const saveGoal = (userGoal: string) => {
  try {
    localStorage.setItem(GOAL_KEY, userGoal);
  } catch {
    /* storage unavailable: ignore */
  }
};
/* ---------- Text Script ---------- */
function buildScript(tt: Topic): Msg[] {
  const messages: Msg[] = [
    ...tt.lines.map((line) =>
      typeof line === "string"
        ? { kind: "kBubble" as const, text: line }
        : line.type === "heading"
          ? { kind: "kHeading" as const, text: line.text }
          : line.type === "question"
            ? { kind: "kQuestion" as const, text: line.text }
            : line.type === "tip"
              ? { kind: "kTip" as const, text: line.text }
              : {
            kind: "kImage" as const,
            text: line.text ?? "",
            imageSrc: line.src,
            imageAlt: line.alt ?? "",
          },
    ),
  ];

  if (tt.calculator) {
    messages.push({ kind: "kCalc", text: "", content: <CompoundCalc /> });
  }

  return messages;
}

function lineHeader(line?: ChatLine): string | undefined {
  if (line === undefined) return undefined;
  if (typeof line === "string") return line;
  return line.text;               // string for most shapes, string | undefined for image
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
    <div className="kCalc">
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
      <p className="kCalc-result">
        You would contribute <b>${(monthly * months).toLocaleString()}</b> and
        could have around <b>${Math.round(futureValue).toLocaleString()}</b>.
      </p>
      <p className="kCalc-disclaimer">
        Example assumes a 7% average yearly return. This is not a promise.
      </p>
    </div>
  );
}

/* ---------- App ---------- */
export default function StartPage() {
  const navigate = useNavigate();

  const [stone, setStone] = useState(0); // which stepping stone
  const [cur, setCur] = useState<number | null>(null); // open topic inside that stone
  const [shown, setShown] = useState(0); // how many scripted messages are visible
  const [answer, setAnswer] = useState<string | null>(null); // user's typed answer
  const [asking, setAsking] = useState(false); // waiting for a typed answer
  const [typing, setTyping] = useState(false); // Fern is "typing"
  const [draft, setDraft] = useState("");
  const [isScrollHovered, setIsScrollHovered] = useState(false);
  const [isScrollOpen, setIsScrollOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isReadConfirmOpen, setIsReadConfirmOpen] = useState(false);
  const [hasAcknowledgedReading, setHasAcknowledgedReading] = useState(false);
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
  

  const timer = useRef<number>(0);
  const msgsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const goRef = useRef<HTMLButtonElement>(null);

  const topics = STONES[stone].topics;
  const topic = cur !== null ? topics[cur] : null;
  const script = useMemo(() => (topic ? buildScript(topic) : []), [topic]);
  const idleVideo = IDLE_CONTENT[stone]?.video ?? catTexting;
  const idleBubble = IDLE_CONTENT[stone]?.bubble ?? "";

  // visible messages, with the user's answer slotted in right after the question
  const visible: Msg[] = [];
  script.slice(0, shown).forEach((currMsg) => {
    visible.push(currMsg);
    if (currMsg.kind === "kQuestion" && answer)
      visible.push({ kind: "kResponse", text: answer });
  });

  // Cancel any pending "Fern is typing" timeout before changing the topic or closing the chat.
  const stopTimer = () => window.clearTimeout(timer.current);

  const openTopic = (stone: number, card: number) => {
    stopTimer();
    setStone(stone);
    setCur(card);
    setShown(1);
    setAnswer(null);
    setTyping(false);
    setAsking(false);
  };

  const closeChat = () => {
    stopTimer();
    setCur(null);
    setAsking(false);
    setTyping(false);
  };

  const goStone = (stone: number) => {
    closeChat();
    setStone(stone);
  };

  const reveal = () => {
    setTyping(true);
    timer.current = window.setTimeout(() => {
      setShown((s) => s + 1);
      setTyping(false);
      if (script[shown]?.kind === "kQuestion") {
        setDraft(loadGoal());
        setAsking(true);
      }
    }, 350);
  };

  const next = () => {
    if (typing || cur === null) return;
    if (shown < script.length) return reveal();
    if (cur < topics.length - 1) openTopic(stone, cur + 1);
    else if (stone < STONES.length - 1) goStone(stone + 1);
    else closeChat();
  };

  const submit = (skip: boolean) => {
    const input = draft.trim();
    if (!asking || typing || (!skip && !input)) return;
    if (!skip) {
      saveGoal(input);
      setAnswer(input);
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
      ? ">>"
      : cur !== null && cur < topics.length - 1
        ? "cont. →"
        : stone < STONES.length - 1
          ? "Next stone →"
          : "Run it back ↺";

  //  ------ HTML Element  ---------------
  return (
    <div
      className="landing-page"
      style={{ "--landing-image": `url(${landingPageImage})` } as CSSProperties}
    >
      <Spanner onAccountModalClick={setIsAccountModalOpen} />
      <div className="wrap">
        <div className={`app${cur !== null ? " chatting" : ""}`}>
          <div>
            <div className="trail" role="tablist" aria-label="Stepping stones">
              {STONES.map((ss, ii) => (
                <button
                  key={ss.name}
                  type="button"
                  className="stone"
                  role="tab"
                  aria-selected={stone === ii}
                  onClick={() => goStone(ii)}
                >
                  <span className="d">{ss.emoji}</span>
                  <span className="l">
                    {ii + 1}. {ss.name}
                  </span>
                </button>
              ))}
            </div>
            <div className="list">
              {topics.map((tt, ii) => {
                const firstText = lineHeader(tt.lines.at(0));   // JS zone: statements allowed

                return (                                      // this return belongs to the map callback
                  <button
                    key={firstText ?? ii}
                    type="button"
                    className={`card${cur === ii ? " on" : ""}`}
                    aria-pressed={cur === ii}
                    onClick={() => {
                      if (ii !== cur) openTopic(stone, ii);
                    }}
                  >
                    <h3>{firstText}</h3>
                  </button>
                );
              })}
              </div>
                
                {/* <button
                  key={tt.title}
                  const headLine = tt.lines.at(0)
                  const firstText =
                  typeof headLine === "string"
                    ? headLine
                    : typeof headLine.text === "string"
                      ? headLine.text
                      : undefined;
                  key={tt.lines.at(0)?.text}
                  type="button"
                  className={`card${cur === ii ? " on" : ""}`}
                  aria-pressed={cur === ii}
                  onClick={() => ii !== cur && openTopic(stone, ii)}
                >
              //     <span className="em">{tt.emoji}</span>
              //     <h3>{tt.title}</h3>
              //   </button>
              // ))} */}
            
            <button
              type="button"
              className="next-page-button"
              onClick={(event) =>
                openFromButton(event, () => {
                  setHasAcknowledgedReading(false);
                  setIsReadConfirmOpen(true);
                })
              }
            >
              Next Chapter...
            </button>
            {isReadConfirmOpen && (
              <div
                className="read-confirm-backdrop"
                role="presentation"
                onClick={() => setIsReadConfirmOpen(false)}
              >
                <section
                  className="read-confirm-modal"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="read-confirm-title"
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    type="button"
                    className="read-confirm-close"
                    aria-label="Close confirmation"
                    onClick={() => setIsReadConfirmOpen(false)}
                  >
                    <span aria-hidden="true">&#215;</span>
                  </button>
                  <h2 id="read-confirm-title">
                    I have read ALL the text messages
                  </h2>
                  <label className="read-confirm-agreement">
                    <input
                      type="checkbox"
                      checked={hasAcknowledgedReading}
                      onChange={(event) =>
                        setHasAcknowledgedReading(event.target.checked)
                      }
                    />
                    <span>i agree</span>
                  </label>
                  <button
                    type="button"
                    className="read-confirm-continue"
                    disabled={!hasAcknowledgedReading}
                    onClick={() => navigate('/action')}
                  >
                    Continue to next chapter
                  </button>
                </section>
              </div>
            )}
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
                {cur === null &&
                !isAccountModalOpen &&
                !isScrollOpen &&
                !isReadConfirmOpen && (
                  <video
                    src={idleVideo ?? catTexting}
                    autoPlay
                    loop
                    playsInline
                    aria-hidden="true"
                  />
                )}  
                {idleBubble && <p className="video-bubble">{idleBubble}</p>}
                <button
                  type="button"
                  className="idle-continue"
                  onClick={() => openTopic(stone, 0)}
                >
                  Start
                </button>
              </div>

              <div
                className="chatbox"
                role="dialog"
                aria-label="Chat with Fern"
              >
                <div className="head">
                  <span className="avatar">🤓</span>
                  <div>
                    {/* <b>Fern</b>
                    <small>your money friend</small> */}
                  </div>
                  <button type="button" className="x-chat" onClick={closeChat}>
                    ✕ Close
                  </button>
                </div>

                <div className="msgs" ref={msgsRef}>
                  {visible.map((mm, ii) => (
                    mm.kind === "kCalc" ? (
                      <div key={`${stone}-${cur}-${ii}`} className="kCalc-message">
                        {mm.content}
                      </div>
                    ) : mm.kind === "kImage" ? (
                      <div
                        key={`${stone}-${cur}-${ii}`}
                        className={mm.text ? "kBubble kImage" : "image-message"}
                      >
                        <img
                          src={mm.imageSrc}
                          alt={mm.imageAlt ?? "Chat image"}
                          onLoad={() =>
                            msgsRef.current?.scrollTo({
                              top: msgsRef.current.scrollHeight,
                              behavior: "smooth",
                            })
                          }
                          style={{
                            display: "block",
                            maxWidth: "100%",
                            maxHeight: "220px",
                            width: "auto",
                            height: "auto",
                            borderRadius: "12px",
                            marginBottom: mm.text ? "8px" : 0,
                          }}
                        />
                        {mm.text && <span>{mm.text}</span>}
                      </div>
                    ) : (
                      <div key={`${stone}-${cur}-${ii}`} className={`kBubble ${mm.kind}`}>
                        {mm.text}
                      </div>
                    )
                  ))}
                  {typing && (
                    <div className="kBubble">
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
                      onChange={(ee) => {
                        setDraft(ee.target.value);
                        ee.target.style.height = "auto";
                        ee.target.style.height = `${ee.target.scrollHeight}px`;
                      }}
                      onKeyDown={(ee) => {
                        if (ee.key === "Enter" && !ee.shiftKey) {
                          ee.preventDefault();
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
