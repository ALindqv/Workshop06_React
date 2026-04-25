import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm.jsx'
//import { createPost } from '../api/requests.js'

// TODO (student): Implement create flow (POST /api/posts).
// Suggested steps:
// 1) Read form values in handleSubmit.
// 2) POST JSON body to /api/posts.
// 3) On success, navigate to /posts/:id.
// 4) Show an error message on failure.
function NewPostPage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(formData) {
    try {
        setSubmitting(true);
        setError("");

        const response = await fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new error(data.message || "Failed to create post")
        }

        const id = data._id || data.id;
        navigate(`/posts/${id}`);
    } catch (err) {
        setError(err.message)
    } finally {
        setSubmitting(false)
    }
    
  }

  return (
    <div>
      <h1 className="page-title">New post</h1>
      {error && <p className="status-msg error">{error}</p>}
      <PostForm onSubmit={handleSubmit} submitting={submitting} />
    </div>
  )
}

export default NewPostPage
