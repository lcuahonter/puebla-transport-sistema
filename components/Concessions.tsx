import React, { useState } from 'react';
import { MaterialIcon } from '../constants';
import { Concession, ConcessionTransfer, Owner } from '../types';

const Concessions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'new' | 'transfers' | 'vehicles' | 'plates' | 'edit'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConcession, setSelectedConcession] = useState<Concession | null>(null);
  const [editingConcession, setEditingConcession] = useState<Concession | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [vehicleAction, setVehicleAction] = useState<'add' | 'remove' | 'change'>('add');
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showPlatesModal, setShowPlatesModal] = useState(false);

  // Mock data
  const [concessions] = useState<Concession[]>([
    {
      id: '1',
      number: 'CONC-2024-001',
      type: 'Servicio Público',
      status: 'Activa',
      ownerId: 'OWN-001',
      ownerName: 'Juan Pérez García',
      ownerType: 'Física',
      issueDate: '2024-01-15',
      expiryDate: '2029-01-15',
      route: 'Ruta 10',
      vehicleCount: 3,
      vehicles: ['UN-101', 'UN-102', 'UN-103'],
    },
    {
      id: '2',
      number: 'CONC-2024-002',
      type: 'Transporte Colectivo',
      status: 'Activa',
      ownerId: 'OWN-002',
      ownerName: 'Transportes Unidos SA',
      ownerType: 'Moral',
      issueDate: '2024-02-20',
      route: 'Ruta 25',
      vehicleCount: 15,
      vehicles: ['UN-201', 'UN-202', 'UN-203', 'UN-204', 'UN-205'],
    },
  ]);

  const filteredConcessions = concessions.filter(c =>
    c.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activa': return 'bg-green-100 text-green-800';
      case 'Suspendida': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEditConcession = (concession: Concession) => {
    setEditingConcession(concession);
    setActiveTab('edit');
  };

  const handleVehicleAction = (action: 'add' | 'remove' | 'change', concession: Concession) => {
    setSelectedConcession(concession);
    setVehicleAction(action);
    setShowVehicleModal(true);
  };

  const handleTransfer = (concession: Concession) => {
    setSelectedConcession(concession);
    setShowTransferModal(true);
  };

  const handlePlatesEmission = (concession: Concession) => {
    setSelectedConcession(concession);
    setShowPlatesModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestión de Concesiones</h1>
          <p className="text-sm text-slate-500 mt-1">Administración de concesiones del servicio público</p>
        </div>
        <button
          onClick={() => setActiveTab('new')}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors shadow-lg"
        >
          <MaterialIcon name="add_circle" />
          <span className="font-semibold">Nueva Concesión</span>
        </button>
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
          Listado
        </button>
        <button
          onClick={() => setActiveTab('new')}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'new'
              ? 'text-primary border-b-2 border-primary'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Registrar Nueva
        </button>
        <button
          onClick={() => setActiveTab('transfers')}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'transfers'
              ? 'text-primary border-b-2 border-primary'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Cesiones de Derechos
        </button>
        <button
          onClick={() => setActiveTab('vehicles')}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'vehicles'
              ? 'text-primary border-b-2 border-primary'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Movimientos Vehiculares
        </button>
        <button
          onClick={() => setActiveTab('plates')}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'plates'
              ? 'text-primary border-b-2 border-primary'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Emisión de Placas
        </button>
      </div>

      {/* Content */}
      {activeTab === 'list' && (
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="relative">
              <MaterialIcon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por número de concesión o concesionario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Concessions Grid */}
          <div className="grid gap-4">
            {filteredConcessions.map((concession) => (
              <div
                key={concession.id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-bold text-slate-800">{concession.number}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(concession.status)}`}>
                        {concession.status}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                        {concession.type}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-500">Concesionario</p>
                        <p className="font-semibold text-slate-800">{concession.ownerName}</p>
                        <p className="text-xs text-slate-400">Persona {concession.ownerType}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Ruta Asignada</p>
                        <p className="font-semibold text-slate-800">{concession.route || 'Sin asignar'}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Fecha de Emisión</p>
                        <p className="font-semibold text-slate-800">{new Date(concession.issueDate).toLocaleDateString('es-MX')}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Vehículos Autorizados</p>
                        <p className="font-semibold text-slate-800">{concession.vehicleCount} unidades</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleEditConcession(concession)}
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-semibold flex items-center gap-1"
                      >
                        <MaterialIcon name="edit" className="text-base" />
                        Editar Datos
                      </button>
                      <button
                        onClick={() => handleVehicleAction('add', concession)}
                        className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-semibold flex items-center gap-1"
                      >
                        <MaterialIcon name="add_circle" className="text-base" />
                        Alta
                      </button>
                      <button
                        onClick={() => handleVehicleAction('remove', concession)}
                        className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-semibold flex items-center gap-1"
                      >
                        <MaterialIcon name="remove_circle" className="text-base" />
                        Baja
                      </button>
                      <button
                        onClick={() => handleVehicleAction('change', concession)}
                        className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-semibold flex items-center gap-1"
                      >
                        <MaterialIcon name="swap_horiz" className="text-base" />
                        Cambio
                      </button>
                      <button
                        onClick={() => handleTransfer(concession)}
                        className="px-3 py-1.5 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors text-sm font-semibold flex items-center gap-1"
                      >
                        <MaterialIcon name="assignment_ind" className="text-base" />
                        Cesión
                      </button>
                      <button
                        onClick={() => handlePlatesEmission(concession)}
                        className="px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors text-sm font-semibold flex items-center gap-1"
                      >
                        <MaterialIcon name="badge" className="text-base" />
                        Placas
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'new' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Registrar Nueva Concesión</h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Número de Concesión</label>
                <input
                  type="text"
                  placeholder="CONC-2024-XXX"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de Concesión</label>
                <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>Servicio Público</option>
                  <option>Transporte Colectivo</option>
                  <option>Transporte Individual</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Concesionario</label>
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

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Ruta Asignada</label>
                <input
                  type="text"
                  placeholder="Ej: Ruta 10"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Cantidad de Vehículos</label>
                <input
                  type="number"
                  min="1"
                  placeholder="0"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Observaciones</label>
              <textarea
                rows={4}
                placeholder="Notas adicionales..."
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-semibold shadow-lg"
              >
                Registrar Concesión
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

      {activeTab === 'transfers' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Registro de Cesión de Derechos</h2>
          
          <form className="space-y-6">
            {/* Cedente Section */}
            <div>
              <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <MaterialIcon name="person" />
                Cedente (Concesionario Actual)
              </h3>
              <div className="grid grid-cols-2 gap-6 bg-slate-50 p-4 rounded-lg">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Número de Concesión</label>
                  <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                    <option value="">Seleccionar concesión...</option>
                    {concessions.map(c => (
                      <option key={c.id} value={c.id}>{c.number} - {c.ownerName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre del Cedente</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-100"
                    placeholder="Auto-completado"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">CURP/RFC</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-100"
                    placeholder="Auto-completado"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Domicilio</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-100"
                    placeholder="Auto-completado"
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Cesionario Section */}
            <div>
              <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <MaterialIcon name="person_add" />
                Cesionario (Nuevo Concesionario)
              </h3>
              <div className="grid grid-cols-2 gap-6 bg-green-50 p-4 rounded-lg">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre Completo/Razón Social *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                    placeholder="Nombre del nuevo concesionario"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de Persona *</label>
                  <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                    <option>Física</option>
                    <option>Moral</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">CURP/RFC *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                    placeholder="18 caracteres CURP o 13 RFC"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Teléfono *</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                    placeholder="10 dígitos"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Domicilio *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                    placeholder="Calle, número, colonia, ciudad"
                  />
                </div>
              </div>
            </div>

            {/* Transfer Details */}
            <div>
              <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <MaterialIcon name="description" />
                Detalles de la Cesión
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Fecha de Cesión *</label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de Cesión *</label>
                  <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option>Cesión Total</option>
                    <option>Cesión Parcial</option>
                    <option>Cesión con Cambio de Vehículo</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Motivo de la Cesión</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Describir el motivo de la cesión de derechos..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Monto de la Operación</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="$0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Documento de Soporte</label>
                  <input
                    type="file"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    accept=".pdf,.jpg,.png"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-semibold shadow-lg flex items-center justify-center gap-2"
              >
                <MaterialIcon name="check_circle" />
                Registrar Cesión de Derechos
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

      {activeTab === 'vehicles' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Movimientos Vehiculares (Alta/Baja/Cambio)</h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de Movimiento *</label>
                <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option value="add">Alta - Agregar vehículo nuevo</option>
                  <option value="remove">Baja - Dar de baja vehículo</option>
                  <option value="change">Cambio - Sustituir vehículo</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Concesión *</label>
                <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option value="">Seleccionar concesión...</option>
                  {concessions.map(c => (
                    <option key={c.id} value={c.id}>{c.number} - {c.ownerName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Fecha del Movimiento *</label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Número Económico *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="UN-XXX"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Marca del Vehículo *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Ej: Mercedes-Benz"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Modelo *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Ej: Sprinter 515"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Año *</label>
                <input
                  type="number"
                  required
                  min="1990"
                  max="2025"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="2024"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Número de Serie (VIN) *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="17 caracteres"
                  maxLength={17}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Motivo del Movimiento *</label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Describir el motivo del alta/baja/cambio..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Documentación</label>
                <input
                  type="file"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  accept=".pdf,.jpg,.png"
                  multiple
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-semibold shadow-lg flex items-center justify-center gap-2"
              >
                <MaterialIcon name="check_circle" />
                Registrar Movimiento
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

      {activeTab === 'plates' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Emisión de Placas de Servicio Público</h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Concesión *</label>
                <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option value="">Seleccionar concesión...</option>
                  {concessions.map(c => (
                    <option key={c.id} value={c.id}>{c.number} - {c.ownerName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Número Económico *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="UN-XXX"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de Servicio *</label>
                <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>Transporte Público</option>
                  <option>Taxi</option>
                  <option>Colectivo</option>
                  <option>Turismo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Fecha de Emisión *</label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="col-span-2 bg-blue-50 p-4 rounded-lg">
                <h3 className="text-md font-semibold text-slate-700 mb-3">Datos del Vehículo</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Marca *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                      placeholder="Ej: Mercedes-Benz"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Submarca/Modelo *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                      placeholder="Ej: Sprinter 515"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Año *</label>
                    <input
                      type="number"
                      required
                      min="1990"
                      max="2025"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                      placeholder="2024"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Color *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                      placeholder="Ej: Blanco"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Número de Serie (VIN) *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                      placeholder="17 caracteres"
                      maxLength={17}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Número de Motor *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                      placeholder="Número de motor"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Capacidad (Pasajeros) *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                      placeholder="Ej: 20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Peso Bruto Vehicular (kg) *</label>
                    <input
                      type="number"
                      required
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                      placeholder="Ej: 3500"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Observaciones</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Notas adicionales sobre la emisión de placas..."
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-semibold shadow-lg flex items-center justify-center gap-2"
              >
                <MaterialIcon name="badge" />
                Emitir Placas
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

      {activeTab === 'edit' && editingConcession && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Editar Datos del Concesionario</h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Número de Concesión</label>
                <input
                  type="text"
                  defaultValue={editingConcession.number}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-100"
                  disabled
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de Concesión</label>
                <select
                  defaultValue={editingConcession.type}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option>Servicio Público</option>
                  <option>Transporte Colectivo</option>
                  <option>Transporte Individual</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre Completo/Razón Social *</label>
                <input
                  type="text"
                  required
                  defaultValue={editingConcession.ownerName}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de Persona</label>
                <select
                  defaultValue={editingConcession.ownerType}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option>Física</option>
                  <option>Moral</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">CURP/RFC *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="18 caracteres CURP o 13 RFC"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Teléfono *</label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="10 dígitos"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Domicilio *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Calle, número, colonia, ciudad"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Ruta Asignada</label>
                <input
                  type="text"
                  defaultValue={editingConcession.route}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Ej: Ruta 10"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Estado</label>
                <select
                  defaultValue={editingConcession.status}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option>Activa</option>
                  <option>Suspendida</option>
                  <option>Cancelada</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-semibold shadow-lg flex items-center justify-center gap-2"
              >
                <MaterialIcon name="save" />
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingConcession(null);
                  setActiveTab('list');
                }}
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

export default Concessions;
