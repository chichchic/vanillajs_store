const API_END_POINT = 'http://127.0.0.1:3000'
export async function request(id) {
  try {
    const res = await fetch(`${API_END_POINT}/${id ? `options?id=${id}` : ''}`)
    if (!res.ok) {
      throw new Error('server error');
    }
    return await res.json();
  } catch (error) {
    throw error
  }
}