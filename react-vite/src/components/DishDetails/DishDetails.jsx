import { useState, useEffect } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { getDishThunk } from "../../redux/dishes";
import { useParams } from 'react-router-dom'

function DishDetails () {

    const dispatch = useDispatch()

    const { id } = useParams()

    useEffect(() => {
        dispatch(getDishThunk(id))
    }, [dispatch, id])

    const dish = useSelector((state) => state.dishes)
    const user = useSelector((state) => state.session.user)
    console.log(dish)
    console.log(user)

    return ( 
        <div className='dish'>
            <h1>{dish.name}</h1> 
            <div className='dish-container'>
                <img className='image' src={dish.img}/>
                <div className='middle-of-dish-card'>
                    <div>{dish.comments.length === 1 ? 
                    `${dish.comments.length} comment`: 
                    `${dish.comments.length} comments`}</div>
                </div>
                <div className='description'>
                    {dish.description}
                </div>
            </div>
        </div>
    )
}

export default DishDetails