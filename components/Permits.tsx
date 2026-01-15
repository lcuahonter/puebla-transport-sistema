import React, { useState } from 'react';
import { MaterialIcon } from '../constants';
import { MerchantPermit } from '../types';

const Permits: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'new'>('list');
  const [filterType, setFilterType] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Handlers
  const handleEditPermit = (permit: MerchantPermit) => {
    alert(`Editando permiso ${permit.number}\nTipo: ${permit.type}\nTitular: ${permit.holderName}`);
  };

  const handlePrintPermit = (permit: MerchantPermit) => {
    alert(`🖨️ Imprimiendo permiso ${permit.number}\nGenerando documento oficial...`);
  };

  const handleMoreOptions = (permit: MerchantPermit) => {
    const options = ['Suspender', 'Renovar', 'Cancelar', 'Ver Historial'];
    const choice = prompt(`Opciones para ${permit.number}:\n\n${options.map((o, i) => `${i+1}. ${o}`).join('\n')}\n\nIngrese el número de opción:`);
    if (choice && parseInt(choice) > 0 && parseInt(choice) <= options.length) {
      alert(`Opción seleccionada: ${options[parseInt(choice) - 1]}`);
    }
  };

  // Mock data
  const [permits] = useState<MerchantPermit[]>([
    {
      id: '1',
      number: 'PERM-ESC-2024-001',
      type: 'Escolar',
      status: 'Vigente',
      holderId: 'HOLD-001',
      holderName: 'María González López',
      holderType: 'Física',
      vehicleId: 'VEH-001',
      plateNumber: 'ABC-123-D',
      issueDate: '2024-01-10',
      expiryDate: '2025-01-10',
      route: 'Zona Escolar Centro',
    },
    {
      id: '2',
      number: 'PERM-TAXI-2024-002',
      type: 'Taxi',
      status: 'Vigente',
      holderId: 'HOLD-002',
      holderName: 'Transportes Rápidos SA',
      holderType: 'Moral',
      vehicleId: 'VEH-002',
      plateNumber: 'XYZ-789-A',
      issueDate: '2024-03-15',
      expiryDate: '2025-03-15',
      route: 'Sitio Centro Histórico',
    },
    {
      id: '3',
      number: 'PERM-TUR-2024-003',
      type: 'Turismo',
      status: 'Vigente',
      holderId: 'HOLD-003',
      holderName: 'Tours Puebla Express',
      holderType: 'Moral',
      vehicleId: 'VEH-003',
      plateNumber: 'TUR-456-B',
      issueDate: '2024-02-20',
      expiryDate: '2025-02-20',
      route: 'Circuito Turístico',
    },
  ]);

  const filteredPermits = permits.filter(p => {
    const matchesType = filterType === 'Todos' || p.type === filterType;
    const matchesSearch = p.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.holderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.plateNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Vigente': return 'bg-green-100 text-green-800';
      case 'Suspendido': return 'bg-yellow-100 text-yellow-800';
      case 'Vencido': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Escolar': return 'school';
      case 'Taxi': return 'local_taxi';
      case 'Turismo': return 'tour';
      case 'Personal': return 'person';
      default: return 'directions_car';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Escolar': return 'bg-blue-100 text-blue-800';
      case 'Taxi': return 'bg-yellow-100 text-yellow-800';
      case 'Turismo': return 'bg-purple-100 text-purple-800';
      case 'Personal': return 'bg-gray-100 text-gray-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Permisos Mercantiles</h1>
          <p className="text-sm text-slate-500 mt-1">Gestión de permisos especiales de transporte</p>
        </div>
        <button
          onClick={() => setActiveTab('new')}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors shadow-lg"
        >
          <MaterialIcon name="add_circle" />
          <span className="font-semibold">Nuevo Permiso</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        {['Escolar', 'Taxi', 'Turismo', 'Personal'].map((type) => {
          const count = permits.filter(p => p.type === type).length;
          return (
            <div key={type} className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${getTypeColor(type)}`}>
                  <MaterialIcon name={getTypeIcon(type)} fill />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{count}</p>
                  <p className="text-xs text-slate-500">{type}</p>
                </div>
              </div>
            </div>
          );
        })}
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
          Listado de Permisos
        </button>
        <button
          onClick={() => setActiveTab('new')}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'new'
              ? 'text-primary border-b-2 border-primary'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Registrar Nuevo
        </button>
      </div>

      {/* Content */}
      {activeTab === 'list' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <MaterialIcon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar por número, titular o placa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option>Todos</option>
                <option>Escolar</option>
                <option>Taxi</option>
                <option>Turismo</option>
                <option>Personal</option>
              </select>
            </div>
          </div>

          {/* Permits Grid */}
          <div className="grid gap-4">
            {filteredPermits.map((permit) => (
              <div
                key={permit.id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className={`p-4 rounded-xl ${getTypeColor(permit.type)}`}>
                      <MaterialIcon name={getTypeIcon(permit.type)} className="text-3xl" fill />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-bold text-slate-800">{permit.number}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(permit.status)}`}>
                          {permit.status}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(permit.type)}`}>
                          {permit.type}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-slate-500">Titular</p>
                          <p className="font-semibold text-slate-800">{permit.holderName}</p>
                          <p className="text-xs text-slate-400">Persona {permit.holderType}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Placa del Vehículo</p>
                          <p className="font-semibold text-slate-800">{permit.plateNumber}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Vigencia</p>
                          <p className="font-semibold text-slate-800">
                            {new Date(permit.expiryDate).toLocaleDateString('es-MX')}
                          </p>
                          <p className="text-xs text-slate-400">
                            {Math.ceil((new Date(permit.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} días restantes
                          </p>
                        </div>
                        {permit.route && (
                          <div className="col-span-3">
                            <p className="text-slate-500">Ruta/Zona Autorizada</p>
                            <p className="font-semibold text-slate-800">{permit.route}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => handleEditPermit(permit)}
                      className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      title="Editar Permiso"
                    >
                      <MaterialIcon name="edit" />
                    </button>
                    <button 
                      onClick={() => handlePrintPermit(permit)}
                      className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Imprimir Permiso"
                    >
                      <MaterialIcon name="print" />
                    </button>
                    <button 
                      onClick={() => handleMoreOptions(permit)}
                      className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Más Opciones"
                    >
                      <MaterialIcon name="more_vert" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPermits.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <MaterialIcon name="receipt_long" className="text-6xl text-slate-300 mb-4" />
              <p className="text-slate-400">No se encontraron permisos con los filtros aplicados</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'new' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Registrar Nuevo Permiso Mercantil</h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Número de Permiso</label>
                <input
                  type="text"
                  placeholder="PERM-TIPO-2024-XXX"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de Permiso</label>
                <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>Escolar</option>
                  <option>Taxi</option>
                  <option>Turismo</option>
                  <option>Personal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Titular del Permiso</label>
                <input
                  type="text"
                  placeholder="Nombre completo o razón social"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de Persona</label>
                <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>Física</option>
                  <option>Moral</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Placa del Vehículo</label>
                <input
                  type="text"
                  placeholder="ABC-123-D"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">ID del Vehículo</label>
                <input
                  type="text"
                  placeholder="VEH-XXX"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Fecha de Emisión</label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Fecha de Vencimiento</label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Ruta/Zona Autorizada</label>
                <input
                  type="text"
                  placeholder="Ej: Zona Escolar Centro, Sitio Centro Histórico"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Observaciones</label>
              <textarea
                rows={4}
                placeholder="Notas adicionales sobre el permiso..."
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-semibold shadow-lg"
              >
                Registrar Permiso
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
    </div>
  );
};

export default Permits;
