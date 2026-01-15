
export type TabType = 'inicio' | 'personal' | 'asignar' | 'unidades' | 'ajustes' | 'concesiones' | 'permisos' | 'revista' | 'rutas' | 'certificaciones' | 'empresas';

export interface Operator {
  id: string;
  name: string;
  employeeId: string;
  licenseType: string;
  licenseStatus: 'Vigente' | 'Por Vencer' | 'Vencida';
  assignedUnit: string | null;
  status: 'active' | 'away' | 'offline';
  photo: string;
  hasCertification?: boolean;
  certificationDate?: string;
  certificationExpiry?: string;
  badgeNumber?: string;
}

export interface Unit {
  id: string;
  unitNumber: string;
  plate: string;
  operatorName: string | null;
  status: 'Disponible' | 'En Uso' | 'Mantenimiento';
  concessionId?: string;
  brand?: string;
  model?: string;
  year?: number;
  revistaStatus?: 'Vigente' | 'Vencida' | 'Pendiente';
  revistaExpiry?: string;
  hasAccessibility?: boolean;
  hasAdvertising?: boolean;
}

export interface LiveStatus {
  id: string;
  operatorName: string;
  unitNumber: string;
  status: 'ACTIVO' | 'OPERANDO' | 'TALLER' | 'INACTIVO';
  lastSeen: string;
}

// Concesiones
export interface Concession {
  id: string;
  number: string;
  type: 'Servicio Público' | 'Transporte Colectivo' | 'Transporte Individual';
  status: 'Activa' | 'Suspendida' | 'Cancelada';
  ownerId: string;
  ownerName: string;
  ownerType: 'Física' | 'Moral';
  issueDate: string;
  expiryDate?: string;
  route?: string;
  vehicleCount: number;
  vehicles: string[];
  notes?: string;
}

export interface ConcessionTransfer {
  id: string;
  concessionId: string;
  fromOwnerId: string;
  toOwnerId: string;
  transferDate: string;
  vehicleChange: boolean;
  oldVehicleId?: string;
  newVehicleId?: string;
  status: 'Pendiente' | 'Aprobada' | 'Rechazada';
  documents: string[];
}

// Permisos Mercantiles
export interface MerchantPermit {
  id: string;
  number: string;
  type: 'Escolar' | 'Personal' | 'Turismo' | 'Taxi';
  status: 'Vigente' | 'Suspendido' | 'Vencido';
  holderId: string;
  holderName: string;
  holderType: 'Física' | 'Moral';
  vehicleId: string;
  plateNumber: string;
  issueDate: string;
  expiryDate: string;
  route?: string;
  notes?: string;
}

// Revista Vehicular
export interface VehicleInspection {
  id: string;
  vehicleId: string;
  unitNumber: string;
  plateNumber: string;
  inspectionDate: string;
  nextInspectionDate: string;
  status: 'Aprobada' | 'Rechazada' | 'Pendiente';
  inspector: string;
  physicalCondition: InspectionChecklist;
  mechanicalCondition: InspectionChecklist;
  accessibility: AccessibilityChecklist;
  safetyEquipment: SafetyChecklist;
  observations?: string;
  approvalDocument?: string;
}

export interface InspectionChecklist {
  bodywork: boolean;
  paint: boolean;
  seats: boolean;
  windows: boolean;
  lights: boolean;
  [key: string]: boolean;
}

export interface AccessibilityChecklist {
  ramp: boolean;
  lowFloor: boolean;
  reservedSeats: boolean;
  signage: boolean;
  [key: string]: boolean;
}

export interface SafetyChecklist {
  fireExtinguisher: boolean;
  firstAidKit: boolean;
  emergencyExits: boolean;
  seatBelts: boolean;
  [key: string]: boolean;
}

// Rutas
export interface Route {
  id: string;
  number: string;
  name: string;
  type: 'Urbana' | 'Suburbana' | 'Foránea';
  status: 'Activa' | 'Suspendida' | 'En Modificación';
  origin: string;
  destination: string;
  stops: RouteStop[];
  assignedUnits: number;
  terminals: string[];
  creationDate: string;
  lastModified?: string;
  observations?: string;
}

export interface RouteStop {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  order: number;
}

export interface Terminal {
  id: string;
  name: string;
  type: 'Base' | 'Terminal' | 'Sitio';
  address: string;
  latitude: number;
  longitude: number;
  capacity: number;
  assignedRoutes: string[];
  status: 'Activo' | 'Inactivo';
  proposalDate?: string;
  approvalDate?: string;
}

// Certificaciones
export interface OperatorCertification {
  id: string;
  operatorId: string;
  operatorName: string;
  certificationType: 'Primera Vez' | 'Renovación' | 'Duplicado';
  courseCompleted: boolean;
  courseName?: string;
  courseDate?: string;
  examPassed: boolean;
  examDate?: string;
  examScore?: number;
  badgeNumber: string;
  issueDate: string;
  expiryDate: string;
  status: 'Vigente' | 'Vencido' | 'Suspendido';
  documents: string[];
}

// Empresas de Redes de Transporte
export interface TransportNetworkCompany {
  id: string;
  name: string;
  legalName: string;
  type: 'Plataforma Digital' | 'Red de Transporte' | 'Servicio Complementario';
  rfc: string;
  registrationNumber: string;
  registrationDate: string;
  status: 'Activa' | 'Suspendida' | 'Cancelada';
  legalRepresentative: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  registeredDrivers: number;
  registeredVehicles: number;
  documents: string[];
  notes?: string;
}

// Propietarios/Concesionarios
export interface Owner {
  id: string;
  name: string;
  type: 'Física' | 'Moral';
  rfc: string;
  curp?: string;
  address: string;
  phone: string;
  email: string;
  documents: string[];
  concessions: string[];
  permits: string[];
}

// Publicidad en Unidades
export interface AdvertisingPermit {
  id: string;
  vehicleId: string;
  unitNumber: string;
  company: string;
  startDate: string;
  endDate: string;
  location: 'Exterior' | 'Interior' | 'Ambos';
  status: 'Activo' | 'Vencido';
  approvalDocument: string;
}
