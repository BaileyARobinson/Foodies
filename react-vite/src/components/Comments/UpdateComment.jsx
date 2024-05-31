import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateCommentThunk } from "../../redux/comments";
import { useState } from 'react'

function UpdateComment ({ comment_id, setIsNewComment, comment }) {

    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const [errors, setErrors] = useState({})
    const [newComment, setNewComment] = useState(comment)

    const err = {}
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (newComment.length < 10) {
            err.comment = 'Comments must be at least 10 characters'
            setErrors(err)
        } if (newComment.length > 400) {
            err.comment = 'Comments must be less than 400 characters'
            setErrors(err)
        } else {
            
            const commentData = {
               comment: newComment
            }

            dispatch(updateCommentThunk(commentData, comment_id)).then(() => setIsNewComment(true)).then(() => closeModal())
        }
    }


    return (
      <div>
        <h2>Update your Comment</h2>
        <form className='update-comment-form' onSubmit={handleSubmit}>
            <div className='errors'>{errors.comment}</div>
            <input className='comment'
            type='textfield'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
            />
            <button onSubmit={handleSubmit}>Update Comment</button>
        </form>
      </div> 
    )

}

export default UpdateComment