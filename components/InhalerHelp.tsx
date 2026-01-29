
import React, { useState } from 'react';
import { 
  Play, 
  Info, 
  ChevronRight, 
  Wind, 
  Zap, 
  ThumbsUp,
  AlertCircle,
  Clock,
  ArrowDown,
  ArrowUp,
  Droplets,
  RotateCcw,
  CheckCircle2,
  Activity
} from 'lucide-react';

// Schematic Illustration Components
const IllustrationExhale = () => (
  <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto text-sky-500">
    <circle cx="50" cy="40" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M50 55 C 50 55, 30 70, 30 90 M50 55 C 50 55, 70 70, 70 90" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M45 40 Q 50 45 55 40" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M65 40 Q 75 40 85 45" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
    <path d="M85 45 L 80 42 M 85 45 L 82 48" stroke="currentColor" strokeWidth="2" />
    <text x="70" y="35" className="text-[8px] font-bold fill-sky-600">AUSATMEN</text>
  </svg>
);

const IllustrationPosition = () => (
  <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto text-sky-500">
    <circle cx="45" cy="40" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
    <rect x="65" y="40" width="10" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M60 50 H 65" stroke="currentColor" strokeWidth="2" />
    <path d="M50 48 Q 55 50 60 50" stroke="currentColor" strokeWidth="2" strokeDasharray="2 1" />
    <text x="65" y="35" className="text-[8px] font-bold fill-sky-600">ANSETZEN</text>
  </svg>
);

const IllustrationInhale = () => (
  <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto text-sky-500">
    <circle cx="45" cy="40" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M45 55 C 45 55, 25 65, 20 90 M45 55 C 45 55, 65 65, 70 90" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.4" />
    <path d="M75 50 L 60 50" stroke="currentColor" strokeWidth="3">
       <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" />
    </path>
    <path d="M60 50 L 65 47 M 60 50 L 65 53" stroke="currentColor" strokeWidth="2" />
    <text x="65" y="35" className="text-[8px] font-bold fill-sky-600">EINATMEN</text>
  </svg>
);

const IllustrationHold = () => (
  <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto text-sky-500">
    <circle cx="50" cy="40" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="75" cy="25" r="12" fill="white" stroke="currentColor" strokeWidth="1" />
    <path d="M75 18 V 25 H 80" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <text x="68" y="45" className="text-[6px] font-bold fill-sky-600">5-10 SEK</text>
    <text x="40" y="70" className="text-[8px] font-bold fill-sky-600">HALTEN</text>
  </svg>
);

const IllustrationExhaleSlow = () => (
  <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto text-sky-500">
    <circle cx="50" cy="40" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M55 40 Q 65 35 75 40" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
    <path d="M75 40 L 71 37 M 75 40 L 72 43" stroke="currentColor" strokeWidth="2" />
    <text x="60" y="30" className="text-[8px] font-bold fill-sky-600">AUSATMEN</text>
  </svg>
);

export const InhalerHelp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'steps' | 'led' | 'care'>('steps');

  const trainingSteps = [
    { 
      title: 'Ausatmen', 
      desc: 'Zunächst vollständig und entspannt ausatmen, weg vom Gerät.', 
      illustration: <IllustrationExhale /> 
    },
    { 
      title: 'Ansetzen', 
      desc: 'Mundstück dicht mit den Lippen umschließen, Kopf leicht aufrecht.', 
      illustration: <IllustrationPosition /> 
    },
    { 
      title: 'Einatmen', 
      desc: 'Langsam und tief einatmen, während der Inhalator ausgelöst wird.', 
      illustration: <IllustrationInhale /> 
    },
    { 
      title: 'Atem anhalten', 
      desc: 'Den Atem für 5–10 Sekunden anhalten, damit das Medikament wirkt.', 
      illustration: <IllustrationHold /> 
    },
    { 
      title: 'Langsam ausatmen', 
      desc: 'Inhalator absetzen und kontrolliert durch den Mund ausatmen.', 
      illustration: <IllustrationExhaleSlow /> 
    },
  ];

  const ledSignals = [
    { 
      title: 'System- & Verbindungsstatus',
      items: [
        { animClass: 'bg-blue-500 animate-pulse-slow', label: 'Pulsierendes Blau (Langsam)', meaning: 'Gerät eingeschaltet, sucht Bluetooth-Verbindung.' },
        { animClass: 'bg-blue-600', label: 'Blau (2 Sek.)', meaning: 'Verbindung erfolgreich hergestellt. Betriebsbereit.' },
        { animClass: 'bg-slate-200 border border-slate-300', label: 'Aus', meaning: 'Verbunden und im Ruhezustand.' }
      ]
    },
    {
      title: 'Ergebnis-Feedback (Nach Messung)',
      items: [
        { animClass: 'animate-blink-green', label: '3x Blinken Grün', meaning: 'Gute Inhalation. Optimales therapeutisches Volumen.' },
        { animClass: 'animate-blink-red', label: '3x Blinken Rot', meaning: 'Nicht optimal. Volumen lag außerhalb des Bereichs.' }
      ]
    },
    {
      title: 'Wichtiger Warnhinweis',
      items: [
        { animClass: 'animate-alt-rg', label: 'Schnelles Blinken Rot/Grün', meaning: 'Systemhinweis. Bitte App für Details öffnen.' }
      ]
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      
      <h2 className="text-2xl font-bold text-gray-800">Hilfe & Training</h2>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {(['steps', 'led', 'care'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`flex-1 pb-3 text-sm font-bold transition-all ${
              activeTab === t ? 'text-sky-500 border-b-2 border-sky-500' : 'text-gray-400'
            }`}
          >
            {t === 'steps' ? 'Technik' : t === 'led' ? 'LED-Signale' : 'Gerätepflege'}
          </button>
        ))}
      </div>

      {activeTab === 'steps' && (
        <section className="space-y-6">
          <div className="p-4 bg-sky-50 rounded-3xl border border-sky-100 mb-2">
            <p className="text-xs text-sky-700 leading-relaxed font-medium">
              Folgen Sie dieser Anleitung für eine optimale Wirkstoffaufnahme. Eine korrekte Technik ist entscheidend für Ihren Therapieerfolg.
            </p>
          </div>
          {trainingSteps.map((step, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 flex items-center space-x-6 shadow-sm hover:border-sky-200 transition-all cursor-default group overflow-hidden">
              <div className="w-24 h-24 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100">
                {step.illustration}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="w-5 h-5 bg-sky-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h4 className="font-bold text-gray-800 text-sm">{step.title}</h4>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      {activeTab === 'led' && (
        <section className="space-y-6">
          <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100">
             <h3 className="text-sm font-bold text-gray-800 mb-2">LED-Signalübersicht</h3>
             <p className="text-xs text-gray-500 leading-relaxed">
               Die RGB-LED an der <span className="font-bold text-sky-600">Unterseite</span> des PulmoSmart Inhalators gibt visuelles Feedback zum Systemstatus.
             </p>
          </div>

          <div className="space-y-8">
            {ledSignals.map((group, gIdx) => (
              <div key={gIdx} className="space-y-4">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{group.title}</h4>
                <div className="space-y-3">
                  {group.items.map((item, iIdx) => (
                    <div key={iIdx} className="bg-white rounded-3xl p-4 border border-gray-100 flex items-center space-x-5 shadow-sm">
                      <div className="relative flex items-center justify-center shrink-0">
                         {/* Outer glow effect for active states */}
                         {item.animClass !== 'bg-slate-200 border border-slate-300' && (
                            <div className={`absolute w-10 h-10 rounded-full blur-xl opacity-30 ${item.animClass.split(' ')[0]}`}></div>
                         )}
                         <div className={`w-6 h-6 rounded-full ring-4 ring-white shadow-sm z-10 ${item.animClass}`}></div>
                      </div>
                      <div className="flex-1">
                         <h5 className="text-xs font-bold text-gray-800 mb-0.5">{item.label}</h5>
                         <p className="text-[11px] text-gray-500 leading-tight">{item.meaning}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'care' && (
        <section className="space-y-4">
           {/* Waterproof Feature */}
           <div className="bg-sky-50 rounded-3xl p-6 border border-sky-100 flex items-start space-x-4">
              <div className="p-3 bg-white rounded-2xl shadow-sm text-sky-500">
                <Droplets size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sky-800 text-sm">Wasserdichtes Design</h4>
                <p className="text-[11px] text-sky-700 mt-1 leading-relaxed">
                  Ihr PulmoSmart Inhalator ist nach IPX7 wasserdicht. Das Gehäuse kann unter fließendem Wasser gereinigt werden, um Rückstände zu entfernen.
                </p>
              </div>
           </div>
           
           {/* Replaceable Mouthpiece */}
           <div className="bg-white rounded-3xl p-6 border border-gray-100 flex items-start space-x-4 shadow-sm">
              <div className="p-3 bg-slate-50 rounded-2xl text-emerald-500">
                <RotateCcw size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm">Austauschbares Mundstück</h4>
                <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                  Für maximale Hygiene kann das Mundstück einfach abgezogen und durch ein neues ersetzt werden. Wir empfehlen einen Wechsel alle 3 Monate.
                </p>
              </div>
           </div>

           {/* General Care List */}
           <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h4 className="font-bold text-gray-800 text-sm mb-4 flex items-center space-x-2">
                <CheckCircle2 size={18} className="text-emerald-500" />
                <span>Wartungs-Checkliste</span>
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3 text-[11px] text-gray-500">
                   <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0"></div>
                   <span>Wöchentlich: Mundstück mit warmem Wasser abspülen und an der Luft trocknen lassen.</span>
                </li>
                <li className="flex items-start space-x-3 text-[11px] text-gray-500">
                   <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0"></div>
                   <span>Monatlich: Kontakte an der Kartuschen-Aufnahme mit einem trockenen Tuch reinigen.</span>
                </li>
                <li className="flex items-start space-x-3 text-[11px] text-gray-500">
                   <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0"></div>
                   <span>Das Gerät ist wasserfest und darf gewaschen werden.</span>
                </li>
                <li className="flex items-start space-x-3 text-[11px] text-gray-500">
                   <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0"></div>
                   <span>Keine aggressiven Reinigungsmittel oder Alkohol verwenden.</span>
                </li>
              </ul>
           </div>

           <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 flex items-start space-x-4">
              <AlertCircle className="text-amber-500 mt-1" size={20} />
              <div>
                <h4 className="font-bold text-amber-800 text-sm">Wichtiger Hinweis</h4>
                <p className="text-[11px] text-amber-700 mt-1 leading-relaxed">
                  Stellen Sie sicher, dass das Gerät vollständig trocken ist, bevor Sie eine neue Kartusche einsetzen.
                </p>
              </div>
           </div>
        </section>
      )}
    </div>
  );
};
