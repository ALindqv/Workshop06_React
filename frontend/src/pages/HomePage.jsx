import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard.jsx'

// TODO (student): Fetch all posts from the backend and render them.
// Suggested steps:
// 1) Keep local state for posts, loading, and error.
// 2) In useEffect, call GET /api/posts.
// 3) Show loading and error states.
// 4) Map posts into PostCard components.
function HomePage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // TODO (student): Replace this placeholder with real fetch logic.
    //setLoading(false)
    fetch("/api/posts")
        .then((res) => {
            if (!res.ok) throw new Error(`Server error: ${res.status}`)
            return res.json();
        })
        .then((data) => {
            console.log(data);
            setPosts(data)
        })
  }, [])

  if (loading) return <p className="status-msg">Loading posts…</p>
  if (error) return <p className="status-msg error">{error}</p>

  return (
    <div className="blog-page">
      <div className="page-heading">
        <p className="eyebrow">Blog</p>
        <h1 className="page-title">All posts</h1>
        <p className="page-copy">
          
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="status-msg">No posts yet. Implement fetch logic in HomePage first.</p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post._id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default HomePage
