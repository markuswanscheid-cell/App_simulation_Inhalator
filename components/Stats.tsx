
import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { Calendar, Filter, Download } from 'lucide-react';
import { MOCK_HISTORY_DAY, MOCK_HISTORY_WEEK, MOCK_HISTORY_MONTH, COLORS } from '../constants';

export const Stats: React.FC = () => {
  const [range, setRange] = useState<'day' | 'week' | 'month'>('week');

  const chartData = useMemo(() => {
    switch(range) {
      case 'day': return MOCK_HISTORY_DAY;
      case 'month': return MOCK_HISTORY_MONTH;
      default: return MOCK_HISTORY_WEEK;
    }
  }, [range]);

  const pieData = useMemo(() => {
    if (range === 'day') return [{ name: 'Korrekt', value: 100, color: COLORS.success }, { name: 'Fehler', value: 0, color: COLORS.danger }];
    if (range === 'month') return [{ name: 'Korrekt', value: 92, color: COLORS.success }, { name: 'Fehler', value: 8, color: COLORS.danger }];
    return [{ name: 'Korrekt', value: 85, color: COLORS.success }, { name: 'Fehler', value: 15, color: COLORS.danger }];
  }, [range]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Statistiken & Analyse</h2>
        <div className="flex space-x-2">
           <button className="p-2 bg-white border border-gray-100 rounded-xl text-gray-500 hover:text-sky-500 transition-colors shadow-sm">
             <Download size={18} />
           </button>
        </div>
      </div>

      {/* Toggle Range */}
      <div className="flex bg-gray-100 p-1 rounded-2xl">
        {(['day', 'week', 'month'] as const).map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-300 capitalize ${
              range === r ? 'bg-white text-sky-500 shadow-sm' : 'text-gray-400'
            }`}
          >
            {r === 'day' ? 'Tag' : r === 'week' ? 'Woche' : 'Monat'}
          </button>
        ))}
      </div>

      {/* Usage Frequency Chart */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-6">
          <Calendar size={18} className="text-sky-500" />
          <h3 className="font-bold text-gray-800">Inhalationen ({range === 'day' ? 'Stunden' : range === 'week' ? 'Tage' : 'Wochen'})</h3>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
              <YAxis hide />
              <Tooltip 
                cursor={{fill: '#f8fafc'}}
                contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
              />
              <Bar name="Anzahl" dataKey="count" fill={COLORS.primary} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Quality Trend Chart */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-6">
          <Filter size={18} className="text-emerald-500" />
          <h3 className="font-bold text-gray-800">Qualitätsverlauf (%)</h3>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
              <YAxis domain={[0, 100]} hide />
              <Tooltip 
                contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
              />
              <Line 
                name="Qualität"
                type="monotone" 
                dataKey="quality" 
                stroke={COLORS.success} 
                strokeWidth={3} 
                dot={{fill: COLORS.success, strokeWidth: 2, r: 4}} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Pie Analysis */}
      <div className="grid grid-cols-1 gap-6">
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center">
          <div className="w-1/2 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-1/2 space-y-3">
            <h4 className="font-bold text-gray-800">Technik-Check</h4>
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}}></div>
                <span className="text-xs font-semibold text-gray-500">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </section>
      </div>

    </div>
  );
};
