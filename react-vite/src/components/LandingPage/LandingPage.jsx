import { useState, useEffect } from "react";
import { thunkLogin } from "../../redux/session";
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
    
    const dishes = useSelector((state) => state.dishes) 

    return (
        <div className='whole-page'>
            <h1>Foodie</h1>
            <div className='all-dishes'>
                {dishes && 
                    Object.values(dishes).map((dish) => {
                        return <div className='dish-card' key={dish.id}    title={dish.name} onClick={(()=> {
                            navigate(`/dishes/${dish.id}`)
                            })}> 
                            <img className='thumbnail' src={dish.img} alt={dish.description}/>
                            <div className='middle-of-card'> 
                                <div className='left-of-middle'>
                                    { dish.num_of_comments === 1 ?
                                    `${dish.num_of_comments} comment` :
                                     `${dish.num_of_comments} comments`} 
                                </div>
                                <div className='right-of-middle'></div>
                            </div>
                            <div className='description'> 
                            {dish?.description?.length > 170 ? 
                            `${dish?.description?.slice(0,170)}...` : dish.description } 
                            
                            </div>
            
                        </div>
                })}

            </div>

        </div>
    )

}

export default LandingPage;