import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Post, PostsState } from './types/post.types'
import { postsApi } from '@/services/postSApi'

// ─── Async Thunks ────────────────────────────────────────────────────────────

// createAsyncThunk<ReturnType, ArgumentType>
export const fetchPosts = createAsyncThunk<Post[], void>(
  'posts/fetchAll',       // action type prefix
  async (_, thunkAPI) => {
    try {
      return await postsApi.getAll()
    } catch (error) {
      // rejectWithValue lets you control the rejected action's payload
      return thunkAPI.rejectWithValue('Failed to load posts.')
    }
  }
)

export const fetchPostById = createAsyncThunk<Post, number>(
  'posts/fetchById',
  async (postId, thunkAPI) => {
    try {
      return await postsApi.getById(postId)
    } catch (error) {
      return thunkAPI.rejectWithValue(`Could not load post ${postId}.`)
    }
  }
)

export const createPost = createAsyncThunk<Post, Omit<Post, 'id'>>(
  'posts/create',
  async (newPost, thunkAPI) => {
    try {
      return await postsApi.create(newPost)
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to create post.')
    }
  }
)

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  status: 'idle',
  error: null,
}

// ─── Slice ────────────────────────────────────────────────────────────────────

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Regular synchronous action
    clearSelectedPost(state) {
      state.selectedPost = null
    },
    clearError(state) {
      state.error = null
    },
  },

  // extraReducers handles actions from OUTSIDE this slice
  // i.e. the three auto-generated thunk actions
  extraReducers: (builder) => {

    // ── fetchPosts ──────────────────────────────────────
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = 'succeeded'
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string ?? 'Unknown error'
      })

    // ── fetchPostById ───────────────────────────────────
    builder
      .addCase(fetchPostById.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchPostById.fulfilled, (state, action: PayloadAction<Post>) => {
        state.status = 'succeeded'
        state.selectedPost = action.payload
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string ?? 'Unknown error'
      })

    // ── createPost ──────────────────────────────────────
    builder
      .addCase(createPost.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.status = 'succeeded'
        state.posts.unshift(action.payload)  // add to top of list
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string ?? 'Unknown error'
      })
  },
})

export const { clearSelectedPost, clearError } = postsSlice.actions
export default postsSlice.reducer