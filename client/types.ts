export interface Municipios {
  citiesFiltered: Citie[]
}
export interface Cities{
  cities: Citie[];
}

export interface Citie {
  d_estado: string
  c_estado: number
  muni_id: Municipio[]
  id?: string
}

export interface Municipio {
  D_mnpio: string
  c_mnpio: number
  colony_id: Colonia[]
  id?: string
}

export interface Colonia {
  d_codigo: number
  d_asenta: string
  d_tipo_asenta: string
  d_ciudad?: string
  d_CP: string
  c_oficina: string
  c_tipo_asenta: string
  id_asenta_cpcons: string
  d_zona: string
  c_cve_ciudad?: string
  id?: string
}


export interface CityByID {
  c_estado: number
  d_estado: string
  D_mnpio: string
  c_mnpio: number
  c_cve_ciudad: string
  d_zona: string
  id_asenta_cpcons: string
  c_tipo_asenta: string
  c_oficina: string
  d_CP: string
  d_ciudad: string
  d_tipo_asenta: string
  d_asenta: string
  d_codigo: number
}



