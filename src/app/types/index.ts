// src/types/index.ts

export type Producto = {
  id: string
  nombre: string
  precio: number
  oferta: number
  imagen: string
  categoria: string
  marca: string
  status: 'sellado' | 'no_sellado'
}

export type Franquicia = {
  id: string
  name: string
  status: 'active' | 'inactive'
}

export type Categoria = {
  id: string
  name: string
  status: 'active' | 'inactive'
}

export type Marca = {
  id: string
  name: string
  status: 'active' | 'inactive'
}
