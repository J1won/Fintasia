import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'
import landingPageImage from './assets/landingPageImage.png'
import logo from './assets/logo.png'
import shGrandpa from './assets/shakygp.png'
import chGrandpa from './assets/chillgp.png'
import scroll from './assets/scroll.png'
import "./VersionOnePage.css";

type MemeKey = "save" | "habit" | "emerg" | "grow" | "ads";

interface MemeData {
  bg: string;
  scene: string;
  top: string;
  bottom: string;
}

interface CardData {
  emoji: string;
  title: string;
  teaser: string;
  body: ReactNode;
}

interface Stop {
  emoji: string;
  name: string;
  intro: ReactNode;
  cards: CardData[];
}

/* ---------- Data ---------- */
const MEMES: Record<MemeKey, MemeData> = {
  save: { bg: "#ffe29a", scene: "🐿️🛍️🌰", top: "Me: I’ll start saving next month", bottom: "Also me: where did my acorns go?" },
  habit: { bg: "#ffd0dd", scene: "🐿️🍪🛒", top: "The budget: 20% to savings", bottom: "The snack aisle: hold my acorn" },
  emerg: { bg: "#d6f5c9", scene: "🚑📉😬", top: "Me needing cash fast", bottom: "My invested money: down 20% today" },
  grow: { bg: "#bfe9ff", scene: "🌱➜🌲🌲🌲", top: "Me planting $5 at age 20", bottom: "Me at 50 admiring my forest" },
  ads: { bg: "#ffe0b8", scene: "🛒⏰😵", top: "Almost sold out! Only 2 left!", bottom: "Me buying a 4th phone case" },
};

const DEBT_ROWS: [string, string][] = [
  ["$18.8 trillion", "total US household debt (Q2 2026)"],
  ["$1.26 trillion", "credit card balances"],
  ["$1.71 trillion", "auto loans"],
  ["$1.65 trillion", "student loans"],
  ["4.7%", "of all debt is behind on payments"],
];

const SALES_TRICKS: [string, string][] = [
  ["“Back in stock!”", "Makes it feel rare, so you buy before it’s gone."],
  ["“Almost sold out!”", "Scarcity. A fear of missing out."],
  ["“Ends tonight”", "A countdown so you can’t think."],
  ["“Was $99, now $49”", "The big first number makes $49 feel like a win."],
  ["“Everyone’s buying”", "Crowd pressure."],
];

/* ---------- Small components ---------- */
function Meme({ k }: { k: MemeKey }) {
  const m = MEMES[k];
  return (
    <figure
      className="meme"
      role="img"
      aria-label={`Meme: ${m.top}. ${m.bottom}`}
      style={{ "--c": m.bg } as CSSProperties}
    >
      <span className="t top">{m.top}</span>
      <span className="sc">{m.scene}</span>
      <span className="t bot">{m.bottom}</span>
    </figure>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="chk">
      {items.map((item) => (
        <li key={item}>
          <label>
            <input type="checkbox" />
            <span>{item}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

function PairTable({ rows }: { rows: [string, string][] }) {
  return (
    <table>
      <tbody>
        {rows.map(([a, b]) => (
          <tr key={a}>
            <td>{a}</td>
            <td>{b}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const ANNUAL_RETURN = 0.07; // example only, not a promise

function CompoundCalc() {
  const [monthly, setMonthly] = useState(25);
  const [years, setYears] = useState(30);

  const r = ANNUAL_RETURN / 12;
  const months = years * 12;
  const future = monthly * ((Math.pow(1 + r, months) - 1) / r);

  return (
    <div className="calc">
      <label htmlFor="monthly">
        Put in per month: <b>${monthly}</b>
      </label>
      <input id="monthly" type="range" min={5} max={500} step={5} value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} />
      <label htmlFor="years">
        For how many years: <b>{years}</b>
      </label>
      <input id="years" type="range" min={1} max={40} value={years} onChange={(e) => setYears(Number(e.target.value))} />
      <p style={{ marginTop: 12 }}>
        You’d put in <b>${(monthly * months).toLocaleString()}</b> and it could grow to{" "}
        <span className="big">${Math.round(future).toLocaleString()}</span>
      </p>
      <p className="one">Pretend average of 7% a year. That’s an example, not a promise.</p>
    </div>
  );
}

/* ---------- Content ---------- */
const STOPS: Stop[] = [
  {
    emoji: "🌱",
    name: "Basics",
    intro: <><b>Start here.</b> Four tiny ideas that everything else builds on.</>,
    cards: [
      {
        emoji: "🪙", title: "Why we need money?", teaser: "Money is a tool.",
        body: (
          <>
            <p>Money is a tool we trade for the things we need and want. It’s also a way to store your work for later: the hours you work today become something you can use next month or next year.</p>
            <p className="tip">💡 Money isn’t good or bad. What matters is what you point it at.</p>
          </>
        ),
      },
      {
        emoji: "🌰", title: "What's your goal?", teaser: "Write your financial goal here to view later in your profile.",
        body: (
          <>
          <p></p>
          <p>
          <textarea name="message" >
               The more detailed the better!
          </textarea>
          </p>
            {/* <Meme k="save" /> */}
          </>
        ),
      },
    ],
  },
  {
    emoji: "🛍️",
    name: "Spending Culture",
    intro: <><b>Start here.</b> Four tiny ideas that everything else builds on.</>,
    cards: [
      {
        emoji: "🪙", title: "Mass Consumerism", teaser: "Mass consumption is the new normal.",
        body: (
          <>
            <p>Money is a tool we trade for the things we need and want. It’s also a way to store your work for later: the hours you work today become something you can use next month or next year.</p>
            <p className="tip">💡 Money isn’t good or bad. What matters is what you point it at.</p>
          </>
        ),
      },
      {
        emoji: "🕵️", title: "Genius Marketing", teaser: "Understand the traps.",
        body: (
          <>
            <p>Saving means keeping some money instead of spending it all. It buys you <b>options</b>: handle a surprise bill, leave a bad job, or buy something without going into debt.</p>
            <Meme k="save" />
            <p className="warn">⚠️ Investments go up <i>and</i> down. They’re for money you won’t need for years.</p>
          </>
        ),
      },
    ],
  },
  {
    emoji: "🛟",
    name: "Save & grow",
    intro: <><b>Two jars, two jobs.</b> One jar is for emergencies. The other is for long-term growth.</>,
    cards: [
      {
        emoji: "🛟", title: "Emergency fund", teaser: "3 to 6 months of must-pay costs.",
        body: (
          <>
            <p>Add up the things you <i>must</i> pay in a month (rent, food, bills, transport). Aim to keep <b>3 to 6 months</b> of that in a regular savings account you can reach quickly.</p>
            <p className="warn">🚫 <b>Invested money is NOT emergency money.</b> Invested money should be <b>forgotten money</b>. If you need cash on a day the market is down, you’d have to sell at a loss.</p>
            <Meme k="emerg" />
          </>
        ),
      },
      {
        emoji: "🌲", title: "Power of investing", teaser: "Compound interest, in slow motion.",
        body: (
          <>
            <p>Compound growth means your earnings start earning too. Slide the sliders and watch the forest grow.</p>
            <CompoundCalc />
            <Meme k="grow" />
          </>
        ),
      },
      {
        emoji: "🧺", title: "What’s an ETF?", teaser: "A basket of many companies.",
        body: (
          <>
            <p>An <b>ETF</b> (exchange-traded fund) bundles lots of investments into one thing you can buy with one click. Instead of betting on a single company, you own a tiny slice of many, which spreads out the risk.</p>
            <p className="tip">💡 Look at the <b>expense ratio</b>. It’s the yearly fee, and lower is usually better.</p>
          </>
        ),
      },
    ],
  },
  {
    emoji: "🔍",
    name: "Wise up",
    intro: <><b>Spot the tricks.</b> Once you see how stuff gets sold to you, it’s much easier to keep your money.</>,
    cards: [
      {
        emoji: "🛍️", title: "Why saving is cool", teaser: "Ads work hard. You can work smarter.",
        body: (
          <>
            <p>Feeds, stores and emails are built to make you feel like you’re missing out. Every impulse you skip is money that stays yours, and money that stays yours can grow.</p>
            <p className="tip">🖼️ Idea: add your own photos here, like a mall, a pile of packages, or a full closet.</p>
          </>
        ),
      },
      {
        emoji: "📊", title: "Debt, by the numbers", teaser: "Real US figures from the NY Fed.",
        body: (
          <>
            <PairTable rows={DEBT_ROWS} />
            <p className="one">Source: Federal Reserve Bank of New York, Household Debt and Credit Report.</p>
          </>
        ),
      },
      {
        emoji: "✂️", title: "Spend less right now", teaser: "Tiny wins you can do today.",
        body: (
          <>
            <p>Pick one:</p>
            <Checklist items={[
              "Cancel one subscription you forgot about",
              "Unsubscribe from store emails",
              "Delete saved cards from shopping apps",
              "Cook one extra meal at home this week",
              "Put wants on a 24-hour wish list",
            ]} />
          </>
        ),
      },
      {
        emoji: "🕵️", title: "Spot the sales trick", teaser: "Know the words that make you rush.",
        body: (
          <>
            <PairTable rows={SALES_TRICKS} />
            <Meme k="ads" />
          </>
        ),
      },
    ],
  },
  {
    emoji: "🚀",
    name: "Do it",
    intro: <><b>Your quests.</b> Check things off as you go. Small steps count.</>,
    cards: [
      {
        emoji: "👀", title: "Watch your spending", teaser: "See where it all goes.",
        body: (
          <>
            <p>You can’t change what you can’t see.</p>
            <Checklist items={[
              "List every bank you have an account with",
              "Open a Rocket Money account and add them all",
              "Look at all your spending",
              "What did you buy recently because you were lazy?",
              "What did you spend on recently that you regret?",
            ]} />
          </>
        ),
      },
      {
        emoji: "📈", title: "Open an investment account", teaser: "Step by step, then buy an ETF.",
        body: (
          <>
            <ol>
              <li>Pick a well-known brokerage (compare fees first).</li>
              <li>Choose <b>Open account</b>, then an individual brokerage account.</li>
              <li>Enter your details (name, address, ID, employment).</li>
              <li>Link your bank and move over a small amount.</li>
              <li>Search for an ETF, like a broad fund that tracks a big chunk of the market.</li>
              <li>Tap <b>Buy</b>, enter the amount, and confirm.</li>
            </ol>
            <p className="tip">💡 Then leave it alone. Forgotten money grows best.</p>
          </>
        ),
      },
      {
        emoji: "🧓", title: "Open a Roth IRA", teaser: "Start with just $5.",
        body: (
          <>
            <ol>
              <li>Check that you have earned income and are under the income limit.</li>
              <li>At your brokerage, choose <b>Roth IRA</b> as the account type.</li>
              <li><b>Put in just $5 right now.</b> Skip the coffee for one day if you need to.</li>
              <li>Buy an ETF <i>inside</i> the Roth. The account is only the container, and cash just sits there until you invest it.</li>
              <li>Set up a small automatic deposit.</li>
            </ol>
            <p className="warn">⚠️ It’s built for retirement, so taking money out early can have taxes or penalties.</p>
          </>
        ),
      },
    ],
  },
];

/* ---------- Card + Section ---------- */
interface CardProps {
  data: CardData;
  open: boolean;
  onToggle: () => void;
}

function Card({ data, open, onToggle }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 260);
    return () => window.clearTimeout(id);
  }, [open]);

  return (
    <div ref={ref} className={`card${open ? " open" : ""}`}>
      <button type="button" aria-expanded={open} onClick={onToggle}>
        <span className="em">{data.emoji}</span>
        <h3>{data.title}</h3>
        <p className="one">{data.teaser}</p>
        <span className="card-chevron" aria-hidden="true" />
      </button>
      <div className="body">
        <div>
          <div className="in">{data.body}</div>
        </div>
      </div>
    </div>
  );
}

interface SectionProps {
  stop: Stop;
  hidden: boolean;
  nextName?: string;
  onNext: () => void;
}

function Section({ stop, hidden, nextName, onNext }: SectionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="sec" hidden={hidden}>
      <p className="intro">{stop.intro}</p>
      <div className="grid">
        {stop.cards.map((card, i) => (
          <Card
            key={card.title}
            data={card}
            open={openIdx === i}
            onToggle={() => setOpenIdx(openIdx === i ? null : i)}
          />
        ))}
      </div>
      {nextName && (
        <button type="button" className="pill" onClick={onNext}>
          Next stop: {nextName} →
        </button>
      )}
    </section>
  );
}

function LandingPage() {
     const navigate = useNavigate();
     const [isScrollHovered, setIsScrollHovered] = useState(false);
     const [isScrollOpen, setIsScrollOpen] = useState(false);
     const [isButtonOneOpen, setIsButtonOneOpen] = useState(false);
     // const [isButtonTwoOpen, setIsButtonTwoOpen] = useState(false);
     const [modalOrigin, setModalOrigin] = useState({ x: '50%', y: '50%' });

     const [active, setActive] = useState(0);

     const goTo = (i: number) => {
     setActive(i);
     window.scrollTo({ top: 0, behavior: "smooth" });
     };

     const openFromButton = (event: React.MouseEvent<HTMLButtonElement>, openModal: () => void) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
          const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
          setModalOrigin({ x: `${x}%`, y: `${y}%` });
          openModal();
     };

     return(
          <>
               <div className="landing-page" style={{ "--landing-image": `url(${landingPageImage})` } as CSSProperties}>
                    <div className='nav-bar'>
                         <button className="logo-button" onClick={() => navigate('/landing')}>
                              <img src={logo} alt="Home reroute logo" />
                         </button>

                         <button className="profile-button" onClick={(event) => openFromButton(event, () => setIsButtonOneOpen(true))}>
                              Account
                         </button>
                         {isButtonOneOpen && (
                              <div
                                   className="scroll-modal-backdrop"
                                   role="presentation"
                                   onClick={() => setIsButtonOneOpen(false)}
                              >
                                   <section
                                        className="scroll-modal"
                                        style={{
                                             ['--modal-origin-x' as any]: modalOrigin.x,
                                             ['--modal-origin-y' as any]: modalOrigin.y,
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
                                             onClick={() => setIsButtonOneOpen(false)}
                                        >
                                             <span aria-hidden="true">&#215;</span>
                                        </button>
                                        
                                        <h2 id="button-one-modal-title">Button One</h2>
                                        <p>Explore your next financial move with confidence.</p>
                                        <button  onClick={() => window.location.href='/'}> 
                                             Log Out
                                        </button>
                                   </section>
                              </div>
                         )}
                    </div>
                    
                    <h1>
                         
                    </h1>
                    <div className="wrap">
                         <p className="sub">Four little stops. Hop along the path, tap a card, learn one thing at a time.</p>

                         <div className="trail" role="tablist" aria-label="Stops">
                         {STOPS.map((s, i) => (
                              <button
                              key={s.name}
                              type="button"
                              className="stop"
                              role="tab"
                              aria-selected={active === i}
                              onClick={() => setActive(i)}
                              >
                              <span className="d">{s.emoji}</span>
                              <span className="l">{i + 1}. {s.name}</span>
                              </button>
                         ))}
                         </div>

                         {STOPS.map((s, i) => (
                         <Section
                              key={s.name}
                              stop={s}
                              hidden={active !== i}
                              nextName={STOPS[i + 1]?.name}
                              onNext={() => goTo(i + 1)}
                         />
                         ))}

                         <p className="foot">
                         Educational only, not financial advice. Debt numbers: New York Fed, Q2 2026. Roth IRAs have income and yearly
                         contribution limits, so check irs.gov before you open one.
                         </p>
                    </div>

                    {/* SHAKING GRANDPA */}
                    <div id='scroll-gp-group'>
                         {/* scroll grandpa */}

                         <button
                              type="button"
                              onClick={(event) => openFromButton(event, () => setIsScrollOpen(true))}
                              onMouseEnter={() => setIsScrollHovered(true)}
                              onMouseLeave={() => setIsScrollHovered(false)}
                         >
                              <img src={scroll} alt="Financial Literacy Scroll" />
                         </button>
                         <img
                              className={isScrollHovered ? 'grandpa-shaking' : ''}
                              src={isScrollHovered ? shGrandpa : chGrandpa}
                              alt={isScrollHovered ? 'shaky reaction grandpa' : 'chill grandpa'}
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
                                        ['--modal-origin-x' as any]: modalOrigin.x,
                                        ['--modal-origin-y' as any]: modalOrigin.y,
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
                                   <p>Me and all the whimsy creatures here are so glad you're here at Fintasia!</p>
                                   <p>In order to stay here, you must follow the three most important rules of Fintasia.
                                        1. Love yourself. and  Respect yourself. 
                                   </p>
                                   <p>
                                        In everything we teach here, loving yourself lies at the center of it all.
                                   </p>
                              </section>
                         </div>
                    )}

                    {/* <div className="button-stack">
                         <button className="big-btn" onClick={() => window.location.href='/save'}>
                              All About Saving!
                         </button>
                         <button className="big-btn" onClick={() => window.location.href='/invest'}>
                              All About Investing!
                         </button>
                         <button className="big-btn" onClick={() => window.location.href='/versionOne'}>
                              under construction
                         </button>
                    </div> */}

                    
{/* 
                    {isButtonTwoOpen && (
                         <div
                              className="scroll-modal-backdrop"
                              role="presentation"
                              onClick={() => setIsButtonTwoOpen(false)}
                         >
                              <section
                                   className="scroll-modal"
                                   style={{
                                        ['--modal-origin-x' as any]: modalOrigin.x,
                                        ['--modal-origin-y' as any]: modalOrigin.y,
                                   }}
                                   role="dialog"
                                   aria-modal="true"
                                   aria-labelledby="button-two-modal-title"
                                   onClick={(event) => event.stopPropagation()}
                              >
                                   <button
                                        className="scroll-modal-close"
                                        type="button"
                                        aria-label="Close button two window"
                                        onClick={() => setIsButtonTwoOpen(false)}
                                   >
                                        <span aria-hidden="true">&#215;</span>
                                   </button>
                                   <h2 id="button-two-modal-title">Button Two</h2>
                                   <p>See your goals, habits, and plans in one place.</p>
                              </section>
                         </div>
                    )} */}
                    
               </div>
          </>
     )
}
export default LandingPage