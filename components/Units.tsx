
import React, { useState } from 'react';
import { MaterialIcon } from '../constants';
import { AdvertisingPermit } from '../types';

interface Unit {
  id: string;
  plate: string;
  operator: string;
  operatorId?: string;
  operatorLicense?: string;
  operatorLicenseExp?: string;
  status: string;
  icon: string;
  fuel: string;
  battery: string;
  retained?: boolean;
  retentionReason?: string;
  retentionDate?: string;
  hasAdvertising?: boolean;
  federalPermit?: boolean;
  lastInspection?: string;
}

const Units: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'advertising' | 'retained' | 'federal'>('inventory');
  const [units, setUnits] = useState<Unit[]>([
    { 
      id: "402", 
      plate: "T-7892-B", 
      operator: "Juan Pérez", 
      operatorId: "OP-98234-P",
      operatorLicense: "A",
      operatorLicenseExp: "2026-10-22",
      status: "Disponible", 
      icon: "bus_alert", 
      fuel: "85%", 
      battery: "OK",
      hasAdvertising: true,
      lastInspection: "2024-12-15"
    },
    { 
      id: "115", 
      plate: "P-4431-C", 
      operator: "Maria Garcia", 
      operatorId: "OP-11235-S",
      operatorLicense: "B",
      operatorLicenseExp: "2024-05-15",
      status: "En Operación", 
      icon: "airport_shuttle", 
      fuel: "42%", 
      battery: "OK",
      federalPermit: true,
      lastInspection: "2024-11-20"
    },
    { 
      id: "082", 
      plate: "X-1122-A", 
      operator: "Taller Central", 
      status: "Mantenimiento", 
      icon: "build", 
      fuel: "10%", 
      battery: "REPLACE",
      lastInspection: "2024-10-05"
    },
    { 
      id: "305", 
      plate: "M-9908-D", 
      operator: "Carlos Ruíz", 
      operatorId: "OP-56781-M",
      operatorLicense: "A",
      operatorLicenseExp: "2025-08-09",
      status: "Disponible", 
      icon: "commute", 
      fuel: "98%", 
      battery: "OK",
      lastInspection: "2024-12-01"
    },
    { 
      id: "221", 
      plate: "L-1109-F", 
      operator: "Elena Torres", 
      operatorId: "OP-33219-K",
      operatorLicense: "B",
      operatorLicenseExp: "2026-03-20",
      status: "Retenido", 
      icon: "directions_bus", 
      fuel: "60%", 
      battery: "OK",
      retained: true,
      retentionReason: "Documentación incompleta",
      retentionDate: "2025-01-10",
      lastInspection: "2024-09-15"
    },
  ]);

  const [advertisingPermits] = useState<AdvertisingPermit[]>([
    {
      id: 'ADV-001',
      vehicleId: '402',
      unitNumber: 'T-7892-B',
      company: 'Coca-Cola FEMSA',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      location: 'Exterior',
      status: 'Activo',
      approvalDocument: 'DOC-2025-001.pdf'
    },
    {
      id: 'ADV-002',
      vehicleId: '115',
      unitNumber: 'P-4431-C',
      company: 'Bimbo',
      startDate: '2024-06-01',
      endDate: '2025-05-31',
      location: 'Ambos',
      status: 'Activo',
      approvalDocument: 'DOC-2024-089.pdf'
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showReleaseModal, setShowReleaseModal] = useState(false);
  const [showAdvertisingModal, setShowAdvertisingModal] = useState(false);
  const [showFederalModal, setShowFederalModal] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  
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
      battery: "OK",
      lastInspection: new Date().toISOString().split('T')[0]
    };

    setUnits([newUnit, ...units]);
    setIsModalOpen(false);
    setFormData({ id: '', plate: '', status: 'Disponible' });
  };

  const handleReleaseVehicle = (unit: Unit) => {
    setUnits(units.map(u => 
      u.id === unit.id 
        ? { ...u, retained: false, retentionReason: undefined, retentionDate: undefined, status: 'Disponible' }
        : u
    ));
    setShowReleaseModal(false);
    setSelectedUnit(null);
  };

  const retainedUnits = units.filter(u => u.retained);
  const unitsWithAdvertising = units.filter(u => u.hasAdvertising);
  const federalPermitUnits = units.filter(u => u.federalPermit);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Control de Unidades</h2>
          <p className="text-slate-500 text-sm">Información actualizada de conductores y unidades para inspección</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowAdvertisingModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
          >
            <MaterialIcon name="campaign" className="text-xl" />
            Publicidad
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

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-800">
              <MaterialIcon name="directions_bus" fill />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{units.length}</p>
              <p className="text-xs text-slate-500">Total Unidades</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-red-100 text-red-800">
              <MaterialIcon name="block" fill />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{retainedUnits.length}</p>
              <p className="text-xs text-slate-500">Retenidas</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-purple-100 text-purple-800">
              <MaterialIcon name="campaign" fill />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{advertisingPermits.length}</p>
              <p className="text-xs text-slate-500">Con Publicidad</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-green-100 text-green-800">
              <MaterialIcon name="check_circle" fill />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{federalPermitUnits.length}</p>
              <p className="text-xs text-slate-500">Permisos Federales</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'inventory'
              ? 'text-primary border-b-2 border-primary'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Inventario General
        </button>
        <button
          onClick={() => setActiveTab('retained')}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'retained'
              ? 'text-primary border-b-2 border-primary'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Vehículos Retenidos ({retainedUnits.length})
        </button>
        <button
          onClick={() => setActiveTab('advertising')}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'advertising'
              ? 'text-primary border-b-2 border-primary'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Permisos de Publicidad
        </button>
        <button
          onClick={() => setActiveTab('federal')}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'federal'
              ? 'text-primary border-b-2 border-primary'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Permisos Federales
        </button>
      </div>

      {activeTab === 'inventory' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Unidad</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Placas</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Conductor</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Licencia</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Última Inspección</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Estado</th>
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
                      <div>
                        <span className="font-bold text-slate-800 block">#{unit.id}</span>
                        {unit.hasAdvertising && (
                          <span className="text-xs text-purple-600 flex items-center gap-1">
                            <MaterialIcon name="campaign" className="text-xs" />
                            Publicidad
                          </span>
                        )}
                        {unit.federalPermit && (
                          <span className="text-xs text-green-600 flex items-center gap-1">
                            <MaterialIcon name="verified" className="text-xs" />
                            Federal
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-700 text-sm">{unit.plate}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{unit.operator}</p>
                      {unit.operatorId && (
                        <p className="text-xs text-slate-500">{unit.operatorId}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {unit.operatorLicense && unit.operatorLicenseExp ? (
                      <div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-bold">
                          Tipo {unit.operatorLicense}
                        </span>
                        <p className="text-xs text-slate-500 mt-1">
                          Vence: {new Date(unit.operatorLicenseExp).toLocaleDateString('es-MX')}
                        </p>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">Sin operador</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {unit.lastInspection ? (
                      <span className="text-sm text-slate-600">
                        {new Date(unit.lastInspection).toLocaleDateString('es-MX')}
                      </span>
                    ) : (
                      <span className="text-xs text-red-500">Sin inspección</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 w-fit rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        unit.status === 'Disponible' ? 'bg-green-50 text-status-success' : 
                        unit.status === 'En Operación' ? 'bg-blue-50 text-primary' : 
                        unit.status === 'Retenido' ? 'bg-red-50 text-red-700' :
                        'bg-orange-50 text-puebla-maroon'
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
                      <button title="Ver información completa" className="size-8 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-primary transition-all flex items-center justify-center">
                        <MaterialIcon name="visibility" className="text-lg" />
                      </button>
                      {unit.retained && (
                        <button 
                          title="Liberar vehículo"
                          onClick={() => {
                            setSelectedUnit(unit);
                            setShowReleaseModal(true);
                          }}
                          className="size-8 rounded-lg bg-green-50 border border-green-200 text-green-700 hover:bg-green-100 transition-all flex items-center justify-center"
                        >
                          <MaterialIcon name="lock_open" className="text-lg" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-500 font-medium">Información actualizada para inspección</p>
          </div>
        </div>
      )}

      {activeTab === 'retained' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Vehículos Retenidos - Liberación Legal</h2>
          
          {retainedUnits.length > 0 ? (
            <div className="space-y-4">
              {retainedUnits.map((unit) => (
                <div key={unit.id} className="border border-red-200 bg-red-50 rounded-xl p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <MaterialIcon name="block" className="text-red-700 text-2xl" />
                        <div>
                          <h3 className="text-lg font-bold text-slate-800">Unidad #{unit.id} - {unit.plate}</h3>
                          <p className="text-sm text-slate-600">Conductor: {unit.operator}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                        <div>
                          <p className="text-slate-500">Motivo de Retención</p>
                          <p className="font-semibold text-slate-800">{unit.retentionReason}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Fecha de Retención</p>
                          <p className="font-semibold text-slate-800">
                            {unit.retentionDate ? new Date(unit.retentionDate).toLocaleDateString('es-MX') : 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        setSelectedUnit(unit);
                        setShowReleaseModal(true);
                      }}
                      className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold shadow-lg flex items-center gap-2"
                    >
                      <MaterialIcon name="lock_open" />
                      Liberar Vehículo
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              <MaterialIcon name="check_circle" className="text-6xl mb-4" />
              <p>No hay vehículos retenidos actualmente</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'advertising' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">Permisos de Publicidad en Unidades</h2>
            <button
              onClick={() => setShowAdvertisingModal(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-semibold flex items-center gap-2"
            >
              <MaterialIcon name="add" />
              Nuevo Permiso
            </button>
          </div>
          
          <div className="grid gap-4">
            {advertisingPermits.map((permit) => (
              <div key={permit.id} className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 rounded-lg bg-purple-100 text-purple-800">
                        <MaterialIcon name="campaign" className="text-2xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">{permit.company}</h3>
                        <p className="text-sm text-slate-600">Unidad: {permit.unitNumber}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        permit.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {permit.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm mt-4">
                      <div>
                        <p className="text-slate-500">Ubicación</p>
                        <p className="font-semibold text-slate-800">{permit.location}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Inicio</p>
                        <p className="font-semibold text-slate-800">
                          {new Date(permit.startDate).toLocaleDateString('es-MX')}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500">Vencimiento</p>
                        <p className="font-semibold text-slate-800">
                          {new Date(permit.endDate).toLocaleDateString('es-MX')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'federal' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">Permisos de Paso Federal (Autotransporte)</h2>
            <button
              onClick={() => setShowFederalModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold flex items-center gap-2"
            >
              <MaterialIcon name="add" />
              Validar Permiso Federal
            </button>
          </div>
          
          {federalPermitUnits.length > 0 ? (
            <div className="grid gap-4">
              {federalPermitUnits.map((unit) => (
                <div key={unit.id} className="border border-green-200 bg-green-50 rounded-xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-green-600 text-white">
                      <MaterialIcon name="verified" className="text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-800">Unidad #{unit.id} - {unit.plate}</h3>
                      <p className="text-sm text-slate-600">Conductor: {unit.operator}</p>
                      <p className="text-sm text-green-700 font-semibold mt-2">
                        ✓ Autorizado para circulación federal
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-semibold">
                      Ver Detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              <MaterialIcon name="info" className="text-6xl mb-4" />
              <p>No hay unidades con permisos federales registrados</p>
            </div>
          )}
        </div>
      )}

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

      {/* Modal de Liberación de Vehículo */}
      {showReleaseModal && selectedUnit && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-green-600 p-6 text-white flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Liberación de Vehículo Retenido</h3>
                <p className="text-white/80 text-sm mt-1">Unidad #{selectedUnit.id} - {selectedUnit.plate}</p>
              </div>
              <button 
                onClick={() => {
                  setShowReleaseModal(false);
                  setSelectedUnit(null);
                }}
                className="size-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <MaterialIcon name="close" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-slate-800 mb-2">Información de Retención</h4>
                <p className="text-sm text-slate-600">
                  <strong>Motivo:</strong> {selectedUnit.retentionReason}
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  <strong>Fecha:</strong> {selectedUnit.retentionDate ? new Date(selectedUnit.retentionDate).toLocaleDateString('es-MX') : 'N/A'}
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <MaterialIcon name="check_circle" className="text-green-700 text-2xl mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Requisitos Cumplidos</h4>
                    <ul className="space-y-1 text-sm text-slate-600">
                      <li className="flex items-center gap-2">
                        <MaterialIcon name="check" className="text-green-600 text-sm" />
                        Documentación completa
                      </li>
                      <li className="flex items-center gap-2">
                        <MaterialIcon name="check" className="text-green-600 text-sm" />
                        Pagos de multas realizados
                      </li>
                      <li className="flex items-center gap-2">
                        <MaterialIcon name="check" className="text-green-600 text-sm" />
                        Requisitos legales satisfechos
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  type="button"
                  onClick={() => {
                    setShowReleaseModal(false);
                    setSelectedUnit(null);
                  }}
                  className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => handleReleaseVehicle(selectedUnit)}
                  className="flex-1 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                >
                  <MaterialIcon name="lock_open" className="text-lg" />
                  Liberar Vehículo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Registro de Publicidad */}
      {showAdvertisingModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-purple-600 p-6 text-white flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Registrar Permiso de Publicidad</h3>
                <p className="text-white/80 text-sm mt-1">Autorización para publicidad en unidades</p>
              </div>
              <button 
                onClick={() => setShowAdvertisingModal(false)}
                className="size-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <MaterialIcon name="close" />
              </button>
            </div>
            
            <form className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Unidad *</label>
                  <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600/20">
                    <option value="">Seleccionar unidad...</option>
                    {units.map(u => (
                      <option key={u.id} value={u.id}>#{u.id} - {u.plate}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Empresa/Anunciante *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nombre de la empresa"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Ubicación *</label>
                  <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600/20">
                    <option value="Exterior">Exterior</option>
                    <option value="Interior">Interior</option>
                    <option value="Ambos">Ambos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Fecha de Inicio *</label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Fecha de Vencimiento *</label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Documento de Aprobación</label>
                  <input
                    type="file"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                    accept=".pdf,.jpg,.png"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button 
                  type="button"
                  onClick={() => setShowAdvertisingModal(false)}
                  className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-all flex items-center justify-center gap-2"
                >
                  <MaterialIcon name="check_circle" className="text-lg" />
                  Registrar Permiso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Permiso Federal */}
      {showFederalModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-green-600 p-6 text-white flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Validar Permiso de Paso Federal</h3>
                <p className="text-white/80 text-sm mt-1">Autorización para autotransporte federal</p>
              </div>
              <button 
                onClick={() => setShowFederalModal(false)}
                className="size-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <MaterialIcon name="close" />
              </button>
            </div>
            
            <form className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Unidad *</label>
                  <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600/20">
                    <option value="">Seleccionar unidad...</option>
                    {units.map(u => (
                      <option key={u.id} value={u.id}>#{u.id} - {u.plate}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Número de Permiso Federal *</label>
                  <input
                    type="text"
                    required
                    placeholder="SCT-XXX-XXXX"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de Servicio Federal *</label>
                  <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600/20">
                    <option value="Pasajeros">Pasajeros</option>
                    <option value="Turismo">Turismo</option>
                    <option value="Carga">Carga</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Fecha de Expedición *</label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Vigencia *</label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Documento de Autorización SCT</label>
                  <input
                    type="file"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600/20"
                    accept=".pdf"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button 
                  type="button"
                  onClick={() => setShowFederalModal(false)}
                  className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                >
                  <MaterialIcon name="verified" className="text-lg" />
                  Validar Permiso
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
