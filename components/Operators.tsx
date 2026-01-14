
import React, { useState, useMemo } from 'react';
import { MaterialIcon } from '../constants';

type FilterType = 'todos' | 'activos' | 'sin_unidad' | 'vencidos';

interface Operator {
  id: string;
  name: string;
  unit: string;
  license: string;
  licenseExp: string;
  status: string;
  photo: string;
}

const Operators: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [operators, setOperators] = useState<Operator[]>([
    { id: "OP-98234-P", name: "Juan Pérez Jiménez", unit: "Ruta 25 • U-012", license: "A", licenseExp: "22/10/2026", status: "active", photo: "https://i.pravatar.cc/150?u=juan" },
    { id: "OP-11235-S", name: "Maria Garcia Lopez", unit: "Sin Asignar", license: "B", licenseExp: "15/05/2024", status: "away", photo: "https://i.pravatar.cc/150?u=maria" },
    { id: "OP-56781-M", name: "Roberto Gomez Ortiz", unit: "Ruta 10 • U-088", license: "A", licenseExp: "01/01/2024", status: "offline", photo: "https://i.pravatar.cc/150?u=roberto" },
    { id: "OP-44321-L", name: "Carmen Sánchez Vega", unit: "Ruta V • U-204", license: "B", licenseExp: "12/12/2025", status: "active", photo: "https://i.pravatar.cc/150?u=carmen" },
    { id: "OP-33219-K", name: "Luis Morales Sosa", unit: "Ruta 4 • U-102", license: "A", licenseExp: "09/08/2025", status: "active", photo: "https://i.pravatar.cc/150?u=luis" },
    { id: "OP-22110-J", name: "Elena Torres Marín", unit: "Sin Asignar", license: "B", licenseExp: "20/03/2026", status: "away", photo: "https://i.pravatar.cc/150?u=elena" },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    license: 'A',
    licenseExp: ''
  });

  const filteredOperators = useMemo(() => {
    return operators.filter((op) => {
      const matchesSearch = 
        op.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        op.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        op.unit.toLowerCase().includes(searchQuery.toLowerCase());

      const isExpired = new Date(op.licenseExp.split('/').reverse().join('-')) < new Date();
      
      let matchesFilter = true;
      if (activeFilter === 'activos') matchesFilter = op.status === 'active';
      if (activeFilter === 'sin_unidad') matchesFilter = op.unit === 'Sin Asignar';
      if (activeFilter === 'vencidos') matchesFilter = isExpired;

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter, operators]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.employeeId || !formData.licenseExp) return;

    // Format date for display
    const dateParts = formData.licenseExp.split('-');
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

    const newOperator: Operator = {
      id: `OP-${formData.employeeId}-N`,
      name: formData.name,
      unit: "Sin Asignar",
      license: formData.license,
      licenseExp: formattedDate,
      status: "away",
      photo: `https://i.pravatar.cc/150?u=${formData.employeeId}`
    };

    setOperators([newOperator, ...operators]);
    setIsModalOpen(false);
    setFormData({ name: '', employeeId: '', license: 'A', licenseExp: '' });
  };

  const filterOptions: { id: FilterType; label: string; icon?: string }[] = [
    { id: 'todos', label: 'Todos' },
    { id: 'activos', label: 'Activos' },
    { id: 'sin_unidad', label: 'Sin Unidad' },
    { id: 'vencidos', label: 'Licencia Vencida' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Search & Actions Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 max-w-md relative">
          <MaterialIcon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, ID o unidad..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveFilter(option.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeFilter === option.id 
                    ? 'bg-white text-primary shadow-sm ring-1 ring-slate-200' 
                    : 'text-slate-500 hover:text-primary'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20"
          >
            <MaterialIcon name="person_add" className="text-xl" />
            Nuevo Operador
          </button>
        </div>
      </div>

      {/* Grid View */}
      {filteredOperators.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOperators.map((op) => {
            const isExpired = new Date(op.licenseExp.split('/').reverse().join('-')) < new Date();
            return (
              <div key={op.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:border-primary/30 transition-all group">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      <img src={op.photo} alt={op.name} className="size-16 rounded-2xl object-cover shadow-md" />
                      <div className={`absolute -bottom-1 -right-1 size-5 rounded-full border-4 border-white ${
                        op.status === 'active' ? 'bg-status-success' : op.status === 'away' ? 'bg-puebla-gold' : 'bg-slate-300'
                      }`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors truncate">{op.name}</h3>
                      <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-tight">{op.id}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md text-[10px] font-bold">LIC: {op.license}</span>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          isExpired 
                            ? 'bg-red-50 text-puebla-maroon animate-pulse' 
                            : 'bg-green-50 text-status-success'
                        }`}>EXP: {op.licenseExp}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Asignación</p>
                      <p className={`text-sm font-bold mt-0.5 ${op.unit === 'Sin Asignar' ? 'text-slate-300' : 'text-slate-700'}`}>
                        {op.unit}
                      </p>
                    </div>
                    <div className="flex justify-end items-end gap-2">
                      <button className="size-8 rounded-lg bg-slate-100 text-slate-400 hover:bg-primary hover:text-white transition-all flex items-center justify-center">
                        <MaterialIcon name="mail" className="text-lg" />
                      </button>
                      <button className="size-8 rounded-lg bg-slate-100 text-slate-400 hover:bg-primary hover:text-white transition-all flex items-center justify-center">
                        <MaterialIcon name="edit" className="text-lg" />
                      </button>
                      <button className="size-8 rounded-lg bg-slate-100 text-slate-400 hover:bg-puebla-maroon hover:text-white transition-all flex items-center justify-center">
                        <MaterialIcon name="more_vert" className="text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 flex flex-col items-center text-center">
          <div className="size-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
            <MaterialIcon name="person_off" className="text-5xl" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No se encontraron operadores</h3>
          <p className="text-slate-500 text-sm max-w-xs mt-2">Intenta ajustar los criterios de búsqueda o los filtros aplicados.</p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveFilter('todos'); }}
            className="mt-6 text-primary font-bold text-sm hover:underline"
          >
            Limpiar todos los filtros
          </button>
        </div>
      )}

      {/* Modal de Registro de Operador */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-primary p-6 text-white flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Nuevo Operador</h3>
                <p className="text-white/60 text-xs mt-1">Registrar nuevo personal en el sistema</p>
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
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Nombre Completo</label>
                <div className="relative">
                  <MaterialIcon name="person" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                  <input 
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ej. Roberto Sánchez" 
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">ID de Empleado</label>
                <div className="relative">
                  <MaterialIcon name="badge" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                  <input 
                    required
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    placeholder="Ej. 55678" 
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tipo de Licencia</label>
                  <div className="relative">
                    <MaterialIcon name="card_membership" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                    <select 
                      name="license"
                      value={formData.license}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
                    >
                      <option value="A">Clase A</option>
                      <option value="B">Clase B</option>
                      <option value="C">Clase C</option>
                      <option value="D">Clase D</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Vencimiento</label>
                  <div className="relative">
                    <MaterialIcon name="event" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                    <input 
                      required
                      type="date"
                      name="licenseExp"
                      value={formData.licenseExp}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
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
                  className="flex-1 py-3 bg-puebla-gold text-white font-bold rounded-xl hover:brightness-110 shadow-lg shadow-puebla-gold/20 transition-all flex items-center justify-center gap-2"
                >
                  <MaterialIcon name="how_to_reg" className="text-lg" />
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Operators;
