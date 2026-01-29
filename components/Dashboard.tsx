
import React from 'react';
import { 
  Droplet, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  RefreshCw,
  Activity,
  Battery,
  AlertTriangle
} from 'lucide-react';
import { Screen, ConnectionStatus } from '../types';

interface DashboardProps {
  onNavigate: (screen: Screen) => void;
  batteryLevel: number;
  connection: ConnectionStatus;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, batteryLevel, connection }) => {
  const cartridgePercent = 64;
  const remainingPuffs = 128;
  const lastInhalation = {
    date: 'Heute',
    time: '08:15',
    status: 'success'
  };

  const getBatteryClass = (level: number) => {
    if (level > 50) return 'text-green-500 bg-green-50';
    if (level > 20) return 'text-yellow-500 bg-yellow-50';
    return 'text-red-500 bg-red-50';
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Hero Welcome */}
      <section className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Hallo, Christian!</h2>
          <p className="text-sm text-gray-500">Ihre Atemwege sind heute stabil.</p>
        </div>
        {/* Device Battery Indicator */}
        <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-2xl border border-gray-100 shadow-sm ${getBatteryClass(batteryLevel).split(' ')[1]}`}>
          <Battery size={16} className={getBatteryClass(batteryLevel).split(' ')[0]} />
          <span className={`text-xs font-bold ${getBatteryClass(batteryLevel).split(' ')[0]}`}>{batteryLevel}%</span>
        </div>
      </section>

      {/* Systemhinweise (System Notifications) */}
      <section className="bg-red-50 rounded-3xl p-5 border border-red-100 flex items-start space-x-4 animate-in fade-in slide-in-from-top-2 duration-700">
        <div className="p-2 bg-red-100 rounded-xl text-red-600 shrink-0">
          <AlertTriangle size={20} className="animate-pulse" />
        </div>
        <div>
          <h4 className="font-bold text-red-800 text-sm">Systemhinweis</h4>
          <p className="text-[11px] text-red-700 leading-relaxed mt-0.5 font-medium">
            Der Akkuzustand Ihres Inhalators liegt bei kritischen {batteryLevel}%. Bitte schließen Sie das Gerät an ein Ladegerät an.
          </p>
        </div>
      </section>

      {/* Main Status Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
        
        <div className="relative z-10 flex justify-between items-start mb-6">
          <div>
            <span className="text-xs font-bold text-sky-500 uppercase tracking-wider">Letzte Anwendung</span>
            <div className="flex items-center mt-1 space-x-2">
              <Clock size={16} className="text-gray-400" />
              <span className="text-lg font-semibold text-gray-700">{lastInhalation.date}, {lastInhalation.time} Uhr</span>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full flex items-center space-x-1 ${lastInhalation.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {lastInhalation.status === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
            <span className="text-[10px] font-bold uppercase">{lastInhalation.status === 'success' ? 'Korrekt' : 'Fehler'}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 relative z-10">
          <div className="bg-slate-50 p-4 rounded-2xl flex items-center space-x-3">
            <div className="p-2 bg-sky-500 rounded-xl text-white">
              <Droplet size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Kartusche</p>
              <p className="text-sm font-bold text-gray-700">{cartridgePercent}%</p>
            </div>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl flex items-center space-x-3">
            <div className="p-2 bg-emerald-500 rounded-xl text-white">
              <RefreshCw size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Rest-Hübe</p>
              <p className="text-sm font-bold text-gray-700">{remainingPuffs}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cartridge Progress Card */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800">Inhalator-Füllstand</h3>
          <span className="text-xs text-gray-400 font-medium">Salbutamol AL 100</span>
        </div>
        
        <div className="w-full bg-gray-100 h-3 rounded-full mb-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-sky-400 to-sky-600 transition-all duration-1000"
            style={{ width: `${cartridgePercent}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
          <span>Leer</span>
          <span>{remainingPuffs} Hübe verbleibend</span>
          <span>Voll</span>
        </div>

        {cartridgePercent < 15 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center space-x-2 text-red-600">
            <AlertCircle size={18} />
            <p className="text-xs font-semibold">Niedriger Füllstand! Bald wechseln.</p>
          </div>
        )}
      </section>

      {/* Quick Actions Grid */}
      <section className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => onNavigate('stats')}
          className="bg-sky-500 text-white rounded-3xl p-5 flex flex-col items-center justify-center space-y-2 hover:bg-sky-600 transition-colors shadow-lg shadow-sky-100"
        >
          <TrendingUp size={28} />
          <span className="text-xs font-bold">Statistiken</span>
        </button>
        <button 
          onClick={() => onNavigate('help')}
          className="bg-white border border-gray-100 rounded-3xl p-5 flex flex-col items-center justify-center space-y-2 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <Activity size={28} className="text-sky-500" />
          <span className="text-xs font-bold text-gray-700">Inhalationshilfe</span>
        </button>
      </section>

      {/* Tips Section */}
      <section className="bg-emerald-50 rounded-3xl p-5 border border-emerald-100">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-1.5 bg-emerald-100 rounded-lg text-emerald-600">
            <CheckCircle2 size={16} />
          </div>
          <h4 className="font-bold text-emerald-800 text-sm">Gesundheitstipp</h4>
        </div>
        <p className="text-xs text-emerald-700 leading-relaxed">
          Sie haben heute alle Inhalationen perfekt ausgeführt. Behalten Sie diese Tiefe bei, um die beste Medikamentenaufnahme zu gewährleisten.
        </p>
      </section>

    </div>
  );
};
