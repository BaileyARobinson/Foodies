//action type constants

export const CREATE_COMMENT ='CREATE REVIEW'
export const UPDATE_COMMENT = 'UPDATE COMMENT'

//action creators

export const createComment = (newComment) => ({
    type: CREATE_COMMENT,
    payload: newComment    
})

export const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    payload: comment
})

export const createCommentThunk = (newCommentData, dishId) => async(dispatch) => {
    const res = await fetch(`/api/dishes/${dishId}/comments/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(newCommentData)
    })
    if (res.ok) {
        const newComment = await res.json()
        dispatch(createComment(newComment))
        return newComment
    } else {
        const errors = await res.json()
        return errors 
    }

}

export const updateCommentThunk = (comment, comment_id) => async (dispatch) => {
    const res = await fetch(`/api/comments/${comment_id}/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
    console.log(res)
    if (res.ok) {
        const updatedComment = await res.json()
        console.log(updatedComment)
        dispatch(updateComment(updatedComment))
        return updatedComment
    } else {
        const errors = await res.json()
        return errors
    }

}

// reducer 

const commentReducer = (state = {}, action) => {
    let newState= {}
    switch (action.type) {
        case CREATE_COMMENT: {
            newState[action.payload.id] = action.payload
            return {...state, ...newState}
        } case UPDATE_COMMENT: {
            return {...state, [action.payload.id]: action.payload}
        }
        default: 
            return state
    } 
}

export default commentReducer