import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createCommentThunk } from "../../redux/comments";
import { useState } from 'react'

function CreateComment ({dish_id, dish_name, setIsNewComment}) {

    console.log('dish_id', dish_id)

    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState({})

    const { closeModal } = useModal()
    const dispatch = useDispatch()
  
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        let err = {}
        if (comment.length < 10) {
            err.comment = 'Comments must be at least 10 characters'
        } if (comment.length > 400) {
            err.comment = 'Comments must be less than 400 characters'
        } 
        if (Object.keys(err).length > 0) {
            setErrors(err)

        } else {
            
            const commentData = {
                comment,
            }

            dispatch(createCommentThunk(commentData, Number(dish_id))).then(() => setIsNewComment(true)).then(() => closeModal())
        }
    }


    return (
        <div className='create-comment-modal'>
            <h2>Comment on {dish_name}</h2>
            <form className='form' onSubmit={handleSubmit}>
                <div className='error-text'>{errors.comment}</div>
                <textarea className='comment'
                        type='textarea'
                        placeholder='Comment on the dish here...'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                />
                <button className='create-comment-button' type='submit'>Comment</button>
             </form>
        </div>
    )
}

export default CreateComment