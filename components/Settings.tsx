
import React from 'react';
import { MaterialIcon } from '../constants';

const Settings: React.FC = () => {
  const settingsGroups = [
    {
      title: "Cuenta",
      items: [
        { label: "Perfil", icon: "person", color: "text-blue-500" },
        { label: "Seguridad", icon: "security", color: "text-green-500" },
        { label: "Notificaciones", icon: "notifications", color: "text-puebla-gold" },
      ]
    },
    {
      title: "Preferencias",
      items: [
        { label: "Modo Oscuro", icon: "dark_mode", color: "text-slate-700", toggle: true },
        { label: "Idioma", icon: "language", color: "text-slate-700", value: "Español" },
      ]
    },
    {
      title: "Soporte",
      items: [
        { label: "Ayuda y Soporte", icon: "help", color: "text-slate-400" },
        { label: "Cerrar Sesión", icon: "logout", color: "text-puebla-maroon" },
      ]
    }
  ];

  return (
    <div className="pb-24 animate-in fade-in duration-500">
      <div className="bg-primary text-white p-8 flex flex-col items-center">
        <div className="size-24 rounded-full border-4 border-white/20 p-1 mb-4">
          <img src="https://picsum.photos/seed/admin/200" alt="Admin" className="size-full rounded-full object-cover" />
        </div>
        <h2 className="text-xl font-bold">Administrador Puebla</h2>
        <p className="text-white/60 text-sm">admin.transporte@puebla.gob.mx</p>
      </div>

      <div className="p-4 space-y-6">
        {settingsGroups.map((group, gIdx) => (
          <div key={gIdx}>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4 mb-3">{group.title}</h3>
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              {group.items.map((item, iIdx) => (
                <button key={iIdx} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b last:border-none border-slate-50">
                  <div className="flex items-center gap-3">
                    <MaterialIcon name={item.icon} className={item.color} />
                    <span className="text-slate-700 font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.value && <span className="text-xs text-slate-400 font-bold">{item.value}</span>}
                    {item.toggle && (
                      <div className="w-10 h-6 bg-slate-200 rounded-full relative">
                        <div className="absolute left-1 top-1 size-4 bg-white rounded-full shadow-sm"></div>
                      </div>
                    )}
                    {!item.toggle && <MaterialIcon name="chevron_right" className="text-slate-300" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center px-4 py-6">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Puebla Transport App v2.4.0</p>
        <p className="text-[10px] text-slate-300 mt-1">Hacer historia. Hacer futuro.</p>
      </div>
    </div>
  );
};

export default Settings;
