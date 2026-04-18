export type EstadoSolicitud =
  | "Pendiente verificación"
  | "Cotizado"
  | "Pago recibido"
  | "En proceso"
  | "Entregado";

export type Solicitud = {
  id: string;
  nombre: string;
  whatsapp: string;
  documentoId: string;
  documentoNombre: string;
  datos: Record<string, string>;
  estado: EstadoSolicitud;
  fecha: string;
  precio: number;
};

const KEY = "zasdoc_solicitudes";

const seed: Solicitud[] = [
  {
    id: "sol-001",
    nombre: "María Rojas",
    whatsapp: "+51 987 654 321",
    documentoId: "copia-literal",
    documentoNombre: "Copia Literal",
    datos: { "N° Partida Electrónica": "11234567" },
    estado: "Pendiente verificación",
    fecha: new Date().toISOString(),
    precio: 35,
  },
  {
    id: "sol-002",
    nombre: "Carlos Quispe",
    whatsapp: "+51 912 345 678",
    documentoId: "partida-nacimiento",
    documentoNombre: "Partida de Nacimiento",
    datos: { DNI: "47281930" },
    estado: "En proceso",
    fecha: new Date(Date.now() - 86400000).toISOString(),
    precio: 30,
  },
  {
    id: "sol-003",
    nombre: "Lucía Fernández",
    whatsapp: "+51 999 111 222",
    documentoId: "record-vehicular",
    documentoNombre: "Récord del Conductor",
    datos: { "N° de Placa": "ABC-123" },
    estado: "Entregado",
    fecha: new Date(Date.now() - 2 * 86400000).toISOString(),
    precio: 35,
  },
];

export const getSolicitudes = (): Solicitud[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw);
  } catch {
    return seed;
  }
};

export const saveSolicitudes = (list: Solicitud[]) => {
  localStorage.setItem(KEY, JSON.stringify(list));
};

export const addSolicitud = (s: Solicitud) => {
  const list = getSolicitudes();
  const next = [s, ...list];
  saveSolicitudes(next);
  return next;
};

export const updateEstado = (id: string, estado: EstadoSolicitud) => {
  const list = getSolicitudes().map((s) => (s.id === id ? { ...s, estado } : s));
  saveSolicitudes(list);
  return list;
};
