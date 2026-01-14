
import React, { useState } from 'react';
import { MaterialIcon } from '../constants';

interface Unit {
  id: string;
  plate: string;
  operator: string;
  status: string;
  icon: string;
  fuel: string;
  battery: string;
}

const Units: React.FC = () => {
  const [units, setUnits] = useState<Unit[]>([
    { id: "402", plate: "T-7892-B", operator: "Juan Pérez", status: "Disponible", icon: "bus_alert", fuel: "85%", battery: "OK" },
    { id: "115", plate: "P-4431-C", operator: "Maria Garcia", status: "En Operación", icon: "airport_shuttle", fuel: "42%", battery: "OK" },
    { id: "082", plate: "X-1122-A", operator: "Taller Central", status: "Mantenimiento", icon: "build", fuel: "10%", battery: "REPLACE" },
    { id: "305", plate: "M-9908-D", operator: "Carlos Ruíz", status: "Disponible", icon: "commute", fuel: "98%", battery: "OK" },
    { id: "221", plate: "L-1109-F", operator: "Elena Torres", status: "Disponible", icon: "directions_bus", fuel: "60%", battery: "OK" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    plate: '',
    status: 'Disponible'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id || !formData.plate) return;

    const newUnit: Unit = {
      ...formData,
      operator: "Sin Asignar",
      icon: "directions_bus",
      fuel: "100%",
      battery: "OK"
    };

    setUnits([newUnit, ...units]);
    setIsModalOpen(false);
    setFormData({ id: '', plate: '', status: 'Disponible' });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Inventario de Unidades</h2>
          <p className="text-slate-500 text-sm">Monitoreo técnico de activos y disponibilidad de flota.</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <MaterialIcon name="download" className="text-xl" />
            Exportar CSV
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-puebla-maroon text-white rounded-xl text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-puebla-maroon/20"
          >
            <MaterialIcon name="add" className="text-xl" />
            Registrar Unidad
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">No. de unidad</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Placas</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Operador Asignado</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Estado Técnico</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {units.map((unit) => (
              <tr key={unit.id} className="hover:bg-slate-50/50 transition-colors group animate-in slide-in-from-left-4 duration-300">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <MaterialIcon name={unit.icon} />
                    </div>
                    <span className="font-bold text-slate-800">#{unit.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-slate-700 text-sm">{unit.plate}</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-600">{unit.operator}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 w-fit rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      unit.status === 'Disponible' ? 'bg-green-50 text-status-success' : 
                      unit.status === 'En Operación' ? 'bg-blue-50 text-primary' : 'bg-red-50 text-puebla-maroon'
                    }`}>
                      {unit.status}
                    </span>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1 opacity-60">
                        <MaterialIcon name="local_gas_station" className="text-[10px]" />
                        <span className="text-[10px] font-bold">{unit.fuel}</span>
                      </div>
                      <div className="flex items-center gap-1 opacity-60">
                        <MaterialIcon name="battery_charging_full" className="text-[10px]" />
                        <span className="text-[10px] font-bold">{unit.battery}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button title="Detalles" className="size-8 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-primary transition-all flex items-center justify-center">
                      <MaterialIcon name="visibility" className="text-lg" />
                    </button>
                    <button title="Servicio" className="size-8 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-puebla-maroon transition-all flex items-center justify-center">
                      <MaterialIcon name="build" className="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
           <p className="text-xs text-slate-500 font-medium">Gestión de activos generales</p>
           <div className="flex gap-1">
             <button className="size-8 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-100"><MaterialIcon name="chevron_left" /></button>
             <button className="size-8 rounded-md bg-primary text-white flex items-center justify-center text-xs font-bold">1</button>
             <button className="size-8 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-100"><MaterialIcon name="chevron_right" /></button>
           </div>
        </div>
      </div>

      {/* Modal de Registro */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-primary p-6 text-white flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Registrar Nueva Unidad</h3>
                <p className="text-white/60 text-xs mt-1">Ingrese los datos técnicos del activo</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="size-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <MaterialIcon name="close" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">No. de unidad</label>
                <div className="relative">
                  <MaterialIcon name="pin" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                  <input 
                    required
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    placeholder="Ej. 501" 
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Placas</label>
                <div className="relative">
                  <MaterialIcon name="tag" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                  <input 
                    required
                    name="plate"
                    value={formData.plate}
                    onChange={handleInputChange}
                    placeholder="Ej. ABC-123-X" 
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Estado Inicial</label>
                <div className="relative">
                  <MaterialIcon name="settings_input_component" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
                  >
                    <option value="Disponible">Disponible</option>
                    <option value="En Operación">En Operación</option>
                    <option value="Mantenimiento">Mantenimiento</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-puebla-maroon text-white font-bold rounded-xl hover:brightness-110 shadow-lg shadow-puebla-maroon/20 transition-all flex items-center justify-center gap-2"
                >
                  <MaterialIcon name="check_circle" className="text-lg" />
                  Confirmar Alta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Units;
