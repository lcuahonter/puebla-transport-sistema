
import React, { useState } from 'react';
import { MaterialIcon } from '../constants';

const Settings: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleProfileClick = () => {
    alert('📋 Perfil de Usuario\n\nNombre: Administrador Puebla\nRol: Administrador del Sistema\nEmail: admin.transporte@puebla.gob.mx\nDepartamento: Movilidad y Transporte');
  };

  const handleSecurityClick = () => {
    alert('🔒 Configuración de Seguridad\n\nOpciones:\n- Cambiar contraseña\n- Autenticación de dos factores\n- Sesiones activas\n- Registro de actividad');
  };

  const handleNotificationsClick = () => {
    alert('🔔 Preferencias de Notificaciones\n\n✅ Alertas de vehículos\n✅ Vencimiento de permisos\n✅ Inspecciones pendientes\n❌ Boletines informativos');
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    alert(darkMode ? '☀️ Modo claro activado' : '🌙 Modo oscuro activado');
  };

  const handleLanguageClick = () => {
    const languages = ['Español', 'English', 'Náhuatl'];
    const choice = prompt(`Seleccionar idioma:\n\n${languages.map((l, i) => `${i+1}. ${l}`).join('\n')}\n\nIngrese el número:`);
    if (choice && parseInt(choice) > 0 && parseInt(choice) <= languages.length) {
      alert(`Idioma cambiado a: ${languages[parseInt(choice) - 1]}`);
    }
  };

  const handleHelpClick = () => {
    alert('❓ Centro de Ayuda y Soporte\n\nOpciones disponibles:\n- Guía de usuario\n- Tutoriales en video\n- Preguntas frecuentes\n- Contactar soporte técnico\n\n📞 Tel: 222-777-0000\n📧 soporte@puebla.gob.mx');
  };

  const handleLogoutClick = () => {
    if (confirm('¿Está seguro que desea cerrar sesión?')) {
      alert('👋 Sesión cerrada exitosamente\n\nRedirigiendo al login...');
    }
  };

  const settingsGroups = [
    {
      title: "Cuenta",
      items: [
        { label: "Perfil", icon: "person", color: "text-blue-500", onClick: handleProfileClick },
        { label: "Seguridad", icon: "security", color: "text-green-500", onClick: handleSecurityClick },
        { label: "Notificaciones", icon: "notifications", color: "text-puebla-gold", onClick: handleNotificationsClick },
      ]
    },
    {
      title: "Preferencias",
      items: [
        { label: "Modo Oscuro", icon: "dark_mode", color: "text-slate-700", toggle: true, onClick: handleDarkModeToggle, value: darkMode },
        { label: "Idioma", icon: "language", color: "text-slate-700", value: "Español", onClick: handleLanguageClick },
      ]
    },
    {
      title: "Soporte",
      items: [
        { label: "Ayuda y Soporte", icon: "help", color: "text-slate-400", onClick: handleHelpClick },
        { label: "Cerrar Sesión", icon: "logout", color: "text-puebla-maroon", onClick: handleLogoutClick },
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
                <button 
                  key={iIdx} 
                  onClick={item.onClick}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b last:border-none border-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <MaterialIcon name={item.icon} className={item.color} />
                    <span className="text-slate-700 font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.value && !item.toggle && <span className="text-xs text-slate-400 font-bold">{item.value}</span>}
                    {item.toggle && (
                      <div className={`w-10 h-6 rounded-full relative transition-colors ${item.value ? 'bg-primary' : 'bg-slate-200'}`}>
                        <div className={`absolute top-1 size-4 bg-white rounded-full shadow-sm transition-transform ${item.value ? 'translate-x-5' : 'translate-x-1'}`}></div>
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
