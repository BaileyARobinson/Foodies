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
    const err = {}
    const handleSubmitWOAWS = async (e) => {
        e.preventDefault()
        
        if (name.length > 50)  err.name = "Names are less than 50 characters long"
        if (description.length < 10) err.description = 'Descriptions must be longer than 10 characters'
        if (description.length > 400) err.description = 'Descriptions must be fewer than 400 characters'
        setErrors(err)


        const updatedDish = {
           name, 
           description, 
           home_cooked: homeMade 
        }
        
       await dispatch(updateDishWOAWSThunk(updatedDish, id))

       navigate('/')

    }

    const handleSubmit = async (e) => {
        e.preventDefault() 
        console.log(image)
        const formData = new FormData()
        formData.append("name", name)
        formData.append("description", description)
        formData.append("img", image)
        formData.append("home_cooked", homeMade)


        setImageLoading(true)

        await dispatch(updateDishThunk(formData, id))

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
                    <p>Name</p>
                    <input type='text' value={name} 
                    onChange ={((e) => setName(e.target.value))}/>
                </div>
            <div className='description-input'>
                <p>Description</p>
                <textarea name='description-input' rows={6} cols={80} value={description} 
                onChange ={((e) => setDescription(e.target.value))}/>
            </div>
            <div className='home-cooked'>
                <p>Home Made</p>
                <input type='checkbox' checked={homeMade === true} onChange={() => setHomeMade(true)} />
                <p>Restaurant Dish</p>
                <input type='checkbox' checked={homeMade === false} onChange={() => setHomeMade(false)} />
            </div>

                <button className='submit-button'type="submit">Submit</button>
            </form> : 
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
            
            <div className='image-uploader'>
            <p>Image</p> 
            {!hideImageUploader && 
                <div className='image-uploader-input'> 
                    <p>Must be a .pdf, .png, .jpg, .jpeg, .gif file.</p>
                    <input type='file' accept='image/*' 
                    onChange={(e) => setImage(e.target.files[0])}/>
                </div>}
            <div className='name-input'>
                <p>Name</p>
                <input type='text' value={name} 
                onChange ={((e) => setName(e.target.value))}/>
            </div>
            </div>
            <div className='description-input'>
                <p>Description</p>
                <textarea name='description-input' rows={6} cols={80} value={description} 
                onChange ={((e) => setDescription(e.target.value))}/>
            </div>
            <div className='home-cooked'>
                <p>Home Made</p>
                <input type='checkbox' checked={homeMade === true} onChange={() => setHomeMade(true)} />
                <p>Restaurant Dish</p>
                <input type='checkbox' checked={homeMade === false} onChange={() => setHomeMade(false)} />
            </div>
            
            <button className='submit-button'type="submit">Submit</button>
            {(imageLoading) && <p>Loading...</p>}
        </form>}
    </div>
    )
}

export default UpdateDish