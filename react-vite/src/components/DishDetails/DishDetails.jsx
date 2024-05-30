import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDishThunk } from "../../redux/dishes";
import { useParams } from 'react-router-dom'
import './DishDetails.css'

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
                <div className='sidebar'>
                    <div className='top-of-sidebar'>
                    <div>{dish?.comments?.length === 1 ? 
                        `${dish?.comments?.length} comment`: 
                        `${dish?.comments?.length} comments`}</div>
                    
                    <div>{dish.homeCooked === true ? `HomeCooked` : `Restaurant Dish`}</div>
                    </div>
                    <div className='dish-page-description'>
                        {dish.description}
                    </div>
    
                    <div className='sidebar-all-comments'>
                        {dish?.comments?.map((comment) => {
                            return (
                                <div className='sidebar-comment-card'key={comment.id}>
                                    <div className='comment'>{comment.comment} <p className='commenter'>{`--${comment.user.username}`}</p>
                                    </div>
                                
                                </div>
                            )
                        })}
                    </div>
                    {user ? <button>Comment</button> : <div></div> }
                </div>
            </div>
        </div>
    )
}

export default DishDetails