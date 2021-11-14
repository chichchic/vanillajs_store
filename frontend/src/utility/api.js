const API_END_POINT = 'http://127.0.0.1:3000/api/product'
export async function request(id) {
  try {
    const res = await fetch(`${API_END_POINT}/${id ? `getOptionsById/${id}` : 'getList'}`)
    if (!res.ok) {
      throw new Error('server error');
    }
    return await res.json();
  } catch (error) {
    throw error
  }
}