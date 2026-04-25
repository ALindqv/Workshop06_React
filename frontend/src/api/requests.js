const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
const BASE = `${API_BASE_URL}/api/posts`

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (res.status === 204) return null  // DELETE returns no body
  const data = await res.json()
  if (!res.ok) throw new Error(data.error ?? `Request failed: ${res.status}`)
  return data
}

// GET /api/notes
export function getPosts() {
  return request(BASE)
}

// GET /api/notes/:id
export function getPost(id) {
  return request(`${BASE}/${id}`)
}

// POST /api/notes   body: { title, body }
export function createPost(payload) {
  return request(BASE, { method: 'POST', body: JSON.stringify(payload) })
}

// PUT /api/notes/:id   body: { title, body }
export function updatePost(id, payload) {
  return request(`${BASE}/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
}

// DELETE /api/notes/:id
export function deletePost(id) {
  return request(`${BASE}/${id}`, { method: 'DELETE' })
}