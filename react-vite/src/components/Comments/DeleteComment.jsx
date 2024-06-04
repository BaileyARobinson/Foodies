import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteCommentThunk } from "../../redux/comments";


function DeleteComment ({commentId, setIsNewComment}) {

    const dispatch = useDispatch()
    const { closeModal } = useModal()


    
    const handleDelete = (e) => {
        e.preventDefault()

        dispatch(deleteCommentThunk(commentId)).then(() => setIsNewComment(true)).then(() => closeModal())
    }

    return (
        <div className='delete-modal-container'>
              <h1>NO TAKEBACKSIES</h1>
            <p>Are you sure you want to delete this comment?</p>
            <i>This cannot be undone</i>
            <button className='confirm-delete' onClick={handleDelete}>Delete it</button>
            <button className='cancel-delete' onClick={() => closeModal()}>No, Keep it!</button>
        </div>
    )

}

export default DeleteComment