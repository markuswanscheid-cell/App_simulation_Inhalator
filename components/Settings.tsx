
import React, { useState } from 'react';
import { 
  Bluetooth, 
  RefreshCw, 
  FileText, 
  Shield, 
  Cpu, 
  ChevronRight, 
  LogOut,
  Download,
  CheckCircle2,
  HardDrive,
  Calendar,
  X
} from 'lucide-react';
import { Screen } from '../types';

interface SettingsProps {
  onNavigate: (s: Screen) => void;
}

export const Settings: React.FC<SettingsProps> = ({ onNavigate }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  const handleExport = (period: string) => {
    setSelectedPeriod(period);
    setShowExportOptions(false);
    setIsExporting(true);
    // Simulate generation delay
    setTimeout(() => {
      // Logic for actual export would happen here
    }, 3000);
  };

  const handleUpdateCheck = () => {
    setIsUpdating(true);
    setTimeout(() => setIsUpdating(false), 2500);
  };

  const exportPeriods = [
    { label: 'Letzte 7 Tage', value: '7d' },
    { label: 'Letzte 30 Tage', value: '30d' },
    { label: 'Letztes Quartal', value: '90d' },
    { label: 'Gesamte Historie', value: 'all' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 pb-10">
      
      <div className="flex flex-col items-center py-6">
        <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center text-sky-500 mb-4 border-4 border-white shadow-md">
          <Shield size={36} />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Christian Schmidt</h2>
        <p className="text-xs text-gray-400 font-bold uppercase mt-1">Patienten-ID: 8821-AS</p>
      </div>

      {/* Connectivity & Device */}
      <section className="space-y-3">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Gerät & Verbindung</h3>
        
        <SettingItem 
          icon={<Bluetooth size={18} className="text-sky-500" />} 
          label="Bluetooth Verwaltung" 
          value="Verbunden" 
        />
        <SettingItem 
          icon={<RefreshCw size={18} className="text-emerald-500" />} 
          label="Synchronisierung" 
          value="Vor 5 Min" 
        />
        <button 
          onClick={handleUpdateCheck}
          className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm active:scale-95 transition-all"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-slate-50 rounded-xl">
              <Cpu size={18} className="text-purple-500" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-gray-800">Firmware Update</p>
              <p className="text-[10px] text-gray-400">Version 2.4.1 (AeroCore)</p>
            </div>
          </div>
          {isUpdating ? <RefreshCw className="animate-spin text-sky-500" size={18} /> : <ChevronRight size={18} className="text-gray-300" />}
        </button>
      </section>

      {/* Reports & Data */}
      <section className="space-y-3">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Daten & Berichte</h3>
        
        <button 
          onClick={() => setShowExportOptions(true)}
          className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm active:scale-95 transition-all"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-50 rounded-xl">
              <FileText size={18} className="text-red-500" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-gray-800">Arzt-Export (PDF)</p>
              <p className="text-[10px] text-gray-400">Zeitraum wählen & erstellen</p>
            </div>
          </div>
          <Download size={18} className="text-gray-300" />
        </button>

        <SettingItem 
          icon={<HardDrive size={18} className="text-amber-500" />} 
          label="Datensicherung" 
          value="Auto: Ein" 
        />
      </section>

      {/* Export Period Selection Modal - Now Centered */}
      {showExportOptions && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[110] animate-in fade-in duration-300 p-6">
          <div className="bg-white w-full max-w-[340px] rounded-[2.5rem] p-8 space-y-6 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-400">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800 tracking-tight">Zeitraum wählen</h3>
              <button onClick={() => setShowExportOptions(false)} className="p-2 bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                <X size={18} />
              </button>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Wählen Sie den gewünschten Zeitraum für Ihren PDF-Bericht aus.
            </p>
            <div className="space-y-2">
              {exportPeriods.map((period) => (
                <button
                  key={period.value}
                  onClick={() => handleExport(period.label)}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-sky-50 rounded-2xl border border-transparent hover:border-sky-100 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <Calendar size={16} className="text-gray-400 group-hover:text-sky-500" />
                    <span className="text-sm font-bold text-gray-700">{period.label}</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-sky-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Export Simulation Overlay */}
      {isExporting && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-[120] p-6">
          <div className="bg-white rounded-3xl p-8 w-full max-w-xs text-center space-y-4 animate-in zoom-in-95 duration-200 shadow-2xl">
             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-500 mx-auto">
                {selectedPeriod ? <CheckCircle2 size={32} /> : <RefreshCw size={32} className="animate-spin text-sky-500" />}
             </div>
             <h4 className="text-lg font-bold text-gray-800">{selectedPeriod ? 'Bericht erstellt' : 'Generiere Bericht...'}</h4>
             <p className="text-xs text-gray-500 leading-relaxed">
               {selectedPeriod 
                 ? `Der medizinische Bericht für den Zeitraum "${selectedPeriod}" wurde erfolgreich generiert und ist bereit zum Teilen.`
                 : 'Ihre Daten werden analysiert und in ein PDF-Format umgewandelt. Bitte warten...'}
             </p>
             {selectedPeriod && (
               <button 
                onClick={() => {
                  setIsExporting(false);
                  setSelectedPeriod(null);
                }} 
                className="w-full bg-sky-500 text-white py-3 rounded-2xl font-bold shadow-lg shadow-sky-100"
               >
                 Fertig
               </button>
             )}
          </div>
        </div>
      )}

      <button className="w-full py-4 mt-4 text-red-500 font-bold flex items-center justify-center space-x-2">
        <LogOut size={18} />
        <span>Abmelden</span>
      </button>

      <div className="text-center opacity-30 text-[10px] font-black uppercase tracking-[0.2em] mt-8 px-4 flex flex-col space-y-1">
        <div>Designt for Medizingerätedesign</div>
        <div>Gruppe 5 WS 25/26</div>
      </div>

    </div>
  );
};

const SettingItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ 
  icon, label, value 
}) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-slate-50 rounded-xl">
        {icon}
      </div>
      <p className="text-sm font-bold text-gray-800">{label}</p>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-xs font-semibold text-gray-400">{value}</span>
      <ChevronRight size={18} className="text-gray-200" />
    </div>
  </div>
);
