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
  
    const err = {}
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (comment.length < 25) {
            err.comment = 'Comments must be at least 25 characters'
            setErrors(err)
        } if (comment.length > 400) {
            err.comment = 'Comments must be less than 400 characters'
            setErrors(err)
        } else {
            
            const commentData = {
                comment,
            }

            dispatch(createCommentThunk(commentData, Number(dish_id))).then(() => setIsNewComment(true)).then(() => closeModal())
        }
    }


    return (
        <>
            <h2>Comment on {dish_name}</h2>
            <form className='form' onSubmit={handleSubmit}>
                <div className='errors'>{errors.comment}</div>
                <input className='comment'
                        type='text'
                        placeholder='Comment on the dish here...'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                />
                <button className='create-comment-button' onSubmit={handleSubmit}>Comment</button>
             </form>
        </>
    )
}

export default CreateComment