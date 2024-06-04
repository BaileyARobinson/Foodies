import { useDispatch } from "react-redux";
import { createDishThunk } from "../../redux/dishes";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './CreateDish.css'

function CreateDish () {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [homeMade, setHomeMade] = useState('false')
    const [image, setImage] = useState('')
    const [imageLoading, setImageLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault() 

    
        const formData = new FormData()
        formData.append("name", name)
        formData.append("description", description)
        formData.append("img", image)
        formData.append("home_cooked", homeMade)


        setImageLoading(true)

        const newDish = await dispatch(createDishThunk(formData))
        navigate(`/dishes/${newDish.id}`)

    }

    return (
        <form  onSubmit={handleSubmit} encType='multipart/form-data'>
            <div>
                <p>Name</p>
                <input type='text' value={name} 
                onChange ={((e) => setName(e.target.value))}/>
            </div>
            <div className='description-input'>
                <p>Description</p>
                <textarea name='description-input' rows={6} cols={80} value={description} 
                onChange ={((e) => setDescription(e.target.value))}/>
            </div>
            <div>
                <p>Home Cooked</p>
                <input type='checkbox' checked={homeMade === true} onChange={() => setHomeMade(true)} />
            </div>
            <div>
            <p>Image</p>
            <p>Must be a .pdf, .png, .jpg, .jpeg, .gif file.</p>
            <input type='file' accept='image/*' 
                onChange={(e) => setImage(e.target.files[0])}/>
            </div>
            <button type="submit">Submit</button>
            {(imageLoading) && <p>Loading...</p>}
            
        </form>
    )
}

export default CreateDish