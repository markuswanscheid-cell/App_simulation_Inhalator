
import React, { useState } from 'react';
import { Database, Plus, Calendar, ShieldCheck, AlertTriangle, Edit3, X } from 'lucide-react';

export const CartridgeManager: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [cartridge, setCartridge] = useState({
    manufacturer: 'AL Pharma',
    productName: 'Salbutamol AL 100',
    maxPuffs: 200,
    currentPuffs: 128,
    expiryDate: '23.05.2027',
    startDate: '15.02.2026'
  });

  const percentage = Math.round((cartridge.currentPuffs / cartridge.maxPuffs) * 100);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Kartuschen-Verwaltung</h2>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-sky-500 text-white p-2 rounded-xl shadow-lg shadow-sky-100 active:scale-90 transition-transform"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Visual Cartridge Rendering */}
      <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-sky-500"></div>
        
        <div className="flex flex-col items-center space-y-4 mb-6">
          <div className="relative w-24 h-40 bg-gray-100 rounded-t-3xl rounded-b-xl border-4 border-gray-200 flex flex-col-reverse overflow-hidden">
             <div 
               className="bg-gradient-to-t from-sky-400 to-sky-500 transition-all duration-1000 w-full"
               style={{ height: `${percentage}%` }}
             ></div>
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-xl font-black text-gray-700 opacity-20">{percentage}%</span>
             </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-gray-800">{cartridge.productName}</h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{cartridge.manufacturer}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-2xl p-4">
            <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Status</p>
            <div className="flex items-center justify-center space-x-1 text-emerald-500">
              <ShieldCheck size={16} />
              <span className="text-sm font-bold">Aktiv</span>
            </div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4">
            <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Verbleibend</p>
            <span className="text-sm font-bold text-gray-700">{cartridge.currentPuffs} Hübe</span>
          </div>
        </div>
      </section>

      {/* Details List */}
      <section className="space-y-3">
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-sky-50 rounded-xl text-sky-500">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Haltbarkeit</p>
              <p className="text-sm font-semibold text-gray-700">{cartridge.expiryDate}</p>
            </div>
          </div>
          <Edit3 size={16} className="text-gray-300" />
        </div>

        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-50 rounded-xl text-amber-500">
              <Database size={18} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Start-Datum</p>
              <p className="text-sm font-semibold text-gray-700">{cartridge.startDate}</p>
            </div>
          </div>
          <Edit3 size={16} className="text-gray-300" />
        </div>
      </section>

      {/* Warning Box */}
      <section className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-start space-x-3">
        <AlertTriangle size={24} className="text-amber-500 shrink-0" />
        <div>
          <h5 className="text-sm font-bold text-amber-800">Hinweis zum Wechsel</h5>
          <p className="text-[11px] text-amber-700 leading-relaxed mt-1">
            Basierend auf Ihrem aktuellen Nutzungsverhalten wird diese Kartusche voraussichtlich in 14 Tagen leer sein. Denken Sie an die rechtzeitige Vorbestellung.
          </p>
        </div>
      </section>

      {/* Add Medication Modal Simulation */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end justify-center z-50 animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-md rounded-t-[3rem] p-8 space-y-6 shadow-2xl animate-in slide-in-from-bottom-full duration-500">
              <div className="flex justify-between items-center">
                 <h3 className="text-2xl font-bold text-gray-800">Neues Medikament</h3>
                 <button onClick={() => setShowAddModal(false)} className="p-2 bg-gray-100 rounded-full text-gray-400">
                   <X size={20} />
                 </button>
              </div>

              <div className="space-y-4">
                 <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-2 mb-1 block">Wirkstoff / Name</label>
                    <input type="text" placeholder="z.B. Salbutamol" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-semibold focus:ring-2 focus:ring-sky-500" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-2 mb-1 block">Max. Hübe</label>
                        <input type="number" placeholder="200" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-semibold focus:ring-2 focus:ring-sky-500" />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-2 mb-1 block">Haltbarkeit</label>
                        <input type="date" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-semibold focus:ring-2 focus:ring-sky-500" />
                    </div>
                 </div>
                 <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-2 mb-1 block">Hersteller</label>
                    <input type="text" placeholder="Pharma AG" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-semibold focus:ring-2 focus:ring-sky-500" />
                 </div>
              </div>

              <button 
                onClick={() => setShowAddModal(false)}
                className="w-full bg-sky-500 text-white py-4 rounded-3xl font-bold text-lg shadow-lg shadow-sky-100 active:scale-95 transition-all"
              >
                Kartusche registrieren
              </button>
              <div className="h-6"></div>
           </div>
        </div>
      )}

    </div>
  );
};
