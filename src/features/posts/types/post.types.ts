export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

// Three possible states for any async operation
export type LoadingStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface PostsState {
  posts: Post[]
  selectedPost: Post | null
  status: LoadingStatus
  error: string | null
}