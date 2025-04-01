// src/lib/api.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/v1.0';

export const API = {
  PRODUCTS: `${BASE_URL}/products`,
  PRODUCT_BY_ID: (id: string) => `${BASE_URL}/products/${id}`,
  CATEGORIES_AND_BRANDS: `${BASE_URL}/opciones/productos`,
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,
  FRANQUICIAS: `${BASE_URL}/franchise/all`, // admin para franquicias
  FRANQUICIA_BY_ID: (id: string) => `${BASE_URL}/franchise/${id}`, // Ruta para obtener franquicia por id
  UPDATE_FRANQUICIA: (id: string) => `${BASE_URL}/franchise/${id}`, // Ruta para actualizar franquicia
}
