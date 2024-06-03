import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { usersCommentsThunk } from "../../redux/comments"
import { usersDishesThunk } from "../../redux/dishes"
import { Link, useNavigate, useParams } from 'react-router-dom'
import './UserProfile.css'


function UserProfile () {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(usersCommentsThunk())
        dispatch(usersDishesThunk())
    }, [dispatch])
    
    const usersComments = useSelector((state) => state.comments)
    const usersDishes = useSelector((state) => state.dishes.dishesByUser)

    console.log(usersDishes)

    return (
        <div className='user-profile-page'>
            {usersDishes && Object.values(usersDishes).length >= 1 ? <div className='users-dishes'> <h2>Dishes you've posted:</h2>
            <div className='all-users-dishes'>
                 {Object.values(usersDishes).map((dish) => {
                    return <div className='dish-card' key={dish.id} title={dish.name} onClick={()=> navigate(`/dishes/${dish?.id}`)}> 
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
                        {dish?.description?.length > 90 ? 
                        `${dish?.description?.slice(0,90)}...` : dish.description }
                    </div>
                </div>  
                })}
                </div>
            </div>
            : <div className='no-dishes-created'>
                <h2>You haven't posted any dishes yet.</h2>
                <div><button className='create-a-dish' onClick={() => navigate('/dishes/new')}>Create a New Dish</button></div>
                </div>}

            { usersComments && Object.values(usersComments).length >= 1? <div className='all-users-comments'> <h2>Dishes you've commented on:</h2>
            <div className='users-comments'>
                {Object.values(usersComments).map((comment) => {
                    return <p className='comment-block' onClick={() => navigate(`/dishes/${comment?.dish?.dish_id}`)}><img className='dish-commented-on'src={comment.dish.image}/><div>{comment.comment}</div></p>
                })}
                </div>
            </div> 
            : 
            <div className='no-users-comments'>
                    <h2> You haven't commented on any dishes.</h2>
                    <button className='create-a-dish' onClick={() => navigate('/')}>View Dishes</button>
            </div>}

            </div>
        
    )
}

export default UserProfile;