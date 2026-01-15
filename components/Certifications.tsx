import React, { useState } from 'react';
import { MaterialIcon } from '../constants';
import { OperatorCertification } from '../types';

const Certifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'new' | 'courses'>('list');
  const [searchTerm, setSearchTerm] = useState('');

  // Handlers
  const handlePrintBadge = (cert: OperatorCertification) => {
    alert(`🖨️ Imprimiendo gafete\n\nOperador: ${cert.operatorName}\nTipo: ${cert.certificationType}\nGenerando documento oficial con fotografía...`);
  };

  const handleDuplicate = (cert: OperatorCertification) => {
    if (confirm(`¿Emitir duplicado de gafete para ${cert.operatorName}?\n\nSe aplicará el cargo correspondiente.`)) {
      alert(`✅ Duplicado autorizado\n\nSe generará nuevo gafete con la leyenda "DUPLICADO"\nOperador: ${cert.operatorName}\nTipo: ${cert.certificationType}`);
    }
  };

  const handleMoreOptions = (cert: OperatorCertification) => {
    const options = ['Ver Historial', 'Suspender Gafete', 'Actualizar Foto', 'Ver Cursos'];
    const choice = prompt(`Opciones para ${cert.operatorName}:\n\n${options.map((o, i) => `${i+1}. ${o}`).join('\n')}\n\nIngrese el número de opción:`);
    if (choice && parseInt(choice) > 0 && parseInt(choice) <= options.length) {
      alert(`Opción seleccionada: ${options[parseInt(choice) - 1]}`);
    }
  };

  const handleEnrollCourse = () => {
    alert('📚 Inscribiendo operador a curso\n\nDisponibles:\n- Manejo Defensivo\n- Primeros Auxilios\n- Atención al Usuario\n- Normatividad de Transporte');
  };
  const [filterStatus, setFilterStatus] = useState<string>('Todos');

  // Mock data
  const [certifications] = useState<OperatorCertification[]>([
    {
      id: '1',
      operatorId: 'OP-001',
      operatorName: 'Juan Pérez García',
      certificationType: 'Primera Vez',
      courseCompleted: true,
      courseName: 'Curso de Inducción al Transporte Público',
      courseDate: '2024-01-10',
      examPassed: true,
      examDate: '2024-01-15',
      examScore: 95,
      badgeNumber: 'GAF-2024-001',
      issueDate: '2024-01-20',
      expiryDate: '2026-01-20',
      status: 'Vigente',
      documents: ['certificado.pdf', 'examen.pdf'],
    },
    {
      id: '2',
      operatorId: 'OP-002',
      operatorName: 'María González López',
      certificationType: 'Renovación',
      courseCompleted: true,
      courseName: 'Curso de Actualización',
      courseDate: '2024-02-05',
      examPassed: true,
      examDate: '2024-02-10',
      examScore: 88,
      badgeNumber: 'GAF-2024-002',
      issueDate: '2024-02-15',
      expiryDate: '2026-02-15',
      status: 'Vigente',
      documents: ['certificado.pdf'],
    },
  ]);

  const filteredCertifications = certifications.filter(c => {
    const matchesStatus = filterStatus === 'Todos' || c.status === filterStatus;
    const matchesSearch = c.operatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.badgeNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Vigente': return 'bg-green-100 text-green-800';
      case 'Vencido': return 'bg-red-100 text-red-800';
      case 'Suspendido': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Primera Vez': return 'bg-blue-100 text-blue-800';
      case 'Renovación': return 'bg-purple-100 text-purple-800';
      case 'Duplicado': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Certificaciones de Operadores</h1>
          <p className="text-sm text-slate-500 mt-1">Expedición de gafetes y certificaciones</p>
        </div>
        <button
          onClick={() => setActiveTab('new')}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors shadow-lg"
        >
          <MaterialIcon name="add_circle" />
          <span className="font-semibold">Nueva Certificación</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-green-100 text-green-800">
              <MaterialIcon name="verified" fill />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">
                {certifications.filter(c => c.status === 'Vigente').length}
              </p>
              <p className="text-xs text-slate-500">Vigentes</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-800">
              <MaterialIcon name="school" fill />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">
                {certifications.filter(c => c.courseCompleted).length}
              </p>
              <p className="text-xs text-slate-500">Cursos Completados</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-purple-100 text-purple-800">
              <MaterialIcon name="badge" fill />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{certifications.length}</p>
              <p className="text-xs text-slate-500">Gafetes Emitidos</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-orange-100 text-orange-800">
              <MaterialIcon name="content_copy" fill />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">
                {certifications.filter(c => c.certificationType === 'Duplicado').length}
              </p>
              <p className="text-xs text-slate-500">Duplicados</p>
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
          Certificaciones
        </button>
        <button
          onClick={() => setActiveTab('new')}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'new'
              ? 'text-primary border-b-2 border-primary'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Nueva Certificación
        </button>
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'courses'
              ? 'text-primary border-b-2 border-primary'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Cursos
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
                  placeholder="Buscar por operador o gafete..."
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
                <option>Vigente</option>
                <option>Vencido</option>
                <option>Suspendido</option>
              </select>
            </div>
          </div>

          {/* Certifications List */}
          <div className="grid gap-4">
            {filteredCertifications.map((cert) => (
              <div key={cert.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className="p-4 rounded-xl bg-primary/10">
                      <MaterialIcon name="badge" className="text-3xl text-primary" fill />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-bold text-slate-800">{cert.operatorName}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(cert.status)}`}>
                          {cert.status}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(cert.certificationType)}`}>
                          {cert.certificationType}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-slate-500">Número de Gafete</p>
                          <p className="font-semibold text-slate-800">{cert.badgeNumber}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Curso</p>
                          <p className="font-semibold text-slate-800">
                            {cert.courseCompleted ? (
                              <span className="flex items-center gap-1 text-green-600">
                                <MaterialIcon name="check_circle" className="text-sm" />
                                Completado
                              </span>
                            ) : (
                              <span className="text-red-600">Pendiente</span>
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500">Examen</p>
                          <p className="font-semibold text-slate-800">
                            {cert.examPassed ? (
                              <span className="flex items-center gap-1 text-green-600">
                                <MaterialIcon name="check_circle" className="text-sm" />
                                {cert.examScore}%
                              </span>
                            ) : (
                              <span className="text-red-600">No Aprobado</span>
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500">Vigencia</p>
                          <p className="font-semibold text-slate-800">
                            {new Date(cert.expiryDate).toLocaleDateString('es-MX', { month: 'short', year: 'numeric' })}
                          </p>
                        </div>
                      </div>

                      {cert.courseName && (
                        <div className="text-xs text-slate-500">
                          <MaterialIcon name="school" className="text-sm mr-1" />
                          {cert.courseName} - {cert.courseDate && new Date(cert.courseDate).toLocaleDateString('es-MX')}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => handlePrintBadge(cert)}
                      className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors" 
                      title="Imprimir Gafete"
                    >
                      <MaterialIcon name="badge" />
                    </button>
                    <button 
                      onClick={() => handleDuplicate(cert)}
                      className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors" 
                      title="Duplicado"
                    >
                      <MaterialIcon name="content_copy" />
                    </button>
                    <button 
                      onClick={() => handleMoreOptions(cert)}
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
        </div>
      )}

      {activeTab === 'new' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Nueva Certificación de Operador</h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Operador</label>
                <input
                  type="text"
                  placeholder="Buscar operador..."
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de Certificación</label>
                <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>Primera Vez</option>
                  <option>Renovación</option>
                  <option>Duplicado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Número de Gafete</label>
                <input
                  type="text"
                  placeholder="GAF-2024-XXX"
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
            </div>

            {/* Course Info */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                <MaterialIcon name="school" />
                Información del Curso
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre del Curso</label>
                  <input
                    type="text"
                    placeholder="Curso de..."
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Fecha del Curso</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-5 h-5 text-primary rounded focus:ring-primary/20" />
                    <span className="text-sm font-semibold text-slate-700">Curso Completado</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Exam Info */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                <MaterialIcon name="quiz" />
                Información del Examen
              </h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Fecha del Examen</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Calificación</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0-100"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 mt-8">
                    <input type="checkbox" className="w-5 h-5 text-primary rounded focus:ring-primary/20" />
                    <span className="text-sm font-semibold text-slate-700">Examen Aprobado</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-semibold shadow-lg"
              >
                Emitir Certificación
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

      {activeTab === 'courses' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Cursos de Capacitación</h2>
          <div className="text-center py-12 text-slate-400">
            <MaterialIcon name="school" className="text-6xl mb-4" />
            <p>Gestión de cursos disponibles</p>
            <button className="mt-4 px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-semibold">
              Agregar Curso
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certifications;
