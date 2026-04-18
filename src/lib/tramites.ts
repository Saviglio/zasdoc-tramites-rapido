import {
  Plane, Building2, Baby, Car, Cross, Scale, Search, GraduationCap, Heart, MoreHorizontal,
  type LucideIcon,
} from "lucide-react";

export type FormType = "partida" | "sunarp" | "vehicular" | "migracion" | "generico";

export type Documento = {
  id: string;
  nombre: string;
  precio: number; // total estimado en soles
  tasaEstado: number;
  formType: FormType;
};

export type Categoria = {
  id: string;
  nombre: string;
  icon: LucideIcon;
  descripcion: string;
  documentos: Documento[];
};

export const categorias: Categoria[] = [
  {
    id: "migracion",
    nombre: "Migración",
    icon: Plane,
    descripcion: "Movimientos migratorios, certificados y constancias.",
    documentos: [
      { id: "mov-migratorio", nombre: "Certificado de Movimiento Migratorio", precio: 45, tasaEstado: 30, formType: "migracion" },
      { id: "constancia-extranjero", nombre: "Constancia de Permanencia", precio: 60, tasaEstado: 40, formType: "migracion" },
    ],
  },
  {
    id: "inmobiliarias",
    nombre: "Propiedades inmobiliarias",
    icon: Building2,
    descripcion: "Trámites SUNARP de predios y propiedades.",
    documentos: [
      { id: "copia-literal", nombre: "Copia Literal", precio: 35, tasaEstado: 23, formType: "sunarp" },
      { id: "vigencia-poder", nombre: "Vigencia de Poder", precio: 40, tasaEstado: 25, formType: "sunarp" },
      { id: "certificado-registral", nombre: "Certificado Registral Inmobiliario", precio: 55, tasaEstado: 36, formType: "sunarp" },
    ],
  },
  {
    id: "nacimiento",
    nombre: "Nacimiento",
    icon: Baby,
    descripcion: "Partidas y actas de nacimiento.",
    documentos: [
      { id: "partida-nacimiento", nombre: "Partida de Nacimiento", precio: 30, tasaEstado: 18, formType: "partida" },
    ],
  },
  {
    id: "vehicular",
    nombre: "Vehicular",
    icon: Car,
    descripcion: "Tarjetas, récords y certificados vehiculares.",
    documentos: [
      { id: "record-vehicular", nombre: "Récord del Conductor", precio: 35, tasaEstado: 20, formType: "vehicular" },
      { id: "tarjeta-identificacion", nombre: "Tarjeta de Identificación Vehicular", precio: 50, tasaEstado: 33, formType: "vehicular" },
    ],
  },
  {
    id: "defuncion",
    nombre: "Defunción",
    icon: Cross,
    descripcion: "Partidas y certificados de defunción.",
    documentos: [
      { id: "partida-defuncion", nombre: "Partida de Defunción", precio: 30, tasaEstado: 18, formType: "partida" },
    ],
  },
  {
    id: "juridica",
    nombre: "Persona jurídica",
    icon: Scale,
    descripcion: "Vigencias y constancias de personas jurídicas.",
    documentos: [
      { id: "vigencia-pj", nombre: "Vigencia de Persona Jurídica", precio: 40, tasaEstado: 25, formType: "sunarp" },
    ],
  },
  {
    id: "antecedentes",
    nombre: "Antecedentes",
    icon: Search,
    descripcion: "Penales, policiales y judiciales.",
    documentos: [
      { id: "antecedentes-penales", nombre: "Antecedentes Penales", precio: 45, tasaEstado: 30, formType: "generico" },
      { id: "antecedentes-policiales", nombre: "Antecedentes Policiales", precio: 40, tasaEstado: 25, formType: "generico" },
    ],
  },
  {
    id: "educacion",
    nombre: "Educación",
    icon: GraduationCap,
    descripcion: "Constancias y certificados educativos.",
    documentos: [
      { id: "constancia-estudios", nombre: "Constancia de Estudios", precio: 35, tasaEstado: 20, formType: "generico" },
    ],
  },
  {
    id: "matrimonio",
    nombre: "Matrimonio",
    icon: Heart,
    descripcion: "Partidas y actas de matrimonio.",
    documentos: [
      { id: "partida-matrimonio", nombre: "Partida de Matrimonio", precio: 30, tasaEstado: 18, formType: "partida" },
    ],
  },
  {
    id: "otros",
    nombre: "Otros trámites",
    icon: MoreHorizontal,
    descripcion: "¿No encuentras tu trámite? Te ayudamos.",
    documentos: [
      { id: "otro", nombre: "Otro trámite", precio: 50, tasaEstado: 30, formType: "generico" },
    ],
  },
];

export const findDocumento = (docId: string) => {
  for (const c of categorias) {
    const d = c.documentos.find((x) => x.id === docId);
    if (d) return { categoria: c, documento: d };
  }
  return null;
};

export const FEE_ZASDOC = 12;
