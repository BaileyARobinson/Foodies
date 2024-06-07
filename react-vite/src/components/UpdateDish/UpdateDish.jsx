import { useDispatch, useSelector  } from "react-redux";
import { updateDishThunk, getDishThunk, updateDishWOAWSThunk
 } from "../../redux/dishes";
import { useState, useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import './UpdateDish.css'

function UpdateDish () {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { id } = useParams()
    
    useEffect(() => {
        dispatch(getDishThunk(id))
    }, [dispatch, id])

    const dish = useSelector((state) => state.dishes.dish)
    
    const [name, setName] = useState(dish?.name)
    const [description, setDescription] = useState(dish?.description)
    const [homeMade, setHomeMade] = useState(dish?.home_cooked)
    const [image, setImage] = useState(dish?.image)
    const [imageLoading, setImageLoading] = useState(false)
    const [hideImageUploader, setHideImageUpload] = useState(true)
    const [errors, setErrors] = useState({})


    

    const updateImage = (e) => {
        e.preventDefault()
        setHideImageUpload(false)
    }
    
    const handleSubmitWOAWS = async (e) => {
        e.preventDefault()
        let err = {}
        if (name.length > 50)  err.name = "Names are less than 50 characters long"
        if (description.length < 10) err.description = 'Descriptions must be longer than 10 characters'
        if (description.length > 400) err.description = 'Descriptions must be fewer than 400 characters'
        setErrors(err)

        if (Object.values(err).length ===0) {
            const updatedDish = {
            name, 
            description, 
            home_cooked: homeMade 
            }
                
            const updatededdish = await dispatch(updateDishWOAWSThunk(updatedDish, id))

            console.log(updatededdish)

            navigate(`/dishes/${dish?.id}`)

        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault() 
        console.log(name, description, image.name)
        let allErr = {}
        if (name.length === 0) allErr.name = 'Name field is required'
        if (name.length > 50) allErr.name = 'Name must be less than 50 characters.'
        if (description.length < 10) allErr.description = 'Description must be more than 10 characters.'
        if (description.length > 400 ) allErr.description = 'Description must be less than 400 characters.'
        if (!(image.name.endsWith('.jpeg') || image.name.endsWith('.jpg') || image.name.endsWith('.png') || image.name.endsWith('.gif') || image.name.endsWith('.pdf'))) allErr.image = 'File is not the right type.'
        
        setErrors(allErr)
        console.log(allErr)
        if (Object.values(allErr).length === 0) {
            console.log("no errors")
            const formData = new FormData()
            formData.append("name", name)
            formData.append("description", description)
            formData.append("img", image)
            formData.append("home_cooked", homeMade)


            setImageLoading(true)

            await dispatch(updateDishThunk(formData, id))

            navigate(`/dishes/${dish?.id}`)
        }
    }

    return (
        <div className='update-dish-page'> 
             <div className='image-edit-holder'>{hideImageUploader ? 
                 <div className='image-edit'> <img src={dish.img}/> 
                <button onClick={updateImage}>Update Image</button>
                </div> : 
                <div className='image-place-holder'> </div>}
            </div>

            {hideImageUploader ? <form onSubmit={handleSubmitWOAWS}> 
                <div className='name-input'>
                    <p>Name</p> <p className='error-text'>{errors.name}</p>
                    <input type='text' value={name} 
                    onChange ={((e) => setName(e.target.value))} required/>
                </div>
            <div className='description-input'>
                <p>Description</p><p className='error-text'>{errors.description}</p>
                <textarea name='description-input' rows={6} cols={80} value={description} 
                onChange ={((e) => setDescription(e.target.value))} required/>
            </div>
            <div className='home-cooked'>
                <p>Home Made</p>
                <input type='radio' checked={homeMade === true} onChange={() => setHomeMade(true)} />
                <p>Restaurant Dish</p>
                <input type='radio' checked={homeMade === false} onChange={() => setHomeMade(false)} />
            </div>

                <button className='submit-button'type="submit">Submit</button>
            </form> : 
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
            
            <div className='image-uploader'>
            <p>Image</p> <p className='error-text'>{errors.image}</p>
            {!hideImageUploader && 
                <div className='image-uploader-input'> 
                    <p>Must be a .pdf, .png, .jpg, .jpeg, .gif file.</p>
                    <div className='image-uploader-input'>
                    <button onClick={() => document.getElementById('choose-file').click()}>Choose File</button>
                    <input id='choose-file' type='file' accept='image/*' 
                    onChange={(e) => setImage(e.target.files[0])} required/>
                    </div>
                </div>}
            <div className='name-input'>
                <p>Name</p><p className='error-text'>{errors.name}</p>
                <input type='text' value={name} 
                onChange ={((e) => setName(e.target.value))} required/>
            </div>
            </div>
            <div className='description-input'>
                <p>Description</p><p className='error-text'>{errors.description}</p>
                <textarea name='description-input' rows={6} cols={80} value={description} 
                onChange ={((e) => setDescription(e.target.value))} required/>
            </div>
            <div className='home-cooked'>
                <p>Home Made</p>
                <input type='radio' checked={homeMade === true} onChange={() => setHomeMade(true)} />
                <p>Restaurant Dish</p>
                <input type='radio' checked={homeMade === false} onChange={() => setHomeMade(false)} />
            </div>
            
            <button className='submit-button'type="submit">Submit</button>
            {(imageLoading) && <p>Loading...</p>}
        </form>}
    </div>
    )
}

export default UpdateDish