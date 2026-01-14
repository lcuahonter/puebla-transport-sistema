
import React, { useState, useEffect } from 'react';
import { MaterialIcon } from '../constants';

interface FleetUnit {
  id: string;
  x: number;
  y: number;
  status: 'ACTIVO' | 'EN RUTA' | 'TALLER' | 'ALERTA';
  operator: string;
}

const Dashboard: React.FC = () => {
  const [fleetLocations, setFleetLocations] = useState<FleetUnit[]>([
    { id: "452", x: 48, y: 52, status: 'ACTIVO', operator: 'Juan Perez' },
    { id: "109", x: 55, y: 38, status: 'EN RUTA', operator: 'Maria Garcia' },
    { id: "883", x: 72, y: 65, status: 'TALLER', operator: 'Roberto Gomez' },
    { id: "204", x: 30, y: 45, status: 'ACTIVO', operator: 'Carmen Sanchez' },
    { id: "115", x: 52, y: 55, status: 'ALERTA', operator: 'Elena Torres' },
    { id: "305", x: 65, y: 35, status: 'EN RUTA', operator: 'Carlos Ruiz' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFleetLocations(prev => prev.map(unit => ({
        ...unit,
        x: unit.status !== 'TALLER' ? unit.x + (Math.random() * 0.1 - 0.05) : unit.x,
        y: unit.status !== 'TALLER' ? unit.y + (Math.random() * 0.1 - 0.05) : unit.y,
      })));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "Unidades Totales", value: "1,240", change: "+2.4%", trending: "up", icon: "directions_bus", color: "text-blue-600 bg-blue-50" },
    { label: "Operadores Activos", value: "956", change: "+1.2%", trending: "up", icon: "badge", color: "text-green-600 bg-green-50" },
    { label: "En Mantenimiento", value: "42", change: "-5%", trending: "down", icon: "build", color: "text-puebla-maroon bg-red-50" },
    { label: "Eficiencia de Flota", value: "94%", status: "Excelente", icon: "speed", color: "text-puebla-gold bg-yellow-50" },
  ];

  const liveStatus = [
    { id: 1, name: "Juan Perez Jimenez", details: "Unidad #452 • Centro Histórico", status: "ACTIVO", time: "2m", color: "text-status-success bg-status-success/10", icon: "bus_alert" },
    { id: 2, name: "Maria Garcia Lopez", details: "Unidad #109 • Vía Atlixcáyotl", status: "EN RUTA", time: "5m", color: "text-primary bg-primary/10", icon: "route" },
    { id: 3, name: "Roberto Gomez Ortiz", details: "Unidad #883 • Taller Central (Estadio)", status: "TALLER", time: "12m", color: "text-puebla-maroon bg-puebla-maroon/10", icon: "build" },
    { id: 4, name: "Lucia Fernandez Ruiz", details: "Unidad #221 • CAPU", status: "INACTIVO", time: "1h", color: "text-slate-500 bg-slate-100", icon: "person" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVO': return 'bg-status-success';
      case 'EN RUTA': return 'bg-primary';
      case 'TALLER': return 'bg-puebla-gold';
      case 'ALERTA': return 'bg-puebla-maroon';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`size-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                <MaterialIcon name={stat.icon} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.trending === 'up' ? 'text-status-success' : 'text-puebla-maroon'}`}>
                {stat.change || stat.status}
                <MaterialIcon name={stat.trending === 'up' ? 'trending_up' : 'trending_down'} className="text-sm" />
              </div>
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Real Google Maps Style Fleet Map */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-800">Localización en Tiempo Real</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Mapa Integrado • Zona Metropolitana Puebla</p>
              </div>
              <div className="flex gap-2">
                 <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="Buscar dirección en Puebla..." 
                      className="text-xs bg-slate-50 border-slate-200 rounded-lg pl-8 pr-4 py-1.5 focus:ring-1 focus:ring-primary/20 transition-all w-60"
                    />
                    <MaterialIcon name="search" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                 </div>
              </div>
            </div>
            
            <div className="aspect-[16/9] bg-[#f1f3f4] relative overflow-hidden group cursor-grab active:cursor-grabbing">
              {/* GIS Map Layer Emulation */}
              <div className="absolute inset-0 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
                  {/* Land Background */}
                  <rect width="1000" height="600" fill="#f1f3f4" />
                  
                  {/* Green Areas (Parks) */}
                  <path d="M450,480 L480,470 L520,500 L500,530 Z" fill="#e6f4ea" /> {/* Paseo Bravo approx */}
                  <path d="M100,200 L150,180 L180,220 L130,240 Z" fill="#e6f4ea" /> {/* Cerro de la Paz approx */}
                  <path d="M700,50 L850,30 L900,100 L750,120 Z" fill="#e6f4ea" /> {/* Zona de Los Fuertes */}
                  
                  {/* Water (Atoyac River approx) */}
                  <path d="M0,500 Q150,480 300,520 T600,450 T1000,550" fill="none" stroke="#d1eaff" strokeWidth="12" />
                  
                  {/* Main Roads (Highways) */}
                  <path d="M0,100 L1000,60" fill="none" stroke="#ffffff" strokeWidth="8" /> {/* Autopista Mex-Pue */}
                  <path d="M10,600 Q200,550 400,450 T800,100" fill="none" stroke="#ffffff" strokeWidth="6" /> {/* Periferico */}
                  
                  {/* Street Grid (Traza urbana de Puebla) */}
                  <g stroke="#ffffff" strokeWidth="2.5">
                    {/* Horizontal streets */}
                    <line x1="300" y1="400" x2="700" y2="400" />
                    <line x1="300" y1="420" x2="700" y2="420" />
                    <line x1="300" y1="440" x2="700" y2="440" />
                    <line x1="300" y1="460" x2="700" y2="460" />
                    <line x1="300" y1="480" x2="700" y2="480" />
                    <line x1="300" y1="500" x2="700" y2="500" />
                    
                    {/* Vertical streets */}
                    <line x1="400" y1="350" x2="400" y2="550" />
                    <line x1="425" y1="350" x2="425" y2="550" />
                    <line x1="450" y1="350" x2="450" y2="550" />
                    <line x1="475" y1="350" x2="475" y2="550" />
                    <line x1="500" y1="350" x2="500" y2="550" />
                    <line x1="525" y1="350" x2="525" y2="550" />
                  </g>
                  
                  {/* Arterial Roads */}
                  <path d="M500,0 L500,600" fill="none" stroke="#ffffff" strokeWidth="5" /> {/* 11 Norte-Sur approx */}
                  <path d="M0,500 L1000,500" fill="none" stroke="#ffffff" strokeWidth="5" /> {/* 31 Poniente approx */}
                </svg>
              </div>

              {/* Google Maps UI Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <div className="bg-white p-1 rounded-md shadow-md flex flex-col border border-slate-200">
                  <button className="size-8 flex items-center justify-center hover:bg-slate-50 transition-colors border-b border-slate-100">
                    <MaterialIcon name="layers" className="text-slate-600 text-lg" />
                  </button>
                  <button className="size-8 flex items-center justify-center hover:bg-slate-50 transition-colors">
                    <MaterialIcon name="my_location" className="text-blue-500 text-lg" />
                  </button>
                </div>
              </div>

              <div className="absolute bottom-10 right-4 flex flex-col gap-2">
                 <div className="bg-white rounded-md shadow-md flex flex-col border border-slate-200 overflow-hidden">
                  <button className="size-9 flex items-center justify-center hover:bg-slate-50 transition-colors border-b border-slate-100 text-slate-600">
                    <MaterialIcon name="add" className="text-xl" />
                  </button>
                  <button className="size-9 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-600">
                    <MaterialIcon name="remove" className="text-xl" />
                  </button>
                </div>
                <button className="size-9 bg-white rounded-md shadow-md flex items-center justify-center border border-slate-200 hover:bg-slate-50 transition-all">
                  <img src="https://maps.gstatic.com/tactile/pegman_v3/default/run_24.png" alt="Pegman" className="h-6" />
                </button>
              </div>

              {/* Map Info Overlay */}
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5 pointer-events-none">
                 <div className="bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[8px] font-medium text-slate-500 shadow-sm border border-slate-200">
                   Datos del mapa ©2024 Google, INEGI
                 </div>
                 <div className="bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[8px] font-medium text-slate-500 shadow-sm border border-slate-200">
                   Términos de uso
                 </div>
              </div>

              {/* Landmark POIs */}
              <div className="absolute top-[50%] left-[49.5%] flex flex-col items-center pointer-events-none">
                 <MaterialIcon name="location_on" className="text-puebla-maroon text-base mb-1" fill />
                 <span className="text-[7px] font-bold text-slate-600 bg-white/60 px-1 rounded shadow-sm">Catedral de Puebla</span>
              </div>
              <div className="absolute top-[18%] left-[78%] flex flex-col items-center pointer-events-none opacity-40">
                 <MaterialIcon name="stadium" className="text-blue-400 text-xs mb-1" />
                 <span className="text-[7px] font-bold text-slate-500 bg-white/40 px-1 rounded">Estadio C.</span>
              </div>

              {/* Fleet Markers */}
              {fleetLocations.map((unit) => (
                <div 
                  key={unit.id}
                  className="absolute transition-all duration-1000 ease-in-out group/marker z-20"
                  style={{ left: `${unit.x}%`, top: `${unit.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  {/* Ping Animation for active units */}
                  {(unit.status === 'ACTIVO' || unit.status === 'EN RUTA') && (
                    <span className={`absolute inset-0 rounded-full animate-ping opacity-30 ${getStatusColor(unit.status)}`}></span>
                  )}
                  
                  {/* Marker Pin - Modern Google Maps Circle Style */}
                  <div className={`relative size-5 rounded-full border-2 border-white shadow-md cursor-pointer transition-transform hover:scale-110 flex items-center justify-center text-white ${getStatusColor(unit.status)}`}>
                    <MaterialIcon name="directions_bus" className="text-[10px]" fill />
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 bg-white border border-slate-200 rounded-xl overflow-hidden opacity-0 group-hover/marker:opacity-100 transition-all pointer-events-none shadow-xl z-30 scale-90 group-hover/marker:scale-100 origin-bottom">
                      <div className={`h-1 ${getStatusColor(unit.status)}`}></div>
                      <div className="p-2">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-bold text-slate-800">Unidad #{unit.id}</span>
                          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${unit.status === 'ALERTA' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'}`}>
                            {unit.status}
                          </span>
                        </div>
                        <p className="text-[9px] text-slate-500 mt-1 truncate">{unit.operator}</p>
                        <div className="mt-2 flex items-center justify-between pt-1 border-t border-slate-50">
                          <span className="text-[7px] font-bold text-primary">MAPS LIVE</span>
                          <span className="text-[7px] text-slate-400">Ver historial</span>
                        </div>
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                    </div>
                  </div>
                  <span className="absolute top-6 left-1/2 -translate-x-1/2 text-[8px] font-bold text-slate-500 whitespace-nowrap bg-white/90 px-1.5 py-0.5 rounded-full shadow-sm border border-slate-100">#{unit.id}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-status-success"></div>
                  <span className="text-xs font-bold text-slate-600">Disponibles</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-primary"></div>
                  <span className="text-xs font-bold text-slate-600">En Ruta</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-puebla-maroon"></div>
                  <span className="text-xs font-bold text-slate-600">Incidencias</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-medium text-slate-400">
                <div className="flex items-center gap-1">
                  <MaterialIcon name="update" className="text-xs" />
                  <span>Actualizado: Justo ahora</span>
                </div>
                <div className="h-3 w-px bg-slate-200"></div>
                <span>19.0413° N, 98.2062° W</span>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-6">
            <div className="bg-primary text-white p-6 rounded-2xl shadow-lg relative overflow-hidden group">
              <MaterialIcon name="auto_graph" className="absolute -right-4 -bottom-4 text-9xl text-white/5 rotate-12" />
              <h4 className="font-bold text-lg mb-2">Análisis de Flota</h4>
              <p className="text-white/70 text-sm mb-4">El flujo de transporte en Puebla Centro muestra una mejora del 15% hoy.</p>
              <button className="bg-puebla-gold text-white px-4 py-2 rounded-xl text-xs font-bold hover:brightness-110 transition-all">Explorar Datos</button>
            </div>
            <div className="bg-puebla-maroon text-white p-6 rounded-2xl shadow-lg relative overflow-hidden group">
              <MaterialIcon name="security" className="absolute -right-4 -bottom-4 text-9xl text-white/5 -rotate-12" />
              <h4 className="font-bold text-lg mb-2">Seguridad Vial</h4>
              <p className="text-white/70 text-sm mb-4">Protocolos de monitoreo activos para la zona de Angelópolis.</p>
              <button className="bg-white/20 text-white border border-white/30 px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/30 transition-all">Protocolos</button>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Movimientos Recientes</h3>
              <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-blue-50 text-primary text-[10px] font-bold uppercase tracking-wider">
                <MaterialIcon name="sync" className="text-[10px] animate-spin" /> Live Sync
              </span>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto max-h-[600px] hide-scrollbar">
              {liveStatus.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-50 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="size-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <MaterialIcon name={item.icon} className="text-xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">{item.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium truncate">{item.details}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className={`px-2 py-0.5 rounded-md text-[9px] font-bold mb-1 ${item.color}`}>
                      {item.status}
                    </div>
                    <p className="text-[9px] text-slate-400 font-medium">{item.time}</p>
                  </div>
                </div>
              ))}
              <button className="w-full py-3 text-xs font-bold text-slate-400 hover:text-primary transition-colors border-t border-dashed border-slate-100 mt-2">
                Cargar más actividad
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
