
export type TabType = 'inicio' | 'personal' | 'asignar' | 'unidades' | 'ajustes';

export interface Operator {
  id: string;
  name: string;
  employeeId: string;
  licenseType: string;
  licenseStatus: 'Vigente' | 'Por Vencer' | 'Vencida';
  assignedUnit: string | null;
  status: 'active' | 'away' | 'offline';
  photo: string;
}

export interface Unit {
  id: string;
  unitNumber: string;
  plate: string;
  operatorName: string | null;
  status: 'Disponible' | 'En Uso' | 'Mantenimiento';
}

export interface LiveStatus {
  id: string;
  operatorName: string;
  unitNumber: string;
  status: 'ACTIVO' | 'OPERANDO' | 'TALLER' | 'INACTIVO';
  lastSeen: string;
}
