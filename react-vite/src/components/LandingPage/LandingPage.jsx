import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDishesThunk } from "../../redux/dishes";
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'


function LandingPage() {


    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllDishesThunk())
    }, [dispatch])
    
    const dishes = useSelector((state) => state.dishes.allDishes)
    
    console.log(dishes)
    

    return (
        <div className='landing-page'>
            <div className='all-dishes'>
                {dishes && 
                    Object.values(dishes).map((dish) => {
                        return <div className='dish-card' key={dish.id} title={dish.name} onClick={()=> {
                            navigate(`/dishes/${dish.id}`)
                            }}> 
                            <img className='thumbnail' src={dish.img} alt={dish.description}/>
                            <div className='middle-of-card'> 
                                <div className='left-of-middle'>
                                    { dish.num_of_comments === 1 ?
                                    `${dish.num_of_comments} comment` :
                                     `${dish.num_of_comments} comments`} 
                                </div>
                                <div className='right-of-middle'></div>
                            </div>
                            <div className='dish-text'>
                            <span className='dish-name'>{dish.name}&nbsp;&nbsp;</span><span className='description'> 
                            {dish?.description?.length > 90 ? 
                            `${dish?.description?.slice(0,90)}...` : dish.description } 
                            
                            </span>
                            </div>
            
                        </div>
                })}

            </div>

        </div>
    )

}

export default LandingPage;