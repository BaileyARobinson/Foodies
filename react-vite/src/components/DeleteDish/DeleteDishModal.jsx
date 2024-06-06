import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteDishThunk } from "../../redux/dishes";
import { useNavigate } from 'react-router-dom'

function DeleteDish ({dishId}) {

    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const navigate = useNavigate()

    const handleDelete = (e) => {
        e.preventDefault()

        dispatch(deleteDishThunk(dishId)).then(() => closeModal())
        navigate('/')
    }

    return (
        <div className='delete-modal-container'>
              <h1>NO TAKEBACKSIES</h1>
            <p>Are you sure you want to delete this dish?</p>
            <i>This cannot be undone</i>
            <button className='confirm-delete' onClick={handleDelete}>Delete it</button>
            <button className='cancel-delete' onClick={() => closeModal()}>No, Keep it!</button>
        </div>
    )

}

export default DeleteDish