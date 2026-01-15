import React, { useState } from 'react';
import { MaterialIcon } from '../constants';
import { Route, Terminal } from '../types';

const Routes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'routes' | 'terminals' | 'newRoute' | 'newTerminal' | 'proposals'>('routes');
  const [searchTerm, setSearchTerm] = useState('');

  // Handlers
  const handleEditRoute = (route: Route) => {
    alert(`Editando ruta ${route.number}: ${route.name}`);
  };

  const handleViewRouteMap = (route: Route) => {
    alert(`Mostrando mapa de ruta ${route.number}\nOrigen: ${route.origin}\nDestino: ${route.destination}\nParadas: ${route.stops.length}`);
  };

  const handleEditTerminal = (terminal: Terminal) => {
    alert(`Editando ${terminal.type}: ${terminal.name}`);
  };

  const handleViewTerminalLocation = (terminal: Terminal) => {
    alert(`Ubicación de ${terminal.name}:\nDirección: ${terminal.address}\nCoordenadas: ${terminal.latitude}, ${terminal.longitude}`);
  };

  const handleApproveProposal = (proposalName: string) => {
    if (confirm(`¿Aprobar la propuesta "${proposalName}"?`)) {
      alert(`✅ Propuesta "${proposalName}" aprobada exitosamente`);
    }
  };

  const handleRejectProposal = (proposalName: string) => {
    const reason = prompt(`Ingrese el motivo del rechazo de "${proposalName}":`);
    if (reason) {
      alert(`❌ Propuesta "${proposalName}" rechazada.\nMotivo: ${reason}`);
    }
  };

  const handleReviewProposal = (proposalName: string) => {
    alert(`📋 Iniciando revisión técnica de "${proposalName}"\nSe notificará al solicitante de los resultados.`);
  };

  // Mock data
  const [routes] = useState<Route[]>([
    {
      id: '1',
      number: 'R-10',
      name: 'Centro - San Manuel',
      type: 'Urbana',
      status: 'Activa',
      origin: 'Centro Histórico',
      destination: 'San Manuel',
      stops: [
        { id: '1', name: 'Zócalo', latitude: 19.0414, longitude: -98.2063, order: 1 },
        { id: '2', name: 'CAPU', latitude: 19.0464, longitude: -98.1974, order: 2 },
      ],
      assignedUnits: 15,
      terminals: ['Terminal Centro', 'Base San Manuel'],
      creationDate: '2020-01-15',
      lastModified: '2024-01-10',
    },
    {
      id: '2',
      number: 'R-25',
      name: 'Periférico - Cholula',
      type: 'Suburbana',
      status: 'Activa',
      origin: 'Periférico Ecológico',
      destination: 'San Pedro Cholula',
      stops: [],
      assignedUnits: 20,
      terminals: ['Terminal Periférico', 'Base Cholula'],
      creationDate: '2021-03-20',
    },
  ]);

  const [terminals] = useState<Terminal[]>([
    {
      id: '1',
      name: 'Terminal Centro',
      type: 'Terminal',
      address: 'Av. 5 de Mayo #123, Centro',
      latitude: 19.0414,
      longitude: -98.2063,
      capacity: 30,
      assignedRoutes: ['R-10', 'R-15', 'R-20'],
      status: 'Activo',
      proposalDate: '2019-05-10',
      approvalDate: '2019-08-15',
    },
    {
      id: '2',
      name: 'Base San Manuel',
      type: 'Base',
      address: 'Blvd. San Manuel #456',
      latitude: 19.0464,
      longitude: -98.1974,
      capacity: 15,
      assignedRoutes: ['R-10'],
      status: 'Activo',
      proposalDate: '2020-01-05',
      approvalDate: '2020-01-15',
    },
  ]);

  const filteredRoutes = routes.filter(r =>
    r.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTerminals = terminals.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activa':
      case 'Activo':
        return 'bg-green-100 text-green-800';
      case 'Suspendida':
      case 'Inactivo':
        return 'bg-yellow-100 text-yellow-800';
      case 'En Modificación':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Urbana': return 'bg-blue-100 text-blue-800';
      case 'Suburbana': return 'bg-purple-100 text-purple-800';
      case 'Foránea': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestión de Rutas</h1>
          <p className="text-sm text-slate-500 mt-1">Administración de rutas, paradas y terminales</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('newRoute')}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors shadow-lg"
          >
            <MaterialIcon name="add_circle" />
            <span className="font-semibold">Nueva Ruta</span>
          </button>
          <button
            onClick={() => setActiveTab('newTerminal')}
            className="flex items-center gap-2 px-4 py-2.5 bg-puebla-maroon text-white rounded-xl hover:bg-puebla-maroon/90 transition-colors shadow-lg"
          >
            <MaterialIcon name="add_location" />
            <span className="font-semibold">Nueva Terminal</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-800">
              <MaterialIcon name="route" fill />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{routes.length}</p>
              <p className="text-xs text-slate-500">Rutas Activas</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-purple-100 text-purple-800">
              <MaterialIcon name="location_on" fill />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{terminals.length}</p>
              <p className="text-xs text-slate-500">Terminales</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-green-100 text-green-800">
              <MaterialIcon name="directions_bus" fill />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{routes.reduce((sum, r) => sum + r.assignedUnits, 0)}</p>
              <p className="text-xs text-slate-500">Unidades Asignadas</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-orange-100 text-orange-800">
              <MaterialIcon name="map" fill />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{routes.reduce((sum, r) => sum + r.stops.length, 0)}</p>
              <p className="text-xs text-slate-500">Paradas Totales</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('routes')}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'routes'
              ? 'text-primary border-b-2 border-primary'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Rutas
        </button>
        <button
          onClick={() => setActiveTab('terminals')}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'terminals'
              ? 'text-primary border-b-2 border-primary'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Terminales y Bases
        </button>
        <button
          onClick={() => setActiveTab('proposals')}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'proposals'
              ? 'text-primary border-b-2 border-primary'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Propuestas de Sitios
        </button>
      </div>

      {/* Content */}
      {activeTab === 'routes' && (
        <div className="space-y-4">
          {/* Search */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="relative">
              <MaterialIcon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar rutas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Routes List */}
          <div className="grid gap-4">
            {filteredRoutes.map((route) => (
              <div key={route.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className="p-4 rounded-xl bg-primary/10">
                      <MaterialIcon name="route" className="text-3xl text-primary" fill />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-bold text-slate-800">{route.number}</h3>
                        <h4 className="text-lg text-slate-600">{route.name}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(route.status)}`}>
                          {route.status}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(route.type)}`}>
                          {route.type}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-slate-500">Origen</p>
                          <p className="font-semibold text-slate-800">{route.origin}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Destino</p>
                          <p className="font-semibold text-slate-800">{route.destination}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Unidades Asignadas</p>
                          <p className="font-semibold text-slate-800">{route.assignedUnits}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <MaterialIcon name="location_on" className="text-sm" />
                          <span>{route.stops.length} paradas</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MaterialIcon name="apartment" className="text-sm" />
                          <span>{route.terminals.length} terminales</span>
                        </div>
                        {route.lastModified && (
                          <div className="flex items-center gap-1">
                            <MaterialIcon name="update" className="text-sm" />
                            <span>Modificada: {new Date(route.lastModified).toLocaleDateString('es-MX')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => handleEditRoute(route)}
                      className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      title="Editar Ruta"
                    >
                      <MaterialIcon name="edit" />
                    </button>
                    <button 
                      onClick={() => handleViewRouteMap(route)}
                      className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Ver Mapa"
                    >
                      <MaterialIcon name="map" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'terminals' && (
        <div className="space-y-4">
          {/* Search */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="relative">
              <MaterialIcon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar terminales..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Terminals List */}
          <div className="grid gap-4">
            {filteredTerminals.map((terminal) => (
              <div key={terminal.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className="p-4 rounded-xl bg-purple-100 text-purple-800">
                      <MaterialIcon name="apartment" className="text-3xl" fill />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-bold text-slate-800">{terminal.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(terminal.status)}`}>
                          {terminal.status}
                        </span>
                        <span className="px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-semibold">
                          {terminal.type}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="col-span-2">
                          <p className="text-slate-500">Dirección</p>
                          <p className="font-semibold text-slate-800">{terminal.address}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Capacidad</p>
                          <p className="font-semibold text-slate-800">{terminal.capacity} unidades</p>
                        </div>
                        <div className="col-span-3">
                          <p className="text-slate-500">Rutas Asignadas</p>
                          <div className="flex gap-2 mt-1">
                            {terminal.assignedRoutes.map((routeNum) => (
                              <span key={routeNum} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-semibold">
                                {routeNum}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => handleEditTerminal(terminal)}
                      className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      title="Editar Terminal/Base"
                    >
                      <MaterialIcon name="edit" />
                    </button>
                    <button 
                      onClick={() => handleViewTerminalLocation(terminal)}
                      className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Ver Ubicación"
                    >
                      <MaterialIcon name="location_on" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'newRoute' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Registrar Nueva Ruta</h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Número de Ruta</label>
                <input
                  type="text"
                  placeholder="R-XX"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre de la Ruta</label>
                <input
                  type="text"
                  placeholder="Origen - Destino"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo</label>
                <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>Urbana</option>
                  <option>Suburbana</option>
                  <option>Foránea</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Unidades Autorizadas</label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Punto de Origen</label>
                <input
                  type="text"
                  placeholder="Ubicación de inicio"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Punto de Destino</label>
                <input
                  type="text"
                  placeholder="Ubicación final"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Observaciones</label>
              <textarea
                rows={4}
                placeholder="Detalles adicionales sobre la ruta..."
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-semibold shadow-lg"
              >
                Registrar Ruta
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('routes')}
                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'newTerminal' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Proponer Nueva Terminal/Base</h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre</label>
                <input
                  type="text"
                  placeholder="Terminal/Base..."
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo</label>
                <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>Terminal</option>
                  <option>Base</option>
                  <option>Sitio</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Dirección</label>
                <input
                  type="text"
                  placeholder="Dirección completa"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Capacidad (Unidades)</label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-semibold shadow-lg"
              >
                Registrar Propuesta
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('terminals')}
                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'proposals' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">Propuestas de Sitios, Bases y Terminales</h2>
              <button
                onClick={() => setActiveTab('newTerminal')}
                className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-semibold flex items-center gap-2"
              >
                <MaterialIcon name="add" />
                Nueva Propuesta
              </button>
            </div>

            {/* Propuestas Pendientes */}
            <div className="space-y-4">
              <div className="border border-orange-200 bg-orange-50 rounded-xl p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 rounded-lg bg-orange-600 text-white">
                        <MaterialIcon name="pending" className="text-2xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">Terminal Norte Puebla</h3>
                        <span className="px-3 py-1 bg-orange-200 text-orange-800 rounded-full text-xs font-semibold">
                          Pendiente de Aprobación
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm mt-4">
                      <div>
                        <p className="text-slate-500">Tipo</p>
                        <p className="font-semibold text-slate-800">Terminal</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Ubicación Propuesta</p>
                        <p className="font-semibold text-slate-800">Blvd. Norte #1500, Col. La Libertad</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Capacidad</p>
                        <p className="font-semibold text-slate-800">50 unidades</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Fecha de Propuesta</p>
                        <p className="font-semibold text-slate-800">10 de enero de 2026</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Solicitante</p>
                        <p className="font-semibold text-slate-800">Transportes Unidos S.A.</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Rutas Beneficiadas</p>
                        <p className="font-semibold text-slate-800">R-10, R-15, R-25</p>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-white rounded-lg">
                      <p className="text-sm text-slate-600">
                        <strong>Justificación:</strong> La zona norte de la ciudad ha experimentado un crecimiento significativo 
                        en los últimos años. Una nueva terminal facilitaría el flujo de pasajeros y reduciría los tiempos de espera.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-4">
                    <button 
                      onClick={() => handleApproveProposal('Terminal Norte Puebla')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center gap-2"
                    >
                      <MaterialIcon name="check_circle" />
                      Aprobar
                    </button>
                    <button 
                      onClick={() => handleRejectProposal('Terminal Norte Puebla')}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center gap-2"
                    >
                      <MaterialIcon name="cancel" />
                      Rechazar
                    </button>
                    <button 
                      onClick={() => handleReviewProposal('Terminal Norte Puebla')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
                    >
                      <MaterialIcon name="edit" />
                      Revisar
                    </button>
                  </div>
                </div>
              </div>

              <div className="border border-orange-200 bg-orange-50 rounded-xl p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 rounded-lg bg-orange-600 text-white">
                        <MaterialIcon name="pending" className="text-2xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">Sitio de Taxis - Centro Comercial Angelópolis</h3>
                        <span className="px-3 py-1 bg-orange-200 text-orange-800 rounded-full text-xs font-semibold">
                          Pendiente de Aprobación
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm mt-4">
                      <div>
                        <p className="text-slate-500">Tipo</p>
                        <p className="font-semibold text-slate-800">Sitio de Taxis</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Ubicación Propuesta</p>
                        <p className="font-semibold text-slate-800">Blvd. del Niño Poblano, Reserva Territorial Atlixcáyotl</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Capacidad</p>
                        <p className="font-semibold text-slate-800">12 unidades</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Fecha de Propuesta</p>
                        <p className="font-semibold text-slate-800">08 de enero de 2026</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Solicitante</p>
                        <p className="font-semibold text-slate-800">Sitio Angelópolis A.C.</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Coordinadas</p>
                        <p className="font-semibold text-slate-800">19.0015, -98.2346</p>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-white rounded-lg">
                      <p className="text-sm text-slate-600">
                        <strong>Justificación:</strong> Alta demanda de servicio de taxi en la zona comercial. 
                        Actualmente los usuarios deben caminar largas distancias para encontrar transporte.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-4">
                    <button 
                      onClick={() => handleApproveProposal('Sitio de Taxis - Centro Comercial Angelópolis')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center gap-2"
                    >
                      <MaterialIcon name="check_circle" />
                      Aprobar
                    </button>
                    <button 
                      onClick={() => handleRejectProposal('Sitio de Taxis - Centro Comercial Angelópolis')}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center gap-2"
                    >
                      <MaterialIcon name="cancel" />
                      Rechazar
                    </button>
                    <button 
                      onClick={() => handleReviewProposal('Sitio de Taxis - Centro Comercial Angelópolis')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
                    >
                      <MaterialIcon name="edit" />
                      Revisar
                    </button>
                  </div>
                </div>
              </div>

              {/* Propuestas Aprobadas */}
              <div className="border border-green-200 bg-green-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 rounded-lg bg-green-600 text-white">
                    <MaterialIcon name="check_circle" className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Base Cholula - Ruta 25</h3>
                    <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-xs font-semibold">
                      Aprobada - En Operación
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 text-sm mt-4">
                  <div>
                    <p className="text-slate-500">Tipo</p>
                    <p className="font-semibold text-slate-800">Base de Operaciones</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Fecha de Propuesta</p>
                    <p className="font-semibold text-slate-800">20 de dic de 2025</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Fecha de Aprobación</p>
                    <p className="font-semibold text-slate-800">02 de ene de 2026</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Capacidad</p>
                    <p className="font-semibold text-slate-800">20 unidades</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Routes;
