// TODO (student): Build this reusable form so both NewPostPage and EditPostPage can use it.
// Suggested requirements:
// - Accept props: initialData, onSubmit, submitting
// - Render title, author, and content fields
// - Pre-fill fields with initialData values when provided
// - Call onSubmit when the form is submitted
// - Disable the submit button while submitting === true

import { useEffect, useState } from "react";

function PostForm({ initialData, onSubmit, submitting }) {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        content: "",
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                author: initialData.author || "",
                content: initialData.content || "",
            })
        }
    }, [initialData]);


    function handleChange (e) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
     

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(formData)
    }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Post title"
        />
      </div>

      <div className="form-field">
        <label htmlFor="author">Author</label>
        <input
          id="author"
          name="author"
          type="text"
          value={formData.author}
          onChange={handleChange}
          required
          placeholder="Your name"
        />
      </div>

      <div className="form-field">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          value={formData.content}
          onChange={handleChange}
          required
          placeholder="Write your post here…"
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? 'Saving…' : 'Save post'}
      </button>
    </form>
  )
}

export default PostForm
