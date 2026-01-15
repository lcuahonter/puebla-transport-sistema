# 📋 Guía de Funcionalidades - Sistema de Gestión de Transporte Puebla

## Navegación Principal

El sistema está organizado en **4 secciones principales** accesibles desde el menú lateral:

---

## 🏛️ SECCIÓN ADMINISTRATIVO

### 1. Dashboard (Inicio)
**Ruta:** `/` o `inicio`  
**Ubicación:** Primer elemento del menú  
**Funcionalidades:**
- Visualización de métricas en tiempo real
- Mapa de localización de unidades
- Estado de operadores activos
- Estadísticas de flota

---

### 2. Concesiones
**Ruta:** `concesiones`  
**Ubicación:** Sección Administrativo → Concesiones  
**Pestañas disponibles:**

#### 📝 Pestaña "Listado"
- Ver todas las concesiones registradas
- Buscar por número, titular o ruta
- **Botones de acción por concesión:**
  - ✏️ **Editar** → Modificar datos de la concesión
  - 🚗 **Alta de Vehículo** → Agregar vehículo a la concesión
  - ➖ **Baja de Vehículo** → Dar de baja vehículo
  - 🔄 **Cambio de Vehículo** → Sustituir vehículo
  - 📤 **Transferir Derechos** → Transferir concesión
  - 🏷️ **Emitir Placas** → Generar placas oficiales

#### ➕ Pestaña "Nueva Concesión"
- Registrar nueva concesión
- Formulario completo con datos del titular y vehículo

#### 🔄 Pestaña "Transferencias"
- Gestionar transferencias de derechos
- Ver historial de transferencias

#### 🚗 Pestaña "Gestión de Vehículos"
- Altas, bajas y cambios de vehículos
- Historial de movimientos

#### 🏷️ Pestaña "Emisión de Placas"
- Generar placas para concesiones
- Imprimir documentación

#### ✏️ Pestaña "Editar Concesión"
- Modificar datos de propietario
- Actualizar información de contacto

---

### 3. Permisos Mercantiles
**Ruta:** `permisos`  
**Ubicación:** Sección Administrativo → Permisos  
**Tipos de permisos:**
- 🎓 **Escolares**
- 🚕 **Taxis**
- 🏖️ **Turismo**
- 👤 **Uso Personal**

**Funcionalidades:**
- Filtrar por tipo de permiso
- Buscar por número o titular
- **Botones de acción:**
  - ✏️ **Editar** → Modificar datos del permiso
  - 🖨️ **Imprimir** → Generar documento oficial
  - ⋮ **Más opciones** → Suspender, Renovar, Cancelar, Ver Historial

---

## 🔧 SECCIÓN TÉCNICO

### 4. Revista Vehicular
**Ruta:** `revista`  
**Ubicación:** Sección Técnico → Revista Vehicular  
**Pestañas disponibles:**

#### 📋 Pestaña "Historial"
- Ver todas las inspecciones realizadas
- Filtrar por estado (Aprobada, Pendiente, Rechazada)
- **Botones de acción:**
  - 👁️ **Ver Detalles** → Ver checklist completo de inspección
  - 🖨️ **Imprimir** → Certificado de inspección

#### ➕ Pestaña "Nueva Inspección"
- Realizar inspección vehicular
- **4 Categorías de evaluación:**
  1. ✅ **Condiciones Físicas** (carrocería, pintura, limpieza)
  2. 🔧 **Condiciones Mecánicas** (motor, frenos, transmisión)
  3. ♿ **Accesibilidad** (rampas, espacios, señalización)
  4. 🛡️ **Equipo de Seguridad** (extintores, botiquín, salidas)
- Cálculo automático de porcentaje de completitud
- Aprobación/rechazo automático

#### 📅 Pestaña "Programar"
- Agendar inspecciones futuras
- Calendario de citas

---

### 5. Rutas y Terminales
**Ruta:** `rutas`  
**Ubicación:** Sección Técnico → Rutas  
**Pestañas disponibles:**

#### 🚌 Pestaña "Rutas"
- Ver rutas urbanas y suburbanas
- Información de paradas y recorridos
- **Botones de acción:**
  - ✏️ **Editar** → Modificar ruta
  - 🗺️ **Ver Mapa** → Visualizar recorrido completo

#### 🏢 Pestaña "Terminales y Bases"
- Gestionar terminales y bases de operación
- Ver capacidad y rutas asignadas
- **Botones de acción:**
  - ✏️ **Editar** → Modificar terminal/base
  - 📍 **Ver Ubicación** → Coordenadas y dirección

#### 📝 Pestaña "Propuestas de Sitios"
- **Propuestas Pendientes:**
  - Ver propuestas de nuevos sitios/terminales
  - Revisar justificación y datos técnicos
  - **Botones de acción:**
    - ✅ **Aprobar** → Aprobar propuesta
    - ❌ **Rechazar** → Rechazar con motivo
    - 📋 **Revisar** → Iniciar revisión técnica
- **Propuestas Aprobadas:**
  - Historial de propuestas aceptadas
  - Fechas de propuesta y aprobación

---

## 👥 SECCIÓN OPERATIVO

### 6. Personal
**Ruta:** `personal`  
**Ubicación:** Sección Operativo → Personal  
**Funcionalidades:**
- Ver listado completo de operadores
- **Filtros rápidos:**
  - 🟢 Activos
  - ⚪ Sin Unidad Asignada
  - 🔴 Licencias Vencidas
- Buscar por nombre, ID o unidad
- Ver foto, licencia y estado
- Registrar nuevo operador

---

### 7. Certificaciones
**Ruta:** `certificaciones`  
**Ubicación:** Sección Operativo → Certificaciones  
**Pestañas disponibles:**

#### 🎫 Pestaña "Gafetes"
- Ver gafetes emitidos (Primera Vez, Renovación, Duplicado)
- Información de operador y vigencia
- **Botones de acción:**
  - 🖨️ **Imprimir Gafete** → Generar gafete oficial con foto
  - 📄 **Duplicado** → Emitir duplicado con cargo
  - ⋮ **Más opciones** → Ver Historial, Suspender, Actualizar Foto, Ver Cursos

#### ➕ Pestaña "Nuevo Gafete"
- Emitir nuevo gafete
- Seleccionar tipo (Primera Vez/Renovación/Duplicado)

#### 📚 Pestaña "Cursos"
- Ver cursos disponibles y completados
- Estadísticas de capacitación
- **Botón de acción:**
  - ➕ **Inscribir a Curso** → Inscribir operador a capacitación

**Tipos de cursos:**
- 🚗 Manejo Defensivo
- 🏥 Primeros Auxilios
- 👥 Atención al Usuario
- 📜 Normatividad de Transporte

---

## 🎯 SECCIÓN CONTROL

### 8. Control de Unidades
**Ruta:** `unidades`  
**Ubicación:** Sección Control → Unidades  
**Pestañas disponibles:**

#### 📊 Pestaña "Inventario General"
- Ver todas las unidades del sistema
- **Información detallada:**
  - ID de unidad, placas, estado
  - Operador asignado
  - **Datos del conductor:**
    - 🆔 ID del operador
    - 🎫 Tipo de licencia (A, B, C)
    - 📅 Fecha de vencimiento de licencia
  - Nivel de combustible y batería
  - Última inspección
- Estados: Disponible, En Operación, Mantenimiento, Retenido

#### 🚫 Pestaña "Vehículos Retenidos"
- Ver unidades retenidas
- Motivo y fecha de retención
- **Funcionalidad de liberación:**
  - 🔓 **Liberar Vehículo** → Proceso de liberación legal
  - Checklist de requisitos:
    - ✅ Documentación completa
    - ✅ Pago de multas
    - ✅ Cumplimiento normativo
    - ✅ Verificación técnica
    - ✅ Autorización administrativa

#### 📢 Pestaña "Permisos de Publicidad"
- Gestionar permisos publicitarios
- Ver anunciantes y vencimientos
- **Botón de acción:**
  - ➕ **Nuevo Permiso** → Autorizar publicidad en vehículo

#### 🛣️ Pestaña "Permisos Federales"
- Gestionar permisos SCT
- Validar autorizaciones federales
- **Botón de acción:**
  - ➕ **Validar Permiso** → Registrar permiso federal

---

### 9. Empresas de Redes de Transporte
**Ruta:** `empresas`  
**Ubicación:** Sección Control → Empresas  
**Funcionalidades:**
- Registrar plataformas digitales (Uber, DiDi, etc.)
- Gestionar empresas de transporte complementario
- **Filtros por tipo:**
  - 📱 Plataforma Digital
  - 🔗 Red de Transporte
  - ➕ Servicio Complementario

**Botones de acción por empresa:**
- ✏️ **Editar** → Modificar datos de la empresa
- 📄 **Emitir Constancia** → Generar constancia de registro oficial
  - Vista previa del documento
  - Datos: nombre, razón social, RFC, número de registro
  - Botón de descarga PDF
- 📁 **Ver Documentos** → Acta constitutiva, pólizas, permisos
- ⋮ **Más opciones** → Suspender, Renovar, Ver Vehículos, Ver Conductores

---

### 10. Asignar Operador-Unidad
**Ruta:** `asignar`  
**Ubicación:** Sección Control → Asignar  
**Funcionalidades:**
- Vincular operador con unidad
- Búsqueda de operadores disponibles
- Búsqueda de unidades disponibles
- Confirmar asignación

---

## ⚙️ CONFIGURACIÓN

### 11. Ajustes
**Ruta:** `ajustes`  
**Ubicación:** Menú inferior → Ajustes  
**Secciones disponibles:**

#### 👤 Cuenta
- 📋 **Perfil** → Ver/editar información de usuario
- 🔒 **Seguridad** → Cambiar contraseña, 2FA, sesiones activas
- 🔔 **Notificaciones** → Configurar alertas del sistema

#### 🎨 Preferencias
- 🌙 **Modo Oscuro** → Toggle claro/oscuro (funcional)
- 🌐 **Idioma** → Español, English, Náhuatl

#### 💬 Soporte
- ❓ **Ayuda y Soporte** → Guías, tutoriales, FAQ, contacto
- 🚪 **Cerrar Sesión** → Salir del sistema

---

## 📱 Acceso Rápido

### Búsqueda Global
Todas las secciones incluyen barra de búsqueda para filtrar contenido en tiempo real.

### Botón "Nueva" / "Registrar"
Presente en la mayoría de secciones para agregar nuevos registros rápidamente.

### Navegación por Pestañas
Las secciones principales usan pestañas para organizar diferentes funcionalidades sin salir de la vista.

---

## 🎨 Código de Colores

- 🟢 **Verde** → Activo, Aprobado, Vigente
- 🟡 **Amarillo** → Pendiente, En Revisión
- 🔴 **Rojo** → Rechazado, Vencido, Retenido
- 🔵 **Azul** → En Operación, En Ruta
- ⚪ **Gris** → Inactivo, Mantenimiento

---

## 📊 Resumen de Funcionalidades por Módulo

| Módulo | Pestañas | Funciones Principales | Impresiones |
|--------|----------|----------------------|-------------|
| Concesiones | 6 | Alta/Baja/Cambio Vehículos, Transferencias, Placas | ✅ |
| Permisos | 2 | Registro Permisos Mercantiles | ✅ |
| Revista Vehicular | 3 | Inspecciones, Checklists, Programación | ✅ |
| Rutas | 3 | Gestión Rutas, Terminales, Propuestas | ❌ |
| Personal | 1 | Gestión Operadores | ❌ |
| Certificaciones | 3 | Gafetes, Cursos, Duplicados | ✅ |
| Unidades | 4 | Inventario, Retenciones, Publicidad, Permisos Fed. | ❌ |
| Empresas | 2 | Registro, Constancias | ✅ |
| Asignar | 1 | Vincular Operador-Unidad | ❌ |
| Ajustes | 1 | Configuración del Sistema | ❌ |

---

**Última actualización:** 14 de enero de 2026  
**Versión del sistema:** 2.4.0  
**Gobierno de Puebla - Secretaría de Movilidad y Transporte**
