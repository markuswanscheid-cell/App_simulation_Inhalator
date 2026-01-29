
export type Screen = 'dashboard' | 'stats' | 'cartridge' | 'help' | 'settings' | 'update' | 'export';

export enum ConnectionStatus {
  CONNECTED = 'Verbunden',
  SYNCING = 'Synchronisiert',
  DISCONNECTED = 'Keine Verbindung'
}

export interface InhalationRecord {
  timestamp: string;
  status: 'success' | 'failed';
  quality: number; // 0-100
}

export interface CartridgeInfo {
  manufacturer: string;
  productName: string;
  maxPuffs: number;
  currentPuffs: number;
  expiryDate: string;
  startDate: string;
}
