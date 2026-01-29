
import React, { useState, useEffect } from 'react';
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
  Bell
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
        
        {/* Top Status Bar (Simulated Phone Status) */}
        <div className="bg-white px-6 py-2 flex justify-between items-center text-xs font-semibold text-gray-500 border-b border-gray-100">
          <span>10:42 AM</span>
          <div className="flex items-center space-x-2">
            <Wifi size={14} />
            <div className="flex items-center space-x-1">
              <span className={getBatteryColor(batteryLevel)}>{batteryLevel}%</span>
              <Battery size={14} className={getBatteryColor(batteryLevel)} />
            </div>
          </div>
        </div>

        {/* App Header */}
        <header className="bg-white px-6 py-4 flex justify-between items-center">
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

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto px-6 py-4 bg-slate-50/50">
          {renderScreen()}
        </main>

        {/* Navigation Bar */}
        <nav className="bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center">
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
