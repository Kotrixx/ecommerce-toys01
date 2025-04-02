// src/lib/fetchData.ts

const fetchData = async (url: string, token: string) => {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) throw new Error('Error al cargar los datos')
    const data = await res.json()
    return data
  } catch (error) {
    throw new Error('Error al obtener los datos')
  }
}

export default fetchData
