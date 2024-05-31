import { useDispatch, useSelector } from "react-redux";
import { getDishThunk } from "../../redux/dishes";
import { useParams } from 'react-router-dom'
import  OpenModalButton  from '../OpenModalButton'
import { CreateComment, UpdateComment, DeleteComment } from "../Comments";
import './DishDetails.css'
import { useState, useEffect } from 'react'

function DishDetails () {

    const dispatch = useDispatch()

    const [isNewComment, setIsNewComment] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        dispatch(getDishThunk(id))
        setIsNewComment(false)
    }, [dispatch, id, isNewComment])

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
                                <div className='sidebar-comment-card' key={comment.id}>
                                    <div className='comment'>{comment.comment} <p className='commenter'>{`--${comment.user.username}`}</p>
                                    </div>
                                    <div className='update-delete-buttons'> 
                                    {user.id == comment.user.user_id && 
                                    <OpenModalButton
                                    buttonText='Update'
                                    className='update-comment-button'
                                    modalComponent={<UpdateComment comment_id={comment.id} setIsNewComment={setIsNewComment}/>}
                                    />}
                                    {user.id == comment.user.user_id && 
                                    <OpenModalButton
                                    buttonText='Delete'
                                    className='delete-comment-button'
                                    modalComponent={<DeleteComment setIsNewComment={setIsNewComment}/>}
                                    />}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='button-holder'>
                        {user &&
                                <OpenModalButton
                                    buttonText='Comment'
                                    className='add-comment-button'
                                    modalComponent={<CreateComment dish_id={dish.id} dish_name={dish.name} setIsNewComment={setIsNewComment}/>}
                                />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DishDetails