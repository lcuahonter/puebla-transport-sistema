
import React from 'react';
import { TabType } from '../types';
import { PUEBLA_LOGO, MaterialIcon } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentTab, onTabChange }) => {
  const navItems: { id: TabType; label: string; icon: string }[] = [
    { id: 'inicio', label: 'Dashboard', icon: 'dashboard' },
    { id: 'personal', label: 'Operadores', icon: 'group' },
    { id: 'unidades', label: 'Unidades', icon: 'commute' },
    { id: 'asignar', label: 'Nueva Asignación', icon: 'add_task' },
    { id: 'ajustes', label: 'Configuración', icon: 'settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-display">
      {/* Sidebar - Desktop */}
      <aside className="w-64 bg-primary text-white flex flex-col shrink-0 shadow-2xl z-50">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="size-10 rounded-lg bg-white flex items-center justify-center p-1.5 shadow-lg">
            <img src={PUEBLA_LOGO} alt="Puebla" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="font-bold text-sm leading-tight">Gobierno de Puebla</h1>
            <p className="text-[10px] text-white/60 font-medium uppercase tracking-wider">Transporte Público</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                currentTab === item.id 
                  ? 'bg-puebla-gold text-white shadow-lg' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <MaterialIcon 
                name={item.icon} 
                className={currentTab === item.id ? 'text-white' : 'text-white/50 group-hover:text-white'} 
                fill={currentTab === item.id}
              />
              <span className="font-semibold text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="bg-white/5 rounded-2xl p-4">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Sistema v2.5</p>
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-puebla-maroon flex items-center justify-center text-[10px] font-bold">AD</div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold truncate">Administrador</p>
                <p className="text-[10px] text-white/50 truncate">admin@puebla.gob.mx</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-slate-800 capitalize">{currentTab}</h2>
            <div className="h-4 w-px bg-slate-200"></div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <MaterialIcon name="calendar_today" className="text-sm" />
              <span>{new Date().toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <MaterialIcon name="notifications" className="text-slate-400 cursor-pointer hover:text-primary transition-colors" />
              <span className="absolute -top-1 -right-1 size-3.5 bg-puebla-maroon border-2 border-white rounded-full"></span>
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">
              <span className="text-sm font-bold text-slate-700">Panel de Control</span>
              <MaterialIcon name="expand_more" className="text-slate-400" />
            </button>
          </div>
        </header>

        {/* Scrollable Body */}
        <main className="flex-1 overflow-y-auto p-8 hide-scrollbar">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
