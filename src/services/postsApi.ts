import type { Post } from '@/features/posts/types/post.types'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const postsApi = {
  getAll: async (): Promise<Post[]> => {
    const response = await fetch(`${BASE_URL}/posts?_limit=10`)
    if (!response.ok) throw new Error('Failed to fetch posts')
    return response.json()
  },

  getById: async (id: number): Promise<Post> => {
    const response = await fetch(`${BASE_URL}/posts/${id}`)
    if (!response.ok) throw new Error(`Post ${id} not found`)
    return response.json()
  },

  create: async (post: Omit<Post, 'id'>): Promise<Post> => {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    })
    if (!response.ok) throw new Error('Failed to create post')
    return response.json()
  },
}