// src/lib/api.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/v1.0';

export const API = {
  PRODUCTS_ALL: `${BASE_URL}/products/all`,
  PRODUCTS: `${BASE_URL}/products`,
  PRODUCT_BY_ID: (id: string) => `${BASE_URL}/products/${id}`,
  CATEGORIES_AND_BRANDS: `${BASE_URL}/opciones/productos`,
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,
  FRANQUICIAS_TODO: `${BASE_URL}/franchise/all`, // admin para franquicias
  FRANQUICIAS: `${BASE_URL}/franchise`, // admin para franquicias
  FRANQUICIA_BY_ID: (id: string) => `${BASE_URL}/franchise/${id}`, // Ruta para obtener franquicia por id
  UPDATE_FRANQUICIA: (id: string) => `${BASE_URL}/franchise/${id}`, // Ruta para actualizar franquicia

  MARCAS_ALL: `${BASE_URL}/brand/all`, // admin para franquicias
  MARCAS: `${BASE_URL}/brand`, // admin para franquicias
  MARCA_BY_ID: (id: string) => `${BASE_URL}/brand/${id}`, // Ruta para obtener franquicia por id
  UPDATE_MARCA: (id: string) => `${BASE_URL}/brand/${id}`, // Ruta para actualizar franquicia

  CATEGORIAS_ALL: `${BASE_URL}/categories/all`, 
  CATEGORIAS: `${BASE_URL}/categories/`, 
  CATEGORIA_BY_ID: (id: string) => `${BASE_URL}/categories/${id}`, // Ruta para obtener franquicia por id

}
