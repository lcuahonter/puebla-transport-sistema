import React, { useState } from 'react';
import { MaterialIcon } from '../constants';
import { VehicleInspection } from '../types';

const VehicleReview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'new' | 'schedule'>('list');
  const [searchTerm, setSearchTerm] = useState('');

  // Handlers
  const handleViewDetails = (inspection: VehicleInspection) => {
    const completion = calculateCompletionRate(inspection);
    alert(`📋 Detalles de Inspección\n\nUnidad: ${inspection.unitNumber}\nFecha: ${new Date(inspection.inspectionDate).toLocaleDateString('es-MX')}\nEstatus: ${inspection.status}\nCompletado: ${completion}%\n\nCondiciones:\n- Física: ${inspection.physicalCondition.length} items\n- Mecánica: ${inspection.mechanicalCondition.length} items\n- Accesibilidad: ${inspection.accessibility.length} items\n- Seguridad: ${inspection.safetyEquipment.length} items\n\nInspector: ${inspection.inspector}`);
  };

  const handlePrintInspection = (inspection: VehicleInspection) => {
    alert(`🖨️ Imprimiendo certificado de inspección\n\nUnidad: ${inspection.unitNumber}\nPlacas: ${inspection.plateNumber}\nEstatus: ${inspection.status}\nVálido hasta: ${new Date(inspection.nextInspectionDate).toLocaleDateString('es-MX')}`);
  };
  const [filterStatus, setFilterStatus] = useState<string>('Todos');

  // Mock data
  const [inspections] = useState<VehicleInspection[]>([
    {
      id: '1',
      vehicleId: 'VEH-001',
      unitNumber: 'UN-101',
      plateNumber: 'ABC-123-D',
      inspectionDate: '2024-01-15',
      nextInspectionDate: '2024-07-15',
      status: 'Aprobada',
      inspector: 'Ing. Carlos Ramírez',
      physicalCondition: {
        bodywork: true,
        paint: true,
        seats: true,
        windows: true,
        lights: true,
      },
      mechanicalCondition: {
        bodywork: true,
        paint: true,
        seats: true,
        windows: true,
        lights: true,
      },
      accessibility: {
        ramp: true,
        lowFloor: false,
        reservedSeats: true,
        signage: true,
      },
      safetyEquipment: {
        fireExtinguisher: true,
        firstAidKit: true,
        emergencyExits: true,
        seatBelts: true,
      },
      observations: 'Vehículo en excelentes condiciones',
    },
    {
      id: '2',
      vehicleId: 'VEH-002',
      unitNumber: 'UN-202',
      plateNumber: 'XYZ-789-A',
      inspectionDate: '2024-01-20',
      nextInspectionDate: '2024-07-20',
      status: 'Pendiente',
      inspector: 'Ing. María Torres',
      physicalCondition: {
        bodywork: true,
        paint: true,
        seats: false,
        windows: true,
        lights: true,
      },
      mechanicalCondition: {
        bodywork: true,
        paint: true,
        seats: true,
        windows: true,
        lights: true,
      },
      accessibility: {
        ramp: false,
        lowFloor: false,
        reservedSeats: true,
        signage: false,
      },
      safetyEquipment: {
        fireExtinguisher: true,
        firstAidKit: false,
        emergencyExits: true,
        seatBelts: true,
      },
      observations: 'Requiere cambio de asientos y botiquín',
    },
  ]);

  const filteredInspections = inspections.filter(i => {
    const matchesStatus = filterStatus === 'Todos' || i.status === filterStatus;
    const matchesSearch = i.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         i.plateNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprobada': return 'bg-green-100 text-green-800';
      case 'Rechazada': return 'bg-red-100 text-red-800';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateCompletionRate = (inspection: VehicleInspection): number => {
    const allChecks = [
      ...Object.values(inspection.physicalCondition),
      ...Object.values(inspection.mechanicalCondition),
      ...Object.values(inspection.accessibility),
      ...Object.values(inspection.safetyEquipment),
    ];
    const passed = allChecks.filter(Boolean).length;
    return Math.round((passed / allChecks.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Revista Vehicular</h1>
          <p className="text-sm text-slate-500 mt-1">Control de inspección física y mecánica de unidades</p>
        </div>
        <button
          onClick={() => setActiveTab('new')}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors shadow-lg"
        >
          <MaterialIcon name="add_circle" />
          <span className="font-semibold">Nueva Inspección</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-green-100 text-green-800">
              <MaterialIcon name="check_circle" fill />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{inspections.filter(i => i.status === 'Aprobada').length}</p>
              <p className="text-xs text-slate-500">Aprobadas</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-yellow-100 text-yellow-800">
              <MaterialIcon name="pending" fill />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{inspections.filter(i => i.status === 'Pendiente').length}</p>
              <p className="text-xs text-slate-500">Pendientes</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-red-100 text-red-800">
              <MaterialIcon name="cancel" fill />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{inspections.filter(i => i.status === 'Rechazada').length}</p>
              <p className="text-xs text-slate-500">Rechazadas</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-800">
              <MaterialIcon name="calendar_month" fill />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{inspections.length}</p>
              <p className="text-xs text-slate-500">Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('list')}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'list'
              ? 'text-primary border-b-2 border-primary'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Inspecciones
        </button>
        <button
          onClick={() => setActiveTab('new')}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'new'
              ? 'text-primary border-b-2 border-primary'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Nueva Inspección
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'schedule'
              ? 'text-primary border-b-2 border-primary'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Calendario
        </button>
      </div>

      {/* Content */}
      {activeTab === 'list' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <MaterialIcon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar por unidad o placa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option>Todos</option>
                <option>Aprobada</option>
                <option>Pendiente</option>
                <option>Rechazada</option>
              </select>
            </div>
          </div>

          {/* Inspections List */}
          <div className="grid gap-4">
            {filteredInspections.map((inspection) => {
              const completionRate = calculateCompletionRate(inspection);
              return (
                <div key={inspection.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-4 rounded-xl bg-primary/10">
                        <MaterialIcon name="build" className="text-3xl text-primary" fill />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-slate-800">Unidad {inspection.unitNumber}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(inspection.status)}`}>
                            {inspection.status}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500">Placa: {inspection.plateNumber}</p>
                        <p className="text-xs text-slate-400">Inspector: {inspection.inspector}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-3xl font-bold text-primary">{completionRate}%</div>
                      </div>
                      <p className="text-xs text-slate-500">Cumplimiento</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Condición Física</p>
                      <div className="flex items-center gap-1">
                        {Object.values(inspection.physicalCondition).map((check, idx) => (
                          <div
                            key={idx}
                            className={`w-2 h-2 rounded-full ${check ? 'bg-green-500' : 'bg-red-500'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Condición Mecánica</p>
                      <div className="flex items-center gap-1">
                        {Object.values(inspection.mechanicalCondition).map((check, idx) => (
                          <div
                            key={idx}
                            className={`w-2 h-2 rounded-full ${check ? 'bg-green-500' : 'bg-red-500'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Accesibilidad</p>
                      <div className="flex items-center gap-1">
                        {Object.values(inspection.accessibility).map((check, idx) => (
                          <div
                            key={idx}
                            className={`w-2 h-2 rounded-full ${check ? 'bg-green-500' : 'bg-red-500'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Seguridad</p>
                      <div className="flex items-center gap-1">
                        {Object.values(inspection.safetyEquipment).map((check, idx) => (
                          <div
                            key={idx}
                            className={`w-2 h-2 rounded-full ${check ? 'bg-green-500' : 'bg-red-500'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex gap-4 text-sm">
                      <div>
                        <span className="text-slate-500">Fecha: </span>
                        <span className="font-semibold text-slate-800">
                          {new Date(inspection.inspectionDate).toLocaleDateString('es-MX')}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Próxima: </span>
                        <span className="font-semibold text-slate-800">
                          {new Date(inspection.nextInspectionDate).toLocaleDateString('es-MX')}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewDetails(inspection)}
                        className="px-4 py-2 text-primary hover:bg-primary/10 rounded-lg transition-colors text-sm font-semibold"
                      >
                        Ver Detalles
                      </button>
                      <button 
                        onClick={() => handlePrintInspection(inspection)}
                        className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors text-sm font-semibold"
                        title="Imprimir Certificado"
                      >
                        <MaterialIcon name="print" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'new' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Nueva Inspección Vehicular</h2>
          
          <form className="space-y-8">
            {/* Vehicle Info */}
            <div>
              <h3 className="text-lg font-bold text-slate-700 mb-4">Información del Vehículo</h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Número de Unidad</label>
                  <input
                    type="text"
                    placeholder="UN-XXX"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Placa</label>
                  <input
                    type="text"
                    placeholder="ABC-123-D"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Inspector</label>
                  <input
                    type="text"
                    placeholder="Nombre del inspector"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>

            {/* Physical Condition Checklist */}
            <div>
              <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                <MaterialIcon name="directions_car" />
                Condición Física
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {['Carrocería', 'Pintura', 'Asientos', 'Ventanas', 'Luces'].map((item) => (
                  <label key={item} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 text-primary rounded focus:ring-primary/20" />
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Safety Equipment */}
            <div>
              <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                <MaterialIcon name="shield" />
                Equipo de Seguridad
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {['Extintor', 'Botiquín', 'Salidas de Emergencia', 'Cinturones de Seguridad'].map((item) => (
                  <label key={item} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 text-primary rounded focus:ring-primary/20" />
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Accessibility */}
            <div>
              <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                <MaterialIcon name="accessible" />
                Accesibilidad
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {['Rampa', 'Piso Bajo', 'Asientos Reservados', 'Señalización'].map((item) => (
                  <label key={item} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 text-primary rounded focus:ring-primary/20" />
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Observaciones</label>
              <textarea
                rows={4}
                placeholder="Detalles sobre la inspección..."
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-semibold shadow-lg"
              >
                Registrar Inspección
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('list')}
                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Calendario de Inspecciones</h2>
          <div className="text-center py-12 text-slate-400">
            <MaterialIcon name="calendar_month" className="text-6xl mb-4" />
            <p>Próximamente: calendario de inspecciones programadas</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleReview;
