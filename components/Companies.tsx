import React, { useState } from 'react';
import { MaterialIcon } from '../constants';
import { TransportNetworkCompany } from '../types';

const Companies: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'new'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('Todos');
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<TransportNetworkCompany | null>(null);

  // Mock data
  const [companies] = useState<TransportNetworkCompany[]>([
    {
      id: '1',
      name: 'Uber Puebla',
      legalName: 'Rasier Operations B.V.',
      type: 'Plataforma Digital',
      rfc: 'ROB990101ABC',
      registrationNumber: 'RDT-2024-001',
      registrationDate: '2024-01-15',
      status: 'Activa',
      legalRepresentative: 'Juan Carlos Méndez',
      contactEmail: 'contacto@uber.com',
      contactPhone: '222-123-4567',
      address: 'Av. Juárez 2510, Col. La Paz, Puebla',
      registeredDrivers: 450,
      registeredVehicles: 380,
      documents: ['acta_constitutiva.pdf', 'rfc.pdf', 'poderes.pdf'],
    },
    {
      id: '2',
      name: 'DiDi Puebla',
      legalName: 'DiDi México S.A. de C.V.',
      type: 'Plataforma Digital',
      rfc: 'DME180315XYZ',
      registrationNumber: 'RDT-2024-002',
      registrationDate: '2024-02-20',
      status: 'Activa',
      legalRepresentative: 'María Elena Torres',
      contactEmail: 'contacto@didi.com.mx',
      contactPhone: '222-987-6543',
      address: 'Blvd. 5 de Mayo 1234, Col. Anzures, Puebla',
      registeredDrivers: 320,
      registeredVehicles: 290,
      documents: ['acta_constitutiva.pdf', 'rfc.pdf'],
    },
    {
      id: '3',
      name: 'Transportes Turísticos Puebla',
      legalName: 'Transportes Turísticos Puebla S.A.',
      type: 'Servicio Complementario',
      rfc: 'TTP150810DEF',
      registrationNumber: 'RDT-2024-003',
      registrationDate: '2024-03-10',
      status: 'Activa',
      legalRepresentative: 'Roberto Sánchez Pérez',
      contactEmail: 'info@transportespuebla.com',
      contactPhone: '222-555-1234',
      address: 'Av. Reforma 789, Centro, Puebla',
      registeredDrivers: 45,
      registeredVehicles: 30,
      documents: ['acta_constitutiva.pdf', 'rfc.pdf', 'permisos.pdf'],
    },
  ]);

  const filteredCompanies = companies.filter(c => {
    const matchesType = filterType === 'Todos' || c.type === filterType;
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.legalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activa': return 'bg-green-100 text-green-800';
      case 'Suspendida': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Plataforma Digital': return 'bg-blue-100 text-blue-800';
      case 'Red de Transporte': return 'bg-purple-100 text-purple-800';
      case 'Servicio Complementario': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEmitCertificate = (company: TransportNetworkCompany) => {
    setSelectedCompany(company);
    setShowCertificateModal(true);
  };

  const handleEditCompany = (company: TransportNetworkCompany) => {
    alert(`Editando empresa: ${company.name}\n\nNombre Legal: ${company.legalName}\nRFC: ${company.rfc}\nRepresentante: ${company.legalRepresentative}`);
  };

  const handleViewDocuments = (company: TransportNetworkCompany) => {
    alert(`📁 Documentos de ${company.name}:\n\n- Acta Constitutiva\n- Comprobante de Domicilio\n- Identificación del Representante\n- Póliza de Seguro\n- Constancia de Registro`);
  };

  const handleMoreOptions = (company: TransportNetworkCompany) => {
    const options = ['Suspender Operaciones', 'Renovar Registro', 'Ver Vehículos', 'Ver Conductores'];
    const choice = prompt(`Opciones para ${company.name}:\n\n${options.map((o, i) => `${i+1}. ${o}`).join('\n')}\n\nIngrese el número de opción:`);
    if (choice && parseInt(choice) > 0 && parseInt(choice) <= options.length) {
      alert(`Opción seleccionada: ${options[parseInt(choice) - 1]}`);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Plataforma Digital': return 'smartphone';
      case 'Red de Transporte': return 'hub';
      case 'Servicio Complementario': return 'add_business';
      default: return 'business';
    }
  };

  const generateCertificate = () => {
    if (!selectedCompany) return;
    
    // Aquí iría la lógica para generar el PDF de la constancia
    console.log('Generando constancia para:', selectedCompany.name);
    alert(`Constancia de registro generada para ${selectedCompany.name}\nNúmero: ${selectedCompany.registrationNumber}`);
    setShowCertificateModal(false);
    setSelectedCompany(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Empresas de Redes de Transporte</h1>
          <p className="text-sm text-slate-500 mt-1">Registro de plataformas digitales y servicios complementarios</p>
        </div>
        <button
          onClick={() => setActiveTab('new')}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors shadow-lg"
        >
          <MaterialIcon name="add_circle" />
          <span className="font-semibold">Registrar Empresa</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-800">
              <MaterialIcon name="business" fill />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{companies.length}</p>
              <p className="text-xs text-slate-500">Empresas Registradas</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-purple-100 text-purple-800">
              <MaterialIcon name="person" fill />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">
                {companies.reduce((sum, c) => sum + c.registeredDrivers, 0)}
              </p>
              <p className="text-xs text-slate-500">Conductores</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-green-100 text-green-800">
              <MaterialIcon name="directions_car" fill />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">
                {companies.reduce((sum, c) => sum + c.registeredVehicles, 0)}
              </p>
              <p className="text-xs text-slate-500">Vehículos</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-orange-100 text-orange-800">
              <MaterialIcon name="smartphone" fill />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">
                {companies.filter(c => c.type === 'Plataforma Digital').length}
              </p>
              <p className="text-xs text-slate-500">Plataformas</p>
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
          Listado de Empresas
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
                  placeholder="Buscar por nombre o número de registro..."
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
                <option>Plataforma Digital</option>
                <option>Red de Transporte</option>
                <option>Servicio Complementario</option>
              </select>
            </div>
          </div>

          {/* Companies Grid */}
          <div className="grid gap-4">
            {filteredCompanies.map((company) => (
              <div key={company.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className={`p-4 rounded-xl ${getTypeColor(company.type)}`}>
                      <MaterialIcon name={getTypeIcon(company.type)} className="text-3xl" fill />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-bold text-slate-800">{company.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(company.status)}`}>
                          {company.status}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(company.type)}`}>
                          {company.type}
                        </span>
                      </div>
                      
                      <p className="text-sm text-slate-600 mb-3">{company.legalName}</p>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-slate-500">Registro</p>
                          <p className="font-semibold text-slate-800">{company.registrationNumber}</p>
                          <p className="text-xs text-slate-400">
                            {new Date(company.registrationDate).toLocaleDateString('es-MX')}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500">Representante Legal</p>
                          <p className="font-semibold text-slate-800">{company.legalRepresentative}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">RFC</p>
                          <p className="font-semibold text-slate-800">{company.rfc}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-slate-500">Contacto</p>
                          <p className="font-semibold text-slate-800 text-xs">{company.contactEmail}</p>
                          <p className="font-semibold text-slate-800 text-xs">{company.contactPhone}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Conductores Registrados</p>
                          <p className="font-semibold text-slate-800 text-2xl">{company.registeredDrivers}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Vehículos Registrados</p>
                          <p className="font-semibold text-slate-800 text-2xl">{company.registeredVehicles}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <MaterialIcon name="location_on" className="text-sm" />
                        <span>{company.address}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => handleEditCompany(company)}
                      className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors" 
                      title="Editar"
                    >
                      <MaterialIcon name="edit" />
                    </button>
                    <button 
                      onClick={() => handleEmitCertificate(company)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" 
                      title="Emitir Constancia de Registro"
                    >
                      <MaterialIcon name="description" />
                    </button>
                    <button 
                      onClick={() => handleViewDocuments(company)}
                      className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors" 
                      title="Ver Documentos"
                    >
                      <MaterialIcon name="folder" />
                    </button>
                    <button 
                      onClick={() => handleMoreOptions(company)}
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

          {filteredCompanies.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <MaterialIcon name="business" className="text-6xl text-slate-300 mb-4" />
              <p className="text-slate-400">No se encontraron empresas con los filtros aplicados</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'new' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Registrar Nueva Empresa</h2>
          
          <form className="space-y-6">
            {/* Company Info */}
            <div>
              <h3 className="text-lg font-bold text-slate-700 mb-4">Información de la Empresa</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre Comercial</label>
                  <input
                    type="text"
                    placeholder="Nombre de la empresa"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Razón Social</label>
                  <input
                    type="text"
                    placeholder="Razón social completa"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">RFC</label>
                  <input
                    type="text"
                    placeholder="ABC123456XYZ"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de Empresa</label>
                  <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option>Plataforma Digital</option>
                    <option>Red de Transporte</option>
                    <option>Servicio Complementario</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Número de Registro</label>
                  <input
                    type="text"
                    placeholder="RDT-2024-XXX"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Fecha de Registro</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>

            {/* Legal Representative */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-slate-700 mb-4">Representante Legal</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre Completo</label>
                  <input
                    type="text"
                    placeholder="Nombre del representante legal"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-slate-700 mb-4">Información de Contacto</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Correo Electrónico</label>
                  <input
                    type="email"
                    placeholder="contacto@empresa.com"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Teléfono</label>
                  <input
                    type="tel"
                    placeholder="222-123-4567"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Dirección</label>
                  <input
                    type="text"
                    placeholder="Dirección completa"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
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
                Registrar Empresa
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

      {/* Modal de Constancia de Registro */}
      {showCertificateModal && selectedCompany && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-green-600 p-6 text-white flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Constancia de Registro</h3>
                <p className="text-white/80 text-sm mt-1">Documento oficial de registro de empresa</p>
              </div>
              <button 
                onClick={() => {
                  setShowCertificateModal(false);
                  setSelectedCompany(null);
                }}
                className="size-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <MaterialIcon name="close" />
              </button>
            </div>
            
            <div className="p-8">
              {/* Certificate Preview */}
              <div className="border-2 border-slate-200 rounded-xl p-8 bg-slate-50">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">CONSTANCIA DE REGISTRO</h2>
                  <p className="text-sm text-slate-600">Secretaría de Movilidad y Transporte</p>
                  <p className="text-sm text-slate-600">Estado de Puebla</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-slate-600 mb-2">Por medio de la presente se hace constar que:</p>
                    <h3 className="text-xl font-bold text-primary mb-1">{selectedCompany.name}</h3>
                    <p className="text-sm text-slate-700">Razón Social: <strong>{selectedCompany.legalName}</strong></p>
                    <p className="text-sm text-slate-700">RFC: <strong>{selectedCompany.rfc}</strong></p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                    <p className="text-sm text-slate-700 mb-1">Se encuentra debidamente registrada como:</p>
                    <p className="text-lg font-bold text-green-800">{selectedCompany.type}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-xs text-slate-500">Número de Registro</p>
                      <p className="text-lg font-bold text-slate-800">{selectedCompany.registrationNumber}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-xs text-slate-500">Fecha de Registro</p>
                      <p className="text-lg font-bold text-slate-800">
                        {new Date(selectedCompany.registrationDate).toLocaleDateString('es-MX', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">Representante Legal</p>
                    <p className="text-base font-semibold text-slate-800">{selectedCompany.legalRepresentative}</p>
                  </div>
                </div>

                <div className="text-center text-xs text-slate-500 pt-4 border-t">
                  <p>Se expide la presente constancia para los fines que al interesado convenga.</p>
                  <p className="mt-2">Puebla, Pue. a {new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button 
                  type="button"
                  onClick={() => {
                    setShowCertificateModal(false);
                    setSelectedCompany(null);
                  }}
                  className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  onClick={generateCertificate}
                  className="flex-1 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                >
                  <MaterialIcon name="download" className="text-lg" />
                  Descargar Constancia (PDF)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Companies;
