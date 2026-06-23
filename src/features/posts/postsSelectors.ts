import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'

// Base selectors
export const selectAllPosts = (state: RootState) => state.posts.posts
export const selectPostsStatus = (state: RootState) => state.posts.status
export const selectPostsError = (state: RootState) => state.posts.error
export const selectSelectedPost = (state: RootState) => state.posts.selectedPost

// Memoized derived selectors
export const selectPostsCount = createSelector(
  [selectAllPosts],
  (posts) => posts.length
)

export const selectPostsByUser = (userId: number) =>
  createSelector(
    [selectAllPosts],
    (posts) => posts.filter((p) => p.userId === userId)
  )