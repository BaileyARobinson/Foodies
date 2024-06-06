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
    const [homeMade, setHomeMade] = useState(false)
    const [image, setImage] = useState('')
    const [imageLoading, setImageLoading] = useState(false)
    const [errors, setErrors] = useState({})

    
    
    console.log(image)

    const handleSubmit = async (e) => {
        e.preventDefault() 

        let err = {}

        if (!name) err.name = 'Name field is required'
        if (name.length > 50) err.name = 'Name must be less than 50 characters.'
        if (description.length < 10) err.description = 'Description must be more than 10 characters.'
        if (description.length >400 ) err.description = 'Description must be less than 400 characters.'
        if (!(image.name.endsWith('.jpeg') || image.name.endsWith('.jpg') || image.name.endsWith('.png') || image.name.endsWith('.gif') || image.name.endsWith('.pdf'))) err.image = 'File is not the right type.'
        setErrors(err)
        if (Object.values(err) > 0) {
            setErrors(err)
        } if (Object.values(err).length === 0) {

            const formData = new FormData()
            formData.append("name", name)
            formData.append("description", description)
            formData.append("img", image)
            formData.append("home_cooked", homeMade)


        setImageLoading(true)

        const newDish = await dispatch(createDishThunk(formData))
        navigate(`/dishes/${newDish.id}`)

    }

    }

    return (
        <form  onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className='name-input'>
                <p>Name</p> <p className='error-text'>{errors.name}</p>
                <input type='text' value={name} onChange ={((e) => setName(e.target.value))}required/>
            </div>
            <div className='description-input'>
                <p>Description</p> <p className='error-text'>{errors.description}</p>
                <textarea name='description-input' rows={6} cols={80} value={description} 
                onChange ={((e) => setDescription(e.target.value))} required/>
            </div>
            <div className='home-cooked'>
            <p>{errors.homMade}</p>
                <p>Home Cooked</p>
                <input type='radio' checked={homeMade === true} onChange={() => setHomeMade(true)} />
                <p>Restaurant Dish</p>
                <input type='radio' checked={homeMade === false} onChange={() => setHomeMade(false)} required/>
            </div>
            <div className='image-uploader-input'>
            <p>Image</p> <p className='error-text'>{errors.image}</p>
            <p>Must be a .pdf, .png, .jpg, .jpeg, .gif file.</p>
                <div className='file-inputs-container'>
                <input type='file' accept='image/*' 
                onChange={(e) => setImage(e.target.files[0])} required/>
                </div>
            </div>
            <button className='submit-button' type="submit">Submit</button>
            {(imageLoading) && <p>Loading...</p>}
            
        </form>
    )
}

export default CreateDish