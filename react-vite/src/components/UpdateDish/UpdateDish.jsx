import { useDispatch, useSelector  } from "react-redux";
import { updateDishThunk, getDishThunk, updateDishWOAWSThunk
 } from "../../redux/dishes";
import { useState, useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom";

function UpdateDish () {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { id } = useParams()
    
    useEffect(() => {
        dispatch(getDishThunk(id))
    }, [dispatch, id])

    const dish = useSelector((state) => state.dishes.dish)

    const [name, setName] = useState(dish.name)
    const [description, setDescription] = useState(dish.description)
    const [homeMade, setHomeMade] = useState(dish.home_cooked)
    const [image, setImage] = useState(dish.image)
    const [imageLoading, setImageLoading] = useState(false)
    const [hideImageUploader, setHideImageUpload] = useState(true)

    const updateImage = (e) => {
        e.preventDefault()
        setHideImageUpload(false)
    }

    const handleSubmitWOAWS = async (e) => {
        e.preventDefault()

        const updatedDish = {
           name, 
           img: image,
           description, 
           home_cooked: homeMade 
        }
        
       await dispatch(updateDishWOAWSThunk(updatedDish, id))

        navigate(`/dishes/${dish.id}`)

    }

    const handleSubmit = async (e) => {
        e.preventDefault() 
    
        const formData = new FormData()
        formData.append("name", name)
        formData.append("description", description)
        formData.append("img", image)
        formData.append("home_cooked", homeMade)


        setImageLoading(true)

        await dispatch(updateDishThunk(formData, id))
        navigate(`/dishes/${dish.id}`)

    }

    return (
        <form  onSubmit={hideImageUploader ? () => handleSubmitWOAWS() : () => handleSubmit() } encType='multipart/form-data'>
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
                <p>Home Made</p>
                <input type='checkbox' checked={homeMade === true} onChange={() => setHomeMade(true)} />
                <p>Restaurant Dish</p>
                <input type='checkbox' checked={homeMade === false} onChange={() => setHomeMade(false)} />
            </div>
            <div>
            <p>Image</p>
            <div className='image-edit'> {hideImageUploader ? <img src={dish.img}/>: <div className='image-place-holder'> </div>}<button onClick={updateImage}>Update Image</button></div>
            {!hideImageUploader && 
                <div> 
                    <p>Must be a .pdf, .png, .jpg, .jpeg, .gif file.</p>
                    <input type='file' accept='image/*' 
                    onChange={(e) => setImage(e.target.files[0])}/>
                </div>}
            </div>
            <button type="submit">Submit</button>
            {(imageLoading) && <p>Loading...</p>}
            
        </form>
    )
}

export default UpdateDish