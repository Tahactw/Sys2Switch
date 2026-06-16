import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Search, 
  TrendingDown, 
  Clock, 
  Heart, 
  ArrowLeft, 
  RefreshCcw, 
  AlertTriangle,
  Zap,
  Target
} from 'lucide-react';

const APP_DATA = [
  {
    id: 'evaluating',
    name: 'Evaluating People & Information',
    icon: Search,
    scenarios: [
      {
        label: "I'm assuming this person is highly competent because I like their overall vibe.",
        trap: "The Halo Effect",
        question: "Am I assuming competence just because they are likable, attractive, or share my politics, letting my emotional reaction dictate their other attributes?"
      },
      {
        label: "I'm relying on my first impression because this perfectly matches a stereotype.",
        trap: "Representativeness & Base-Rate Neglect",
        question: "Has my focus on a vivid stereotype blinded me to the statistical reality and actual base-rate probabilities of this occurring?"
      },
      {
        label: "I'm judging how common something is by how easily I can recall examples of it.",
        trap: "The Availability Heuristic",
        question: "Am I confusing the ease of recall (e.g., from recent highly-publicized news) with the objective, statistical probability of it happening?"
      },
      {
        label: "I'm drawing a massive, confident conclusion from a very tiny sample of data.",
        trap: "The Law of Small Numbers",
        question: "Is the mathematical sample size simply too small to draw a meaningful conclusion, making this an artifact of random chance?"
      },
      {
        label: "I'm making a confident ruling based entirely on the limited information right in front of me.",
        trap: "WYSIATI (What You See Is All There Is)",
        question: "Am I jumping to a conclusion because my brain constructed a coherent story? What critical information is missing from this picture?"
      },
      {
        label: "I'm highly confident in my prediction despite a chaotic, highly unpredictable environment.",
        trap: "The Illusion of Validity",
        question: "Am I confusing a good narrative with an accurate forecast? Does this environment actually possess enough stable regularities to allow for true expert intuition?"
      },
      {
        label: "My estimate or negotiation has been swayed by a completely arbitrary starting number.",
        trap: "The Anchoring Effect",
        question: "If I mentally strip away their starting number and begin from zero, what is my objective, independent valuation of this item?"
      },
      {
        label: "I feel this statement must be true because it's printed in a clean font and uses simple words.",
        trap: "Cognitive Ease & The Illusion of Truth",
        question: "Am I confusing the pleasant feeling of effortless processing (fluency) with factual accuracy?"
      },
      {
        label: "I'm letting my environment or recent subtle experiences dictate my current choice.",
        trap: "Priming & The Ideomotor Effect",
        question: "Is my current thought process being unconsciously hijacked by irrelevant sights, sounds, or concepts I was just exposed to?"
      },
      {
        label: "I'm assuming an individual with two specific traits is more probable than an individual with just one.",
        trap: "The Conjunction Fallacy",
        question: "Am I violating basic logic by assuming a rich, detailed story is mathematically more probable than a broader, less detailed one?"
      },
      {
        label: "I'm assigning a lower value to a bundle of items because a few are defective.",
        trap: "Less is More (Single vs. Joint Evaluation)",
        question: "Am I wrongly averaging the value of this package instead of adding up the total sum of its useful parts?"
      }
    ]
  },
  {
    id: 'finance',
    name: 'Finances, Risk & Loss',
    icon: TrendingDown,
    scenarios: [
      {
        label: "I'm agonizing over a potential loss far more intensely than I'd celebrate an equivalent gain.",
        trap: "Loss Aversion",
        question: "Am I overreacting to the pain of losing? If I zoom out, is this minor loss actually threatening my overall wealth or survival?"
      },
      {
        label: "I'm refusing to sell something for an amount I would never actually pay to buy it today.",
        trap: "The Endowment Effect",
        question: "Am I overvaluing this simply because I own it? Would I be willing to pay this exact price to acquire it if I didn't currently possess it?"
      },
      {
        label: "I'm pouring more money and effort into a losing project just because I've already invested heavily.",
        trap: "The Sunk Cost Fallacy",
        question: "If I were stepping into this situation completely fresh today with no prior investment, would I rationally choose to make this commitment?"
      },
      {
        label: "I'm rushing to sell my winning investments but holding onto my losers to avoid admitting defeat.",
        trap: "The Disposition Effect",
        question: "If I were forced to hold only one of these investments for the exact next year, which one actually has the stronger future prospects?"
      },
      {
        label: "I'm obsessing over a tiny 1% chance of a bad thing happening as if it's highly likely.",
        trap: "The Possibility Effect",
        question: "Am I over-weighting a highly unlikely event—and willing to overpay to avoid it—just because the image of it is emotionally terrifying?"
      },
      {
        label: "I'm willing to pay an irrational premium to go from 95% safe to 100% safe.",
        trap: "The Certainty Effect",
        question: "Am I overpaying for the psychological comfort of 'zero risk' instead of rationally accepting a mathematically insignificant probability of failure?"
      },
      {
        label: "I'm viewing this single risky choice in total isolation instead of looking at my overall portfolio.",
        trap: "Narrow Framing",
        question: "If I adopt a broad risk policy ('you win a few, you lose a few') and look at 100 similar choices, does this single gamble still look so intimidating?"
      },
      {
        label: "I'm terrified by a '1 in 1000' statistic but feel fine when told it's a '0.1%' chance.",
        trap: "Denominator Neglect",
        question: "Am I letting a vivid mental image of the numerator blind me to the massive size of the denominator?"
      },
      {
        label: "I feel forced to choose an aggressive, risky gamble because my other option is a guaranteed loss.",
        trap: "Risk-Seeking in the Domain of Losses",
        question: "Am I throwing good money after bad by taking a reckless gamble just to avoid the emotional pain of locking in a sure loss?"
      },
      {
        label: "I am clinging to the current state of affairs purely because change feels dangerous.",
        trap: "Defending the Status Quo",
        question: "Am I falsely equating 'maintaining the current baseline' with safety, ignoring the very real costs of stagnation?"
      }
    ]
  },
  {
    id: 'planning',
    name: 'Planning, Forecasting & The Past',
    icon: Clock,
    scenarios: [
      {
        label: "I'm assuming this project will go perfectly according to plan, ignoring historical realities.",
        trap: "The Planning Fallacy",
        question: "What is the true baseline prediction? If I take an 'outside view', how long did the last similar project actually take for other competent people?"
      },
      {
        label: "I'm explaining an exceptional recent success with a grand theory of cause and effect.",
        trap: "Regression to the Mean",
        question: "Have I mistaken a mathematically inevitable statistical regression (a return to the average after an extreme) for a causal phenomenon?"
      },
      {
        label: "I'm overestimating how much of this outcome is actually determined by my personal skill.",
        trap: "The Illusion of Control",
        question: "Have I hopelessly underestimated the determinative power of uncontrollable luck in achieving this outcome?"
      },
      {
        label: "I'm focusing entirely on my own company's strengths and ignoring what competitors will do.",
        trap: "Competition Neglect",
        question: "Am I acting as if I am the only active agent in this market, ignoring the skills and simultaneous actions of my capable rivals?"
      },
      {
        label: "I feel like I knew this unpredictable event was going to happen all along.",
        trap: "Hindsight Bias",
        question: "Did I actually predict this definitively beforehand, or does my mind simply make it look brilliantly inevitable after the fact?"
      },
      {
        label: "I'm judging the quality of my past decision based solely on how it turned out.",
        trap: "Outcome Bias",
        question: "Was my decision-making process logically sound based strictly on the information I had BEFORE the unpredictable outcome occurred?"
      },
      {
        label: "I'm constructing a flawless, simplistic story of how a company succeeded, ignoring their lucky breaks.",
        trap: "The Narrative Fallacy",
        question: "Am I ignoring the massive role of chance and 'nonevents' in order to build a neat, satisfying story about success?"
      },
      {
        label: "I'm overly confident in my prediction simply because I've successfully predicted a few things before.",
        trap: "Overconfidence & Optimistic Bias",
        question: "Would I be willing to conduct a 'premortem' right now—imagining this plan failed completely a year from now—to uncover my blind spots?"
      }
    ]
  },
  {
    id: 'emotion',
    name: 'Emotion, Value & Well-Being',
    icon: Heart,
    scenarios: [
      {
        label: "I'm letting my immediate 'gut feeling' dictate a complex logical or financial decision.",
        trap: "The Affect Heuristic",
        question: "Am I substituting an easy question ('Do I like it?') for the difficult question I should be answering ('What is the objective data?')?"
      },
      {
        label: "I'm judging a past experience entirely by its most intense moment and how it ended.",
        trap: "Peak-End Rule & Duration Neglect",
        question: "Am I allowing a short, intense ending to completely erase my memory of the total duration and average quality of the overall experience?"
      },
      {
        label: "I'm obsessing over one specific life change, certain it will guarantee lasting happiness.",
        trap: "The Focusing Illusion",
        question: "Am I suffering from miswanting? Have I forgotten that 'nothing in life is as important as I think it is when I am thinking about it'?"
      },
      {
        label: "I'm reacting differently to the exact same outcome because it's framed as a 'loss' instead of a 'cost'.",
        trap: "The Framing Effect",
        question: "If I mathematically frame this exact same outcome in the opposite terminology, does my emotional preference entirely reverse?"
      },
      {
        label: "I am convinced that making this change will bring me endless joy, but fail to account for how quickly I'll adapt.",
        trap: "Affective Forecasting Error",
        question: "Am I ignoring the fact of hedonic adaptation, forgetting that humans adjust to both new riches and new hardships incredibly quickly?"
      },
      {
        label: "My fear of making a mistake and kicking myself later is paralyzing my ability to choose.",
        trap: "Anticipated Regret",
        question: "Am I letting an asymmetric fear of regret force me into an irrational, overly defensive posture that harms my long-term interests?"
      },
      {
        label: "I'm treating a single piece of frightening news as a reason to panic about a large-scale catastrophe.",
        trap: "The Availability Cascade",
        question: "Is this threat actually statistically significant, or has the media simply created a self-sustaining chain of emotional anxiety?"
      },
      {
        label: "I would choose Option A when looking at it alone, but I'd choose Option B when looking at them side-by-side.",
        trap: "Preference Reversals (Joint vs. Single Evaluation)",
        question: "Am I letting a missing reference point in isolation dictate my preference? Which option holds up best under direct comparison?"
      }
    ]
  }
];

export default function App() {
  const [view, setView] = useState('categories'); // 'categories', 'scenarios', 'result'
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeScenario, setActiveScenario] = useState(null);

  const handleCategorySelect = (category: typeof APP_DATA[0]) => {
    setActiveCategory(category);
    setView('scenarios');
  };

  const handleScenarioSelect = (scenario: typeof APP_DATA[0]['scenarios'][0]) => {
    setActiveScenario(scenario);
    setView('result');
  };

  const reset = () => {
    setView('categories');
    setActiveCategory(null);
    setActiveScenario(null);
  };

  const back = () => {
    if (view === 'result') setView('scenarios');
    else if (view === 'scenarios') setView('categories');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-center p-6 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        {view !== 'categories' && (
          <button 
            onClick={back}
            className="absolute left-6 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
        )}
        <div className="flex items-center gap-3">
          <Brain className="text-rose-500" size={28} />
          <h1 className="text-xl font-medium tracking-tight text-white">System 2 Switch</h1>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-2xl mx-auto p-6 overflow-hidden">
        <AnimatePresence mode="wait">
          
          {/* LEVEL 1: CATEGORIES */}
          {view === 'categories' && (
            <motion.div 
              key="categories"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 pt-4"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl font-semibold tracking-tight mb-3 text-white">Engage the Brakes</h2>
                <p className="text-slate-400">Select the domain where you are about to make a decision or pass a judgment.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {APP_DATA.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat)}
                      className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-900 border border-slate-800 rounded-2xl hover:bg-slate-800 hover:border-slate-700 active:scale-95 transition-all outline-none focus:ring-2 focus:ring-rose-500"
                    >
                      <Icon size={40} className="text-rose-400 mb-2" />
                      <span className="text-lg font-medium text-center">{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* LEVEL 2: SCENARIOS */}
          {view === 'scenarios' && activeCategory && (
            <motion.div 
              key="scenarios"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 pt-4"
            >
              <div className="mb-8">
                <span className="text-rose-500 text-sm font-semibold tracking-wider uppercase mb-1 block">Step 2: Identify</span>
                <h2 className="text-2xl font-semibold tracking-tight text-white mb-2">{activeCategory.name}</h2>
                <p className="text-slate-400">Which of these specific thoughts best matches your current intuition?</p>
              </div>
              {activeCategory.scenarios.map((scenario: typeof APP_DATA[0]['scenarios'][0], idx: number) => (
                <button
                  key={idx}
                  onClick={() => handleScenarioSelect(scenario)}
                  className="w-full text-left p-5 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 hover:border-slate-700 active:scale-95 transition-all outline-none focus:ring-2 focus:ring-rose-500 flex items-start gap-4 group"
                >
                  <AlertTriangle className="text-amber-500/50 group-hover:text-amber-400 shrink-0 mt-0.5" size={20} />
                  <span className="text-[17px] leading-snug text-slate-200">{scenario.label}</span>
                </button>
              ))}
            </motion.div>
          )}

          {/* LEVEL 3: RESULT CARD */}
          {view === 'result' && activeScenario && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
              className="pt-6"
            >
              <div className="bg-slate-900 border border-slate-700/50 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
                {/* Decorative background blast */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-600 to-orange-500" />
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-rose-500/10 blur-3xl rounded-full" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 text-rose-400 text-sm font-semibold tracking-wider uppercase mb-6">
                    <Target size={16} />
                    Cognitive Trap Detected
                  </div>
                  
                  <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter text-white mb-8 leading-tight">
                    {activeScenario.trap}
                  </h2>

                  <div className="bg-slate-950 rounded-2xl p-6 sm:p-8 border border-slate-800 mb-8 border-l-4 border-l-rose-500">
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="text-rose-500" size={24} />
                      <h3 className="text-xl font-medium text-slate-100">System 2 Override</h3>
                    </div>
                    <p className="text-xl lg:text-2xl text-slate-300 font-medium leading-relaxed">
                      "{activeScenario.question}"
                    </p>
                  </div>

                  <button
                    onClick={reset}
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-slate-100 text-slate-950 rounded-xl font-semibold text-lg hover:bg-white active:scale-95 transition-all outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    <RefreshCcw size={20} />
                    Process Complete: Start Over
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
