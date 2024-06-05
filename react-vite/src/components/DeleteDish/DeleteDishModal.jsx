import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteDishThunk } from "../../redux/dishes";

function DeleteDish ({dishId, setIsDish}) {

    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleDelete = (e) => {
        e.preventDefault()

        dispatch(deleteDishThunk(dishId)).then(() => closeModal())
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