
import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Settings as SettingsIcon, 
  LayoutDashboard, 
  Database, 
  HelpCircle,
  Bluetooth,
  Battery,
  Wifi,
  ChevronLeft,
  Bell,
  Info,
  CheckCircle2
} from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { Stats } from './components/Stats';
import { CartridgeManager } from './components/CartridgeManager';
import { InhalerHelp } from './components/InhalerHelp';
import { Settings } from './components/Settings';
import { Screen, ConnectionStatus } from './types';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [connection, setConnection] = useState<ConnectionStatus>(ConnectionStatus.CONNECTED);
  const [batteryLevel, setBatteryLevel] = useState(15);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  
  // Reference to the scrollable main container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to top whenever the screen changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [currentScreen]);

  // Simulate periodic background "sync"
  useEffect(() => {
    const interval = setInterval(() => {
      setIsSyncing(true);
      setTimeout(() => setIsSyncing(false), 2000);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-500';
    if (level > 20) return 'text-yellow-500';
    return 'text-red-500';
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard 
          onNavigate={(s) => setCurrentScreen(s)} 
          batteryLevel={batteryLevel} 
          connection={connection}
        />;
      case 'stats':
        return <Stats />;
      case 'cartridge':
        return <CartridgeManager />;
      case 'help':
        return <InhalerHelp />;
      case 'settings':
        return <Settings onNavigate={(s) => setCurrentScreen(s)} />;
      default:
        return <Dashboard 
          onNavigate={(s) => setCurrentScreen(s)} 
          batteryLevel={batteryLevel} 
          connection={connection}
        />;
    }
  };

  return (
    <div className="flex justify-center bg-gray-200 min-h-screen">
      {/* Mobile Mockup Frame */}
      <div className="w-full max-w-md bg-white shadow-2xl overflow-hidden flex flex-col relative h-[844px]">
        
        {/* Disclaimer Overlay */}
        {showDisclaimer && (
          <div className="absolute inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-[2.5rem] p-8 w-full shadow-2xl space-y-6 animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
              <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-500 mx-auto">
                <Info size={32} />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-black text-gray-800 tracking-tight">Demonstrations-App</h2>
                <div className="h-1 w-12 bg-sky-500 mx-auto rounded-full"></div>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed text-center">
                Diese App dient ausschließlich zu <span className="font-bold text-gray-700">Demonstrationszwecken</span> und besitzt keine echte medizinische Funktionalität.
              </p>
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest text-center mb-1">Projektarbeit</p>
                <p className="text-xs text-gray-600 text-center font-medium leading-snug">
                  Fach: Medizingerätedesign<br />
                  WS 25/26 | Gruppe 5
                </p>
              </div>
              <button 
                onClick={() => setShowDisclaimer(false)}
                className="w-full bg-sky-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-sky-200 active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                <span>App starten</span>
                <CheckCircle2 size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Top Status Bar (Simulated Phone Status) - Fixed at the top */}
        <div className="bg-white px-6 py-2 flex justify-between items-center text-xs font-semibold text-gray-500 border-b border-gray-100 shrink-0 z-10">
          <span>10:42 AM</span>
          <div className="flex items-center space-x-2">
            <Wifi size={14} />
            <div className="flex items-center space-x-1">
              <span className={getBatteryColor(batteryLevel)}>{batteryLevel}%</span>
              <Battery size={14} className={getBatteryColor(batteryLevel)} />
            </div>
          </div>
        </div>

        {/* App Header - Fixed at the top */}
        <header className="bg-white px-6 py-4 flex justify-between items-center shrink-0 border-b border-gray-50/50 z-10">
          <div className="flex items-center space-x-2">
            {currentScreen !== 'dashboard' && (
              <button 
                onClick={() => setCurrentScreen('dashboard')}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors mr-1"
              >
                <ChevronLeft size={24} className="text-gray-600" />
              </button>
            )}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white font-bold">P</div>
              <h1 className="text-xl font-bold text-gray-800 tracking-tight">PulmoSmart</h1>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 px-2 py-1 bg-gray-50 rounded-full border border-gray-100">
              <Bluetooth size={14} className={isSyncing ? "text-sky-500 animate-pulse" : "text-sky-500"} />
              <span className="text-[10px] text-gray-500 font-medium">
                {isSyncing ? 'Sync...' : connection}
              </span>
            </div>
            <button className="relative">
               <Bell size={20} className="text-gray-400" />
               <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Main Content Area - This is the scrollable part */}
        <main 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-6 py-4 bg-slate-50/50 scroll-smooth"
        >
          {renderScreen()}
        </main>

        {/* Navigation Bar - Anchored at the bottom, never disappears */}
        <nav className="bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center shrink-0 z-10">
          <NavItem 
            isActive={currentScreen === 'dashboard'} 
            onClick={() => setCurrentScreen('dashboard')} 
            icon={<LayoutDashboard size={24} />} 
            label="Home" 
          />
          <NavItem 
            isActive={currentScreen === 'stats'} 
            onClick={() => setCurrentScreen('stats')} 
            icon={<Activity size={24} />} 
            label="Statistiken" 
          />
          <NavItem 
            isActive={currentScreen === 'cartridge'} 
            onClick={() => setCurrentScreen('cartridge')} 
            icon={<Database size={24} />} 
            label="Kartusche" 
          />
          <NavItem 
            isActive={currentScreen === 'help'} 
            onClick={() => setCurrentScreen('help')} 
            icon={<HelpCircle size={24} />} 
            label="Hilfe" 
          />
          <NavItem 
            isActive={currentScreen === 'settings'} 
            onClick={() => setCurrentScreen('settings')} 
            icon={<SettingsIcon size={24} />} 
            label="Profil" 
          />
        </nav>
      </div>
    </div>
  );
};

const NavItem: React.FC<{ isActive: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ 
  isActive, onClick, icon, label 
}) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center space-y-1 transition-all duration-300 ${isActive ? 'text-sky-500 scale-110' : 'text-gray-400 hover:text-gray-600'}`}
  >
    {icon}
    <span className="text-[10px] font-bold">{label}</span>
  </button>
);

export default App;
