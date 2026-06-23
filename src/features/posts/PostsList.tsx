import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { fetchPosts } from './postsSlice'
import {
  selectAllPosts,
  selectPostsError,
  selectPostsStatus,
} from './postsSelectors'
import Button from '@/components/Button/Button'

function PostsList() {
  const dispatch = useAppDispatch()
  const posts = useAppSelector(selectAllPosts)
  const status = useAppSelector(selectPostsStatus)
  const error = useAppSelector(selectPostsError)

  // Fetch on mount — only if we haven't loaded yet
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts())
    }
  }, [status, dispatch])

  // ── Render states ──────────────────────────────────────

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4
                          border-blue-200 border-t-blue-600" />
          <p className="text-sm text-gray-500">Loading posts...</p>
        </div>
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center">
        <p className="text-red-600">{error}</p>
        <div className="mt-4">
          <Button
            label="Try Again"
            onClick={() => dispatch(fetchPosts())}
            variant="danger"
            size="sm"
          />
        </div>
      </div>
    )
  }

  if (status === 'succeeded' && posts.length === 0) {
    return (
      <div className="rounded-lg bg-gray-50 p-6 text-center">
        <p className="text-gray-500">No posts found.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Posts ({posts.length})
        </h2>
        <Button
          label="Refresh"
          onClick={() => dispatch(fetchPosts())}
          variant="secondary"
          size="sm"
        />
      </div>

<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">        {posts.map((post) => (
          <li
            key={post.id}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm
                       transition-shadow hover:shadow-md"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-blue-500">
              User #{post.userId}
            </p>
            <h3 className="mt-1 font-semibold capitalize text-gray-800">
              {post.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {post.body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostsList