// Type definitions for the digital flow prototype

export interface PliegoCondiciones {
  id: string
  numero: string
  fechaPublicacion: string
  fechaCierre: string
  presupuestoOficial: number
  plazoContractual: string
  requisitosTecnicos: string
  requisitosJuridicos: string
}

export interface VisitaTecnica {
  idVisita: string
  idPliegoVinculado: string
  fechaVisita: string
  responsable: string
  lugar: string
  estadoVisita: "Programada" | "Autorizada" | "Realizada"
  observaciones: string
  evidencia?: File[]
}

export interface Propuesta {
  idPropuesta: string
  idPliegoVinculado: string
  documentosAnexos: File[]
  responsablePresenta: string
  fechaEnvio: string
  comentarios: string
  acuseRecibo?: string
}

export interface FlowData {
  pliego: PliegoCondiciones | null
  visitaTecnica: VisitaTecnica | null
  propuesta: Propuesta | null
}
