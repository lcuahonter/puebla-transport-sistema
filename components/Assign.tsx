
import React, { useState, useMemo } from 'react';
import { MaterialIcon, PUEBLA_LOGO } from '../constants';

interface AssignProps {
  onBack: () => void;
}

const Assign: React.FC<AssignProps> = ({ onBack }) => {
  // Mock data for selection
  const operators = [
    { id: "OP-98234-P", name: "Juan Pérez Jiménez", photo: "https://i.pravatar.cc/150?u=juan" },
    { id: "OP-11235-S", name: "Maria Garcia Lopez", photo: "https://i.pravatar.cc/150?u=maria" },
    { id: "OP-56781-M", name: "Roberto Gomez Ortiz", photo: "https://i.pravatar.cc/150?u=roberto" },
    { id: "OP-44321-L", name: "Carmen Sánchez Vega", photo: "https://i.pravatar.cc/150?u=carmen" },
    { id: "OP-33219-K", name: "Luis Morales Sosa", photo: "https://i.pravatar.cc/150?u=luis" },
  ];

  const units = [
    { id: "402", plate: "T-7892-B", status: "Disponible" },
    { id: "305", plate: "M-9908-D", status: "Disponible" },
    { id: "221", plate: "L-1109-F", status: "Disponible" },
    { id: "501", plate: "ABC-123-X", status: "Disponible" },
  ];

  const [selectedOperator, setSelectedOperator] = useState<typeof operators[0] | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<typeof units[0] | null>(null);
  const [isSearchingOperator, setIsSearchingOperator] = useState(false);
  const [isSearchingUnit, setIsSearchingUnit] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // New states for the linking process
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const filteredOperators = useMemo(() => {
    return operators.filter(op => 
      op.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      op.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredUnits = useMemo(() => {
    return units.filter(u => 
      u.id.includes(searchQuery) || 
      u.plate.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const canLink = selectedOperator && selectedUnit && !isProcessing;

  const handleLink = () => {
    if (!canLink) return;
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1500);
  };

  const resetForm = () => {
    setSelectedOperator(null);
    setSelectedUnit(null);
    setIsSuccess(false);
    setSearchQuery('');
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto py-12 animate-in zoom-in-95 duration-500">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden text-center">
          <div className="bg-status-success h-2"></div>
          <div className="p-12 flex flex-col items-center">
            <div className="size-24 bg-green-50 text-status-success rounded-full flex items-center justify-center mb-6 shadow-inner animate-bounce">
              <MaterialIcon name="check_circle" className="text-6xl" fill />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">¡Asignación Exitosa!</h2>
            <p className="text-slate-500 mt-2 max-w-sm">
              La unidad <strong>#{selectedUnit?.id}</strong> ha sido vinculada correctamente al operador <strong>{selectedOperator?.name}</strong>.
            </p>

            <div className="mt-10 w-full grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center">
                <img src={selectedOperator?.photo} className="size-12 rounded-full mb-2 object-cover" alt="" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Operador</p>
                <p className="text-xs font-bold text-slate-800">{selectedOperator?.name}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center">
                <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
                  <MaterialIcon name="directions_bus" />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Unidad</p>
                <p className="text-xs font-bold text-slate-800">#{selectedUnit?.id} • {selectedUnit?.plate}</p>
              </div>
            </div>

            <div className="mt-10 flex flex-col w-full gap-3">
              <button 
                onClick={resetForm}
                className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:brightness-110 transition-all shadow-lg"
              >
                Nueva Asignación
              </button>
              <button 
                onClick={onBack}
                className="w-full py-4 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all"
              >
                Volver al Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="size-10 rounded-full hover:bg-slate-100 text-primary flex items-center justify-center transition-colors">
            <MaterialIcon name="arrow_back" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Nueva Asignación de Unidad</h1>
            <p className="text-sm text-slate-500">Vincule a un operador con un activo de transporte disponible.</p>
          </div>
        </div>
        <img src={PUEBLA_LOGO} alt="Puebla" className="h-12 object-contain grayscale opacity-30" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Step 1: Operator Selection */}
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className={`size-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${selectedOperator ? 'bg-status-success text-white' : 'bg-primary text-white'}`}>
                {selectedOperator ? <MaterialIcon name="check" className="text-lg" /> : '1'}
              </span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Identificación de Operador</span>
            </div>
            
            {!selectedOperator ? (
              <div 
                onClick={() => { setIsSearchingOperator(true); setSearchQuery(''); }}
                className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200 cursor-pointer hover:border-primary transition-colors group"
              >
                <div className="size-12 rounded-lg bg-white flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                  <MaterialIcon name="person_search" className="text-3xl" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-900 font-bold text-sm">Buscar Operador</p>
                  <p className="text-slate-500 text-xs">Escriba nombre o ID de empleado</p>
                </div>
                <MaterialIcon name="add_circle" className="text-slate-300 group-hover:text-primary transition-colors" />
              </div>
            ) : (
              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
                <img src={selectedOperator.photo} className="size-12 rounded-lg object-cover" alt="" />
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 font-bold text-sm truncate">{selectedOperator.name}</p>
                  <p className="text-slate-500 text-xs">{selectedOperator.id}</p>
                </div>
                <button 
                  onClick={() => setSelectedOperator(null)}
                  className="text-puebla-maroon hover:bg-puebla-maroon/10 p-2 rounded-lg transition-colors"
                >
                  <MaterialIcon name="close" className="text-xl" />
                </button>
              </div>
            )}
          </section>

          {/* Step 2: Unit Selection */}
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className={`size-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${selectedUnit ? 'bg-status-success text-white' : 'bg-primary text-white'}`}>
                {selectedUnit ? <MaterialIcon name="check" className="text-lg" /> : '2'}
              </span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Selección de Unidad</span>
            </div>

            {!selectedUnit ? (
              <div 
                onClick={() => { setIsSearchingUnit(true); setSearchQuery(''); }}
                className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200 cursor-pointer hover:border-primary transition-colors group"
              >
                <div className="size-12 rounded-lg bg-white flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                  <MaterialIcon name="directions_bus" className="text-3xl" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-900 font-bold text-sm">Seleccionar Unidad</p>
                  <p className="text-slate-500 text-xs">Busque por número o placas</p>
                </div>
                <MaterialIcon name="add_circle" className="text-slate-300 group-hover:text-primary transition-colors" />
              </div>
            ) : (
              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
                <div className="size-12 rounded-lg bg-primary text-white flex items-center justify-center">
                  <MaterialIcon name="commute" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-900 font-bold text-sm">Unidad #{selectedUnit.id}</p>
                  <p className="text-slate-500 text-xs">Placas: {selectedUnit.plate}</p>
                </div>
                <button 
                  onClick={() => setSelectedUnit(null)}
                  className="text-puebla-maroon hover:bg-puebla-maroon/10 p-2 rounded-lg transition-colors"
                >
                  <MaterialIcon name="close" className="text-xl" />
                </button>
              </div>
            )}
          </section>
        </div>

        {/* Preview / Confirmation */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden">
          <MaterialIcon name="assignment" className="absolute -right-8 -top-8 text-[200px] text-white/5 rotate-12" />
          
          <div>
            <h3 className="text-lg font-bold mb-6">Detalle de la Operación</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className={`size-1.5 rounded-full mt-2 transition-colors ${selectedOperator ? 'bg-status-success shadow-[0_0_8px_#078836]' : 'bg-puebla-gold'}`}></div>
                <div>
                  <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Operador Seleccionado</p>
                  <p className={`text-sm font-medium mt-0.5 ${selectedOperator ? 'text-white' : 'italic text-white/60'}`}>
                    {selectedOperator ? selectedOperator.name : 'Pendiente de selección...'}
                  </p>
                  {selectedOperator && <p className="text-[10px] text-white/40 mt-0.5">ID: {selectedOperator.id}</p>}
                </div>
              </div>
              <div className="flex gap-4">
                <div className={`size-1.5 rounded-full mt-2 transition-colors ${selectedUnit ? 'bg-status-success shadow-[0_0_8px_#078836]' : 'bg-puebla-gold'}`}></div>
                <div>
                  <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Unidad Asignada</p>
                  <p className={`text-sm font-medium mt-0.5 ${selectedUnit ? 'text-white' : 'italic text-white/60'}`}>
                    {selectedUnit ? `Unidad #${selectedUnit.id}` : 'Pendiente de selección...'}
                  </p>
                  {selectedUnit && <p className="text-[10px] text-white/40 mt-0.5">Placas: {selectedUnit.plate}</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 space-y-4">
            <div className="flex items-start gap-3 p-4 bg-white/10 rounded-xl border border-white/10">
              <MaterialIcon name="info" className="text-puebla-gold" />
              <p className="text-[11px] leading-snug text-white/70">
                Al confirmar, el sistema registrará la vinculación de forma inmediata en el historial de uso de flota.
              </p>
            </div>
            <button 
              disabled={!canLink}
              onClick={handleLink}
              className={`w-full font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all ${
                canLink 
                  ? 'bg-puebla-gold text-white hover:brightness-110 active:scale-95' 
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Procesando...</span>
                </>
              ) : (
                <>
                  <span>Vincular Activos</span>
                  <MaterialIcon name="link" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Operator Search Modal */}
      {isSearchingOperator && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-6 border-b border-slate-100 flex items-center gap-4">
              <div className="flex-1 relative">
                <MaterialIcon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  autoFocus
                  type="text"
                  placeholder="Buscar operador..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button onClick={() => setIsSearchingOperator(false)} className="size-10 rounded-full hover:bg-slate-100 flex items-center justify-center">
                <MaterialIcon name="close" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {filteredOperators.map(op => (
                <div 
                  key={op.id}
                  onClick={() => { setSelectedOperator(op); setIsSearchingOperator(false); }}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-100"
                >
                  <img src={op.photo} className="size-12 rounded-xl object-cover" alt="" />
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 text-sm">{op.name}</p>
                    <p className="text-slate-400 text-xs">{op.id}</p>
                  </div>
                  <MaterialIcon name="chevron_right" className="text-slate-300" />
                </div>
              ))}
              {filteredOperators.length === 0 && (
                <div className="py-12 text-center text-slate-400">
                  <MaterialIcon name="person_off" className="text-4xl mb-2" />
                  <p className="text-sm">No se encontraron operadores</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Unit Search Modal */}
      {isSearchingUnit && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-6 border-b border-slate-100 flex items-center gap-4">
              <div className="flex-1 relative">
                <MaterialIcon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  autoFocus
                  type="text"
                  placeholder="Buscar unidad (número o placa)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button onClick={() => setIsSearchingUnit(false)} className="size-10 rounded-full hover:bg-slate-100 flex items-center justify-center">
                <MaterialIcon name="close" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {filteredUnits.map(unit => (
                <div 
                  key={unit.id}
                  onClick={() => { setSelectedUnit(unit); setIsSearchingUnit(false); }}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-100"
                >
                  <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <MaterialIcon name="commute" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 text-sm">Unidad #{unit.id}</p>
                    <p className="text-slate-400 text-xs">Placas: {unit.plate}</p>
                  </div>
                  <span className="px-2 py-1 rounded-md bg-green-50 text-status-success text-[10px] font-bold uppercase">{unit.status}</span>
                  <MaterialIcon name="chevron_right" className="text-slate-300" />
                </div>
              ))}
              {filteredUnits.length === 0 && (
                <div className="py-12 text-center text-slate-400">
                  <MaterialIcon name="bus_alert" className="text-4xl mb-2" />
                  <p className="text-sm">No hay unidades disponibles con esos datos</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assign;
